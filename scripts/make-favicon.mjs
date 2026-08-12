/**
 * Erzeugt public/favicon.svg zur Build-Zeit.
 *
 * Die Form kommt aus src/config/zeichen.mjs, die Farben aus
 * src/styles/global.css. Der Markenname taucht nicht auf — das Zeichen ist
 * rein geometrisch. Wer die Farben in global.css ändert, ändert damit auch
 * das Favicon.
 *
 * Die Datei wird nicht ins Git aufgenommen, sie entsteht bei jedem Build neu.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { zeichen } from "../src/config/zeichen.mjs";

const wurzel = fileURLToPath(new URL("..", import.meta.url));
const cssDatei = join(wurzel, "src", "styles", "global.css");
const ziel = join(wurzel, "public", "favicon.svg");

/** Liest eine CSS-Variable aus global.css, mit Rückfallwert. */
function farbeLesen(css, variable, rueckfall) {
  const treffer = css.match(
    new RegExp(`--${variable}\\s*:\\s*(#[0-9a-fA-F]{3,8})`)
  );
  return treffer ? treffer[1] : rueckfall;
}

const css = await readFile(cssDatei, "utf8");
const stahl = farbeLesen(css, "stahl", "#1c4f82");
const papier = farbeLesen(css, "papier", "#f1f4f7");

const svg = zeichen({
  linie: stahl,
  flaeche: stahl,
  hintergrund: papier,
  groesse: 32,
  eigenstaendig: true,
});

await mkdir(join(wurzel, "public"), { recursive: true });
await writeFile(ziel, svg + "\n", "utf8");

/**
 * Dazu ein PNG für den Startbildschirm. iOS zeigt kein SVG-Favicon an: Wer
 * die Seite auf den Homescreen legt, bekommt sonst ein graues Kästchen mit
 * einem Buchstaben darin.
 */
const fuersHandy = zeichen({
  linie: stahl,
  flaeche: stahl,
  hintergrund: papier,
  groesse: 180,
  eigenstaendig: true,
});

await sharp(Buffer.from(fuersHandy))
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile(join(wurzel, "public", "apple-touch-icon.png"));

console.log(`Favicon erzeugt: public/favicon.svg (${stahl} auf ${papier})`);
