/**
 * Erzeugt /robots.txt beim Build.
 *
 * Als Seite und nicht als feste Datei unter public/, damit die Domain aus
 * brand.ts kommt und nicht an zweiter Stelle im Projekt steht.
 */
import type { APIRoute } from "astro";
import { brand } from "../config/brand";
import { inDieSucheAufnehmen } from "../config/veroeffentlichung";

export const GET: APIRoute = () => {
  /**
   * Solange die Seite nicht in die Suche darf, verbietet robots.txt alles.
   * Der Schalter dafür steht in veroeffentlichung.ts, nicht hier.
   */
  const zeilen = inDieSucheAufnehmen
    ? [
        "User-agent: *",
        "Allow: /",
        "",
        "# Landeseite nach dem Absenden des Formulars. Steht auch auf noindex.",
        "Disallow: /danke",
        "",
        `Sitemap: ${brand.domain}/sitemap-index.xml`,
        "",
      ]
    : [
        "# Die Seite ist erreichbar, aber noch nicht fertig.",
        "# Das Impressum ist ein Platzhalter, deshalb keine Aufnahme in die Suche.",
        "User-agent: *",
        "Disallow: /",
        "",
      ];

  return new Response(zeilen.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
