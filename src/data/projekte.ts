/**
 * Die drei Beispielprojekte. Aus dieser Datei entstehen in Schritt 8 die
 * Übersicht und die drei Detailseiten.
 *
 * RECHTLICHES, nicht verhandelbar:
 * Es gibt noch keine Kundenprojekte. Jedes Projekt hier ist ein Konzept und
 * muss auf jeder Ansicht sichtbar als Konzeptprojekt gekennzeichnet sein.
 * Erfundene Kundenzitate oder Erfolgszahlen sind verboten (§ 5 UWG,
 * irreführende Werbung). Deshalb gibt es hier keine Felder für Zitate oder
 * Zahlen, was es nicht gibt, kann auch niemand versehentlich füllen.
 *
 * Wird aus einem Konzept ein echtes Kundenprojekt, springt `art` von
 * "konzept" auf "kunde". Der Hinweis über den Karten verschwindet dann von
 * selbst, sobald kein Konzept mehr dabei ist.
 *
 * Name, Bild und Dauer je Projekt: siehe die Kommentare an den Feldern. Sie stehen
 * bewusst als erkennbarer Platzhalter da und nicht als erfundener Inhalt.
 */

import type { Bild, PaketId } from "./typen";

export type Projektart = "konzept" | "kunde";

export interface Projekt {
  slug: string;
  /**
   * Konzeptprojekte tragen keinen erfundenen Betriebsnamen, sondern
   * beschreiben den Betrieb. Ein ausgedachter Name auf einer Referenzseite
   * liest sich wie ein Kunde, der nicht existiert.
   */
  name: string;
  art: Projektart;
  /** Slug aus branchen.ts. Jedes Projekt kennt seine Branche. */
  branche: string;
  /** Ein Satz für die Karte auf der Übersicht. */
  kurz: string;
  /** Unter 60 Zeichen, ohne Markennamen. */
  seoTitel: string;
  /** Unter 160 Zeichen. */
  seoText: string;
  /**
   * Eigene Überschriften je Projekt. Ohne sie tragen alle drei Seiten
   * dieselbe Gliederung, und `npm run check:schablone` bricht den Bau ab.
   */
  ueberschriften: {
    /** Steht hinter dem Projektnamen in der h1. Ein Name allein ist keine Überschrift. */
    seite: string;
    aufgabe: string;
    eckdaten: string;
    branche: string;
    andere: string;
  };
  /** Die Ausgangslage: was der Betrieb braucht. */
  aufgabe: string;
  /** Was gebaut wurde und warum so. */
  umsetzung: string[];
  paket: PaketId;
  seitenzahl: number;
  /**
   * Nur bei Kundenprojekten. Konzepte hatten keinen Auftraggeber, also gibt
   * es keine Bauzeit, die man ehrlich nennen könnte. Dann steht hier null
   * und die Zeile in den Eckdaten entfällt.
   */
  dauer: string | null;
  /** null, solange kein Bild vorliegt. Kein Stockfoto. */
  bild: Bild | null;
  /** Bei Konzeptprojekten immer null. Es gibt nichts Erreichbares. */
  liveUrl: string | null;
}

