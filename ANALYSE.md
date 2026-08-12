# Teil 0 — Die Antwort auf „warum sieht die Seite langweilig aus"

Fünf Ursachen. In dieser Reihenfolge.

## 0.1 Der Wechsel aus hellen und dunklen Bändern existiert rechnerisch, aber nicht sichtbar

PROJEKT.md baut den ganzen Seitenrhythmus auf dem Wechsel `--papier` ↔ `--karte` ↔ `--tinte` auf. Ich habe die Kontraste gerechnet:

| Paar | Kontrast |
|---|---|
| `--papier` `#E9EDF1` ↔ `--karte` `#FFFFFF` | 1,13 : 1 |
| `--eisblau` `#C9D8E6` Rahmen auf `--papier` | 1,24 : 1 |
| `--eisblau` Rahmen auf `--karte` | 1,45 : 1 |

1,13:1 ist unterhalb der Wahrnehmungsschwelle. Auf einem Handy bei Tageslicht, mit automatischer Helligkeit, bei jeder Bildschirmneigung: Der Besucher sieht die Abschnittsgrenzen nicht. Und die Trennlinie, die sie retten sollte (`border-block: var(--linie)` auf `.band--karte`), liegt mit 1,45:1 ebenfalls darunter.

Das heißt: Der Rhythmus, auf den das ganze Layoutkonzept gebaut ist, kommt beim Besucher nicht an. Die Seite liest sich als eine einzige, endlos lange, hellgraue Fläche.

## 0.2 Die Startseite hat sieben helle Abschnitte hintereinander und erst ganz unten einen dunklen

Ich habe die Bandfolge aller 28 Seiten ausgelesen. · = Kreide, □ = Weiß, ■ = Tinte:

```
/                          · □ · □ · □ · ■
/branchen/restaurants      · □ ■ · □ ■
/leistungen/website        · □ ■ □ · ■
/preise                    · ■ · □ ■
/probleme/preise-im-pdf    · □ ■ · ■
```

Jede Unterseite bekommt ihr dunkles Band an Position 3. Die Startseite bekommt es an Position 8.

Der Eintrag in PROJEKT.md erklärt warum:

> Geändert am 10.08. auf Ansage: Der 24–72-Stunden-Abschnitt auf der Startseite ist kein Tinte-Band mehr, sondern Kreideweiß.

Diese eine Änderung hat der Startseite ihren einzigen visuellen Höhepunkt in der oberen Hälfte genommen. Zusammen mit 0.1 ergibt das: 11,6 Bildschirme scrollen ohne ein einziges Ereignis.

Das ist der Hauptgrund für „langweilig". Und es ist eine Zeile Code.

## 0.3 Kein einziges Bild. Nirgends.

`<img>` im gesamten Projekt (src + dist): **0**

`src/data/typen.ts` definiert ein Bild-Interface mit `pfad`, `alt`, `breite`, `hoehe`. Es wird in `projekte.ts` als Feld deklariert (`bild: Bild | null`) — und in keinem einzigen Template gerendert. Es gibt keinen `<Image>`-Import, kein `astro:assets`, keine Bildpipeline.

Das ist mehr als ein fehlendes Foto. Das ist eine Website, die verkauft „deine Seite wird gut aussehen" und dabei selbst nichts zeigt, was aussieht. Die einzige Abbildung auf der ganzen Seite ist das Handy-Mockup auf der Startseite — und dessen Inhalt sind graue Balken.

WAS-NOCH-FEHLT.md listet unter 2.1 „Ein Foto von dir". Das ist zu klein gedacht: Es gibt aktuell keinen Ort im Code, an dem ein Bild landen könnte. Das ist eine Bauaufgabe, keine Materialaufgabe.

## 0.4 Vierzehn identische Kacheln in vier aufeinanderfolgenden Rastern

Auf der Startseite:

```
class="kacheln kacheln--3"   ← 3 Probleme
class="kacheln kacheln--5"   ← 5 Branchen
class="kacheln kacheln--3"   ← 3 Leistungen
class="kacheln kacheln--3"   ← 3 Projekte
```

14 weiße Rechtecke, alle mit demselben 2px-Rahmen, demselben 4px-Radius, derselben inneren Anordnung (h3 → p → unterstrichener Link), derselben Höhe. Vier Raster in Folge, dazwischen nur unsichtbare Abschnittsgrenzen (siehe 0.1).

VELLOX-REGELN.md markiert „drei gleichartige Vorteilskarten" selbst als KI-Muster und schreibt „Bleibt beobachtet". Der Befund ist: Es sind nicht drei, es sind vier Raster mit vierzehn Karten, und sie sind alle identisch gestaltet.

Die Startseite hat außerdem 18 `<h3>` — mehr Zwischenüberschriften als manche Unterseite Wörter hat.

## 0.5 Nichts ist groß

Es gibt keinen einzigen Moment auf der ganzen Seite, an dem etwas visuell laut wird. Das größte Element ist die h1 bei 34px (mobil) / 56px (Desktop). Danach: alles zwischen 14px und 24px. Ein Akzentton (`--stahl`), eine Rahmenstärke (2px), ein Radius (4px), zwei Schriften, sechs Abstandswerte.

Diese Disziplin ist genau richtig — sie ist der Grund, warum die Seite nicht nach Baukasten aussieht. Aber Disziplin ohne einen einzigen Ausbruch liest sich als Zurückhaltung, nicht als Haltung. Der Unterschied zwischen „ruhig" und „langweilig" ist, dass „ruhig" eine laute Stelle hat, gegen die es ruhig sein kann.

Konkret fehlt: eine Zahl, ein Satz oder ein Bild pro Seite, das doppelt so groß ist wie alles daneben. Kandidaten hast du längst im Text stehen — „24 bis 72 Stunden", „449 €", „Ein Standort, ein Inhaber".

---

# Teil 1 — Blocker: Was raus muss, bevor irgendjemand die Seite sieht

Diese Punkte sind keine Geschmacksfragen. Solange sie stehen, schadet jeder Besucher mehr, als er nützt.

## 1.1 „PLATZHALTER" steht 15-mal sichtbar auf 12 von 28 Seiten

Gemessen im gebauten HTML:

| Text | Vorkommen |
|---|---|
| PLATZHALTER Restaurantname | 8× |
| PLATZHALTER Studioname | 7× |
| PLATZHALTER Salonname | 7× |
| PLATZHALTER. Dauer von Tom bestätigen lassen | 3× |
| PLATZHALTER. Tom muss festlegen, … (7 verschiedene FAQ-Antworten) | 12× |

Betroffene Seiten: `/`, `/faq`, `/kontakt`, `/arbeiten` + alle 3 Projektseiten, 4 von 5 Branchenseiten, `/leistungen/hosting-pflege`.

Die Projektseiten haben als h1: „PLATZHALTER Restaurantname: Karte, Zeiten, Reservierung". Das ist die Überschrift, die im Browser-Tab und in jeder geteilten Vorschau steht.

## 1.2 Der Tonbruch ist schlimmer als der Platzhalter selbst

Die ganze Seite ist konsequent in Ich-Form. Dann steht in der FAQ:

> „PLATZHALTER. Tom muss festlegen, ob es eine Anzahlung gibt, wie hoch sie ist und wann der Rest fällig wird."

Das Wort „Tom" in dritter Person taucht 15-mal im ausgelieferten HTML auf, in Sätzen, die über Tom sprechen statt als Tom. Für einen Interessenten sieht das aus, als hätte jemand anders die Seite gebaut und vergessen aufzuräumen — genau der Eindruck, den „Du redest mit mir, nicht mit einem Team" widerlegen soll.

Sofortmaßnahme, 20 Minuten: Bis die echten Antworten feststehen, ersetze jede PLATZHALTER-Antwort durch etwas, das in der Ich-Form stimmt und trotzdem nichts erfindet:

```ts
// statt: "PLATZHALTER. Tom muss festlegen, ob es eine Anzahlung gibt…"
antwort: "Das bespreche ich im ersten Telefonat mit dir, bevor irgendetwas
          unterschrieben wird. Ich schicke dir die Konditionen schriftlich,
          damit du sie in Ruhe lesen kannst."
```

Das ist keine Lüge, es ist eine ehrliche Nicht-Antwort in der richtigen Stimme. Alternativ: die Frage ganz aus `faq.ts` entfernen, bis sie beantwortbar ist. Eine fehlende Frage fällt niemandem auf. Eine mit „PLATZHALTER" beantwortete schon.

## 1.3 Das Formular sieht funktionsfähig aus und tut nichts

`src/config/formular.ts` → `https://formspree.io/f/PLATZHALTER-FORM-ID`

