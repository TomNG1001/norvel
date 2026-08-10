/**
 * Wächter über die wichtigste technische Regel:
 * Der Markenname steht ausschließlich in src/config/brand.ts.
 *
 * Das Skript liest den Namen aus brand.ts, durchsucht src, public und
 * scripts sowie alle Dateinamen im Projekt und bricht mit Code 1 ab, sobald
 * der Name irgendwo außerhalb von brand.ts auftaucht.
 *
 * Läuft ohne jedes Paket, nur mit Node.
 */

import { readFile, readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const wurzel = fileURLToPath(new URL("..", import.meta.url));
const markenDatei = join(wurzel, "src", "config", "brand.ts");

/** Ordner, die durchsucht werden. */
const ORDNER = ["src", "public", "scripts"];

/** Wird nie betreten. */
const AUSGENOMMEN = new Set([
  "node_modules",
  "dist",
  ".git",
  ".astro",
  ".vercel",
  ".netlify",
]);

/** Dateien, die nicht auf Inhalt geprüft werden. */
const NICHT_PRUEFEN = new Set([
  relative(wurzel, markenDatei),
  join("scripts", "check-brand.mjs"),
]);

/** Nur Textdateien lesen. */
const TEXT_ENDUNGEN = new Set([
  ".astro", ".ts", ".tsx", ".js", ".mjs", ".cjs", ".jsx", ".json",
  ".css", ".scss", ".html", ".xml", ".txt", ".md", ".svg", ".webmanifest",
  ".yml", ".yaml", ".csv",
]);

function endung(name) {
  const punkt = name.lastIndexOf(".");
  return punkt === -1 ? "" : name.slice(punkt).toLowerCase();
}

async function markennameLesen() {
  let inhalt;
  try {
    inhalt = await readFile(markenDatei, "utf8");
  } catch {
    console.error("FEHLER: src/config/brand.ts nicht gefunden.");
    process.exit(1);
  }
  const treffer = inhalt.match(/name:\s*["'`]([^"'`]+)["'`]/);
  if (!treffer) {
    console.error("FEHLER: In brand.ts steht kein Feld name: \"…\".");
    process.exit(1);
  }
  return treffer[1];
}

async function dateienSammeln(ordner, gesammelt = []) {
  let eintraege;
  try {
    eintraege = await readdir(ordner, { withFileTypes: true });
  } catch {
    return gesammelt; // Ordner gibt es noch nicht — in Ordnung.
  }
  for (const eintrag of eintraege) {
    if (AUSGENOMMEN.has(eintrag.name)) continue;
    const pfad = join(ordner, eintrag.name);
    if (eintrag.isDirectory()) await dateienSammeln(pfad, gesammelt);
    else if (eintrag.isFile()) gesammelt.push(pfad);
  }
  return gesammelt;
}

/** Alle Pfade im Projekt, für die Prüfung der Namen. */
async function pfadeSammeln(ordner, gesammelt = []) {
  let eintraege;
  try {
    eintraege = await readdir(ordner, { withFileTypes: true });
  } catch {
    return gesammelt;
  }
  for (const eintrag of eintraege) {
    if (AUSGENOMMEN.has(eintrag.name)) continue;
    const pfad = join(ordner, eintrag.name);
    gesammelt.push(pfad);
    if (eintrag.isDirectory()) await pfadeSammeln(pfad, gesammelt);
  }
  return gesammelt;
}

const name = await markennameLesen();
const gesucht = name.toLowerCase();
const funde = [];

// 1. Inhalte von src, public, scripts
for (const ordner of ORDNER) {
  const dateien = await dateienSammeln(join(wurzel, ordner));
  for (const datei of dateien) {
    const kurz = relative(wurzel, datei);
    if (NICHT_PRUEFEN.has(kurz)) continue;
    if (!TEXT_ENDUNGEN.has(endung(datei))) continue;

    const inhalt = await readFile(datei, "utf8");
    const zeilen = inhalt.split("\n");
    zeilen.forEach((zeile, i) => {
      if (zeile.toLowerCase().includes(gesucht)) {
        funde.push(`${kurz}:${i + 1}  ${zeile.trim().slice(0, 100)}`);
      }
    });
  }
}

// 2. Datei- und Ordnernamen im ganzen Projekt
for (const pfad of await pfadeSammeln(wurzel)) {
  const kurz = relative(wurzel, pfad);
  if (kurz.split(sep).some((teil) => teil.toLowerCase().includes(gesucht))) {
    funde.push(`Dateiname: ${kurz}`);
  }
}

if (funde.length > 0) {
  console.error(
    `\nMarkenname-Prüfung fehlgeschlagen: "${name}" steht ${funde.length}-mal` +
      ` außerhalb von src/config/brand.ts.\n`
  );
  for (const fund of funde) console.error("  " + fund);
  console.error(
    "\nDen Namen dort entfernen und stattdessen brand.name importieren.\n"
  );
  process.exit(1);
}

console.log(
  `Markenname-Prüfung bestanden: "${name}" steht nur in src/config/brand.ts.`
);
