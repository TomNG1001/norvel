# FORTSCHRITT

Stand der Arbeit, ein Eintrag je Schritt. Wird nach jedem Schritt
fortgeschrieben, nie neu geschrieben. Regeln stehen in `PROJEKT.md`.

| Schritt | Inhalt | Status | Datum |
|---|---|---|---|
| 0 | Skills prüfen | erledigt | 2026-08-10 |
| 1 | Grundgerüst | erledigt und geprüft | 2026-08-10 |
| 2 | Datenmodelle | erledigt und geprüft | 2026-08-10 |
| 3 | /kontakt und /danke | offen | – |
| 4 | /preise | offen | – |
| 5 | Startseite | offen | – |
| 6 | /leistungen und die 4 Unterseiten | offen | – |
| 7 | /branchen und die 5 Unterseiten | offen | – |
| 8 | /arbeiten und die 3 Projektseiten | offen | – |
| 9 | /ueber-mich, /ablauf, /faq | offen | – |
| 10 | /impressum, /datenschutz, 404 | offen | – |
| 11 | SEO und Qualität | offen | – |
| 12 | Abschluss | offen | – |

---

## Schritt 0 — Skills prüfen · erledigt am 2026-08-10

Alle verfügbaren Skills durchgegangen und eingeordnet.

Benutzt werden: `design-system`, `frontend-design`, `design-taste-frontend`,
`emil-design-eng`, `ui-ux-pro-max`, `full-output-enforcement`, `run`,
`simplify` (nur auf Zuruf).

Ausgeschlossen, weil sie der Spezifikation widersprechen: `gpt-taste`,
`stitch-design-taste`, `high-end-visual-design` (Schlagschatten), `ui-styling`
(Tailwind/shadcn), alle Animations-Skills.

Für Schritt 0 selbst wurde kein Skill benutzt.

### Offene Punkte

- Node und npm fehlen auf dem Rechner. Blockiert jede Ausführung.

---

## Schritt 1 — Grundgerüst · erledigt am 2026-08-10

Gebaut:

- `package.json` mit `check:brand`, `favicon`, `dev`, `build` auf Port 3489.
  Der Build-Befehl steht exakt wie in der Spezifikation
  (`npm run check:brand && astro build`); das Favicon läuft über `prebuild`
  und `predev` mit, damit die vorgegebene Zeile unverändert bleibt.
- `astro.config.mjs` — statisch, kein SSR, `site` kommt aus `brand.ts`.
- `tsconfig.json` — Astro strict.
- `src/config/brand.ts` — einzige Stelle mit dem Markennamen. Domain und
  Mailadresse sind als PLATZHALTER markiert.
- `src/config/zeichen.mjs` — das geometrische Bildzeichen (Quadrat mit Raute),
  eine Quelle für Logo und Favicon.
- `src/config/navigation.ts` — fünf Hauptpunkte plus Kontakt, vier Fußspalten.
- `src/styles/global.css` — Farben, Schriften, Abstände, Bänder, Knöpfe,
  Fokus, `prefers-reduced-motion`.
- `src/layouts/Basis.astro` — Grundgerüst mit Sprungmarke zum Inhalt.
- `src/components/Logo.astro`, `Kopfbereich.astro`, `Fussbereich.astro`.
- `src/pages/index.astro` — als PLATZHALTER gekennzeichnet, zeigt nur Farben,
  Schriften und die beiden Bandarten.
- `scripts/check-brand.mjs` — bricht mit Code 1 ab, sobald der Markenname
  außerhalb von `brand.ts` auftaucht.
- `scripts/make-favicon.mjs` — erzeugt `public/favicon.svg` aus `zeichen.mjs`
  und den Farben aus `global.css`.
- Git-Repository angelegt, Commit „Schritt 1".

### Abnahme am 2026-08-10, nachdem Node 24.19.0 installiert war

- `npm install` — 194 Pakete, 0 Sicherheitswarnungen.
- `npm run build` — läuft durch, 1 Seite in 764 ms.
- `npm run check:brand` — bestanden. Gegenprobe mit absichtlichem Verstoß im
  Text **und** im Dateinamen: beide Male Exit-Code 1 mit Fundstelle. Der
  Wächter greift wirklich.
- `npm run dev` auf Port 3489 — Seite lädt, keine Fehler in der Konsole.
- Beide Schriften geladen, **null Anfragen an fremde Server**. Selbst
  gehostet, wie es sein muss.
