/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_POCKETBASE_ENDPOINT: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
