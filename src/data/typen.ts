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
export interface Bild {
  pfad: string;
  alt: string;
  breite: number;
  hoehe: number;
}

/** Ein Punkt in einer Aufzählung mit Überschrift und Erklärung. */
export interface Punkt {
  titel: string;
  text: string;
}
