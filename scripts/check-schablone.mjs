/**
 * Schablonen-Wächter, nach VELLOX OS (00_SYSTEM/06-erzwungene-qualitaet.md).
 *
 * Seitenfamilien entstehen fast immer so: Die erste Seite wird geschrieben,
 * die zweite kopiert und der Name getauscht. Zur Schablone werden dabei
 * zuerst die Überschriften, also genau die Stellen, an denen eine Suchmaschine
 * den Aufbau abliest. Der Fließtext bleibt eigenständig, die Gliederung nicht.
 *
 * Das Skript rechnet aus jeder Überschrift den Eigennamen der Seite heraus.
 * Was übrig bleibt, ist die Schablone. Sind zwei Schablonen an derselben
 * Position gleich, bricht der Bau ab. Bleibt nach Abzug des Namens nichts
 * übrig, bestand die Überschrift nur aus ihm; auch das ist eine Schablone.
 *
 * Grenze, ehrlich benannt: Er misst die Gliederung, nicht die Substanz. Zwei
 * Seiten mit verschiedenen Überschriften und austauschbarem Fließtext gehen
 * durch. Er ersetzt den Anti-Template-Review nicht.
 *
 * Läuft gegen dist/ und damit gegen das, was wirklich ausgeliefert wird.
 */

import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const wurzel = fileURLToPath(new URL("..", import.meta.url));
const dist = join(wurzel, "dist");

/** Die Seitenfamilien, die geprüft werden. */
const FAMILIEN = ["branchen", "leistungen", "arbeiten"];

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
 * Alle h1 und h2 aus dem Inhaltsbereich, in Reihenfolge.
 *
 * Abschnitte mit `data-gemeinsam` werden übersprungen. Das betrifft den
 * Kontakt-Abschluss: PROJEKT.md verlangt ihn auf jeder Seite im selben
 * Wortlaut. Seine Gleichheit ist die Regel, nicht ihr Bruch. Die Ausnahme
 * steht im Markup und nicht in einer Liste hier, damit sie beim Lesen der
 * Komponente auffällt.
 */
function ueberschriften(html) {
  const inhalt = (html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? "").replace(
    /<section[^>]*\sdata-gemeinsam[^>]*>[\s\S]*?<\/section>/g,
    ""
  );
  return [...inhalt.matchAll(/<h([12])[^>]*>([\s\S]*?)<\/h\1>/g)]
    .map((m) => textAus(m[2]))
    .filter((t) => t.length > 0);
}

/**
 * Die Eigennamen einer Seite: der Ordnername und alles, was in der ersten
 * Überschrift groß geschrieben vorkommt, reicht nicht. Deshalb werden die
 * Namen übergeben, die das Datenmodell kennt.
 */
async function namenEinerFamilie(familie) {
  const quelle = {
    branchen: ["name", "einzahl"],
    leistungen: ["name"],
    arbeiten: ["name"],
  }[familie];

  const datei = {
    branchen: "branchen.ts",
    leistungen: "leistungen.ts",
    arbeiten: "projekte.ts",
  }[familie];

  const inhalt = await readFile(join(wurzel, "src", "data", datei), "utf8");
  const namen = new Set();
  for (const feld of quelle) {
    for (const treffer of inhalt.matchAll(
      new RegExp(`^\\s{4}${feld}:\\s*"([^"]+)"`, "gm")
    )) {
      namen.add(treffer[1]);
    }
  }
  return [...namen].sort((a, b) => b.length - a.length);
}

/** Eigennamen herausrechnen. Was übrig bleibt, ist die Schablone. */
function schablone(text, namen) {
  let rest = text;
  for (const name of namen) {
    rest = rest.split(name).join("{NAME}");
  }
  return rest.replace(/\s+/g, " ").trim();
}

const funde = [];

for (const familie of FAMILIEN) {
  let ordner;
  try {
    ordner = await readdir(join(dist, familie), { withFileTypes: true });
  } catch {
    continue;
  }

  const namen = await namenEinerFamilie(familie);
  const seiten = [];

  for (const eintrag of ordner) {
    if (!eintrag.isDirectory()) continue;
    const pfad = join(dist, familie, eintrag.name, "index.html");
    let html;
    try {
      html = await readFile(pfad, "utf8");
    } catch {
      continue;
    }
    seiten.push({
      adresse: `/${familie}/${eintrag.name}`,
      schablonen: ueberschriften(html).map((u) => schablone(u, namen)),
    });
  }

  if (seiten.length < 2) continue;

  // Position für Position vergleichen.
  const tiefe = Math.max(...seiten.map((s) => s.schablonen.length));
  for (let i = 0; i < tiefe; i++) {
    const gesehen = new Map();
    for (const seite of seiten) {
      const s = seite.schablonen[i];
      if (s === undefined) continue;

      if (s === "" || s === "{NAME}") {
        funde.push(
          `${seite.adresse}, Überschrift ${i + 1}: besteht nur aus dem Namen`
        );
        continue;
      }
      if (gesehen.has(s)) {
        funde.push(
          `Überschrift ${i + 1} gleich auf ${gesehen.get(s)} und ` +
            `${seite.adresse}: "${s}"`
        );
      } else {
        gesehen.set(s, seite.adresse);
      }
    }
  }
}

if (funde.length > 0) {
  console.error(
    `\nSchablonen-Prüfung fehlgeschlagen: ${funde.length} Stelle(n), an denen ` +
      `zwei Seiten dieselbe Gliederung tragen.\n`
  );
  for (const fund of funde) console.error("  " + fund);
  console.error(
    "\nÜberschriften gehören zur Substanz einer Seite, nicht zur Vorlage.\n" +
      "Sie stehen je Seite in den Datendateien unter `ueberschriften`.\n"
  );
  process.exit(1);
}

console.log("Schablonen-Prüfung bestanden: keine Seitenfamilie teilt ihre Gliederung.");
