import { component$ } from "@builder.io/qwik";
import {type DocumentHead, useLocation} from "@builder.io/qwik-city";

// noinspection JSUnusedGlobalSymbols
export const head: DocumentHead = () => {
    return {
        title: "Domain Page for customization",
    }
};

export default component$(() => {
    const loc = useLocation();
    return (
        <>
            <h1>Hello,</h1>
            <p>This is a white-label page for domain: {loc.params.domain}</p>
        </>
    );
});
