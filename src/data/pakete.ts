/**
 * Preise und Konfigurator-Logik. Die einzige Stelle im Projekt, an der Zahlen
 * zu Preisen stehen. Kein Template rechnet selbst, kein Template schreibt
 * einen Betrag hin.
 *
 * ACHTUNG Rechtliches: Kleinunternehmer nach § 19 UStG. Unter jede
 * Preisangabe gehört `umsatzsteuerHinweis`. Nie ein Prozentsatz, nie ein
 * Steuerbetrag, nie "zzgl. 19 % USt", nie "0 % MwSt".
 *
 * PLATZHALTER-HINWEIS: Die Preise, Seitenzahlen und Pflegebeträge stammen von
 * Tom. Die Listen `enthalten`, `nichtEnthalten` und `pflegeEnthaelt` sind ein
 * Vorschlag und müssen von ihm bestätigt werden, bevor /preise gebaut wird.
 */

import type { PaketId } from "./typen";

export interface Paket {
  id: PaketId;
  name: string;
  /** Startpreis in Euro. Wird immer mit "ab" angezeigt. */
  preisAb: number;
  seitenMin: number;
  seitenMax: number;
  /** Monatliche Pflege in Euro. */
  pflegeMonat: number;
  /** Einmaliger Aufpreis für die SEO-Grundeinrichtung in Euro. */
  seoAufpreis: number;
  /** Genau eines der drei Pakete ist hervorgehoben. */
  hervorgehoben: boolean;
  /** Ein Satz: für wen das Paket gedacht ist. */
  fuerWen: string;
  enthalten: string[];
  /** Was bewusst fehlt. Bei Start ist dieser Knick gewollt. */
  nichtEnthalten: string[];
  /**
   * Was dieses Paket gegenüber dem darunter zusätzlich kann. Steht im Kasten
   * des Konfigurators, wenn er ins nächste Paket springt. Genau das verkauft
   * Standard — nicht der Preis.
   */
  mehrAlsDavor: string[];
  korrekturrunden: number;
}

export const pakete: Paket[] = [
  {
    id: "start",
    name: "Start",
    preisAb: 449,
    seitenMin: 2,
    seitenMax: 4,
    pflegeMonat: 39,
    seoAufpreis: 149,
    hervorgehoben: false,
    fuerWen:
      "Für kleine Betriebe, die überhaupt erst einmal auffindbar sein wollen.",
    enthalten: [
      "Bis zu 4 Seiten",
      "Auf dem Handy genauso benutzbar wie am Rechner",
      "Kontaktformular",
      "Telefonnummer zum Antippen",
      "Öffnungszeiten und Anfahrt als Text",
      "Impressum und Datenschutz angelegt",
      "Schriften selbst gehostet, kein Cookie-Banner nötig",
      "1 Korrekturrunde",
    ],
    nichtEnthalten: [
      "Keine Online-Terminbuchung",
      "Kein WhatsApp-Knopf",
      "Kein Google-Unternehmensprofil",
      "Nur 1 Korrekturrunde",
    ],
    mehrAlsDavor: [],
    korrekturrunden: 1,
  },
  {
    id: "standard",
    name: "Standard",
    preisAb: 849,
    seitenMin: 5,
    seitenMax: 7,
    pflegeMonat: 59,
    seoAufpreis: 219,
    hervorgehoben: true,
    fuerWen:
      "Für Betriebe, die Termine oder Reservierungen über die Seite bekommen wollen.",
    enthalten: [
      "Bis zu 7 Seiten",
      "Alles aus Start",
      "Online-Terminbuchung oder Reservierung",
      "WhatsApp-Knopf",
      "Google-Unternehmensprofil eingerichtet",
      "Eigene Seite für Karte, Preise oder Leistungen",
      "3 Korrekturrunden",
    ],
    nichtEnthalten: [],
    mehrAlsDavor: [
      "3 Seiten mehr",
      "Online-Terminbuchung oder Reservierung",
      "WhatsApp-Knopf",
      "Google-Unternehmensprofil eingerichtet",
      "3 statt 1 Korrekturrunde",
    ],
    korrekturrunden: 3,
  },
  {
    id: "komplett",
    name: "Komplett",
    preisAb: 1249,
    seitenMin: 8,
    seitenMax: 12,
    pflegeMonat: 89,
    seoAufpreis: 289,
    hervorgehoben: false,
    fuerWen:
      "Für Betriebe mit vielen Leistungen, mehreren Standorten oder offenen Stellen.",
    enthalten: [
      "Bis zu 12 Seiten",
      "Alles aus Standard",
      "Eigene Seite je Leistung oder Angebot",
      "Stellenanzeigen",
      "Deine Fotos zugeschnitten und fürs Web aufbereitet",
      "5 Korrekturrunden",
    ],
    nichtEnthalten: [],
    mehrAlsDavor: [
      "5 Seiten mehr",
      "Eigene Seite je Leistung oder Angebot",
      "Stellenanzeigen",
      "Deine Fotos zugeschnitten und aufbereitet",
      "5 statt 3 Korrekturrunden",
    ],
    korrekturrunden: 5,
  },
];

