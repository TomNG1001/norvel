# VELLOX OS — die Regeln, die für dieses Projekt gelten

Quelle: <https://github.com/underworlddev1-spec/Vellox-OS> (69 Dateien, Stand
10. August 2026). Diese Datei ist kein Ersatz für das Repository, sondern der
Auszug, der auf **diese** Website anwendbar ist, mit dem jeweiligen Stand.

Bei Konflikten gilt weiter die Rangfolge aus [`PROJEKT.md`](PROJEKT.md):
Rechtliches, Markenname, Übersichtlichkeit, Optik. Wo Vellox etwas anderes
verlangt als Tom, steht das unten unter „Konflikte" und wird nicht still
entschieden.

---

## Die verbindlichen Verbote

| Verbot | Stand |
|---|---|
| Keine Pill Buttons (vollständig gerundete Kapseln) | **erfüllt** — Rundung 4 px, aus `--radius` |
| Kein Lila als Standardfarbe | **erfüllt** — Palette ist Stahlblau und Tinte |
| Keine generischen KI-Muster (Leuchtverlauf, austauschbare Statistiken, erfundene Testimonials, Logozeile ohne Beweis) | **erfüllt** — keine Verläufe, keine Zahlen ohne Beleg, Konzeptprojekte gekennzeichnet |
| **Keine Gedankenstriche als Stilmittel** in Copy, Dokumentation und Interface-Texten | **war verletzt: 114 Fundstellen.** Behoben, siehe unten |
| Keine Anzeichen von Vibe Coding: zufällige Abstände, hart codierte Farben, fehlende Zustände | **erfüllt** — alle Werte aus `global.css`, keine hart codierte Farbe außerhalb davon |

## Der Schablonen-Wächter

> Der Wächter rechnet aus jeder Überschrift den Eigennamen der Seite heraus.
> Was übrig bleibt, ist die Schablone. Sind zwei Schablonen an derselben
> Position identisch, bricht der Bau ab.
> — `00_SYSTEM/06-erzwungene-qualitaet.md`

Das traf auf diese Website zu. Alle fünf Branchenseiten trugen nach Abzug des
Branchennamens dieselbe Gliederung:

```
Websites für {NAME} | Wie es heute meistens aussieht | Für {NAME} passt
meistens Standard | Ein Beispiel
```

Genau der Fall, den Vellox beschreibt: Der Fließtext war eigenständig, die
Überschriften waren es nicht. Behoben durch eigene Überschriften je Branche
und abgesichert durch `scripts/check-schablone.mjs`, das den Bau abbricht.

## Handy zuerst, und gemessen

Nicht am verkleinerten Fenster, sondern bei **390 × 844** und doppelter
Pixeldichte. Vier Zahlen je Seite:

1. Gesamthöhe in Bildschirmen. **Über 12 ist ein Befund.**
2. Position des ersten Beweises. **Über 844 ist ein Befund.**
3. Höhe und Wortzahl des längsten Abschnitts.
4. Zeilen des längsten Vorspanns. **Über 4 ist ein Befund.**

Dazu: Ein Vorspann mit mehr als zwei Sätzen ist am Telefon keine Einleitung,
sondern eine Textwand.

## Erstauslieferung

- **Jeder Abschnitt wird zuerst für den leeren Fall gebaut.** Eine Struktur,
  die ohne Inhalt einen leeren Rahmen zeigt, muss vorher repariert werden.
- **Jede Seite, die verkauft, sagt an mindestens einer Stelle, für wen sie
  nicht gemacht ist.**

## Was Vellox über Regeln selbst sagt

> Setze Regeln durch, statt sie aufzuschreiben. Prüfe bei jeder neuen Regel,
> ob sie sich mechanisieren lässt: als Typ, der den Fehler unmöglich macht,
> als Abbruch im Bau, als Prüfskript. Eine Regel, die einmal gebrochen wurde,
> zieht eine Stufe nach oben.

