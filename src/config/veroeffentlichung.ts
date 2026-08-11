/**
 * Ein Schalter, der entscheidet, ob die Seite in die Google-Suche darf.
 *
 * Hintergrund: Das Impressum ist noch ein sichtbarer Platzhalter, die
 * Anschrift fehlt. Eine öffentlich erreichbare deutsche Geschäftsseite ohne
 * vollständiges Impressum ist genau das Abmahnrisiko, das in PROJEKT.md an
 * erster Stelle steht. Erreichbar darf sie trotzdem sein, gefunden werden
 * soll sie noch nicht.
 *
 * Solange dieser Schalter auf false steht:
 *   - jede Seite bekommt <meta name="robots" content="noindex, follow">
 *   - /robots.txt verbietet allen Suchmaschinen die ganze Seite
 *
 * UMSTELLEN AUF true, sobald im Impressum die echte Anschrift steht.
 * Das ist die einzige Stelle, die dafür geändert werden muss.
 */
export const inDieSucheAufnehmen = false;
