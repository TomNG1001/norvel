# PROJEKT.md — Regeln und Auftrag

> **Zuerst lesen.** Vor jedem Schritt, jeder Sitzung und jeder Änderung:
> diese Datei ganz lesen, danach `FORTSCHRITT.md` (ab Schritt 1). Erst dann
> anfangen. Nicht aus dem Gedächtnis arbeiten.

> Diese Datei gilt **nur für dieses Projekt** (Ordner `meine-website/`).
> Sie steht bewusst nicht im globalen Memory und nicht in der gemeinsamen
> `settings.json` — andere Projekte (Oven Di Napoli, Puro, Stuzzico, …) sind
> davon nicht betroffen.
>
> Der Text unter „Projektregeln" stammt von Tom und wird nicht verändert.

---

## Stand

Der Stand steht ab Schritt 1 in **`FORTSCHRITT.md`** — dort, und nur dort.
Diese Datei hier ist die Regel-Quelle und ändert sich nur, wenn Tom die Regeln
ändert.

---

# Projektregeln

Arbeite wie ein erfahrener Webentwickler, der Wartbarkeit über Effekte stellt
und lieber nachfragt als annimmt.

## Wer

Tom Germeshausen, arbeitet allein, Rhein-Neckar-Kreis. Baut Websites für kleine
Betriebe: Restaurants, Bars, Kosmetikstudios, Hundefriseure, Handwerker.
Keine Agenturen, keine Konzerne, kein E-Commerce. Grundgerüst in 24–72 Stunden.
Kleinunternehmer nach § 19 UStG.

## Bei Konflikten gilt diese Rangfolge

1. Rechtliches
2. Die Markennamen-Regel
3. Übersichtlichkeit
4. Optik

Lassen sich zwei Vorgaben nicht vereinen: fragen, nicht raten.

## Skills

Prüfe vor jedem Arbeitsschritt: Welcher meiner verfügbaren Skills gehört hierher?
Greift einer, benutz ihn und nenn ihn. Passt keiner, sag das und mach ohne weiter.
Keinen übersehen, aber auch keinen erzwingen.

## Markenname — wichtigste technische Regel

Der Markenname steht ausschließlich in `src/config/brand.ts`.

Nirgendwo sonst hart im Code: nicht in Komponenten, Texten, alt-Attributen,
Dateinamen, Meta-Tags, Manifest, Favicon, Sitemap. Überall `brand.name`
importieren. Die Domain gehört Tom noch nicht — der Name muss jederzeit in einer
Zeile tauschbar sein.

Inhalt von brand.ts: name "Norvel", domain, mail, inhaber "Tom Germeshausen",
region "Rhein-Neckar-Kreis", telefonE164 "+4915752608733".

Logo = gesetzter Text plus ein rein geometrisches Zeichen. Kein "N", kein
Monogramm, kein Buchstabenbezug. Favicon zur Build-Zeit erzeugen.

`scripts/check-brand.mjs` liest den Namen aus brand.ts, durchsucht src, public,
scripts und alle Dateinamen, bricht mit Exit 1 ab bei jedem Fund außerhalb von
brand.ts. In package.json:
`"check:brand": "node scripts/check-brand.mjs"` und
`"build": "npm run check:brand && astro build"`

## Technik

Astro, statisch, kein SSR. Normales CSS mit CSS-Variablen, kein Tailwind —
Tom muss Farben und Abstände selbst ändern können, an einer Stelle.
Schriften über @fontsource selbst hosten, nie vom Google-CDN (Abmahnrisiko).
Bilder als WebP mit width und height. Hosting später auf Cloudflare Pages.

Keine npm-Pakete außer @fontsource und @astrojs/sitemap ohne Rückfrage.

Git-Repository zu Beginn anlegen, nach jeder abgeschlossenen Phase ein Commit.

## Struktur — das ist kein Onepager

25 Seiten, zwei Ebenen, nie drei.

> Stand 10.08.: **28 Seiten.** Eine Leistungsseite weniger (Google-Profil
> raus), dazu die Familie `/probleme` mit Übersicht und drei Seiten. Zwei
> Ebenen bleiben eingehalten.

```
/
/leistungen              Übersicht, 3 Karten
  /leistungen/website
  /leistungen/hosting-pflege
  /leistungen/seo
/branchen                Übersicht, 5 Karten
  /branchen/restaurants
  /branchen/bars
  /branchen/kosmetik
  /branchen/hundefriseure
  /branchen/handwerk
/arbeiten                Übersicht
  /arbeiten/[slug]       3 Detailseiten
/preise                  mit Konfigurator
/ueber-mich
/ablauf
/faq
/kontakt
/danke                   noindex
/impressum  /datenschutz
404
```

