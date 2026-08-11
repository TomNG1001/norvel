/**
 * Die allgemeinen Fragen für /faq. Branchen- und leistungsbezogene Fragen
 * stehen bei der jeweiligen Branche beziehungsweise Leistung, damit sie nicht
 * doppelt auftauchen.
 *
 * In Schritt 11 wird daraus zusätzlich FAQPage-Auszeichnung erzeugt.
 *
 * PLATZHALTER: Alles, was Tom vertraglich festlegen muss. Anzahlung,
 * Laufzeit, Kündigung, Domainübergabe, steht als erkennbarer Platzhalter da.
 * Da wird nichts geraten.
 */

import type { FaqEintrag } from "./typen";

export interface FaqGruppe {
  titel: string;
  eintraege: FaqEintrag[];
}

export const faqGruppen: FaqGruppe[] = [
  {
    titel: "Ablauf und Dauer",
    eintraege: [
      {
        frage: "Wie lange dauert es, bis meine Seite steht?",
        antwort:
          "Das Grundgerüst steht in 24 bis 72 Stunden, sobald deine Texte und Bilder vorliegen. Bis alles abgestimmt ist, vergehen je nach Korrekturrunden ein paar Tage mehr.",
      },
      {
        frage: "Was musst du von mir haben, bevor es losgeht?",
        antwort:
          "Texte oder Stichpunkte zu deinem Betrieb, Fotos, Öffnungszeiten, Preise und die Angaben fürs Impressum. Stichpunkte reichen, die Sätze mache ich daraus.",
      },
      {
        frage: "Wie viele Korrekturrunden habe ich?",
        antwort:
          "Das hängt vom Paket ab und steht bei den Preisen. Eine Korrekturrunde heißt: Du siehst dir alles an und schickst mir deine Änderungen gesammelt.",
      },
      {
        frage: "Kann ich dich anrufen?",
        antwort:
          "Ja. Meine Nummer steht auf jeder Seite. Ich arbeite allein, du redest also immer mit derselben Person.",
      },
    ],
  },
  {
    titel: "Preise und Bezahlung",
    eintraege: [
      {
        frage: "Warum steht überall „ab“?",
        antwort:
          "Weil die Seitenzahl den Preis bestimmt. Auf der Preisseite kannst du dir deine Seiten zusammenklicken, dann siehst du deinen Betrag. Der angezeigte Preis ist der Endpreis.",
      },
      {
        frage: "Kommt zum genannten Preis noch Umsatzsteuer dazu?",
        antwort:
          "Nein. Ich bin Kleinunternehmer nach § 19 UStG, es wird keine Umsatzsteuer ausgewiesen. Was auf der Preisseite steht, zahlst du.",
      },
      {
        frage: "Wie läuft die Bezahlung?",
        antwort:
          "PLATZHALTER. Tom muss festlegen, ob es eine Anzahlung gibt, wie hoch sie ist und wann der Rest fällig wird.",
      },
      {
        frage: "Was kostet eine zusätzliche Seite später?",
        antwort:
          "Jede Seite über dem Umfang deines Pakets wird einzeln berechnet. Den Betrag findest du auf der Preisseite.",
      },
    ],
  },
  {
    titel: "Technik und Betrieb",
    eintraege: [
      {
        frage: "Kann ich die Seite selbst bearbeiten?",
        antwort:
          "Nein, und das ist Absicht. Die Seite besteht aus fertigen Dateien ohne Redaktionssystem im Hintergrund. Das macht sie schnell und schwer angreifbar. Änderungen schickst du mir, ich setze sie um.",
      },
      {
        frage: "Brauche ich ein Cookie-Banner?",
        antwort:
          "Nein, weil auf deiner Seite nichts mitgeschnitten wird: kein Google Analytics, keine Schriften von fremden Servern, keine eingebetteten Karten, die Daten abgreifen.",
      },
      {
        frage: "Ich habe schon eine Domain.",
        antwort:
          "Dann bleibt sie deine. Sie wird auf die neue Seite umgehängt, die alte bleibt bis dahin erreichbar.",
      },
      {
        frage: "Wem gehört die Domain?",
        antwort:
          "PLATZHALTER. Tom muss festlegen, ob die Domain auf ihn oder auf den Kunden läuft und was bei einer Kündigung damit passiert.",
      },
      {
        frage: "Was passiert, wenn ich die Pflege kündige?",
        antwort:
          "PLATZHALTER. Tom muss Laufzeit, Kündigungsfrist und Übergabe der Dateien festlegen.",
      },
    ],
  },
  {
    titel: "Zusammenarbeit",
    eintraege: [
      {
        frage: "Baust du auch für meine Branche?",
        antwort:
          "Ja. Die Branche ist mir gleich, ich baue für jede. Worauf es mir ankommt, ist die Größe: ein Standort, ein Inhaber, jemand der selbst ans Telefon geht.",
      },
      {
        frage: "Ich habe mehrere Filialen.",
        antwort:
          "Dann bin ich der Falsche. Bei mehreren Standorten hängen Freigaben, Corporate Design und oft eine Zentrale mit drin. Das ist Agenturarbeit und braucht andere Abläufe als meine.",
      },
      {
        frage: "Ich will einen Onlineshop.",
        antwort:
          "Baue ich nicht. Zahlungsabwicklung, Versand, Rückgaberecht und Produktpflege sind ein eigenes Handwerk mit eigenen Rechtsfragen. Deine Seite kann auf einen bestehenden Shop verweisen.",
      },
      {
        frage: "Arbeitest du auch außerhalb des Rhein-Neckar-Kreises?",
        antwort:
          "Der Schwerpunkt liegt hier, weil ich vorbeikommen kann. Grundsätzlich geht es auch weiter weg, dann läuft mehr über Telefon und Mail.",
      },
      {
        frage: "Machst du auch Logos oder Flyer?",
        antwort:
          "PLATZHALTER. Tom muss entscheiden, ob er das anbietet. Wenn nicht, gehört hier ein klares Nein hin.",
      },
      {
        frage: "Machst du Fotos für meinen Betrieb?",
        antwort:
          "PLATZHALTER. Tom muss festlegen, ob er fotografiert, vermittelt oder nur vorhandene Bilder aufbereitet.",
      },
      {
        frage: "Kann ich Beispiele deiner Arbeit sehen?",
        antwort:
          "Unter Referenzen stehen drei Konzeptprojekte. Es sind noch keine Kundenseiten live, und das steht dort auch so.",
      },
    ],
  },
];

/** Alle Einträge flach, für die strukturierten Daten in Schritt 11. */
export const alleFaqEintraege: FaqEintrag[] = faqGruppen.flatMap(
  (g) => g.eintraege
);
