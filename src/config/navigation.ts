/**
 * Navigation, an einer Stelle.
 *
 * Regel: Die Hauptnavigation hat genau fünf Punkte plus den Kontakt-Knopf.
 * Ablauf, FAQ und Rechtliches stehen ausschließlich im Fußbereich.
 * Wer hier einen sechsten Punkt einträgt, verstößt gegen die Projektregeln.
 */

export interface NavPunkt {
  text: string;
  pfad: string;
}

export const hauptnavigation: NavPunkt[] = [
  { text: "Leistungen", pfad: "/leistungen" },
  { text: "Branchen", pfad: "/branchen" },
  { text: "Referenzen", pfad: "/arbeiten" },
  { text: "Preise", pfad: "/preise" },
  { text: "Über mich", pfad: "/ueber-mich" },
];

export const kontaktKnopf: NavPunkt = { text: "Kontakt", pfad: "/kontakt" };

export interface FussSpalte {
  titel: string;
  punkte: NavPunkt[];
}

export const fussnavigation: FussSpalte[] = [
  {
    titel: "Leistungen",
    punkte: [
      { text: "Website", pfad: "/leistungen/website" },
      { text: "Hosting und Pflege", pfad: "/leistungen/hosting-pflege" },
      { text: "SEO", pfad: "/leistungen/seo" },
      { text: "Google-Profil", pfad: "/leistungen/google-profil" },
    ],
  },
  {
    titel: "Branchen",
    punkte: [
      { text: "Restaurants", pfad: "/branchen/restaurants" },
      { text: "Bars", pfad: "/branchen/bars" },
      { text: "Kosmetikstudios", pfad: "/branchen/kosmetik" },
      { text: "Hundefriseure", pfad: "/branchen/hundefriseure" },
      { text: "Handwerk", pfad: "/branchen/handwerk" },
    ],
  },
  {
    titel: "Mehr",
    punkte: [
      { text: "Häufige Probleme", pfad: "/probleme" },
      { text: "Ablauf", pfad: "/ablauf" },
      { text: "Häufige Fragen", pfad: "/faq" },
      { text: "Referenzen", pfad: "/arbeiten" },
      { text: "Preise", pfad: "/preise" },
    ],
  },
  {
    titel: "Rechtliches",
    punkte: [
      { text: "Impressum", pfad: "/impressum" },
      { text: "Datenschutz", pfad: "/datenschutz" },
    ],
  },
];