Regeln, in Zahlen:

- Hauptnavigation: genau 5 Punkte plus Kontakt-Knopf.
  Leistungen · Branchen · Referenzen · Preise · Über mich
  Ablauf, FAQ und Rechtliches nur im Fußbereich.
- Maximal 2 Ebenen tief.
- Übersichtsseiten zeigen ihre Unterseiten als Karten, je 1–2 Sätze Erklärung.
- Brotkrumennavigation auf jeder Unterseite.
- Jede Seite: 1 Hauptziel, 1 sichtbarer nächster Schritt, gleicher
  Kontakt-Abschluss.
- Pro Unterseite 4–6 Abschnitte, nicht mehr.

Verbindungswege — das ist das System, nicht Deko:
Branchenseite → passendes Paket auf /preise → /kontakt.
Jede Branchenseite verlinkt ihr Beispielprojekt, jedes Projekt seine Branche.

## Datenmodell — Kern des Systems

Unterseiten werden nie einzeln von Hand geschrieben. Sie entstehen aus je einer
Datenquelle über eine Template-Seite. Eine neue Branche anlegen heißt: eine
Datei anlegen, fertig.

```
src/config/brand.ts      Name, Domain, Kontakt
src/data/pakete.ts       3 Pakete, Konfigurator-Logik, Seitenoptionen
src/data/leistungen.ts   3 Leistungen → /leistungen/[slug]
src/data/branchen.ts     5 Branchen  → /branchen/[slug]
src/data/projekte.ts     3 Projekte  → /arbeiten/[slug]
src/data/faq.ts
src/data/ablauf.ts
```

Jede Branche braucht: name, einzahl, slug, seoTitel, seoText, problem
(konkret, was heute schiefläuft), mussHaben (mindestens 3), typischesPaket,
mindestens 3 eigene FAQ-Einträge, beispielProjekt.

Keine Branche-mal-Stadt-Seiten (nicht /branchen/restaurants-heidelberg) —
Google wertet das als Doorway-Pages ab. Die Region wird auf genau einer Seite
abgedeckt, die Heidelberg, Mannheim, Ludwigshafen, Weinheim und Schwetzingen
im Fließtext nennt.

## Farben

```
--papier  #E9EDF1   Grundfläche (kühles Kreideweiß, am 10.08. von #F1F4F7 geändert)
--karte   #FFFFFF   Karten und Formulare
--eisblau #C9D8E6   nur Linien und Rahmen, nie als Fläche
--stahl   #1C4F82   Buttons und Links
--tinte   #0A1A30   Fließtext und ganze dunkle Abschnitte
```

Überschriften: Bricolage Grotesque Variable. Fließtext: Public Sans.
Kein Inter — daran erkennt man KI-generierte Seiten.

Layout-Rhythmus: Wechsel aus hellen Abschnitten und vollflächigen dunkelblauen
Bändern über die ganze Breite. Dunkelblau ist nie nur Button-Farbe auf weißem
Grund — genau so sieht jede andere Handwerkerseite aus. Tinte-Bänder bekommen:
der 24–72-Stunden-Abschnitt, die Preistabelle, jeder Seitenabschluss.

> Geändert am 10.08. auf Ansage: Der 24–72-Stunden-Abschnitt auf der Startseite
> ist **kein** Tinte-Band mehr, sondern Kreideweiß. Der Wechsel läuft dort
> jetzt zwischen Kreide und Kartenweiß, das dunkle Band trägt nur noch der
> Seitenabschluss. Die Preistabelle auf /preise liegt weiter auf Tinte.

Keine Verläufe, keine Schlagschatten, keine Stockfotos, keine Deko-Icons.
Mobil zuerst.

## Ton

Ich-Form, Klarname, Handynummer sichtbar. Nie "wir".

Verboten: Lösungen, ganzheitlich, maßgeschneidert, digitale Präsenz, innovativ,
Synergie, "aufs nächste Level", "Ihr Partner für".

Kurze Sätze, ein Gedanke pro Satz. Der Leser ist Gastronom, kein Techniker.
Fachbegriffe nur, wenn sie im selben Satz erklärt werden.

So klingt es falsch:
> Wir bieten Ihnen maßgeschneiderte digitale Lösungen für Ihren
> Gastronomiebetrieb.

