/**
 * Die drei Leistungen. Aus dieser Datei entstehen die Übersicht und die drei
 * Unterseiten.
 *
 * Das Google-Unternehmensprofil war ursprünglich die vierte Leistung. Am
 * 10.08. auf Ansage entfernt: Tom bietet es nicht an.
 *
 * Preise stehen hier nicht. Wo ein Paket gemeint ist, steht seine Kennung.
 * Die Zahlen holt die Seite aus pakete.ts.
 *
 * PLATZHALTER-HINWEIS: Die Listen unter `enthalten` beschreiben, was Tom
 * tatsächlich macht. Sie sind aus den Paketen abgeleitet und müssen von ihm
 * bestätigt werden, bevor Schritt 6 gebaut wird.
 */

import type { FaqEintrag } from "./typen";

export interface Leistung {
  slug: string;
  name: string;
  /** Ein bis zwei Sätze für die Karte auf der Übersicht. */
  kurz: string;
  /** Unter 60 Zeichen, ohne Markennamen. */
  seoTitel: string;
  /** Unter 160 Zeichen. */
  seoText: string;
  /**
   * Eigene Überschriften je Leistung. Ohne sie tragen alle drei Seiten
   * dieselbe Gliederung, und `npm run check:schablone` bricht den Bau ab.
   */
  ueberschriften: {
    seite: string;
    warum: string;
    preis: string;
    fragen: string;
    weiter: string;
  };
  /** Was ohne diese Leistung schiefgeht. */
  problem: string;
  enthalten: string[];
  /**
   * Welche Zahl aus pakete.ts für diese Leistung die richtige ist. Die Zahl
   * selbst steht nicht hier, nur, welche gemeint ist.
   *
   * einmalig   → der Grundpreis des kleinsten Pakets
   * monatlich  → die monatliche Pflege des kleinsten Pakets
   * aufpreis   → der einmalige SEO-Aufpreis des kleinsten Pakets
   */
  preisArt: "einmalig" | "monatlich" | "aufpreis";
  faq: FaqEintrag[];
}