/** Jede Seite über dem Inklusivumfang des gewählten Pakets, in Euro. */
export const preisProZusatzseite = 90;

/** Steht unter jeder Preisangabe. Nicht verändern. */
export const umsatzsteuerHinweis =
  "Kein Ausweis von Umsatzsteuer nach § 19 UStG";

/** Was in der monatlichen Pflege steckt — gilt für alle drei Pakete. */
export const pflegeEnthaelt: string[] = [
  "Hosting und Domain",
  "Sicherheitsupdates",
  "Tägliche Sicherung",
  "Kleine Textänderungen, die du mir schickst",
  "Erreichbarkeitsprüfung",
];

// ---------------------------------------------------------------------------
// Seitenoptionen für den Konfigurator
// ---------------------------------------------------------------------------

export interface Seitenoption {
  slug: string;
  name: string;
  /** Ein kurzer Satz, was auf die Seite gehört. */
  beschreibung: string;
  /** Fest gesetzt: kann nicht abgewählt werden. */
  fest: boolean;
  /** Zählt in die Seitenzahl des Pakets hinein. */
  zaehlt: boolean;
}

export const seitenOptionen: Seitenoption[] = [
  {
    slug: "startseite",
    name: "Startseite",
    beschreibung: "Wer du bist, was du anbietest, wie man dich erreicht.",
    fest: true,
    zaehlt: true,
  },
  {
    slug: "kontakt",
    name: "Kontakt",
    beschreibung: "Formular, Telefonnummer, Anfahrt, Öffnungszeiten.",
    fest: true,
    zaehlt: true,
  },
  {
    slug: "angebot",
    name: "Karte, Preise oder Leistungen",
    beschreibung: "Als Text, damit Google es lesen kann. Kein PDF, kein Foto.",
    fest: false,
    zaehlt: true,
  },
  {
    slug: "ueber-uns",
    name: "Über den Betrieb",
    beschreibung: "Wer dahintersteckt. Der meistgelesene Text nach der Karte.",
    fest: false,
    zaehlt: true,
  },
  {
    slug: "galerie",
    name: "Bilder",
    beschreibung: "Räume, Arbeiten, Ergebnisse. Deine Fotos, keine gekauften.",
    fest: false,
    zaehlt: true,
  },
  {
    slug: "team",
    name: "Team",
    beschreibung: "Namen und Gesichter. Schafft Vertrauen vor dem ersten Anruf.",
    fest: false,
    zaehlt: true,
  },
  {
    slug: "termine",
    name: "Termin oder Reservierung",
    beschreibung: "Buchung ohne Anruf. Ab Standard enthalten.",
    fest: false,
    zaehlt: true,
  },
  {
    slug: "aktuelles",
    name: "Aktuelles",
    beschreibung: "Mittagskarte, Aktionen, Betriebsferien. Nur, wenn du es pflegst.",
    fest: false,
    zaehlt: true,
  },
  {
    slug: "jobs",
    name: "Stellenanzeigen",
    beschreibung: "Offene Stellen. Wird oft öfter aufgerufen als die Startseite.",
    fest: false,
    zaehlt: true,
  },
  {
    slug: "fragen",
    name: "Häufige Fragen",
    beschreibung: "Parken, Barrierefreiheit, Hunde, Zahlung. Spart Anrufe.",
    fest: false,
    zaehlt: true,
  },
  {
    slug: "gutscheine",
    name: "Gutscheine",
    beschreibung: "Was es gibt und wie man sie bekommt.",
    fest: false,
    zaehlt: true,
  },
  {
    slug: "rechtliches",
    name: "Impressum und Datenschutz",
    beschreibung: "Pflicht. Zählt nicht in die Seitenzahl.",
    fest: true,
    zaehlt: false,
  },
];

