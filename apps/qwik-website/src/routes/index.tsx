import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, Link } from "@builder.io/qwik-city";
import { parseMarkdown } from "../helpers/markdownParser";
import { component$ } from "@builder.io/qwik";

export const head: DocumentHead = {
    title: "Qwik ISR Prototype",
};

export const useMarkdownFile = routeLoader$(async () => {
    const data = await parseMarkdown({ file: "my-external-file" });
    return {
        frontmatter: data.frontmatter,
        content: data.content,
    };
})

export default component$(() => {
    const markdown = useMarkdownFile();

    return (
        <>
            <h1>ISG Prototype</h1>
            <p>Markdown contents:</p>
            <pre>Frontmatter: {JSON.stringify(markdown.value.frontmatter, null, 2)}</pre>
            {markdown.value.content}

            <p>Available pages:</p>
            <ul>
                <li>
                    {" "}
                    <Link href={"/foo"}>/foo</Link>{" "}
                </li>
                <li>
                    {" "}
                    <Link href={"/bar"}>/bar</Link>{" "}
                </li>
                <li>
                    {" "}
                    <Link href={"/qux"}>/qux</Link>{" "}
                </li>
            </ul>
        </>
    );
});
