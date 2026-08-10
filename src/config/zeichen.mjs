/**
 * Das Bildzeichen der Marke, rein geometrisch, kein Buchstabe, kein
 * Monogramm. Ein Quadrat mit einer stehenden Raute darin.
 *
 * Bewusst als .mjs, damit sowohl Astro-Komponenten als auch das
 * Favicon-Skript unter scripts/ dieselbe Quelle benutzen. Die Form existiert
 * genau einmal.
 */

/**
 * @param {object} optionen
 * @param {string} [optionen.linie]       Farbe des äußeren Quadrats
 * @param {string} [optionen.flaeche]     Farbe der inneren Raute
 * @param {string} [optionen.hintergrund] Hintergrundfläche, "none" für keinen
 * @param {number} [optionen.groesse]     Kantenlänge in Pixeln
 * @param {boolean} [optionen.eigenstaendig] true erzeugt eine vollständige
 *                                           SVG-Datei mit xmlns
 * @returns {string} SVG-Markup
 */
export function zeichen({
  linie = "#1C4F82",
  flaeche = "#1C4F82",
  hintergrund = "none",
  groesse = 32,
  eigenstaendig = false,
} = {}) {
  const xmlns = eigenstaendig ? ' xmlns="http://www.w3.org/2000/svg"' : "";
  const versteckt = eigenstaendig ? "" : ' aria-hidden="true" focusable="false"';
  const flaechenrand =
    hintergrund === "none"
      ? ""
      : `\n  <rect width="32" height="32" fill="${hintergrund}" />`;

  return `<svg${xmlns} viewBox="0 0 32 32" width="${groesse}" height="${groesse}"${versteckt}>${flaechenrand}
  <rect x="4.5" y="4.5" width="23" height="23" fill="none" stroke="${linie}" stroke-width="3" />
  <path d="M16 10 L22 16 L16 22 L10 16 Z" fill="${flaeche}" />
</svg>`;
}
