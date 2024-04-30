# Web Prototypes

Monorepo for my experiments involving web technologies. Mainly for learning purposes, but also as a demonstration
of my skills as I learn over-time. The purpose of this repository is to build up a collection of references, and
have a playground to test new ideas and technologies.

### Prerequisites

- [`node.js >= 20.x`](https://nodejs.org/en/download) as the environment for development
- [`pnpm >= 9.0`](https://pnpm.io/installation) as the package manager
- [`biome >= 1.7`](https://biomejs.dev/) as the code formatter and linter

## Projects

Within this repository, my plan is to create projects to explore or learn, then archive them for future reference.
For now, I leave the projects in their original place but disable them in the workspaces definition so that links
and references would not break.

> NOTE:
> While normally I would not list development dependencies in the workspace `package.json` files, I have done so
> in this repository so that anyone could open the individual projects with stackblitz.

| Project                                                                                                | Stage | Date          | Description                                                                                                       |
|:-------------------------------------------------------------------------------------------------------|:------|:--------------|:------------------------------------------------------------------------------------------------------------------|
| [apps/qwik-website](https://stackblitz.com/github/adaliszk/web-sandbox/tree/develop/apps/qwik-website) | Done  | April of 2024 | Verifying the capabilities of Qwik to serve a static website with incremental builds and external markdown files. |
