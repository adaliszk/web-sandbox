import type { DocumentHead, StaticGenerateHandler } from "@builder.io/qwik-city";
import { Link, useLocation } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";

export const head: DocumentHead = {
    title: "Qwik ISR Prototype"
};

export const onStaticGenerate: StaticGenerateHandler = async () => {
    const slugs = ["qux"];
    return {
        params: slugs.map((slug) => {
            return { slug };
        }),
    };
};

export default component$(() => {
    const { params } = useLocation();

    return (
        <>
            <h1>ISG Prototype: /{params.slug}</h1>
            <p>Available pages:</p>
            <ul>
                <li> <Link href={'/foo'}>/foo</Link> </li>
                <li> <Link href={'/bar'}>/bar</Link> </li>
                <li> <Link href={'/qux'}>/qux</Link> </li>
            </ul>
            <Link href={'/'}>Back to the Homepage</Link>
        </>
    );
});
