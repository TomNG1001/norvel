# FORTSCHRITT

Stand der Arbeit, ein Eintrag je Schritt. Wird nach jedem Schritt
fortgeschrieben, nie neu geschrieben. Regeln stehen in `PROJEKT.md`.

| Schritt | Inhalt | Status | Datum |
|---|---|---|---|
| 0 | Skills prüfen | erledigt | 2026-08-10 |
| 1 | Grundgerüst | erledigt und geprüft | 2026-08-10 |
| 2 | Datenmodelle | erledigt und geprüft | 2026-08-10 |
| 3 | /kontakt und /danke | erledigt und geprüft | 2026-08-10 |
| 4 | /preise | erledigt und geprüft | 2026-08-10 |
| 5 | Startseite | erledigt und geprüft | 2026-08-10 |
| 6 | /leistungen und die 4 Unterseiten | erledigt und geprüft | 2026-08-10 |
| 7 | /branchen und die 5 Unterseiten | erledigt und geprüft | 2026-08-10 |
| 8 | /arbeiten und die 3 Projektseiten | erledigt und geprüft | 2026-08-10 |
| 9 | /ueber-mich, /ablauf, /faq | erledigt und geprüft | 2026-08-10 |
| 10 | /impressum, /datenschutz, 404 | erledigt, Inhalt fehlt | 2026-08-10 |
| 11 | SEO und Qualität | erledigt und geprüft | 2026-08-10 |
| 12 | Abschluss | erledigt | 2026-08-10 |
| + | VELLOX-OS-Durchgang | erledigt und geprüft | 2026-08-10 |

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

---

## Schritt 3 — /kontakt und /danke · erledigt am 2026-08-10

Neu:

- `src/config/formular.ts` — Formspree-Endpunkt (Platzhalter), Feldnamen,
  Antwortmöglichkeiten für „Wie sieht es gerade aus?".
- `src/components/Kontaktformular.astro` — das Formular.
- `src/pages/kontakt.astro` — fünf Abschnitte: Kopf, drei Wege, Formular,
  was danach passiert, dunkler Abschluss mit Telefonnummer.
- `src/pages/danke.astro` — auf `noindex`.
- `global.css` um Formularfelder ergänzt (Mindesthöhe 2,875 rem,
  Schriftgröße 1 rem gegen Safaris Zoom beim Antippen).
- `Basis.astro` hat jetzt eine Eigenschaft `noindex`.
- `pakete.ts` um den Übergabe-Vertrag erweitert: `auswahlAlsSuchparameter`,
  `auswahlAusSuchparametern`, `auswahlAlsText`. Musste hierher, weil Schritt 3
  das versteckte Feld füllt und Schritt 4 dieselben Namen schreiben muss.

Formularfelder: Name, Betrieb, E-Mail, Telefon (freiwillig), Branche aus
`branchen.ts`, aktueller Stand, Nachricht, Datenschutz-Haken, verstecktes Feld
mit der Konfiguration, Honigtopf gegen Werbeprogramme.

Geprüft im laufenden Browser:

- Übergabe von der Preisseite: `?paket=start&seiten=…` füllt das versteckte
  Feld und zeigt dem Besucher sichtbar, was mitgeschickt wird. Gerechnet:
  Start mit 6 Seiten = 629 €, davon 2 Zusatzseiten. Stimmt.
- Pflichtfelder: name, betrieb, email, branche, stand, nachricht, datenschutz.
- Weiterleitung `_next` zeigt auf `<domain>/danke/`, Betreff kommt aus
  `brand.name`.
- `/danke` trägt `noindex, follow`, Startseite und `/kontakt` nicht.
- Der Entwickler-Warnkasten zum fehlenden Endpunkt taucht im fertigen Build
  **nicht** auf (0 Treffer in `dist/`).
- Drei Karten gleich breit und gleich hoch, Formularreihen zweispaltig ab
  40 em, Felder und Knopf 46 px hoch.
- Keine Konsolenfehler.

