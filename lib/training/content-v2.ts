import type { Module, Section, QuizQuestion } from "./types";
type Pair = readonly [string, string];
const text = (p: Pair, en: boolean) => p[en ? 1 : 0];
function section(
  id: string,
  title: Pair,
  paragraphs: Pair[],
  en: boolean,
  extra: Partial<Section> = {},
): Section {
  return {
    id,
    label: id,
    title: text(title, en),
    body: paragraphs.map((p) => text(p, en)),
    ...extra,
    ...(en && extra.cuvees
      ? {
          cuvees: extra.cuvees.map((c) => ({
            ...c,
            dosage: c.dosage.replace(",", "."),
          })),
        }
      : {}),
  };
}
function question(
  q: Pair,
  options: Pair[],
  answer: number,
  explanation: Pair,
  en: boolean,
): QuizQuestion {
  return {
    q: text(q, en),
    opts: options.map((p) => text(p, en)),
    a: answer,
    exp: text(explanation, en),
  };
}
function scenario(q: Pair, criteria: Pair[], en: boolean): QuizQuestion {
  return {
    type: "scenario",
    q: text(q, en),
    rubric: criteria.map((p) => text(p, en)),
  };
}
export const CONTENT_VERSION = "2026-10-v2";
export function MODULES(lang: string): Module[] {
  const en = lang === "en";
  const source = en
    ? "House brochure, GC Brochure Pro 3. Figures describe the documented releases, not current availability."
    : "Brochure de la Maison, GC Brochure Pro 3. Les chiffres décrivent les éditions documentées, pas les stocks disponibles.";
  const base = (
    number: string,
    label: Pair,
    objective: Pair,
    duration: number,
    image: string,
    alt: Pair,
  ) => ({
    number,
    label: text(label, en),
    objective: text(objective, en),
    duration,
    image,
    imageAlt: text(alt, en),
    source,
  });
  return [
    {
      ...base(
        "I",
        ["L’esprit de la Maison", "The spirit of the House"],
        [
          "Présenter Grande Charte avec précision, dans vos propres mots.",
          "Introduce Grande Charte accurately, in your own words.",
        ],
        8,
        "/training/plaque.jpg",
        ["Détail du signe Grande Charte", "Detail of the Grande Charte sign"],
      ),
      sections: [
        section(
          "01",
          [
            "Une quête, plutôt qu’une formule",
            "A quest, rather than a formula",
          ],
          [
            [
              "Grande Charte construit des grands vins de Champagne à travers des collections singulières. Chaque collection explore une question : l’équilibre, la pureté, ou le temps sous la mer.",
              "Grande Charte creates great Champagne wines through distinct collections. Each collection explores a question: balance, purity, or time beneath the sea.",
            ],
            [
              "Le style de la Maison recherche la finesse des bulles, une mousse crémeuse, la tension et la précision. Ce sont des repères de dégustation. Ils ne signifient pas que toutes les cuvées ont le même goût.",
              "The House seeks fine bubbles, a creamy mousse, tension and precision. These are tasting reference points. They do not mean that every cuvée tastes the same.",
            ],
            [
              "Un nouveau signe accompagne les collections. La brochure décrit une quête qui continue, plutôt qu’un goût définitivement fixé.",
              "A new sign accompanies the collections. The brochure describes an ongoing quest, rather than a permanently fixed taste.",
            ],
          ],
          en,
        ),
        section(
          "02",
          ["Liberté. Temps. Audace.", "Freedom. Time. Audacity."],
          [
            [
              "La liberté se traduit par des choix de création : explorer un cépage, un assemblage, un format ou un environnement d’élevage, sans imposer une recette unique.",
              "Freedom translates into creative choices: exploring a grape, a blend, a format or an ageing environment, without imposing one recipe.",
            ],
            [
              "Le temps est un outil de création. Sa durée varie selon les vins. Ne remplacez pas la fiche d’une cuvée par une promesse générale de huit à douze ans.",
              "Time is a creative tool. Its duration varies by wine. Do not replace a cuvée’s specification with a general promise of eight to twelve years.",
            ],
            [
              "L’audace se raconte par une décision réelle. L’immersion en mer d’Iroise en est une expression. Elle n’autorise ni la surenchère ni une explication scientifique improvisée.",
              "Audacity is expressed through an actual decision. Immersion in the Iroise Sea is one example. It does not justify exaggeration or improvised scientific explanations.",
            ],
          ],
          en,
        ),
        section(
          "03",
          ["Une parole à la hauteur du vin", "Words worthy of the wine"],
          [
            [
              "Commencez par une idée simple, puis un fait vérifiable, puis une invitation à goûter. Une conversation peut être brève sans être pauvre.",
              "Start with a simple idea, then a verifiable fact, then an invitation to taste. A conversation can be brief without being shallow.",
            ],
            [
              "Exemple : « Grande Charte explore le temps et l’équilibre à travers des collections de Champagne. Cette cuvée en propose une expression particulière. Je vous invite à découvrir sa texture. »",
              "Example: ‘Grande Charte explores time and balance through Champagne collections. This cuvée offers one distinct expression. I invite you to discover its texture.’",
            ],
            [
              "Respectez les autres maisons et le vocabulaire de votre interlocuteur. La singularité se démontre par les vins et les choix de création, sans déprécier les références qu’il aime.",
              "Respect other houses and your guest’s vocabulary. Distinctiveness is demonstrated by the wines and creative choices, without belittling the references they enjoy.",
            ],
          ],
          en,
        ),
        section(
          "04",
          [
            "Ce que vous devez savoir dire",
            "What you should be able to explain",
          ],
          [
            [
              "Présentez la Maison en trente secondes. Reliez chaque pilier à un exemple concret. Si une date, une quantité ou un détail technique vous échappe, proposez de le vérifier.",
              "Introduce the House in thirty seconds. Connect each pillar to a concrete example. If a date, quantity or technical detail escapes you, offer to check it.",
            ],
            [
              "La rareté concerne une édition et une disponibilité précises. Elle ne se résume pas à une formule absolue sur tout ce que produit la Maison.",
              "Rarity concerns a specific release and its availability. It cannot be reduced to an absolute statement about everything the House produces.",
            ],
          ],
          en,
        ),
      ],
      quiz: {
        title: text(["Présenter la Maison", "Introducing the House"], en),
        questions: [
          question(
            ["Quel rôle joue le temps ?", "What role does time play?"],
            [
              [
                "Une durée identique pour tous les vins",
                "The same duration for every wine",
              ],
              [
                "Un outil de création propre à chaque cuvée",
                "A creative tool specific to each cuvée",
              ],
              [
                "Une garantie de supériorité sur les autres maisons",
                "A guarantee of superiority over other houses",
              ],
            ],
            1,
            [
              "La durée d’élevage varie. Elle se vérifie sur la fiche de chaque édition.",
              "Ageing durations vary. Check the specification of each release.",
            ],
            en,
          ),
          question(
            [
              "Comment exprimer l’audace ?",
              "How should audacity be expressed?",
            ],
            [
              [
                "Avec une décision réelle et documentée",
                "Through an actual, documented decision",
              ],
              [
                "Avec le plus de superlatifs possible",
                "With as many superlatives as possible",
              ],
              [
                "Avec une promesse scientifique non vérifiée",
                "Through an unverified scientific promise",
              ],
            ],
            0,
            [
              "Une décision concrète raconte mieux la Maison qu’une affirmation spectaculaire.",
              "A concrete decision conveys the House better than a spectacular claim.",
            ],
            en,
          ),
          question(
            [
              "Un client cite une maison qu’il apprécie. Que faites-vous ?",
              "A guest mentions a house they enjoy. What do you do?",
            ],
            [
              [
                "Vous démontrez qu’elle est dépassée",
                "Demonstrate that it is outdated",
              ],
              ["Vous évitez toute réponse", "Avoid responding"],
              [
                "Vous écoutez et présentez les choix propres à Grande Charte",
                "Listen and explain Grande Charte’s own choices",
              ],
            ],
            2,
            [
              "Respecter sa référence permet une découverte ouverte et précise.",
              "Respecting their reference enables an open, accurate discovery.",
            ],
            en,
          ),
          scenario(
            [
              "Présentez Grande Charte à un sommelier qui ne connaît pas la Maison, en trois phrases.",
              "Introduce Grande Charte to a sommelier unfamiliar with the House, in three sentences.",
            ],
            [
              [
                "Une idée claire sur les collections",
                "A clear idea about the collections",
              ],
              [
                "Un pilier relié à un exemple réel",
                "A pillar connected to a real example",
              ],
              [
                "Une invitation à découvrir, sans comparaison dépréciative",
                "An invitation to discover, without disparaging comparisons",
              ],
            ],
            en,
          ),
        ],
      },
    },
    {
      ...base(
        "II",
        ["Les collections", "The collections"],
        [
          "Choisir une cuvée et vérifier ses caractéristiques sans les généraliser.",
          "Choose a cuvée and check its characteristics without generalising.",
        ],
        12,
        "/training/gc5.png",
        ["Flacon de la collection GC-5", "Bottle from the GC-5 collection"],
      ),
      sections: [
        section(
          "01",
          ["Trois axes de création", "Three creative directions"],
          [
            [
              "GC-5 explore l’art de l’équilibre : assemblage et dosage se répondent. GC-4 explore une ligne sensorielle et la pureté de son expression. Iroise prolonge la recherche par le temps sous la mer.",
              "GC-5 explores the art of balance: blending and dosage work together. GC-4 explores a sensory line and the purity of its expression. Iroise extends the quest through time beneath the sea.",
            ],
            [
              "Ces axes aident à situer un vin. Ils ne remplacent pas sa fiche technique et ne forment pas une hiérarchie de qualité.",
              "These directions help situate a wine. They do not replace its technical specification or form a hierarchy of quality.",
            ],
          ],
          en,
        ),
        section(
          "02",
          [
            "GC-5 : l’équilibre en plusieurs expressions",
            "GC-5: several expressions of balance",
          ],
          [
            [
              "Les dosages et les durées d’élevage ci-dessous appartiennent aux éditions décrites dans la brochure. Une nouvelle édition peut avoir d’autres paramètres.",
              "The dosages and ageing durations below belong to the releases described in the brochure. A new release may have different parameters.",
            ],
          ],
          en,
          {
            cuvees: [
              {
                name: "GC-5 Trois Cépages",
                blend: "80 % Meunier · 15 % Pinot Noir · 5 % Chardonnay",
                dosage: "1,71 g/L",
                aging: en ? "6 years" : "6 ans",
                bottles: "4 493",
                spirit: en
                  ? "A tribute to Meunier within the House’s exploration of balance."
                  : "Un hommage au Meunier dans la recherche d’équilibre de la Maison.",
              },
              {
                name: "GC-5 Quatre Cépages",
                blend:
                  "70 % Pinot Noir · 12 % Pinot Blanc · 9 % Meunier · 9 % Chardonnay",
                dosage: "2,93 g/L",
                aging: en ? "5 years" : "5 ans",
                bottles: "5 137",
                spirit: en
                  ? "Pinot Blanc gives this blend a distinct creative direction."
                  : "Le Pinot Blanc donne à cet assemblage une direction de création particulière.",
              },
              {
                name: "GC-5 Vintage 2004",
                blend: "80 % Pinot Noir · 20 % Chardonnay",
                dosage: "3,6 g/L",
                aging: en ? "13 years" : "13 ans",
                bottles: "3 000",
                spirit: en
                  ? "A vintage expression. Keep it distinct from the 2007."
                  : "Une expression millésimée. À distinguer du 2007.",
              },
              {
                name: "GC-5 Vintage 2007",
                blend: "80 % Pinot Noir · 20 % Chardonnay",
                dosage: "3,6 g/L",
                aging: en ? "10 years" : "10 ans",
                bottles: "3 000",
                spirit: en
                  ? "The same proportions do not mean the same wine or ageing duration."
                  : "Les mêmes proportions ne signifient ni le même vin ni la même durée d’élevage.",
              },
              {
                name: "GC-5 Rosé",
                blend: "56 % Pinot Noir · 33 % Meunier · 11 % Chardonnay",
                dosage: "8 g/L",
                aging: en ? "6 years" : "6 ans",
                bottles: "440",
                spirit: en
                  ? "A distinct rosé expression, not a variation sharing every specification of the white wines."
                  : "Une expression rosée singulière, sans reprise automatique des paramètres des vins blancs.",
              },
            ],
          },
        ),
        section(
          "03",
          ["GC-4 : des lignes singulières", "GC-4: distinct lines"],
          [
            [
              "Le Blanc de Noirs associe 50 % Pinot Noir et 50 % Meunier. La brochure indique 4,5 g/L et sept ans sur lies. GC-4 2000 est un 100 % Chardonnay, avec 3,4 g/L et vingt-quatre ans sur lies.",
              "Blanc de Noirs blends 50% Pinot Noir and 50% Meunier. The brochure records 4.5 g/L and seven years on lees. GC-4 2000 is 100% Chardonnay, with 3.4 g/L and twenty-four years on lees.",
            ],
            [
              "ALBA 18 Magnum associe 80 % Pinot Noir et 20 % Chardonnay, avec 4,33 g/L et sept ans sur lies. Le Rosé présente une autre expression : 56 % Pinot Noir, 33 % Meunier, 11 % Chardonnay, 8 g/L et dix ans sur lies.",
              "ALBA 18 Magnum blends 80% Pinot Noir and 20% Chardonnay, with 4.33 g/L and seven years on lees. Rosé presents another expression: 56% Pinot Noir, 33% Meunier, 11% Chardonnay, 8 g/L and ten years on lees.",
            ],
            [
              "Le nom de la collection ne suffit donc pas à déduire la couleur, l’assemblage, le dosage ou le format.",
              "The collection name alone cannot tell you the colour, blend, dosage or format.",
            ],
          ],
          en,
        ),
        section(
          "04",
          ["Recommander, puis vérifier", "Recommend, then verify"],
          [
            [
              "Demandez ce que la personne cherche : tension, maturité, texture, découverte d’un cépage, format ou occasion. Proposez ensuite un vin et expliquez le lien avec cette attente.",
              "Ask what the person seeks: tension, maturity, texture, discovery of a grape, format or occasion. Then suggest a wine and explain the connection to that expectation.",
            ],
            [
              "Avant toute proposition commerciale, confirmez l’édition, le format, le prix applicable et la disponibilité. Les quantités de la brochure sont des tirages, pas un inventaire en temps réel.",
              "Before any commercial offer, confirm the release, format, applicable price and availability. Brochure quantities describe releases, not a live inventory.",
            ],
          ],
          en,
        ),
      ],
      quiz: {
        title: text(["Distinguer les cuvées", "Distinguishing the cuvées"], en),
        questions: [
          question(
            [
              "Quelle est la place du Meunier dans GC-5 Trois Cépages ?",
              "What proportion of GC-5 Trois Cépages is Meunier?",
            ],
            [
              ["5 %", "5%"],
              ["80 %", "80%"],
              ["15 %", "15%"],
            ],
            1,
            [
              "La fiche indique 80 % Meunier, 15 % Pinot Noir et 5 % Chardonnay.",
              "The specification records 80% Meunier, 15% Pinot Noir and 5% Chardonnay.",
            ],
            en,
          ),
          question(
            [
              "Peut-on annoncer un dosage unique pour toute la Maison ?",
              "Can one dosage be stated for the entire House?",
            ],
            [
              ["Oui, 2 g/L", "Yes, 2 g/L"],
              [
                "Oui, il dépend seulement de la collection",
                "Yes, it depends only on the collection",
              ],
              [
                "Non, il faut vérifier chaque cuvée et édition",
                "No, check each cuvée and release",
              ],
            ],
            2,
            [
              "La brochure documente plusieurs dosages. Le vin précis est la bonne unité de référence.",
              "The brochure documents several dosages. The specific wine is the right reference.",
            ],
            en,
          ),
          question(
            [
              "Que signifie un nombre de flacons dans la brochure ?",
              "What does a bottle quantity in the brochure mean?",
            ],
            [
              [
                "Le tirage documenté de l’édition",
                "The documented release quantity",
              ],
              ["Le stock disponible aujourd’hui", "Today’s available stock"],
              [
                "Une allocation déjà réservée au client",
                "An allocation already reserved for the guest",
              ],
            ],
            0,
            [
              "Le stock et les allocations doivent être confirmés séparément.",
              "Stock and allocations must be confirmed separately.",
            ],
            en,
          ),
          scenario(
            [
              "Un collectionneur hésite entre un millésime et ALBA 18 Magnum. Comment ouvrez-vous la conversation et que vérifiez-vous avant une offre ?",
              "A collector is choosing between a vintage wine and ALBA 18 Magnum. How do you open the conversation, and what do you check before making an offer?",
            ],
            [
              [
                "Une question sur l’occasion et ses attentes",
                "A question about the occasion and their expectations",
              ],
              [
                "Une distinction entre édition, élevage et format",
                "A distinction between release, ageing and format",
              ],
              [
                "Une vérification du prix et de la disponibilité",
                "A check of price and availability",
              ],
            ],
            en,
          ),
        ],
      },
    },
    {
      ...base(
        "III",
        ["Iroise 769", "Iroise 769"],
        [
          "Raconter l’immersion et ses effets perçus avec justesse.",
          "Explain immersion and its perceived effects accurately.",
        ],
        10,
        "/training/iroise.jpg",
        [
          "Flacon Iroise 769, photographie Alban Couturier",
          "Iroise 769 bottle, photograph by Alban Couturier",
        ],
      ),
      sections: [
        section(
          "01",
          ["769 jours sous la mer", "769 days beneath the sea"],
          [
            [
              "Iroise 769 est issue de vins de la collection GC-5 immergés en mer d’Iroise pendant 769 jours, à soixante mètres de profondeur. La brochure situe cette mer entre Ouessant et la côte bretonne, près de Brest.",
              "Iroise 769 originates from GC-5 wines immersed in the Iroise Sea for 769 days, at a depth of sixty metres. The brochure locates this sea between Ouessant and the coast of Brittany, near Brest.",
            ],
            [
              "769 jours représente un peu plus de deux ans, et non deux ans et une semaine. Gardez de préférence la durée exacte : elle donne son nom à cette expérience.",
              "769 days is a little over two years, not two years and one week. Prefer the exact duration: it gives this experience its name.",
            ],
            [
              "Le récit de cette immersion historique ne doit pas être appliqué automatiquement aux immersions suivantes. La recherche se poursuit avec des cuvées sélectionnées.",
              "The account of this historic immersion must not automatically be applied to later immersions. The research continues with selected cuvées.",
            ],
          ],
          en,
          {
            facts: [
              {
                label: en ? "Duration" : "Durée",
                value: en ? "769 days" : "769 jours",
              },
              {
                label: en ? "Depth" : "Profondeur",
                value: en
                  ? "60 metres, historic immersion"
                  : "60 mètres, immersion historique",
              },
              { label: en ? "Origin" : "Origine", value: "GC-5" },
            ],
          },
        ),
        section(
          "02",
          ["Faits, sensations, hypothèses", "Facts, sensations, hypotheses"],
          [
            [
              "La durée, la profondeur et l’origine des vins sont des faits documentés. La texture renouvelée au retour est une observation de dégustation décrite par la Maison.",
              "Duration, depth and the wines’ origin are documented facts. A renewed texture on return is a tasting observation described by the House.",
            ],
            [
              "La pression augmente avec la profondeur. Cela ne démontre pas, à lui seul, un mécanisme précis dans la bouteille. Ne promettez ni arrêt complet de l’oxydation ni suspension permanente des lies.",
              "Pressure increases with depth. This alone does not demonstrate a precise mechanism inside the bottle. Do not promise a complete halt to oxidation or permanently suspended lees.",
            ],
            [
              "Pour parler d’une cause scientifique, il faut des mesures et une comparaison adaptée. L’intérêt du vin peut être raconté sans transformer une hypothèse en certitude.",
              "A scientific causal claim requires measurements and an appropriate comparison. The wine’s interest can be explained without turning a hypothesis into certainty.",
            ],
          ],
          en,
        ),
        section(
          "03",
          ["Inviter à percevoir", "An invitation to perceive"],
          [
            [
              "Présentez d’abord l’expérience d’élevage. Proposez ensuite d’observer la texture, la mousse et la longueur. Laissez l’interlocuteur nommer ses perceptions avant de proposer les vôtres.",
              "Introduce the ageing experience first. Then invite attention to texture, mousse and length. Let the guest name their perceptions before offering yours.",
            ],
            [
              "Formulation possible : « Ce vin a passé 769 jours sous la mer d’Iroise. Au retour, la Maison a observé une texture renouvelée. Qu’est-ce que vous percevez dans sa mousse et sa longueur ? »",
              "Possible wording: ‘This wine spent 769 days beneath the Iroise Sea. On return, the House observed a renewed texture. What do you perceive in its mousse and length?’",
            ],
            [
              "Une sensation saline n’est pas la preuve que le sel de mer a pénétré le vin. Distinguez le vocabulaire sensoriel de l’explication physique.",
              "A saline sensation is not proof that sea salt entered the wine. Distinguish sensory vocabulary from physical explanation.",
            ],
          ],
          en,
        ),
        section(
          "04",
          ["La quête continue", "The quest continues"],
          [
            [
              "La brochure mentionne de nouvelles immersions. Pour un récit récent, utilisez une vidéo datée et les paramètres confirmés de l’opération : cuvées, durée prévue ou réalisée et profondeur.",
              "The brochure mentions further immersions. For a recent account, use dated footage and confirmed parameters: cuvées, planned or actual duration, and depth.",
            ],
            [
              "La vidéo de la nouvelle immersion sera ajoutée quand elle sera disponible. Elle illustrera une opération précise, sans modifier rétrospectivement les faits d’Iroise 769.",
              "Footage of the new immersion will be added when available. It will illustrate a specific operation without retrospectively changing the facts of Iroise 769.",
            ],
          ],
          en,
        ),
      ],
      quiz: {
        title: text(["Raconter Iroise", "Explaining Iroise"], en),
        questions: [
          question(
            ["Que désigne 769 ?", "What does 769 refer to?"],
            [
              ["La profondeur en mètres", "Depth in metres"],
              [
                "Le nombre de jours de l’immersion historique",
                "The number of days of the historic immersion",
              ],
              [
                "Le nombre de flacons disponibles aujourd’hui",
                "The number of bottles available today",
              ],
            ],
            1,
            [
              "Le nom fait référence à 769 jours sous la mer.",
              "The name refers to 769 days beneath the sea.",
            ],
            en,
          ),
          question(
            [
              "Quelle affirmation est justifiée par la brochure ?",
              "Which statement is supported by the brochure?",
            ],
            [
              ["L’oxydation s’arrête totalement", "Oxidation stops completely"],
              ["Le sel de mer entre dans le vin", "Sea salt enters the wine"],
              [
                "La Maison décrit une texture renouvelée au retour",
                "The House describes a renewed texture on return",
              ],
            ],
            2,
            [
              "C’est une observation sensorielle. Elle ne démontre pas à elle seule son mécanisme.",
              "This is a sensory observation. It does not itself establish the mechanism.",
            ],
            en,
          ),
          question(
            [
              "Comment présenter une nouvelle immersion ?",
              "How should a new immersion be described?",
            ],
            [
              [
                "Avec ses propres paramètres confirmés",
                "With its own confirmed parameters",
              ],
              [
                "En reprenant automatiquement les 769 jours",
                "By automatically reusing the 769 days",
              ],
              [
                "Comme la preuve que toutes les cuvées sont immergées",
                "As proof that all cuvées are immersed",
              ],
            ],
            0,
            [
              "Chaque opération doit être datée et documentée séparément.",
              "Each operation should be dated and documented separately.",
            ],
            en,
          ),
          scenario(
            [
              "Un invité demande : « Est-ce la pression qui change le goût ? » Répondez sans perdre l’intérêt du récit.",
              "A guest asks: ‘Is pressure what changes the taste?’ Respond while keeping the story engaging.",
            ],
            [
              [
                "Citer les faits documentés de l’immersion",
                "State the documented immersion facts",
              ],
              [
                "Distinguer la texture observée du mécanisme non démontré",
                "Distinguish observed texture from an unproven mechanism",
              ],
              [
                "Inviter à goûter sans inventer de causalité",
                "Invite tasting without inventing causality",
              ],
            ],
            en,
          ),
        ],
      },
    },
    {
      ...base(
        "IV",
        ["La conversation", "The conversation"],
        [
          "Écouter, expliquer et répondre aux objections sans réciter.",
          "Listen, explain and respond to objections without reciting.",
        ],
        9,
        "/training/gc5.png",
        [
          "Un flacon Grande Charte à découvrir",
          "A Grande Charte bottle to discover",
        ],
      ),
      sections: [
        section(
          "01",
          ["Avant de raconter, écouter", "Listen before telling the story"],
          [
            [
              "Une bonne ouverture cherche une attente réelle : « Quel Champagne aimez-vous ? », « Pour quelle occasion ? », « Préférez-vous explorer la maturité ou la tension ? » Une seule question suffit souvent.",
              "A good opening identifies a real expectation: ‘What Champagne do you enjoy?’, ‘What occasion is this for?’, ‘Would you prefer to explore maturity or tension?’ One question is often enough.",
            ],
            [
              "Reformulez brièvement la réponse. Choisissez ensuite un fait et une cuvée qui répondent à cette attente. L’histoire de la Maison prend sa place dans cette relation.",
              "Briefly reflect their answer. Then choose a fact and a cuvée that address that expectation. The House’s story finds its place within that relationship.",
            ],
          ],
          en,
        ),
        section(
          "02",
          ["Une conversation, trois gestes", "Three moves in a conversation"],
          [
            [
              "Écouter : comprendre l’occasion et les références de la personne. Éclairer : apporter une distinction concrète entre deux vins ou deux modes d’élevage. Inviter : proposer de goûter ou d’approfondir, sans forcer une décision.",
              "Listen: understand the person’s occasion and references. Clarify: offer a concrete distinction between two wines or ageing methods. Invite: suggest tasting or exploring further, without forcing a decision.",
            ],
            [
              "Adaptez la profondeur. Un sommelier peut attendre des détails d’assemblage. Un invité peut surtout vouloir comprendre ce qu’il va découvrir. Aucun des deux n’a besoin d’une récitation complète.",
              "Adapt the depth. A sommelier may seek blending details. A guest may simply want to understand what they will discover. Neither needs a full recitation.",
            ],
          ],
          en,
        ),
        section(
          "03",
          [
            "Quand une objection devient utile",
            "When an objection becomes useful",
          ],
          [
            [
              "« Pourquoi ce prix ? » : demandez quelle comparaison la personne a en tête, puis expliquez l’édition, l’élevage et le format documentés. La rareté seule ne répond pas à toutes les questions de valeur.",
              "‘Why this price?’: ask what comparison the person has in mind, then explain the documented release, ageing and format. Rarity alone does not answer every question of value.",
            ],
            [
              "« Je préfère une maison connue. » : accueillez cette préférence. Présentez Grande Charte comme une découverte possible, avec une singularité concrète, sans remettre en cause son goût.",
              "‘I prefer a familiar house.’: welcome that preference. Present Grande Charte as a possible discovery with a concrete distinction, without questioning their taste.",
            ],
            [
              "« Combien en reste-t-il ? » : confirmez la disponibilité auprès de la Maison. Un tirage historique n’est pas une réponse à une question de stock.",
              "‘How many are left?’: confirm availability with the House. A historical release quantity does not answer a stock question.",
            ],
          ],
          en,
        ),
        section(
          "04",
          ["Savoir dire : je vérifie", "Knowing when to say: I will check"],
          [
            [
              "« Je préfère vous confirmer ce point précisément. Je le vérifie auprès de la Maison et je reviens vers vous. » Cette phrase protège la relation et engage un suivi réel.",
              "‘I would prefer to confirm that detail accurately. I will check it with the House and get back to you.’ This protects the relationship and commits you to actual follow-up.",
            ],
            [
              "Notez la question, la personne responsable de la réponse et le délai annoncé. Une promesse de suivi sans action fragilise la confiance.",
              "Record the question, who is responsible for answering it, and the promised timeframe. A follow-up promise without action weakens trust.",
            ],
          ],
          en,
        ),
      ],
      quiz: {
        title: text(["Mener la conversation", "Leading the conversation"], en),
        questions: [
          question(
            [
              "Quelle ouverture sert le mieux la relation ?",
              "Which opening best serves the relationship?",
            ],
            [
              [
                "Demander l’occasion et les goûts de la personne",
                "Ask about the person’s occasion and tastes",
              ],
              ["Réciter toutes les collections", "Recite every collection"],
              [
                "Annoncer immédiatement une supériorité",
                "Immediately claim superiority",
              ],
            ],
            0,
            [
              "L’écoute détermine ce qui sera pertinent dans votre réponse.",
              "Listening determines what will be relevant in your response.",
            ],
            en,
          ),
          question(
            [
              "Vous ignorez un détail technique. Que faites-vous ?",
              "You do not know a technical detail. What do you do?",
            ],
            [
              [
                "Vous proposez une explication plausible",
                "Offer a plausible explanation",
              ],
              [
                "Vous annoncez une vérification et organisez le suivi",
                "Promise a check and organise follow-up",
              ],
              [
                "Vous changez de sujet sans répondre",
                "Change the subject without responding",
              ],
            ],
            1,
            [
              "La précision suppose d’assumer ce que l’on doit vérifier.",
              "Accuracy requires acknowledging what needs to be checked.",
            ],
            en,
          ),
          question(
            [
              "Un invité préfère une maison connue. Quelle posture adopter ?",
              "A guest prefers a familiar house. What approach should you take?",
            ],
            [
              ["Critiquer cette maison", "Criticise that house"],
              [
                "Insister jusqu’à le convaincre",
                "Insist until they are convinced",
              ],
              [
                "Respecter sa préférence et proposer une découverte",
                "Respect their preference and offer a discovery",
              ],
            ],
            2,
            [
              "La confiance se construit sans déprécier les choix de l’invité.",
              "Trust is built without belittling the guest’s choices.",
            ],
            en,
          ),
          scenario(
            [
              "Un invité dit : « À ce prix, je préfère acheter une référence que je connais. » Écrivez une réponse courte, puis une question.",
              "A guest says: ‘At this price, I would rather buy a wine I already know.’ Write a brief response, then a question.",
            ],
            [
              ["Accueillir son point de vue", "Acknowledge their viewpoint"],
              [
                "Apporter un fait pertinent, sans superlatif",
                "Offer a relevant fact without superlatives",
              ],
              [
                "Poser une question qui ouvre la découverte",
                "Ask a question that opens a discovery",
              ],
            ],
            en,
          ),
        ],
      },
    },
    {
      ...base(
        "V",
        ["L’expérience et le suivi", "The experience and follow-up"],
        [
          "Préparer une rencontre et assurer un suivi fiable.",
          "Prepare a meeting and ensure reliable follow-up.",
        ],
        9,
        "/training/cork.webp",
        [
          "Bouchon et détail du flacon Grande Charte",
          "Grande Charte cork and bottle detail",
        ],
      ),
      sections: [
        section(
          "01",
          ["Préparer avec attention", "Prepare with care"],
          [
            [
              "Confirmez les participants, l’occasion, les vins et les formats. Vérifiez les informations de service propres aux cuvées auprès de la Maison, ainsi que le matériel, le lieu et les contraintes de transport.",
              "Confirm participants, occasion, wines and formats. Check cuvée-specific service guidance with the House, together with equipment, venue and transport constraints.",
            ],
            [
              "Contrôlez l’état des flacons et identifiez exactement les éditions. Préparez de l’eau, des verres propres et un rythme qui permette de goûter. Ne laissez pas la mise en scène masquer le vin.",
              "Check the bottles’ condition and identify the exact releases. Prepare water, clean glasses and a pace that allows tasting. Do not let presentation obscure the wine.",
            ],
            [
              "Une température, un ordre de service ou une recommandation de garde ne se déduit pas du seul nom d’une collection. Suivez la consigne validée pour les vins présentés.",
              "Temperature, serving order or cellaring guidance cannot be inferred from the collection name alone. Follow the validated guidance for the wines being presented.",
            ],
          ],
          en,
        ),
        section(
          "02",
          [
            "Créer les conditions de la découverte",
            "Create the conditions for discovery",
          ],
          [
            [
              "Présentez le vin avant de développer tout son récit. Donnez un repère d’attention : la texture, la mousse, la tension ou la longueur. Laissez un moment de silence et recueillez les perceptions.",
              "Introduce the wine before developing its whole story. Offer a point of attention: texture, mousse, tension or length. Allow a moment of silence and gather perceptions.",
            ],
            [
              "Pour une comparaison, annoncez les vins et les conditions. Une dégustation comparative est une occasion d’observer, pas une preuve scientifique d’une supériorité ou d’un mécanisme.",
              "For a comparison, identify the wines and conditions. A comparative tasting is an opportunity to observe, not scientific proof of superiority or a mechanism.",
            ],
            [
              "Adaptez le rythme à la personne. Certains souhaitent explorer les fiches ; d’autres préfèrent une première impression et une conversation.",
              "Adapt the pace to the person. Some wish to explore the specifications; others prefer a first impression and conversation.",
            ],
          ],
          en,
        ),
        section(
          "03",
          ["Une allocation se confirme", "An allocation must be confirmed"],
          [
            [
              "Une demande n’est pas une allocation acquise. Confirmez la référence, le format, la quantité et les conditions auprès de la Maison avant d’engager une disponibilité ou une livraison.",
              "A request is not a secured allocation. Confirm the reference, format, quantity and conditions with the House before committing to availability or delivery.",
            ],
            [
              "Distinguez le prix des vins, les taxes applicables, le transport et les éventuelles formalités. N’improvisez ni délai, ni statut fiscal, ni condition de réservation.",
              "Distinguish wine price, applicable taxes, transport and any formalities. Do not improvise a timeframe, tax status or reservation condition.",
            ],
          ],
          en,
        ),
        section(
          "04",
          [
            "Le soin se poursuit après la rencontre",
            "Care continues after the meeting",
          ],
          [
            [
              "Notez les vins goûtés, les préférences exprimées et les engagements pris. Adressez le suivi convenu avec les informations confirmées. Faites remonter à la Maison les questions techniques et les demandes particulières.",
              "Record wines tasted, expressed preferences and commitments made. Provide the agreed follow-up with confirmed information. Refer technical questions and special requests to the House.",
            ],
            [
              "Les notes personnelles du carnet de formation restent sur cet appareil. Elles ne remplacent pas le suivi commercial partagé et ne doivent pas contenir de données confidentielles sur les clients.",
              "Personal training notebook notes stay on this device. They do not replace shared commercial follow-up and should not contain confidential guest information.",
            ],
          ],
          en,
        ),
      ],
      quiz: {
        title: text(["Préparer et suivre", "Preparing and following up"], en),
        questions: [
          question(
            [
              "Que faut-il confirmer avant une dégustation ?",
              "What should be confirmed before a tasting?",
            ],
            [
              [
                "Seulement le nombre de bouteilles",
                "Only the number of bottles",
              ],
              [
                "Les éditions, les formats et les consignes de service",
                "Releases, formats and serving guidance",
              ],
              [
                "Une température universelle pour tout Champagne",
                "One universal temperature for all Champagne",
              ],
            ],
            1,
            [
              "Le service se prépare autour des vins précis et du contexte.",
              "Service is prepared around the specific wines and context.",
            ],
            en,
          ),
          question(
            [
              "Une demande de six flacons est-elle une allocation ?",
              "Is a request for six bottles an allocation?",
            ],
            [
              [
                "Oui, dès que le client la formule",
                "Yes, as soon as the guest asks",
              ],
              [
                "Oui, si le tirage dépasse six flacons",
                "Yes, if the release exceeds six bottles",
              ],
              [
                "Non, disponibilité et conditions doivent être confirmées",
                "No, availability and conditions must be confirmed",
              ],
            ],
            2,
            [
              "N’engagez pas la Maison avant la confirmation de l’offre.",
              "Do not commit the House before the offer is confirmed.",
            ],
            en,
          ),
          question(
            [
              "Que doit contenir un suivi utile ?",
              "What should useful follow-up contain?",
            ],
            [
              [
                "Les préférences et les engagements confirmés",
                "Preferences and confirmed commitments",
              ],
              [
                "Un message générique identique pour tous",
                "An identical generic message for everyone",
              ],
              [
                "Une explication technique non vérifiée",
                "An unverified technical explanation",
              ],
            ],
            0,
            [
              "Le suivi prolonge l’attention portée à la personne.",
              "Follow-up extends the attention given to the person.",
            ],
            en,
          ),
          scenario(
            [
              "Après une dégustation, un invité souhaite deux magnums pour une date précise. Décrivez les vérifications et le suivi avant de lui confirmer l’offre.",
              "After a tasting, a guest wants two magnums for a specific date. Describe the checks and follow-up before confirming the offer.",
            ],
            [
              [
                "Identifier la cuvée, l’édition et le format",
                "Identify cuvée, release and format",
              ],
              [
                "Confirmer disponibilité, prix, transport et délai",
                "Confirm availability, price, transport and timeframe",
              ],
              [
                "Annoncer un suivi clair sans promettre avant confirmation",
                "Explain follow-up without making an unconfirmed promise",
              ],
            ],
            en,
          ),
        ],
      },
    },
    {
      ...base(
        "VI",
        ["Représenter la Maison", "Representing the House"],
        [
          "Adapter le récit au contexte et distinguer formation, mandat et présence commerciale.",
          "Adapt the story to context and distinguish training, mandate and commercial presence.",
        ],
        8,
        "/training/plaque.jpg",
        [
          "Le signe de la Maison Grande Charte",
          "The sign of Maison Grande Charte",
        ],
      ),
      sections: [
        section(
          "01",
          [
            "Une identité, plusieurs contextes",
            "One identity, several contexts",
          ],
          [
            [
              "Les trois piliers restent les mêmes d’un pays à l’autre. La langue, le niveau de détail, le format de rencontre et les contraintes commerciales s’adaptent au contexte.",
              "The three pillars remain the same from country to country. Language, depth of detail, meeting format and commercial constraints adapt to context.",
            ],
            [
              "N’assimilez pas une rencontre ponctuelle à une implantation, ni un contact à un distributeur. Une présence commerciale se décrit avec un statut et une date vérifiés.",
              "Do not equate a one-off meeting with a market presence, or a contact with a distributor. Commercial presence should be described with a verified status and date.",
            ],
          ],
          en,
        ),
        section(
          "02",
          ["Les faits voyagent avec précision", "Facts travel with precision"],
          [
            [
              "Les noms des vins, les millésimes, les formats et les chiffres restent exacts dans les deux langues. Traduisez l’intention et les nuances, sans ajouter de promesse.",
              "Wine names, vintages, formats and figures remain accurate in both languages. Translate intention and nuance without adding a promise.",
            ],
            [
              "Situez correctement les lieux : Vancouver est au Canada, Courchevel en France. Ne déduisez pas un marché actif d’une ville citée dans un ancien document.",
              "Locate places correctly: Vancouver is in Canada, Courchevel in France. Do not infer an active market from a city mentioned in an older document.",
            ],
            [
              "Pour une présentation locale, faites confirmer les références disponibles, le partenaire habilité et les conditions par la Maison.",
              "For a local presentation, have the House confirm available references, the authorised partner and conditions.",
            ],
          ],
          en,
        ),
        section(
          "03",
          [
            "Un rôle clair protège la relation",
            "A clear role protects the relationship",
          ],
          [
            [
              "Terminer cette formation ne confère pas automatiquement un mandat de représentation, une exclusivité ou le droit d’engager des conditions commerciales.",
              "Completing this training does not automatically grant a representation mandate, exclusivity or the right to commit to commercial conditions.",
            ],
            [
              "Présentez votre rôle tel qu’il a été convenu avec la Maison. Faites valider tout accord, annonce publique ou proposition qui dépasse ce périmètre.",
              "Describe your role as agreed with the House. Obtain validation for any agreement, public announcement or offer outside that scope.",
            ],
          ],
          en,
        ),
        section(
          "04",
          ["De la formation à la pratique", "From training to practice"],
          [
            [
              "Les questionnaires vérifient des repères de connaissance. Les situations écrites servent à préparer votre parole et votre jugement. Elles sont auto-évaluées, sans correction humaine automatique.",
              "The questionnaires check knowledge reference points. Written situations prepare your words and judgement. They are self-assessed, without automatic human review.",
            ],
            [
              "Avant de représenter la Maison, partagez une présentation, une recommandation de cuvée et une réponse à une objection avec votre référent. Un échange réel permet d’apprécier la justesse de votre pratique.",
              "Before representing the House, share an introduction, a cuvée recommendation and an objection response with your contact. A real exchange allows the accuracy of your practice to be assessed.",
            ],
            [
              "Conservez l’habitude de vérifier. Une formation solide donne des repères, et le discernement de savoir quand une information doit être confirmée.",
              "Keep the habit of checking. Sound training provides reference points and the judgement to know when information needs confirmation.",
            ],
          ],
          en,
        ),
      ],
      quiz: {
        title: text(["Préciser son rôle", "Clarifying your role"], en),
        questions: [
          question(
            [
              "Que prouve une rencontre dans un pays ?",
              "What does a meeting in a country establish?",
            ],
            [
              ["Une distribution exclusive", "Exclusive distribution"],
              [
                "Une rencontre, sans prouver une implantation commerciale",
                "A meeting, without establishing commercial presence",
              ],
              [
                "Une disponibilité de toutes les cuvées",
                "Availability of all cuvées",
              ],
            ],
            1,
            [
              "Le statut commercial doit être confirmé séparément.",
              "Commercial status must be confirmed separately.",
            ],
            en,
          ),
          question(
            [
              "Que confère la fin de ce parcours ?",
              "What does completing this programme grant?",
            ],
            [
              [
                "Un mandat automatique de représentation",
                "An automatic representation mandate",
              ],
              [
                "Le droit de négocier toute condition",
                "The right to negotiate any conditions",
              ],
              [
                "Une attestation des vérifications de connaissances réalisées",
                "A record of completed knowledge checks",
              ],
            ],
            2,
            [
              "Le mandat et la pratique se valident séparément auprès de la Maison.",
              "Mandate and practice are validated separately with the House.",
            ],
            en,
          ),
          question(
            [
              "Que préserver dans une adaptation internationale ?",
              "What should an international adaptation preserve?",
            ],
            [
              [
                "L’identité et les faits exacts, en adaptant la conversation",
                "Identity and accurate facts while adapting the conversation",
              ],
              [
                "Un discours identique mot pour mot",
                "An identical word-for-word speech",
              ],
              ["Des chiffres plus impressionnants", "More impressive figures"],
            ],
            0,
            [
              "La fidélité concerne le sens et les faits, pas une récitation uniforme.",
              "Fidelity concerns meaning and facts, not uniform recitation.",
            ],
            en,
          ),
          scenario(
            [
              "Un partenaire vous demande d’annoncer que vous êtes le représentant exclusif de Grande Charte dans son pays. Votre formation est terminée, mais aucun mandat n’est signé. Que répondez-vous ?",
              "A partner asks you to announce that you are Grande Charte’s exclusive representative in their country. You have completed training, but no mandate has been signed. What do you say?",
            ],
            [
              [
                "Distinguer la formation du mandat",
                "Distinguish training from mandate",
              ],
              [
                "Ne pas annoncer une exclusivité non confirmée",
                "Do not announce unconfirmed exclusivity",
              ],
              [
                "Proposer une validation auprès de la Maison",
                "Propose confirmation with the House",
              ],
            ],
            en,
          ),
        ],
      },
    },
  ];
}