Der Warnkasten erscheint nur bei `import.meta.env.DEV`. Im gebauten Build ist er weg. Das heißt: Auf der Live-Seite sieht das Formular perfekt aus, der Absenden-Knopf reagiert, und die Anfrage verschwindet. Wer jetzt anfragt, denkt, du meldest dich nicht.

Dazu: `_next` zeigt auf `https://platzhalter-domain.de/danke/` — eine Domain, die es nicht gibt.

Bis der Endpunkt steht, ist der ehrlichste Zustand: Formular deaktivieren. Ein Satz „Das Formular ist gerade in Arbeit, ruf mich bitte an" plus Nummer verliert weniger als ein Formular, das schweigt.

## 1.4 Die Mailadresse im Fußbereich steht auf jeder der 28 Seiten

`platzhalter@platzhalter-domain.de`, verlinkt als `mailto:`. Auf jeder Seite, unten, direkt neben deiner echten Handynummer. Die Kombination aus echter Nummer und offensichtlicher Fake-Mail ist verwirrender als gar keine Mail.

Bis eine Geschäftsadresse steht: Zeile in `Fussbereich.astro` ausblenden. Die Telefonnummer allein ist glaubwürdiger.

## 1.5 Impressum und Datenschutz stehen in der Sitemap

`dist/sitemap-0.xml` enthält `/impressum/` und `/datenschutz/` — beides reine Platzhalterseiten. Solange `inDieSucheAufnehmen` auf `false` steht, ist das folgenlos. Beim Umschalten aber nicht. Setz den Filter jetzt schon:

```js
// astro.config.mjs
filter: (seite) => !["/danke", "/impressum", "/datenschutz"].some(p => seite.includes(p)),
```

Rechtsseiten gehören nie in eine Sitemap.

---

# Teil 2 — Optik und visuelles System

## 2.1 Das dunkle Band zurück in die obere Hälfte der Startseite

Der stärkste Einzelhebel der ganzen Analyse. Der psychologisch richtige Ort ist nicht der 24–72-Stunden-Abschnitt (das ist der positive Teil), sondern „Woran es fast immer hängt" — der Abschnitt, in dem es um das Problem geht.

Dunkel = Problem, hell = Lösung. Das ist eine Bedeutungsebene, die der Besucher nicht bewusst liest, aber spürt. Und es setzt den optischen Bruch dorthin, wo er dramaturgisch hingehört: kurz nach dem Einstieg.

```diff
- <section class="abschnitt band--karte">
+ <section class="abschnitt band--tinte">
      <h2>Woran es fast immer hängt</h2>
```

Dann müssen die drei `.kachel` darin auf Tinte funktionieren — dafür brauchst du eine Variante:

```css
/* global.css, bei den Kacheln */
.band--tinte .kachel {
  background: color-mix(in srgb, var(--karte) 8%, var(--tinte));
  border-color: color-mix(in srgb, var(--auf-tinte) 22%, transparent);
  color: var(--auf-tinte);
}
.band--tinte .kachel h3 { color: var(--auf-tinte); }
.band--tinte .kachel:hover { border-color: var(--auf-tinte); }
```

Neue Bandfolge der Startseite: `· ■ · □ · □ · ■` — zwei dunkle Anker statt einem, und der erste kommt bei Bildschirm 2 statt Bildschirm 11.

## 2.2 `--papier` muss dunkler werden

Bei 1,13:1 gegen Weiß trägt Kreideweiß den Rhythmus nicht. PROJEKT.md dokumentiert, dass `--papier` am 10.08. schon einmal von `#F1F4F7` nach unten geändert wurde. Geh den Schritt zu Ende:

```css
--papier: #DFE6ED;   /* statt #E9EDF1 */
```

Neuer Kontrast gegen `--karte`: 1,26 : 1. Immer noch dezent, aber die Grenze wird sichtbar. Prüf danach die abgeleiteten Werte:

- `.leise` auf Papier (`color-mix(tinte 70%, papier)`) → 5,7:1, weiterhin AA ✓
- Fließtext `--tinte` auf Papier → 13,4:1 ✓
- `--stahl` auf Papier → 6,5:1 ✓

Alles bleibt über AA. Achtung: `scripts/make-favicon.mjs` liest `--stahl` und `--papier` per Zeilenmuster aus `global.css` — die Form `--papier: #hexwert;` beibehalten.

## 2.3 Die Rahmen sind mit 1,24:1 unter dem gesetzlichen Minimum

WCAG 2.2, Kriterium 1.4.11 Non-text Contrast, verlangt 3:1 für die Umrisse von Bedienelementen. Betroffen ist alles, was `--eisblau` als Rahmen benutzt:

- **Formularfelder** (`input`, `select`, `textarea`, 2px `--eisblau`) — hier ist es ein echter Fehler, nicht nur ein optischer: Der Rahmen ist das Einzige, was ein Eingabefeld als Eingabefeld erkennbar macht. Bei 1,45:1 auf Weiß ist ein leeres Feld für Menschen mit Sehschwäche unsichtbar.
- Kacheln, `.probe`, `.offen`, `.paket`, `.reihe`-Chips, `.branchenreihe`

Fix ohne Umbau der Palette: zweiter Rahmenton, `--eisblau` bleibt für Trennlinien.

```css
--eisblau:  #C9D8E6;  /* Trennlinien innerhalb von Blöcken, unverändert */
--kante:    #8FA9C2;  /* Rahmen von Bedienelementen — 3,1:1 auf Weiß */
```

Und dann in `global.css`:

```css
input[type="text"], input[type="email"], input[type="tel"],
select, textarea { border-color: var(--kante); }
.kachel { border-color: var(--kante); }
```

Nebenwirkung, die du wollen wirst: Die 14 Kacheln bekommen endlich eine Kontur. Aktuell schweben sie als weiße Flächen auf hellgrau ohne erkennbare Kante.

## 2.4 Die Brotkrumen-Trennzeichen sind unsichtbar

```css
.brotkrumen li + li::before { content: "›"; color: var(--eisblau); }
```

1,24:1. Die Brotkrumen lesen sich als „Start Branchen Restaurants" ohne erkennbare Trennung. Auf `var(--kante)` umstellen, dann sind sie da, ohne aufdringlich zu sein.

## 2.5 Die 404 ist nicht lesbar

```css
.fehlernummer { font-size: var(--gr-h1); color: var(--eisblau); }
```

Eine 56px große „404" bei 1,24:1 Kontrast. Das ist das erste, was jemand sieht, der über eine alte Visitenkarte kommt — und er sieht es nicht. Auf `--kante` oder besser `color-mix(in srgb, var(--stahl) 35%, var(--papier))`.

## 2.6 Sechs Seiten enden mit drei dunklen Blöcken übereinander

`/ablauf`, `/ueber-mich`, `/faq`, `/danke`, `/impressum`, `/datenschutz` haben alle:

```
letzter Inhaltsabschnitt (tinte) → Kontaktabschluss (tinte) → Fußbereich (tinte)
```

Drei `--tinte`-Blöcke ohne Trennung dazwischen. Es gibt keine Grenze — es ist eine einzige dunkelblaue Fläche über die letzten 40 % der Seite, in der drei völlig verschiedene Inhalte liegen. Der Besucher kann nicht erkennen, wo der Inhalt aufhört und die Fußzeile anfängt.

**Fix A (schnell):** Wenn der letzte Inhaltsabschnitt einer Seite dunkel ist, mach ihn hell. Betrifft `ablauf.astro`, `ueber-mich.astro`, `faq.astro`.

**Fix B (sauber):** Trennkante zwischen aufeinanderfolgenden dunklen Bändern.

```css
.band--tinte + .band--tinte,
.band--tinte + .fuss {
  border-top: 1px solid color-mix(in srgb, var(--auf-tinte) 18%, transparent);
}
```

Fix B kostet 4 Zeilen und löst alle sechs Seiten auf einmal.

## 2.7 Das 5er-Raster hat auf dem Desktop ein Loch

```css
@media (min-width: 60em) { .kacheln--5 { grid-template-columns: repeat(3, 1fr); } }
```

Fünf Branchen in drei Spalten: 3 oben, 2 unten, rechts unten ein leeres Feld. Das sieht nach Fehler aus, nicht nach Absicht.

Der Fix ist gleichzeitig ein Konversionsgewinn: eine sechste Kachel.

```astro
<li class="kachel kachel--offen">
  <h3>Deine Branche fehlt?</h3>
  <p>Werkstatt, Praxis, Fahrschule, Metzgerei, Fotograf, Steuerbüro.
     Ich baue für jeden Betrieb, hinter dem ein Mensch steht.</p>
  <a class="kachel__mehr" href="/kontakt">Sag mir, was du machst</a>
</li>
```

