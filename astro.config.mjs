// @ts-check
import { defineConfig } from "astro/config";
import { brand } from "./src/config/brand.ts";

// Statische Seite, kein SSR. Die Domain kommt aus brand.ts und steht
// nirgendwo sonst.
export default defineConfig({
  site: brand.domain,
  output: "static",
  server: { port: 3489 },
  build: {
    // Erzeugt /kontakt/index.html statt /kontakt.html — saubere Adressen.
    format: "directory",
  },
});