So klingt es richtig:
> Deine Speisekarte liegt als Foto auf Facebook. Google kann sie nicht lesen,
> also findet dich niemand, der Pizza in Weinheim sucht.

## Preise — alles aus pakete.ts, nie im Template

```
Start     ab  449 €   2–4 Seiten    39 €/Monat   SEO +149 €
Standard  ab  849 €   5–7 Seiten    59 €/Monat   SEO +219 €   hervorgehoben
Komplett  ab 1249 €   8–12 Seiten   89 €/Monat   SEO +289 €
```

Jede Seite über dem Inklusivumfang: 90 €.

Start hat bewusst keine Terminbuchung, keinen WhatsApp-Button, kein
Google-Profil, nur 1 Korrekturrunde. Standard hat das alles. Dieser Knick ist
gewollt und darf nicht weggeglättet werden — er verkauft Standard, nicht der
Preis.

> Geändert am 10.08. auf Ansage: Tom bietet **kein Google-Unternehmensprofil**
> an. Die Leistung `/leistungen/google-profil` ist entfernt, aus vier
> Leistungen sind drei geworden. Der Knick bei Start läuft jetzt über
> Terminbuchung, WhatsApp-Knopf und die eine Korrekturrunde. Damit sind es
> 28 statt 25 Seiten: eine Leistungsseite weniger, vier Problemseiten mehr.

Konfigurator: Checkboxen für die Seiten, Startseite und Kontakt fest gesetzt,
Summe rechnet live mit. Überschreitet die Seitenzahl das gewählte Paket, springt
er automatisch ins nächste und zeigt in einem eigenen Kasten, was für den
Aufpreis dazukommt, mit Knopf zum Wechseln. Auswahl steht in der URL, ist
teilbar, wird beim Klick auf "Anfragen" ins Kontaktformular übernommen.

Angezeigter Preis = Endpreis. Keine Streichpreise, kein "statt".

## Referenzen

Noch keine echten Kunden. Drei Konzeptprojekte: Restaurant, Kosmetikstudio,
Hundefriseur. Je mit Aufgabe, Umsetzung, Paket, Seitenzahl, Dauer.

Jedes muss auf jeder Ansicht sichtbar als "Konzeptprojekt" gekennzeichnet sein,
und über den Karten steht ein Hinweis, dass noch keine Kundenseiten live sind.
Erfundene Kundenzitate oder Erfolgszahlen sind verboten — irreführende Werbung
nach § 5 UWG.

Datenmodell so bauen, dass aus einem Konzept ein Kundenprojekt wird, indem ein
Feld von "konzept" auf "kunde" springt. Der Hinweis verschwindet dann
automatisch.

## Kontakt

Drei gleichwertige Karten: WhatsApp, Formular, Anruf. Darunter das Formular mit
Name, Betrieb, Mail, Telefon, Branche, aktueller Stand, Nachricht,
Datenschutz-Haken, verstecktes Feld für die übernommene Konfiguration.
Ziel ist Formspree — Endpunkt als klar markierten Platzhalter setzen.
Nach dem Absenden auf /danke weiterleiten.

## SEO und Qualität

- Eigener title und meta description je Seite, aus den Daten erzeugt, nie
  doppelt. Titel unter 60, Beschreibung unter 160 Zeichen.
- @astrojs/sitemap, robots.txt.
- JSON-LD: ProfessionalService überall, FAQPage auf /faq und Branchenseiten,
  BreadcrumbList auf Unterseiten.
- Canonical auf jeder Seite, /danke auf noindex.
- lang="de", sinnvolle alt-Texte.
- Tastaturbedienbar, sichtbarer Fokus, prefers-reduced-motion, Kontrast AA.
- Kein Layout-Shift, Lighthouse über 95 in allen vier Kategorien.

## Rechtliches — nicht verhandelbar

Kleinunternehmer nach § 19 UStG. Unter die Preise gehört "Kein Ausweis von
Umsatzsteuer nach § 19 UStG". Nie "zzgl. 19 % USt", nie ein Prozentsatz, nie ein
Steuerbetrag, nie "0 % MwSt".

Impressum und Datenschutz als Seiten anlegen, Inhalt liefert Tom.
Keine Schriften vom fremden CDN. Kein Google Analytics.

## Wird nicht gebaut

Kein Cookie-Banner (kein Tracking). Kein Newsletter-Popup. Kein Chat-Widget.
Kein Karussell. Keine Zähler, die beim Scrollen hochzählen. Keine Logo-Leiste
ohne echte Kunden. Keine Prozentbalken für "Skills". Keine Einblende-Animation
beim Scrollen. Kein umschaltbares Farbschema.