export const projekte: Projekt[] = [
  {
    slug: "restaurant",
    name: "Restaurant mit Mittagstisch",
    art: "konzept",
    branche: "restaurants",
    kurz: "Ein Restaurant mit Mittagstisch, wechselnder Karte und Reservierung am Abend.",
    seoTitel: "Konzeptprojekt: Website für ein Restaurant",
    seoText:
      "Wie eine Restaurantseite aufgebaut ist, die Google lesen kann: Karte als Text, Öffnungszeiten oben, Reservierung ohne Anruf.",
    ueberschriften: {
      seite: "Karte, Zeiten, Reservierung",
      aufgabe: "PDF-Karte und Telefon zur Stoßzeit",
      eckdaten: "Umfang und Paket",
      branche: "Was Gastronomen daraus mitnehmen",
      andere: "Zwei weitere Konzepte",
    },
    aufgabe:
      "Die Speisekarte liegt als PDF auf der alten Seite und als Foto auf Facebook. Beides findet Google nicht. Abends klingelt das Telefon für Reservierungen, während der Service läuft.",
    umsetzung: [
      "Karte als Text angelegt, nach Gängen sortiert, auf dem Handy ohne Zoomen lesbar",
      "Öffnungszeiten und Küchenzeiten direkt unter dem ersten Bildschirm",
      "Reservierung über ein Formular statt über das Telefon zur Stoßzeit",
      "Mittagstisch als eigene Seite, damit die Woche einzeln auffindbar ist",
      "Telefonnummer im Kopfbereich zum Antippen",
    ],
    paket: "standard",
    seitenzahl: 6,
    dauer: null,
    bild: null,
    liveUrl: null,
  },

  {
    slug: "kosmetikstudio",
    name: "Kosmetikstudio mit Abendterminen",
    art: "konzept",
    branche: "kosmetik",
    kurz: "Ein Studio mit einer Behandlerin, festen Behandlungen und Terminen nach Feierabend.",
    seoTitel: "Konzeptprojekt: Website für ein Kosmetikstudio",
    seoText:
      "Wie eine Studioseite aufgebaut ist, die Anfragen sortiert: Behandlungen mit Preis und Dauer, Termine online, Anfahrt und Parken.",
    ueberschriften: {
      seite: "Behandlungen mit Preis und Dauer",
      aufgabe: "Anfragen zwischen zwei Kundinnen",
      eckdaten: "Umfang und Dauer",
      branche: "Was das für ein Studio heißt",
      andere: "Die anderen beiden Konzepte",
    },
    aufgabe:
      "Anfragen kommen über Instagram, oft spätabends, und werden zwischen zwei Kundinnen beantwortet. Preise stehen nirgends, deshalb dreht sich der erste Kontakt immer um Grundsätzliches.",
    umsetzung: [
      "Behandlungen mit Preis und Dauer, nach Bereichen gruppiert",
      "Online-Terminbuchung als Hauptweg, Telefon als zweiter",
      "Fotos aus dem Studio statt gekaufter Bilder",
      "Ein Absatz zu Anfahrt und Parken, weil das die häufigste Rückfrage ist",
      "Häufige Fragen als eigene Seite, um Erstgespräche zu entlasten",
    ],
    paket: "standard",
    seitenzahl: 6,
    dauer: null,
    bild: null,
    liveUrl: null,
  },

  {
    slug: "hundesalon",
    name: "Hundesalon mit langer Warteliste",
    art: "konzept",
    branche: "hundefriseure",
    kurz: "Ein Hundesalon mit Preisen nach Größe und Wartezeit von mehreren Wochen.",
    seoTitel: "Konzeptprojekt: Website für einen Hundesalon",
    seoText:
      "Wie eine Salonseite aufgebaut ist, die Rückfragen spart: Preise nach Größe, Wartezeit offen genannt, Termine über ein Formular.",
    ueberschriften: {
      seite: "Preise nach Größe, Wartezeit offen",
      aufgabe: "Dreimal dieselbe Frage",
      eckdaten: "Paket und Seitenzahl",
      branche: "Übertragen auf deinen Salon",
      andere: "Zwei andere Beispiele",
    },
    aufgabe:
      "Halter rufen an und fragen dreimal dasselbe: Nimmst du meine Rasse, was kostet das, wie lange dauert es. Die Wartezeit beträgt mehrere Wochen, das erfahren die Anrufer erst am Ende des Gesprächs.",
    umsetzung: [
      "Preisspannen nach Größe, mit Beispielrassen zur Einordnung",
      "Wartezeit offen auf der Startseite genannt",
      "Terminanfrage über ein Formular, auch nach Feierabend",
      "Was mitzubringen ist: Impfpass, letzte Behandlung, Besonderheiten",
      "Bilder aus dem Salon, mit Einverständnis der Halter",
    ],
    paket: "start",
    seitenzahl: 4,
    dauer: null,
    bild: null,
    liveUrl: null,
  },
];

/**
 * Steht über den Projektkarten, solange mindestens ein Konzept dabei ist.
 * Verschwindet automatisch, sobald alle Projekte auf "kunde" stehen.
 */
export const hinweisKonzeptprojekte =
  "Ich baue seit Kurzem Websites für Betriebe in der Region. Es ist noch keine Kundenseite live. Die folgenden Projekte sind Konzepte: echte Aufgabenstellungen, von mir durchgeplant und gebaut, aber ohne Auftraggeber.";

/**
 * Dieselbe Ehrlichkeit in einem Satz, für die Startseite. Dort stand vorher
 * die lange Fassung, und zwar über den Karten: Der Besucher las erst die
 * Erklärung, warum es keine Kunden gibt, und dann die Arbeit. Jetzt steht die
 * Arbeit zuerst und der Satz darunter. Der Hinweis verschwindet nicht, er
 * kommt nur an die richtige Stelle.
 */
export const hinweisKonzeptprojekteKurz =
  "Keines davon hat einen Auftraggeber. Ich zeige dir lieber, wie ich eine Aufgabe angehe, als eine Kundenliste, die es nicht gibt.";

/** True, solange irgendein Projekt noch ein Konzept ist. */
export const zeigeKonzepthinweis = projekte.some((p) => p.art === "konzept");

/** Beschriftung, die auf jeder Karte und jeder Detailseite sichtbar sein muss. */
export function kennzeichnung(projekt: Projekt): string | null {
  return projekt.art === "konzept" ? "Konzeptprojekt" : null;
}

export function projektNach(slug: string): Projekt | undefined {
  return projekte.find((p) => p.slug === slug);
}

export function projekteDerBranche(brancheSlug: string): Projekt[] {
  return projekte.filter((p) => p.branche === brancheSlug);
}
