/**
 * Der Ablauf von der Anfrage bis zur fertigen Seite. Wird in Schritt 9 zu
 * /ablauf und taucht verkürzt auf der Startseite auf.
 *
 * Die Schritte sind nummeriert, damit die Reihenfolge aus den Daten kommt und
 * nicht aus der Reihenfolge im Template.
 */

export interface Ablaufschritt {
  nummer: number;
  titel: string;
  /** Was in diesem Schritt passiert. Zwei bis drei Sätze. */
  text: string;
  /** Was Tom dafür braucht, oder null, wenn nichts nötig ist. */
  vonDir: string | null;
  /** Grobe Zeitangabe für die Randspalte. */
  dauer: string;
}

export const ablauf: Ablaufschritt[] = [
  {
    nummer: 1,
    titel: "Du meldest dich",
    text: "Über das Formular, per WhatsApp oder am Telefon. Wenn du dir auf der Preisseite schon Seiten zusammengeklickt hast, kommt deine Auswahl mit — dann weiß ich sofort, worum es geht.",
    vonDir: "Ein paar Sätze zu deinem Betrieb und was dir fehlt",
    dauer: "5 Minuten",
  },
  {
    nummer: 2,
    titel: "Ein kurzes Telefonat",
    text: "Zwanzig Minuten, in denen ich frage, wer bei dir bestellt, bucht oder anruft und was diese Leute vorher wissen müssen. Danach weißt du, was es kostet und wie lange es dauert.",
    vonDir: "Zwanzig Minuten Zeit",
    dauer: "1 Telefonat",
  },
  {
    nummer: 3,
    titel: "Du schickst mir dein Material",
    text: "Texte oder Stichpunkte, Fotos, Öffnungszeiten, Preise, die Angaben fürs Impressum. Stichpunkte reichen völlig, die Sätze baue ich daraus. An dieser Stelle hängt es meistens — nicht am Bauen.",
    vonDir: "Texte, Fotos, Öffnungszeiten, Impressumsangaben",
    dauer: "Liegt bei dir",
  },
  {
    nummer: 4,
    titel: "Das Grundgerüst steht",
    text: "Innerhalb von 24 bis 72 Stunden nach deinem Material siehst du deine Seite unter einer Vorschauadresse. Nicht als Bild, sondern als echte Seite, die du auf deinem Handy aufmachen kannst.",
    vonDir: null,
    dauer: "24 bis 72 Stunden",
  },
  {
    nummer: 5,
    titel: "Du sagst, was geändert wird",
    text: "Du gehst alles durch und schickst mir deine Änderungen gesammelt. Wie viele Runden du hast, hängt vom Paket ab.",
    vonDir: "Deine Anmerkungen, gesammelt in einer Nachricht",
    dauer: "Je nach Paket",
  },
  {
    nummer: 6,
    titel: "Die Seite geht online",
    text: "Deine Domain wird umgehängt, das Google-Profil verknüpft, und ich prüfe alles auf dem Handy durch. Danach zeige ich dir, wie du mir künftig Änderungen schickst.",
    vonDir: "Zugang zu deiner Domain, falls du schon eine hast",
    dauer: "1 Tag",
  },
];
