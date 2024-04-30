import { component$ } from "@builder.io/qwik";
import type { DocumentHead, StaticGenerateHandler } from "@builder.io/qwik-city";
import { Link, useLocation } from "@builder.io/qwik-city";

import { type CollectionKey, collection } from "../../../../content/collection2";

// noinspection JSUnusedGlobalSymbols
export const head: DocumentHead = {
    title: "Qwik ISR Prototype",
};

// noinspection JSUnusedGlobalSymbols
export const onStaticGenerate: StaticGenerateHandler = () => {
    return {
        params: Array.from(collection.keys()).map((slug) => ({ slug })),
    };
};

export default component$(() => {
    const { params } = useLocation();
    const slug = params.slug as CollectionKey;
    const Markdown = collection.get(slug);

    return (
        <>
            <h1>ISG Prototype: /{params.slug}</h1>
            <p>Markdown contents:</p>
            {Markdown !== undefined ? (
                <>
                    <pre>Frontmatter: {JSON.stringify(Markdown.frontmatter, null, 2)}</pre>
                    <Markdown.Content />
                </>
            ) : (
                <p>Markdown not found!</p>
            )}

            <p>Available pages:</p>
            <ul>
                <li>
                    <Link href={"/page/foo"}>/foo</Link>
                </li>
                <li>
                    <Link href={"/page/bar"}>/bar</Link>
                </li>
                <li>
                    <Link href={"/page/qux"}>/qux</Link>
                </li>
            </ul>
            <Link href={"/"}>Back to the Homepage</Link>
        </>
    );
});
