# Qwik Website Prototype

This is a prototype project to evaluate the capabilities of Qwik and Qwik-City to for a website with static page
generation with incremental builds and external markdown files. There are two main goals for this project:

- Render the content from external markdown files stored in the `content` directory.
- Generate SSG builds with filtered content to achieve incremental builds.

## Results

The prototype project has been successful in rendering the content from external markdown files, and 
was able to verify that it is possible to reduce the build time by filtering the content to only include
the files that have changed since the last build.

### Rendering External Markdown Files

The main learning here is that Qwik-City provides a vite plugin to parse markdown files, where the output of it is:
```typescript
import type { JSXOutput } from '@builder.io/qwik';
import * as data from './content/my-external-file.md';

data satisfies {
    frontmatter: Record<string, unknown>
    default: () => JSXOutput
}
```

However, there is no way to dynamically import the content and pass it to the route component:

```typescript jsx
// src/routes/pages/[slug]/index.tsx
import type { DocumentHead, StaticGenerateHandler } from "@builder.io/qwik-city";
import { Link, useLocation, routeHandler$ } from "@builder.io/qwik-city";
import { $, noSerialize, component$ } from "@builder.io/qwik";

export const head: DocumentHead = {
    title: "Qwik Markdown Rendering Dynamically",
};

export const onStaticGenerate: StaticGenerateHandler = () => {
    return {
        params: [
            { slug: "foo" },
            { slug: "bar" },
            { slug: "qux" },
        ],
    };
};

const useMarkdown = routeHandler$(async (slug: string) => {
    return await import(`../../../content/collection2/${slug}.md`);
});

const useMarkdownSerialized = routeHandler$(async (slug: string) => {
    const data = await import(`../../../content/collection2/${slug}.md`);
    return {
        frontmatter: data.frontmatter,
        content: $(data.default),
        // ^? Serialization Error because Makr
    };
});

const useMarkdownRaw = routeHandler$(async (slug: string) => {
    const data = await import(`../../../content/collection2/${slug}.md`);
    return {
        frontmatter: data.frontmatter,
        content: noSerialize(data.default),
    };
});

const InlineMarkdown = async ({ slug }: { slug: string }) => {
    const { default: Content } = await import(`../../../content/collection2/${slug}.md`)
    return <Content/>
}

export default component$(() => {
    const { params } = useLocation();
    const importData = useMarkdown(params.slug);
    //    ^? Compile error where `default` cannot be serialized 
    const serializedData = useMarkdownSerialized(params.slug);
    //    ^? Compile error where `default` cannot be serialized as its already been wrapped with `$(...)`
    const rawContent = useMarkdownRaw(params.slug);
    //    ^? No compile error, but on the 2nd render, the content is undefined
    return <InlineMarkdown slug={params.slug} />;
    //     ^? Compile error where InlineMarkdown cannot be Promise<JSOutput>
});
```

The only solution I found is to pre-generate the content and import it statically:

```typescript jsx
// src/routes/pages/[slug]/index.tsx
import type { DocumentHead, StaticGenerateHandler } from "@builder.io/qwik-city";
import { Link, useLocation, routeHandler$ } from "@builder.io/qwik-city";
import { $, noSerialize, component$ } from "@builder.io/qwik";

import { type CollectionKey, collection } from "../../../content/collection2";
// ^? CollectionKey is a string literal union with all the possible keys
// ^? collection is a Map<CollectionKey, { frontmatter: Record<string, unknown>, Content: () => JSXOutput }>

export const head: DocumentHead = {
    title: "Qwik Markdown Rendering Dynamically",
};

export const onStaticGenerate: StaticGenerateHandler = () => {
    return {
        params: Array.from(collection.keys()).map((slug) => ({ slug })),
    };
};

export default component$(() => {
    const { params } = useLocation();
    // Note: We use `!` because we always have the value for each key
    const Markdown = collection.get(params.slug as CollectionKey)!;
    return (
        <Markdown.Content />
    )
});
```

A key learning as well that whenever Signal or Context is used, that means that the data will be pushed into 
`q-data.json`which is not desired with large content files, especially when they themselves are not changing.

### Incremental Static Site Generation

While there is no direct support for this, inspecting the generated files it turns out that there is a way:  

```txt
dist
├── build                 <- Snippets for each $() scope
│   ├── q-<hash1>.js      
│   ├── q-<hash2>.js      
│   ├── q-<hash3>.js
│   └── q-<hash4>.js
├── pages
│   ├── foo
│   │   ├── index.html
│   │   └── q-data.json    <- Data only for /pages/foo
│   ├── bar
│   │   ├── index.html
│   │   └── q-data.json    <- Data only for /pages/bar
│   └── qux
│       ├── index.html
│       └── q-data.json    <- Data only for /pages/qux
├── index.html
├── q-data.json            <- Data only for /
├── q-manifest.json        <- Import mapping where /pages/[slug]/index.tsx is used
├── robots.txt
└── sitemap.xml            <- List for all pages for SEO
```

As long as there is at least one valid page for each dynamic path, they will be listed in the `q-manifest.json` with
the pattern and the pages under the right path will be properly resumed using their `q-data.json` files.

Now, the sitemap that is generated will reflect the latest paths, but if there is a build for each new path, then
a full list can be restored no matter if you build a filtered content or not.

The only collision that might happen is with the built snippets where each qwik scope is given a unique hash, but those
hashes are given out for each pattern, so the only issue should be if the loaded markdown has qwik scopes defined for
whatever purpose.
