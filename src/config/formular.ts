/**
 * Einstellungen für das Kontaktformular.
 *
 * PLATZHALTER: Der Formspree-Endpunkt fehlt noch. Solange hier "PLATZHALTER"
 * steht, zeigt die Kontaktseite beim Entwickeln einen Warnkasten, im
 * fertigen Build sieht ihn niemand, aber Tom kann ihn beim Bauen nicht
 * übersehen.
 *
 * So kommt der echte Endpunkt her: formspree.io → Konto anlegen → neues
 * Formular → die Adresse sieht aus wie https://formspree.io/f/xayzqwer
 */

export const formspreeEndpunkt = "https://formspree.io/f/PLATZHALTER-FORM-ID";

/** True, solange der Endpunkt nicht eingetragen ist. */
export const endpunktFehlt = formspreeEndpunkt.includes("PLATZHALTER");

/**
 * Antwortmöglichkeiten für „Wie sieht es gerade aus?".
 * Die Antwort sagt mir vor dem ersten Telefonat, worum es geht.
 */
export const standOptionen: string[] = [
  "Ich habe noch gar keine Website",
  "Ich habe eine, aber sie ist veraltet",
  "Ich habe eine, aber auf dem Handy ist sie unbrauchbar",
  "Ich habe nur Facebook oder Instagram",
  "Ich weiß es noch nicht genau",
];

/** Wird als letzte Möglichkeit an die Branchenliste gehängt. */
export const brancheSonstiges = "Andere Branche";

/**
 * Wie schnell ich mich melde. Steht auf /danke.
 *
 * ACHTUNG, TOM: Das ist eine Zusage, keine Formulierung. Ich habe die
 * vorsichtigste Variante gewählt, die realistisch zu halten ist, weil ohne
 * jede Zeitangabe der Besucher parallel bei zwei anderen anfragt. Lieber
 * hier zwei Werktage versprechen und nach vier Stunden antworten als
 * umgekehrt. Wenn du schneller bist, ändere diese eine Zeile.
 */
export const antwortzeit = "innerhalb von zwei Werktagen";

/** Feldnamen. Stehen hier, damit Formular und Übergabe dieselben benutzen. */
export const feldNamen = {
  name: "name",
  betrieb: "betrieb",
  mail: "email",
  telefon: "telefon",
  branche: "branche",
  stand: "stand",
  nachricht: "nachricht",
  datenschutz: "datenschutz",
  konfiguration: "konfiguration",
  /** Formspree-eigene Felder. */
  betreff: "_subject",
  weiterleitung: "_next",
  falle: "_gotcha",
} as const;
