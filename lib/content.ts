export type PortfolioArea = {
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  summary: string;
  products: string[];
  image: string;
  imageAlt: string;
  status?: "draft";
};

export type Product = {
  slug: string;
  name: string;
  area: string;
  category: string;
  overview: string;
  legacyContext: string;
  legacyUrl: string;
};

// Source: ribicongroup.com product pages. These neutral summaries are review drafts,
// not approved Canadian medical or promotional copy.
export const products: Product[] = [
  { slug: "afp", name: "Alpha-fetoprotein (AFP)", area: "solid-tumor-biomarkers", category: "Solid-tumor biomarker", overview: "A laboratory biomarker associated with assessment and monitoring in selected solid-tumor settings.", legacyContext: "The former site discusses AFP in relation to liver, ovarian, and testicular cancers, and notes that results are interpreted alongside other clinical information.", legacyUrl: "https://ribicongroup.com/products/biomarkers/alpha-fetoprotein-afp/" },
  { slug: "ca-125", name: "CA-125", area: "solid-tumor-biomarkers", category: "Solid-tumor biomarker", overview: "A biomarker used in the clinical assessment and monitoring of ovarian cancer.", legacyContext: "The former site describes CA-125 in treatment response and recurrence monitoring; it is not presented as a stand-alone diagnosis.", legacyUrl: "https://ribicongroup.com/products/biomarkers/ca-125/" },
  { slug: "gc-reaad", name: "Gastric Carcinoma GC-REAAD", area: "solid-tumor-biomarkers", category: "Solid-tumor biomarker", overview: "An investigational-style diagnostic offering associated with gastric carcinoma on the former site.", legacyContext: "The legacy description identifies an ITIH3 ELISA assay for human plasma. Current availability, validation, and intended use require confirmation.", legacyUrl: "https://ribicongroup.com/products/biomarkers/gastric-carcinoma-gc-reaad/" },
  { slug: "hcc-reaad", name: "Hepatocellular Carcinoma HCC-REAAD", area: "solid-tumor-biomarkers", category: "Solid-tumor biomarker", overview: "A diagnostic biomarker offering associated with hepatocellular carcinoma on the former site.", legacyContext: "The legacy description references an ERBB3 ELISA assay and an algorithm involving AFP. The precise intended use needs verification.", legacyUrl: "https://ribicongroup.com/products/biomarkers/hepatocellular-carcinoma-hcc-reaad/" },
  { slug: "npc-reaad", name: "Nasopharyngeal Carcinoma NPC-REAAD", area: "solid-tumor-biomarkers", category: "Solid-tumor biomarker", overview: "A diagnostic biomarker offering associated with nasopharyngeal carcinoma on the former site.", legacyContext: "The legacy description references an EBV EA-IgA ELISA assay using serum or plasma. Current specifications require confirmation.", legacyUrl: "https://ribicongroup.com/products/biomarkers/nasopharyngeal-carcinoma-npc-reaad/" },
  { slug: "tepadina", name: "Tepadina (thiotepa)", area: "targeted-therapeutics", category: "Specialty therapeutic", overview: "A thiotepa-based specialty medicine listed in Ribicon’s former therapeutic portfolio.", legacyContext: "The former site discusses use in conditioning before stem-cell transplantation and in selected oncology settings. Local authorization and approved indications must be checked before publication.", legacyUrl: "https://ribicongroup.com/products/targeted-therapeutics/tepadina/" },
  { slug: "phelinun", name: "Phelinun (melphalan)", area: "targeted-therapeutics", category: "Specialty therapeutic", overview: "A melphalan-based specialty medicine listed in Ribicon’s former therapeutic portfolio.", legacyContext: "The former site describes oncology and transplantation-related uses. Current Canadian availability, labeling, and indications require confirmation.", legacyUrl: "https://ribicongroup.com/products/targeted-therapeutics/phelinun/" },
  { slug: "bimatoprost", name: "Bimatoprost eye drops", area: "ophthalmology", category: "Ophthalmology", overview: "Prostaglandin-analogue eye drops included in the former ophthalmology portfolio.", legacyContext: "The former site presents bimatoprost in the management of elevated intraocular pressure and glaucoma. Product-specific formulation and authorization need confirmation.", legacyUrl: "https://ribicongroup.com/products/ophthalmology/bimatoprost/" },
  { slug: "latanoprost", name: "Latanoprost eye drops", area: "ophthalmology", category: "Ophthalmology", overview: "Prostaglandin-analogue eye drops included in the former ophthalmology portfolio.", legacyContext: "The former site presents latanoprost in the management of elevated intraocular pressure and glaucoma. Product-specific formulation and authorization need confirmation.", legacyUrl: "https://ribicongroup.com/products/ophthalmology/latanoprost/" },
  { slug: "vectraplex", name: "Vectraplex ECG", area: "cardiology", category: "Cardiology / medical device", overview: "An electrocardiography system retained from the former cardiology and medical-device listings.", legacyContext: "The former site describes a five-electrode configuration that derives multi-lead ECG information. Technical performance and device authorization require review.", legacyUrl: "https://ribicongroup.com/products/medical-devices/vectraplex/" },
  { slug: "troponin", name: "Troponin test", area: "cardiology", category: "Cardiology biomarker", overview: "A cardiac biomarker test included in the former Ribicon portfolio.", legacyContext: "The former site discusses troponin as a marker used in evaluating heart-muscle injury. The exact assay and product details remain to be confirmed.", legacyUrl: "https://ribicongroup.com/products/cardiology/troponin/" },
];

