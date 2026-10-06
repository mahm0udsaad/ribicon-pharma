import { products, type PortfolioArea, type Product } from "@/lib/content";

// Language-independent fields (legacy URL, image path and size) are shared with the English data.
const shared = (slug: string) => {
  const { legacyUrl, image, imageWidth, imageHeight } = products.find((item) => item.slug === slug)!;
  return { legacyUrl, image, imageWidth, imageHeight };
};

export const portfolioAreasFr: PortfolioArea[] = [
  { slug: "solid-tumor-biomarkers", number: "01", title: "Biomarqueurs de tumeurs solides", eyebrow: "Diagnostic", summary: "Un portefeuille ciblé de biomarqueurs associés à l’évaluation et au suivi des tumeurs solides.", products: ["Alpha-fœtoprotéine (AFP)", "CA-125", "Carcinome gastrique GC-REAAD", "Carcinome hépatocellulaire HCC-REAAD", "Carcinome nasopharyngé NPC-REAAD"], image: "/hero-diagnostics.png", imageAlt: "Équipement de diagnostic en laboratoire et goutte d’échantillon" },
  { slug: "targeted-therapeutics", number: "02", title: "Thérapies ciblées", eyebrow: "Médicaments spécialisés", summary: "Des thérapies spécialisées destinées aux professionnels de la santé et aux établissements.", products: ["Tepadina (thiotépa)", "Phelinun (melphalan)"], image: "/therapeutics-editorial.jpg", imageAlt: "Professionnel de la santé préparant un flacon en laboratoire clinique" },
  { slug: "ophthalmology", number: "03", title: "Ophtalmologie", eyebrow: "Santé oculaire", summary: "Un portefeuille ophtalmologique concis pour la prise en charge de la pression intraoculaire.", products: ["Gouttes ophtalmiques de bimatoprost", "Gouttes ophtalmiques de latanoprost"], image: "/ophthalmology-editorial.jpg", imageAlt: "Patiente lors d’un examen ophtalmologique" },
  { slug: "cardiology", number: "04", title: "Cardiologie", eyebrow: "Diagnostic cardiaque", summary: "Des outils et tests diagnostiques pour soutenir l’évaluation cardiovasculaire.", products: ["ECG Vectraplex", "Test de troponine"], image: "/cardiology-signal.svg", imageAlt: "Illustration d’un signal électrocardiographique" },
  { slug: "veterinary-diagnostics", number: "05", title: "Diagnostics vétérinaires", eyebrow: "Portefeuille en développement", summary: "Un futur portefeuille de biomarqueurs diagnostiques. Les renseignements seront publiés après révision.", products: [], image: "/hero-diagnostics.png", imageAlt: "Équipement de laboratoire représentant les futurs diagnostics vétérinaires", status: "draft" },
  { slug: "infant-formula-children-food", number: "06", title: "Préparations pour nourrissons et aliments pour enfants", eyebrow: "Portefeuille en développement", summary: "Une future gamme de préparations pour nourrissons et d’aliments pour enfants. Les renseignements seront publiés après révision.", products: [], image: "/therapeutics-editorial.jpg", imageAlt: "Professionnel de la santé dans un laboratoire clinique", status: "draft" },
];

// Résumés paraphrasés à partir de l’ancien site ribicongroup.com; ébauches à réviser, non approuvées.
// Les spécifications et chiffres sont transcrits de l’ancien site et doivent être vérifiés avant publication.
const specsPrecision = { inter: "Précision inter-essai", intra: "Précision intra-essai" };

