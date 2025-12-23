// Temporary TypeScript shim to satisfy `src/integrations/supabase/client.ts` import.
// In normal setups this is generated from your Supabase schema.

export type Database = any;

// Some tooling configs fail to resolve `./types` to `types.d.ts`.
// This ambient module ensures the import works regardless of resolution mode.
declare module "./types" {
  export type Database = any;
}