/** Die Slugs, die immer gesetzt sind. Der Konfigurator zeigt sie angehakt und gesperrt. */
export const festeSeiten = seitenOptionen
  .filter((o) => o.fest)
  .map((o) => o.slug);

// ---------------------------------------------------------------------------
// Rechnen — hier, nicht im Template
// ---------------------------------------------------------------------------

export function paketNach(id: PaketId): Paket {
  const treffer = pakete.find((p) => p.id === id);
  if (!treffer) throw new Error(`Unbekanntes Paket: ${id}`);
  return treffer;
}

/** Zählt die Seiten, die in die Paketgrenze hineinzählen. */
export function seitenZaehlen(gewaehlteSlugs: string[]): number {
  return seitenOptionen.filter(
    (o) => o.zaehlt && (o.fest || gewaehlteSlugs.includes(o.slug))
  ).length;
}

/**
 * Das kleinste Paket, in dem diese Seitenzahl ohne Aufpreis enthalten ist.
 * Über 12 Seiten bleibt es bei Komplett, der Rest wird pro Seite berechnet.
 */
export function empfohlenesPaket(seitenAnzahl: number): Paket {
  return (
    pakete.find((p) => seitenAnzahl <= p.seitenMax) ?? pakete[pakete.length - 1]
  );
}

export interface Rechnung {
  paket: Paket;
  seitenAnzahl: number;
  /** Seiten über dem Inklusivumfang des gewählten Pakets. */
  zusatzseiten: number;
  /** Kosten für diese Zusatzseiten in Euro. */
  zusatzkosten: number;
  /** Einmalig, inklusive Zusatzseiten und gegebenenfalls SEO. */
  gesamt: number;
  pflegeMonat: number;
  /** Passt die Seitenzahl ohne Aufpreis in das gewählte Paket? */
  passt: boolean;
  /**
   * Gefüllt, sobald die Seitenzahl das gewählte Paket sprengt — unabhängig
   * davon, ob das größere Paket billiger ist. Das ist der Kasten mit dem
   * Knopf zum Wechseln.
   */
  empfehlung: Empfehlung | null;
}

export interface Empfehlung {
  paket: Paket;
  /** Gesamtpreis, wenn gewechselt wird. */
  gesamt: number;
  /** Differenz zum Bleiben. Positiv heißt: der Wechsel kostet mehr. */
  unterschied: number;
  /** Was der Wechsel zusätzlich bringt. Kommt aus mehrAlsDavor. */
  dazu: string[];
  /** Monatliche Pflege im größeren Paket. */
  pflegeMonat: number;
}

/**
 * Rechnet einen Stand des Konfigurators durch.
 *
 * Überschreitet die Seitenzahl das gewählte Paket, wird immer das nächste
 * empfohlen — auch wenn Bleiben plus Zusatzseiten billiger wäre. Der Kunde
 * darf bleiben, sieht aber, was ihm dabei fehlt. Genau dieser Knick verkauft
 * Standard.
 */
export function rechnen(optionen: {
  paketId: PaketId;
  seitenAnzahl: number;
  mitSeo: boolean;
}): Rechnung {
  const paket = paketNach(optionen.paketId);
  const kosten = (p: Paket) =>
    p.preisAb +
    Math.max(0, optionen.seitenAnzahl - p.seitenMax) * preisProZusatzseite +
    (optionen.mitSeo ? p.seoAufpreis : 0);

  const zusatzseiten = Math.max(0, optionen.seitenAnzahl - paket.seitenMax);
  const gesamt = kosten(paket);
  const passt = zusatzseiten === 0;

  const naechstes = empfohlenesPaket(optionen.seitenAnzahl);
  const empfehlung: Empfehlung | null =
    passt || naechstes.id === paket.id
      ? null
      : {
          paket: naechstes,
          gesamt: kosten(naechstes),
          unterschied: kosten(naechstes) - gesamt,
          dazu: naechstes.mehrAlsDavor,
          pflegeMonat: naechstes.pflegeMonat,
        };

  return {
    paket,
    seitenAnzahl: optionen.seitenAnzahl,
    zusatzseiten,
    zusatzkosten: zusatzseiten * preisProZusatzseite,
    gesamt,
    pflegeMonat: paket.pflegeMonat,
    passt,
    empfehlung,
  };
}

/** Einheitliche Schreibweise für Beträge: "449 €". */
export function euro(betrag: number): string {
  return `${betrag.toLocaleString("de-DE")} €`;
}
