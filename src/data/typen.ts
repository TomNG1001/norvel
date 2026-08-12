/**
 * Gemeinsame Typen für alle Datendateien.
 *
 * Liegt hier, damit ein FAQ-Eintrag in branchen.ts, leistungen.ts und faq.ts
 * dieselbe Form hat und nicht dreimal beschrieben wird.
 */

/** Kennung eines Pakets. Die Preise dazu stehen ausschließlich in pakete.ts. */
export type PaketId = "start" | "standard" | "komplett";

/** Eine Frage mit Antwort. Wird auch für die JSON-LD-Daten in Schritt 11 gebraucht. */
export interface FaqEintrag {
  frage: string;
  antwort: string;
}

/** Ein Bild mit den Angaben, die gegen springendes Layout nötig sind. */
/**
 * Ein Bild aus src/bilder. Ausgegeben wird es von components/Bild.astro.
 *
 * Breite und Höhe stehen bewusst nicht hier: Astro liest sie beim Bauen aus
 * der Datei selbst. Zwei Zahlen von Hand zu pflegen, die auch falsch sein
 * können, wäre eine Fehlerquelle ohne Nutzen.
 */
export interface Bild {
  /** Dateiname im Ordner src/bilder, zum Beispiel "tom.jpg". */
  datei: string;
  /** Was zu sehen ist. Nicht "Foto", sondern der Inhalt. */
  alt: string;
}

/** Ein Punkt in einer Aufzählung mit Überschrift und Erklärung. */
export interface Punkt {
  titel: string;
  text: string;
}
