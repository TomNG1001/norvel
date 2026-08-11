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

/**
 * Wohin der Zurück-Pfeil im Kopfbereich führt, wenn kein JavaScript läuft:
 * eine Ebene höher. Läuft JavaScript und kam der Besucher von einer Seite
 * dieser Website, führt der Pfeil stattdessen genau dorthin zurück, wo er
 * hergekommen ist. Das steht in Kopfbereich.astro.
 *
 * Die Startseite bekommt keinen Pfeil, über ihr liegt nichts.
 */
export function uebergeordnet(pfad: string): NavPunkt | null {
  const rein = pfad.replace(/\/+$/, "") || "/";
  if (rein === "/") return null;

  const teile = rein.split("/").filter(Boolean);
  if (teile.length > 1) {
    const ziel = "/" + teile.slice(0, -1).join("/");
    const treffer = alleZiele().find((p) => p.pfad === ziel);
    if (treffer) return treffer;
  }

  // Alles ohne bekannte Zwischenebene führt zur Startseite. Lieber ein
  // richtiges Ziel mit richtigem Namen als ein geratener Zwischenschritt.
  return { text: "Startseite", pfad: "/" };
}

/** Jeder Pfad, für den es irgendwo einen Anzeigenamen gibt. */
function alleZiele(): NavPunkt[] {
  return [
    ...hauptnavigation,
    kontaktKnopf,
    ...fussnavigation.flatMap((spalte) => spalte.punkte),
  ];
}