export const leistungen: Leistung[] = [
  {
    slug: "website",
    name: "Website",
    kurz: "Zwei bis zwölf Seiten, fest gebaut, schnell auf dem Handy. Das Grundgerüst steht in 24 bis 72 Stunden.",
    seoTitel: "Website für kleine Betriebe im Rhein-Neckar-Kreis",
    seoText:
      "Eine Seite, die auf dem Handy schnell lädt, deine Öffnungszeiten zeigt und bei Google gefunden wird. Grundgerüst in 24 bis 72 Stunden.",
    ueberschriften: {
      seite: "Zwei bis zwölf Seiten, fest gebaut",
      warum: "Warum die alte Seite Anrufe kostet",
      preis: "Was eine Seite kostet",
      fragen: "Fragen zum Bau",
      weiter: "Was noch dazugehört",
    },
    problem:
      "Die meisten Betriebsseiten sind vor Jahren gebaut worden, laden langsam und sind auf dem Handy kaum zu bedienen. Genau dort schauen aber neun von zehn Leuten nach.",
    enthalten: [
      "Aufbau und Gestaltung der Seiten",
      "Texte gemeinsam durchgegangen und gekürzt",
      "Deine Fotos zugeschnitten und fürs Web aufbereitet",
      "Auf dem Handy zuerst gebaut, dann für den Rechner",
      "Kein Cookie-Banner, weil nichts mitgeschnitten wird",
      "Impressum und Datenschutz angelegt, Inhalt kommt von dir",
      "Übergabe mit Einweisung, was du wie ändern lässt",
    ],
    preisArt: "einmalig",
    faq: [
      {
        frage: "Wie lange dauert das wirklich?",
        antwort:
          "Das Grundgerüst steht in 24 bis 72 Stunden, sobald deine Texte und Bilder da sind. Genau daran hängt es meistens, nicht am Bauen.",
      },
      {
        frage: "Was brauchst du von mir?",
        antwort:
          "Texte oder Stichpunkte, Fotos, Öffnungszeiten, deine Rechtstexte fürs Impressum. Den Rest sortiere ich.",
      },
      {
        frage: "Kann ich später Seiten ergänzen?",
        antwort:
          "Ja. Jede Seite über dem Umfang deines Pakets wird einzeln berechnet, den Preis findest du unter Preise.",
      },
    ],
  },

  {
    slug: "hosting-pflege",
    name: "Hosting und Pflege",
    kurz: "Deine Seite läuft, wird gesichert und bleibt aktuell. Kleine Änderungen schickst du mir, ich setze sie um.",
    seoTitel: "Hosting und Pflege für kleine Betriebe",
    seoText:
      "Seite läuft, wird täglich gesichert, Änderungen setze ich um. Ein fester Betrag im Monat, keine versteckten Posten.",
    ueberschriften: {
      seite: "Damit die Seite läuft und aktuell bleibt",
      warum: "Eine Website ist kein Möbelstück",
      preis: "Was der laufende Betrieb kostet",
      fragen: "Fragen zum Betrieb",
      weiter: "Was sonst noch ansteht",
    },
    problem:
      "Eine Website ist kein Möbelstück. Öffnungszeiten ändern sich, Feiertage kommen, Zertifikate laufen ab. Ohne Pflege steht in zwei Jahren die Weihnachtskarte von vorletztem Jahr online.",
    enthalten: [
      "Hosting und Domain",
      "Sicherheitsupdates",
      "Tägliche Sicherung",
      "Kleine Textänderungen, die du mir schickst",
      "Regelmäßige Prüfung, ob die Seite erreichbar ist",
      "Ein Ansprechpartner, kein Ticketsystem",
    ],
    preisArt: "monatlich",
    faq: [
      {
        frage: "Was zählt als kleine Änderung?",
        antwort:
          "Öffnungszeiten, Preise, ein neuer Absatz, ein ausgetauschtes Foto. Eine neue Seite oder ein neuer Bereich ist keine kleine Änderung.",
      },
      {
        frage: "Kann ich kündigen?",
        antwort:
          "Laufzeit und Kündigungsfrist stehen in deinem Angebot, bevor du zusagst. Frag mich im Telefonat danach, das ist keine Frage, die ich ungern höre.",
      },
      {
        frage: "Was passiert mit meiner Seite, wenn ich kündige?",
        antwort:
          "Auch das steht im Angebot: was mit deiner Domain passiert und was du an Dateien bekommst. Schriftlich, bevor es losgeht, nicht erst wenn es so weit ist.",
      },
    ],
  },

  {
    slug: "seo",
    name: "Auffindbarkeit bei Google",
    kurz: "Damit deine Seite bei den Suchen auftaucht, die für dich Geld bringen. Einmalige Einrichtung, kein Abo.",
    seoTitel: "Bei Google gefunden werden, für kleine Betriebe",
    seoText:
      "Titel, Beschreibungen, Struktur und Ortsbezug so eingerichtet, dass Google deine Seite versteht und in der Umgebung anzeigt.",
    ueberschriften: {
      seite: "Bei Google gefunden werden",
      warum: "Warum niemand auf deiner Seite landet",
      preis: "Was die Einrichtung kostet",
      fragen: "Fragen zur Auffindbarkeit",
      weiter: "Womit das zusammenhängt",
    },
    problem:
      "Deine Seite existiert, aber niemand landet dort. Weil jede Unterseite denselben Titel trägt, kein Ort im Text steht und Google nicht erkennt, was du eigentlich anbietest.",
    enthalten: [
      "Eigener Titel und eigene Beschreibung für jede Seite",
      "Ortsbezug im Fließtext, ohne Doppelseiten je Stadt",
      "Strukturierte Daten, damit Google Öffnungszeiten und Adresse versteht",
      "Sitemap und robots.txt",
      "Bilder mit Beschreibungstexten",
      "Ladezeit geprüft, weil Google langsame Seiten abwertet",
    ],
    preisArt: "aufpreis",
    faq: [
      {
        frage: "Garantierst du Platz eins?",
        antwort:
          "Nein. Das kann niemand seriös. Was ich mache: dafür sorgen, dass Google deine Seite versteht und dich bei Suchen in deiner Nähe überhaupt in Betracht zieht.",
      },
      {
        frage: "Ist das ein monatlicher Posten?",
        antwort:
          "Nein, das ist eine einmalige Einrichtung beim Bau. Was danach monatlich läuft, ist die Pflege.",
      },
      {
        frage: "Warum keine eigene Seite je Stadt?",
        antwort:
          "Weil Google fast gleiche Seiten für verschiedene Orte als Türseiten erkennt und abwertet. Der Ortsbezug gehört in den Text, nicht in zwanzig Kopien.",
      },
    ],
  },
];

export function leistungNach(slug: string): Leistung | undefined {
  return leistungen.find((l) => l.slug === slug);
}
