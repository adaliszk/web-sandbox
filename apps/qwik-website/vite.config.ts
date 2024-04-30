import { webConfig } from "@adaliszk/web-compiler";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";

// noinspection JSUnusedGlobalSymbols
export default webConfig({
    sass: false,
    plugins: [qwikCity(), qwikVite()],
    https: false,
    server: {
        headers: {
            // Don't cache the server response in dev mode
            "Cache-Control": "public, max-age=0",
        },
    },
    preview: {
        headers: {
            // Do cache the server response in preview (non-adapter production build)
            "Cache-Control": "public, max-age=600",
        },
    },
});
