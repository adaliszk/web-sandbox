import type { RequestHandler } from "@builder.io/qwik-city";
import { Agent, setGlobalDispatcher } from 'undici'
import { env } from "node:process";

const DEV_DOMAINS = /^(localhost|127\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|10\.)/;

// This is to allow self-signed certificates in development
setGlobalDispatcher(new Agent({
    connect: {
        rejectUnauthorized: import.meta.env.PROD
    }
}))

// noinspection JSUnusedGlobalSymbols
export const onGet: RequestHandler = async ({ request, send, url, method }) => {
    let domain = request.headers.get("host") ?? "localhost";
    if (DEV_DOMAINS.test(domain) && env.QWIK_DEFAULT_DOMAIN) {
        domain = env.QWIK_DEFAULT_DOMAIN;
    }
    const targetUrl = new URL(`/${domain}/`, url);
    console.log(`Rewrite to ${targetUrl}`);
    const response = await fetch(targetUrl)
    send(response.status, await response.text());
};


