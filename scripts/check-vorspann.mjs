/**
 * Vorspann-Wächter, nach VELLOX OS (04_UI/07-handy-zuerst-und-gemessen.md).
 *
 * > Ein Vorspann mit mehr als zwei Sätzen ist am Telefon keine Einleitung,
 * > sondern eine Textwand.
 *
 * Die Zeilenzahl am Gerät zu messen braucht einen Browser und ein Urteil.
 * Die Satzzahl braucht beides nicht, also gehört sie in den Bau und nicht in
 * eine Checkliste, die man vergessen kann.
 *
 * Wer mehr sagen will, sagt es im Absatz darunter. Die Auszeichnung
 * `vorspann` ist für die Einleitung da, nicht für den Fließtext.
 *
 * Läuft gegen dist/ und damit gegen das, was wirklich ausgeliefert wird.
 */

import { readFile, readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const wurzel = fileURLToPath(new URL("..", import.meta.url));
const dist = join(wurzel, "dist");

const HOECHSTENS = 2;

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

function textAus(html) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Sätze zählen. Abkürzungen mit Punkt würden falsch zählen, deshalb werden
 * die wenigen, die in diesen Texten vorkommen, vorher entschärft.
 */
function saetze(text) {
  const bereinigt = text
    .replace(/\bz\. B\./g, "zB")
    .replace(/\bd\. h\./g, "dh")
    .replace(/\bu\. a\./g, "ua")
    .replace(/§ (\d+)/g, "§$1");
  return bereinigt.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0)
    .length;
}

const funde = [];

for (const datei of await htmlDateien(dist)) {
  const html = await readFile(datei, "utf8");
  const seite = relative(dist, datei).replace(/\/?index\.html$/, "/");

  for (const treffer of html.matchAll(
    /<p class="[^"]*\bvorspann\b[^"]*"[^>]*>([\s\S]*?)<\/p>/g
  )) {
    const text = textAus(treffer[1]);
    const anzahl = saetze(text);
    if (anzahl > HOECHSTENS) {
      funde.push(`${seite}  ${anzahl} Sätze: ${text.slice(0, 72)}…`);
    }
  }
}

if (funde.length > 0) {
  console.error(
    `\nVorspann-Prüfung fehlgeschlagen: ${funde.length} Einleitung(en) mit ` +
      `mehr als ${HOECHSTENS} Sätzen.\n`
  );
  for (const fund of funde) console.error("  " + fund);
  console.error(
    "\nEntweder kürzen, oder die Auszeichnung `vorspann` entfernen und den\n" +
      "Text als gewöhnlichen Absatz führen.\n"
  );
  process.exit(1);
}

console.log("Vorspann-Prüfung bestanden: keine Einleitung länger als zwei Sätze.");
