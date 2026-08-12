/**
 * Die einzige Stelle im ganzen Projekt, an der der Markenname steht.
 *
 * Der Name darf nirgendwo sonst hart im Code auftauchen, nicht in
 * Komponenten, Texten, alt-Attributen, Dateinamen, Meta-Angaben, Manifest,
 * Favicon oder Sitemap. Überall `brand.name` importieren.
 *
 * `npm run check:brand` prüft das bei jedem Build und bricht ab, wenn der
 * Name irgendwo anders auftaucht.
 */

export const brand = {
  /** Markenname. Eine Zeile ändern, und die ganze Seite heißt anders. */
  name: "Norvel",

  /**
   * Unter dieser Adresse ist die Seite tatsächlich erreichbar. Sie steckt in
   * jedem canonical, in og:url, in der Sitemap und im Rücksprungziel des
   * Formulars. Stand hier vorher eine erfundene Domain, zeigten alle diese
   * Angaben ins Leere. Ohne Schrägstrich am Ende.
   *
   * Sobald die eigene Domain da ist: nur diese eine Zeile ändern.
   */
  domain: "https://norvel-seven.vercel.app",

  /**
   * PLATZHALTER, geschäftliche Mailadresse fehlt noch. Solange hier
   * "platzhalter" steht, blendet der Fußbereich die Zeile aus, siehe
   * `mailFehlt` unten. Eine erfundene Adresse neben einer echten Nummer ist
   * verwirrender als gar keine.
   */
  mail: "platzhalter@platzhalter-domain.de",

  inhaber: "Tom Germeshausen",

  region: "Rhein-Neckar-Kreis",

  /** Maschinenlesbar, für tel:-Verweise und strukturierte Daten. */
  telefonE164: "+4915752608733",

  /** Wie die Nummer auf der Seite steht. */
  telefonAnzeige: "0157 52608733",
} as const;

export type Brand = typeof brand;

/**
 * True, solange die Mailadresse ein Platzhalter ist. Wer das abfragt, zeigt
 * die Adresse gar nicht erst an, statt eine erfundene zu verlinken.
 */
export const mailFehlt = brand.mail.includes("platzhalter");
