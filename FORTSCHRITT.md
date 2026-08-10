# FORTSCHRITT

Stand der Arbeit, ein Eintrag je Schritt. Wird nach jedem Schritt
fortgeschrieben, nie neu geschrieben. Regeln stehen in `PROJEKT.md`.

| Schritt | Inhalt | Status | Datum |
|---|---|---|---|
| 0 | Skills prüfen | erledigt | 2026-08-10 |
| 1 | Grundgerüst | erledigt (Abnahme offen) | 2026-08-10 |
| 2 | Datenmodelle | offen | – |
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

Geprüft: Die Markennamen-Regel hält — ein Nachbau der Prüfung in Python fand
null Treffer außerhalb von `brand.ts`.

Nicht geprüft: `npm install`, `npm run dev`, `npm run build`. Dafür fehlt Node.

### Offene Punkte

1. **Node fehlt** — ohne Node kein `npm install`, kein Dev-Server, kein Build.
   Die Abnahme von Schritt 1 steht deshalb aus.
2. Port 3489 gesetzt, weil unbeantwortet. Ändern in `package.json` und
   `astro.config.mjs`.
3. Domain und geschäftliche Mailadresse fehlen (PLATZHALTER in `brand.ts`).
4. Astro-Version auf 7.2.0 gesetzt (aktuell laut npm). Ungetestet.
5. Die Verweise in Kopf- und Fußbereich zeigen auf Seiten, die es noch nicht
   gibt — bis Schritt 10 laufen die meisten ins Leere. So geplant.
