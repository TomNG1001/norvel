/**
 * Die fünf Branchen. Aus dieser Datei entstehen in Schritt 7 die Übersicht
 * und die fünf Unterseiten. Eine neue Branche anlegen heißt: hier einen
 * Eintrag ergänzen. Sonst nichts.
 *
 * Keine Branche-mal-Stadt-Einträge. Kein /branchen/restaurants-heidelberg —
 * Google wertet so etwas als Doorway-Page ab. Die Region wird auf genau einer
 * Seite abgedeckt.
 *
 * OFFEN: `beispielProjekt` ist bei "handwerk" null, weil es nur drei
 * Konzeptprojekte gibt (Restaurant, Kosmetik, Hundesalon), aber fünf
 * Branchen. Bars verweist ersatzweise auf das Restaurant-Projekt.
 * Das muss Tom entscheiden, bevor Schritt 7 gebaut wird.
 */

import type { FaqEintrag, PaketId, Punkt } from "./typen";

export interface Branche {
  /** Mehrzahl, wie in der Navigation. */
  name: string;
  /** Einzahl, für Sätze wie "als Hundefriseur". */
  einzahl: string;
  slug: string;
  /** Unter 60 Zeichen. Ohne Markennamen — den hängt das Layout an. */
  seoTitel: string;
  /** Unter 160 Zeichen. */
  seoText: string;
  /**
   * Ein bis zwei Sätze für die Karte auf der Übersicht und der Startseite.
   * Regel: Übersichtsseiten zeigen ihre Unterseiten als Karten mit einer
   * kurzen Erklärung — dafür ist dieses Feld da.
   */
  kurz: string;
  /** Was heute konkret schiefläuft. Kein Werbetext, ein Befund. */
  problem: string;
  /** Mindestens drei. Was diese Branche wirklich braucht. */
  mussHaben: Punkt[];
  typischesPaket: PaketId;
  /** Mindestens drei eigene Einträge, nicht aus faq.ts wiederholt. */
  faq: FaqEintrag[];
  /** Slug aus projekte.ts, oder null, solange keins passt. */
  beispielProjekt: string | null;
}

