/*
 * WHAT IS THIS FILE?
 * Development entry point using only client-side modules!
 */
import { type RenderOptions, render } from "@builder.io/qwik";
import Root from "./root.tsx";

// noinspection JSUnusedGlobalSymbols
export default function (opts: RenderOptions) {
    return render(document, <Root />, opts);
}
