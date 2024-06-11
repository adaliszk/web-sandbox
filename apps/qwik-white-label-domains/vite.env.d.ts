/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly QWIK_DEFAULT_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}