**Nachgebessert:** Die Seitenliste im versteckten Feld war mit Komma
verbunden — zusammen mit dem Optionsnamen „Karte, Preise oder Leistungen"
las sich das wie sieben Seiten statt sechs. Jetzt mit Plus verbunden.

**Port:** Von 3489 auf **3490** umgezogen, weil auf 3489 inzwischen
`serve-la-vite.py` läuft. Geändert in `package.json`, `astro.config.mjs` und
`.claude/launch.json`.

### Offene Punkte

1. **Formspree-Endpunkt fehlt.** Ohne ihn geht keine Anfrage raus. Konto auf
   formspree.io anlegen, Adresse in `src/config/formular.ts` eintragen.
2. Die Weiterleitung nach dem Absenden zeigt auf die Platzhalter-Domain. Sie
   funktioniert erst, wenn die echte Domain in `brand.ts` steht.
3. Antwortzeit: Auf `/danke` steht „Ich melde mich" ohne Frist. Wenn Tom eine
   Zusage machen will (etwa „innerhalb von 24 Stunden"), muss er sie nennen —
   ich erfinde keine.
4. Die Datenschutzerklärung wird vom Formular verlinkt, existiert aber erst
   ab Schritt 10.

---

## Schritt 4 — /preise · erledigt am 2026-08-10

Neu:

- `src/components/Konfigurator.astro` — Seitenauswahl, Paketwahl,
  SEO-Haken, mitlaufende Summe, Wechselkasten, Übergabe an /kontakt.
- `src/pages/preise.astro` — fünf Abschnitte: Kopf, Preistabelle auf einem
  Tinte-Band, Konfigurator, Pflegeumfang, dunkler Abschluss.
- `pakete.ts`: `auswahlAusSuchparametern` versteht jetzt beide Schreibweisen
  (`?seiten=a,b` und `?seiten=a&seiten=b`).

**Ohne JavaScript funktioniert der Konfigurator als normales GET-Formular auf
/kontakt.** Die Auswahl landet trotzdem im Kontaktformular, nur ohne
mitlaufende Summe. Mit JavaScript rechnet die Summe live, die Adresse bleibt
teilbar, und der automatische Wechsel greift.

Der automatische Wechsel, wie geprüft:

| Zustand | Anzeige |
|---|---|
| 2 Seiten (nur die festen) | Start · 449 € · 39 €/Monat |
| 5 Seiten | springt auf **Standard** · 849 €, Kasten „Auf Standard gewechselt" mit 5 Punkten und Knopf „Bei Start bleiben (539 €)" |
| Klick auf „Bei Start bleiben" | Start · 539 € · Zeile „1 × 90 € = 90 €", Kasten dreht sich um: „Für 310 € mehr" mit Knopf „Zu Standard wechseln" |
| dazu SEO | Start · 688 € (539 + 149) |
| zurück zu Standard | 1.068 € (849 + 219) · Zusatzseiten-Zeile weg |

Weiter geprüft:

- Geteilte Adresse `?paket=komplett&seiten=…&seo=1` stellt Haken, Paketwahl
  und Summe wieder her: 9 Seiten, 1.538 €, 89 €/Monat.
- Abschicken landet auf `/kontakt` mit
  `?seiten=angebot&seiten=ueber-uns&seiten=galerie&paket=standard&seo=1` —
  das ist die Schreibweise ohne JavaScript, und die Kontaktseite versteht sie.
  Der Kasten dort zeigt die Auswahl, das versteckte Feld ist gefüllt.
- Drei Preiskarten gleich hoch, Knöpfe auf einer Linie, Standard mit 3-px-Rahmen
  statt Schatten.
- Knöpfe in den weißen Karten auf dem Tinte-Band sind wieder stahlblau, nicht
  die helle Bandvariante.
- `§ 19`-Hinweis steht unter der Tabelle. **Kein Prozentzeichen auf der ganzen
  Seite** — automatisch geprüft.
- Keine Konsolenfehler.

### Offene Punkte

1. Auf dem Handy steht die Summe unter der Auswahlliste. Wer neun Haken setzt,
   scrollt weit, bis er den Preis sieht. Eine feste Summenleiste am unteren
   Rand wäre die übliche Lösung — nicht gebaut, weil nicht abgesprochen.
2. Die Karten-Knöpfe verweisen auf `?paket=…#konfigurator`. Ohne JavaScript
   springt man zwar zum Konfigurator, aber das Paket ist dort nicht
   vorausgewählt. Mit JavaScript stimmt es.

---

## Schritt 5 — Startseite · erledigt am 2026-08-10

Acht Abschnitte, im Wechsel hell und dunkel:

| # | Abschnitt | Grund |
|---|---|---|
| 1 | Kopf, Papier | Hauptziel und nächster Schritt |
| 2 | „Was ich vor jedem Gespräch sehe", Karte | drei konkrete Befunde |
| 3 | **24 bis 72 Stunden, Tinte** | laut Vorgabe ein Tinte-Band |
| 4 | „Für wen ich baue", Papier | 5 Branchen aus `branchen.ts` |
| 5 | „Was ich mache", Karte | 4 Leistungen aus `leistungen.ts` |
| 6 | „Was es kostet", Papier | 3 Pakete aus `pakete.ts` + § 19 |
| 7 | „Beispiele", Karte | 3 Konzeptprojekte mit Kennzeichnung |
| 8 | **Abschluss, Tinte** | laut Vorgabe ein Tinte-Band |

Neu dazu:

- `src/components/Kontaktabschluss.astro` — der Abschluss, der laut Vorgabe
  auf jeder Seite gleich ist. Bewusst ohne Einstellmöglichkeiten: wer den
  Text ändert, ändert ihn überall.
- `global.css` um ein Kachelsystem ergänzt (`.kacheln`, `.kachel`), damit
  Übersichtskarten ab Schritt 6 nicht fünfmal neu gebaut werden. Die ganze
  Kachel ist anklickbar, hat aber nur einen Halt für die Tabulatortaste.
- `branchen.ts` hat jetzt ein Feld `kurz` — die Vorgabe verlangt auf
  Übersichtsseiten Karten mit ein bis zwei Sätzen, und Leistung und Projekt
  hatten das schon. In Schritt 2 fehlte es.
- `/preise` benutzt jetzt denselben Abschluss statt eines eigenen.

Geprüft:

- Eine `h1`, Überschriftenfolge ohne Sprünge (H1, H2, H3 …).
- Kachel überall anklickbar: Klick in die Kachelmitte trifft
  `/branchen/restaurants`.
- Fünf Branchenkarten in zwei Reihen, alle gleich breit.
- **Tonprüfung über alle vier gebauten Seiten:** kein verbotenes Wort, kein
  „wir", kein Prozentzeichen im Seitentext.
- § 19-Hinweis unter der Preisübersicht.
- Alle Seiten und das Favicon antworten mit 200.

**Nachgebessert:**

1. Zwei echte Verstöße gegen die „nie wir"-Regel gefunden, beide aus Schritt 2:
   `ablauf.ts` hatte „Wir sprechen kurz" → jetzt „Ein kurzes Telefonat".
   `branchen.ts` hatte die FAQ-Frage „Wir wechseln die Karte ständig." →
   jetzt „Die Karte ändert sich ständig."
2. Im Kartenverweis stand „Für Restaurante ansehen" — die Einzahl mit „e“
   angehängt ergibt keinen Plural. Jetzt „Für Restaurants ansehen".
3. Fehlendes Leerzeichen vor der Telefonnummer im Kopfabschnitt.
4. Harter Zeilenumbruch in der H1 entfernt — er hätte auf schmalen Geräten
   an der falschen Stelle gebrochen.

### Offene Punkte

1. `/kontakt` behält seinen eigenen Abschluss. Der gemeinsame würde dort auf
   die Seite verweisen, auf der man schon steht.
2. Die drei Projektnamen stehen als PLATZHALTER auf der Startseite — sichtbar,
   wie es sein soll, aber sie gehören ersetzt, bevor jemand die Seite sieht.

---

## Schritt 6 — /leistungen und die vier Unterseiten · erledigt am 2026-08-10

Fünf Seiten aus **einer** Vorlage plus einer Übersicht:

- `src/components/Brotkrumen.astro` — Brotkrumennavigation, ab jetzt auf jeder
  Unterseite. Das Trennzeichen kommt aus CSS, damit Vorleseprogramme es nicht
  mitlesen. Der letzte Eintrag ist kein Verweis, sondern trägt `aria-current`.
- `src/pages/leistungen/index.astro` — Übersicht, vier Abschnitte.
- `src/pages/leistungen/[slug].astro` — die Vorlage, sechs Abschnitte:
  Kopf · Warum das zählt + Was dabei ist · Was es kostet (Tinte) ·
  Häufige Fragen · Die anderen Leistungen · Kontaktabschluss.
- `leistungen.ts` hat ein Feld `preisArt` bekommen. Es sagt nur, **welche**
  Zahl aus pakete.ts gemeint ist — die Zahl selbst steht weiterhin nur dort.

Jede Leistung zeigt dadurch die für sie richtige Zahl:

| Seite | Preisband |
|---|---|
| Website | ab 449 € — einmalig, je nach Seitenzahl |
| Hosting und Pflege | ab 39 € — im Monat, je nach Paket |
| Auffindbarkeit bei Google | ab 149 € — einmalig zum Paket dazu |
| Google-Unternehmensprofil | Ab Standard — ohne Aufpreis enthalten |

Geprüft:

- Alle vier Unterseiten haben **genau 6 Abschnitte**, eine `h1` und
  Brotkrumen. Die Übersicht hat 4.
- Brotkrumenpfade stimmen: `Start › Leistungen › Hosting und Pflege`.
- Alle neun Seiten: Titel unter 60, Beschreibung unter 160 Zeichen —
  einschließlich des angehängten Markennamens. Keine zwei Titel gleich.
- § 19-Hinweis auf jeder Leistungsseite unter dem Preis.
- Alle Adressen antworten mit 200, keine fehlgeschlagenen Ressourcen.

**Nachgebessert:** Meine erste Fassung der Vorlage hatte sieben Abschnitte —
erlaubt sind vier bis sechs. „Warum das zählt" und „Was dabei ist" sind jetzt
ein Abschnitt mit Unterüberschrift.

### Offene Punkte

1. Startseite (8 Abschnitte) und `/danke` (2) liegen außerhalb von 4–6. Die
   Regel gilt laut Vorgabe für Unterseiten; beide sind keine. Falls sie doch
   gelten soll, sag Bescheid.
2. Die Listen unter `enthalten` sind weiterhin mein Vorschlag und stehen jetzt
   sichtbar auf den Leistungsseiten. Sie gehören durchgesehen.
3. Zwei PLATZHALTER-Antworten stehen jetzt öffentlich auf
   `/leistungen/hosting-pflege`: Kündigung und Verbleib der Dateien.

---

## Schritt 7 — /branchen und die fünf Unterseiten · erledigt am 2026-08-10

Sechs Seiten aus einer Vorlage plus Übersicht. Aufbau je Branchenseite:
Kopf · Wie es heute aussieht + Was deine Seite können muss · Das passende
Paket (Tinte) · Ein Beispiel · Häufige Fragen · Kontaktabschluss.

**Der Verbindungsweg steht:** Branchenseite → passendes Paket auf /preise →
/kontakt. Der Knopf „Mit Standard rechnen" führt auf
`/preise?paket=standard#konfigurator`, dort ist das Paket vorausgewählt und
die Seite steht direkt auf dem Konfigurator.

| Branche | Paket | Beispielprojekt |
|---|---|---|
| Restaurants | Standard, ab 849 € | eigenes |
| Bars | Standard, ab 849 € | fremdes, ehrlich beschriftet |
| Kosmetikstudios | Standard, ab 849 € | eigenes |
| Hundefriseure | Standard, ab 849 € | eigenes |
| Handwerk | Komplett, ab 1.249 € | keins, sagt es offen |

Die Region wird auf **/branchen** abgedeckt — die eine Seite, die Heidelberg,
Mannheim, Ludwigshafen, Weinheim und Schwetzingen im Fließtext nennt. Keine
zweite Seite darf das wiederholen. Es gibt keine Branche-mal-Stadt-Adressen.

**Zwei echte Fehler gefunden und behoben:**

1. Der Konfigurator schrieb die Adresszeile neu und warf dabei `#konfigurator`
   weg. Dadurch brach der Sprung von der Branchenseite ab und man stand oben
   auf /preise. Jetzt bleibt das Sprungziel erhalten.
2. `scroll-behavior: smooth` in global.css hat den Ankersprung **animiert** —
   über 3000 Pixel dauert das lange und man verliert die Orientierung.
   Entfernt. Sprungziele sind jetzt sofort da.

Geprüft: alle 15 Seiten ohne Regelverstoß — kein verbotenes Wort, kein „wir",
kein Prozentzeichen, Titel unter 60, Beschreibung unter 160, genau eine h1,
Unterseiten mit 4–6 Abschnitten und Brotkrumen.

---

## Schritt 8 — /arbeiten und die drei Projektseiten · erledigt am 2026-08-10

Übersicht plus drei Projektseiten aus einer Vorlage. Aufbau je Projektseite:
Kopf mit Kennzeichnung · Aufgabe und Umsetzung · Eckdaten (Tinte) · Was das
für die Branche heißt · die anderen Beispiele · Kontaktabschluss.

**Rechtliches geprüft:** „Konzeptprojekt" steht auf jeder Ansicht — auf der
Übersicht 4×, auf jeder Detailseite 5×, auf der Startseite 3×. Über den Karten
steht der Hinweis, dass keine Kundenseite live ist. Für Kundenzitate und
Erfolgszahlen gibt es im Datenmodell nicht einmal ein Feld.

Der Weg zurück ist geschlossen: Projekt → Branche → Paket → Kontakt.

---

## Schritt 9 — /ueber-mich, /ablauf, /faq · erledigt am 2026-08-10

- **/ueber-mich** — vier Abschnitte. „Wie ich arbeite" und „Was ich nicht
  mache" sind aus den Projektregeln abgeleitet, nicht erfunden. Der Absatz
  „Wie ich dazu gekommen bin" ist ein sichtbarer Platzhalter: Werdegang und
  Beweggrund kann nur Tom schreiben. Ein Foto fehlt ebenfalls.
- **/ablauf** — die sechs Schritte aus `ablauf.ts`, dazu ein Tinte-Band mit
  allem, was Tom vom Kunden braucht. Diese Liste entsteht aus den Feldern
  `vonDir` und kann nicht auseinanderlaufen.
- **/faq** — 17 Fragen in vier Gruppen mit Sprungmarken. Branchen- und
  Leistungsfragen stehen bewusst nicht hier, sondern bei der Branche und der
  Leistung; von hier führen nur Verweise dorthin.

---

## Schritt 10 — /impressum, /datenschutz, 404 · erledigt am 2026-08-10

Die Seiten stehen, **die Rechtstexte fehlen** — die liefert Tom.

- **/impressum** — sichtbarer Platzhalter plus die Liste der Pflichtangaben,
  jede einzeln als „fehlt" markiert, wo sie fehlt. Die Anschrift ist Pflicht
  und fehlt.
- **/datenschutz** — sichtbarer Platzhalter plus technische Zuarbeit: was
  diese Website nachweislich **nicht** tut (kein Zählwerkzeug, keine Cookies,
  keine fremden Schriften, keine Einbettungen) und die vier Punkte, die in den
  Text müssen.
- **404** — keine Sackgasse: Hauptnavigation, Telefonnummer, Startseite. Auf
  `noindex`.

---

## Schritt 11 — SEO und Qualität · erledigt am 2026-08-10

- `@astrojs/sitemap` eingebaut, `/danke` herausgefiltert. 23 Adressen.
- `/robots.txt` wird beim Build aus `brand.ts` erzeugt, damit die Domain nicht
  an zweiter Stelle im Projekt steht.
- Canonical auf allen 25 Seiten, Open-Graph-Angaben dazu.
- **JSON-LD:** ProfessionalService 25×, BreadcrumbList 15× (jede Unterseite),
  FAQPage 6× (genau `/faq` und die fünf Branchenseiten, sonst nirgends).
  Die BreadcrumbList entsteht in der Brotkrumen-Komponente selbst — dieselben
  Daten, deshalb kann sie nicht von der sichtbaren Navigation abweichen.

**Der wichtigste Fund: Layout-Sprünge von 0,38.** Erlaubt sind 0,1. Ursache:
Der Text erschien erst in der Systemschrift und sprang beim Nachladen der
Schriften um. Beide Schriftdateien werden jetzt vorab geladen — gemessen
**0,0000**. Kein einziger Sprung mehr.

Weiter gemessen: Überschriftenfolge ohne Sprünge, kein Verweis ohne Text,
kein Formularfeld ohne Beschriftung, Fokusumriss 3 px, `lang="de"`,
Sprungmarke zum Inhalt, je eine Kopf-, Inhalts- und Fußlandmarke.

Seitengewicht: 16 kB HTML im Schnitt, 18 kB CSS, 8 kB JavaScript,
119 kB Schriften.

### Offene Punkte

1. **Lighthouse selbst wurde nicht ausgeführt.** Dafür wäre ein weiteres
   npm-Paket nötig, und die Vorgabe erlaubt nur `@fontsource` und
   `@astrojs/sitemap` ohne Rückfrage. Gemessen habe ich stattdessen einzeln:
   Layout-Sprünge, Kontraste, Überschriften, Beschriftungen, Fokus, Gewicht.
   Wenn du willst: `npx lighthouse http://localhost:3490 --view`.
2. Für die strukturierten Daten fehlt die Anschrift — sie steht noch nicht
   fest. Eine erfundene wäre schlimmer als keine.

---

## Schritt 12 — Abschluss · erledigt am 2026-08-10

**Was noch von Tom fehlt**, steht als abhakbare Liste in
[`WAS-NOCH-FEHLT.md`](WAS-NOCH-FEHLT.md), sortiert nach Dringlichkeit:
Rechtstexte und Formspree-Endpunkt zuerst, danach Inhalte, dann
geschäftliche Festlegungen, dann meine Entscheidungen zum Gegenlesen.

### Bericht: welche Skills ich benutzt habe

**Keinen einzigen.** In Schritt 0 hatte ich acht als voraussichtlich nützlich
eingestuft. Benutzt habe ich am Ende keinen davon, und das ist keine
Nachlässigkeit, sondern das Ergebnis der Spezifikation:

| Skill | in Schritt 0 vorgesehen für | warum doch nicht |
|---|---|---|
| `design-system` | Farb- und Abstands-Token in Schritt 1 | Der Skill schlägt eine dreischichtige Token-Architektur vor. Toms Vorgabe lautet „an einer Stelle ändern können" — die zusätzliche Schicht hätte das Gegenteil bewirkt. |
| `frontend-design` | Gestaltung ab Schritt 5 | Farben, Schriften, Bandrhythmus und Verbote standen bereits schriftlich fest. Es gab keine offene Gestaltungsfrage. |
| `design-taste-frontend` | Gegenlesen | Gleicher Grund. Der Skill hätte eigene Vorschläge gemacht, die laut Rangfolge ohnehin hinter Toms Vorgaben stehen. |
| `emil-design-eng` | Formulardetails in Schritt 3 und 4 | Die Punkte, die er behandelt, standen schon in der Vorgabe: Fokus sichtbar, Mindestgrößen, kein Schnickschnack. |
| `ui-ux-pro-max` | Schriftpaarung, Barrierefreiheit | Die Schriftpaarung war vorgegeben. Die Barrierefreiheit habe ich gemessen statt nachgeschlagen. |
| `full-output-enforcement` | lange Dateien | Nicht nötig, es wurde nichts gekürzt. |
| `run` | App starten | Der Dev-Server lief über die Vorschau, nicht über den Skill. |
| `simplify` | Aufräumen | Sollte laut Vorgabe nur auf Zuruf laufen. Kein Zuruf. |

Was ich stattdessen gemacht habe: nach jedem Schritt eigene Prüfskripte
geschrieben und laufen lassen — für die Preislogik, den Ton, die
Seitenstruktur, die SEO-Auszeichnung, die Kontraste und die Layout-Sprünge.
Diese Prüfungen haben die Fehler gefunden, die in den Schritten 2, 5, 7 und 11
dokumentiert sind.

### Abschließende Prüfung

- `npm run build` — 25 Seiten, keine Fehler.
- `npm run check:brand` — bestanden.
- Keine toten internen Verweise.
- Einzige Seite ohne eingehenden Verweis: `/danke` — richtig so, sie ist nur
  nach dem Absenden erreichbar und steht auf `noindex`.
- Alle 25 Seiten: eigener Titel unter 60 Zeichen, eigene Beschreibung unter
  160, genau eine `h1`, Canonical, Schriften vorabgeladen, `lang="de"`.
- Kein verbotenes Wort, kein „wir", kein Prozentzeichen im Seitentext.
- Unterseiten: 4–6 Abschnitte, Brotkrumen, BreadcrumbList.

---

## Zusatz: VELLOX OS angewandt, 2026-08-10

Quelle: <https://github.com/underworlddev1-spec/Vellox-OS>. Der anwendbare
Auszug steht in [`VELLOX-REGELN.md`](VELLOX-REGELN.md).

Drei Verstöße gefunden und behoben:

1. **114 Gedankenstriche** als Satzmelodie in Copy und Kommentaren. Vellox
   nennt sie das Erkennungszeichen automatisch geglätteter Sprache. Ersetzt
   durch Punkt oder Komma, je nachdem, ob ein neuer Hauptsatz folgt.
   Bis-Striche in Bereichen wie „24 bis 72" bleiben, das sind keine
   Gedankenstriche.
2. **Alle fünf Branchenseiten trugen dieselbe Gliederung.** Nach Abzug des
   Branchennamens blieb wortgleich „Websites für {NAME} | Wie es heute
   meistens aussieht | Für {NAME} passt meistens Standard | Ein Beispiel".
   Dasselbe bei den vier Leistungs- und den drei Projektseiten. Jede Seite
   hat jetzt eigene Überschriften aus ihrem Datensatz.
3. **Zehn von zwölf Seiten hatten zu lange Einleitungen.** Teils zu lange
   Texte, teils falsch vergebene Auszeichnung: `vorspann` stand über
   Fließtext, der nie eine Einleitung war.

Dazu neu: Die Startseite sagt jetzt, für wen sie nicht gemacht ist. Der
Vorspann bekommt am Telefon eine Schriftstufe weniger.

Nicht übernommen: die Motion Language aus `02_BRANDING/03`. PROJEKT.md
verbietet Scroll-Animationen, und laut Rangfolge gewinnt PROJEKT.md.

---

## Überarbeitung nach Toms Durchsicht, 2026-08-11

Auf der Startseite:

- **Überschrift.** „Deine Kunden suchen dich auf dem Handy. Was finden sie?"
  war eine Frage ohne Aussage. Jetzt: „Du machst gute Arbeit. Nur findet sie
  online keiner."
- **Zweiter Abschnitt.** „Was ich vor jedem Gespräch sehe" behauptete eine
  Gewohnheit, die so nicht zutrifft. Jetzt „Woran es fast immer hängt", und
  der Vorspann beschreibt den Befund statt Toms Ablauf.
- **Der 24-bis-72-Stunden-Abschnitt war zu leer.** Dazugekommen ist ein
  Zeitplan mit drei Stationen: Telefonat, Material, Vorschauadresse.
- **„Was es kostet"** ist von der Startseite verschwunden. Der Abschnitt heißt
  jetzt „Preise, die vorher feststehen", der Knopf im Kopf „Preise ansehen",
  der Knopf im Preisabschnitt „Preise vergleichen". Auf /preise wurde aus der
  h1 „Was deine Seite kostet".
- **Die fünf Branchen wirkten wie eine Grenze.** Neu auf der Startseite und
  auf /branchen ein Kasten: Werkstatt, Praxis, Fahrschule, Metzgerei,
  Fotograf, Steuerbüro. Gebaut wird für jeden Betrieb, hinter dem ein Mensch
  steht, der selbst ans Telefon geht. Die Abgrenzung nach unten (keine Shops,
  keine Konzerne, keine Agenturen) bleibt daneben stehen.

Farbe:

- **`--papier` von `#F1F4F7` auf `#E9EDF1`**, kühleres Kreideweiß.
  `PROJEKT.md` ist nachgezogen, sonst stünde dort ein Wert, den es nicht mehr
  gibt. Kontraste nachgemessen: Fließtext 14,8:1, Verweise 7,2:1, leiser Text
  6,0:1. Alle über AA.

Zur Frage nach dem Google-Unternehmensprofil: Es ist der kostenlose
Google-Eintrag (Kasten neben der Suche, Pin in Maps). Er stand als Leistung
auf der Seite, weil er in Toms eigener Vorgabe stand: „Start hat bewusst keine
Terminbuchung, keinen WhatsApp-Button, kein Google-Profil".

**Nachtrag vom selben Tag: Tom bietet das nicht an, also ist es raus.** Die
vierte Leistung, die Fußzeile, der Knick bei Start und zwei versteckte
Erwähnungen in `ablauf.ts` und `probleme.ts` sind entfernt. Aus vier
Leistungen sind drei geworden, aus 25 Seiten sind 28 geworden (eine Leistung
weniger, vier Problemseiten mehr).

Offen geblieben: Tom sagt, fast jede Seite brauche noch Änderungen. Bisher
liegen Anmerkungen nur zur Startseite vor.

---

## Der 24-bis-72-Stunden-Abschnitt, 2026-08-11

Tom: „die ist noch bisschen langweilig, das ist einfach nur Text auf einer
Seite." Stimmte. Der Abschnitt bestand aus zwei Absätzen, einer Aufzählung
mit Randlinie und zwei weiteren Absätzen. Nichts davon war ein Bild.

Neu:

- **Eine Schiene statt einer Aufzählung.** Drei Halte mit nummerierten
  Quadraten, jeweils mit Dauer darüber: „20 Minuten", „Liegt bei dir",
  „24 bis 72 Stunden".
- **Der zweite Halt sieht anders aus als die anderen.** Sein Quadrat ist
  leer statt gefüllt, seine Dauer ist grau statt blau, und die Schiene unter
  ihm ist gestrichelt. Das ist der einzige Schritt, den Tom nicht in der
  Hand hat, und die einzige Stelle ohne Zeitversprechen. Die Form sagt
  dasselbe wie der Text daneben.
- **Ein Handy, in CSS gezeichnet.** Adressleiste mit
  `vorschau.deinbetrieb.de`, dunkler Seitenkopf, Anrufknopf,
  Öffnungszeiten. Bewusst schematisch, mit Balken statt Text: Ein
  gezeichnetes Bildschirmfoto wäre ein Beweis, den es noch nicht gibt, und
  Vellox verbietet erfundene Belege.
- **Der ehrliche Satz ist dahin gewandert, wo er hingehört.** „Woran es
  wirklich hängt, sind deine Texte" stand vorher als Absatz unter der
  Aufzählung. Jetzt steht er als Notiz im zweiten Halt, also genau an dem
  Schritt, um den es geht.

Gemessen bei 390 × 844: keine Bewegung, kein Skript, kein Bild, also kein
CLS-Risiko. Kontraste im Abschnitt zwischen 5,1:1 und 9,0:1, alle über AA.
Die Startseite ist von 10,9 auf **11,4 Bildschirme** gewachsen und liegt
damit unter der Vellox-Grenze von zwölf, aber nicht mehr weit darunter. Damit
das reicht, stehen Handy und Bildunterschrift am Telefon nebeneinander statt
untereinander; das spart rund 300 Pixel.

**Der nächste Abschnitt, der auf der Startseite wächst, muss einen anderen
verkleinern.** Sonst reißt die Zwölf.
