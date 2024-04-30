import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";

import { MyExternalFile } from "../../content/collection1";

// noinspection JSUnusedGlobalSymbols
export const head: DocumentHead = {
    title: "Qwik ISR Prototype",
};

export default component$(() => {
    return (
        <>
            <h1>ISG Prototype</h1>
            <p>Markdown contents:</p>
            <pre>Frontmatter: {JSON.stringify(MyExternalFile.frontmatter, null, 2)}</pre>
            <MyExternalFile.Content />

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
        </>
    );
});
