// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { brand } from "./src/config/brand.ts";

// Statische Seite, kein SSR. Die Domain kommt aus brand.ts und steht
// nirgendwo sonst.
export default defineConfig({
  site: brand.domain,
  output: "static",
  server: { port: 3491 },
  build: {
    // Erzeugt /kontakt/index.html statt /kontakt.html — saubere Adressen.
    format: "directory",
  },
  integrations: [
    sitemap({
      // Seiten, die auf noindex stehen, gehören nicht in die Sitemap.
      // Sonst widerspricht sich die Website selbst.
      //
      // Impressum und Datenschutz stehen aus einem anderen Grund nicht drin:
      // Rechtsseiten sollen erreichbar sein, aber nicht ranken. Sie in die
      // Sitemap zu setzen, heißt Google zu bitten, sie zu bewerten.
      filter: (seite) =>
        !["/danke", "/impressum", "/datenschutz"].some((pfad) =>
          seite.includes(pfad)
        ),
    }),
  ],
});