## Häufige Fehler, die zu vermeiden sind

- Alles auf einmal bauen statt Phase für Phase.
- Preise oder den Markennamen ins Template schreiben statt zu importieren.
- Unterseiten von Hand kopieren statt aus Daten zu erzeugen.
- Platzhaltertext, der wie echter Inhalt aussieht. Platzhalter müssen als
  Platzhalter erkennbar sein.
- Inhalte über Tom oder seine Kunden erfinden. Fehlt etwas: fragen.
- Navigation aufblähen. Fünf Punkte, nicht sechs.
- Aus zwei Ebenen drei machen.

## Zusammenarbeit

Offene Fragen sammeln und am Ende jeder Phase gebündelt und nummeriert stellen.
Nie mitten im Bauen.

Bei Kritik zuerst nachfragen, was genau gemeint ist, und nur das ändern. Nie
ungefragt umbauen, was nicht kritisiert wurde.

Nach jeder Phase stoppen und auf Freigabe warten.

---

## Schritte — so wird gearbeitet

Ich sage dir jeweils "mach Schritt X". Dann machst du **nur diesen einen
Schritt**, nichts vorgreifen, nichts nachziehen. Danach stoppst du und wartest.

Nach jedem abgeschlossenen Schritt:
1. Git-Commit mit der Schrittnummer in der Nachricht.
2. `FORTSCHRITT.md` aktualisieren (siehe unten).
3. Offene Fragen gebündelt und nummeriert stellen.
4. In einem Satz sagen, was ich mir ansehen soll.

Wenn ich "wo waren wir?" frage oder eine neue Sitzung anfange: lies zuerst
`FORTSCHRITT.md` und sag mir, welcher Schritt als Nächstes dran ist. Nicht
selbst weiterbauen.

Wenn ein Schritt größer wird als gedacht: sag das, bevor du anfängst, und
schlag eine Teilung vor.

### FORTSCHRITT.md

Legst du in Schritt 1 an. Aufbau: eine Zeile pro Schritt mit Status
(offen / erledigt), Datum, und darunter ein Feld "Offene Punkte". Nach jedem
Schritt fortschreiben, nie neu schreiben.

### Schritt 0 — Skills prüfen

Liste alle deine verfügbaren Skills auf. Sag bei jedem, ob er für dieses
Projekt relevant ist und wofür. Nichts bauen.

### Schritt 1 — Grundgerüst

Astro-Projekt anlegen, Git-Repository, FORTSCHRITT.md, brand.ts,
scripts/check-brand.mjs samt package.json-Einträgen, global.css mit den Farben
und Schriften, Basis-Layout, Kopfbereich mit Navigation, Fußbereich.
Noch keine Inhaltsseiten außer einer leeren Startseite.

Abnahme: `npm run dev` läuft, ich sehe Farben, Schrift, Navigation, Fußbereich.
`npm run build` läuft ohne Fehler durch.

### Schritt 2 — Datenmodelle

Alle Dateien unter src/data und src/config anlegen, mit vollständigen Feldern.
Inhalte, die nur Tom liefern kann, als klar erkennbare Platzhalter.
Noch keine Seiten daraus erzeugen.

Abnahme: Du zeigst mir, welche Felder eine Branche und ein Paket haben.

### Schritt 3 — /kontakt und /danke

Drei Kontaktwege, Formular, Formspree-Platzhalter, verstecktes Feld für die
Konfiguration, Weiterleitung auf /danke, /danke auf noindex.

### Schritt 4 — /preise

Die drei Pakete und der Konfigurator, komplett aus pakete.ts.
Auto-Upgrade, URL-Zustand, Übergabe an /kontakt.

### Schritt 5 — Startseite

### Schritt 6 — /leistungen und die 4 Unterseiten

### Schritt 7 — /branchen und die 5 Unterseiten

### Schritt 8 — /arbeiten und die 3 Projektseiten

### Schritt 9 — /ueber-mich, /ablauf, /faq

### Schritt 10 — /impressum, /datenschutz, 404

### Schritt 11 — SEO und Qualität

Meta-Angaben, Sitemap, robots.txt, JSON-LD, Canonical, Barrierefreiheit,
Lighthouse-Prüfung.

### Schritt 12 — Abschluss

Vollständige Liste dessen, was noch von Tom fehlt. Bericht, welche Skills du
in welchem Schritt benutzt hast. Letzter Commit.