Das füllt das Raster, fängt genau den Besucher ab, der sonst weggeht („meins ist ja nicht dabei"), und macht den `.zuschnitt`-Block darunter kürzbar (siehe 4.4). Optisch abgesetzt durch eine gestrichelte Kante:

```css
.kachel--offen { border-style: dashed; background: transparent; }
```

## 2.8 Der Preis auf der Startseite ist zu klein

| Ort | Größe des Betrags |
|---|---|
| `/preise` → `.paket__preis` | `--gr-h2` = bis 38px |
| `/` → `.preis__betrag` | `--gr-h3` = bis 24px |

Auf der Seite, die am häufigsten aufgerufen wird, ist der Preis 14px kleiner als auf der Seite, die man erst erreicht, wenn man schon interessiert ist. Umgekehrt wäre richtig. Die Startseiten-Preisliste ist außerdem der beste Kandidat für „ein Element pro Seite ist doppelt so groß wie alles andere" (siehe 0.5).

## 2.9 `theme-color` passt nicht zur Seite

```html
<meta name="theme-color" content="#0a1a30">
```

Die Adressleiste auf iOS/Android wird dunkelblau, die Seitenoberkante ist hellgrau. Auf jedem Handy-Aufruf sieht man einen dunklen Streifen, der nirgends dazugehört. Setz ihn auf `--papier`, das ist die Farbe, die oben tatsächlich steht.

## 2.10 `color-scheme` fehlt

Ohne `color-scheme: light` auf `:root` rendern Chrome und Safari native Bedienelemente im Dunkelmodus, wenn das Gerät auf Dunkel steht. Auf `/kontakt` heißt das: zwei dunkle Auswahllisten in einem hellen Formular, plus dunkle Scrollbalken. PROJEKT.md verbietet ein umschaltbares Farbschema — genau deshalb muss das hier festgenagelt werden.

```css
:root { color-scheme: light; }
```

Eine Zeile.

## 2.11 Besuchte Links sehen aus wie unbesuchte

`a { color: var(--stahl) }` gilt auch für `:visited`. Bei 28 Seiten, 14 Kacheln auf der Startseite und drei Übersichtsseiten mit Karten nimmst du dem Besucher damit die wichtigste Orientierungshilfe: „Da war ich schon."

```css
.kachel__mehr:visited,
.reihe a:visited,
.branchenreihe a:visited { color: color-mix(in srgb, var(--stahl) 65%, var(--tinte)); }
```

## 2.12 Der Rahmen des Zurück-Pfeils

`.zurueck { border-right: var(--linie) }` — wieder `--eisblau` bei 1,24:1. Die Trennung zwischen Zurück-Pfeil und Logo ist nicht sichtbar, also lesen sich beide als ein Element.

## 2.13 Fehlende Zustände

Kein `:active`-Zustand auf `.knopf`. Auf dem Handy gibt es kein `:hover` — das heißt, ein Tipp auf einen Knopf erzeugt keinerlei visuelle Rückmeldung. Auf einer Seite, deren Zielgruppe zu 90 % mobil ist, ist das die auffälligste Lücke bei den Zuständen.

```css
  .knopf:active { transform: translateY(1px); }
  @media (hover: none) { .knopf:active { background: var(--tinte); border-color: var(--tinte); } }
```

Kein `:disabled`-Zustand auf `.knopf` (wird noch nicht gebraucht, aber der Absende-Knopf sollte einen bekommen).

Kein Ladezustand beim Absenden. Bei langsamer Verbindung tippt der Besucher zweimal.

---

# Teil 3 — Typografie

## 3.1 Der Vorspann ist auf dem Handy nicht vom Fließtext unterscheidbar

```css
.vorspann { font-size: var(--gr-text); }          /* = 17px, identisch zu <p> */
@media (min-width: 40em) { .vorspann { font-size: var(--gr-gross); } }
```

Unter 640px ist `.vorspann` exakt so groß wie normaler Fließtext, nur die Zeilenhöhe unterscheidet sich (1,6 statt 1,65). Das ist visuell nichts. Die Einleitung — das Element, das auf jeder der 28 Seiten die Zusammenfassung trägt — hat auf dem Gerät, auf dem sie am meisten gelesen wird, keine Hierarchie.

Der Kommentar im Code begründet das mit Textwand-Vermeidung. Der Zweck ist richtig, das Mittel ist falsch: Größe wegnehmen macht den Vorspann nicht kürzer, es macht ihn unsichtbar. Kürze ist bereits durch `check-vorspann.mjs` erzwungen (max. zwei Sätze).

```css
.vorspann {
  font-size: 1.1875rem;   /* 19px, nicht 17 */
  line-height: 1.55;
  color: color-mix(in srgb, var(--tinte) 88%, var(--papier));
  max-width: 34rem;       /* eigener, kürzerer Textmaß */
}
```

## 3.2 17px Fließtext ist für diese Zielgruppe an der Untergrenze

`--gr-text: 1.0625rem` = 17px. Deine Leser sind Gastronomen, Handwerker, Salonbetreiber — im Schnitt eher 40–60 als 25. Auf 18px (`1.125rem`) zu gehen kostet nichts und ist auf einem Handy in der Küche oder in der Werkstatt spürbar.

## 3.3 14px Grau ist der schwächste Punkt der ganzen Typografie

`--gr-klein: 0.875rem` = 14px, kombiniert mit `.leise` (grau) trägt:

- die Telefonnummer unter der Hero-Überschrift (!)
- alle Brotkrumen
- alle Feldhinweise im Formular
- die Umsatzsteuer-Angabe
- `.paket__pflege` — den monatlichen Betrag
- `.halt__dauer` — „20 Minuten", „24 bis 72 Stunden"
- den Fußbereich

Der Kontrast reicht (6,04:1, sauber AA). Die Größe ist das Problem. Insbesondere:

`.halt__dauer` trägt „24 bis 72 Stunden" — das ist dein stärkstes Verkaufsargument, und es steht in 14px Grau über der Überschrift, in der Rolle einer Bildunterschrift.

Vorschlag: `--gr-klein` auf `0.9375rem` (15px), und `.halt__dauer` aus `--gr-klein` herausnehmen.

## 3.4 Die Zeilenlänge reißt an mehreren Stellen aus

`--breite-text: 38rem` = 608px, bei 17px ≈ 75 Zeichen. Gut. Aber `max-width: none` wird an vielen Stellen gesetzt und dann greift die Breite des Elternelements:

| Element | Breite | Zeichen/Zeile |
|---|---|---|
| `.zuschnitt p` | 46rem − Innenabstand ≈ 640px | ~85 |
| `p.offen` (auf `/branchen`) | 44rem = 704px | ~92 |
| `.kachel p` | Spaltenbreite, ok | ~50 |

92 Zeichen ist deutlich über der Grenze, an der das Auge die nächste Zeile zuverlässig findet. Beide Blöcke sind reiner Fließtext, also gilt die Regel voll. Setz sie auf `max-width: var(--breite-text)`.

## 3.5 Bricolage Grotesque wird nicht ausgereizt

Bricolage ist eine variable Schrift mit Achsen für Gewicht, Breite und optische Größe. Genutzt wird genau ein Gewicht: 600. Für alles — h1 bis h4, Preisbeträge, Nummernkreise, Logo.

Damit zahlst du 40 KB für eine Schrift und benutzt sie wie eine statische. Zwei Möglichkeiten, wie du daraus Hierarchie gewinnst, ohne eine einzige neue Datei zu laden:

```css
h1 { font-weight: 700; }               /* die h1 darf schwerer sein als h2 */
.paket__preis,
.preis__betrag { font-weight: 700; }   /* Zahlen tragen Gewicht */
.halt__marke   { font-weight: 500; }   /* Nummernkreise dürfen leichter sein */
```

Und: `letter-spacing: -0.02em` gilt für alle Überschriften gleich. Enges Tracking hilft bei 56px, bei einer 20px-h3 macht es den Text nur enger. Staffeln:

```css
h1 { letter-spacing: -0.03em; }
h2 { letter-spacing: -0.02em; }
h3 { letter-spacing: -0.01em; }
```

## 3.6 Die Fußbereich-Spaltentitel sind h2

```astro
<h2 class="fuss__titel">{spalte.titel}</h2>
```

Vier `<h2>` mit den Texten „Leistungen", „Branchen", „Mehr", „Rechtliches" — auf jeder der 28 Seiten. Beim Navigieren per Überschrift (Screenreader) hört man auf der Startseite u.a. „Leistungen" zweimal, weil der Inhaltsabschnitt „Was ich mache" heißt und die Fußspalte „Leistungen".

Fußzeilen-Spaltentitel sind keine Dokumentgliederung. Als `<p>` oder `<h2 class="nur-vorlesen">Fußnavigation</h2>` + `<p>` je Spalte auszeichnen.

---

# Teil 4 — Text, Aufbau, Psychologie

## 4.1 Die Telefonnummer ist das schwächste Element im Hero — und dein bester Kanal

Die Startseite:

```
h1  (34px, fett)                     „Du machst gute Arbeit…"
p.vorspann (17px)                    „Ich bin Tom Germeshausen…"
Knopf gefüllt                        „Preise ansehen"
Knopf Umriss                         „Anfrage schicken"
p.leise (14px grau)                  „Oder ruf einfach an: 0157 …"
```

Gleichzeitig steht auf `/kontakt`: „Am schnellsten geht es am Telefon". Und in der FAQ: „Ja. Meine Nummer steht auf jeder Seite."

Der Kanal, den du selbst als schnellsten bezeichnest, ist im Hero das kleinste, grauste, letzte Element. Für einen 55-jährigen Handwerksbetrieb ist der Anruf nicht die dritte Option, sondern die einzige, die er ohne Überwindung nutzt.

Fix: Die Nummer wird ein dritter Knopf oder wenigstens Fließtextgröße mit Telefon-Piktogramm. Nicht `.leise`.

## 4.2 Es gibt keinen Weg zum Anruf zwischen Bildschirm 1 und Bildschirm 11

Die Startseite ist 11,6 Bildschirme hoch (deine eigene Messung, VELLOX-REGELN.md). Auf Bildschirm 1 stehen Knöpfe. Danach kommt bis zum Kontaktabschluss auf Bildschirm 11 kein einziger Handlungsaufruf — kein Anruf-Knopf, kein Anfrage-Knopf.

Zehn Bildschirme lang liest jemand, warum seine aktuelle Seite kaputt ist, wird überzeugt, und findet dann nichts zum Drücken.

Vorschlag — eine feste Leiste am unteren Rand, nur auf dem Handy:

```astro
<!-- am Ende von Basis.astro, vor </body> -->
<div class="daumenleiste">
  <a class="knopf" href={`tel:${brand.telefonE164}`}>Anrufen</a>
  <a class="knopf knopf--rand" href="/kontakt">Anfrage schicken</a>
</div>
```

```css
.daumenleiste {
  position: fixed; inset: auto 0 0 0; z-index: 50;
  display: flex; gap: var(--raum-2);
  padding: var(--raum-2) var(--seitenrand);
  padding-bottom: calc(var(--raum-2) + env(safe-area-inset-bottom));
  background: var(--papier);
  border-top: 2px solid var(--kante);
}
.daumenleiste .knopf { flex: 1; }
body { padding-bottom: 5.5rem; }              /* Platz schaffen */
@media (min-width: 60em) {
  .daumenleiste { display: none; }
  body { padding-bottom: 0; }
}
```

Das ist kein Chat-Widget, kein Popup und kein Newsletter-Overlay — alle drei sind in PROJEKT.md verboten, eine Aktionsleiste ist es nicht. Sie verdeckt nichts, sie unterbricht nicht, sie ist auf jeder Seite gleich. Von allen Vorschlägen in diesem Dokument hat dieser das beste Verhältnis von Aufwand zu Wirkung.

## 4.3 Das beste Stück Inhalt auf der ganzen Seite ist zwei Klicks tief vergraben

Auf `/probleme/preise-im-pdf` steht:

> **Der Fingertest**
> Öffne deine Karte auf dem Handy. Kannst du ein einzelnes Wort mit dem Finger markieren? Wenn nicht, ist es ein Bild.

Und auf `/probleme/oeffnungszeiten-versteckt`:

> **Die Zehn-Sekunden-Probe**
> Nimm dein Handy, öffne deine Seite und zähle die Sekunden, bis du die heutigen Öffnungszeiten siehst. Über zehn ist zu lang.

Das ist Selbstüberzeugung. Der Besucher stellt die Diagnose selbst, an seinem eigenen Betrieb, in zehn Sekunden, ohne dass du etwas behaupten musst. Das ist psychologisch um Größenordnungen stärker als jedes Argument, weil es kein Argument ist — es ist ein Befund, den er selbst erhebt.

Und es steht hinter einem Link, der „Mehr erfahren" heißt.

Hol einen davon auf die Startseite. Der Fingertest ist der beste, weil er in einem Satz funktioniert und jeder Gastronom eine Speisekarte hat. Als eigener, dunkler, schmaler Abschnitt direkt nach den drei Problemkacheln:

```astro
<section class="abschnitt band--tinte">
  <div class="breite">
    <h2>Der Fingertest, jetzt gleich, dauert zehn Sekunden</h2>
    <p class="vorspann">
      Öffne deine Speisekarte oder deine Preisliste auf dem Handy. Versuch,
      ein einzelnes Wort mit dem Finger zu markieren.
    </p>
    <p class="fazit">
      Geht nicht? Dann ist es ein Bild. Google liest es nicht, und dein
      Gast muss hineinzoomen.
    </p>
    <p><a class="knopf" href="/probleme/preise-im-pdf">Was das konkret kostet</a></p>
  </div>
</section>
```

## 4.4 Dieselbe Positionierung steht vier Mal fast wörtlich da

Gemessen im gebauten HTML:

| Satzbaustein | Seiten |
|---|---|
| „…jemand, der selbst ans Telefon geht" | 3 |
| „…da bin ich der Falsche" | 3 |
| „Werkstatt, Praxis, Fahrschule, Metzgerei, Fotograf, Steuerbüro" | 2 |
| „Ich baue für jede Branche" | 2 |
| „Ich arbeite allein" | 4 |
| „Stichpunkte reichen" | 4 |

Auf `/` steht der `.zuschnitt`-Block. Auf `/branchen` steht `p.offen` und ein ganzer Abschnitt „Deine Branche steht nicht dabei" — beide sagen dasselbe. Auf `/ueber-mich` steht es unter „Was ich nicht mache". In `/faq` steht es unter „Baust du auch für meine Branche?".

Wer zwei deiner Seiten hintereinander liest — und das tut jeder, der ernsthaft überlegt — liest denselben Absatz vier Mal. Das wirkt nicht konsequent, sondern nach Textbaustein. Und es entwertet die stärkste Zeile, die du hast: „Ein Standort, ein Inhaber, jemand, der selbst ans Telefon geht." Dieser eine Satz macht mehr Positionierungsarbeit als der Rest der Seite. Er sollte einmal stehen, groß, an der richtigen Stelle.

Vorschlag:

- Auf `/` bleibt er, gekürzt auf die eine große Zeile plus einen Satz (ersetzt den ganzen `.zuschnitt`-Block).
- Auf `/branchen` verschwindet `p.offen` komplett — die neue sechste Kachel (2.7) macht die Arbeit.
- Auf `/branchen` bleibt genau einer der beiden „deine Branche fehlt"-Abschnitte, nicht zwei.
- `/ueber-mich` und `/faq` bleiben, dort ist es eine Antwort, keine Wiederholung.

## 4.5 Die Website organisiert nach Branchen und entschuldigt sich dreimal dafür

Navigationspunkt „Branchen" → Startseiten-Abschnitt „Für wen ich baue" → direkt darunter „Ich baue für jede Branche. Diese fünf kenne ich nur am besten."

Du sortierst nach Branchen und sagst im selben Atemzug, dass die Sortierung nicht gilt. Das ist ein echter Zielkonflikt, kein Textproblem: Die Branchenseiten sind SEO-Landeplätze, die Botschaft ist „Größe zählt, nicht Gewerbe".

Sauberer wäre, den Abschnitt danach zu benennen, was er wirklich tut:

> h2: **Fünf Branchen, die ich am besten kenne**
> Vorspann: Diese fünf fragen am häufigsten an, deshalb haben sie eine eigene Seite. Gebaut wird für jeden Einzelbetrieb.

Damit ist die Einschränkung Teil der Überschrift statt eine Korrektur danach — und die Entschuldigung darunter kann weg.

## 4.6 Das Formular verlangt sechs Pflichtangaben, die Seite verspricht „zwei Sätze"

Auf jeder Seite steht im Kontaktabschluss:

> „Erzähl mir von deinem Betrieb. Zwei Sätze reichen für den Anfang."

Auf `/kontakt` steht bei der Formularkarte: „Dauert zwei Minuten."

Das tatsächliche Formular:

| Feld | Pflicht |
|---|---|
| Name | ✔ |
| Name des Betriebs | ✔ |
| E-Mail | ✔ |
| Telefon | — |
| Was für ein Betrieb (Auswahl) | ✔ |
| Wie sieht es gerade aus (Auswahl) | ✔ |
| Worum geht es (Textfeld) | ✔ |
| Datenschutz-Haken | ✔ |

Sieben Pflichtangaben. Das ist kein „zwei Sätze", das ist ein Aufnahmebogen. Und zwei der Pflichtfelder — Branche und Stand — dienen ausschließlich deiner Vorbereitung, nicht dem Anliegen des Besuchers. Das ist genau der Tausch, bei dem die meisten Formulare Anfragen verlieren: Der Interessent zahlt Aufwand für einen Nutzen, den jemand anders hat.

Dazu kommt: E-Mail ist Pflicht, Telefon nicht. Ein Teil deiner Zielgruppe möchte angerufen und nicht angeschrieben werden. Für die ist das Formular eine Sackgasse.

Zwei Wege, beide vertretbar:

**A — Formular kürzen (empfohlen).** Pflicht: Name, Nachricht, Datenschutz, und mindestens eine Kontaktmöglichkeit. Branche und Stand als freiwillig markieren:

```astro
<label for="feld-branche">Was für ein Betrieb? <span class="leise">(freiwillig)</span></label>
<select id="feld-branche" name={feldNamen.branche}>
```

**B — Versprechen anpassen.** Wenn du die Angaben wirklich brauchst, ändere den Kontaktabschluss von „Zwei Sätze reichen" auf etwas, das zum Formular passt. Aber A ist besser: Du kannst alles Fehlende im Telefonat fragen, und du willst das Telefonat sowieso.

## 4.7 `/danke` ist der wichtigste ungenutzte Moment der ganzen Seite

Die Sekunde nach dem Absenden ist der Punkt höchster Unsicherheit: Ist das angekommen? Wann meldet der sich? Habe ich gerade etwas Verbindliches getan?

Aktuell:

> „Deine Anfrage liegt bei mir im Postfach. Ich schaue sie mir an und melde mich bei dir."

Keine Zeitangabe. WAS-NOCH-FEHLT.md notiert das korrekt unter Punkt 3 („Antwortzeit — ich habe keine erfunden"). Richtig, dass du sie nicht erfunden hast. Aber die Lücke kostet konkret: Ohne Zeitangabe fragt der Besucher parallel bei zwei anderen an.

Das ist eine Geschäftsentscheidung, keine Textentscheidung, und sie dauert 30 Sekunden. Wenn du allein arbeitest und die Anfragen einstellig sind, ist „noch am selben Werktag" realistisch und leicht zu halten. Schreib eine Zahl hin, die du sicher schaffst — lieber „innerhalb von zwei Werktagen" und immer nach vier Stunden antworten, als umgekehrt.

Zweiter Punkt: Die Seite bietet als nächsten Schritt drei Links an (Ablauf, Referenzen, FAQ). Alle drei führen zurück ins Lesen. Der bessere nächste Schritt nach einer abgeschickten Anfrage ist Vorbereitung: „Wenn du die vier Sachen schon zusammensuchst, kann ich sofort loslegen" mit der Liste aus `ablauf.ts` Schritt 3. Das nutzt die Wartezeit und beschleunigt dein Projekt.

## 4.8 „ab" kollidiert mit „Preise, die vorher feststehen"

Die Überschrift verspricht Festpreise. Direkt darunter stehen drei Zahlen, denen ein „ab" vorangestellt ist. Der Besucher liest zuerst „ab", nicht den Erklärsatz darüber. Das ist der psychologische Moment, in dem Vertrauen entsteht oder nicht — und aktuell entsteht dort ein kleiner Widerspruch.

Die Erklärung existiert bereits im Vorspann und in der FAQ. Sie muss nur an die Zahl heran:

```astro
<p class="leise">
  „ab" heißt: Der Preis hängt allein an der Seitenzahl. Wie viele du brauchst,
  klickst du dir auf der Preisseite in einer Minute zusammen. Dann steht dein Betrag,
  und der ändert sich nicht mehr.
</p>
```

Und `.preis__ab` sollte optisch klein und leicht sein, damit die Zahl das Element trägt — auf `/preise` ist das schon so gelöst (`.paket__ab { font-size: var(--gr-text); font-weight: 400; }`), auf der Startseite nicht.

## 4.9 Das hervorgehobene Paket ist auf der Startseite nicht als solches erkennbar

Auf `/preise` bekommt Standard: 3px Rahmen in `--stahl` plus die Zeile „Für die meisten Betriebe richtig".

Auf `/` bekommt Standard: einen 4px linken Rand. Ohne Beschriftung.

Der Besucher sieht einen farbigen Strich und weiß nicht, was er bedeutet. Entweder die Beschriftung übernehmen oder die Hervorhebung weglassen. Ein bedeutungsloser Akzent ist schlechter als keiner.

## 4.10 Die Reihenfolge Start → Standard → Komplett ankert nach unten

Der erste Betrag, den das Auge trifft, ist 449 €. Preisanker-Forschung sagt: Die erste gesehene Zahl bestimmt, wogegen alle anderen bewertet werden. 849 € wirkt nach 449 € teuer; nach 1.249 € wirkt es günstig.

Das spricht nicht automatisch für Umdrehen — bei einer preissensiblen Zielgruppe kann die niedrigste Zahl zuerst die Einstiegshürde senken, und dein `nichtEnthalten`-Knick bei Start ist ausdrücklich dafür gebaut, von unten nach oben zu ziehen. Das funktioniert.

Was du aber tun solltest: das mittlere Paket optisch dominant machen, nicht nur markiert. Auf `/preise` auf dem Desktop drei gleich große Karten nebeneinander — Standard darf höher sein, mehr Innenabstand haben, aus der Reihe stehen. Aktuell unterscheidet es sich um 1px Rahmenstärke.

## 4.11 Der Beweis-Abschnitt („Beispiele") ist der schwächste Abschnitt der Startseite

Er kommt an vorletzter Stelle, besteht aus drei Karten mit den Überschriften „PLATZHALTER Restaurantname" (siehe 1.1), zeigt kein Bild, und darüber steht ein 40-Wörter-Absatz, der erklärt, dass es keine echten Kunden gibt.

Die Ehrlichkeit ist genau richtig und muss bleiben. Aber die Reihenfolge ist falsch: Aktuell liest der Besucher zuerst die Entschuldigung, dann die Arbeit. Dreh es um — zuerst die Arbeit zeigen, dann sagen, was sie ist:

```
h2   Drei Betriebe, drei durchgeplante Websites
     [Karten mit Kennzeichnung „Konzeptprojekt"]
p    Keine davon hat einen Auftraggeber. Ich baue seit Kurzem für Betriebe in
     der Region, und ich zeige dir lieber, wie ich eine Aufgabe angehe, als
     eine Kundenliste, die es nicht gibt.
```

Der Hinweis bleibt vollständig, die Kennzeichnung auf jeder Karte bleibt, § 5 UWG bleibt erfüllt — aber der Besucher sieht zuerst Substanz.

## 4.12 Was als Ersatz für fehlende Referenzen wirklich funktioniert

Du hast keine Kundenstimmen und darfst keine erfinden. Was du stattdessen hast und nicht nutzt:

- **Diese Website selbst.** Sie ist von dir gebaut, sie lädt ohne Cookie-Banner, sie hat keine fremden Schriften, keine Trackingskripte, sie ist tastaturbedienbar. Das ist beweisbar und überprüfbar. Ein Abschnitt auf `/ueber-mich`: „Diese Seite hier ist von mir. Öffne sie im Flugmodus über Mobilfunk und zähl mit."
- **Prüfbare Zusagen statt Behauptungen.** „Keine Cookies" ist prüfbar (F12 → Anwendung → Cookies: leer). „Schriften liegen auf meinem Server" ist prüfbar. „Der angezeigte Preis ist der Preis" ist eine Zusage, an der du messbar bist. Diese Art von Beweis ist stärker als jedes Testimonial, weil sie nicht auf Vertrauen angewiesen ist.
- **Die Selbstproben** (siehe 4.3).
- **Das Foto.** Ein echtes Gesicht ersetzt keine Referenz, aber es ist bei Einzelunternehmern der stärkste einzelne Vertrauensfaktor überhaupt. Aktuell hat die Seite keins.

## 4.13 Kleinere Textbefunde

- „Für Handwerk ansehen" (Startseite, Branchenkachel) — die anderen vier heißen „Für Restaurants / Bars / Kosmetikstudios / Hundefriseure ansehen", also Personen. „Handwerk" ist ein Fach. Sprachlich schief. `name: "Handwerk"` → für den Kachel-Link einzahl benutzen oder ein eigenes Feld `linkText: "Für Handwerksbetriebe ansehen"`.
- `/branchen/handwerk` → Überschrift „Hier fehlt noch ein Beispiel" steht sichtbar als h2 auf einer Kundenseite. Das ist eine interne Notiz im Frontend. Ersetzen durch etwas, das für den Leser einen Sinn ergibt: „Der Aufbau ist bei jedem Gewerk derselbe".
- `/faq` h1-Vorspann: „20 Fragen…" — davon sind 7 mit PLATZHALTER beantwortet. Die Zahl wirbt gerade für die Lücke.
- `/danke` h1 „Angekommen." — gut. Kurz, konkret, in deiner Stimme. Nichts ändern.
- `hinweisKonzeptprojekte` ist 40 Wörter lang und steht auf `/` und auf `/arbeiten`. Auf der Startseite reicht ein Satz.
- `.fazit` auf der Startseite („Wer eines davon erlebt, sucht weiter…") ist der beste Satz des Abschnitts und steht in `--gr-gross` fett — richtig gemacht. Dieses Muster („ein hervorgehobener Schlusssatz je Abschnitt") gibt es genau einmal auf der ganzen Seite. Zwei bis drei weitere Abschnitte würden davon profitieren.
- Verpasste Chance beim Fahrplan: Schritt 2 heißt „Liegt bei dir" und ist gestrichelt dargestellt — eine der besten Designentscheidungen auf der Seite, weil sie eine Wahrheit visuell codiert (die Verzögerung liegt nicht bei dir). Genau davon gibt es zu wenig.

---

# Teil 5 — Interaktion und Technik

## 5.1 Layout-Sprung im Kopfbereich auf jedem Handy-Aufruf — der gravierendste technische Befund

`Kopfbereich.astro` liefert die Navigation ausgeklappt aus und klappt sie erst per JavaScript ein:

```astro
<button class="kopf__menue" … hidden>Menü</button>
<div class="kopf__navigation" id="hauptmenue">   <!-- kein data-eingeklappt -->
```

```js
knopf.hidden = false;
menue.setAttribute("data-eingeklappt", "");
```

Astro kompiliert das zu `<script type="module">` — und Modul-Skripte laufen nach dem Parsen des Dokuments. Das heißt: Erst wird die volle Liste gerendert (5 Punkte untereinander + Kontakt-Knopf ≈ 340 px), dann klappt sie zu, dann springt die gesamte Seite um 340 px nach oben.

Das ist ein CLS-Wert im Bereich 0,4 — das Vierfache des Grenzwerts. PROJEKT.md fordert „Kein Layout-Shift" und „Lighthouse über 95 in allen vier Kategorien". Beides ist damit nicht erreichbar, und in WAS-NOCH-FEHLT.md steht korrekterweise, dass Lighthouse nie ausgeführt wurde.

Fix — CSS entscheidet, JavaScript korrigiert nur:

```astro
<!-- Knopf NICHT mehr hidden -->
<button class="kopf__menue" type="button" aria-expanded="false" aria-controls="hauptmenue">
  Menü
</button>
```

```css
@media (max-width: 59.999em) {
  .kopf__navigation { display: none; }
  .kopf__navigation[data-offen] { display: flex; }
}
@media (min-width: 60em) {
  .kopf__menue { display: none; }
}
```

```astro
<!-- in <head> von Basis.astro -->
<noscript><style>
  .kopf__menue { display: none !important; }
  @media (max-width: 59.999em) { .kopf__navigation { display: flex !important; } }
</style></noscript>
```

Und im Skript `data-eingeklappt` durch `data-offen` ersetzen (umgekehrte Logik). Ergebnis: Mit JavaScript ist die Navigation vom ersten Bildpunkt an zu, ohne JavaScript ist sie offen und der Knopf weg. Null Sprung in beiden Fällen.

## 5.2 Der Konfigurator gibt auf dem Handy keine Rückmeldung

```css
@media (min-width: 60em) {
  .konf__ergebnis { position: sticky; top: var(--raum-3); }
}
```

Nur ab 960px. Darunter steht die Summe als normaler Block unter allen Auswahlfeldern. Der Ablauf auf dem Handy:

1. Besucher hakt „Bilder" an → Preis ändert sich, außerhalb des sichtbaren Bereichs
2. Besucher hakt „Team" an → Preis ändert sich, außerhalb des sichtbaren Bereichs
3. Besucher hakt die 5. Seite an → Paket springt automatisch von Start (449 €) auf Standard (849 €), ein Erklärkasten erscheint — alles außerhalb des sichtbaren Bereichs
4. Besucher scrollt runter und findet plötzlich 849 € vor, wo eben 449 € stand

Der automatische Paketwechsel ist die klügste Funktion der ganzen Seite. Auf dem Gerät, auf dem die meisten Besucher sind, ist er unsichtbar — und wenn er dann doch gesehen wird, wirkt er wie ein Trick.

Fix — schmale Ergebnisleiste, die auf dem Handy oben klebt:

```css
@media (max-width: 59.999em) {
  .konf__ergebnis {
    position: sticky;
    top: 0;
    z-index: 20;
    order: -1;                      /* über die Auswahl schieben */
    margin-bottom: var(--raum-4);
  }
  .konf__spalten { display: flex; flex-direction: column; }
  /* Nur das Nötigste zeigen, damit die Leiste flach bleibt */
  .konf__ergebnis .summe__zeile:not(.summe__zeile--pflege) { display: none; }
  .konf__ergebnis .summe__hinweis { display: none; }
}
```

Alternativ als feste Leiste am unteren Rand mit „Standard · 6 Seiten · 849 €". Wichtig ist nur: Die Zahl muss im Blick bleiben, während die Kästchen angehakt werden. Sonst ist der Konfigurator ein Formular und kein Werkzeug.

## 5.3 Der Konfigurator-Knopf führt an den Seitenanfang von `/kontakt`

```astro
<form class="konf" id="konfigurator" action="/kontakt" method="GET">
```

Nach „Unverbindlich anfragen" landet der Besucher oben auf `/kontakt` — vor Überschrift, Vorspann und drei Kontaktkarten. Bis zum Formular sind es rund zwei Bildschirme. In genau dem Moment, in dem die Absicht am höchsten ist, wird gescrollt.

```diff
- <form class="konf" id="konfigurator" action="/kontakt" method="GET">
+ <form class="konf" id="konfigurator" action="/kontakt#formular" method="GET">
```

Der Fragmentbezeichner bleibt bei GET-Formularen erhalten (die Abfragezeichenfolge wird ersetzt, das Fragment nicht). Eine Zeile, spart zwei Bildschirme.

## 5.4 Neun mehrdeutige Linktexte auf der Startseite

```
3× „Mehr erfahren"    → 3 verschiedene Ziele
3× „Mehr dazu"        → 3 verschiedene Ziele
3× „Projekt ansehen"  → 3 verschiedene Ziele
```

Dasselbe auf `/probleme` (3×) und `/arbeiten` (3×).

Zwei Probleme auf einmal:

- **Barrierefreiheit:** Screenreader bieten eine Linkliste an. Dort steht neunmal dasselbe. WCAG 2.4.4 (Link Purpose in Context) ist grenzwertig erfüllt, weil der Kontext im Listenelement steht — aber die Linkliste ist unbrauchbar.
- **Optik:** Neun identische unterstrichene Textzeilen untereinander in vier Rastern. Das verstärkt genau die Kachelmonotonie aus 0.4.

Fix — Kontext für Vorleseprogramme, unverändert für das Auge:

```astro
<a class="kachel__mehr" href={`/probleme/${p.slug}`}>
  Mehr erfahren<span class="nur-vorlesen"> über: {p.titel}</span>
</a>
```

Noch besser für die Optik: jede Kachel bekommt ihren eigenen Link-Text. Die Branchenkacheln machen das bereits vor („Für Restaurants ansehen") und wirken dadurch spürbar weniger schablonenhaft als die drei Problem-Kacheln direkt darüber.

## 5.5 Die ganze Kachel ist klickbar — das kostet Textmarkierung

```css
.kachel__mehr::before { content: ""; position: absolute; inset: 0; }
```

Das Überlagerungsrechteck liegt über dem gesamten Karteninhalt. Nebenwirkung: Der Text in der Kachel lässt sich mit der Maus nicht markieren. Wer eine Zeile kopieren will, zieht stattdessen den Link.

Kein Fehler, aber eine bewusste Abwägung, die du kennen solltest. Falls du Markierbarkeit willst:

```css
.kachel__mehr::before { pointer-events: auto; }
.kachel > :where(h3, p) { position: relative; z-index: 1; }
```

Dann sind Überschrift und Text markierbar, der Rest der Karte bleibt klickbar.

## 5.6 Keine sichtbare Fehlerdarstellung im Formular

Sieben Pflichtfelder, keine einzige CSS-Regel für `:invalid` oder `:user-invalid`. Wer auf „Anfrage schicken" drückt, sieht eine native Sprechblase am ersten leeren Feld — und sonst nichts. Bei sechs Feldern über zwei Spalten ist unklar, welche noch fehlen.

```css
input:user-invalid,
select:user-invalid,
textarea:user-invalid {
  border-color: #A03030;
  background: color-mix(in srgb, #A03030 5%, var(--karte));
}
input:user-valid, select:user-valid, textarea:user-valid {
  border-color: color-mix(in srgb, var(--stahl) 55%, var(--kante));
}
```

`:user-invalid` färbt erst nach der ersten Eingabe bzw. dem ersten Absendeversuch — im Gegensatz zu `:invalid`, das ein leeres Pflichtfeld sofort rot macht. Wichtiger Unterschied.

Und: `#A03030` muss dann in `:root` als `--fehler` stehen, sonst bricht die Farbdisziplin.

## 5.7 `aria-live` auf dem ganzen Summenblock ist zu laut

```astro
<div class="summe" aria-live="polite">
```

Bei jedem Kästchen wird der komplette Block neu vorgelesen: „Paket Standard, Seiten 6, Google-Einrichtung 219 €, Einmalig 1.068 €, Pflege 59 € im Monat, Kein Ausweis von Umsatzsteuer nach § 19 UStG, Unverbindlich anfragen, Deine Auswahl wird ins Formular übernommen. Kostet nichts und verpflichtet zu nichts."

Nach dem dritten Kästchen schaltet jeder Nutzer ab. Besser: eine dedizierte Statuszeile, die nur die Änderung meldet.

```astro
<div class="summe">                                  <!-- kein aria-live -->
  …
  <p class="nur-vorlesen" role="status" data-feld="ansage"></p>
</div>
```

```js
feld("ansage").textContent =
  `${r.paket.name}, ${r.seitenAnzahl} Seiten, ${euro(r.gesamt)} einmalig`;
```

## 5.8 Die Abschnittsüberschriften im Konfigurator sind keine Überschriften

```astro
<legend class="block__titel">1. Welche Seiten brauchst du?</legend>
```

`<legend>` ist für Fieldsets semantisch korrekt — aber es taucht nicht in der Überschriftennavigation auf. Ein Screenreader-Nutzer, der sich mit H durch `/preise` bewegt, findet die drei Konfigurator-Schritte nicht.

```astro
<legend class="block__titel"><h3>1. Welche Seiten brauchst du?</h3></legend>
```

(h3 in legend ist zulässig; alternativ `role="heading" aria-level="3"` am legend.)

## 5.9 Der WhatsApp-Link verlässt die Seite

```astro
<a class="knopf knopf--rand" href={`https://wa.me/…`} rel="noopener">
```

`rel="noopener"` ohne `target="_blank"` tut nichts. Auf dem Desktop öffnet sich WhatsApp Web im selben Tab — die Seite ist weg, und wer kein WhatsApp Web hat, landet auf einer QR-Code-Seite. Auf dem Handy funktioniert es.

```diff
- rel="noopener"
+ target="_blank" rel="noopener noreferrer"
```

Und ein Hinweis für Tastaturnutzer, dass ein neues Fenster aufgeht:

```astro
Über WhatsApp schreiben<span class="nur-vorlesen"> (öffnet WhatsApp)</span>
```

## 5.10 Das Logo springt beim Seitenwechsel

Auf der Startseite: `.kopf__links` enthält nur das Logo, ganz links.
Auf jeder Unterseite: `.kopf__links` enthält Zurück-Pfeil + Trennlinie + Logo.

Das Logo verschiebt sich dadurch beim ersten Klick von der Startseite weg um rund 90–130 px nach rechts. Ein Element, das auf jeder Seite an derselben Stelle stehen soll, tut es nicht.

Fix: Platz für den Pfeil auch auf der Startseite reservieren.

```css
.kopf__links { display: flex; align-items: center; gap: var(--raum-2); }
.kopf__links::before {
  content: "";
  flex: none;
  width: var(--zurueck-breite, 0);
}
```

Oder einfacher: den Pfeil auf der Startseite als `visibility: hidden` rendern statt gar nicht.

## 5.11 Fehlende Head-Angaben

Geprüft auf der Startseite:

| Angabe | Status | Auswirkung |
|---|---|---|
| `og:image` | fehlt | Jede geteilte Verknüpfung ist leer |
| `twitter:card` | fehlt | leere Vorschau bei X |
| `og:site_name` | fehlt | Quelle wird nicht benannt |
| `apple-touch-icon` | fehlt | graues Kästchen beim Homescreen-Ablegen |
| `color-scheme` | fehlt | siehe 2.10 |
| Web-App-Manifest | fehlt | unkritisch |

`og:image` ist der wichtigste. Deine Zielgruppe teilt Verknüpfungen über WhatsApp — Handwerker schicken sich gegenseitig Kontakte, Gastronomen fragen im Bekanntenkreis nach. Ohne `og:image` erscheint dort ein nackter grauer Kasten mit Text. Mit Bild erscheint eine Karte, die aussieht, als hätte sie jemand gebaut, der Websites baut.

Und das Bild kannst du zur Bauzeit erzeugen, so wie du schon das Favicon erzeugst — `scripts/make-favicon.mjs` ist die Vorlage. Ein 1200×630-SVG mit Zeichen, Wortmarke, einer Zeile Text auf `--tinte`, per `sharp` oder `resvg` zu PNG.

```html
<meta property="og:image" content={new URL("/teilbild.png", Astro.site).href} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content={`${brand.name}, Websites für kleine Betriebe`} />
<meta property="og:site_name" content={brand.name} />
<meta name="twitter:card" content="summary_large_image" />
```

## 5.12 Strukturierte Daten: die Anschrift fehlt und Google merkt es

```json
{"@type":"ProfessionalService","name":"Norvel","url":"…","telephone":"…",
 "areaServed":{"@type":"AdministrativeArea","name":"Rhein-Neckar-Kreis"}}
```

Der Kommentar in `Basis.astro` sagt richtig: Eine erfundene Adresse wäre schlimmer als keine. Aber ohne `address` ist `ProfessionalService` für Googles lokale Ergebnisse praktisch wertlos — das ist das Feld, an dem alles hängt.

Zwei Ergänzungen, die schon jetzt gehen und nichts erfinden:

```js
priceRange: "449 € – 1.249 €",
image: new URL("/teilbild.png", Astro.site).href,   // sobald 5.11 steht
```

Wenn die Anschrift kommt, gehören dazu `address` (PostalAddress), `geo` und `openingHoursSpecification`.

## 5.13 Kleinere technische Punkte

- Die Rückwärts-Erkennung nutzt `document.referrer`. Bei Referrer-Policy `strict-origin-when-cross-origin` (Standard) kommt der Referrer bei gleicher Herkunft an, das funktioniert. Bei `no-referrer` in den Browsereinstellungen fällt es sauber auf „eine Ebene höher" zurück. Sauber gelöst.
- `history.replaceState` bei jeder Änderung. Korrekt (kein Zumüllen des Verlaufs). ✓
- `scrollIntoView({behavior: "instant"})` ist gültig und wird unterstützt. ✓
- Honigtopf-Feld: `aria-hidden="true"` auf einem Container mit `<input>` wäre normalerweise ein Fehler — durch `tabindex="-1"` ist es hier vertretbar. Gut mitgedacht. ✓
- Schriften: 40,4 KB (Bricolage) + 26,2 KB (Public Sans) Latin, beide vorgeladen. `latin-ext` und `vietnamese` liegen im Build, werden für deutschen Text aber nie geladen. ✓
- CSS: 13 KB + 5,8 KB auf der Startseite. JS auf der Startseite: nur das eingebettete Kopfbereich-Skript. Das ist außergewöhnlich schlank. ✓
- Die Startseite hat 8 `<section>`. PROJEKT.md sagt „Pro Unterseite 4–6 Abschnitte". Die Regel gilt formal für Unterseiten, aber 8 Abschnitte bei 11,6 Bildschirmen ist der Grund, warum du beim Ergänzen an anderer Stelle kürzen musst. Die Vorschläge in 4.4 (Zuschnitt kürzen) und 2.7 (sechste Kachel statt Erklärabsatz) schaffen den Platz für 4.3.
- `.sprung` nutzt `position: absolute`. Funktioniert, weil sie oben steht. `fixed` wäre robuster, falls jemand mitten auf der Seite Tab drückt.
- `.uebernommen` auf `/kontakt` ist `hidden` und wird per JS eingeblendet — schiebt das Formular beim Laden nach unten. Kleiner Sprung, aber messbar. Da der Kasten nur bei vorhandenen URL-Parametern erscheint, wäre serverseitiges Rendern nicht möglich (statische Seite) — akzeptabel. Reserviere alternativ die Mindesthöhe.

---

# Teil 6 — Code-Hygiene

Wenig zu holen, das Projekt ist sehr sauber. Vier Punkte:

## 6.1 `.knopf--umriss` ist sechsmal identisch kopiert

Definiert in:

- `src/components/Kontaktabschluss.astro`
- `src/pages/faq.astro`
- `src/pages/impressum.astro`
- `src/pages/arbeiten/[slug].astro`
- `src/pages/leistungen/[slug].astro`
- `src/pages/branchen/[slug].astro`

Sechsmal derselbe Block:

```css
.band--tinte .knopf--umriss { background: transparent; border-color: var(--auf-tinte); color: var(--auf-tinte); }
.band--tinte .knopf--umriss:hover { background: var(--auf-tinte); border-color: var(--auf-tinte); color: var(--tinte); }
```

In einem Projekt, dessen ganze Existenzberechtigung „eine Zahl an einer Stelle ändern" ist, ist das der einzige echte Ausreißer. Gehört nach `global.css`, direkt unter `.knopf--rand`. Spart 30 Zeilen und verhindert, dass die Varianten auseinanderlaufen.

## 6.2 Zwei Namen für dieselbe Idee

`.knopf--rand` (8×) für helle Hintergründe, `.knopf--umriss` (18×) für dunkle. Beides ist „Knopf ohne Fläche". Zwei Namen für ein Konzept — beim nächsten Mal rätst du, welcher gerade gilt.

Zusammenlegen zu `.knopf--umriss`, das Verhalten je Band steuert das CSS:

```css
.knopf--umriss { background: transparent; color: var(--stahl); }
.knopf--umriss:hover { background: var(--stahl); color: #fff; }
.band--tinte .knopf--umriss { border-color: var(--auf-tinte); color: var(--auf-tinte); }
.band--tinte .knopf--umriss:hover { background: var(--auf-tinte); color: var(--tinte); }
```

## 6.3 `Bild` ist toter Typ

`src/data/typen.ts` definiert `Bild` mit vier Feldern. `projekte.ts` deklariert `bild: Bild | null`. Kein Template liest das Feld. Entweder rendern (siehe 0.3) oder entfernen — ein Typ, der nie ankommt, ist eine Falle für den nächsten, der das Projekt anfasst.

## 6.4 Zwei Portangaben

`package.json` sagt `--port 3491`, `astro.config.mjs` sagt `server: { port: 3491 }`, WAS-NOCH-FEHLT.md sagt „Port 3490" und schlägt `npx lighthouse http://localhost:3490` vor. Der Lighthouse-Befehl in der Doku läuft ins Leere.

---

# Teil 7 — Reihenfolge der Umsetzung

## Stufe 1 — heute, ohne das darf niemand die Seite sehen (≈ 2 Std.)

1. Alle PLATZHALTER-FAQ-Antworten in Ich-Form umschreiben oder Fragen entfernen (1.1, 1.2)
2. Projektnamen setzen — drei erfundene Betriebsnamen sind erlaubt, solange „Konzeptprojekt" darübersteht (1.1)
3. Formular deaktivieren oder Formspree-Endpunkt eintragen (1.3)
4. Platzhalter-Mailadresse aus dem Fußbereich ausblenden (1.4)
5. Sitemap-Filter für `/impressum` und `/datenschutz` (1.5)

## Stufe 2 — die Optik, das ist die Antwort auf „langweilig" (≈ 4 Std.)

1. Dunkles Band zurück auf die Startseite, Abschnitt „Woran es fast immer hängt" (2.1)
2. `--papier` auf `#DFE6ED` (2.2)
3. `--kante: #8FA9C2` einführen, alle Bedienelement-Rahmen umstellen (2.3, 2.4, 2.5)
4. Trennkante zwischen aufeinanderfolgenden dunklen Bändern (2.6)
5. Sechste Branchenkachel „Deine Branche fehlt?" (2.7)
6. `theme-color` und `color-scheme` (2.9, 2.10)

## Stufe 3 — Konversion (≈ 4 Std.)

1. Feste Aktionsleiste am unteren Rand auf dem Handy (4.2)
2. Kopfbereich-Layout-Sprung beheben (5.1)
3. Konfigurator-Summe auf dem Handy sichtbar halten (5.2)
4. `action="/kontakt#formular"` (5.3)
5. Telefonnummer im Hero aus `.leise` herausholen (4.1)
6. Formular auf vier Pflichtfelder kürzen (4.6)
7. Antwortzeit auf `/danke` festlegen und hinschreiben (4.7)

## Stufe 4 — Substanz (Zeitbedarf hängt an dir)

1. Foto von dir + Bildpipeline bauen (0.3)
2. `og:image` zur Bauzeit erzeugen (5.11)
3. Fingertest auf die Startseite (4.3)
4. Wiederholte Positionierungsabsätze auf je eine Stelle reduzieren (4.4)
5. Screenshots der drei Konzeptprojekte
6. Impressum und Datenschutz (Stufe 1 im Sinne von WAS-NOCH-FEHLT.md, aber erst nötig, wenn `inDieSucheAufnehmen` auf `true` geht)

## Stufe 5 — Feinschliff

1. Typografie: Vorspann, 18px, Gewichtsstaffel (3.1–3.5)
2. Barrierefreiheit: Linktexte, `aria-live`, Legenden (5.4, 5.7, 5.8)
3. `:active`- und `:user-invalid`-Zustände (2.13, 5.6)
4. `.knopf--umriss` zusammenführen (6.1, 6.2)

---

# Teil 8 — Was ich in den Kontrollrunden zusätzlich gefunden habe

Wie gewünscht bin ich nach der ersten Durchsicht zweimal neu durchgegangen. Diese Punkte kamen erst dabei dazu:

- **Zweite Runde — gerechnet statt gelesen.** Ich habe die Kontraste rechnerisch geprüft statt sie einzuschätzen. Daraus kamen 0.1 (1,13:1 zwischen den Bändern), 2.3 (Rahmen unter WCAG 1.4.11), 2.4 und 2.5. Der 1,13-Wert ist der Kern der ganzen Analyse und wäre beim bloßen Lesen des CSS nie aufgefallen — die Farben sehen im Code nach genug Unterschied aus.
- **Zweite Runde — Bandfolge aller 28 Seiten ausgelesen.** Daraus kamen 0.2 (Startseite `·□·□·□·■` gegen `·□■·□■` überall sonst) und 2.6 (drei dunkle Blöcke gestapelt auf sechs Seiten). Beides ist erst im Vergleich sichtbar, nicht beim Betrachten einer einzelnen Seite.
- **Dritte Runde — Ausführungsreihenfolge im Browser durchgespielt.** Daraus kam 5.1, der Layout-Sprung im Kopfbereich. Der steht nirgends im Code als Fehler — er entsteht erst daraus, dass Astro `<script>` zu `type="module"` kompiliert und Modul-Skripte verzögert laufen.
- **Dritte Runde — Widersprüche zwischen Seiten gesucht statt Fehler auf Seiten.** Daraus kamen 4.6 („zwei Sätze reichen" gegen sieben Pflichtfelder), 4.1 (Telefon als schnellster Kanal, aber als kleinstes Element), 4.4 (vierfach wiederholte Positionierung), 4.9 (hervorgehobenes Paket mit Beschriftung auf einer Seite, ohne auf der anderen) und 2.8 (Preis auf der Startseite kleiner als auf der Preisseite). Diese Klasse von Befunden findet kein Prüfskript, weil jede Seite für sich fehlerfrei ist.
- **Dritte Runde — bewusst nach Dingen gesucht, die fehlen statt falsch sind.** Daraus kamen 0.3 (kein einziges Bild, und keine Stelle, an der eins landen könnte), 5.11 (`og:image`), 2.11 (`:visited`), 2.13 (kein `:active` auf dem Handy) und 5.6 (keine Fehlerdarstellung).

---

# Zum Schluss

Die Seite ist nicht langweilig, weil zu wenig drinsteckt. Sie ist langweilig, weil drei Entscheidungen die ganze Arbeit unsichtbar machen:

1. Der Bandwechsel liegt bei 1,13:1 — der Rhythmus ist gerechnet, aber nicht sichtbar.
2. Die Startseite hat ihr einziges dunkles Band ganz unten — elf Bildschirme ohne Ereignis.
3. Es gibt kein einziges Bild.

Alles andere in diesem Dokument ist Feinarbeit. Diese drei sind der Unterschied.

Der Rest der Seite — Struktur, Datenmodell, Ton, Rechtssicherheit, Ladezeit, Prüfskripte — ist besser als bei den meisten Agenturseiten, die das Zehnfache kosten. Das muss man nur sehen können.
