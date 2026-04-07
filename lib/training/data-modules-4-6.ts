import type { Section, Quiz } from "./types";

// ── MODULE IV — SECTIONS EN ───────────────────────────────────────────────────
export const SECTIONS_EN_IV: Section[] = [
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

// ── MODULE IV — SECTIONS FR ───────────────────────────────────────────────────
export const SECTIONS_FR_IV: Section[] = [
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

// ── MODULE IV — QUIZ EN ───────────────────────────────────────────────────────
export const QUIZ_EN_IV: Quiz = {
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

// ── MODULE IV — QUIZ FR ───────────────────────────────────────────────────────
export const QUIZ_FR_IV: Quiz = {
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

// ── MODULE V — SECTIONS EN ────────────────────────────────────────────────────
export const SECTIONS_EN_V: Section[] = [
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
      "An uncertain, defensive, or sales-pressured ambassador creates doubt before a cork is drawn. An ambassador who is calm, precise, and unhurried creates desire. The difference between these two is doctrinal alignment: knowing what the House is, and inhabiting that knowledge without effort.",
      "You are not a salesperson. You are a custodian of the narrative. Every conversation you have either confirms the House's identity or dilutes it. There is no neutral register.",
    ],
  },
];

// ── MODULE V — SECTIONS FR ────────────────────────────────────────────────────
export const SECTIONS_FR_V: Section[] = [
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

// ── MODULE V — QUIZ EN ────────────────────────────────────────────────────────
export const QUIZ_EN_V: Quiz = {
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

// ── MODULE V — QUIZ FR ────────────────────────────────────────────────────────
export const QUIZ_FR_V: Quiz = {
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

// ── MODULE VI — SECTIONS EN ───────────────────────────────────────────────────
export const SECTIONS_EN_VI: Section[] = [
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

// ── MODULE VI — SECTIONS FR ───────────────────────────────────────────────────
export const SECTIONS_FR_VI: Section[] = [
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

// ── MODULE VI — QUIZ EN ───────────────────────────────────────────────────────
export const QUIZ_EN_VI: Quiz = {
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

// ── MODULE VI — QUIZ FR ───────────────────────────────────────────────────────
export const QUIZ_FR_VI: Quiz = {
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
