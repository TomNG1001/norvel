/**
 * Erzeugt /robots.txt beim Build.
 *
 * Als Seite und nicht als feste Datei unter public/, damit die Domain aus
 * brand.ts kommt und nicht an zweiter Stelle im Projekt steht.
 */
import type { APIRoute } from "astro";
import { brand } from "../config/brand";

export const GET: APIRoute = () => {
  const zeilen = [
    "User-agent: *",
    "Allow: /",
    "",
    "# Landeseite nach dem Absenden des Formulars. Steht auch auf noindex.",
    "Disallow: /danke",
    "",
    `Sitemap: ${brand.domain}/sitemap-index.xml`,
    "",
  ];

  return new Response(zeilen.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
