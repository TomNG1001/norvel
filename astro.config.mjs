// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { brand } from "./src/config/brand.ts";

// Statische Seite, kein SSR. Die Domain kommt aus brand.ts und steht
// nirgendwo sonst.
export default defineConfig({
  site: brand.domain,
  output: "static",
  server: { port: 3490 },
  build: {
    // Erzeugt /kontakt/index.html statt /kontakt.html — saubere Adressen.
    format: "directory",
  },
  integrations: [
    sitemap({
      // Seiten, die auf noindex stehen, gehören nicht in die Sitemap.
      // Sonst widerspricht sich die Website selbst.
      filter: (seite) => !seite.includes("/danke"),
    }),
  ],
});