Deshalb sind die beiden Regeln, die dieses Projekt gebrochen hat, jetzt
Prüfskripte und nicht Prosa: `check-schablone.mjs` und `check-sprache.mjs`.

## Konflikte mit PROJEKT.md

| Vellox verlangt | PROJEKT.md sagt | Entschieden |
|---|---|---|
| Motion Language, Bewegung als Markenmittel (`02_BRANDING/03`) | „Keine Einblende-Animation beim Scrollen" | **PROJEKT.md gewinnt.** Keine Bewegung eingebaut |
| Fünf beleggetriebene Hero-Varianten, Hero zuletzt festlegen | Startseite ist gebaut, Beleglage dünn (keine Kunden) | **Offen.** Der Hero ruht auf einer Frage, nicht auf einem Beweis. Mit echten Kundenzahlen neu zu entscheiden |
| Markeninventur beim Kunden erheben | Es gibt noch keinen Kunden, die Marke ist Toms eigene | Entfällt |
| „Drei gleichartige Vorteilskarten" gelten als KI-Muster | Startseite zeigt drei Befund-Karten | **Vertretbar:** Es sind keine Vorteile, sondern drei konkrete Befunde aus der Google-Suche. Bleibt beobachtet |

## Die vier Wächter im Bau

Vellox verlangt, Regeln zu mechanisieren statt sie aufzuschreiben. Vier davon
brechen jetzt den Bau ab:

| Skript | prüft | läuft |
|---|---|---|
| `check-brand.mjs` | Markenname nur in `brand.ts` | vor dem Bau |
| `check-sprache.mjs` | Gedankenstriche, verbotene Wörter, „wir" | vor dem Bau |
| `check-schablone.mjs` | gleiche Gliederung in einer Seitenfamilie | nach dem Bau |
| `check-vorspann.mjs` | Einleitung über zwei Sätze | nach dem Bau |

Der Kontakt-Abschluss ist im Markup mit `data-gemeinsam` markiert und vom
Schablonen-Wächter ausgenommen. Seine Gleichheit verlangt PROJEKT.md, sie ist
also die Regel und nicht ihr Bruch.

Die Zeilenzahl am Telefon bleibt bewusst **ohne** Wächter. Vellox selbst sagt,
diese Zahlen seien Befunde, die ein Urteil brauchen, und gehörten in die
Qualitätskontrolle statt in ein Gate.

## Gemessen bei 390 x 844

| Seite | Bildschirme (max 12) | Vorspann-Zeilen (max 4) |
|---|---|---|
| / | 11,6 | 4 |
| /preise | 8,9 | 3 |
| /faq | 8,2 | 3 |
| /branchen/restaurants | 6,2 | 3 |
| /ablauf | 5,7 | 3 |
| /kontakt | 5,6 | 3 |
| /arbeiten/restaurant | 5,6 | 3 |
| /leistungen/website | 5,5 | 3 |
| /branchen | 4,6 | 3 |
| /ueber-mich | 4,5 | 4 |
| /arbeiten | 4,2 | 4 |
| /leistungen | 4,0 | 3 |

Vorher lagen zehn von zwölf Seiten über der Vorspann-Grenze, die Startseite
bei sieben Zeilen.

Die Startseite ist seitdem dreimal gewachsen: um den Zuschnitt und die drei
Befund-Kacheln, dann um den Fahrplan mit dem Handy, zuletzt um die Fläche
unter dem Zuschnitt. Sie liegt jetzt bei **11,6 von 12** Bildschirmen, das
sind noch rund 340 Pixel Abstand zur Grenze. Wer dort etwas ergänzt, muss an
anderer Stelle kürzen.

## Was Vellox nicht leisten kann

> Er misst Gliederung, nicht Substanz. Zwei Seiten mit verschiedenen
> Überschriften und austauschbarem Fließtext gehen durch.

Die Prüfskripte ersetzen den Anti-Template-Review nicht. Die fünf Fragen aus
`00_SYSTEM/05` verlangen ein Urteil und bleiben bei Tom.
