/**
 * Die drei Probleme, die auf der Startseite als Karten stehen und je eine
 * eigene Seite unter /probleme/[slug] bekommen.
 *
 * Karte und Seite kommen aus derselben Quelle. Wer hier etwas ändert, ändert
 * beides, und sie können nicht auseinanderlaufen.
 *
 * Die Befunde stammen aus Recherche, nicht aus Annahmen: Google nennt
 * Öffnungszeiten und Route als die häufigsten Suchanlässe bei lokalen
 * Betrieben, PDF-Karten sind für die Suche unsichtbar, und über die Hälfte
 * der Handy-Besucher bricht nach wenigen Sekunden Ladezeit ab. Die Zahlen
 * stehen bewusst nicht auf der Seite: Wer eine Zahl zeigt, muss sie
 * verteidigen können.
 */

export interface Problem {
  slug: string;
  /** Überschrift der Karte auf der Startseite. */
  titel: string;
  /** Ein bis zwei Sätze auf der Karte. */
  kurz: string;
  /** Unter 60 Zeichen, ohne Markennamen. */
  seoTitel: string;
  /** Unter 160 Zeichen. */
  seoText: string;

  /**
   * Eigene Überschriften je Seite. Ohne sie tragen alle drei Seiten dieselbe
   * Gliederung, und `npm run check:schablone` bricht den Bau ab.
   */
  ueberschriften: {
    seite: string;
    ursache: string;
    kosten: string;
    besser: string;
    probe: string;
  };

  /** Was technisch dahintersteckt. Zwei bis drei Absätze. */
  ursache: string[];
  /** Was es konkret kostet. Kurze, harte Sätze. */
  kosten: string[];
  /** Wie ich es stattdessen mache. */
  besser: string[];
  /** Woran der Betrieb selbst erkennt, ob es stimmt. Selbst nachprüfbar. */
  probe: string[];
}

