import type { Section, Quiz } from "./types";

// ── MODULE I — SECTIONS EN ────────────────────────────────────────────────────
export const SECTIONS_EN_I: Section[] = [
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

// ── MODULE I — SECTIONS FR ────────────────────────────────────────────────────
export const SECTIONS_FR_I: Section[] = [
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

// ── MODULE I — QUIZ EN ────────────────────────────────────────────────────────
export const QUIZ_EN_I: Quiz = {
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

// ── MODULE I — QUIZ FR ────────────────────────────────────────────────────────
export const QUIZ_FR_I: Quiz = {
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

// ── MODULE II — SECTIONS EN ───────────────────────────────────────────────────
export const SECTIONS_EN_II: Section[] = [
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

// ── MODULE II — SECTIONS FR ───────────────────────────────────────────────────
export const SECTIONS_FR_II: Section[] = [
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

// ── MODULE II — QUIZ EN ───────────────────────────────────────────────────────
export const QUIZ_EN_II: Quiz = {
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

// ── MODULE II — QUIZ FR ───────────────────────────────────────────────────────
export const QUIZ_FR_II: Quiz = {
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

// ── MODULE III — SECTIONS EN ──────────────────────────────────────────────────
export const SECTIONS_EN_III: Section[] = [
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

// ── MODULE III — SECTIONS FR ──────────────────────────────────────────────────
export const SECTIONS_FR_III: Section[] = [
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

// ── MODULE III — QUIZ EN ──────────────────────────────────────────────────────
export const QUIZ_EN_III: Quiz = {
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

// ── MODULE III — QUIZ FR ──────────────────────────────────────────────────────
export const QUIZ_FR_III: Quiz = {
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
