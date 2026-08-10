/**
 * Sprachwächter, nach VELLOX OS (00_SYSTEM/05-anti-template-standard.md) und
 * den Tonregeln aus PROJEKT.md.
 *
 * Drei Dinge, die sich mechanisch prüfen lassen und deshalb nicht in einer
 * Checkliste stehen sollten:
 *
 * 1. Gedankenstriche als Stilmittel. Sie erzeugen den Eindruck automatisch
 *    geglätteter Sprache und ersetzen eine klare Satzentscheidung. Der
 *    Halbgeviertstrich in Bereichen (24–72 Stunden) bleibt erlaubt, das ist
 *    ein Bis-Strich und kein Gedankenstrich.
 * 2. Die verbotenen Wörter aus PROJEKT.md.
 * 3. Das Wort "wir". Tom arbeitet allein und schreibt in der Ich-Form.
 *
 * Geprüft wird der Quelltext, nicht nur die fertige Seite: Ein verbotenes
 * Wort in einer Datendatei ist auch dann falsch, wenn es gerade keine Seite
 * ausgibt.
 */

import { readFile, readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const wurzel = fileURLToPath(new URL("..", import.meta.url));

const VERBOTENE_WOERTER = [
  "Lösungen",
  "ganzheitlich",
  "maßgeschneidert",
  "digitale Präsenz",
  "innovativ",
  "Synergie",
  "aufs nächste Level",
  "Ihr Partner für",
];

const ENDUNGEN = [".ts", ".astro", ".mjs"];
const AUSGENOMMEN = new Set(["node_modules", "dist", ".astro", ".git"]);

/** Dateien, die über die Regeln selbst sprechen und sie deshalb nennen dürfen. */
const DARF_NENNEN = new Set([
  join("scripts", "check-sprache.mjs"),
  join("scripts", "check-schablone.mjs"),
]);

async function dateien(ordner, gesammelt = []) {
  let eintraege;
  try {
    eintraege = await readdir(ordner, { withFileTypes: true });
  } catch {
    return gesammelt;
  }
  for (const e of eintraege) {
    if (AUSGENOMMEN.has(e.name)) continue;
    const pfad = join(ordner, e.name);
    if (e.isDirectory()) await dateien(pfad, gesammelt);
    else if (ENDUNGEN.some((x) => e.name.endsWith(x))) gesammelt.push(pfad);
  }
  return gesammelt;
}

const funde = [];

for (const datei of await dateien(join(wurzel, "src"))) {
  const kurz = relative(wurzel, datei);
  if (DARF_NENNEN.has(kurz)) continue;

  const zeilen = (await readFile(datei, "utf8")).split("\n");
  zeilen.forEach((zeile, i) => {
    const ort = `${kurz}:${i + 1}`;

    if (zeile.includes("—")) {
      funde.push(`${ort}  Gedankenstrich: ${zeile.trim().slice(0, 70)}`);
    }
    for (const wort of VERBOTENE_WOERTER) {
      if (zeile.includes(wort)) {
        funde.push(`${ort}  verbotenes Wort "${wort}"`);
      }
    }
    // "wir" als eigenständiges Wort, nicht in "wirklich" oder "wird".
    if (/(^|[^a-zäöüß])[Ww]ir([^a-zäöüßA-ZÄÖÜ]|$)/.test(zeile)) {
      funde.push(`${ort}  "wir": ${zeile.trim().slice(0, 70)}`);
    }
  });
}

if (funde.length > 0) {
  console.error(`\nSprachprüfung fehlgeschlagen: ${funde.length} Fund(e).\n`);
  for (const fund of funde) console.error("  " + fund);
  console.error("");
  process.exit(1);
}

console.log(
  "Sprachprüfung bestanden: keine Gedankenstriche, keine verbotenen Wörter, kein Kollektiv."
);