- Kontraste: Fließtext 15,8:1 · Verweise 7,6:1 · Knopf 8,4:1 · heller Text auf
  Tinte 14,9:1 · gedämpfter Text auf Tinte 9,1:1. Alle deutlich über AA (4,5:1).
- Handy-Menü: auf, fünf Punkte sichtbar, zu — `aria-expanded` stimmt jeweils.
- Nachgebessert: Der Fußbereich hatte einen Außenabstand nach oben, dadurch
  stand ein hellgrauer Streifen zwischen weißem Abschnitt und dunklem Fuß.
  Entfernt, das Band schließt jetzt direkt an.

### Offene Punkte

1. Port 3489 gesetzt, weil unbeantwortet. Ändern in `package.json` und
   `astro.config.mjs`.
2. Domain und geschäftliche Mailadresse fehlen (PLATZHALTER in `brand.ts`).
3. Astro sendet anonyme Nutzungsdaten. Abschaltbar mit
   `npx astro telemetry disable`. Nicht gemacht, weil nicht abgesprochen.
4. Die Verweise in Kopf- und Fußbereich zeigen auf Seiten, die es noch nicht
   gibt — bis Schritt 10 laufen die meisten ins Leere. So geplant.
5. Node liegt unter `~/.local/node`, nicht in `/usr/local`. Der Dev-Server
   startet deshalb über absolute Pfade in `.claude/launch.json`. In Toms
   eigenem Terminal reicht `npm run dev`.

---

## Schritt 2 — Datenmodelle · erledigt am 2026-08-10

Angelegt unter `src/data`:

| Datei | Inhalt |
|---|---|
| `typen.ts` | Gemeinsame Typen: `PaketId`, `FaqEintrag`, `Bild`, `Punkt` |
| `pakete.ts` | 3 Pakete, 12 Seitenoptionen, Konfigurator-Rechnung |
| `leistungen.ts` | 4 Leistungen mit je 3 eigenen FAQ |
| `branchen.ts` | 5 Branchen mit je 3–4 Muss-Haben und 3–4 eigenen FAQ |
| `projekte.ts` | 3 Konzeptprojekte, Kennzeichnung, Umschaltung auf „kunde" |
| `faq.ts` | 17 allgemeine Fragen in 4 Gruppen |
| `ablauf.ts` | 6 Schritte von der Anfrage bis online |

Noch keine Seiten daraus erzeugt — das ist Schritt 6 bis 9.

Geprüft mit einem Skript außerhalb des Projekts (35 Zusicherungen): Anzahlen,
alle Preise gegen die Vorgabe, der gewollte Knick bei Start, Länge aller
SEO-Titel und -Beschreibungen, Querverweise Branche ↔ Projekt, und die
Konfigurator-Rechnung an sieben Fällen. Alles bestanden. `npm run build` und
`npm run check:brand` laufen weiter durch.

**Nachgebessert während der Prüfung:** Die Empfehlung im Konfigurator hing am
Preis — Start mit 6 Seiten kostet 629 €, Standard 849 €, also wurde kein
Hinweis gezeigt. Falsch: Laut Spezifikation springt der Konfigurator immer ins
nächste Paket. Jetzt tut er das, und der Kasten zeigt aus dem neuen Feld
`mehrAlsDavor`, was der Wechsel bringt. Der Knick verkauft, nicht der Preis.

### Offene Punkte

1. **Nur 3 Konzeptprojekte für 5 Branchen.** Bars verweist ersatzweise auf das
   Restaurant-Projekt, Handwerk hat `beispielProjekt: null`. Muss vor
   Schritt 7 geklärt werden.
2. **14 Platzhalter** in den Daten — alles, was nur Tom festlegen kann:
   Anzahlung, Laufzeit, Kündigung, Domaininhaber, Buchungssystem, ob er
   fotografiert, ob er Logos macht, die drei Projektnamen, die drei
   Projektdauern.
3. Die Listen `enthalten`, `nichtEnthalten`, `mehrAlsDavor` und
   `pflegeEnthaelt` sind mein Vorschlag, abgeleitet aus Toms Vorgaben. Sie
   beschreiben, was er verkauft — er muss sie bestätigen oder streichen.
4. Zählen Impressum und Datenschutz in die Seitenzahl? Aktuell: nein
   (`zaehlt: false`). Wirkt sich direkt auf den Preis aus.
