import type { JSXNode } from "@builder.io/qwik";

import { server$ } from "@builder.io/qwik-city";
import { noSerialize } from "@builder.io/qwik";

export type MarkdownParserArgs = {
    file: string;
};

export type MarkdownFrontmatter = {
    [key: string]: unknown;
    title: string;
}

export type MarkdownImport = {
    frontmatter: MarkdownFrontmatter;
    default: () => JSXNode;
}

/**
 * Imports a markdown file and assumes that Vite already transforms the exports.
 */
export async function readMarkdown({ file }: MarkdownParserArgs): Promise<MarkdownImport> {
    return await import(/* @vite-ignore */ file) as MarkdownImport;
}

/**
 * Parses a markdown file with a server-only action, ready to be used within Qwik components.
 */
export async function parseMarkdown({ file }: MarkdownParserArgs) {
    const data = await readMarkdown({ file: `../../content/${file}.md` });
    return {
        content: noSerialize(data.default()),
        frontmatter: data.frontmatter,
    }
}