export const portfolioAreas: PortfolioArea[] = [
  {
    slug: "solid-tumor-biomarkers",
    number: "01",
    title: "Solid-Tumor Biomarkers",
    eyebrow: "Diagnostics",
    summary:
      "A focused portfolio of biomarkers associated with solid-tumor detection and monitoring.",
    image: "/hero-diagnostics.png",
    imageAlt: "Laboratory diagnostic equipment and sample droplet",
    products: [
      "Alpha-fetoprotein (AFP)",
      "CA-125",
      "Gastric Carcinoma GC-REAAD",
      "Hepatocellular Carcinoma HCC-REAAD",
      "Nasopharyngeal Carcinoma NPC-REAAD",
    ],
  },
  {
    slug: "targeted-therapeutics",
    number: "02",
    title: "Targeted Therapeutics",
    eyebrow: "Specialty medicines",
    summary:
      "Specialized therapies presented for healthcare-professional and institutional audiences.",
    image: "/therapeutics-editorial.jpg",
    imageAlt: "Healthcare professional preparing a vial in a clinical laboratory",
    products: ["Tepadina (thiotepa)", "Phelinun (melphalan)"],
  },
  {
    slug: "ophthalmology",
    number: "03",
    title: "Ophthalmology",
    eyebrow: "Eye health",
    summary:
      "A concise ophthalmology portfolio for the management of intraocular pressure.",
    image: "/ophthalmology-editorial.jpg",
    imageAlt: "Patient undergoing an ophthalmic examination",
    products: ["Bimatoprost eye drops", "Latanoprost eye drops"],
  },
  {
    slug: "cardiology",
    number: "04",
    title: "Cardiology",
    eyebrow: "Cardiac diagnostics",
    summary:
      "Diagnostic tools and tests supporting timely cardiovascular assessment.",
    image: "/cardiology-signal.svg",
    imageAlt: "Illustrated electrocardiogram signal",
    products: ["Vectraplex ECG", "Troponin test"],
  },
  {
    slug: "veterinary-diagnostics",
    number: "05",
    title: "Veterinary Diagnostics",
    eyebrow: "Portfolio in development",
    summary:
      "A future diagnostic biomarker portfolio. Product information will be published after review.",
    image: "/hero-diagnostics.png",
    imageAlt: "Laboratory diagnostic equipment representing forthcoming veterinary testing",
    products: [],
    status: "draft",
  },
];
