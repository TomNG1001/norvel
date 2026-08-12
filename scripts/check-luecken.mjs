/**
 * Der fünfte Wächter: fehlende Leerzeichen vor einem eingesetzten Wert.
 *
 * Warum es ihn gibt. Auf /ueber-mich stand im Quelltext:
 *
 *     Websites für kleine Betriebe im
 *     {brand.region}. Meine Nummer steht …
 *
 * Im Quelltext sieht das richtig aus. Astro wirft den Zeilenumbruch samt
 * Einrückung vor einem Ausdruck aber weg, und im ausgelieferten HTML stand
 * "Betriebe imRhein-Neckar-Kreis". Auf der Seite, auf der Tom sich vorstellt.
 *
 * Der Fehler ist im Code unsichtbar, er entsteht erst beim Bauen. Genau die
 * Sorte, die Vellox mechanisiert haben will: nicht aufschreiben, abfangen.
 *
 * Geprüft wird das fertige HTML auf zwei Kleinbuchstaben, denen ohne
 * Leerzeichen ein Großbuchstabe folgt. Echte Binnenversalien stehen unten in
 * der Ausnahmeliste, sonst würde jedes "WhatsApp" den Bau abbrechen.
 */

import { readFile, readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const wurzel = fileURLToPath(new URL("..", import.meta.url));
const dist = join(wurzel, "dist");

/** Wörter, die zu Recht mitten im Wort einen Großbuchstaben tragen. */
const ERLAUBT = ["WhatsApp", "JavaScript", "YouTube", "PayPal", "iPhone"];

async function htmlDateien(ordner, gesammelt = []) {
  let eintraege;
  try {
    eintraege = await readdir(ordner, { withFileTypes: true });
  } catch {
    return gesammelt;
  }
  for (const e of eintraege) {
    const pfad = join(ordner, e.name);
    if (e.isDirectory()) await htmlDateien(pfad, gesammelt);
    else if (e.name.endsWith(".html")) gesammelt.push(pfad);
  }
  return gesammelt;
}

/**
 * Nur den sichtbaren Text übrig lassen.
 *
 * Attribute fallen dabei weg, also auch die Meta-Beschreibung. Das ist kein
 * Versehen: Dort steht der Text in einer Zeichenkette, und in einer
 * Zeichenkette verschluckt Astro keine Leerzeichen. Der Fehler kann dort
 * also gar nicht entstehen.
 */
function nurText(html) {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ");
}

const funde = [];

for (const datei of await htmlDateien(dist)) {
  const text = nurText(await readFile(datei, "utf8"));

  for (const treffer of text.matchAll(/[a-zäöüß]{2}(?=[A-ZÄÖÜ][a-zäöü]{2})/g)) {
    /* Der Ausschnitt beginnt bewusst deutlich vor dem Treffer: Bei
       "WhatsApp" passt das Muster auf "ts", und ohne genug Vorlauf stünde
       das W nicht im Ausschnitt, an dem die Ausnahmeliste prüft. */
    const stelle = text
      .slice(Math.max(0, treffer.index - 12), treffer.index + 24)
      .trim();
    if (ERLAUBT.some((wort) => stelle.includes(wort))) continue;
    funde.push(`${relative(wurzel, datei)}  "${stelle}"`);
  }
}

if (funde.length > 0) {
  console.error(
    `\nLückenprüfung fehlgeschlagen: ${funde.length} zusammengelaufene Stelle(n).\n`
  );
  for (const fund of funde) console.error("  " + fund);
  console.error(
    "\nMeist fehlt vor einem {ausdruck} am Zeilenanfang ein {\" \"}.\n"
  );
  process.exit(1);
}

console.log(
  "Lückenprüfung bestanden: kein Wort ist mit dem nächsten zusammengelaufen."
);
