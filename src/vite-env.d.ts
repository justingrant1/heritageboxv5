
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AIRTABLE_API_KEY: string;
  readonly VITE_SQUARE_APPLICATION_ID: string;
  readonly VITE_SQUARE_LOCATION_ID: string;
  readonly VITE_BREVO_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