export const branchen: Branche[] = [
  {
    name: "Restaurants",
    einzahl: "Restaurant",
    slug: "restaurants",
    seoTitel: "Website für Restaurants im Rhein-Neckar-Kreis",
    seoText:
      "Speisekarte, die Google lesen kann. Öffnungszeiten ganz oben. Reservierung ohne Anruf. Für Restaurants in Heidelberg, Mannheim und Umgebung.",
    kurz:
      "Die Karte als Text statt als Foto, Öffnungszeiten ganz oben, Reservierung ohne Anruf zur Stoßzeit.",
    problem:
      "Deine Speisekarte liegt als Foto auf Facebook. Google kann sie nicht lesen, also findet dich niemand, der abends Pizza in Weinheim sucht. Wer wissen will, ob heute offen ist, muss anrufen — oder geht woandershin.",
    mussHaben: [
      {
        titel: "Die Karte als Text, nicht als Bild",
        text: "Ein Foto oder PDF ist für Google unsichtbar. Auf dem Handy muss man hineinzoomen und wischen. Als Text ist die Karte lesbar und auffindbar.",
      },
      {
        titel: "Öffnungszeiten ganz oben",
        text: "Die häufigste Frage überhaupt. Sie gehört auf die Startseite, nicht ins Impressum und nicht in ein Bild.",
      },
      {
        titel: "Telefonnummer zum Antippen",
        text: "Ein Gast am Handy tippt einmal und ruft an. Eine Nummer, die man abschreiben muss, verliert die Hälfte der Anrufe.",
      },
      {
        titel: "Adresse in Textform",
        text: "Damit Google die Adresse dem Kartendienst zuordnet und dich bei der Suche in der Nähe anzeigt.",
      },
    ],
    typischesPaket: "standard",
    faq: [
      {
        frage: "Kann ich die Speisekarte selbst ändern?",
        antwort:
          "Nein, und das ist Absicht. Du schickst mir die Änderung, ich setze sie um. Bei der monatlichen Pflege sind kleine Textänderungen enthalten. Ein Redaktionssystem, das du selbst bedienst, macht die Seite langsam und angreifbar.",
      },
      {
        frage: "Brauche ich eine Reservierung über die Seite?",
        antwort:
          "Wenn abends dauernd das Telefon klingelt, während du am Tresen stehst: ja. Wenn du ohnehin nur zehn Tische hast und Stammgäste kommen: eher nicht. Sag mir, wie es bei dir läuft.",
      },
      {
        frage: "Was ist mit Lieferando und Co.?",
        antwort:
          "Die Seite kann auf deinen Lieferdienst verweisen. Ein eigener Bestellvorgang gehört nicht dazu — das ist ein anderes Projekt und ein anderer Preis.",
      },
      {
        frage: "Ich habe keine guten Fotos vom Essen.",
        antwort:
          "Dann sprich mich vor der Buchung darauf an. Gute eigene Fotos wirken stärker als jedes Design. Gekaufte Bilder von fremden Tellern setze ich nicht ein.",
      },
    ],
    beispielProjekt: "restaurant",
  },

  {
    name: "Bars",
    einzahl: "Bar",
    slug: "bars",
    seoTitel: "Website für Bars in Heidelberg und Umgebung",
    seoText:
      "Wer abends eine Bar sucht, entscheidet in zehn Sekunden. Öffnungszeiten, Karte und Stimmung müssen sofort sichtbar sein.",
    kurz:
      "Wer abends sucht, entscheidet in zehn Sekunden. Öffnungszeiten, Karte und Stimmung müssen sofort da sein.",
    problem:
      "Um 22 Uhr sucht jemand auf dem Handy eine Bar in der Altstadt. Er findet dein Instagram-Profil. Ob heute offen ist, steht in einer Story von vorletzter Woche. Also geht er in die Bar nebenan, deren Öffnungszeiten bei Google stehen.",
    mussHaben: [
      {
        titel: "Öffnungszeiten, die stimmen",
        text: "Getrennt nach Wochentagen, mit Küchenzeiten, wenn es Essen gibt. Bei Google und auf der Seite dasselbe.",
      },
      {
        titel: "Die Karte in Auszügen",
        text: "Niemand liest 80 Cocktails auf dem Handy. Ein Auszug mit Preisspanne reicht, damit klar ist, worauf man sich einlässt.",
      },
      {
        titel: "Bilder vom Raum, nicht vom Glas",
        text: "Gäste wollen sehen, wie es drinnen aussieht und wie voll es ist. Ein freigestellter Cocktail sagt darüber nichts.",
      },
      {
        titel: "Anfrage für Gruppen",
        text: "Geburtstage und Firmenfeiern sind das Geschäft unter der Woche. Dafür braucht es ein Formular, keine Telefonnummer im Lärm.",
      },
    ],
    typischesPaket: "standard",
    faq: [
      {
        frage: "Reicht Instagram nicht?",
        antwort:
          "Instagram zeigt, was letzte Woche los war. Eine Website beantwortet, ob heute offen ist und was es kostet. Beides zusammen wirkt, Instagram allein nicht.",
      },
      {
        frage: "Kann die Seite dunkel sein?",
        antwort:
          "Ja. Für eine Bar ist ein dunkler Auftritt oft richtig. Wichtig ist nur, dass der Text lesbar bleibt — auch für Gäste, die keine 25 mehr sind.",
      },
      {
        frage: "Die Karte ändert sich ständig.",
        antwort:
          "Dann kommt auf die Seite, was bleibt: Öffnungszeiten, Preisspanne, Räumlichkeiten. Die wechselnde Karte gehört auf eine Tafel im Laden.",
      },
    ],
    beispielProjekt: "restaurant",
  },

  {
    name: "Kosmetikstudios",
    einzahl: "Kosmetikstudio",
    slug: "kosmetik",
    seoTitel: "Website für Kosmetikstudios im Rhein-Neckar-Kreis",
    seoText:
      "Behandlungen mit Preis und Dauer, Termine online statt per Nachricht um elf Uhr abends. Für Studios in Heidelberg und Umgebung.",
    kurz:
      "Behandlungen mit Preis und Dauer, Termine online — statt Anfragen per Nachricht um elf Uhr abends.",
    problem:
      "Terminanfragen kommen als Instagram-Nachricht, zwischen zwei Kundinnen. Du beantwortest sie abends um elf. Wer bis dahin keine Antwort hat, hat längst woanders gebucht.",
    mussHaben: [
      {
        titel: "Behandlungen mit Preis und Dauer",
        text: "Wer nicht weiß, was etwas kostet und wie lange es dauert, fragt nicht nach — sondern sucht weiter.",
      },
      {
        titel: "Termine online buchen",
        text: "Die meisten Anfragen kommen abends nach 21 Uhr. Genau dann bist du nicht am Telefon.",
      },
      {
        titel: "Fotos aus deinem Studio",
        text: "Kundinnen wollen den Raum sehen, in dem sie eine Stunde liegen. Gekaufte Bilder mit fremden Händen erkennt man sofort.",
      },
      {
        titel: "Anfahrt und Parken",
        text: "In Heidelberg entscheidet die Parkfrage über die Buchung. Ein Satz dazu spart dir zehn Anrufe im Monat.",
      },
    ],
    typischesPaket: "standard",
    faq: [
      {
        frage: "Muss ich meine Preise öffentlich zeigen?",
        antwort:
          "Du musst nicht. Aber Studios ohne Preise bekommen mehr Anfragen und weniger Buchungen. Wer den Preis erst im Gespräch erfährt, fühlt sich überrumpelt.",
      },
      {
        frage: "Welches Buchungssystem nimmst du?",
        antwort:
          "PLATZHALTER — Tom muss festlegen, welchen Anbieter er einsetzt und was er datenschutzrechtlich prüft. Ohne diese Angabe bleibt die Frage unbeantwortet.",
      },
      {
        frage: "Ich arbeite allein und bin oft ausgebucht.",
        antwort:
          "Dann ist die Seite dazu da, die richtigen Anfragen zu bekommen — nicht mehr. Preise und Wartezeit offen zu nennen, sortiert schon vor dem ersten Kontakt.",
      },
      {
        frage: "Darf ich Vorher-Nachher-Bilder zeigen?",
        antwort:
          "Bei kosmetischen Behandlungen ist das heikel und bei medizinnahen Werbeaussagen teils verboten. Kläre das mit deiner Berufsvertretung, bevor du mir Bilder schickst.",
      },
    ],
    beispielProjekt: "kosmetikstudio",
  },

  {
    name: "Hundefriseure",
    einzahl: "Hundefriseur",
    slug: "hundefriseure",
    seoTitel: "Website für Hundesalons im Rhein-Neckar-Kreis",
    seoText:
      "Preise nach Größe, Termine online, Fotos deiner Arbeit. Damit Hundehalter dich finden und nicht den Nächsten anrufen.",
    kurz:
      "Preise nach Größe, Wartezeit offen genannt, Termine über ein Formular. Das spart dir die immer gleichen Anrufe.",
    problem:
      "Hundehalter suchen nach einem Salon in der Nähe und wollen drei Dinge wissen: Nimmst du meine Rasse, was kostet das ungefähr, wie lange dauert es. Steht das nicht da, rufen sie beim Nächsten an.",
    mussHaben: [
      {
        titel: "Preise nach Größe oder Rasse",
        text: "Ein Malteser und ein Neufundländer sind zwei verschiedene Termine. Eine Spanne pro Größe reicht völlig.",
      },
      {
        titel: "Termine online anfragen",
        text: "Viele Halter melden sich abends nach der Arbeit. Ein Formular nimmt die Anfrage entgegen, wenn du längst Feierabend hast.",
      },
      {
        titel: "Fotos von echten Hunden aus deinem Salon",
        text: "Das ist dein stärkstes Argument. Vorher und nachher, mit Einverständnis der Halter.",
      },
      {
        titel: "Was mitzubringen ist",
        text: "Impfpass, letzte Behandlung, Besonderheiten wie Angst vor dem Föhn. Das spart dir Rückfragen und dem Hund Stress.",
      },
    ],
    typischesPaket: "standard",
    faq: [
      {
        frage: "Reicht mir eine kleine Seite?",
        antwort:
          "Oft ja. Startseite, Preise, Kontakt und ein paar Bilder decken das Wichtigste ab. Erst wenn du online buchen lassen willst, brauchst du mehr.",
      },
      {
        frage: "Ich habe Wartezeiten von mehreren Wochen.",
        antwort:
          "Dann schreib es auf die Seite. Halter, die morgen einen Termin brauchen, rufen dann gar nicht erst an — und du verlierst keine Zeit.",
      },
      {
        frage: "Darf ich Fotos von Kundenhunden zeigen?",
        antwort:
          "Der Hund gehört jemandem. Hol dir eine kurze schriftliche Erlaubnis vom Halter, dann ist es unproblematisch.",
      },
    ],
    beispielProjekt: "hundesalon",
  },

  {
    name: "Handwerk",
    einzahl: "Handwerksbetrieb",
    slug: "handwerk",
    seoTitel: "Website für Handwerksbetriebe im Rhein-Neckar-Kreis",
    seoText:
      "Leistungen einzeln benannt, Einsatzgebiet mit Ortsnamen, Nummer zum Antippen. Und eine Seite für offene Stellen.",
    kurz:
      "Leistungen einzeln benannt, Einsatzgebiet mit Ortsnamen, und eine Seite für offene Stellen.",
    problem:
      "Jemand sucht „Heizung Notdienst Schwetzingen“. Auf deiner Seite steht, dass du seit 1998 zuverlässig arbeitest — aber nicht, welche Orte du fährst und ob du gerade Aufträge annimmst. Also ruft er beim Nächsten an.",
    mussHaben: [
      {
        titel: "Leistungen einzeln benannt",
        text: "„Sanitär, Heizung, Klima“ findet niemand. „Heizung entlüften“, „Badumbau“, „Rohrbruch“ schon — weil genau danach gesucht wird.",
      },
      {
        titel: "Einsatzgebiet mit Ortsnamen",
        text: "Schreib hin, welche Orte du fährst. Ohne Ortsnamen im Text ordnet Google dich keiner Gegend zu.",
      },
      {
        titel: "Auftragslage offen nennen",
        text: "Nimmst du Neukunden an oder nicht? Ein Satz dazu erspart dir jede Woche Anrufe, die zu nichts führen.",
      },
      {
        titel: "Eine Seite für offene Stellen",
        text: "Personal zu finden ist für die meisten Betriebe schwerer als Aufträge zu finden. Die Stellenseite wird oft öfter aufgerufen als die Startseite.",
      },
    ],
    typischesPaket: "komplett",
    faq: [
      {
        frage: "Ich bekomme meine Aufträge über Empfehlungen.",
        antwort:
          "Auch Empfohlene werden nachgeschlagen. Wer deinen Namen hört, sucht ihn — und findet entweder deine Seite oder eine alte Bewertung.",
      },
      {
        frage: "Brauche ich Referenzfotos?",
        antwort:
          "Ja. Fotos von fertigen Arbeiten überzeugen mehr als jede Beschreibung. Handyfotos reichen, wenn sie hell sind.",
      },
      {
        frage: "Was ist mit einem Notdienst-Hinweis?",
        antwort:
          "Wenn du Notdienst machst, gehört das nach oben, mit Zeiten und Nummer. Wenn nicht, schreib das genauso deutlich hin.",
      },
    ],
    beispielProjekt: null,
  },
];

/** Nachschlagen über den Slug. */
export function brancheNach(slug: string): Branche | undefined {
  return branchen.find((b) => b.slug === slug);
}