export const probleme: Problem[] = [
  {
    slug: "preise-im-pdf",
    titel: "Deine Preise liegen in einem PDF",
    kurz: "Speisekarte, Preisliste, Leistungsübersicht: Als PDF oder abfotografiert sind sie für Google nicht lesbar. Wer nach genau deiner Leistung sucht, bekommt dich nicht angezeigt.",
    seoTitel: "Speisekarte als PDF: warum Google sie nicht liest",
    seoText:
      "Ein PDF oder ein Foto der Preisliste ist für die Suche unsichtbar und auf dem Handy unlesbar. Was stattdessen funktioniert und wie es gebaut wird.",
    ueberschriften: {
      seite: "Warum deine Speisekarte im PDF niemand findet",
      ursache: "Was eine Suchmaschine wirklich liest",
      kosten: "Was dich das im Monat kostet",
      besser: "Wie ich Karten und Preislisten baue",
      probe: "Der Fingertest",
    },
    ursache: [
      "Eine Suchmaschine liest Text. Ein PDF ist für sie ein Anhang, ein abfotografierter Aushang ist ein Bild. In beiden Fällen bekommt sie nicht mit, dass du Schnitzel für 16,50 Euro anbietest oder einen Damenhaarschnitt für 45 Euro machst.",
      "Dazu kommt das Gerät. Ein PDF, das für DIN A4 gesetzt wurde, erscheint auf einem Handy als winzige Fläche. Wer etwas lesen will, muss aufziehen, verschieben, wieder aufziehen. Nach dem zweiten Versuch ist er weg.",
      "Und die Pflege: Für jede Preisänderung muss die Datei neu gesetzt, exportiert und hochgeladen werden. Deshalb hängt auf den meisten Seiten noch die Karte vom letzten Sommer.",
    ],
    kosten: [
      "Wer nach deinem Gericht oder deiner Behandlung sucht, findet den Betrieb, der es als Text auf der Seite hat.",
      "Wer trotzdem bei dir landet, sieht eine Datei statt einer Antwort.",
      "Jede Preisänderung wird zur kleinen Aufgabe und bleibt deshalb liegen.",
    ],
    besser: [
      "Die Karte steht als echter Text auf einer eigenen Seite, nach Gängen oder Bereichen sortiert.",
      "Preise stehen direkt daneben, nicht in einer Fußnote.",
      "Auf dem Handy ist sie ohne Zoomen lesbar, weil sie nie für Papier gesetzt wurde.",
      "Änderungen schickst du mir als Nachricht, ich setze sie um. Bei der monatlichen Pflege ist das enthalten.",
      "Wer trotzdem ein PDF zum Ausdrucken braucht, bekommt es zusätzlich. Nur eben nicht als einzige Fassung.",
    ],
    probe: [
      "Öffne deine Karte auf dem Handy. Kannst du ein einzelnes Wort mit dem Finger markieren? Wenn nicht, ist es ein Bild.",
      "Musst du aufziehen, um den ersten Preis zu lesen? Dann ist die Datei für Papier gemacht.",
      "Suche bei Google nach einem deiner Gerichte plus deinem Ort. Kommst du vor?",
    ],
  },

  {
    slug: "oeffnungszeiten-versteckt",
    titel: "Die Öffnungszeiten stehen ganz unten",
    kurz: "Öffnungszeiten und Anfahrt sind das, wonach am häufigsten gesucht wird. Wenn beides erst nach dreimal Wischen auftaucht oder bei Google veraltet ist, ruft der Nächste woanders an.",
    seoTitel: "Öffnungszeiten: gesucht, aber gut versteckt",
    seoText:
      "Wonach bei lokalen Betrieben am häufigsten gesucht wird, steht auf den meisten Seiten ganz unten oder in einem Bild. Was das kostet und wie es besser geht.",
    ueberschriften: {
      seite: "Die häufigste Frage steht bei dir ganz unten",
      ursache: "Warum sie dort gelandet ist",
      kosten: "Der Anruf, den ein anderer bekommt",
      besser: "Wo Zeiten und Adresse hingehören",
      probe: "Die Zehn-Sekunden-Probe",
    },
    ursache: [
      "Öffnungszeiten wirken beim Bauen wie eine Fußnote. Sie sind kurz, sie ändern sich selten, also landen sie im Fußbereich, neben dem Impressum. Für den Betrieb ist das logisch. Für jemanden, der um halb sieben wissen will, ob noch offen ist, ist es das Gegenteil.",
      "Oft stehen sie zusätzlich in einem Bild, weil sich das schöner setzen lässt. Damit sind sie für Google unsichtbar, und ein Vorleseprogramm findet sie auch nicht.",
      "Die zweite Hälfte des Problems liegt außerhalb der Website: Bei Google steht meist eine ältere Fassung. Wenn beide Angaben sich widersprechen, glaubt der Besucher der, die er zuerst sieht, und das ist fast immer Google.",
    ],
    kosten: [
      "Wer nicht in wenigen Sekunden sieht, ob offen ist, ruft beim Nächsten an.",
      "Wer wegen falscher Zeiten vor verschlossener Tür steht, kommt nicht wieder und schreibt womöglich eine Bewertung.",
      "An Feiertagen entscheidet die Angabe darüber, ob überhaupt jemand kommt.",
    ],
    besser: [
      "Zeiten und Adresse stehen im oberen Bereich der Startseite, als Text, ohne Scrollen.",
      "Sie stehen an genau einer Stelle im Datenbestand und erscheinen überall daraus. Sie können nicht auseinanderlaufen.",
      "Die Telefonnummer ist antippbar. Ein Tipp, ein Anruf.",
      "Die Adresse steht als Text, damit Google sie der Karte zuordnet.",
      "Auf Wunsch trage ich dieselben Zeiten in dein Google-Profil ein, damit beide Angaben übereinstimmen.",
    ],
    probe: [
      "Nimm dein Handy, öffne deine Seite und zähle die Sekunden, bis du die heutigen Öffnungszeiten siehst. Über zehn ist zu lang.",
      "Suche deinen Betrieb bei Google. Stehen dort dieselben Zeiten wie auf der Seite?",
      "Sind die Feiertage der nächsten zwei Monate eingetragen?",
    ],
  },

  {
    slug: "handy-zu-langsam",
    titel: "Auf dem Handy passiert erstmal nichts",
    kurz: "Alte Seiten laden große Bilder, die für den Rechner gedacht waren. Wer warten muss, ist weg, bevor er gesehen hat, was du anbietest.",
    seoTitel: "Website zu langsam auf dem Handy",
    seoText:
      "Über die Hälfte der Besucher bricht ab, wenn eine Seite auf dem Handy zu lange lädt. Woran es liegt, was es kostet, und wie eine schnelle Seite gebaut wird.",
    ueberschriften: {
      seite: "Auf dem Handy passiert die ersten Sekunden nichts",
      ursache: "Woher die Wartezeit kommt",
      kosten: "Besucher, die du nie zu Gesicht bekommst",
      besser: "Warum diese Seite hier sofort da ist",
      probe: "Miss es selbst, im Mobilfunknetz",
    },
    ursache: [
      "Die meisten alten Betriebsseiten laden Bilder in der Größe, in der sie aus der Kamera kamen. Ein einziges Foto kann mehrere Megabyte wiegen. Am Schreibtisch im WLAN merkt das niemand. Im Mobilfunknetz vor der Tür schon.",
      "Dazu kommt der Baukasten. Viele Seiten laden Dutzende Zusatzdateien für Effekte, Schriftarten von fremden Servern, ein Cookie-Banner, Zählwerkzeuge. Bevor ein einziges Wort erscheint, sind ein paar Sekunden vergangen.",
      "Und es fällt nicht auf, weil man die eigene Seite meist im WLAN und mit vollem Zwischenspeicher aufruft. Der Erstbesucher hat beides nicht.",
    ],
    kosten: [
      "Wer wartet, geht zurück und nimmt das nächste Suchergebnis.",
      "Er hat dein Angebot nie gesehen, also weiß er nicht, was er verpasst hat.",
      "Google wertet langsame Seiten ab, das Problem verstärkt sich also selbst.",
    ],
    besser: [
      "Die Seiten sind fertig gebaut, bevor sie jemand aufruft. Es läuft kein Baukasten im Hintergrund, der sie erst zusammensetzt.",
      "Bilder werden verkleinert und in einem sparsamen Format ausgeliefert, mit fester Größe, damit beim Laden nichts springt.",
      "Die Schriften liegen auf deinem eigenen Server, nicht bei Google. Das ist schneller und nebenbei die datenschutzfreundliche Fassung.",
      "Keine Zählwerkzeuge, keine Cookies, kein Banner. Was nicht geladen wird, kann auch nicht bremsen.",
      "Gebaut wird zuerst für das Handy, danach für den Rechner. Nicht umgekehrt.",
    ],
    probe: [
      "Schalte das WLAN am Handy aus und rufe deine Seite über das Mobilfunknetz auf. Zähle mit.",
      "Springt der Text, während die Seite lädt? Dann fehlen den Bildern die Größenangaben.",
      "Frage jemanden, der deine Seite noch nie geöffnet hat, es auszuprobieren. Nur dieser erste Aufruf zählt.",
    ],
  },
];

export function problemNach(slug: string): Problem | undefined {
  return probleme.find((p) => p.slug === slug);
}
