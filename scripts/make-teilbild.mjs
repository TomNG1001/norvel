/**
 * Erzeugt public/teilbild.png, das Bild für geteilte Verknüpfungen.
 *
 * Warum das gebraucht wird: Toms Zielgruppe schickt sich Kontakte über
 * WhatsApp. Ohne og:image erscheint dort ein nackter grauer Kasten mit Text.
 * Mit Bild erscheint eine Karte, die aussieht, als hätte sie jemand gebaut,
 * der Websites baut. Das ist der billigste Vertrauensgewinn, den es gibt.
 *
 * Warum erzeugt und nicht abgelegt: Genau wie beim Favicon kommen Farben,
 * Form und Markenname aus einer Quelle. Ändert Tom --tinte oder den Namen in
 * brand.ts, ändert sich dieses Bild beim nächsten Bau mit. Ein abgelegtes
 * PNG würde still veralten.
 *
 * 1200 × 630 ist das Maß, das WhatsApp, Facebook, LinkedIn und X gemeinsam
 * erwarten.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { zeichen } from "../src/config/zeichen.mjs";

const wurzel = fileURLToPath(new URL("..", import.meta.url));
const cssDatei = join(wurzel, "src", "styles", "global.css");
const markenDatei = join(wurzel, "src", "config", "brand.ts");
const ziel = join(wurzel, "public", "teilbild.png");

/** Liest eine CSS-Variable aus global.css, mit Rückfallwert. */
function farbeLesen(css, variable, rueckfall) {
  const treffer = css.match(
    new RegExp(`--${variable}\\s*:\\s*(#[0-9a-fA-F]{3,8})`)
  );
  return treffer ? treffer[1] : rueckfall;
}

/** Liest ein Textfeld aus brand.ts. Der Markenname steht nur dort. */
function markeLesen(quelle, feld, rueckfall) {
  const treffer = quelle.match(new RegExp(`${feld}:\\s*"([^"]+)"`));
  return treffer ? treffer[1] : rueckfall;
}

const css = await readFile(cssDatei, "utf8");
const marke = await readFile(markenDatei, "utf8");

const tinte = farbeLesen(css, "tinte", "#0a1a30");
const aufTinte = farbeLesen(css, "auf-tinte", "#e8eef5");
const stahl = farbeLesen(css, "stahl", "#1c4f82");

const name = markeLesen(marke, "name", "");
const region = markeLesen(marke, "region", "");
const telefon = markeLesen(marke, "telefonAnzeige", "");

/**
 * ZUR SCHRIFT, damit sich niemand wundert:
 *
 * Dieses Bild wird nicht in Bricolage Grotesque gesetzt, sondern in der
 * Systemschrift. Der Grund ist technisch: sharp zeichnet SVG über librsvg,
 * und librsvg lädt keine @font-face-Schrift aus einem Datenstrom. Die
 * Schriftdateien liegen außerdem nur als woff2 vor, was fontconfig nicht
 * lesen kann.
 *
 * Getestet und verworfen: Schrift als base64 ins SVG legen (wird ignoriert,
 * kostet aber 60 KB je Bau). Was tragfähig wäre: die Wortmarke einmal in
 * Pfade umwandeln und als festes SVG ablegen. Das lohnt erst, wenn die
 * Marke steht.
 *
 * Was das Bild trotzdem als Marke erkennbar macht: das Bildzeichen, die
 * exakten Farben aus global.css und der Streifen in der Signalfarbe. In
 * einer WhatsApp-Vorschau von 300 Pixeln Breite trägt das.
 */
const titelSchrift = 'Helvetica Neue, Helvetica, Arial, sans-serif';
const textSchrift = 'Helvetica Neue, Helvetica, Arial, sans-serif';

/** Das Bildzeichen, in der Farbe für dunklen Grund. */
const bildzeichen = zeichen({
  linie: aufTinte,
  flaeche: aufTinte,
  hintergrund: "none",
  groesse: 84,
});

/** Nur den Inhalt des Zeichens übernehmen, nicht das äußere svg-Element. */
const zeichenInhalt = bildzeichen
  .replace(/^<svg[^>]*>/, "")
  .replace(/<\/svg>$/, "");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${tinte}" />

  <!-- Ein schmaler Streifen in der Signalfarbe, damit die Karte auch als
       Miniatur erkennbar bleibt. -->
  <rect x="0" y="0" width="1200" height="14" fill="${stahl}" />

  <g transform="translate(96, 116) scale(2.625)">${zeichenInhalt}</g>

  <text x="196" y="176" font-family="${titelSchrift}" font-size="66" font-weight="600" letter-spacing="-1.5" fill="${aufTinte}">${name}</text>

  <text x="96" y="330" font-family="${titelSchrift}" font-size="76" font-weight="600" letter-spacing="-2" fill="${aufTinte}">Websites für kleine Betriebe</text>
  <text x="96" y="422" font-family="${titelSchrift}" font-size="76" font-weight="600" letter-spacing="-2" fill="${aufTinte}">im ${region}</text>

  <text x="96" y="530" font-family="${textSchrift}" font-size="34" fill="${aufTinte}" opacity="0.72">Grundgerüst in 24 bis 72 Stunden  ·  ${telefon}</text>
</svg>`;

await mkdir(join(wurzel, "public"), { recursive: true });
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(ziel);

console.log(`Teilbild erzeugt: public/teilbild.png (1200 x 630, ${tinte})`);