export const productsFr: Product[] = [
  {
    slug: "afp", name: "Alpha-fœtoprotéine (AFP)", area: "solid-tumor-biomarkers", category: "Biomarqueur de tumeur solide",
    overview: "Un biomarqueur de laboratoire associé à l’évaluation et au suivi dans certains contextes de tumeurs solides.",
    legacyContext: "L’ancien site présente l’AFP dans le contexte des cancers du foie, de l’ovaire et du testicule, en précisant que le résultat doit être interprété avec les autres données cliniques.",
    ...shared("afp"), imageAlt: "Tube de prélèvement sanguin portant l’étiquette AFP sur un formulaire de marqueurs tumoraux",
    highlights: [
      "Une analyse sanguine qui mesure l’alpha-fœtoprotéine, une protéine produite par le foie.",
      "Aide à diagnostiquer et à suivre les cancers du foie, des ovaires ou des testicules qui produisent des taux élevés d’AFP, lorsqu’elle est utilisée avec d’autres examens et tests.",
      "Sert à suivre la réponse d’un cancer au traitement et à vérifier s’il est réapparu.",
      "Ne permet pas à elle seule de dépister ou de diagnostiquer un cancer : d’autres affections augmentent l’AFP, et certains cancers la laissent normale.",
    ],
  },
  {
    slug: "ca-125", name: "CA-125", area: "solid-tumor-biomarkers", category: "Biomarqueur de tumeur solide",
    overview: "Un biomarqueur utilisé dans l’évaluation clinique et le suivi du cancer de l’ovaire.",
    legacyContext: "L’ancien site décrit le CA-125 dans le suivi de la réponse au traitement et de la récidive; il ne constitue pas à lui seul un diagnostic.",
    ...shared("ca-125"), imageAlt: "Tube de prélèvement sanguin portant l’étiquette CA 125 sur un formulaire de marqueurs tumoraux",
    highlights: [
      "Une analyse sanguine qui mesure le CA-125 (antigène cancéreux 125), un marqueur tumoral souvent élevé dans le cancer de l’ovaire.",
      "Utilisation la plus courante : vérifier si le traitement du cancer de l’ovaire fonctionne et si le cancer est réapparu.",
      "Peut être combiné à l’imagerie et à d’autres tests pour évaluer une masse pelvienne, ou chez les personnes à très haut risque de cancer de l’ovaire.",
      "Ce n’est pas un test de dépistage de routine : des affections non cancéreuses, comme l’endométriose ou les menstruations, peuvent aussi élever le CA-125.",
    ],
  },
  {
    slug: "gc-reaad", name: "Carcinome gastrique GC-REAAD", area: "solid-tumor-biomarkers", category: "Biomarqueur de tumeur solide",
    overview: "Une offre diagnostique associée au carcinome gastrique sur l’ancien site.",
    legacyContext: "La description historique mentionne un dosage ELISA ITIH3 sur plasma humain. La disponibilité, la validation et l’usage prévu doivent être confirmés.",
    ...shared("gc-reaad"), imageAlt: "Fiche de caractéristiques GC-REAAD ITIH3 présentant la sensibilité, la spécificité et les spécifications du dosage",
    highlights: [
      "Restalyst GC-REAAD™ ITIH3 ELISA : un diagnostic in vitro pour la détection qualitative et semi-quantitative de la protéine ITIH3 dans le plasma humain, destiné à la détection précoce du carcinome gastrique.",
      "Repose sur une technologie brevetée; l’ITIH3 serait élevée dans le plasma des patients atteints d’un carcinome gastrique, indépendamment de la gastrite ou de l’infection à H. pylori.",
      "Fournit un résultat de risque positif ou négatif à l’aide d’une échelle arbitraire appelée unités REAAD (RU).",
    ],
    howItWorks: "Un ELISA en sandwich. Des anticorps de capture fixés au fond des micropuits lient l’ITIH3 présente dans l’échantillon de plasma; des anticorps de détection et des anticorps secondaires conjugués à la HRP sont ajoutés, puis un substrat TMB produit un signal coloré dont l’intensité est proportionnelle à l’antigène présent. La lecture se fait sur tout spectrophotomètre ou lecteur ELISA approprié.",
    specs: [
      { label: "Sensibilité", value: "91,0 %" }, { label: "Spécificité", value: "93,6 %" },
      { label: specsPrecision.inter, value: "7,59 % – 8,64 %" }, { label: specsPrecision.intra, value: "3,32 % – 3,74 %" },
      { label: "Type d’échantillon", value: "Plasma" }, { label: "Durée du dosage (approx.)", value: "2 heures" },
      { label: "Volume d’échantillon du patient", value: "<10 µL" }, { label: "Durée de conservation", value: "12 mois" },
      { label: "Certification", value: "Certifié CE-IVD; enregistré auprès de la HSA (Singapour)" },
    ],
  },
  {
    slug: "hcc-reaad", name: "Carcinome hépatocellulaire HCC-REAAD", area: "solid-tumor-biomarkers", category: "Biomarqueur de tumeur solide",
    overview: "Une offre de biomarqueur diagnostique associée au carcinome hépatocellulaire.",
    legacyContext: "La description historique mentionne un dosage ELISA ERBB3 et un algorithme intégrant l’AFP. L’usage prévu précis doit être vérifié.",
    ...shared("hcc-reaad"), imageAlt: "Fiche de caractéristiques HCC-REAAD ERBB3 présentant la sensibilité, la spécificité et les spécifications du dosage",
    highlights: [
      "Restalyst HCC-REAAD™ ERBB3 ELISA : un diagnostic in vitro pour la détection qualitative et semi-quantitative de l’ERBB3 (HER-3) dans le sérum ou le plasma humain, destiné à la détection précoce du carcinome hépatocellulaire.",
      "L’ERBB3 (brevetée) serait élevée dans le sérum ou le plasma des patients atteints d’un carcinome hépatocellulaire.",
      "Un algorithme (régression logistique binaire) combinant l’ERBB3 et l’AFP est présenté comme une amélioration par rapport au dépistage de routine par l’AFP seule.",
    ],
    howItWorks: "Un ELISA en sandwich. Des anticorps de capture fixés au fond des micropuits lient l’ERBB3 présente dans l’échantillon; des anticorps de détection biotinylés et des anticorps secondaires conjugués à la HRP sont ajoutés, puis un substrat TMB produit un signal coloré proportionnel à l’antigène présent. La lecture se fait sur tout spectrophotomètre ou lecteur ELISA approprié.",
    specs: [
      { label: "Sensibilité", value: "91,1 %" }, { label: "Spécificité", value: "91,3 %" },
      { label: specsPrecision.inter, value: "2,16 % – 2,87 %" }, { label: specsPrecision.intra, value: "6,37 % – 8,10 %" },
      { label: "Type d’échantillon", value: "Sérum / plasma" }, { label: "Durée du dosage (approx.)", value: "2,0 heures" },
      { label: "Volume d’échantillon du patient", value: "<10 µL" }, { label: "Durée de conservation", value: "9 mois" },
      { label: "Certification", value: "Certifié CE-IVD; enregistré auprès de la HSA (Singapour)" },
    ],
  },
  {
    slug: "npc-reaad", name: "Carcinome nasopharyngé NPC-REAAD", area: "solid-tumor-biomarkers", category: "Biomarqueur de tumeur solide",
    overview: "Une offre de biomarqueur diagnostique associée au carcinome nasopharyngé.",
    legacyContext: "La description historique mentionne un dosage ELISA EBV EA-IgA sur sérum ou plasma. Les spécifications actuelles doivent être confirmées.",
    ...shared("npc-reaad"), imageAlt: "Fiche de caractéristiques NPC-REAAD présentant la sensibilité, la spécificité et les spécifications du dosage",
    highlights: [
      "Restalyst NPC-REAAD EBV EA-IgA ELISA : un diagnostic in vitro pour la détection qualitative et semi-quantitative des anticorps IgA dans le sérum ou le plasma humain, afin d’aider au diagnostic du carcinome nasopharyngé.",
      "Utilise des protéines très spécifiques du virus d’Epstein-Barr, produites par la technologie de l’ADN recombinant, pour détecter la réponse IgA contre l’antigène précoce (EA) du patient.",
      "Fournit un résultat de risque positif ou négatif à l’aide d’une échelle arbitraire appelée unités REAAD (RU).",
    ],
    howItWorks: "Des antigènes NPC recombinants sont fixés au fond des micropuits. Les IgA humaines dirigées contre les protéines EA de l’EBV se lient aux antigènes; après lavage, des anticorps secondaires conjugués à la HRP se fixent aux complexes et un substrat TMB produit un signal coloré proportionnel à la quantité présente. La lecture se fait sur tout spectrophotomètre ou lecteur ELISA approprié.",
    specsNote: "Le graphique d’origine affiche la sensibilité et la spécificité sous la forme « 960 % » et « 940 % »; elles sont présentées ici comme 96,0 % et 94,0 % et doivent être confirmées.",
    specs: [
      { label: "Sensibilité", value: "96,0 %" }, { label: "Spécificité", value: "94,0 %" },
      { label: specsPrecision.inter, value: "2,99 % – 3,65 %" }, { label: specsPrecision.intra, value: "3,15 % – 3,17 %" },
      { label: "Type d’échantillon", value: "Sérum / plasma" }, { label: "Durée du dosage (approx.)", value: "1,5 heure" },
      { label: "Volume d’échantillon du patient", value: "<10 µL" }, { label: "Durée de conservation", value: "13 mois" },
      { label: "Certification", value: "Certifié CE-IVD; enregistré auprès de la HSA (Singapour) et de la MDA (Malaisie)" },
    ],
  },
  {
    slug: "tepadina", name: "Tepadina (thiotépa)", area: "targeted-therapeutics", category: "Thérapie spécialisée",
    overview: "Un médicament spécialisé à base de thiotépa figurant dans l’ancien portefeuille thérapeutique de Ribicon.",
    legacyContext: "L’ancien site évoque son utilisation dans le conditionnement avant une greffe de cellules souches et dans certains contextes oncologiques. L’autorisation locale et les indications approuvées doivent être vérifiées.",
    ...shared("tepadina"), imageAlt: "Image de marque Tepadina avec illustration moléculaire",
    highlights: [
      "Substance active : le thiotépa, fourni sous forme de poudre pour solution pour perfusion (goutte-à-goutte dans une veine).",
      "Utilisé en association avec d’autres médicaments de chimiothérapie.",
      "Comme traitement de conditionnement (préparatoire) avant une greffe de cellules progénitrices hématopoïétiques chez des patients atteints de maladies du sang, dont la leucémie, ou de maladies entraînant une faible numération des globules rouges, comme la thalassémie ou la drépanocytose.",
      "Lors du traitement de tumeurs solides lorsqu’une chimiothérapie à haute dose suivie d’une greffe de cellules progénitrices hématopoïétiques est nécessaire.",
    ],
    specs: [{ label: "Concentrations indiquées", value: "15 mg, 100 mg, 200 mg, 400 mg" }],
  },
  {
    slug: "phelinun", name: "Phelinun (melphalan)", area: "targeted-therapeutics", category: "Thérapie spécialisée",
    overview: "Un médicament spécialisé à base de melphalan figurant dans l’ancien portefeuille thérapeutique.",
    legacyContext: "L’ancien site décrit des utilisations en oncologie et en transplantation. La disponibilité, l’étiquetage et les indications au Canada doivent être confirmés.",
    ...shared("phelinun"), imageAlt: "Image de marque Phelinun avec illustration moléculaire",
    highlights: [
      "Un médicament contre le cancer utilisé seul ou avec d’autres médicaments anticancéreux, la radiothérapie, ou les deux.",
      "Utilisations indiquées : myélome multiple, leucémie lymphoblastique aiguë et leucémie myéloïde aiguë; lymphomes hodgkiniens et non hodgkiniens; neuroblastome de l’enfant; cancer de l’ovaire; et adénocarcinome mammaire, un type de cancer du sein.",
      "Également utilisé avec d’autres médicaments cytotoxiques comme traitement de conditionnement avant une greffe de cellules souches chez les adultes et les enfants atteints de cancers du sang et de certains autres troubles sanguins chez l’enfant.",
    ],
    specs: [{ label: "Concentrations indiquées", value: "50 mg, 200 mg" }],
  },
  {
    slug: "bimatoprost", name: "Gouttes ophtalmiques de bimatoprost", area: "ophthalmology", category: "Ophtalmologie",
    overview: "Des gouttes ophtalmiques analogues des prostaglandines incluses dans l’ancien portefeuille.",
    legacyContext: "L’ancien site présente le bimatoprost pour la prise en charge de la pression intraoculaire élevée et du glaucome. La formulation et l’autorisation du produit doivent être confirmées.",
    ...shared("bimatoprost"), imageAlt: "Gros plan d’un examen de l’œil à la lampe à fente",
    highlights: [
      "Un analogue des prostaglandines pour le traitement du glaucome, un groupe d’affections oculaires qui endommagent le nerf optique et sont souvent associées à une pression intraoculaire (PIO) élevée.",
      "Le glaucome primitif à angle ouvert est le type le plus courant (85 à 90 % des cas) : une obstruction lente et indolore du drainage, sans symptômes avant les stades avancés.",
      "Le traitement vise à abaisser la PIO à une valeur cible pour freiner l’atteinte du nerf optique. Il n’existe aucun remède, et la perte de vision causée par le glaucome est permanente.",
    ],
    specsNote: "Les chiffres sont ceux présentés sur l’ancien site et ne constituent pas des allégations de produit approuvées.",
    specs: [
      { label: "Classe de médicament", value: "Analogue des prostaglandines" }, { label: "Mécanisme", value: "Augmente l’écoulement uvéo-scléral" },
      { label: "Réduction de la PIO (chiffre historique)", value: "25 à 35 %" }, { label: "Posologie (historique)", value: "Une fois par jour, le soir" },
    ],
  },
  {
    slug: "latanoprost", name: "Gouttes ophtalmiques de latanoprost", area: "ophthalmology", category: "Ophtalmologie",
    overview: "Des gouttes ophtalmiques analogues des prostaglandines incluses dans l’ancien portefeuille.",
    legacyContext: "L’ancien site présente le latanoprost pour la prise en charge de la pression intraoculaire élevée et du glaucome. La formulation et l’autorisation du produit doivent être confirmées.",
    ...shared("latanoprost"), imageAlt: "Gros plan d’un examen de l’œil à la lampe à fente",
    highlights: [
      "Un analogue des prostaglandines pour le traitement du glaucome, un groupe d’affections oculaires qui endommagent le nerf optique et sont souvent associées à une pression intraoculaire (PIO) élevée.",
      "Le glaucome primitif à angle ouvert est le type le plus courant (85 à 90 % des cas) : une obstruction lente et indolore du drainage, sans symptômes avant les stades avancés.",
      "Le traitement vise à abaisser la PIO à une valeur cible pour freiner l’atteinte du nerf optique. Il n’existe aucun remède, et la perte de vision causée par le glaucome est permanente.",
    ],
    specsNote: "Les chiffres sont ceux présentés sur l’ancien site et ne constituent pas des allégations de produit approuvées.",
    specs: [
      { label: "Classe de médicament", value: "Analogue des prostaglandines" }, { label: "Mécanisme", value: "Augmente l’écoulement uvéo-scléral" },
      { label: "Réduction de la PIO (chiffre historique)", value: "25 à 35 %" }, { label: "Posologie (historique)", value: "Une fois par jour, le soir" },
    ],
  },
  {
    slug: "vectraplex", name: "ECG Vectraplex", area: "cardiology", category: "Cardiologie / dispositif médical",
    overview: "Un système d’électrocardiographie conservé de l’ancien portefeuille de cardiologie et de dispositifs médicaux.",
    legacyContext: "L’ancien site décrit une configuration à cinq électrodes produisant des données ECG multicanaux. Les performances techniques et l’autorisation du dispositif doivent être révisées.",
    ...shared("vectraplex"), imageAlt: "Clinicienne plaçant des électrodes ECG sur un patient tout en consultant le tracé sur une tablette",
    secondImage: { src: "/products/vectraplex-page-image02.png", width: 817, height: 341, alt: "Schéma comparant le placement actuel des électrodes pour l’ECG à 12 dérivations et le placement à cinq électrodes de Vectraplex ECG" },
    highlights: [
      "Un biomarqueur électrique cardiaque (CEB) : un biomarqueur continu pour détecter les changements à l’ECG évocateurs d’un infarctus aigu du myocarde (IAM). L’ancien site demandait : « Pouvez-vous détecter un IAM en temps réel? ».",
      "Non invasif : dérive un ECG à 22 dérivations (UE) ou à 15 dérivations (É.-U.) à partir de seulement cinq électrodes.",
      "22 dérivations = 12 dérivations, cœur droit, dérivations postérieures et dérivations vectocardiographiques (XYZ) avec boucles vectorielles. 15 dérivations = 12 dérivations plus dérivations vectocardiographiques et boucles vectorielles.",
      "Produit aussi un ECG standard à 12 dérivations avec 10 électrodes et pourrait réduire les erreurs de placement des électrodes.",
    ],
  },
  {
    slug: "troponin", name: "Test de troponine", area: "cardiology", category: "Biomarqueur cardiaque",
    overview: "Un test de biomarqueur cardiaque inclus dans l’ancien portefeuille de Ribicon.",
    legacyContext: "L’ancien site présente la troponine comme marqueur utilisé dans l’évaluation d’une atteinte du muscle cardiaque. Le dosage et le produit exacts restent à confirmer.",
    ...shared("troponin"), imageAlt: "Tube de prélèvement sanguin portant l’étiquette Troponine-T sur un formulaire de cardiologie",
    highlights: [
      "Mesure la troponine cardiaque (troponine I ou T), une protéine du muscle cardiaque libérée dans le sang lorsque le muscle cardiaque est endommagé; plus l’atteinte est importante, plus la troponine libérée est abondante.",
      "Le plus souvent utilisée pour aider à diagnostiquer une crise cardiaque, et parfois pour suivre l’angine de poitrine.",
      "Habituellement répétée au moins deux fois sur 24 heures pour observer l’évolution des taux.",
      "Une prise de sang standard; aucune préparation particulière n’est nécessaire.",
    ],
  },
];
