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

export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  area: string;
  category: string;
  overview: string;
  legacyContext: string;
  legacyUrl: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  secondImage?: { src: string; width: number; height: number; alt: string };
  highlights: string[];
  howItWorks?: string;
  specsNote?: string;
  specs?: Spec[];
};

// Source: ribicongroup.com product pages (flat .html pages and product images). Summaries are
// paraphrased and review drafts, not approved Canadian medical or promotional copy.
// Specs and figures are transcribed from the former site and must be verified before publication.
const legacy = (page: string) => `https://ribicongroup.com/${page}.html`;

export const products: Product[] = [
  {
    slug: "afp", name: "Alpha-fetoprotein (AFP)", area: "solid-tumor-biomarkers", category: "Solid-tumor biomarker",
    overview: "A laboratory biomarker associated with assessment and monitoring in selected solid-tumor settings.",
    legacyContext: "The former site discusses AFP in relation to liver, ovarian, and testicular cancers, and notes that results are interpreted alongside other clinical information.",
    legacyUrl: legacy("afp"),
    image: "/products/alpha-fetoprotein-page-image.jpg", imageWidth: 325, imageHeight: 235, imageAlt: "Blood collection tube labelled AFP test on a tumor-marker request form",
    highlights: [
      "A blood test that measures alpha-fetoprotein, a protein made by the liver.",
      "Helps diagnose and monitor cancers of the liver, ovaries, or testicles that produce high AFP levels, when used with other exams and tests.",
      "Used to follow how a cancer responds to treatment and to check whether it has returned.",
      "Cannot screen for or diagnose cancer on its own: other conditions raise AFP, and some cancers leave it normal.",
    ],
  },
  {
    slug: "ca-125", name: "CA-125", area: "solid-tumor-biomarkers", category: "Solid-tumor biomarker",
    overview: "A biomarker used in the clinical assessment and monitoring of ovarian cancer.",
    legacyContext: "The former site describes CA-125 in treatment response and recurrence monitoring; it is not presented as a stand-alone diagnosis.",
    legacyUrl: legacy("ca-125"),
    image: "/products/ca-125-page-image.jpg", imageWidth: 325, imageHeight: 235, imageAlt: "Blood collection tube labelled CA 125 test on a tumor-marker request form",
    highlights: [
      "A blood test that measures CA-125 (cancer antigen 125), a tumor marker often raised in ovarian cancer.",
      "Most common use: checking whether ovarian-cancer treatment is working and whether the cancer has returned.",
      "May be combined with imaging and other tests to assess a pelvic mass, or in people at very high risk of ovarian cancer.",
      "Not a routine screening test: non-cancer conditions such as endometriosis or menstruation can also raise CA-125.",
    ],
  },
  {
    slug: "gc-reaad", name: "Gastric Carcinoma GC-REAAD", area: "solid-tumor-biomarkers", category: "Solid-tumor biomarker",
    overview: "An investigational-style diagnostic offering associated with gastric carcinoma on the former site.",
    legacyContext: "The legacy description identifies an ITIH3 ELISA assay for human plasma. Current availability, validation, and intended use require confirmation.",
    legacyUrl: legacy("gastric-cancer"),
    image: "/products/gastric-cancer-page-image.jpg", imageWidth: 300, imageHeight: 400, imageAlt: "GC-REAAD ITIH3 highlights sheet showing sensitivity, specificity, and assay specifications",
    highlights: [
      "Restalyst GC-REAAD™ ITIH3 ELISA: an in-vitro diagnostic for the qualitative and semi-quantitative detection of ITIH3 protein in human plasma, intended for early detection of gastric carcinoma.",
      "Built on a patented technology; ITIH3 is reported to be elevated in the plasma of gastric-carcinoma patients regardless of gastritis status or H. pylori infection.",
      "Reports a positive or negative risk result using an arbitrary measurement scale called REAAD-units (RU).",
    ],
    howItWorks: "A sandwich ELISA. Capture antibodies coated on the microwell bind ITIH3 in the plasma sample; detection antibodies and HRP-conjugated secondary antibodies are added, and a TMB substrate turns into a colour signal whose intensity is proportional to the antigen present. Wells are read on any suitable spectrophotometer or ELISA reader.",
    specs: [
      { label: "Sensitivity", value: "91.0%" }, { label: "Specificity", value: "93.6%" },
      { label: "Inter-assay precision", value: "7.59% – 8.64%" }, { label: "Intra-assay precision", value: "3.32% – 3.74%" },
      { label: "Sample type", value: "Plasma" }, { label: "Assay duration (approx.)", value: "2 hours" },
      { label: "Patient sample volume", value: "<10 µL" }, { label: "Shelf life", value: "12 months" },
      { label: "Certification", value: "CE-IVD certified; HSA (Singapore) registered" },
    ],
  },
  {
    slug: "hcc-reaad", name: "Hepatocellular Carcinoma HCC-REAAD", area: "solid-tumor-biomarkers", category: "Solid-tumor biomarker",
    overview: "A diagnostic biomarker offering associated with hepatocellular carcinoma on the former site.",
    legacyContext: "The legacy description references an ERBB3 ELISA assay and an algorithm involving AFP. The precise intended use needs verification.",
    legacyUrl: legacy("hepatocellular-carcinoma"),
    image: "/products/hepatocellular-page-image.jpg", imageWidth: 300, imageHeight: 400, imageAlt: "HCC-REAAD ERBB3 highlights sheet showing sensitivity, specificity, and assay specifications",
    highlights: [
      "Restalyst HCC-REAAD™ ERBB3 ELISA: an in-vitro diagnostic for the qualitative and semi-quantitative detection of ERBB3 (HER-3) in human serum or plasma, intended for early detection of hepatocellular carcinoma.",
      "ERBB3 (patented) is reported to be elevated in the serum or plasma of hepatocellular-carcinoma patients.",
      "An algorithm (binary logistic regression) combining ERBB3 and AFP is presented as improving on routine screening with AFP alone.",
    ],
    howItWorks: "A sandwich ELISA. Capture antibodies coated on the microwell bind ERBB3 in the sample; biotinylated detection antibodies and HRP-conjugated secondary antibodies are added, and a TMB substrate turns into a colour signal proportional to the antigen present. Wells are read on any suitable spectrophotometer or ELISA reader.",
    specs: [
      { label: "Sensitivity", value: "91.1%" }, { label: "Specificity", value: "91.3%" },
      { label: "Inter-assay precision", value: "2.16% – 2.87%" }, { label: "Intra-assay precision", value: "6.37% – 8.10%" },
      { label: "Sample type", value: "Serum / plasma" }, { label: "Assay duration (approx.)", value: "2.0 hours" },
      { label: "Patient sample volume", value: "<10 µL" }, { label: "Shelf life", value: "9 months" },
      { label: "Certification", value: "CE-IVD certified; HSA (Singapore) registered" },
    ],
  },
  {
    slug: "npc-reaad", name: "Nasopharyngeal Carcinoma NPC-REAAD", area: "solid-tumor-biomarkers", category: "Solid-tumor biomarker",
    overview: "A diagnostic biomarker offering associated with nasopharyngeal carcinoma on the former site.",
    legacyContext: "The legacy description references an EBV EA-IgA ELISA assay using serum or plasma. Current specifications require confirmation.",
    legacyUrl: legacy("nasopharyngeal-cancer"),
    image: "/products/nasopharyngeal-page-image.jpg", imageWidth: 300, imageHeight: 400, imageAlt: "NPC-REAAD highlights sheet showing sensitivity, specificity, and assay specifications",
    highlights: [
      "Restalyst NPC-REAAD EBV EA-IgA ELISA: an in-vitro diagnostic for the qualitative and semi-quantitative detection of IgA antibodies in human serum or plasma, to aid in the diagnosis of nasopharyngeal carcinoma.",
      "Uses highly specific Epstein-Barr virus proteins, produced with recombinant DNA technology, to detect the patient’s Early Antigen (EA) IgA response.",
      "Reports a positive or negative risk result using an arbitrary measurement scale called REAAD-units (RU).",
    ],
    howItWorks: "Recombinant NPC antigens are coated on the microwells. Human IgA against EBV EA proteins binds the antigens; after washing, HRP-conjugated secondary antibodies bind the complexes and a TMB substrate turns into a colour signal proportional to the amount present. Wells are read on any suitable spectrophotometer or ELISA reader.",
    specsNote: "The source graphic renders sensitivity and specificity as “960%” and “940%”; they are shown here as 96.0% and 94.0% and must be confirmed.",
    specs: [
      { label: "Sensitivity", value: "96.0%" }, { label: "Specificity", value: "94.0%" },
      { label: "Inter-assay precision", value: "2.99% – 3.65%" }, { label: "Intra-assay precision", value: "3.15% – 3.17%" },
      { label: "Sample type", value: "Serum / plasma" }, { label: "Assay duration (approx.)", value: "1.5 hours" },
      { label: "Patient sample volume", value: "<10 µL" }, { label: "Shelf life", value: "13 months" },
      { label: "Certification", value: "CE-IVD certified; HSA (Singapore) and MDA (Malaysia) registered" },
    ],
  },
  {
    slug: "tepadina", name: "Tepadina (thiotepa)", area: "targeted-therapeutics", category: "Specialty therapeutic",
    overview: "A thiotepa-based specialty medicine listed in Ribicon’s former therapeutic portfolio.",
    legacyContext: "The former site discusses use in conditioning before stem-cell transplantation and in selected oncology settings. Local authorization and approved indications must be checked before publication.",
    legacyUrl: legacy("tepadina"),
    image: "/products/tepadina-page-image.jpg", imageWidth: 325, imageHeight: 350, imageAlt: "Tepadina brand image with molecular illustration",
    highlights: [
      "Active substance: thiotepa, supplied as a powder made up into a solution for infusion (drip into a vein).",
      "Used in combination with other chemotherapy medicines.",
      "As a conditioning (preparative) treatment before hematopoietic progenitor cell transplantation in patients with blood diseases, including leukemia, or diseases causing low red blood cell counts such as thalassemia or sickle-cell anaemia.",
      "During treatment of solid tumors when high-dose chemotherapy followed by hematopoietic progenitor cell transplantation is needed.",
    ],
    specs: [{ label: "Strengths listed", value: "15 mg, 100 mg, 200 mg, 400 mg" }],
  },
  {
    slug: "phelinun", name: "Phelinun (melphalan)", area: "targeted-therapeutics", category: "Specialty therapeutic",
    overview: "A melphalan-based specialty medicine listed in Ribicon’s former therapeutic portfolio.",
    legacyContext: "The former site describes oncology and transplantation-related uses. Current Canadian availability, labeling, and indications require confirmation.",
    legacyUrl: legacy("phelinun"),
    image: "/products/phelinun-page-image.jpg", imageWidth: 325, imageHeight: 350, imageAlt: "Phelinun brand image with molecular illustration",
    highlights: [
      "A cancer medicine used on its own or with other cancer medicines, radiotherapy, or both.",
      "Listed uses: multiple myeloma, acute lymphoblastic leukemia and acute myeloid leukemia; Hodgkin and non-Hodgkin lymphomas; childhood neuroblastoma; ovarian cancer; and mammary adenocarcinoma, a type of breast cancer.",
      "Also used with other cytotoxic medicines as conditioning treatment before stem-cell transplantation in adults and children with blood cancers and some other blood disorders in children.",
    ],
    specs: [{ label: "Strengths listed", value: "50 mg, 200 mg" }],
  },
  {
    slug: "bimatoprost", name: "Bimatoprost eye drops", area: "ophthalmology", category: "Ophthalmology",
    overview: "Prostaglandin-analogue eye drops included in the former ophthalmology portfolio.",
    legacyContext: "The former site presents bimatoprost in the management of elevated intraocular pressure and glaucoma. Product-specific formulation and authorization need confirmation.",
    legacyUrl: legacy("bimatoprost"),
    image: "/products/bimatoprost-page-image.jpg", imageWidth: 325, imageHeight: 235, imageAlt: "Close-up of an eye examination with a slit lamp",
    highlights: [
      "A prostaglandin analogue for the treatment of glaucoma, a group of eye conditions that damage the optic nerve and are often associated with elevated intraocular pressure (IOP).",
      "Primary open-angle glaucoma is the most common type (85–90% of cases): a slow, painless drainage blockage with no symptoms until late stages.",
      "Treatment aims to lower IOP to a target level to halt optic-nerve damage. There is no cure, and vision lost to glaucoma is permanent.",
    ],
    specsNote: "Figures are as presented on the former site and are not approved product claims.",
    specs: [
      { label: "Drug class", value: "Prostaglandin analogue" }, { label: "Mechanism", value: "Increases uveoscleral outflow" },
      { label: "IOP reduction (legacy figure)", value: "25–35%" }, { label: "Dosing (legacy)", value: "Once daily, in the evening" },
    ],
  },
  {
    slug: "latanoprost", name: "Latanoprost eye drops", area: "ophthalmology", category: "Ophthalmology",
    overview: "Prostaglandin-analogue eye drops included in the former ophthalmology portfolio.",
    legacyContext: "The former site presents latanoprost in the management of elevated intraocular pressure and glaucoma. Product-specific formulation and authorization need confirmation.",
    legacyUrl: legacy("latanoprost"),
    image: "/products/latanoprost-page-image.jpg", imageWidth: 325, imageHeight: 235, imageAlt: "Close-up of an eye examination with a slit lamp",
    highlights: [
      "A prostaglandin analogue for the treatment of glaucoma, a group of eye conditions that damage the optic nerve and are often associated with elevated intraocular pressure (IOP).",
      "Primary open-angle glaucoma is the most common type (85–90% of cases): a slow, painless drainage blockage with no symptoms until late stages.",
      "Treatment aims to lower IOP to a target level to halt optic-nerve damage. There is no cure, and vision lost to glaucoma is permanent.",
    ],
    specsNote: "Figures are as presented on the former site and are not approved product claims.",
    specs: [
      { label: "Drug class", value: "Prostaglandin analogue" }, { label: "Mechanism", value: "Increases uveoscleral outflow" },
      { label: "IOP reduction (legacy figure)", value: "25–35%" }, { label: "Dosing (legacy)", value: "Once daily, in the evening" },
    ],
  },
  {
    slug: "vectraplex", name: "Vectraplex ECG", area: "cardiology", category: "Cardiology / medical device",
    overview: "An electrocardiography system retained from the former cardiology and medical-device listings.",
    legacyContext: "The former site describes a five-electrode configuration that derives multi-lead ECG information. Technical performance and device authorization require review.",
    legacyUrl: legacy("vectraplex"),
    image: "/products/vectraplex-page-image.jpg", imageWidth: 325, imageHeight: 350, imageAlt: "Clinician placing ECG electrodes on a patient while viewing the trace on a tablet",
    secondImage: { src: "/products/vectraplex-page-image02.png", width: 817, height: 341, alt: "Diagram comparing current 12-lead electrode placement with the five-electrode Vectraplex ECG placement" },
    highlights: [
      "A Cardiac Electrical Biomarker (CEB): a continuous biomarker for detecting ECG changes suggestive of acute myocardial infarction (AMI), with the former site asking “Can you detect an AMI in real-time?”.",
      "Non-invasive: derives a 22-lead ECG (EU) or 15-lead ECG (US) from only five electrodes.",
      "22-lead = 12-lead, right-heart, posterior, and vectorcardiogram (XYZ) leads with vector loops. 15-lead = 12-lead plus vectorcardiogram leads and vector loops.",
      "Also produces a standard 12-lead ECG with 10 electrodes, and may reduce electrode-placement error.",
    ],
  },
  {
    slug: "troponin", name: "Troponin test", area: "cardiology", category: "Cardiology biomarker",
    overview: "A cardiac biomarker test included in the former Ribicon portfolio.",
    legacyContext: "The former site discusses troponin as a marker used in evaluating heart-muscle injury. The exact assay and product details remain to be confirmed.",
    legacyUrl: legacy("troponin"),
    image: "/products/troponin-page-image.jpg", imageWidth: 325, imageHeight: 219, imageAlt: "Blood collection tube labelled Troponin-T test on a cardiology request form",
    highlights: [
      "Measures cardiac troponin (troponin I or T), a protein in heart muscle that is released into the blood when the heart muscle is damaged; more damage releases more troponin.",
      "Most often used to help diagnose a heart attack, and sometimes to monitor angina.",
      "Usually repeated two or more times over 24 hours to see how levels change.",
      "A standard blood draw; no special preparation is needed.",
    ],
  },
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
