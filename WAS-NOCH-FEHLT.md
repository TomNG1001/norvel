# Was noch von dir fehlt

Stand: 10. August 2026. Die Website ist fertig gebaut — 25 Seiten, alle
Funktionen laufen. Was fehlt, sind Angaben, die ich nicht erfinden darf.

Abgehakt wird von oben nach unten: Was in **Abschnitt 1** steht, muss vor dem
Onlinegang da sein. Alles darunter kann warten.

---

## 1. Ohne das darf die Seite nicht online

### 1.1 Impressum

Die Seite steht, der Inhalt fehlt. Ein fehlendes oder falsches Impressum ist
abmahnfähig.

- [ ] **Anschrift** — Straße, Hausnummer, Postleitzahl, Ort. Postfach reicht nicht
- [ ] **Verantwortlich für den Inhalt** — Name und Anschrift
- [ ] **Umsatzsteuer** — bestätigen, dass du als Kleinunternehmer keine
      Umsatzsteuer-Identifikationsnummer hast
- [ ] **Hinweis zur Streitbeilegung** — prüfen lassen, ob und in welcher Form nötig

Datei: `src/pages/impressum.astro`

### 1.2 Datenschutzerklärung

Ebenfalls angelegt, Text fehlt. Auf der Seite steht bereits die technische
Zuarbeit: was die Website tut und was nicht.

- [ ] **Kontaktformular** — welche Felder, wofür, wie lange gespeichert,
      Auftragsverarbeitungsvertrag mit Formspree
- [ ] **Hosting** — welcher Anbieter, welche Protokolldaten, wie lange
- [ ] **Rechte der Besucher** — Auskunft, Berichtigung, Löschung, Widerspruch,
      Beschwerde
- [ ] **Verantwortlicher** — Name und Anschrift wie im Impressum

Datei: `src/pages/datenschutz.astro`

### 1.3 Domain und Mailadresse

Solange hier Platzhalter stehen, zeigt der Fußbereich auf jeder Seite
`platzhalter@platzhalter-domain.de`, und die Weiterleitung nach dem Absenden
des Formulars führt ins Leere.

- [ ] **Domain** eintragen
- [ ] **Geschäftliche Mailadresse** eintragen

Datei: `src/config/brand.ts` — zwei Zeilen.

### 1.4 Formspree-Endpunkt

Ohne ihn kommt **keine einzige Anfrage** bei dir an. Das Formular sieht
vollständig aus und tut nichts.

- [ ] Konto auf formspree.io anlegen, Formular erstellen, die Adresse
      (`https://formspree.io/f/…`) eintragen

Datei: `src/config/formular.ts`. Solange dort „PLATZHALTER" steht, siehst du
beim Entwickeln einen Warnkasten — im fertigen Build sieht ihn niemand.

---

## 2. Inhalte, die nur du schreiben kannst

### 2.1 Über mich

- [ ] **Drei bis fünf Sätze** dazu, seit wann du Websites baust, was du vorher
      gemacht hast und warum ausgerechnet kleine Betriebe
- [ ] **Ein Foto von dir** — kein Bild aus einer Bilddatenbank

Datei: `src/pages/ueber-mich.astro`

### 2.2 Die drei Beispielprojekte

Jedes hat noch einen Platzhalternamen und eine Platzhalterdauer.

- [ ] Name für das Restaurant-Konzept
- [ ] Name für das Kosmetikstudio-Konzept
- [ ] Name für das Hundesalon-Konzept
- [ ] Dauer je Projekt — oder streichen, wenn du keine Angabe machen willst

Datei: `src/data/projekte.ts`

---

## 3. Geschäftliche Festlegungen

Diese Antworten stehen aktuell als Platzhalter in den häufigen Fragen. Jede
davon wird dir von Kunden gestellt.

- [ ] **Anzahlung** — gibt es eine, wie hoch, wann ist der Rest fällig?
- [ ] **Laufzeit und Kündigungsfrist** der monatlichen Pflege
- [ ] **Was passiert bei Kündigung** — bekommt der Kunde die Dateien?
- [ ] **Wem gehört die Domain** — dir oder dem Kunden?
- [ ] **Welches Buchungssystem** setzt du für Terminbuchungen ein? Datenschutz
      dafür geprüft?
- [ ] **Machst du Fotos** für Kunden — selbst, vermittelt oder gar nicht?
- [ ] **Machst du Logos und Flyer** — wenn nein, gehört dort ein klares Nein hin
- [ ] **Antwortzeit** — willst du auf `/danke` eine Zusage machen
      („innerhalb von 24 Stunden")? Ich habe keine erfunden

Dateien: `src/data/faq.ts`, `src/data/leistungen.ts`, `src/data/branchen.ts`

---

## 4. Entscheidungen, die ich für dich getroffen habe

Diese laufen so, wie sie sind. Ändern kostet je fünf Minuten — aber du solltest
wissen, dass ich sie entschieden habe.

- [ ] **Die Leistungslisten in den Paketen.** Du hast Preise, Seitenzahlen und
      den Knick bei Start vorgegeben. Was genau in Start, Standard, Komplett
      und in der Pflege steckt, habe ich daraus abgeleitet. **Bitte durchgehen
      und streichen, was nicht stimmt.** → `src/data/pakete.ts`
- [ ] **Impressum und Datenschutz zählen nicht in die Seitenzahl.** Wenn doch,
      verschiebt sich jeder Preis um zwei Seiten. → `seitenOptionen`
- [ ] **Telefon im Kontaktformular ist freiwillig**, nicht Pflicht.
- [ ] **Handwerk hat kein Beispielprojekt**, Bars zeigt ersatzweise das
      Restaurant-Konzept, ehrlich beschriftet. Zwei weitere Konzepte anlegen?
- [ ] **Port 3490** für den lokalen Server.
- [ ] **Ordnername `meine-website`** — bewusst neutral, damit der Markenname in
      keinem Pfad steht.

---

## 5. Vor dem Onlinegang

- [ ] **Anschrift für die strukturierten Daten** — Google zeigt Betriebe ohne
      Adresse schlechter an. Steht in `src/layouts/Basis.astro`, sobald das
      Impressum steht
- [ ] **Lighthouse laufen lassen**: `npx lighthouse http://localhost:3490 --view`
      — ich habe die Einzelwerte gemessen, aber nicht das Werkzeug selbst
      ausgeführt, weil dafür ein weiteres Paket nötig wäre
- [ ] **Astro-Nutzungsdaten abschalten**, wenn du willst:
      `npx astro telemetry disable`
- [ ] **Cloudflare Pages einrichten** und die Domain verbinden

---

## Was fertig ist

25 Seiten, zwei Ebenen. Konfigurator mit automatischem Paketwechsel und
teilbarer Adresszeile. Übergabe der Auswahl ins Kontaktformular. Fünf
Branchenseiten und vier Leistungsseiten aus je einer Datendatei. Sitemap,
robots.txt, Canonical, strukturierte Daten. Schriften selbst gehostet, kein
Cookie-Banner nötig, keine Layout-Sprünge, Kontraste über AA.

Der Markenname steht an genau einer Stelle. `npm run build` bricht ab, sobald
er woanders auftaucht — auch in einem Dateinamen.
