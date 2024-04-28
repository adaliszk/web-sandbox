import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";

export const head: DocumentHead = {
    title: "Qwik ISR Prototype"
};

export default component$(() => {
    return (
        <>
            <h1>ISG Prototype</h1>
            <p>Available pages:</p>
            <ul>
                <li> <Link href={'/foo'}>/foo</Link> </li>
                <li> <Link href={'/bar'}>/bar</Link> </li>
                <li> <Link href={'/qux'}>/qux</Link> </li>
            </ul>
        </>
    );
});
