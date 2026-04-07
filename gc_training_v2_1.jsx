import { useState } from "react";

// ─── BRAND CONSTANTS ─────────────────────────────────────────────────────────
const DB   = "#0A1628";   // dark blue — header / navigation / quiz screens
const MB   = "#1B3A6B";   // mid blue — borders, cells, accents
const GOLD = "#C9A84C";   // gold — labels, highlights
const CREAM = "#F5F0E8";  // cream — primary background (reading surface)
const WARM  = "#EDE8DF";  // slightly deeper cream — alternating rows, inset panels
const NAVY  = "#0A1628";  // text on cream
const DIM   = "#7A8A9E";  // secondary text on cream
const BODY  = "#3A3028";  // body text on cream
const ROSE  = "#C4956A";  // accent rose
const RED_AC = "#9B4040"; // vocabulary-to-avoid accent
const GRN_AC = "#3A7A50"; // lexicon accent

// ─── SIGLE — GC monogram SVG ─────────────────────────────────────────────────
const GCSigleSVG = ({ size = 48, dark = false }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="none"/>
    <text x="50" y="72" textAnchor="middle" fontFamily="Georgia, serif" fontSize="72" fontWeight="400"
      fill={dark ? DB : GOLD} letterSpacing="-4">GC</text>
    <line x1="10" y1="82" x2="90" y2="82" stroke={dark ? DB : GOLD} strokeWidth="1" opacity="0.5"/>
  </svg>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────

// ── PROLOGUE ──────────────────────────────────────────────────────────────────
const PROLOGUE_EN = {
  label: "BEFORE YOU BEGIN",
  title: "What It Means to Carry the Voice",
  body: [
    "This programme exists because words are not neutral. Every word spoken about Grande Charte either confirms its identity or begins to dissolve it. There is no middle register. No harmless improvisation.",
    "You have been invited into this initiation because someone in the House believes you are ready to carry its voice with the required composure, precision, and conviction. That invitation is itself an act of trust. And trust, at Grande Charte, is the rarest allocation.",
    "What follows is not a script. Scripts are memorised and forgotten. This is a doctrinal initiation. The difference being that doctrine, once truly absorbed, is not recalled. It is inhabited.",
    "Six modules. Each builds on the last. At the end of each, you will face situations drawn from real encounters. Moments where the correct response is not the obvious one, where composure matters more than cleverness, and where precision protects both the client and the House.",
    "Completion of this initiation does not automatically authorise representation. Final readiness requires doctrinal validation by the House. What it does grant is a clear understanding of the standard, and the weight of the responsibility.",
  ],
  commitment: [
    "You will not improvise doctrine.",
    "You will not reduce the price, in words, in tone, or in gesture.",
    "You will not frame Iroise as a marketing initiative, in any language, in any context.",
    "You will carry the same composure that the wine carries.",
  ],
  quote: "The goal is not to inform, but to entrust.",
};

const PROLOGUE_FR = {
  label: "AVANT DE COMMENCER",
  title: "Ce que Signifie Porter la Voix",
  body: [
    "Ce programme existe parce que les mots ne sont pas neutres. Chaque mot prononce sur Grande Charte confirme son identite ou commence a la dissoudre. Il n'existe pas de registre intermediaire. Pas d'improvisation anodine.",
    "Vous avez ete invite a cette initiation parce que quelqu'un dans la Maison estime que vous etes pret a porter sa voix avec le calme, la precision et la conviction necessaires. Cette invitation est elle-meme un acte de confiance. Et la confiance, chez Grande Charte, est l'allocation la plus rare.",
    "Ce qui suit n'est pas un script. Les scripts se memorisent et s'oublient. C'est une initiation doctrinale. La difference etant que la doctrine, une fois veritablement absorbee, ne se rappelle pas. Elle s'habite.",
    "Six modules. Chacun s'appuie sur le precedent. A la fin de chacun, vous ferez face a des situations tirees de rencontres reelles. Des moments ou la reponse correcte n'est pas la plus evidente, ou le calme compte plus que l'habilete, et ou la precision protege a la fois le client et la Maison.",
    "Completer cette initiation n'autorise pas automatiquement la representation. La validation doctrinale par la Maison est requise. Ce que cela accorde, c'est une comprehension claire du standard, et du poids de la responsabilite.",
  ],
  commitment: [
    "Vous n'improviserez pas la doctrine.",
    "Vous ne reduirez pas le prix, en mots, en ton, ni en geste.",
    "Vous ne presenterez jamais Iroise comme une initiative marketing, dans aucune langue, dans aucun contexte.",
    "Vous porterez le meme calme que porte le vin.",
  ],
  quote: "L'objectif n'est pas d'informer, mais de confier.",
};

// ── MODULE I — EN ─────────────────────────────────────────────────────────────
const SECTIONS_EN_I = [
  {
    id: "origin", label: "THE ORIGIN", title: "Born of a Charter",
    body: [
      "In 1114, a charter was signed in Champagne. It defined a just and free relationship between those who cultivated the land and those who administered it. One of the earliest written expressions of the region's founding values.",
      "Maison Grande Charte is not a return to that name. It is the continuation of its principle. The House was founded in 2010 with a single conviction: that genuine creation demands independence, and that excellence in Champagne must follow conscience rather than habit. Not the other way around.",
      "Grande Charte is among the youngest houses in Champagne, but it consciously connects its vision to one of the region's earliest written acts of equilibrium. Its roots reach into the first pact of balance. Its vision is entirely of this century.",
      "We chose the freedom of sourcing over the ownership of a domain. We work with a small circle of exceptional growers, all practising organic or biodynamic agriculture. These are trusted partners, not suppliers.",
    ],
    facts: [
      { label: "Founded", value: "2010" },
      { label: "NM Recognition", value: "2018" },
      { label: "Location", value: "Reims, France" },
      { label: "Certification", value: "100% Organic · Ecocert" },
      { label: "Production", value: "< 20,000 bottles since founding" },
      { label: "Distribution", value: "By allocation, invitation only" },
    ],
  },
  {
    id: "pillars", label: "THE PILLARS", title: "Freedom · Time · Audacity",
    body: [
      "Grande Charte is not a brand. It is a Maison, a living discipline. Every bottle, every gesture, every silence expresses the same intention: to create works of Champagne that reflect the intelligence of time and the courage of restraint.",
      "Freedom gives imagination. Time gives structure. Audacity gives movement. Together, they form the geometry of the House.",
      "Grande Charte is guided by mastery, not ambition. Its horizon is not expansion but exactitude. The pursuit of a Champagne that feels inevitable once it exists.",
      "This is what defines a House of Haute Maitrise: a rare alliance of creative freedom, temporal discipline, precision of execution, and refusal of repetition.",
      "Doctrine before deployment. Nothing leaves the House that has not been fully formed inside it.",
    ],
    quote: "Grande Charte stands at the meeting point of freedom, time, and audacity.",
    pillars: [
      { name: "Freedom", sub: "Liberte", text: "Freedom at Grande Charte begins long before the blend. Each year, hundreds of vins clairs are tasted, sourced from a small circle of organic growers. These wines are not chosen for uniformity, but for character. Freedom is the mastery of choice. The precision of what to keep, what to blend, what to let go." },
      { name: "Time", sub: "Temps", text: "Time is not a constraint at Grande Charte. It is a material. Wines rest on lees for 8 to 12 years minimum, in total obscurity. Disgorgement is performed by hand. Dosage does not follow fashion. It reflects philosophy. The House does not rush what time is shaping." },
      { name: "Audacity", sub: "Audace", text: "Audacity is not rebellion. It is the courage to go further than convention permits, while remaining deeply respectful of those who came before. Grande Charte connects the old and the new ways. It does not break from tradition. It extends it." },
    ],
  },
  {
    id: "hautemaitrise", label: "HAUTE MAITRISE", title: "A Standard, Not a Signature",
    body: [
      "Haute Maitrise is not a marketing claim. It is a precise technical and philosophical commitment. The convergence of disciplined freedom, extreme technical precision, and a living quest consistent not in taste, but in excellence.",
      "No major house currently occupies this position with this logic. The prestige tier claims heritage. The artisan tier claims soil. Grande Charte claims something neither has fully articulated: a territory defined not by what it possesses, but by what it refuses to compromise.",
      "The three pillars are non-negotiable. They appear in this exact order: Freedom · Time · Audacity. No substitutions. No additions.",
    ],
    standards: [
      { p: "Viticulture", e: "100% organic, integral respect for soils" },
      { p: "Selection", e: "Parcel-level, hand-harvested, vintage-dated" },
      { p: "Pressing", e: "Slow, low-pressure extraction" },
      { p: "Lees Aging", e: "8 to 12 years minimum" },
      { p: "Disgorgement", e: "Manual, without freezing" },
      { p: "Dosage", e: "Extra-brut 2 g/L, adjusted to 0.1 g/L precision" },
      { p: "Packaging", e: "No label, no glue. Tin coiffe. Forged capsule." },
    ],
  },
  {
    id: "language", label: "THE LANGUAGE", title: "Words Are Choices",
    body: [
      "Every word spoken about Grande Charte is either a confirmation or a dilution of its identity. There is no neutral register.",
      "The voice of the House is calm, precise, elevated. It affirms what the House does rather than explaining what it avoids. It states. It invites. It moves on.",
      "Each cuvee carries its own distinct lexical identity. Vocabulary is not shared between collections. To use the same word for GC-5 and Iroise 769 is to erase what makes each one necessary.",
    ],
    avoid: [
      { w: "Rebel / Rebellion", r: "Grande Charte connects the old and new ways. It does not break." },
      { w: "Passion / Love / Excellence", r: "Too vague, too shared. Every luxury brand uses these words. Mastery is more precise than emotion, and more defensible than superlatives." },
      { w: "Exclusive", r: "The House selects, it does not exclude. Rarity is structural, not designed." },
      { w: "Marketing initiative", r: "Never frame Iroise this way, in any language, in any context. It is a technical and philosophical act. The distinction is not subtle." },
      { w: "Luxury brand", r: "Grande Charte is a Maison. The register is entirely different." },
      { w: "Underwater wine", r: "Reductive and journalistic. The wine was not made underwater. It matured there. The distinction is essential." },
      { w: "Experimental stunt / Gadget", r: "Iroise is a maturation practice with measurable physical conditions and a distinct sensory consequence. It is never a stunt." },
    ],
    rule: "When unsure, slow down. Do not improvise doctrine. Clarify, then return with precision.",
    constitutional: "Every cuvee carries its own language. The House speaks one voice across all of them.",
    lexicon: {
      "GC-5": ["architecture of balance", "precision", "equilibrium", "legibility", "assemblage and dosage"],
      "GC-4": ["monochromatic exploration", "purity", "transparency", "single tonal horizon", "calm intensity"],
      "Iroise 769": ["silence", "pressure", "the imprint of the deep", "suspended evolution", "renewal"],
    },
  },
];

const SECTIONS_FR_I = [
  {
    id: "origin", label: "L'ORIGINE", title: "Nee d'une Charte",
    body: [
      "En 1114, une charte est signee en Champagne. Elle definit une relation juste et libre entre ceux qui cultivent la terre et ceux qui l'administrent. L'un des plus anciens temoignages ecrits des valeurs fondatrices de cette region.",
      "La Maison Grande Charte n'est pas un retour a ce nom. C'est la continuation de son principe. La Maison a ete fondee en 2010 avec une conviction : la creation veritable exige l'independance, et l'excellence en Champagne doit suivre la conscience plutot que l'habitude.",
      "Grande Charte est l'une des maisons les plus jeunes de Champagne, mais elle relie consciemment sa vision a l'un des premiers gestes ecrits d'equilibre de la region. Ses racines plongent dans le premier pacte d'equilibre ecrit. Sa vision est entierement de ce siecle.",
      "Nous avons choisi la liberte d'approvisionnement plutot que la possession d'un domaine. Nous travaillons avec un petit cercle de vignerons d'exception, tous en agriculture biologique ou biodynamique. Ce sont des partenaires de confiance, pas des fournisseurs.",
    ],
    facts: [
      { label: "Fondation", value: "2010" },
      { label: "Reconnaissance NM", value: "2018" },
      { label: "Siege", value: "Reims, France" },
      { label: "Certification", value: "100% Biologique · Ecocert" },
      { label: "Production", value: "< 20 000 flacons depuis la creation" },
      { label: "Distribution", value: "Par allocation, sur invitation" },
    ],
  },
  {
    id: "pillars", label: "LES PILIERS", title: "Liberte · Temps · Audace",
    body: [
      "Grande Charte n'est pas une marque. C'est une Maison, une discipline vivante. Chaque flacon, chaque geste, chaque silence exprime la meme intention : creer des oeuvres de Champagne qui refletent l'intelligence du temps et le courage de la retenue.",
      "La Liberte donne l'imagination. Le Temps donne la structure. L'Audace donne le mouvement. Ensemble, ils forment la geometrie de la Maison.",
      "Grande Charte est guidee par la maitrise, non l'ambition. Son horizon n'est pas l'expansion mais l'exactitude. La recherche d'un Champagne qui semble inevitable des qu'il existe.",
      "C'est ce qui definit une Maison de Haute Maitrise : une alliance rare de liberte creatrice, de discipline temporelle, de precision d'execution, et de refus de la repetition.",
      "La doctrine avant le deploiement. Rien ne quitte la Maison qui n'ait ete pleinement forme en elle.",
    ],
    quote: "Grande Charte se tient au point de rencontre de la liberte, du temps et de l'audace.",
    pillars: [
      { name: "Liberte", sub: "Freedom", text: "La liberte chez Grande Charte commence bien avant l'assemblage. Chaque annee, des centaines de vins clairs sont degustes, issus d'un petit cercle de vignerons biologiques. Ces vins ne sont pas choisis pour leur uniformite, mais pour leur caractere. La liberte est la maitrise du choix. La precision de ce qu'on garde, de ce qu'on assemble, de ce qu'on laisse partir." },
      { name: "Temps", sub: "Time", text: "Le temps n'est pas une contrainte chez Grande Charte. C'est un materiau. Les vins reposent sur lies 8 a 12 ans minimum, dans l'obscurite totale. Le degorgement est effectue a la main. Le dosage ne suit pas la mode. Il reflete une philosophie. La Maison ne brusque pas ce que le temps est en train de fagonner." },
      { name: "Audace", sub: "Audacity", text: "L'audace n'est pas la rebellion. C'est le courage d'aller plus loin que ce que la convention autorise, tout en restant profondement respectueux de ceux qui sont passes avant. Grande Charte relie les anciennes et les nouvelles voies. Elle ne rompt pas avec la tradition. Elle la prolonge." },
    ],
  },
  {
    id: "hautemaitrise", label: "HAUTE MAITRISE", title: "Un Standard, Pas une Signature",
    body: [
      "La Haute Maitrise n'est pas une revendication marketing. C'est un engagement technique et philosophique precis. La convergence d'une liberte disciplinee, d'une precision technique extreme, et d'une quete vivante coherente non dans le gout, mais dans l'excellence.",
      "Aucune grande maison n'occupe actuellement cette position. Le segment prestige revendique l'heritage. Le segment artisan revendique le sol. Grande Charte revendique quelque chose qu'aucun n'a pleinement articule : un territoire defini par ce qu'elle refuse de compromettre.",
      "Les trois piliers sont non negociables. Ils apparaissent dans cet ordre exact : Liberte · Temps · Audace. Pas de substitutions. Pas d'additions.",
    ],
    standards: [
      { p: "Viticulture", e: "100% biologique, respect integral des sols" },
      { p: "Selection", e: "Parcellaire, vendange manuelle, millesime" },
      { p: "Pressurage", e: "Lent, faible pression" },
      { p: "Vieillissement sur lies", e: "8 a 12 ans minimum" },
      { p: "Degorgement", e: "Manuel, sans congelation" },
      { p: "Dosage", e: "Extra-brut 2 g/L, ajuste a 0,1 g/L pres" },
      { p: "Conditionnement", e: "Sans etiquette, sans colle. Coiffe etain. Capsule forgee." },
    ],
  },
  {
    id: "language", label: "LE LANGAGE", title: "Les Mots Sont des Choix",
    body: [
      "Chaque mot prononce sur Grande Charte est soit une confirmation, soit une dilution de son identite. Il n'existe pas de registre neutre.",
      "La voix de la Maison est calme, precise, elevee. Elle affirme ce que la Maison fait plutot que d'expliquer ce qu'elle evite. Elle enonce. Elle invite. Elle avance.",
      "Chaque cuvee porte sa propre identite lexicale distincte. Le vocabulaire n'est pas partage entre les collections. Utiliser le meme mot pour le GC-5 et Iroise 769, c'est effacer ce qui rend chacun necessaire.",
    ],
    avoid: [
      { w: "Rebelle / Rebellion", r: "Grande Charte relie les anciennes et les nouvelles voies. Elle ne rompt pas." },
      { w: "Passion / Amour / Excellence", r: "Trop vague, trop partage. Toutes les maisons de luxe utilisent ces mots. La maitrise est plus precise que l'emotion, et plus defensible que les superlatifs." },
      { w: "Exclusif", r: "La Maison selectionne, elle n'exclut pas. La rarete est structurelle, pas calculee." },
      { w: "Initiative marketing", r: "Ne jamais qualifier ainsi Iroise, dans aucune langue, dans aucun contexte. C'est un acte technique et philosophique. La distinction n'est pas subtile." },
      { w: "Marque de luxe", r: "Grande Charte est une Maison. Le registre est entierement different." },
      { w: "Vin sous-marin", r: "Reducteur et journalistique. Le vin n'a pas ete fait sous l'eau. Il y a muri. La distinction est essentielle." },
      { w: "Coup marketing / Gadget", r: "Iroise est une pratique de maturation avec des conditions physiques mesurables et une consequence sensorielle distincte. Ce n'est jamais un gadget." },
    ],
    rule: "En cas de doute, ralentissez. N'improvisez pas la doctrine. Clarifiez, puis revenez avec precision.",
    constitutional: "Chaque cuvee porte sa propre langue. La Maison parle une seule voix pour toutes.",
    lexicon: {
      "GC-5": ["architecture d'equilibre", "precision", "equilibre", "lisibilite", "assemblage et dosage"],
      "GC-4": ["exploration monochromatique", "purete", "transparence", "horizon tonal unique", "intensite calme"],
      "Iroise 769": ["silence", "pression", "l'empreinte des profondeurs", "evolution suspendue", "renouveau"],
    },
  },
];

// ── MODULE II — EN ────────────────────────────────────────────────────────────
const SECTIONS_EN_II = [
  {
    id: "architecture", label: "THE ARCHITECTURE", title: "A Narrative in Reverse",
    body: [
      "The collections of Maison Grande Charte are not a range. They are a narrative, written backwards. Each number, from GC-5 to GC-1, marks a step deeper into the Maison's pursuit of the essential.",
      "The number does not indicate a rank. It signals a stage in a narrative architecture that unfolds in reverse. GC-5 was the founding act. GC-4 continues the descent. What lies ahead will go further still, until the work arrives at its source.",
      "Three collections have been released to date: GC-5 in 2019, Iroise 769 in 2021, GC-4 in 2025. Each is a distinct chapter. None shares the vocabulary of the others.",
      "Every cuvee speaks a different language. The House speaks one.",
    ],
    timeline: [
      { year: "2019", name: "GC-5", note: "The founding collection. Architecture of balance." },
      { year: "2021", name: "Iroise 769", note: "769 days at 60m depth. Time beneath the sea." },
      { year: "2025", name: "GC-4", note: "Monochromatic exploration. A single tonal horizon." },
      { year: "Future", name: "GC-3 to GC-1", note: "The descent continues toward the source." },
    ],
  },
  {
    id: "gc5", label: "GC-5", title: "The Art of Balance",
    body: [
      "GC-5 marked the founding act of the Maison. It is a study in balance. The meeting point between assemblage and dosage, the twin gestures that define Champagne's architecture.",
      "It is through assemblage and dosage that a wine becomes complete. One defines its structure, the other refines its light. At Grande Charte, dosage is adjusted to the hundredth of a gram. Each variation changes the perception of volume, minerality, and texture.",
      "Five cuvees were born from this discipline. Each is distinct, yet all share the same geometry of calm. GC-5 is not a formula to be repeated. It is a method of thought.",
    ],
    cuvees: [
      { name: "Trois Cepages", blend: "80% Meunier, 15% Pinot Noir, 5% Chardonnay", dosage: "1.71 g/L", aging: "6 years on lees", spirit: "The harmony of opposites. Meunier's generosity meets chalk-driven freshness.", bottles: "4,493" },
      { name: "Quatre Cepages", blend: "70% Pinot Noir, 12% Pinot Blanc, 9% Chardonnay, 9% Meunier", dosage: "2.93 g/L", aging: "5-9 years on lees", spirit: "The return of forgotten nobility. Pinot Blanc brings vertical energy and mineral depth.", bottles: "5,137" },
      { name: "Cuvee 2004", blend: "Chardonnay dominant", dosage: "1.3 g/L", aging: "12 years on lees", spirit: "Radiant stillness. A vintage of maturity and clarity. Golden hue, aromas of almond and chalk.", bottles: "Limited" },
      { name: "Cuvee 2007", blend: "Chardonnay, Pinot Noir", dosage: "1.2 g/L", aging: "10 years on lees", spirit: "The echo of light. Subtle, vertical, saline. Notes of lemon zest, crushed stone, white peach.", bottles: "Limited" },
      { name: "Rose", blend: "Chardonnay, Pinot Noir + still Pinot Noir", dosage: "1.8 g/L", aging: "8 years on lees", spirit: "The discipline of grace. Pale rose gold, wild strawberry, chalk. Aerial and structured.", bottles: "Limited" },
    ],
  },
  {
    id: "gc4", label: "GC-4", title: "The Monochromatic Exploration",
    body: [
      "Where GC-5 studied the architecture of blend and dosage, GC-4 turns to the question of identity: how one sensory line can unfold into four wines without losing its truth.",
      "Monochromatic by intention. Each cuvee carries its own personality, but all four belong to the same tonal universe. Depth without excess, maturity without weight, clarity without sharpness.",
      "The collection was produced in extremely limited volumes. Every bottle is the record of a moment that will not return. Once opened, it will only exist in memory. GC-4 is not a statement of style. It is the pursuit of one tonal universe, expressed four different ways. Each finished only when time itself agreed.",
    ],
    cuvees: [
      { name: "Blanc de Noirs", blend: "50% Pinot Noir, 50% Meunier · Harvest 2018", dosage: "Extra-Brut 4.5 g/L", aging: "7 years on lees", spirit: "A noir on a line of light: concentration, ripeness, and definition.", bottles: "500" },
      { name: "Millesime 2000", blend: "100% Chardonnay · Blanc de Blancs", dosage: "Extra-Brut 3.4 g/L", aging: "24 years on lees", spirit: "A Chardonnay shaped by two decades of calm. Precision, depth, collected time.", bottles: "460 + 10 jeroboams" },
      { name: "Alba 18", blend: "80% Pinot Noir, 20% Chardonnay · 2018 + 2017 reserves", dosage: "Extra-Brut 4.33 g/L", aging: "7 years on lees", spirit: "Expansive and structured. A magnum built for length.", bottles: "250 magnums" },
      { name: "Rose", blend: "56% Pinot Noir, 33% Meunier, 11% Chardonnay · 2012-2011", dosage: "Brut 8 g/L", aging: "Late disgorgement 2022", spirit: "A Rose of patience and control. Calm fruit, graceful maturity, long finish.", bottles: "427" },
    ],
  },
  {
    id: "iroise", label: "IROISE 769", title: "Time Beneath the Sea",
    body: [
      "At sixty metres below the surface of the Atlantic, off the island of Ouessant, bottles from the GC-5 collection were placed under the sea for 769 days. The pressure, the darkness, and the perpetual movement of the Iroise currents created a natural cellar beyond human control.",
      "This is not an experiment. It is a new dimension of aging. Oxidative development stopped, yet the wine continued to evolve through autolysis alone. The bottles emerged younger, denser, more exact. Their freshness intact, their texture transformed. The sea did not age them. It refined them.",
      "Iroise 769 is not a departure from Champagne's tradition. It is its expansion into silence. Each bottle carries the physical trace of its immersion: salt encrusted on the glass, the patina of the deep, the memory of another kind of time.",
    ],
    specs: [
      { p: "Depth", e: "60 metres (Sea of Iroise, off Ouessant Island)" },
      { p: "Duration", e: "769 days (approx. 2 years + 1 week)" },
      { p: "Temperature", e: "9-10 degrees C constant" },
      { p: "Pressure", e: "Approx. 6 bar" },
      { p: "Bottles per cuvee", e: "90 only" },
      { p: "Aging before immersion", e: "5 to 13 years on lees" },
      { p: "Cepages", e: "4 expressions from the GC-5 collection" },
      { p: "Particularity", e: "Bottles not cleaned. Every bottle is unique." },
    ],
    sensory: "At nose: iodine, wet stone, candied yellow fruit. On the palate: saline amplitude and luminous tension, as if the sea had sculpted the bubble.",
  },
];

const SECTIONS_FR_II = [
  {
    id: "architecture", label: "L'ARCHITECTURE", title: "Un Recit a Rebours",
    body: [
      "Les collections de Maison Grande Charte ne sont pas une gamme. Elles sont un recit, ecrit a rebours. Chaque numero, du GC-5 au GC-1, marque une etape vers l'essentiel.",
      "Le chiffre n'indique pas un rang. Il signale une etape dans une architecture narrative qui se deploie a rebours. GC-5 fut l'acte fondateur. GC-4 poursuit la descente. Ce qui viendra ira encore plus loin, jusqu'a ce que l'oeuvre atteigne sa source.",
      "Trois collections ont ete rendues disponibles a ce jour : GC-5 en 2019, Iroise 769 en 2021, GC-4 en 2025. Chacune est un chapitre distinct. Aucune ne partage le vocabulaire des autres.",
      "Chaque cuvee parle une langue differente. La Maison parle une seule.",
    ],
    timeline: [
      { year: "2019", name: "GC-5", note: "La collection fondatrice. Architecture d'equilibre." },
      { year: "2021", name: "Iroise 769", note: "769 jours a 60 m de profondeur. Le temps sous la mer." },
      { year: "2025", name: "GC-4", note: "Exploration monochromatique. Un seul horizon tonal." },
      { year: "A venir", name: "GC-3 a GC-1", note: "La descente se poursuit vers la source." },
    ],
  },
  {
    id: "gc5", label: "GC-5", title: "L'Art de l'Equilibre",
    body: [
      "GC-5 marque l'acte fondateur de la Maison. C'est une etude de l'equilibre. Le point de rencontre entre l'assemblage et le dosage, les deux gestes qui definissent l'architecture du Champagne.",
      "C'est a travers l'assemblage et le dosage qu'un vin devient complet. L'un definit sa structure, l'autre affine sa lumiere. Chez Grande Charte, le dosage est ajuste au centieme de gramme. Chaque variation change la perception du volume, de la mineralite et de la texture.",
      "Cinq cuvees sont nees de cette discipline. Chacune est distincte, mais toutes partagent la meme geometrie du calme. GC-5 n'est pas une formule a repeter. C'est une methode de pensee.",
    ],
    cuvees: [
      { name: "Trois Cepages", blend: "80% Meunier, 15% Pinot Noir, 5% Chardonnay", dosage: "1,71 g/L", aging: "6 ans sur lies", spirit: "L'harmonie des contraires. La generosite du Meunier rencontre la fraicheur de la craie.", bottles: "4 493" },
      { name: "Quatre Cepages", blend: "70% Pinot Noir, 12% Pinot Blanc, 9% Chardonnay, 9% Meunier", dosage: "2,93 g/L", aging: "5-9 ans sur lies", spirit: "Le retour d'une noblesse oubliee. Le Pinot Blanc apporte energie verticale et profondeur minerale.", bottles: "5 137" },
      { name: "Cuvee 2004", blend: "Chardonnay dominant", dosage: "1,3 g/L", aging: "12 ans sur lies", spirit: "Immobilite lumineuse. Un millesime de maturite et de clarte. Robe doree, amande et craie.", bottles: "Limite" },
      { name: "Cuvee 2007", blend: "Chardonnay, Pinot Noir", dosage: "1,2 g/L", aging: "10 ans sur lies", spirit: "L'echo de la lumiere. Subtil, vertical, salin. Notes de zeste de citron, pierre concassee, peche blanche.", bottles: "Limite" },
      { name: "Rose", blend: "Chardonnay, Pinot Noir + Pinot Noir vinifie en rouge", dosage: "1,8 g/L", aging: "8 ans sur lies", spirit: "La discipline de la grace. Or rose pale, fraise des bois, craie. Aerien et structure.", bottles: "Limite" },
    ],
  },
  {
    id: "gc4", label: "GC-4", title: "L'Exploration Monochromatique",
    body: [
      "La ou GC-5 etudiait l'architecture de l'assemblage et du dosage, GC-4 s'interroge sur l'identite : comment une ligne sensorielle unique peut-elle se deployer en quatre vins sans perdre sa verite.",
      "Monochromatique par intention. Chaque cuvee porte sa propre personnalite, mais toutes quatre appartiennent au meme univers tonal. Profondeur sans exces, maturite sans poids, clarte sans tranchant.",
      "La collection a ete produite en volumes extremement limites. Chaque flacon est l'enregistrement d'un moment qui ne reviendra pas. Une fois ouvert, il n'existera plus que dans la memoire. GC-4 n'est pas une affirmation de style. C'est la poursuite d'un univers tonal, exprime de quatre manieres differentes. Chacun acheve seulement quand le temps lui-meme l'a consenti.",
    ],
    cuvees: [
      { name: "Blanc de Noirs", blend: "50% Pinot Noir, 50% Meunier · Recolte 2018", dosage: "Extra-Brut 4,5 g/L", aging: "7 ans sur lies", spirit: "Un noir sur un trait de lumiere : concentration, maturite et definition.", bottles: "500" },
      { name: "Millesime 2000", blend: "100% Chardonnay · Blanc de Blancs", dosage: "Extra-Brut 3,4 g/L", aging: "24 ans sur lies", spirit: "Un Chardonnay faconne par deux decennies de calme. Precision, profondeur, temps rassemble.", bottles: "460 + 10 jeroboams" },
      { name: "Alba 18", blend: "80% Pinot Noir, 20% Chardonnay · 2018 + vins de reserve 2017", dosage: "Extra-Brut 4,33 g/L", aging: "7 ans sur lies", spirit: "Ample et structure. Un magnum construit pour la longueur.", bottles: "250 magnums" },
      { name: "Rose", blend: "56% Pinot Noir, 33% Meunier, 11% Chardonnay · 2012-2011", dosage: "Brut 8 g/L", aging: "Degorgement tardif 2022", spirit: "Un Rose de patience et de maitrise. Fruit calme, maturite gracieuse, finale longue.", bottles: "427" },
    ],
  },
  {
    id: "iroise", label: "IROISE 769", title: "Le Temps Sous la Mer",
    body: [
      "A soixante metres sous la surface de l'Atlantique, au large de l'ile d'Ouessant, des flacons de la collection GC-5 ont ete immerges pendant 769 jours. La pression, l'obscurite et le mouvement perpetuel des courants de la Mer d'Iroise ont cree une cave naturelle au-dela du controle humain.",
      "Ce n'est pas une experience. C'est une nouvelle dimension du vieillissement. Le developpement oxydatif s'est interrompu, pourtant le vin a continue d'evoluer par autolyse seule. Les bouteilles sont remontees plus jeunes, plus denses, plus exactes. Leur fraicheur intacte, leur texture transformee. La mer ne les a pas vieillis. Elle les a affines.",
      "Iroise 769 n'est pas un ecart par rapport a la tradition champenoise. C'est son expansion dans le silence. Chaque flacon porte la trace physique de son sejour : le sel incruste sur le verre, la patine des abysses, le souvenir d'un autre temps.",
    ],
    specs: [
      { p: "Profondeur", e: "60 metres (Mer d'Iroise, au large d'Ouessant)" },
      { p: "Duree", e: "769 jours (environ 2 ans + 1 semaine)" },
      { p: "Temperature", e: "9-10 degres C constante" },
      { p: "Pression", e: "Environ 6 bars" },
      { p: "Flacons par cuvee", e: "90 seulement" },
      { p: "Vieillissement avant immersion", e: "5 a 13 ans sur lies" },
      { p: "Cepages", e: "4 expressions de la collection GC-5" },
      { p: "Particularite", e: "Flacons non nettoyes. Chaque bouteille est unique." },
    ],
    sensory: "Au nez : iode, pierre humide, fruits jaunes confits. En bouche : une ampleur saline et une tension lumineuse, comme si la mer avait sculpte la bulle.",
  },
];

// ── MODULE III — EN ───────────────────────────────────────────────────────────
const SECTIONS_EN_III = [
  {
    id: "iroise_why", label: "WHY IROISE EXISTS", title: "An Intuition, Not an Initiative",
    body: [
      "Iroise 769 was not designed to differentiate Grande Charte. It was born from an intuition: that the sea, with its constancy of pressure, darkness, and current, could become a cellar beyond human control, and that what emerged from it would carry something no land-based aging could produce.",
      "The distinction matters. A marketing initiative begins with a desired outcome and works backwards. Iroise began with a question and followed it into the deep. The House did not know what it would find. That is precisely the point.",
      "When you speak about Iroise, you are not describing a feature. You are describing a dimension of time. The sea did not age these wines. It refined them. Oxidative development is suspended, while the wine continues to evolve through prolonged lees contact under highly specific conditions. The bottles emerged younger, denser, more exact.",
      "Never frame Iroise as a point of difference versus competitors. Never describe it as a stunt, an experiment, or a concept. Iroise is a new practice of maturation. The most radical expression of what Time means to this House.",
    ],
  },
  {
    id: "iroise_science", label: "THE PHYSICS", title: "What the Sea Actually Does",
    body: [
      "Understanding the mechanics is not optional for ambassadors. When a client asks why the sea, a vague answer, such as 'the pressure, the darkness', is insufficient. The answer must be precise enough to be credible, and brief enough to remain poetic.",
      "At 60 metres depth, the external pressure on the bottle reaches approximately 6 bar. The internal pressure of a Champagne bottle is also approximately 6 bar. This near-perfect equilibrium means the bottle is neither compressed nor released. It floats in a balance of forces. This is unique to Champagne among all still wines, and it is why the immersion works.",
      "The constant temperature of 9-10 degrees C slows all chemical reactions. The total darkness eliminates photodegradation. The slow oscillation of marine currents keeps the lees in perpetual, gentle suspension, sustaining an uninterrupted, delicate autolysis that no land cellar can reproduce through this exact conjunction of depth, pressure, darkness, temperature and marine movement.",
      "Result: oxidative development is suspended, but the wine continues to evolve through autolysis alone. It emerges with a texture extremely difficult to achieve at the surface under comparable conditions. Not older. Different. A density without weight, a saline depth, a freshness that should not exist given the age.",
    ],
    facts: [
      { label: "Depth", value: "60 metres" },
      { label: "External pressure", value: "Approx. 6 bar, equal to Champagne's internal pressure" },
      { label: "Temperature", value: "9-10 degrees C constant" },
      { label: "Duration", value: "769 days (approx. 2 years + 1 week)" },
      { label: "Effect on oxidation", value: "Suspended. Wine evolves through autolysis alone." },
      { label: "Lees behaviour", value: "Maintained in perpetual suspension by marine currents" },
      { label: "Bottles per cuvee", value: "90 only, recovered by hand" },
      { label: "Each bottle", value: "Unique. Not cleaned. Salt and patina of the deep." },
    ],
  },
  {
    id: "iroise_voice", label: "THE VOICE", title: "How to Speak About Iroise",
    body: [
      "Iroise 769 has its own lexical territory. The vocabulary used must never overlap with that of GC-5 or GC-4. The register is that of depth, stillness, and irreversibility.",
      "The correct register evokes: silence, pressure, the imprint of the deep, suspended evolution, renewal, circular time, density without weight, preserved freshness, a tactile grace impossible to reproduce on land.",
      "To avoid: innovative, experimental, limited edition, special release, underwater wine, gadget, marketing, unique concept. These words belong to a commercial register. Iroise belongs to a philosophical register.",
    ],
    avoid: [
      { w: "Innovative / Experience", r: "Iroise is not a test. It is a practice, reproducible, documented, confirmed by comparative tastings with recognised oenologists." },
      { w: "Limited edition", r: "Every Grande Charte cuvee is limited by nature. Qualifying Iroise as a limited edition reduces it to a commercial tactic." },
      { w: "Underwater wine", r: "Reductive and journalistic. The wine was not made underwater. It matured there. The distinction is essential." },
      { w: "It's like...", r: "Do not try to find an analogy. Iroise has no equivalent. If a client insists, state calmly: there is no direct comparison. That is partly why it exists." },
    ],
    posture: [
      "Do not present Iroise as a point of difference.",
      "Do not present it as a concept.",
      "Do not begin with the underwater story.",
      "Begin with the wine, then the maturation logic, then the marine environment. Only when genuine curiosity is present.",
    ],
    ifUnsure: "Iroise is not a marketing initiative. It is a maturation practice with measurable physical conditions and a distinct sensory consequence. I can explain the process precisely if useful.",
    lexicon: {
      "Iroise 769": ["silence", "pressure", "the imprint of the deep", "suspended evolution", "renewal", "circular time", "density without weight", "preserved freshness"],
    },
    quote: "Opening a bottle of Iroise creates a founding moment. A shared memory, suspended between the sea and time.",
  },
  {
    id: "iroise_present", label: "PRESENTING IROISE", title: "The Moment of Revelation",
    body: [
      "Iroise must not be introduced early in a conversation. It is earned. The reward of attention, not the opening gambit. Begin with the House, the pillars, the collection architecture. Let the client understand what Grande Charte is before showing them what it dares.",
      "When the moment arrives, keep the physical fact at the centre: 60 metres, 769 days, 90 bottles, the sea off the island of Ouessant. Numbers are more powerful than adjectives. Let the numbers do the first work. Then describe what the wine carries: the salt encrusted on the glass, the patina, the memory of the deep.",
      "Presenting a bottle of Iroise is a ritual. It must be treated with the same calm as the wine itself. No theatrical gesture. No performance. Calm, precise, inhabited. The salt on the glass speaks before you do.",
    ],
  },
];

const SECTIONS_FR_III = [
  {
    id: "iroise_why", label: "POURQUOI IROISE EXISTE", title: "Une Intuition, Pas une Initiative",
    body: [
      "Iroise 769 n'a pas ete concu pour differencier Grande Charte. Il est ne d'une intuition : que la mer, avec sa constante de pression, d'obscurite et de courant, pouvait devenir une cave au-dela du controle humain, et que ce qui en emergerait porterait quelque chose qu'aucun vieillissement terrestre ne peut produire.",
      "La distinction est fondamentale. Une initiative marketing part d'un resultat souhaite et travaille a rebours. Iroise a commence par une question et l'a suivie jusqu'aux profondeurs. La Maison ne savait pas ce qu'elle trouverait. C'est precisement la le sens.",
      "Lorsque vous parlez d'Iroise, vous ne decrivez pas un attribut. Vous decrivez une dimension du temps. La mer n'a pas vieilli ces vins. Elle les a affines. Le developpement oxydatif est suspendu, tandis que le vin continue d'evoluer par contact prolonge sur lies dans des conditions hautement specifiques. Les bouteilles sont remontees plus jeunes, plus denses, plus exactes.",
      "Ne jamais presenter Iroise comme un point de difference face aux concurrents. Ne jamais le qualifier de coup, d'experience ou de concept. Iroise est une nouvelle pratique de maturation. L'expression la plus radicale de ce que le Temps signifie pour cette Maison.",
    ],
  },
  {
    id: "iroise_science", label: "LA PHYSIQUE", title: "Ce que la Mer Fait Reellement",
    body: [
      "Comprendre les mecanismes n'est pas optionnel pour les ambassadeurs. Quand un client demande pourquoi la mer, une reponse vague, comme 'la pression, l'obscurite', est insuffisante. La reponse doit etre assez precise pour etre credible, et assez breve pour rester poetique.",
      "A 60 metres de profondeur, la pression externe sur la bouteille atteint environ 6 bars. La pression interne d'une bouteille de Champagne est egalement d'environ 6 bars. Cet equilibre quasi parfait signifie que la bouteille n'est ni compressee ni relachee. Elle flotte dans un equilibre de forces. C'est unique au Champagne parmi tous les vins tranquilles, et c'est pourquoi l'immersion fonctionne.",
      "La temperature constante de 9-10 degres C ralentit toutes les reactions chimiques. L'obscurite totale elimine la photodegradation. L'oscillation lente des courants marins maintient les lies en suspension perpetuelle et douce, soutenant une autolyse delicate et ininterrompue qu'aucune cave terrestre ne peut reproduire a travers cette exacte conjonction de profondeur, pression, obscurite, temperature et mouvement marin.",
      "Resultat : le developpement oxydatif est suspendu, mais le vin continue d'evoluer par autolyse seule. Il sort avec une texture extremement difficile a obtenir a la surface dans des conditions comparables. Non pas plus vieux. Different. Une densite sans poids, une profondeur saline, une fraicheur qui ne devrait pas exister compte tenu de l'age.",
    ],
    facts: [
      { label: "Profondeur", value: "60 metres" },
      { label: "Pression externe", value: "Environ 6 bars, egale a la pression interne du Champagne" },
      { label: "Temperature", value: "9-10 degres C constante" },
      { label: "Duree", value: "769 jours (environ 2 ans + 1 semaine)" },
      { label: "Effet sur l'oxydation", value: "Suspendue. Le vin evolue par autolyse seule." },
      { label: "Comportement des lies", value: "Maintenues en suspension perpetuelle par les courants" },
      { label: "Flacons par cuvee", value: "90 seulement, recuperes a la main" },
      { label: "Chaque flacon", value: "Unique. Non nettoye. Sel et patine des profondeurs." },
    ],
  },
  {
    id: "iroise_voice", label: "LA VOIX", title: "Comment Parler d'Iroise",
    body: [
      "Iroise 769 possede son propre territoire lexical. Le vocabulaire utilise ne doit jamais chevaucher celui du GC-5 ou du GC-4. Le registre est celui de la profondeur, de l'immobilite et de l'irreversibilite.",
      "Le registre correct evoque : le silence, la pression, l'empreinte des profondeurs, l'evolution suspendue, le renouveau, le temps circulaire, une densite sans poids, une fraicheur preservee, une grace tactile impossible a reproduire a terre.",
      "A eviter : innovant, experimental, edition limitee, sortie speciale, vin sous-marin, gadget, marketing, concept unique. Ces mots appartiennent a un registre commercial. Iroise appartient a un registre philosophique.",
    ],
    avoid: [
      { w: "Innovant / Experience", r: "Iroise n'est pas un test. C'est une pratique, reproductible, documentee, confirmee par des degustations comparatives avec des oenologues reconnus." },
      { w: "Edition limitee", r: "Chaque cuvee Grande Charte est limitee par nature. Qualifier Iroise d'edition limitee le reduit a une tactique commerciale." },
      { w: "Vin sous-marin", r: "Reducteur et journalistique. Le vin n'a pas ete fait sous l'eau. Il y a muri. La distinction est essentielle." },
      { w: "C'est comme...", r: "N'essayez pas de trouver une analogie. Iroise n'a pas d'equivalent. Si un client insiste, dites calmement : il n'existe pas de comparaison directe, c'est en partie pourquoi il existe." },
    ],
    posture: [
      "Ne pas presenter Iroise comme un point de difference.",
      "Ne pas le presenter comme un concept.",
      "Ne pas commencer par l'histoire sous-marine.",
      "Commencer par le vin, puis la logique de maturation, puis l'environnement marin. Seulement quand la curiosite est reelle.",
    ],
    ifUnsure: "Iroise n'est pas une initiative marketing. C'est une pratique de maturation avec des conditions physiques mesurables et une consequence sensorielle distincte. Je peux expliquer le processus precisement si utile.",
    lexicon: {
      "Iroise 769": ["silence", "pression", "l'empreinte des profondeurs", "evolution suspendue", "renouveau", "temps circulaire", "densite sans poids", "fraicheur preservee"],
    },
    quote: "Ouvrir une bouteille d'Iroise, c'est creer un moment fondateur. Un souvenir partage, suspendu entre la mer et le temps.",
  },
  {
    id: "iroise_present", label: "PRESENTER IROISE", title: "Le Moment de la Revelation",
    body: [
      "Iroise ne doit pas etre introduit tot dans une conversation. Il se merite. La recompense de l'attention, pas l'argument d'ouverture. Commencez par la Maison, les piliers, l'architecture des collections. Laissez le client comprendre ce qu'est Grande Charte avant de lui montrer ce qu'elle ose.",
      "Quand le moment arrive, gardez le fait physique au centre : 60 metres, 769 jours, 90 flacons, la mer au large de l'ile d'Ouessant. Les chiffres sont plus puissants que les adjectifs. Laissez les chiffres faire le premier travail. Decrivez ensuite ce que le vin porte : le sel incruste sur le verre, la patine, le souvenir des profondeurs.",
      "La presentation d'une bouteille d'Iroise est un rituel. Elle doit etre traitee avec le meme calme que le vin lui-meme. Aucun geste theatral. Aucune performance. Calme, precis, habite. Le sel sur le verre parle avant vous.",
    ],
  },
];

// ── MODULE IV — EN ────────────────────────────────────────────────────────────
const SECTIONS_EN_IV = [
  {
    id: "principles", label: "PRINCIPLES OF CONVERSATION", title: "The House Does Not Argue",
    body: [
      "Grande Charte does not defend itself. It does not compete on competitors' terms. It does not lower its register to meet a provocation. The House states, invites, and moves on.",
      "When a competitor is mentioned, acknowledge with respect. Define our position through affirmation, never through negation. The correct posture is calm, inhabited, unhurried. The person across from you may be testing you. They may be genuinely curious. Either way, the response is the same: precise, warm, grounded.",
      "Three principles govern all conversations: First, affirm what we are before addressing what we are not. Second, redirect from comparison to discovery. The goal is not to win an argument, but to open a door. Third, never reduce the price of anything, in words or in tone. Hesitation signals doubt. The House has no doubt.",
      "Authority does not require immediate comparison. When precision is preferable to speed, slow the conversation down.",
    ],
  },
  {
    id: "vs_salon", label: "VS. SALON", title: "When a Prospect Mentions Salon",
    body: [
      "Salon is one of the finest Champagnes ever made. We have genuine respect for what they do. The correct approach is not to contest their status. It is to articulate what the pursuit of Grande Charte offers that a single, perfected repetition cannot.",
      "Salon pursues one answer with extraordinary discipline. Grande Charte pursues a designed progression: each collection opens a different chapter, with a different structure and a different language.",
    ],
    scenarios: [
      { trigger: "\"I already drink Salon — what's different about Grande Charte?\"", response: "Salon is one of the finest Champagnes ever made, and we have great respect for what they do. What they do, they do once, and repeat it as perfectly as possible. What we do is different: each cuvee in our collection is a different answer to the same question, and the Iroise program takes the wine somewhere no other house has gone. Our clients who know Salon well tend to find that Grande Charte offers them a dimension of discovery that a single, perfect repetition cannot." },
    ],
  },
  {
    id: "vs_krug", label: "VS. KRUG", title: "When a Prospect Mentions Krug",
    body: [
      "Krug has 180 years of blending expertise and deep sommelier relationships globally. We acknowledge this with full sincerity. The conversation shifts when the prospect reveals why they are looking further.",
      "We offer genuine cuvee-level scarcity, not a prestige sub-brand positioned as a special edition. Our numbering and allocation-by-introduction gives each custodian a relationship with a specific bottle. Our volumes are constrained by choice, not calibrated to commercial targets. The Iroise program's 90 bottles per cuvee makes the Krug Clos du Mesnil look broadly available by comparison.",
    ],
    scenarios: [
      { trigger: "\"I can get Krug Grande Cuvee almost anywhere now.\"", response: "Exactly. And that is precisely why some of our clients began looking further. Grande Charte is not distributed. It is allocated. There is no retail path to a bottle of GC-4 or Iroise. You receive it through a relationship with the House, by introduction, and each bottle carries a hand-written number. For clients who have moved beyond what wide distribution can offer, this is the difference." },
    ],
  },
  {
    id: "vs_selosse", label: "VS. SELOSSE", title: "When a Prospect Mentions Selosse",
    body: [
      "Anselme Selosse changed what was possible to say about Champagne, and we acknowledge that debt openly. His terroir philosophy is intellectually rigorous and has shaped an entire generation of growers and sommeliers. This is not contested.",
      "Selosse embodies a singular personal vision with extraordinary force. Grande Charte is built differently: as a House architecture. Collections, allocation, provenance, and a shared doctrine designed to travel without dilution.",
    ],
    scenarios: [
      { trigger: "\"Selosse changed how I think about Champagne — how does Grande Charte compare?\"", response: "Anselme Selosse changed what was possible to say about Champagne, and we acknowledge that. Our debt to that shift is real. But Grande Charte operates from a different premise: where his wines are expressions of one man's singular vision rooted in one terroir, ours are the product of a collective quest — a method, a set of standards, and a willingness to take the wine somewhere new. Our consistency is in the excellence of the pursuit, not in the repetition of a style." },
    ],
  },
  {
    id: "price_objection", label: "ON PRICE", title: "When the Price Is Questioned",
    body: [
      "Price is never negotiated. Price is never apologised for. Price is never framed as expensive for what it is. Price signals confidence. Reducing price to enter a conversation, even in tone, signals doubt. And doubt is the only thing that cannot be recovered.",
      "The correct response to a price objection is to redirect to value architecture: the years on lees, the hand disgorgement, the volumes, the allocation relationship. If the prospect is not yet ready to understand this, that is not a failure. Not every conversation ends in an allocation. The goal is to leave the door open, never to close it through compromise.",
      "Pricing is not explained through cost. It is understood through architecture, rarity, time, and discipline.",
    ],
    ifUnsure: "I'd rather not oversimplify that comparison. What matters is that Grande Charte is built on a different premise.",
    scenarios: [
      { trigger: "\"It's very expensive for a name I don't know.\"", response: "That is precisely the point of departure for most of our clients. Grande Charte is not distributed. It is not a name you find in a restaurant list or a wine shop. You encounter it through someone who knows the House, and that relationship is part of what the bottle carries. The wine has been reviewed at 18/20 by Jancis Robinson and 95-97/100 by multiple Masters of Wine. The quality has been confirmed by those who define the highest standards. The recognition will come. The rarity will not be manufactured later." },
    ],
  },
];

const SECTIONS_FR_IV = [
  {
    id: "principles", label: "PRINCIPES DE CONVERSATION", title: "La Maison n'Argumente Pas",
    body: [
      "Grande Charte ne se defend pas. Elle ne concurrence pas sur les termes des concurrents. Elle ne baisse pas son registre pour repondre a une provocation. La Maison enonce, invite et avance.",
      "Quand un concurrent est mentionne, reconnaitre avec respect. Definir notre position par l'affirmation, jamais par la negation. La posture correcte est calme, habitee, sans precipitation. La personne en face peut vous tester. Elle peut etre sincerement curieuse. Dans tous les cas, la reponse est la meme : precise, chaleureuse, ancree.",
      "Trois principes regissent toutes les conversations : premierement, affirmer ce que nous sommes avant d'aborder ce que nous ne sommes pas. Deuxiemement, passer de la comparaison a la decouverte. L'objectif n'est pas de gagner un debat, mais d'ouvrir une porte. Troisiemement, ne jamais reduire le prix de quoi que ce soit, en mots ou en ton. L'hesitation signale le doute. La Maison n'a pas de doute.",
      "L'autorite ne requiert pas de comparaison immediate. Quand la precision est preferable a la vitesse, ralentissez la conversation.",
    ],
  },
  {
    id: "vs_salon", label: "VS. SALON", title: "Quand un Prospect Mentionne Salon",
    body: [
      "Salon est l'un des meilleurs Champagnes jamais produits. Nous avons un respect sincere pour ce qu'ils font. L'approche correcte n'est pas de contester leur statut. C'est d'articuler ce que la quete de Grande Charte offre qu'une repetition parfaite et unique ne peut pas.",
      "Salon poursuit une reponse avec une discipline extraordinaire. Grande Charte poursuit une progression concue : chaque collection ouvre un chapitre different, avec une structure differente et un langage different.",
    ],
    scenarios: [
      { trigger: "\"Je bois deja du Salon — quelle est la difference avec Grande Charte ?\"", response: "Salon est l'un des meilleurs Champagnes jamais produits, et nous avons un grand respect pour ce qu'ils font. Ce qu'ils font, ils le font une seule fois, et le repetent aussi parfaitement que possible. Ce que nous faisons est different : chaque cuvee de notre collection est une reponse differente a la meme question, et le programme Iroise emmene le vin la ou aucune autre maison ne s'est aventuree. Nos clients qui connaissent bien Salon ont tendance a trouver que Grande Charte leur offre une dimension de decouverte qu'une repetition parfaite et unique ne peut pas offrir." },
    ],
  },
  {
    id: "vs_krug", label: "VS. KRUG", title: "Quand un Prospect Mentionne Krug",
    body: [
      "Krug possede 180 ans d'expertise en assemblage et de profondes relations avec les sommeliers dans le monde entier. Nous le reconnaissons avec une sincerite totale. La conversation bascule quand le prospect revele pourquoi il cherche quelque chose d'autre.",
      "Nous offrons une rarete reelle au niveau de la cuvee, pas une sous-marque de prestige positionnee comme edition speciale. Notre systeme de numerotation et d'allocation par introduction donne a chaque client une relation avec une bouteille specifique. Nos volumes sont contraints par choix, non calibres selon des objectifs commerciaux.",
    ],
    scenarios: [
      { trigger: "\"Le Krug Grande Cuvee se trouve maintenant presque partout.\"", response: "Exactement. Et c'est precisement pourquoi certains de nos clients ont commence a chercher plus loin. Grande Charte n'est pas distribuee. Elle est allouee. Il n'existe pas de voie de detail pour une bouteille de GC-4 ou d'Iroise. On la recoit par une relation avec la Maison, par introduction, et chaque bouteille porte un numero manuscrit. Pour les clients qui ont depasse ce que la grande distribution peut offrir, c'est la difference." },
    ],
  },
  {
    id: "vs_selosse", label: "VS. SELOSSE", title: "Quand un Prospect Mentionne Selosse",
    body: [
      "Anselme Selosse a change ce qu'il etait possible de dire sur le Champagne, et nous reconnaissons cette dette ouvertement. Sa philosophie du terroir est intellectuellement rigoureuse et a faconne toute une generation de vignerons et de sommeliers.",
      "Selosse incarne une vision personnelle singuliere avec une force extraordinaire. Grande Charte est construite differemment : comme une architecture de Maison. Collections, allocation, provenance, et une doctrine partagee concue pour voyager sans dilution.",
    ],
    scenarios: [
      { trigger: "\"Selosse a change ma facon de penser le Champagne — comment se situe Grande Charte ?\"", response: "Anselme Selosse a change ce qu'il etait possible de dire sur le Champagne, et nous le reconnaissons. Notre dette envers ce changement est reelle. Mais Grande Charte opere depuis une premisse differente : la ou ses vins sont les expressions de la vision singuliere d'un homme ancree dans un terroir, les notres sont le produit d'une quete collective — une methode, un ensemble de standards, et la volonte d'emmener le vin quelque part de nouveau. Notre coherence reside dans l'excellence de la quete, pas dans la repetition d'un style." },
    ],
  },
  {
    id: "price_objection", label: "SUR LE PRIX", title: "Quand le Prix est Questionne",
    body: [
      "Le prix ne se negocie jamais. On ne s'en excuse jamais. On ne le presente jamais comme cher par rapport a ce que c'est. Le prix signale la confiance. Reduire le prix pour entrer dans une conversation, meme dans le ton, signale le doute. Et le doute est la seule chose dont on ne se remet pas.",
      "La reponse correcte a une objection sur le prix est de rediriger vers l'architecture de valeur : les annees sur lies, le degorgement manuel, les volumes, la relation d'allocation. Si le prospect n'est pas encore pret a comprendre cela, ce n'est pas un echec. Toutes les conversations ne se terminent pas par une allocation. L'objectif est de laisser la porte ouverte, jamais de la fermer par compromis.",
      "Le prix ne s'explique pas par les couts. Il se comprend par l'architecture, la rarete, le temps, et la discipline.",
    ],
    ifUnsure: "Je prefere ne pas simplifier cette comparaison. Ce qui compte, c'est que Grande Charte est construite sur une premisse differente.",
    scenarios: [
      { trigger: "\"C'est tres cher pour un nom que je ne connais pas.\"", response: "C'est precisement le point de depart de la plupart de nos clients. Grande Charte n'est pas distribuee. Ce n'est pas un nom qu'on trouve sur une liste de restaurant ou dans une cave. On la decouvre par quelqu'un qui connait la Maison, et cette relation fait partie de ce que porte le flacon. Le vin a ete note 18/20 par Jancis Robinson et 95-97/100 par plusieurs Masters of Wine. La qualite a ete confirmee par ceux qui definissent les plus hauts standards. La reconnaissance viendra. La rarete ne sera pas fabriquee apres." },
    ],
  },
];

// ── MODULE V — EN ─────────────────────────────────────────────────────────────
const SECTIONS_EN_V = [
  {
    id: "custodians", label: "CUSTODIANS, NOT CLIENTS", title: "A Different Relationship",
    body: [
      "Grande Charte does not have clients. It has custodians. The distinction is not semantic. It is architectural. A client transacts. A custodian holds a fragment of the House's story.",
      "Each bottle carries a name, a date, a provenance, a trace of shared time. The allocation relationship is personal, ongoing, and built on introduction. There is no anonymous purchase. There is no retail path. Every bottle reaches the person it was intended for.",
      "Collectors and partners form a discreet network that extends from Reims to Paris, Monaco, Saint-Tropez, Vancouver, San Francisco, and Hong Kong. They are not brought together by marketing. They are brought together by a shared sensibility, a recognition that the experience of time in a glass is worth protecting.",
    ],
  },
  {
    id: "experience_forms", label: "FORMS OF ENCOUNTER", title: "How Grande Charte Is Discovered",
    body: [
      "Grande Charte was not conceived to be displayed, but to be discovered. Its presence reveals itself through encounters, private tastings, curated dinners, and conversations where wine, place, and people share the same rhythm.",
      "Each experience begins quietly. A few bottles, a few guests, a table where every detail, temperature, glass, light, is attuned to the frequency of time. No ritual is imposed; everything follows the calm flow of the wine itself.",
      "Grande Charte does not create events. It creates moments that cannot be repeated: where mastery becomes hospitality, and where the elegance of a gesture speaks louder than words.",
    ],
    facts: [
      { label: "Formats", value: "Private dinners · Confidential tastings · Curated encounters" },
      { label: "Presence", value: "Reims · Paris · Monaco · Saint-Tropez · Vancouver · San Francisco · Hong Kong" },
      { label: "Access philosophy", value: "Selective openness. Never exclusive by design." },
      { label: "Allocation model", value: "Personal, by introduction, numbered bottle" },
      { label: "Contact", value: "experience@grandecharte.com" },
    ],
  },
  {
    id: "allocation_ritual", label: "THE ALLOCATION RITUAL", title: "What Receiving a Bottle Means",
    body: [
      "The numbered bottle is not a commercial device. It is a commitment. Each number records a relationship: the name of the person who introduced, the occasion, the date. This is not traceability in the commercial sense. It is provenance in the human sense.",
      "When an allocation is made, it is accompanied by a personal letter from the House. Not a template, but a document that recognises the specific person, the specific cuvee, the specific moment. The Sormani allocation letter is the model: a reference to a precise encounter, a recognition of the person's discernment, an invitation to continue.",
      "The ambassador's role is to be the living extension of this ritual. To carry the same composure, the same attention, the same conviction that what is being shared is not a product, but a fragment of something larger.",
    ],
    quote: "Receiving a bottle means entering a relationship already shaped by time, provenance, and attention.",
    internalExternal: {
      internal: "Grande Charte does not think in terms of clients only. It thinks in terms of custodianship.",
      external: "Depending on context, use: collector, allocated client, private collector, long-term relation, or recipient of an allocation.",
    },
    allocationNote: "Allocation is not a distribution logic. It is a continuity logic. The House recognises and privileges depth of relationship over opportunistic circulation. A bottle can wait for the right moment. It never pursues one.",
  },
  {
    id: "ambassador_posture", label: "AMBASSADOR POSTURE", title: "You Are the First Experience",
    body: [
      "Before anyone has opened a bottle, they have met you. The first experience of Grande Charte is always the conversation. The way you speak, the register, the composure, the absence of promotional urgency, is the first proof that the House is what it claims to be.",
      "dor who is calm, precise, and unhurried creates desire. The difference between these two is doctrinal alignment: knowing what the House is, and inhabiting that knowledge without effort.",
      "You are not a salesperson. You are a custodian of the narrative. Every conversation you have either confirms the House's identity or dilutes it. There is no neutral register.",
    ],
  },
];

const SECTIONS_FR_V = [
  {
    id: "custodians", label: "ALLOCATAIRES, PAS CLIENTS", title: "Une Relation Differente",
    body: [
      "Grande Charte n'a pas de clients. Elle a des allocataires. La distinction n'est pas semantique. Elle est architecturale. Un client transacte. Un allocataire detient un fragment de l'histoire de la Maison.",
      "Chaque flacon porte un nom, une date, une provenance, une trace de temps partage. La relation d'allocation est personnelle, continue et construite sur l'introduction. Il n'y a pas d'achat anonyme. Il n'y a pas de voie de detail. Chaque flacon parvient a la personne a qui il etait destine.",
      "Collectionneurs et partenaires forment un reseau discret qui s'etend de Reims a Paris, Monaco, Saint-Tropez, Vancouver, San Francisco et Hong Kong. Ils ne sont pas reunis par le marketing. Ils le sont par une sensibilite partagee, la reconnaissance que l'experience du temps dans un verre vaut la peine d'etre protegee.",
    ],
  },
  {
    id: "experience_forms", label: "LES FORMES DE LA RENCONTRE", title: "Comment Grande Charte Se Decouvre",
    body: [
      "Grande Charte n'a pas ete concue pour etre exposee, mais pour etre decouverte. Sa presence se revele a travers des rencontres, des degustations privees, des diners soignes et des conversations ou le vin, le lieu et les personnes partagent le meme rythme.",
      "Chaque experience commence dans le calme. Quelques bouteilles, quelques invites, une table ou chaque detail, temperature, verre, lumiere, est accorde a la frequence du temps. Aucun rituel n'est impose ; tout suit le flux calme du vin lui-meme.",
      "Grande Charte ne cree pas d'evenements. Elle cree des moments qui ne peuvent pas se repeter : la ou la maitrise devient hospitalite, et ou l'elegance d'un geste parle plus fort que les mots.",
    ],
    facts: [
      { label: "Formats", value: "Diners prives · Degustations confidentielles · Rencontres soignees" },
      { label: "Presence", value: "Reims · Paris · Monaco · Saint-Tropez · Vancouver · San Francisco · Hong Kong" },
      { label: "Philosophie d'acces", value: "Ouverture selective. Jamais exclusive par conception." },
      { label: "Modele d'allocation", value: "Personnel, par introduction, flacon numerote" },
      { label: "Contact", value: "experience@grandecharte.com" },
    ],
  },
  {
    id: "allocation_ritual", label: "LE RITUEL D'ALLOCATION", title: "Ce que Recevoir un Flacon Signifie",
    body: [
      "Le flacon numerote n'est pas un dispositif commercial. C'est un engagement. Chaque numero enregistre une relation : le nom de la personne qui a introduit, l'occasion, la date. Ce n'est pas de la tracabilite au sens commercial. C'est de la provenance au sens humain.",
      "Quand une allocation est faite, elle s'accompagne d'une lettre personnelle de la Maison. Pas un modele, mais un document qui reconnait la personne specifique, la cuvee specifique, le moment specifique. La lettre d'allocation Sormani est le modele : une reference a une rencontre precise, une reconnaissance du discernement de la personne, une invitation a poursuivre.",
      "Le role de l'ambassadeur est d'etre le prolongement vivant de ce rituel. Porter le meme calme, la meme attention, la meme conviction que ce qui est partage n'est pas un produit, mais un fragment de quelque chose de plus grand.",
    ],
    quote: "Recevoir un flacon, c'est entrer dans une relation deja facionnee par le temps, la provenance et l'attention.",
    internalExternal: {
      internal: "Grande Charte ne pense pas uniquement en termes de clients. Elle pense en termes de garde.",
      external: "Selon le contexte, utilisez : collectionneur, allocataire, collectionneur prive, relation de long terme, ou destinataire d'une allocation.",
    },
    allocationNote: "L'allocation n'est pas une logique de distribution. C'est une logique de continuite. La Maison reconnait et privilegie la profondeur de la relation sur la circulation opportuniste. Un flacon peut attendre le bon moment. Il ne le recherche jamais.",
  },
  {
    id: "ambassador_posture", label: "POSTURE DE L'AMBASSADEUR", title: "Vous Etes la Premiere Experience",
    body: [
      "Avant que quiconque ait ouvert une bouteille, il vous a rencontre. La premiere experience de Grande Charte est toujours la conversation. La facon dont vous parlez, le registre, le calme, l'absence d'urgence promotionnelle, est la premiere preuve que la Maison est ce qu'elle pretend etre.",
      "Un ambassadeur incertain, defensif ou presse de vendre cree le doute avant meme qu'un bouchon soit tire. Un ambassadeur calme, precis et sans precipitation cree le desir. La difference entre les deux est l'alignement doctrinal. Savoir ce qu'est la Maison, et habiter cette connaissance sans effort.",
      "Vous n'etes pas un commercial. Vous etes un gardien du recit. Chaque conversation que vous avez confirme ou dilue l'identite de la Maison. Il n'existe pas de registre neutre.",
    ],
  },
];

// ── MODULE VI — EN ────────────────────────────────────────────────────────────
const SECTIONS_EN_VI = [
  {
    id: "philosophy", label: "THE INTERNATIONAL PHILOSOPHY", title: "Networks, Not Markets",
    body: [
      "Grande Charte does not enter markets. It cultivates networks. The distinction shapes everything: timeline, partner selection, and the nature of each relationship.",
      "A market approach assumes volume, distribution, and brand-building at scale. A network approach assumes relationships, introductions, and the slow accumulation of the right custodians in the right places. Grande Charte operates through the second model. Exclusively.",
      "Each network is a cluster, a constellation of custodians connected by shared sensibility, often connected to each other. A collector in one city knows a sommelier in another. The network is already one, even when it looks geographically dispersed.",
      "The House does not adapt its principles to local convenience. What changes is structure, legal framework, and rhythm. Never doctrine.",
    ],
    invariants: [
      "No regional reinterpretation of the House narrative is permitted.",
      "Growth follows structure, never the reverse.",
      "Territorial allocation is a system, not a favour. Bottles move according to doctrine, continuity, and structural coherence. Not opportunistic demand.",
    ],
    governanceNote: "This module is living content. Geographies, clusters and priorities must be reviewed regularly. Doctrine remains stable; deployment evolves.",
  },
  {
    id: "france", label: "FRANCE", title: "The Home Ground",
    body: [
      "Grande Charte is headquartered in Reims, in the heart of the Champagne region. This is where every cuvee is conceived, aged, disgorged, and numbered. Reims is not a production site. It is the origin.",
      "In France, the House is principally active in Paris, on the Cote d'Azur, in Saint-Tropez, and in Monaco. Collectors and partners form a discreet network anchored in these cities, where private tastings, curated dinners, and personal introductions define the rhythm of encounter.",
      "The French network is the founding circle. It is where the language of the House was first tested, where the first custodians received their numbered bottles, and where the standard for every international encounter was set.",
    ],
    facts: [
      { label: "Headquarters", value: "Reims, France" },
      { label: "Key presence", value: "Paris · Cote d'Azur · Saint-Tropez · Monaco" },
      { label: "Access model", value: "Private tastings, curated dinners, personal allocation" },
      { label: "Network character", value: "The founding circle: collectors, sommeliers, chefs" },
    ],
  },
  {
    id: "established", label: "ESTABLISHED NETWORKS", title: "Where the House Has Roots",
    body: [
      "Beyond France, Grande Charte has established networks in the United States and in Russia. These are the two earliest international territories where the House built lasting relationships.",
      "In the United States, the East Coast was the first point of entry, with New York as the historical anchor. More recently, the West Coast has become an active and sustained cluster, with San Francisco and Vancouver as principal points of encounter.",
      "In Russia, the House has a historical presence in Saint Petersburg and Moscow, built through early relationships with collectors and connoisseurs who recognised the Maison's vision from its earliest cuvees.",
    ],
    facts: [
      { label: "United States — East Coast", value: "New York (historical anchor)" },
      { label: "United States — West Coast", value: "San Francisco · Vancouver (active cluster)" },
      { label: "Russia", value: "Saint Petersburg · Moscow (historical presence)" },
    ],
  },
  {
    id: "developing", label: "DEVELOPING HORIZONS", title: "Where the House Is Growing",
    body: [
      "Grande Charte is expanding its international presence with the same deliberation that governed its growth in France. Several regions are in active development, with ongoing discussions and initial scouting operations led by the founding team.",
      "In Europe, Switzerland is an active territory, with Geneva and Courchevel as key points of encounter. Luxembourg represents an emerging presence with ambassadors in place. Portugal and Italy have seen initial operations, with further development ahead.",
      "In Asia-Pacific, Hong Kong holds a historical connection to the House. Discussions are underway to deepen this relationship. China and South Korea are territories under active exploration.",
      "In the Middle East, Dubai is a market of interest where initial conversations have begun. Each of these horizons follows the same founding principle: the House does not rush what requires patience. Every new presence begins with the right encounter, not the right contract.",
    ],
    facts: [
      { label: "Europe", value: "Switzerland (Geneva · Courchevel) · Luxembourg (emerging)" },
      { label: "Asia-Pacific", value: "Hong Kong (historical) · China · South Korea (exploring)" },
      { label: "Middle East", value: "Dubai (initial discussions)" },
      { label: "Guiding principle", value: "The House does not rush what requires patience" },
    ],
  },
  {
    id: "principles_intl", label: "PRINCIPLES THAT TRAVEL", title: "What Never Changes",
    body: [
      "Every geography is different. The custodians are different, the cultural register of luxury is different, the legal structure is different. What does not change: the wine, the pricing integrity, the allocation model, and the language of the House.",
      "Ambassadors and friends of the House who speak internationally carry the same responsibility as those in France. The risk of dilution is proportional to distance from the founding team. Every word spoken about Grande Charte in any city either reinforces or undermines the positioning built in Reims.",
      "Three principles are invariant across all geographies. Price is never reduced to enter a conversation or a market. Distribution is never offered, only allocation. The Iroise programme is never framed as a marketing initiative. In any language, in any context.",
    ],
    invariants: [
      "No regional reinterpretation of the House narrative is permitted.",
      "Growth follows structure, never the reverse.",
      "Territorial allocation is a system, not a favour. Bottles move according to doctrine, continuity, and structural coherence. Not opportunistic demand.",
    ],
    governanceNote: "This module is living content. Geographies, clusters and priorities must be reviewed regularly. Doctrine remains stable; deployment evolves.",
  },
];

const SECTIONS_FR_VI = [
  {
    id: "philosophy", label: "LA PHILOSOPHIE INTERNATIONALE", title: "Des Reseaux, Pas des Marches",
    body: [
      "Grande Charte n'entre pas sur des marches. Elle cultive des reseaux. La distinction faconne tout : calendrier, selection des partenaires et nature de chaque relation.",
      "Une approche de marche suppose du volume, de la distribution et de la construction de marque a l'echelle. Une approche reseau suppose des relations, des introductions et l'accumulation lente des bons allocataires aux bons endroits. Grande Charte opere selon le second modele. Exclusivement.",
      "Chaque reseau est un cluster, une constellation d'allocataires connectes par une sensibilite partagee, souvent connectes entre eux. Un collectionneur dans une ville connait un sommelier dans une autre. Le reseau est deja un, meme quand il semble geographiquement disperse.",
      "La Maison n'adapte pas ses principes aux convenances locales. Ce qui change d'une geographie a une autre, c'est la structure, le cadre juridique et le rythme. Jamais la doctrine.",
    ],
    invariants: [
      "Aucune reinterpretation regionale du recit de la Maison n'est autorisee.",
      "La croissance suit la structure, jamais l'inverse.",
      "L'allocation territoriale est un systeme, pas une faveur. Les flacons circulent selon la doctrine, la continuite et la coherence structurelle. Non selon la demande opportuniste.",
    ],
    governanceNote: "Ce module est un contenu vivant. Les geographies, clusters et priorites doivent etre revises regulierement. La doctrine reste stable ; le deploiement evolue.",
  },
  {
    id: "france", label: "FRANCE", title: "Le Territoire d'Origine",
    body: [
      "Grande Charte a son siege a Reims, au coeur de la Champagne. C'est la que chaque cuvee est concue, elevee, degorgee et numerotee. Reims n'est pas un site de production. C'est l'origine.",
      "En France, la Maison est principalement active a Paris, sur la Cote d'Azur, a Saint-Tropez et a Monaco. Collectionneurs et partenaires forment un reseau discret ancre dans ces villes, ou degustations privees, diners concertes et introductions personnelles definissent le rythme de la rencontre.",
      "Le reseau francais est le cercle fondateur. C'est la que le langage de la Maison a ete eprouve pour la premiere fois, que les premiers allocataires ont recu leurs flacons numerotes, et que le standard de chaque rencontre internationale a ete etabli.",
    ],
    facts: [
      { label: "Siege", value: "Reims, France" },
      { label: "Presence cle", value: "Paris · Cote d'Azur · Saint-Tropez · Monaco" },
      { label: "Modele d'acces", value: "Degustations privees, diners, allocation personnelle" },
      { label: "Caractere du reseau", value: "Le cercle fondateur : collectionneurs, sommeliers, chefs" },
    ],
  },
  {
    id: "established", label: "RESEAUX ETABLIS", title: "La ou la Maison a des Racines",
    body: [
      "Au-dela de la France, Grande Charte a etabli des reseaux aux Etats-Unis et en Russie. Ce sont les deux premiers territoires internationaux ou la Maison a construit des relations durables.",
      "Aux Etats-Unis, la Cote Est a ete le premier point d'entree, avec New York comme ancrage historique. Plus recemment, la Cote Ouest est devenue un cluster actif et soutenu, avec San Francisco et Vancouver comme principaux points de rencontre.",
      "En Russie, la Maison a une presence historique a Saint-Petersbourg et Moscou, construite a travers des relations precoces avec des collectionneurs et connaisseurs qui ont reconnu la vision de la Maison des ses premieres cuvees.",
    ],
    facts: [
      { label: "Etats-Unis — Cote Est", value: "New York (ancrage historique)" },
      { label: "Etats-Unis — Cote Ouest", value: "San Francisco · Vancouver (cluster actif)" },
      { label: "Russie", value: "Saint-Petersbourg · Moscou (presence historique)" },
    ],
  },
  {
    id: "developing", label: "HORIZONS EN DEVELOPPEMENT", title: "La ou la Maison Grandit",
    body: [
      "Grande Charte etend sa presence internationale avec la meme deliberation qui a guide sa croissance en France. Plusieurs regions sont en developpement actif, avec des discussions en cours et des operations de reconnaissance initiees par l'equipe fondatrice.",
      "En Europe, la Suisse est un territoire actif, avec Geneve et Courchevel comme points de rencontre cles. Le Luxembourg represente une presence emergente avec des ambassadeurs en place.",
      "En Asie-Pacifique, Hong Kong entretient un lien historique avec la Maison. Des discussions sont en cours pour approfondir cette relation. La Chine et la Coree du Sud sont des territoires en exploration active.",
      "Au Moyen-Orient, Dubai est un marche d'interet ou des conversations initiales ont commence. Chacun de ces horizons suit le meme principe fondateur : la Maison ne precipite pas ce qui demande de la patience.",
    ],
    facts: [
      { label: "Europe", value: "Suisse (Geneve · Courchevel) · Luxembourg (emergent)" },
      { label: "Asie-Pacifique", value: "Hong Kong (historique) · Chine · Coree du Sud (exploration)" },
      { label: "Moyen-Orient", value: "Dubai (discussions initiales)" },
      { label: "Principe directeur", value: "La Maison ne precipite pas ce qui demande de la patience" },
    ],
  },
  {
    id: "principles_intl", label: "PRINCIPES INVARIANTS", title: "Ce Qui Ne Change Jamais",
    body: [
      "Chaque geographie est differente. Les allocataires sont differents, le registre culturel du luxe est different, la structure legale est differente. Ce qui ne change pas : le vin, l'integrite du prix, le modele d'allocation et le langage de la Maison.",
      "Les ambassadeurs et amis de la Maison qui s'expriment a l'international portent la meme responsabilite que ceux en France. Le risque de dilution est proportionnel a la distance avec l'equipe fondatrice. Chaque mot prononce sur Grande Charte dans n'importe quelle ville renforce ou sape le positionnement construit a Reims.",
      "Trois principes sont invariants dans toutes les geographies. Le prix ne se reduit jamais pour entrer dans une conversation ou sur un marche. La distribution ne s'offre jamais, seulement l'allocation. Le programme Iroise ne se presente jamais comme une initiative marketing. Dans aucune langue, dans aucun contexte.",
    ],
    invariants: [
      "Aucune reinterpretation regionale du recit de la Maison n'est permise.",
      "La croissance suit la structure, jamais l'inverse.",
      "L'allocation territoriale est un systeme, non une faveur. Les bouteilles circulent selon la doctrine, la continuite et la coherence structurelle. Non selon la demande opportuniste.",
    ],
    governanceNote: "Ce module est un contenu vivant. Les geographies, clusters et priorites doivent etre revises regulierement. La doctrine reste stable ; le deploiement evolue.",
  },
];

// ── QUIZZES ───────────────────────────────────────────────────────────────────
// Each quiz: 3 standard MCQ + 1 scenario question (type: "scenario")
const QUIZ_EN_I = {
  title: "Verification · Module I",
  questions: [
    { q: "Which of the following is NOT one of Grande Charte's three founding pillars?", opts: ["Freedom", "Time", "Audacity", "Excellence"], a: 3, exp: "The three pillars are Freedom, Time, and Audacity, in that exact order. Excellence is not a pillar. The House avoids generic luxury vocabulary that could belong to any brand." },
    { q: "What does Haute Maitrise mean for Grande Charte?", opts: ["High visibility in prestige markets", "The oldest winemaking tradition in Champagne", "Mastery guided by conscience: exactitude over expansion", "A method involving underwater aging"], a: 2, exp: "Haute Maitrise defines the House's position: guided by mastery, not ambition. Its horizon is exactitude, not expansion. The refusal to add anything unnecessary." },
    { q: "Which word must never be used to describe Grande Charte?", opts: ["Maison de Haute Maitrise", "Rebel or Rebellion", "Connects the old and new ways", "A living discipline"], a: 1, exp: "Grande Charte does not identify as rebel. Hugues: 'I belong to the warrior who connects the old and the new ways.' Rebellion implies rupture. The House practises continuity with audacity." },
    { type: "scenario", q: "A sommelier at a three-star restaurant says: 'I'm not familiar with Grande Charte. Why should I be?' How do you respond?", rubric: [
      "Begin by affirming the House, not defending it. The correct posture is calm, inhabited. Not persuasive.",
      "Reference concrete facts: founded 2010, NM recognition 2018, 100% organic, under 20,000 bottles since founding. Numbers carry authority.",
      "Do not mention competitors. Do not offer a discount or a tasting as a sales pitch. Offer a conversation.",
      "Model answer: Grande Charte is among the youngest houses in Champagne, and among the rarest. Fewer than 20,000 bottles have been produced since founding. The wine has been reviewed at 18/20 by Jancis Robinson. I would be glad to share a bottle when the moment is right.",
    ]},
  ],
};

const QUIZ_FR_I = {
  title: "Verification · Module I",
  questions: [
    { q: "Lequel de ces mots N'est PAS l'un des trois piliers fondateurs ?", opts: ["Liberte", "Temps", "Audace", "Excellence"], a: 3, exp: "Les trois piliers sont Liberte, Temps et Audace, dans cet ordre exact. L'excellence n'est pas un pilier. La Maison evite le vocabulaire generique du luxe qui pourrait appartenir a n'importe quelle marque." },
    { q: "Que signifie Haute Maitrise pour Grande Charte ?", opts: ["Une forte visibilite prestige", "La plus ancienne tradition de Champagne", "La maitrise guidee par la conscience : l'exactitude avant l'expansion", "Une methode incluant le vieillissement sous-marin"], a: 2, exp: "La Haute Maitrise definit la position de la Maison : guidee par la maitrise, non l'ambition. Son horizon est l'exactitude, non l'expansion." },
    { q: "Quel mot ne doit jamais etre utilise pour decrire Grande Charte ?", opts: ["Maison de Haute Maitrise", "Rebelle ou Rebellion", "Relie les anciennes et nouvelles voies", "Une discipline vivante"], a: 1, exp: "Grande Charte ne s'identifie pas comme rebelle. Comme l'a exprime Hugues : 'J'appartiens au guerrier qui a su relier les anciennes et les nouvelles voies.' La Maison pratique la continuite avec audace." },
    { type: "scenario", q: "Un sommelier d'un restaurant trois etoiles dit : 'Je ne connais pas Grande Charte. Pourquoi devrais-je m'y interesser ?' Comment repondez-vous ?", rubric: [
      "Commencer par affirmer la Maison, pas la defendre. La posture correcte est calme, habitee. Pas persuasive.",
      "Citer des faits concrets : fondee en 2010, reconnaissance NM 2018, 100% biologique, moins de 20 000 flacons depuis la creation. Les chiffres portent l'autorite.",
      "Ne pas mentionner de concurrents. Ne pas proposer une remise ou une degustation comme argument commercial. Proposer une conversation.",
      "Reponse modele : Grande Charte est l'une des maisons les plus jeunes de Champagne, et parmi les plus rares. Moins de 20 000 flacons ont ete produits depuis la creation. Le vin a ete note 18/20 par Jancis Robinson. Je serais heureux de partager une bouteille quand le moment sera juste.",
    ]},
  ],
};

const QUIZ_EN_II = {
  title: "Verification · Module II",
  questions: [
    { q: "What is the defining principle of the GC-5 collection?", opts: ["Monochromatic exploration", "Architecture of balance: assemblage and dosage", "Underwater aging and renewed texture", "Single-varietal purity"], a: 1, exp: "GC-5 is the founding collection, defined by the architecture of balance. The meeting point between assemblage and dosage, the two gestures that shape Champagne." },
    { q: "How long were the Iroise 769 bottles immersed at sea?", opts: ["365 days", "500 days", "769 days", "1,000 days"], a: 2, exp: "769 days, approximately 2 years and 1 week, at 60 metres depth in the Sea of Iroise, off the island of Ouessant, at a constant pressure of approximately 6 bar." },
    { q: "Which cuvee in the GC-4 collection was aged 24 years on lees?", opts: ["Millesime 2000", "Blanc de Noirs", "Alba 18", "Rose"], a: 0, exp: "The GC-4 Millesime 2000, 100% Chardonnay, Blanc de Blancs, was bottled in 2001 and disgorged in September 2024: 24 years on lees. A wine of serene maturity and graceful tension." },
    { type: "scenario", q: "A collector asks you to describe the difference between GC-5 and GC-4 in your own words. They are familiar with Champagne. What do you say?", rubric: [
      "Use the correct lexical registers for each collection. No shared vocabulary.",
      "GC-5: architecture of balance, the meeting point of assemblage and dosage, geometry of calm. Do not use words like 'deep' or 'intense'.",
      "GC-4: monochromatic exploration, one tonal universe expressed four ways, depth without excess, maturity without weight. Do not use 'bold' or 'rich'.",
      "Model answer: GC-5 was a study in balance: how assemblage and dosage, the two defining gestures of Champagne, can be pushed toward their precise meeting point. GC-4 asked a different question: whether a single tonal horizon, monochromatic by intention, could sustain four distinct expressions without losing its truth. Each collection has its own language. They do not share vocabulary.",
    ]},
  ],
};

const QUIZ_FR_II = {
  title: "Verification · Module II",
  questions: [
    { q: "Quel est le principe definissant la collection GC-5 ?", opts: ["Exploration monochromatique", "Architecture d'equilibre : assemblage et dosage", "Vieillissement sous-marin et texture renouvelee", "Purete d'un cepage unique"], a: 1, exp: "GC-5 est la collection fondatrice, definie par l'architecture de l'equilibre. Le point de rencontre entre l'assemblage et le dosage, les deux gestes qui faconnent le Champagne." },
    { q: "Combien de jours les flacons Iroise 769 ont-ils ete immerges ?", opts: ["365 jours", "500 jours", "769 jours", "1 000 jours"], a: 2, exp: "769 jours, environ 2 ans et 1 semaine, a 60 metres de profondeur dans la Mer d'Iroise, au large de l'ile d'Ouessant, a une pression constante d'environ 6 bars." },
    { q: "Quelle cuvee de la collection GC-4 a vieilli 24 ans sur lies ?", opts: ["Millesime 2000", "Blanc de Noirs", "Alba 18", "Rose"], a: 0, exp: "Le GC-4 Millesime 2000, 100% Chardonnay, Blanc de Blancs, mis en bouteille en 2001 et degorge en septembre 2024 : 24 ans sur lies. Un vin de maturite sereine et de tension gracieuse." },
    { type: "scenario", q: "Un collectionneur vous demande de decrire en vos propres mots la difference entre GC-5 et GC-4. Il connait bien le Champagne. Que dites-vous ?", rubric: [
      "Utiliser les registres lexicaux corrects pour chaque collection. Pas de vocabulaire partage.",
      "GC-5 : architecture d'equilibre, le point de rencontre de l'assemblage et du dosage, geometrie du calme. Ne pas utiliser 'profond' ou 'intense'.",
      "GC-4 : exploration monochromatique, un univers tonal exprime de quatre facons, profondeur sans exces, maturite sans poids. Ne pas utiliser 'puissant' ou 'riche'.",
      "Reponse modele : GC-5 etait une etude de l'equilibre : comment l'assemblage et le dosage, les deux gestes definitoires du Champagne, peuvent etre pousses vers leur point de rencontre precis. GC-4 posait une question differente : si un seul horizon tonal, monochromatique par intention, pouvait soutenir quatre expressions distinctes sans perdre sa verite. Chaque collection a son propre langage. Elles ne partagent pas de vocabulaire.",
    ]},
  ],
};

const QUIZ_EN_III = {
  title: "Verification · Module III",
  questions: [
    { q: "Why does the 6-bar pressure equilibrium matter for Iroise?", opts: ["It accelerates the wine's aging", "It prevents the cork from moving", "External and internal pressures are equal. The bottle floats in balance, neither compressed nor released", "It replicates the pressure of a Champagne cellar"], a: 2, exp: "At 60m, external pressure is approximately 6 bar, the same as internal Champagne pressure. This equilibrium is unique to Champagne among all wines and is precisely why the immersion works as it does." },
    { q: "Which phrase belongs to Iroise's lexical register?", opts: ["Suspended evolution", "Architecture of balance", "Monochromatic exploration", "Equilibrium of assemblage"], a: 0, exp: "Suspended evolution belongs to Iroise 769. Architecture of balance is GC-5. Monochromatic exploration is GC-4. Each collection must have its own vocabulary. Using shared terms erases what makes each necessary." },
    { q: "How should you introduce Iroise in a conversation with a new prospect?", opts: ["Lead with it, it is the most powerful element", "Introduce it after establishing the House's identity and collection architecture", "Mention it only if the prospect asks about underwater aging", "Present it as the House's most exclusive product"], a: 1, exp: "Iroise should be earned — the reward of attention, not the opening gambit. The client must first understand what Grande Charte is before you introduce what it dares." },
    { type: "scenario", q: "A well-known wine journalist asks to interview you about Iroise for a feature on 'the trend of underwater wine.' How do you handle this?", rubric: [
      "Do not accept the framing. 'Underwater wine' and 'trend' are both terms the House does not use. Acknowledge graciously, then reframe.",
      "Iroise is not a trend. It is a singular, unrepeated practice rooted in a specific place, a specific intuition, and a specific physical condition. It precedes any trend.",
      "Offer the journalist a different framing: not trend, but new dimension of maturation. Not underwater wine, but wine that matured in a natural cellar beyond human control.",
      "Model answer: We're glad to discuss Iroise, though we'd gently push back on the framing. The Sea of Iroise is not a trend. Grande Charte is not in the business of trends. What happened there is a singular act of maturation, born of an intuition rather than a strategy. We'd be happy to discuss the physics, the sensory results, and the philosophy behind it.",
    ]},
  ],
};

const QUIZ_FR_III = {
  title: "Verification · Module III",
  questions: [
    { q: "Pourquoi l'equilibre de pression a 6 bars est-il crucial pour Iroise ?", opts: ["Il accelere le vieillissement du vin", "Il empeche le bouchon de bouger", "Les pressions externe et interne sont egales — la bouteille flotte en equilibre, ni compressee ni relachee", "Il reproduit la pression d'une cave champenoise"], a: 2, exp: "A 60 m, la pression externe est d'environ 6 bars — identique a la pression interne d'un Champagne. Cet equilibre est unique au Champagne parmi tous les vins et c'est precisement pourquoi l'immersion fonctionne." },
    { q: "Quelle formulation appartient au registre lexical d'Iroise ?", opts: ["Evolution suspendue", "Architecture d'equilibre", "Exploration monochromatique", "Equilibre de l'assemblage"], a: 0, exp: "Evolution suspendue appartient a Iroise 769. Architecture d'equilibre est GC-5. Exploration monochromatique est GC-4. Chaque collection doit avoir son propre vocabulaire." },
    { q: "Comment introduire Iroise dans une conversation avec un prospect ?", opts: ["En premier : c'est l'element le plus puissant", "Apres avoir etabli l'identite de la Maison et l'architecture des collections", "Seulement si le prospect pose des questions sur le vieillissement sous-marin", "Comme le produit le plus exclusif de la Maison"], a: 1, exp: "Iroise se merite — recompense de l'attention, pas argument d'ouverture. Le client doit d'abord comprendre ce qu'est Grande Charte avant qu'on lui montre ce qu'elle ose." },
    { type: "scenario", q: "Un journaliste viticole connu souhaite vous interviewer sur Iroise pour un article sur 'la tendance du vin sous-marin'. Comment gerez-vous cela ?", rubric: [
      "Ne pas accepter le cadrage. 'Vin sous-marin' et 'tendance' sont des termes que la Maison n'utilise pas. Reconnaitre gracieusement, puis recadrer.",
      "Iroise n'est pas une tendance. C'est une pratique singuliere, non repetee, ancree dans un lieu specifique, une intuition specifique et une condition physique specifique.",
      "Proposer au journaliste un cadrage different : non pas tendance, mais nouvelle dimension de maturation. Non pas vin sous-marin, mais vin qui a muri dans une cave naturelle au-dela du controle humain.",
      "Reponse modele : Nous sommes heureux de parler d'Iroise, bien que nous resistions doucement au cadrage. La Mer d'Iroise n'est pas une tendance — et Grande Charte n'est pas dans le metier des tendances. Ce qui s'y est passe est un acte singulier de maturation, ne d'une intuition plutot que d'une strategie.",
    ]},
  ],
};

const QUIZ_EN_IV = {
  title: "Verification · Module IV",
  questions: [
    { q: "A prospect says: 'I already drink Salon — what's different?' The correct first move is:", opts: ["Explain that Grande Charte has received better scores", "Ask what they don't like about Salon", "Describe the Iroise program immediately", "Acknowledge Salon with full respect, then articulate the difference through discovery, not competition"], a: 3, exp: "Grande Charte does not argue. Acknowledge Salon's stature sincerely, then redirect: What they do, they do once, and repeat perfectly. What we do is different — each cuvee is a different answer to the same question. Discovery, not displacement." },
    { q: "A client questions the price. The correct response is:", opts: ["Redirect to value architecture: years on lees, manual disgorgement, allocation relationship, critical recognition", "Offer a smaller format at a lower price point", "Explain that the price reflects production costs", "Ask what budget they have in mind"], a: 0, exp: "Price is never negotiated, apologised for, or explained through cost. Redirect to value: the years, the method, the relationship, the confirmed quality. The goal is to reframe the question, not answer it defensively." },
    { q: "Which sentence correctly describes Grande Charte's distribution model?", opts: ["Grande Charte is available in select fine wine retailers globally", "Grande Charte uses a luxury importer network in each market", "Grande Charte is not distributed — it is allocated, by introduction, one relationship at a time", "Grande Charte sells directly through its website"], a: 2, exp: "Grande Charte is not distributed. It is allocated. There is no retail path. Each bottle reaches a custodian through a relationship with the House, by introduction. This is not a commercial constraint — it is an architectural choice." },
    { type: "scenario", q: "A high-net-worth prospect says: 'I like your story, but I could get a case of Krug for the same money and everyone would know what it is.' How do you respond?", rubric: [
      "Do not become defensive or dismissive. Acknowledge Krug's status with sincerity.",
      "The response must redirect to what Grande Charte uniquely offers. Not a counter-argument, but a reframing.",
      "Key points: allocation vs. distribution; a bottle of GC-4 cannot be found, it is received; Krug is known, Grande Charte is discovered.",
      "Model answer: Krug is extraordinary, and we have great respect for what they do. But what you are describing is a different kind of possession. A case of Krug can be sourced by anyone who knows where to look. A bottle of GC-4 is not purchased. It is received, numbered, through a relationship with the House. For many of our custodians, that distinction is precisely what they are looking for.",
    ]},
  ],
};

const QUIZ_FR_IV = {
  title: "Verification · Module IV",
  questions: [
    { q: "Un prospect dit : 'Je bois deja du Salon — quelle est la difference ?' Le premier mouvement correct est :", opts: ["Expliquer que Grande Charte a recu de meilleures notes", "Demander ce qu'il n'aime pas chez Salon", "Decrire immediatement le programme Iroise", "Reconnaitre Salon avec plein respect, puis articuler la difference par la decouverte, non la competition"], a: 3, exp: "Grande Charte n'argumente pas. Reconnaitre le prestige de Salon sincerement, puis recadrer : Ce qu'ils font, ils le font parfaitement et de facon repetee. Ce que nous faisons est different. Chaque cuvee est une reponse differente a la meme question." },
    { q: "Un client questionne le prix. La reponse correcte est :", opts: ["Rediriger vers l'architecture de valeur : annees sur lies, degorgement manuel, relation d'allocation, reconnaissance critique", "Proposer un format plus petit a un prix inferieur", "Expliquer que le prix reflete les couts de production", "Demander quel budget ils ont en tete"], a: 0, exp: "Le prix ne se negocie jamais, ne s'excuse jamais, ne s'explique jamais par les couts. Rediriger vers la valeur — les annees, la methode, la relation, la qualite confirmee." },
    { q: "Quelle phrase decrit correctement le modele de distribution de Grande Charte ?", opts: ["Grande Charte est disponible dans une selection de cavistes haut de gamme dans le monde", "Grande Charte utilise un reseau d'importateurs luxe dans chaque marche", "Grande Charte n'est pas distribuee — elle est allouee, par introduction, une relation a la fois", "Grande Charte vend directement via son site web"], a: 2, exp: "Grande Charte n'est pas distribuee. Elle est allouee. Il n'existe pas de voie de detail. Chaque flacon parvient a un allocataire par une relation avec la Maison, par introduction." },
    { type: "scenario", q: "Un prospect UHNWI dit : 'J'aime votre histoire, mais je pourrais avoir une caisse de Krug pour le meme prix et tout le monde saurait ce que c'est.' Comment repondez-vous ?", rubric: [
      "Ne pas devenir defensif ou condescendant. Reconnaitre le statut de Krug avec sincerite.",
      "La reponse doit recadrer vers ce que Grande Charte offre uniquement. Pas un contre-argument, mais un recadrage.",
      "Points cles : allocation vs. distribution ; une bouteille de GC-4 ne s'achete pas. Elle se recoit ; Krug se connait, Grande Charte se decouvre.",
      "Reponse modele : Krug est extraordinaire, et nous avons un grand respect pour ce qu'ils font. Mais ce que vous decrivez est une forme de possession differente. Une caisse de Krug peut etre sourcee par quiconque sait ou chercher. Une bouteille de GC-4 ne s'achete pas. Elle se recoit, numerotee, par une relation avec la Maison. Pour beaucoup de nos allocataires, cette distinction est precisement ce qu'ils recherchent.",
    ]},
  ],
};

const QUIZ_EN_V = {
  title: "Verification · Module V",
  questions: [
    { q: "What is the correct term for a Grande Charte client?", opts: ["Custodian", "Client", "VIP customer", "Subscriber"], a: 0, exp: "A custodian holds a fragment of the House's story. The distinction is architectural, not semantic. A client transacts. A custodian enters into a relationship with a provenance, a number, a shared moment in time." },
    { q: "What does a numbered bottle represent in the Grande Charte model?", opts: ["A certificate of authenticity for resale", "A commercial device to justify premium pricing", "A commitment — recording a relationship, a name, an introduction, a date", "A collector's item for investment"], a: 2, exp: "The numbered bottle records a relationship, not a transaction. Each number carries the name of the introducer, the occasion, the date. This is provenance in the human sense — not traceability in the commercial sense." },
    { q: "Which phrase best describes Grande Charte's approach to events and tastings?", opts: ["Large-scale launch events to build brand awareness", "Branded pop-ups at luxury hotels and airports", "Sommelier competitions with critical press attendance", "Curated dinners and private encounters where no ritual is imposed — everything follows the wine's own rhythm"], a: 3, exp: "Grande Charte does not create events. It creates moments that cannot be repeated. No theatrical ritual. No imposed format. The experience follows the calm flow of the wine itself." },
    { type: "scenario", q: "A custodian contacts you to say they have seen a bottle of GC-4 listed on a secondary market platform. They seem uncertain whether to raise it with the House. How do you respond?", rubric: [
      "Thank them for telling you. This is precisely the kind of information the House needs to receive.",
      "Do not express alarm or alarm them. Remain composed.",
      "The House will verify. Secondary market activity is noted and tracked in terms of provenance. It does not diminish the bottle's integrity, but it does break the allocation chain.",
      "Model answer: Thank you for sharing this. It matters to us, and we are glad you reached out. Please send me the link. The House will verify and address it through the appropriate channels. What you've done is exactly what we hope our custodians will do: protect the integrity of the provenance, quietly and directly.",
    ]},
  ],
};

const QUIZ_FR_V = {
  title: "Verification · Module V",
  questions: [
    { q: "Quel est le terme correct pour designer un client de Grande Charte ?", opts: ["Allocataire", "Client", "Client VIP", "Abonne"], a: 0, exp: "Un allocataire detient un fragment de l'histoire de la Maison. La distinction est architecturale, pas semantique. Un client transacte. Un allocataire entre dans une relation avec une provenance, un numero, un moment partage dans le temps." },
    { q: "Que represente un flacon numerote dans le modele Grande Charte ?", opts: ["Un certificat d'authenticite pour la revente", "Un dispositif commercial pour justifier un prix premium", "Un engagement — enregistrant une relation, un nom, une introduction, une date", "Un objet de collection pour l'investissement"], a: 2, exp: "Le flacon numerote enregistre une relation, pas une transaction. Chaque numero porte le nom de l'introducteur, l'occasion, la date. C'est de la provenance au sens humain — pas de la tracabilite au sens commercial." },
    { q: "Quelle phrase decrit le mieux l'approche de Grande Charte en matiere d'evenements ?", opts: ["Grands evenements de lancement pour construire la notoriete", "Pop-ups de marque dans des hotels et aeroports de luxe", "Concours de sommeliers avec presence de la presse critique", "Diners soignes et rencontres privees ou aucun rituel n'est impose — tout suit le rythme propre du vin"], a: 3, exp: "Grande Charte ne cree pas d'evenements. Elle cree des moments qui ne peuvent pas se repeter. Aucun rituel theatral. Aucun format impose." },
    { type: "scenario", q: "Un allocataire vous contacte pour vous dire qu'il a vu une bouteille de GC-4 listee sur une plateforme de marche secondaire. Il semble incertain quant a l'opportunite d'en informer la Maison. Comment repondez-vous ?", rubric: [
      "Le remercier de vous en informer. C'est exactement le type d'information que la Maison a besoin de recevoir.",
      "Ne pas exprimer d'alarme ni l'alarmer. Rester compose.",
      "La Maison verifiera. L'activite sur le marche secondaire est notee et tracee en termes de provenance. Cela ne diminue pas l'integrite de la bouteille, mais cela rompt la chaine d'allocation.",
      "Reponse modele : Merci de nous en informer. Cela nous importe. Nous sommes heureux que vous ayez pris contact. Envoyez-moi le lien. La Maison verifiera et reglera cela par les canaux appropries. Ce que vous avez fait est exactement ce que nous esperons de nos allocataires : proteger l'integrite de la provenance, silencieusement et directement.",
    ]},
  ],
};

const QUIZ_EN_VI = {
  title: "Verification · Module VI",
  questions: [
    { q: "What is the correct description of Grande Charte's international model?", opts: ["Market entry through luxury distributors in each country", "Cluster-based network cultivation — relationships, introductions, selected custodians", "National brand-building campaigns targeted at affluent consumers", "Wholesale agreements with hotel and restaurant groups"], a: 1, exp: "Grande Charte does not enter markets. It cultivates networks — clusters of custodians connected by shared sensibility. The introduction is the currency. Volume follows relationships, not the reverse." },
    { q: "Which three principles are invariant across all geographies?", opts: ["Volume targets, brand campaigns, retail presence", "Price is never reduced, distribution is never offered (only allocation), and Iroise is never framed as a marketing initiative", "Local pricing adaptation, importer-led distribution, social media visibility", "Seasonal promotions, multi-channel distribution, event sponsorship"], a: 1, exp: "These three principles travel without adjustment. They are the doctrinal foundation of every international encounter. Any deviation from these principles dilutes the House." },
    { q: "A prospect asks if Grande Charte plans to open a boutique or retail point in their city. The response is:", opts: ["We are exploring several retail partnerships in the region", "Our wines are available through selected importers in your country", "Grande Charte is not visited, it is encountered. Our wines are discovered through private tastings and personal introductions, never through retail.", "We are considering a flagship concept for international markets"], a: 2, exp: "The House does not open boutiques or pursue retail visibility. Its presence reveals itself through encounters: private tastings, curated dinners, and conversations where wine, place, and people share the same rhythm." },
    { type: "scenario", q: "A potential importer in South Korea says: 'I love the concept. I can distribute this to 50 top restaurants in Seoul within 6 months. What terms can we discuss?' How do you respond?", rubric: [
      "Do not say yes or no immediately. Recognise the interest with composure.",
      "The word 'distribute' is not aligned with the House's model. Grande Charte allocates. It does not distribute.",
      "50 restaurants in 6 months is a volume approach. The House's model is cluster-based: the right custodians, introduced deliberately, over time.",
      "Model answer: We're glad the House resonates with you. The model we work through is different from distribution, and deliberately so. Grande Charte allocates. Each bottle reaches a custodian through a personal introduction. What we'd be interested in discussing is a cluster of the right people in Seoul: a private collector, a chef who understands time in a glass, perhaps a sommelier with a strong following. That is where we would begin. Let's take the time to understand who those people are.",
    ]},
  ],
};

const QUIZ_FR_VI = {
  title: "Verification · Module VI",
  questions: [
    { q: "Quelle est la description correcte du modele international de Grande Charte ?", opts: ["Entree sur les marches via des distributeurs luxe dans chaque pays", "Cultivation de reseaux en clusters — relations, introductions, allocataires selectionnes", "Campagnes nationales de construction de marque ciblant les consommateurs aises", "Accords de gros avec des groupes hoteliers et de restauration"], a: 1, exp: "Grande Charte n'entre pas sur des marches. Elle cultive des reseaux — des clusters d'allocataires connectes par une sensibilite partagee. L'introduction est la monnaie. Le volume suit les relations, pas l'inverse." },
    { q: "Quels sont les trois principes invariants dans toutes les geographies ?", opts: ["Objectifs de volume, campagnes de marque, presence retail", "Le prix ne se reduit jamais, la distribution ne s'offre jamais (seulement l'allocation), et Iroise ne se presente jamais comme une initiative marketing", "Adaptation locale des prix, distribution par importateurs, visibilite reseaux sociaux", "Promotions saisonnieres, distribution multicanal, sponsoring d'evenements"], a: 1, exp: "Ces trois principes voyagent sans ajustement. Ils sont le socle doctrinal de chaque rencontre internationale. Toute deviation de ces principes dilue la Maison." },
    { q: "Un prospect demande si Grande Charte prevoit d'ouvrir une boutique dans sa ville. La reponse est :", opts: ["Nous explorons plusieurs partenariats retail dans la region", "Nos vins sont disponibles via des importateurs selectionnes dans votre pays", "Grande Charte ne se visite pas, elle se rencontre. Nos vins se decouvrent lors de degustations privees et d'introductions personnelles, jamais en boutique.", "Nous envisageons un concept flagship pour les marches internationaux"], a: 2, exp: "La Maison n'ouvre pas de boutiques et ne recherche pas la visibilite retail. Sa presence se revele a travers des rencontres — degustations privees, diners et conversations ou le vin, le lieu et les personnes partagent le meme rythme." },
    { type: "scenario", q: "Un importateur potentiel en Coree du Sud dit : 'J'adore le concept. Je peux distribuer cela dans 50 grands restaurants de Seoul en 6 mois. Quelles conditions peut-on discuter ?' Comment repondez-vous ?", rubric: [
      "Ne pas dire oui ou non immediatement. Reconnaitre l'interet avec calme.",
      "Le mot 'distribuer' n'est pas aligne avec le modele de la Maison. Grande Charte alloue. Elle ne distribue pas.",
      "50 restaurants en 6 mois est une approche de volume. Le modele de la Maison est base sur les clusters : les bons allocataires, introduits deliberement, dans le temps.",
      "Reponse modele : Nous sommes heureux que la Maison vous parle. Le modele que nous utilisons est different de la distribution, et deliberement. Grande Charte alloue — chaque flacon parvient a un allocataire par une introduction personnelle. Ce qui nous interesserait de discuter, c'est un cluster des bonnes personnes a Seoul : un collectionneur prive, un chef qui comprend le temps dans un verre, peut-etre un sommelier avec une forte notoriete. C'est la que nous commencerions. Prenons le temps de comprendre qui sont ces personnes.",
    ]},
  ],
};

// ── MODULES FUNCTION ──────────────────────────────────────────────────────────
function MODULES(lang) {
  const L = lang === "en";
  return [
    {
      number: "I",
      label: L ? "Origin & Doctrine" : "Origine et Doctrine",
      sections: L ? SECTIONS_EN_I : SECTIONS_FR_I,
      quiz: L ? QUIZ_EN_I : QUIZ_FR_I,
    },
    {
      number: "II",
      label: L ? "The Collections" : "Les Collections",
      sections: L ? SECTIONS_EN_II : SECTIONS_FR_II,
      quiz: L ? QUIZ_EN_II : QUIZ_FR_II,
    },
    {
      number: "III",
      label: L ? "Iroise 769 — In Depth" : "Iroise 769 — En Profondeur",
      sections: L ? SECTIONS_EN_III : SECTIONS_FR_III,
      quiz: L ? QUIZ_EN_III : QUIZ_FR_III,
    },
    {
      number: "IV",
      label: L ? "The Conversation" : "La Conversation",
      sections: L ? SECTIONS_EN_IV : SECTIONS_FR_IV,
      quiz: L ? QUIZ_EN_IV : QUIZ_FR_IV,
    },
    {
      number: "V",
      label: L ? "Custodians & Experience" : "Allocataires et Experience",
      sections: L ? SECTIONS_EN_V : SECTIONS_FR_V,
      quiz: L ? QUIZ_EN_V : QUIZ_FR_V,
    },
    {
      number: "VI",
      label: L ? "International Presence" : "Presence Internationale",
      sections: L ? SECTIONS_EN_VI : SECTIONS_FR_VI,
      quiz: L ? QUIZ_EN_VI : QUIZ_FR_VI,
    },
  ];
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function GCTraining() {
  const [lang, setLang]                   = useState("en");
  const [screen, setScreen]               = useState("home"); // home | prologue | module | quiz | result | finale
  const [moduleIdx, setModuleIdx]         = useState(0);
  const [sectionIdx, setSectionIdx]       = useState(0);
  const [openPillar, setOpenPillar]       = useState(null);
  const [openCuvee, setOpenCuvee]         = useState(null);
  const [openScenario, setOpenScenario]   = useState(null);
  const [quizIdx, setQuizIdx]             = useState(0);
  const [selected, setSelected]           = useState(null);
  const [confirmed, setConfirmed]         = useState(false);
  const [score, setScore]                 = useState(0);
  const [answers, setAnswers]             = useState([]);
  const [completedModules, setCompletedModules] = useState([]);
  const [showRubric, setShowRubric]       = useState(false);

  const L = lang === "en";
  const modules = MODULES(lang);
  const mod = modules[moduleIdx];
  const sections = mod.sections;
  const section = sections[sectionIdx];
  const quiz = mod.quiz;
  const prologue = L ? PROLOGUE_EN : PROLOGUE_FR;

  const ui = {
    home: L ? "TRAINING PROGRAMME" : "PROGRAMME DE FORMATION",
    module: L ? "MODULE" : "MODULE",
    begin: L ? "Begin" : "Commencer",
    next: L ? "Continue" : "Continuer",
    back: L ? "Back" : "Retour",
    verify: L ? "Verification" : "Verification",
    confirm: L ? "Confirm" : "Confirmer",
    nextQ: L ? "Next" : "Question suivante",
    correct: L ? "Correct." : "Juste.",
    incorrect: L ? "Not quite." : "Pas tout a fait.",
    complete: L ? "Module Complete" : "Module Termine",
    retake: L ? "Retake" : "Recommencer",
    allModules: L ? "All Modules" : "Tous les modules",
    of: L ? "of" : "sur",
    sections: L ? "sections" : "sections",
    facts: L ? "FACTS OF ORIGIN" : "DONNEES CLES",
    standards: L ? "PRINCIPLES OF HAUTE MAITRISE" : "PRINCIPES DE HAUTE MAITRISE",
    avoidLabel: L ? "VOCABULARY TO AVOID" : "VOCABULAIRE A EVITER",
    lexiconLabel: L ? "LEXICAL REGISTER PER CUVEE" : "REGISTRE LEXICAL PAR CUVEE",
    timeline: L ? "COLLECTION TIMELINE" : "CHRONOLOGIE DES COLLECTIONS",
    cuveeDetails: L ? "CUVEE DETAILS" : "DETAILS DE LA CUVEE",
    technicalSpecs: L ? "TECHNICAL SPECIFICATIONS" : "DONNEES TECHNIQUES",
    sensory: L ? "SENSORY NOTES" : "NOTES SENSORIELLES",
    switchLang: L ? "FR" : "EN",
    prologueBtn: L ? "Begin Initiation" : "Commencer l'initiation",
    scenarioLabel: L ? "SCENARIO" : "SCENARIO",
    rubricLabel: L ? "RESPONSE CRITERIA" : "CRITERES DE REPONSE",
    showRubric: L ? "Show response criteria" : "Afficher les criteres",
    hideRubric: L ? "Hide criteria" : "Masquer les criteres",
    understood: L ? "Understood. Continue." : "Compris. Continuer.",
    sectionOf: L ? "Section" : "Section",
  };

  const startModule = (idx) => {
    setModuleIdx(idx); setSectionIdx(0); setOpenPillar(null);
    setOpenCuvee(null); setOpenScenario(null); setScreen("module");
  };

  const goNext = () => {
    if (sectionIdx < sections.length - 1) {
      setSectionIdx(s => s + 1); setOpenPillar(null); setOpenCuvee(null); setOpenScenario(null);
    } else {
      setQuizIdx(0); setSelected(null); setConfirmed(false); setScore(0);
      setAnswers([]); setShowRubric(false); setScreen("quiz");
    }
    window.scrollTo(0, 0);
  };

  const goPrev = () => {
    if (sectionIdx > 0) {
      setSectionIdx(s => s - 1); setOpenPillar(null); setOpenCuvee(null);
      setOpenScenario(null); window.scrollTo(0, 0);
    }
  };

  const confirmAnswer = () => {
    if (selected === null) return;
    setConfirmed(true);
    if (selected === quiz.questions[quizIdx].a) setScore(s => s + 1);
    setAnswers(prev => [...prev, { s: selected, a: quiz.questions[quizIdx].a }]);
  };

  const nextQuestion = () => {
    setShowRubric(false);
    if (quizIdx < quiz.questions.length - 1) {
      setQuizIdx(q => q + 1); setSelected(null); setConfirmed(false);
    } else {
      const newCompleted = completedModules.includes(moduleIdx)
        ? completedModules
        : [...completedModules, moduleIdx];
      setCompletedModules(newCompleted);
      setScreen(newCompleted.length === MODULES(lang).length ? "finale" : "result");
    }
  };

  // ── SHARED STYLE HELPERS ───────────────────────────────────────────────────
  // Cream surface colours
  const CS = { bg: CREAM, text: NAVY, body: BODY, dim: "#7A8A9E", border: "#D5CCBC" };

  const Btn = ({ onClick, children, variant = "gold", disabled = false, style = {} }) => (
    <button onClick={onClick} disabled={disabled} style={{
      background: variant === "gold" ? "none" : "none",
      border: `1px solid ${variant === "gold" ? GOLD : disabled ? "#C5BCAC" : "#A09880"}`,
      color: variant === "gold" ? GOLD : disabled ? "#C5BCAC" : "#8A7A60",
      fontSize: 10, letterSpacing: "0.2em", padding: "12px 28px",
      cursor: disabled ? "default" : "pointer",
      fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300,
      transition: "all 0.2s", ...style,
    }}
      onMouseEnter={e => { if (!disabled && variant === "gold") { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "#fff"; } }}
      onMouseLeave={e => { if (!disabled && variant === "gold") { e.currentTarget.style.background = "none"; e.currentTarget.style.color = GOLD; } }}
    >{children}</button>
  );

  const FactRow = ({ label, value, i }) => (
    <div style={{ display: "flex", borderTop: i === 0 ? "none" : `1px solid ${CS.border}`, padding: "10px 0", gap: 24 }}>
      <span style={{ fontSize: 10, letterSpacing: "0.15em", color: CS.dim, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, minWidth: 180, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, color: NAVY, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300 }}>{value}</span>
    </div>
  );

  // Header for all reading screens (cream version)
  const ReadHeader = () => (
    <div style={{ position: "sticky", top: 0, background: DB, borderBottom: `1px solid ${MB}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", height: 52, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "#A0B0C0", fontSize: 10, letterSpacing: "0.18em", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, padding: 0, display: "flex", alignItems: "center", gap: 10 }}>
          <GCSigleSVG size={24} /><span>← {ui.allModules}</span>
        </button>
        {screen === "module" && <>
          <span style={{ width: 1, height: 14, background: MB }} />
          <span style={{ fontSize: 10, letterSpacing: "0.18em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300 }}>{ui.module} {mod.number} · {section.label}</span>
        </>}
      </div>
      <button onClick={() => setLang(lang === "en" ? "fr" : "en")} style={{ background: "none", border: `1px solid ${MB}`, color: "#A0B0C0", fontSize: 10, letterSpacing: "0.15em", padding: "4px 12px", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif" }}>{ui.switchLang}</button>
    </div>
  );

  // ── HOME ──────────────────────────────────────────────────────────────────
  if (screen === "home") return (
    <div style={{ minHeight: "100vh", background: DB, color: "#C8C4BA", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px" }}>
      <div style={{ maxWidth: 600, width: "100%", textAlign: "center" }}>
        <div style={{ marginBottom: 24 }}><GCSigleSVG size={64} /></div>
        <div style={{ fontSize: 13, letterSpacing: "0.42em", color: ROSE, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 5 }}>GRANDE CHARTE</div>
        <div style={{ fontSize: 9, letterSpacing: "0.35em", color: DIM, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 36 }}>CHAMPAGNE</div>
        <div style={{ width: 36, height: 1, background: ROSE, margin: "0 auto 36px", opacity: 0.35 }} />
        <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 400, letterSpacing: "0.08em", color: "#E8E4DC", margin: "0 0 10px" }}>{ui.home}</h1>
        <p style={{ fontSize: 12, color: DIM, letterSpacing: "0.12em", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 20 }}>{L ? "An initiation, not an instruction manual." : "Une initiation, pas un manuel d'instructions."}</p>

        <div style={{ borderTop: `1px solid ${MB}`, borderBottom: `1px solid ${MB}`, padding: "24px 0", marginBottom: 36, textAlign: "left" }}>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#A8A09A", margin: "0 0 16px" }}>
            {L ? "This programme is designed for those who will carry the voice of the House. Every word spoken about Grande Charte is either a confirmation or a dilution of its identity. There is no neutral register."
               : "Ce programme est concu pour celles et ceux qui porteront la voix de la Maison. Chaque mot prononce sur Grande Charte est soit une confirmation, soit une dilution de son identite. Il n'existe pas de registre neutre."}
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: GOLD, margin: 0, fontStyle: "italic", letterSpacing: "0.04em" }}>
            {L ? "The goal is not to inform, but to entrust." : "L'objectif n'est pas d'informer, mais de confier."}
          </p>
        </div>

        {/* Prologue entry */}
        <button onClick={() => setScreen("prologue")} style={{ width: "100%", background: "none", border: `1px solid ${GOLD}`, color: GOLD, padding: "20px 28px", cursor: "pointer", textAlign: "center", fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 2, letterSpacing: "0.12em", fontSize: 11, transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = DB; }}
          onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = GOLD; }}>
          {L ? "PROLOGUE — BEFORE YOU BEGIN" : "PROLOGUE — AVANT DE COMMENCER"}
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 40 }}>
          {modules.map((m, i) => {
            const done = completedModules.includes(i);
            return (
              <button key={i} onClick={() => startModule(i)} style={{ background: "none", border: `1px solid ${MB}`, color: "#C8C4BA", padding: "18px 28px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "'Helvetica Neue', sans-serif", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
                onMouseLeave={e => e.currentTarget.style.borderColor = MB}>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.2em", color: GOLD }}>{ui.module} {m.number}</span>
                  <span style={{ width: 1, height: 16, background: MB }} />
                  <span style={{ fontSize: 13, letterSpacing: "0.06em" }}>{m.label}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {done && <span style={{ fontSize: 9, letterSpacing: "0.18em", color: GRN_AC, fontFamily: "'Helvetica Neue', sans-serif" }}>{L ? "COMPLETED" : "COMPLETE"}</span>}
                  <span style={{ fontSize: 10, color: DIM }}>{m.sections.length} {ui.sections}</span>
                  <span style={{ fontSize: 14, color: DIM }}>›</span>
                </div>
              </button>
            );
          })}
        </div>

        <button onClick={() => setLang(lang === "en" ? "fr" : "en")} style={{ background: "none", border: `1px solid ${MB}`, color: DIM, fontSize: 10, letterSpacing: "0.18em", padding: "8px 20px", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300 }}>{ui.switchLang}</button>
      </div>
    </div>
  );

  // ── PROLOGUE ──────────────────────────────────────────────────────────────
  if (screen === "prologue") return (
    <div style={{ minHeight: "100vh", background: CREAM, color: NAVY, fontFamily: "'Georgia', serif" }}>
      <ReadHeader />
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "52px 28px 100px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.3em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 12 }}>{prologue.label}</div>
        <h2 style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 400, color: NAVY, margin: "0 0 40px", letterSpacing: "0.04em", lineHeight: 1.25 }}>{prologue.title}</h2>

        {prologue.body.map((p, i) => (
          <p key={i} style={{ fontSize: 15, lineHeight: 1.9, color: BODY, marginBottom: 22 }}>{p}</p>
        ))}

        <div style={{ border: `1px solid ${GOLD}`, padding: "28px 32px", margin: "40px 0" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.28em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 20 }}>{L ? "YOUR COMMITMENT" : "VOTRE ENGAGEMENT"}</div>
          {prologue.commitment.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < prologue.commitment.length - 1 ? 16 : 0, alignItems: "flex-start" }}>
              <span style={{ fontSize: 10, color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.1em", flexShrink: 0, marginTop: 3 }}>{String(i + 1).padStart(2, "0")}</span>
              <p style={{ fontSize: 14, color: NAVY, lineHeight: 1.75, margin: 0 }}>{c}</p>
            </div>
          ))}
        </div>

        <div style={{ borderLeft: `2px solid ${GOLD}`, paddingLeft: 24, marginBottom: 48 }}>
          <p style={{ fontSize: 16, color: "#6A5A40", fontStyle: "italic", lineHeight: 1.7, margin: 0 }}>"{prologue.quote}"</p>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button onClick={() => { startModule(0); }} style={{ background: NAVY, border: `1px solid ${NAVY}`, color: CREAM, fontSize: 10, letterSpacing: "0.22em", padding: "14px 32px", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.borderColor = GOLD; }}
            onMouseLeave={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.borderColor = NAVY; }}>
            {ui.prologueBtn} ›
          </button>
          <Btn onClick={() => setScreen("home")} variant="dim">{ui.allModules}</Btn>
        </div>
      </div>
    </div>
  );

  // ── MODULE SECTION ─────────────────────────────────────────────────────────
  if (screen === "module") return (
    <div style={{ minHeight: "100vh", background: CREAM, color: NAVY, fontFamily: "'Georgia', serif" }}>
      <ReadHeader />

      {/* Progress indicator */}
      <div style={{ background: "#EDE8DF", borderBottom: `1px solid ${CS.border}`, padding: "10px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 9, letterSpacing: "0.22em", color: CS.dim, fontFamily: "'Helvetica Neue', sans-serif" }}>
          {ui.sectionOf} {sectionIdx + 1} {ui.of} {sections.length}
        </span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {sections.map((_, i) => (
            <div key={i} style={{ width: i === sectionIdx ? 22 : 6, height: 4, borderRadius: 2, background: i === sectionIdx ? GOLD : i < sectionIdx ? "#A09060" : CS.border, transition: "all 0.3s" }} />
          ))}
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: CS.border, opacity: 0.5, marginLeft: 4 }} />
        </div>
        <span style={{ fontSize: 9, letterSpacing: "0.18em", color: CS.dim, fontFamily: "'Helvetica Neue', sans-serif" }}>
          {ui.module} {mod.number}
        </span>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "44px 24px 100px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.28em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 10 }}>{section.label}</div>
        <h2 style={{ fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 400, letterSpacing: "0.04em", color: NAVY, margin: "0 0 36px", lineHeight: 1.25 }}>{section.title}</h2>

        {section.body.map((p, i) => <p key={i} style={{ fontSize: 15, lineHeight: 1.9, color: BODY, marginBottom: 22 }}>{p}</p>)}

        {/* FACTS */}
        {section.facts && (
          <div style={{ border: `1px solid ${CS.border}`, padding: "24px 28px", marginTop: 36, background: WARM }}>
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 16 }}>{ui.facts}</div>
            {section.facts.map((f, i) => <FactRow key={i} label={f.label} value={f.value} i={i} />)}
          </div>
        )}

        {/* PILLARS */}
        {section.pillars && (
          <div style={{ marginTop: 36 }}>
            <div style={{ borderLeft: `2px solid ${GOLD}`, paddingLeft: 20, marginBottom: 36, fontStyle: "italic", fontSize: 15, color: "#6A5A40", lineHeight: 1.7 }}>"{section.quote}"</div>
            {section.pillars.map((p, i) => (
              <div key={p.name}>
                <button onClick={() => setOpenPillar(openPillar === i ? null : i)} style={{ width: "100%", background: openPillar === i ? WARM : "none", border: `1px solid ${openPillar === i ? CS.border : CS.border}`, color: NAVY, padding: "16px 24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 2, textAlign: "left", transition: "all 0.2s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <span style={{ fontSize: 10, letterSpacing: "0.22em", color: GOLD }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: 12, letterSpacing: "0.18em" }}>{p.name.toUpperCase()}</span>
                    <span style={{ fontSize: 11, color: CS.dim, letterSpacing: "0.1em" }}>· {p.sub}</span>
                  </div>
                  <span style={{ fontSize: 14, color: CS.dim, transform: openPillar === i ? "rotate(90deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>›</span>
                </button>
                {openPillar === i && <div style={{ background: WARM, border: `1px solid ${CS.border}`, borderTop: "none", padding: "18px 24px 22px 68px", marginBottom: 2 }}><p style={{ fontSize: 14, lineHeight: 1.8, color: BODY, margin: 0, fontStyle: "italic" }}>{p.text}</p></div>}
              </div>
            ))}
          </div>
        )}

        {/* STANDARDS */}
        {section.standards && (
          <div style={{ border: `1px solid ${CS.border}`, marginTop: 36 }}>
            <div style={{ padding: "14px 24px", borderBottom: `1px solid ${CS.border}`, fontSize: 9, letterSpacing: "0.28em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, background: WARM }}>{ui.standards}</div>
            {section.standards.map((s, i) => (
              <div key={i} style={{ display: "flex", borderBottom: i < section.standards.length - 1 ? `1px solid ${CS.border}` : "none", padding: "11px 24px", gap: 24, alignItems: "baseline", background: i % 2 === 0 ? "transparent" : WARM }}>
                <span style={{ fontSize: 10, letterSpacing: "0.14em", color: CS.dim, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, minWidth: 180, flexShrink: 0 }}>{s.p}</span>
                <span style={{ fontSize: 13, color: NAVY, fontStyle: "italic" }}>{s.e}</span>
              </div>
            ))}
          </div>
        )}

        {/* VOCABULARY / AVOID */}
        {section.avoid && (
          <div style={{ marginTop: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: RED_AC, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 16 }}>{ui.avoidLabel}</div>
            {section.avoid.map((v, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${RED_AC}`, paddingLeft: 20, marginBottom: 14 }}>
                <div style={{ fontSize: 12, letterSpacing: "0.08em", color: NAVY, marginBottom: 4, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 500 }}>{v.w}</div>
                <div style={{ fontSize: 12, color: CS.dim, lineHeight: 1.6, fontStyle: "italic" }}>{v.r}</div>
              </div>
            ))}
            {section.lexicon && <>
              <div style={{ fontSize: 9, letterSpacing: "0.28em", color: GRN_AC, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, margin: "32px 0 16px" }}>{ui.lexiconLabel}</div>
              {Object.entries(section.lexicon).map(([cuvee, words]) => (
                <div key={cuvee} style={{ borderLeft: `2px solid ${GOLD}`, paddingLeft: 20, marginBottom: 22 }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.18em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 10 }}>{cuvee}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {words.map((w, i) => <span key={i} style={{ fontSize: 11, padding: "4px 14px", border: `1px solid ${CS.border}`, color: BODY, fontStyle: "italic", background: WARM }}>{w}</span>)}
                  </div>
                </div>
              ))}
            </>}
          </div>
        )}

        {/* TIMELINE */}
        {section.timeline && (
          <div style={{ marginTop: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 20 }}>{ui.timeline}</div>
            {section.timeline.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 0, marginBottom: 2 }}>
                <div style={{ background: NAVY, padding: "14px 20px", minWidth: 80, flexShrink: 0 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.12em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif" }}>{t.year}</div>
                </div>
                <div style={{ background: WARM, border: `1px solid ${CS.border}`, borderLeft: "none", padding: "14px 24px", flex: 1 }}>
                  <span style={{ fontSize: 12, letterSpacing: "0.12em", color: NAVY, fontFamily: "'Helvetica Neue', sans-serif", marginRight: 12 }}>{t.name}</span>
                  <span style={{ fontSize: 12, color: CS.dim, fontStyle: "italic" }}>{t.note}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CUVEES */}
        {section.cuvees && (
          <div style={{ marginTop: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 16 }}>{ui.cuveeDetails}</div>
            {section.cuvees.map((c, i) => (
              <div key={i} style={{ marginBottom: 2 }}>
                <button onClick={() => setOpenCuvee(openCuvee === i ? null : i)} style={{ width: "100%", background: openCuvee === i ? WARM : "none", border: `1px solid ${CS.border}`, color: NAVY, padding: "14px 24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, textAlign: "left", transition: "all 0.2s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 10, letterSpacing: "0.22em", color: GOLD }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: 12, letterSpacing: "0.12em" }}>{c.name}</span>
                    {c.bottles && <span style={{ fontSize: 10, color: CS.dim, fontFamily: "'Helvetica Neue', sans-serif" }}>{c.bottles} {L ? "btl" : "fl"}</span>}
                  </div>
                  <span style={{ fontSize: 14, color: CS.dim, transform: openCuvee === i ? "rotate(90deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>›</span>
                </button>
                {openCuvee === i && (
                  <div style={{ background: WARM, border: `1px solid ${CS.border}`, borderTop: "none", padding: "18px 24px 22px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px", marginBottom: 14 }}>
                      {[[L ? "Blend" : "Assemblage", c.blend],[L ? "Dosage" : "Dosage", c.dosage],[L ? "Aging" : "Vieillissement", c.aging]].map(([k, v], j) => (
                        <div key={j}>
                          <div style={{ fontSize: 9, letterSpacing: "0.18em", color: CS.dim, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 3 }}>{k.toUpperCase()}</div>
                          <div style={{ fontSize: 12, color: NAVY, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300 }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ borderTop: `1px solid ${CS.border}`, paddingTop: 12 }}>
                      <div style={{ fontSize: 9, letterSpacing: "0.18em", color: CS.dim, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 6 }}>{L ? "SPIRIT" : "ESPRIT"}</div>
                      <div style={{ fontSize: 13, color: BODY, fontStyle: "italic", lineHeight: 1.7 }}>{c.spirit}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* IROISE SPECS */}
        {section.specs && (
          <div style={{ marginTop: 36 }}>
            <div style={{ border: `1px solid ${CS.border}` }}>
              <div style={{ padding: "14px 24px", borderBottom: `1px solid ${CS.border}`, fontSize: 9, letterSpacing: "0.28em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, background: WARM }}>{ui.technicalSpecs}</div>
              {section.specs.map((s, i) => (
                <div key={i} style={{ display: "flex", borderBottom: i < section.specs.length - 1 ? `1px solid ${CS.border}` : "none", padding: "11px 24px", gap: 24, alignItems: "baseline", background: i % 2 === 0 ? "transparent" : WARM }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.14em", color: CS.dim, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, minWidth: 180, flexShrink: 0 }}>{s.p}</span>
                  <span style={{ fontSize: 13, color: NAVY, fontStyle: "italic" }}>{s.e}</span>
                </div>
              ))}
            </div>
            {section.sensory && (
              <div style={{ borderLeft: `2px solid ${GOLD}`, paddingLeft: 20, marginTop: 28 }}>
                <div style={{ fontSize: 9, letterSpacing: "0.22em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 8 }}>{ui.sensory}</div>
                <p style={{ fontSize: 14, color: BODY, fontStyle: "italic", lineHeight: 1.8, margin: 0 }}>{section.sensory}</p>
              </div>
            )}
          </div>
        )}

        {/* SCENARIOS */}
        {section.scenarios && (
          <div style={{ marginTop: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 16 }}>{L ? "CONVERSATION SCENARIOS" : "SCENARIOS DE CONVERSATION"}</div>
            {section.scenarios.map((sc, i) => (
              <div key={i} style={{ marginBottom: 2 }}>
                <button onClick={() => setOpenScenario(openScenario === i ? null : i)} style={{ width: "100%", background: openScenario === i ? WARM : "none", border: `1px solid ${CS.border}`, color: NAVY, padding: "14px 22px", cursor: "pointer", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, textAlign: "left", fontFamily: "'Georgia', serif", fontStyle: "italic", transition: "all 0.2s" }}>
                  <span style={{ fontSize: 13, color: BODY, lineHeight: 1.5, flex: 1 }}>{sc.trigger}</span>
                  <span style={{ fontSize: 14, color: CS.dim, flexShrink: 0, transform: openScenario === i ? "rotate(90deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>›</span>
                </button>
                {openScenario === i && (
                  <div style={{ background: WARM, border: `1px solid ${CS.border}`, borderTop: "none", padding: "18px 22px 22px" }}>
                    <div style={{ fontSize: 9, letterSpacing: "0.2em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 10 }}>{L ? "RESPONSE" : "REPONSE"}</div>
                    <p style={{ fontSize: 14, color: BODY, lineHeight: 1.85, margin: 0 }}>{sc.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* QUOTE */}
        {section.quote && !section.pillars && (
          <div style={{ borderLeft: `2px solid ${GOLD}`, paddingLeft: 20, marginTop: 36 }}>
            <p style={{ fontSize: 15, color: "#6A5A40", fontStyle: "italic", lineHeight: 1.7, margin: 0 }}>"{section.quote}"</p>
          </div>
        )}

        {/* CONSTITUTIONAL */}
        {section.constitutional && (
          <div style={{ border: `1px solid ${GOLD}`, padding: "18px 24px", marginTop: 36, background: WARM }}>
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 12 }}>{L ? "CONSTITUTIONAL PRINCIPLE" : "PRINCIPE CONSTITUTIONNEL"}</div>
            <p style={{ fontSize: 14, color: NAVY, letterSpacing: "0.04em", lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>{section.constitutional}</p>
          </div>
        )}

        {/* RULE */}
        {section.rule && (
          <div style={{ border: `1px solid ${GOLD}`, padding: "18px 24px", marginTop: 28, background: WARM }}>
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 12 }}>{L ? "OPERATING RULE" : "REGLE OPERATIONNELLE"}</div>
            <p style={{ fontSize: 14, color: NAVY, letterSpacing: "0.04em", lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>{section.rule}</p>
          </div>
        )}

        {/* POSTURE */}
        {section.posture && (
          <div style={{ marginTop: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: RED_AC, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 16 }}>{L ? "PRESENTATION POSTURE" : "POSTURE DE PRESENTATION"}</div>
            {section.posture.map((item, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${RED_AC}`, paddingLeft: 20, marginBottom: 14 }}>
                <p style={{ fontSize: 13, color: BODY, lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>{item}</p>
              </div>
            ))}
          </div>
        )}

        {/* IF UNSURE */}
        {section.ifUnsure && (
          <div style={{ background: WARM, border: `1px solid ${CS.border}`, padding: "18px 24px", marginTop: 28 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: CS.dim, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 10 }}>{L ? "IF UNSURE" : "EN CAS DE DOUTE"}</div>
            <p style={{ fontSize: 13, color: BODY, fontStyle: "italic", lineHeight: 1.8, margin: 0 }}>{section.ifUnsure}</p>
          </div>
        )}

        {/* INTERNAL/EXTERNAL */}
        {section.internalExternal && (
          <div style={{ marginTop: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 16 }}>PERSPECTIVE</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ border: `1px solid ${CS.border}`, padding: "16px 20px", background: WARM }}>
                <div style={{ fontSize: 9, letterSpacing: "0.2em", color: CS.dim, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 10 }}>{L ? "INTERNAL" : "INTERNE"}</div>
                <p style={{ fontSize: 13, color: BODY, fontStyle: "italic", lineHeight: 1.75, margin: 0 }}>{section.internalExternal.internal}</p>
              </div>
              <div style={{ border: `1px solid ${CS.border}`, padding: "16px 20px", background: WARM }}>
                <div style={{ fontSize: 9, letterSpacing: "0.2em", color: CS.dim, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 10 }}>{L ? "EXTERNAL" : "EXTERNE"}</div>
                <p style={{ fontSize: 13, color: BODY, fontStyle: "italic", lineHeight: 1.75, margin: 0 }}>{section.internalExternal.external}</p>
              </div>
            </div>
          </div>
        )}

        {/* ALLOCATION NOTE */}
        {section.allocationNote && (
          <div style={{ borderLeft: `2px solid ${GOLD}`, paddingLeft: 20, marginTop: 28 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.22em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 8 }}>{L ? "ALLOCATION PRINCIPLE" : "PRINCIPE D'ALLOCATION"}</div>
            <p style={{ fontSize: 14, color: BODY, fontStyle: "italic", lineHeight: 1.8, margin: 0 }}>{section.allocationNote}</p>
          </div>
        )}

        {/* INVARIANTS */}
        {section.invariants && (
          <div style={{ border: `1px solid ${GOLD}`, padding: "24px 28px", marginTop: 36, background: WARM }}>
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 18 }}>{L ? "NON-NEGOTIABLE INVARIANTS" : "INVARIANTS NON-NEGOCIABLES"}</div>
            {section.invariants.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < section.invariants.length - 1 ? 14 : 0, alignItems: "flex-start" }}>
                <span style={{ fontSize: 10, color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.1em", flexShrink: 0, marginTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                <p style={{ fontSize: 13, color: NAVY, lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>{item}</p>
              </div>
            ))}
          </div>
        )}

        {/* GOVERNANCE NOTE */}
        {section.governanceNote && (
          <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${CS.border}` }}>
            <p style={{ fontSize: 11, color: CS.dim, fontStyle: "italic", lineHeight: 1.7, margin: 0, letterSpacing: "0.02em" }}>{section.governanceNote}</p>
          </div>
        )}

        {/* NAV */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 56, paddingTop: 28, borderTop: `1px solid ${CS.border}` }}>
          <Btn onClick={goPrev} variant="dim" style={{ visibility: sectionIdx === 0 ? "hidden" : "visible" }}>‹ {ui.back}</Btn>
          <div style={{ fontSize: 10, color: CS.dim, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.12em" }}>
            {sectionIdx + 1} / {sections.length}
          </div>
          <Btn onClick={goNext}>{sectionIdx < sections.length - 1 ? ui.next : ui.verify} ›</Btn>
        </div>
      </div>
    </div>
  );

  // ── QUIZ ───────────────────────────────────────────────────────────────────
  if (screen === "quiz") {
    const q = quiz.questions[quizIdx];
    const isScenario = q.type === "scenario";

    return (
      <div style={{ minHeight: "100vh", background: DB, color: "#C8C4BA", fontFamily: "'Georgia', serif" }}>
        <div style={{ position: "sticky", top: 0, background: DB, borderBottom: `1px solid ${MB}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", height: 52, zIndex: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <GCSigleSVG size={24} />
            <span style={{ fontSize: 10, letterSpacing: "0.2em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300 }}>{quiz.title} · {String(quizIdx + 1).padStart(2, "0")} / {String(quiz.questions.length).padStart(2, "0")}</span>
          </div>
          <button onClick={() => setLang(lang === "en" ? "fr" : "en")} style={{ background: "none", border: `1px solid ${MB}`, color: DIM, fontSize: 10, letterSpacing: "0.15em", padding: "4px 12px", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif" }}>{ui.switchLang}</button>
        </div>

        <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 24px 100px" }}>
          {isScenario && (
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: ROSE, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 16 }}>{ui.scenarioLabel}</div>
          )}
          <h3 style={{ fontSize: "clamp(17px, 2.8vw, 21px)", fontWeight: 400, lineHeight: 1.55, color: "#E8E4DC", marginBottom: 36 }}>{q.q}</h3>

          {isScenario ? (
            <div>
              <p style={{ fontSize: 13, color: DIM, fontStyle: "italic", lineHeight: 1.7, marginBottom: 28 }}>
                {L ? "Reflect on your response before revealing the criteria. What would you say?" : "Reflechissez a votre reponse avant de reveler les criteres. Que diriez-vous ?"}
              </p>
              <button onClick={() => setShowRubric(!showRubric)} style={{ background: "none", border: `1px solid ${showRubric ? GOLD : MB}`, color: showRubric ? GOLD : DIM, fontSize: 10, letterSpacing: "0.18em", padding: "10px 24px", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 20, transition: "all 0.2s" }}>
                {showRubric ? ui.hideRubric : ui.showRubric}
              </button>
              {showRubric && (
                <div style={{ border: `1px solid ${MB}`, padding: "24px 28px", marginBottom: 28 }}>
                  <div style={{ fontSize: 9, letterSpacing: "0.22em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 18 }}>{ui.rubricLabel}</div>
                  {q.rubric.map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < q.rubric.length - 1 ? 16 : 0, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 10, color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.1em", flexShrink: 0, marginTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                      <p style={{ fontSize: 13, color: "#A0A8B8", lineHeight: 1.75, margin: 0, fontStyle: i === q.rubric.length - 1 ? "italic" : "normal" }}>{r}</p>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Btn onClick={nextQuestion}>{ui.understood} ›</Btn>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {q.opts.map((opt, i) => {
                  let bc = MB, bg = "none", tc = "#A8A09A";
                  if (confirmed) {
                    if (i === q.a) { bc = GRN_AC; bg = "rgba(58,122,80,0.12)"; tc = "#80C890"; }
                    else if (i === selected) { bc = RED_AC; bg = "rgba(155,64,64,0.1)"; tc = "#C08080"; }
                  } else if (selected === i) { bc = GOLD; bg = "rgba(201,168,76,0.1)"; tc = "#E8E4DC"; }
                  return (
                    <button key={i} onClick={() => !confirmed && setSelected(i)} style={{ background: bg, border: `1px solid ${bc}`, color: tc, padding: "15px 22px", cursor: confirmed ? "default" : "pointer", textAlign: "left", fontSize: 14, lineHeight: 1.6, fontFamily: "'Georgia', serif", transition: "all 0.2s", display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 10, letterSpacing: "0.15em", color: DIM, fontFamily: "'Helvetica Neue', sans-serif", flexShrink: 0, marginTop: 2 }}>{String.fromCharCode(65 + i)}</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {confirmed && (
                <div style={{ border: `1px solid ${MB}`, padding: "18px 22px", marginBottom: 28 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", color: selected === q.a ? GRN_AC : RED_AC, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 8 }}>{selected === q.a ? ui.correct : ui.incorrect}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.75, color: "#A0A8B8", margin: 0, fontStyle: "italic" }}>{q.exp}</p>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {!confirmed
                  ? <Btn onClick={confirmAnswer} disabled={selected === null}>{ui.confirm}</Btn>
                  : <Btn onClick={nextQuestion}>{ui.nextQ} ›</Btn>}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── RESULT ─────────────────────────────────────────────────────────────────
  if (screen === "result") return (
    <div style={{ minHeight: "100vh", background: DB, color: "#C8C4BA", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 440 }}>
        <div style={{ fontSize: 9, letterSpacing: "0.28em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 36 }}>{ui.module} {mod.number} · {ui.complete.toUpperCase()}</div>
        <div style={{ fontSize: "clamp(60px, 12vw, 88px)", fontWeight: 400, color: "#E8E4DC", lineHeight: 1, marginBottom: 6 }}>{score}</div>
        <div style={{ fontSize: 12, color: DIM, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.15em", marginBottom: 48 }}>{ui.of} {quiz.questions.filter(q => !q.type).length}</div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 52 }}>
          {answers.map((ans, i) => <div key={i} style={{ width: 32, height: 4, background: ans.s === ans.a ? GRN_AC : RED_AC, borderRadius: 2 }} />)}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn onClick={() => setScreen("home")} variant="dim">{ui.allModules}</Btn>
          <Btn onClick={() => { setQuizIdx(0); setSelected(null); setConfirmed(false); setScore(0); setAnswers([]); setScreen("quiz"); }}>{ui.retake}</Btn>
          {moduleIdx < modules.length - 1 && (
            <Btn onClick={() => startModule(moduleIdx + 1)}>{ui.module} {modules[moduleIdx + 1].number} ›</Btn>
          )}
        </div>
      </div>
    </div>
  );

  // ── FINALE ─────────────────────────────────────────────────────────────────
  if (screen === "finale") {
    const principles = L ? [
      { n: "00", t: "The Commitment", d: "You have taken the time to inhabit the doctrine. That is the beginning, not the end. Every word you speak from here either confirms or dilutes what you have learned." },
      { n: "01", t: "Identity", d: "Freedom · Time · Audacity. In this exact order. No substitutions. The House is guided by mastery, not ambition." },
      { n: "02", t: "Language", d: "Each cuvee has its own lexical register. No shared vocabulary. Every word either confirms or dilutes the House's identity." },
      { n: "03", t: "Iroise", d: "A new dimension of aging. Not an experiment. Not a marketing initiative. A maturation practice with measurable physical conditions and a distinct sensory consequence." },
      { n: "04", t: "Conversation", d: "The House does not argue. It states, invites, and moves on. Price is never reduced, in words or in tone. Competitors are acknowledged with full respect. Discovery, not displacement." },
      { n: "05", t: "Custodians", d: "Not clients. Custodians. The numbered bottle records a relationship. The experience follows the wine's rhythm. Nothing imposed." },
      { n: "06", t: "Presence", d: "Networks, not territories. Allocation, not distribution. The House grows at its own rhythm. Price never adjusts to geography." },
    ] : [
      { n: "00", t: "L'Engagement", d: "Vous avez pris le temps d'habiter la doctrine. C'est un commencement, pas une fin. Chaque mot que vous prononcez desormais confirme ou dilue ce que vous avez appris." },
      { n: "01", t: "Identite", d: "Liberte · Temps · Audace. Dans cet ordre exact. Sans substitution. La Maison est guidee par la maitrise, non l'ambition." },
      { n: "02", t: "Langage", d: "Chaque cuvee a son propre registre lexical. Aucun vocabulaire partage. Chaque mot confirme ou dilue l'identite de la Maison." },
      { n: "03", t: "Iroise", d: "Une nouvelle dimension du vieillissement. Pas une experience. Pas une initiative marketing. Une pratique de maturation avec des conditions physiques mesurables et une consequence sensorielle distincte." },
      { n: "04", t: "Conversation", d: "La Maison n'argumente pas. Elle enonce, invite et avance. Le prix ne se reduit jamais, en mots ni en ton. Les concurrents sont reconnus avec respect sincere. La decouverte, pas le deplacement." },
      { n: "05", t: "Allocataires", d: "Pas des clients. Des allocataires. Le flacon numerote enregistre une relation. L'experience suit le rythme du vin. Rien n'est impose." },
      { n: "06", t: "Presence", d: "Des reseaux, pas des territoires. L'allocation, pas la distribution. La Maison grandit a son propre rythme. Le prix ne s'ajuste jamais a la geographie." },
    ];

    return (
      <div style={{ minHeight: "100vh", background: DB, color: "#C8C4BA", fontFamily: "'Georgia', serif" }}>
        <div style={{ position: "sticky", top: 0, background: DB, borderBottom: `1px solid ${MB}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", height: 52, zIndex: 100 }}>
          <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: DIM, fontSize: 10, letterSpacing: "0.18em", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, padding: 0, display: "flex", alignItems: "center", gap: 10 }}><GCSigleSVG size={24} /><span>← {ui.allModules}</span></button>
          <button onClick={() => setLang(lang === "en" ? "fr" : "en")} style={{ background: "none", border: `1px solid ${MB}`, color: DIM, fontSize: 10, letterSpacing: "0.15em", padding: "4px 12px", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif" }}>{ui.switchLang}</button>
        </div>

        <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px 100px", textAlign: "center" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.28em", color: ROSE, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 12 }}>GRANDE CHARTE · {L ? "PROGRAMME COMPLETE" : "PROGRAMME COMPLETE"}</div>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 400, letterSpacing: "0.05em", margin: "0 0 16px", color: "#E8E4DC" }}>{L ? "Initiation Complete." : "Initiation Complete."}</h2>
          <p style={{ fontSize: 14, color: DIM, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, letterSpacing: "0.08em", marginBottom: 56 }}>
            {L ? "Six modules. One doctrine. The House is what every gesture confirms." : "Six modules. Une doctrine. La Maison est ce que chaque geste confirme."}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 56, textAlign: "left" }}>
            {principles.map((p) => (
              <div key={p.n} style={{ display: "flex", gap: 0, border: `1px solid ${MB}` }}>
                <div style={{ background: MB, padding: "16px 20px", minWidth: 56, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.15em", color: GOLD, fontFamily: "'Helvetica Neue', sans-serif" }}>{p.n}</span>
                </div>
                <div style={{ padding: "16px 22px", flex: 1 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#E8E4DC", fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 5 }}>{p.t.toUpperCase()}</div>
                  <div style={{ fontSize: 13, color: "#A0A8B8", lineHeight: 1.6, fontStyle: "italic" }}>{p.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${MB}`, paddingTop: 40, marginBottom: 48 }}>
            <p style={{ fontSize: 15, color: "#A09880", fontStyle: "italic", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 28px" }}>
              {L ? "\"Intelligence is not the study of others. It is the clarification of self. Inhabit the territory completely.\"" : "\"L'intelligence n'est pas l'etude des autres. C'est la clarification de soi. Habitez le territoire completement.\""}
            </p>
            <div style={{ fontSize: 9, letterSpacing: "0.2em", color: DIM, fontFamily: "'Helvetica Neue', sans-serif" }}>GRANDE CHARTE · HOUSE DOCTRINE / INITIATION PROGRAMME V2.1</div>
          </div>

          <div style={{ borderTop: `1px solid ${MB}`, paddingTop: 28, marginBottom: 40, maxWidth: 520, margin: "0 auto 40px" }}>
            <p style={{ fontSize: 12, color: DIM, fontStyle: "italic", lineHeight: 1.7, textAlign: "center" }}>
              {L ? "Completion of this initiation does not automatically authorise representation. Final readiness requires doctrinal validation by the House."
                 : "La completion de cette initiation n'autorise pas automatiquement la representation. La validation doctrinale par la Maison est requise avant tout deploiement."}
            </p>
          </div>

          <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", border: `1px solid ${ROSE}`, padding: "28px 48px 24px", marginBottom: 40 }}>
            <GCSigleSVG size={40} />
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: ROSE, fontFamily: "'Helvetica Neue', sans-serif", marginTop: 14, marginBottom: 4 }}>{L ? "INITIATION COMPLETED" : "INITIATION COMPLETE"}</div>
            <div style={{ fontSize: 11, color: DIM, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.12em" }}>GRANDE CHARTE · {new Date().getFullYear()}</div>
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={() => setScreen("home")} variant="dim">{ui.allModules}</Btn>
            <Btn onClick={() => startModule(0)}>{L ? "Restart" : "Recommencer"}</Btn>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
