/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COLLABKIT_API_KEY: string;
  readonly VITE_COLLABKIT_APP_ID: string;
  readonly VITE_COLLABKIT_WORKSPACE_ID: string;
  readonly VITE_COLLABKIT_WORKSPACE_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
