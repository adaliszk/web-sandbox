import { staticAdapter } from "@builder.io/qwik-city/adapters/static/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "./vite.config";

// noinspection JSUnusedGlobalSymbols
export default extendConfig(baseConfig, () => {
    return {
        plugins: [
            staticAdapter({
                origin: "https://adaliszk.io",
            }),
        ],
        build: {
            ssr: true,
            rollupOptions: {
                input: ["@qwik-city-plan"],
            },
        },
    };
});
