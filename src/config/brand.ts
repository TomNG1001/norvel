/**
 * Die einzige Stelle im ganzen Projekt, an der der Markenname steht.
 *
 * Der Name darf nirgendwo sonst hart im Code auftauchen — nicht in
 * Komponenten, Texten, alt-Attributen, Dateinamen, Meta-Angaben, Manifest,
 * Favicon oder Sitemap. Überall `brand.name` importieren.
 *
 * `npm run check:brand` prüft das bei jedem Build und bricht ab, wenn der
 * Name irgendwo anders auftaucht.
 */

export const brand = {
  /** Markenname. Eine Zeile ändern, und die ganze Seite heißt anders. */
  name: "Norvel",

  /** PLATZHALTER — Domain gehört noch nicht Tom. Ohne Schrägstrich am Ende. */
  domain: "https://platzhalter-domain.de",

  /** PLATZHALTER — geschäftliche Mailadresse fehlt noch. */
  mail: "platzhalter@platzhalter-domain.de",

  inhaber: "Tom Germeshausen",

  region: "Rhein-Neckar-Kreis",

  /** Maschinenlesbar, für tel:-Verweise und strukturierte Daten. */
  telefonE164: "+4915752608733",

  /** Wie die Nummer auf der Seite steht. */
  telefonAnzeige: "0157 52608733",
} as const;

export type Brand = typeof brand;
