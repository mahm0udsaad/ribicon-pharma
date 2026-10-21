// Every editable text and image on the public site, grouped the way the admin shows them.
// Values saved in the `site_content` table override these defaults; anything never edited
// keeps the text below, so the site is never blank.
//
// Kinds:
//   text      one line
//   textarea  paragraph(s); line breaks are kept
//   list      one item per line ("Title | Description" where the hint says so)
//   rich      legal-style text: blank line = new paragraph, "## " heading, "- " bullet, [text](link)
//   image     a picture shared by both languages (cropped to `aspect` when set)

export type FieldKind = "text" | "textarea" | "list" | "rich" | "image";

export type FieldDef = {
  key: string;
  label: string;
  kind: FieldKind;
  hint?: string;
  /** Crop shape for images (width / height). Omit for free cropping. */
  aspect?: number;
  /** Text default per language, or the image path for images. */
  en: string;
  fr?: string;
};

export type SectionDef = { title: string; description?: string; fields: FieldDef[] };
export type PageDef = { id: string; title: string; description: string; path?: string; sections: SectionDef[] };

const ASPECT = { banner: 3, story: 4 / 5, heritage: 5 / 4 };

const seo = (page: string, title: [string, string], description: [string, string]): SectionDef => ({
  title: "Search engines & sharing",
  description: "Shown in the browser tab, Google results and link previews.",
  fields: [
    { key: `${page}.seo.title`, label: "Page title", kind: "text", en: title[0], fr: title[1] },
    { key: `${page}.seo.description`, label: "Description", kind: "textarea", en: description[0], fr: description[1] },
  ],
});

const banner = (page: string, image: string, eyebrow: [string, string], title: [string, string], body: [string, string]): SectionDef => ({
  title: "Top banner",
  fields: [
    { key: `${page}.hero.image`, label: "Banner image", kind: "image", aspect: ASPECT.banner, en: image, hint: "Wide photo; the left side sits under the text." },
    { key: `${page}.hero.eyebrow`, label: "Small label", kind: "text", en: eyebrow[0], fr: eyebrow[1] },
    { key: `${page}.hero.title`, label: "Headline", kind: "text", en: title[0], fr: title[1] },
    { key: `${page}.hero.body`, label: "Paragraph", kind: "textarea", en: body[0], fr: body[1] },
  ],
});

export const contentPages: PageDef[] = [
  {
    id: "settings",
    title: "Site settings",
    description: "Logo, contact details, menu and footer — used on every page.",
    sections: [
      {
        title: "Brand",
        fields: [
          { key: "site.logo", label: "Logo", kind: "image", en: "/ribicon-pharma-logo.png", hint: "PNG with a white or transparent background works best." },
          { key: "site.name", label: "Company name", kind: "text", en: "Ribicon Pharma", fr: "Ribicon Pharma" },
          { key: "site.seo.description", label: "Default description (search engines)", kind: "textarea", en: "Ribicon Pharma is a Canada-based specialty healthcare company working across diagnostics, targeted therapeutics, ophthalmology, and cardiology.", fr: "Ribicon Pharma est une entreprise canadienne active dans les diagnostics et les thérapies spécialisées." },
        ],
      },
      {
        title: "Contact details",
        description: "Used in the footer, the contact page and every “email us” button.",
        fields: [
          { key: "site.email", label: "Contact email", kind: "text", en: "info@ribicongroup.com" },
          { key: "site.phone", label: "Phone (optional)", kind: "text", en: "", hint: "Leave empty to hide." },
          { key: "site.city", label: "City line (footer)", kind: "text", en: "Montréal, Québec, Canada", fr: "Montréal (Québec) Canada" },
          { key: "site.address", label: "Full office address", kind: "textarea", en: "7361 Avenue Victoria\nMontréal, Québec H4P 0A7\nCanada", fr: "7361, avenue Victoria\nMontréal (Québec) H4P 0A7\nCanada" },
        ],
      },
      {
        title: "Menu",
        fields: [
          { key: "nav.about", label: "About link", kind: "text", en: "About", fr: "À propos" },
          { key: "nav.products", label: "Products link", kind: "text", en: "Products", fr: "Produits" },
          { key: "nav.services", label: "Services link", kind: "text", en: "Services", fr: "Services" },
          { key: "nav.contact", label: "Contact link", kind: "text", en: "Contact", fr: "Contact" },
          { key: "nav.cta", label: "Button", kind: "text", en: "Partner with us", fr: "Devenir partenaire" },
        ],
      },
      {
        title: "Footer",
        fields: [
          { key: "footer.tagline", label: "Tagline under the logo", kind: "text", en: "Specialized healthcare, thoughtfully brought to market.", fr: "Des soins spécialisés, mis en marché avec rigueur." },
          { key: "footer.explore", label: "“Explore” heading", kind: "text", en: "Explore", fr: "Explorer" },
          { key: "footer.portfolio", label: "Portfolio link", kind: "text", en: "Portfolio", fr: "Portefeuille" },
          { key: "footer.information", label: "“Information” heading", kind: "text", en: "Information", fr: "Information" },
          { key: "footer.privacy", label: "Privacy link", kind: "text", en: "Privacy", fr: "Confidentialité" },
          { key: "footer.accessibility", label: "Accessibility link", kind: "text", en: "Accessibility", fr: "Accessibilité" },
          { key: "footer.rights", label: "Copyright text", kind: "text", en: "All rights reserved.", fr: "Tous droits réservés." },
          { key: "footer.disclaimer", label: "Disclaimer", kind: "text", en: "Information on this website is not medical advice.", fr: "L’information de ce site ne constitue pas un avis médical." },
        ],
      },
    ],
  },
  {
    id: "home",
    title: "Home page",
    description: "Everything below the slider (the slides themselves are under Hero slides).",
    path: "/",
    sections: [
      {
        title: "Slider buttons",
        fields: [
          { key: "home.hero.primary", label: "Main button", kind: "text", en: "Explore our portfolio", fr: "Explorer le portefeuille" },
          { key: "home.hero.secondary", label: "Second button", kind: "text", en: "Partner with us", fr: "Devenir partenaire" },
          { key: "home.hero.note", label: "Note in the corner", kind: "text", en: "Diagnostics · Specialty medicines · Commercial partnerships", fr: "Diagnostics · Médicaments spécialisés · Partenariats commerciaux" },
        ],
      },
      {
        title: "Portfolio section",
        fields: [
          { key: "home.portfolio.eyebrow", label: "Small label", kind: "text", en: "Focused portfolio", fr: "Portefeuille ciblé" },
          { key: "home.portfolio.title", label: "Heading", kind: "text", en: "Specialization where it matters.", fr: "Se spécialiser là où cela compte." },
          { key: "home.portfolio.body", label: "Paragraph", kind: "textarea", en: "A deliberately focused portfolio across diagnostics and specialty care, structured around clear therapeutic areas rather than a crowded catalogue.", fr: "Un portefeuille volontairement ciblé en diagnostic et en soins spécialisés, organisé en domaines thérapeutiques clairs." },
          { key: "home.portfolio.link", label: "Featured card link", kind: "text", en: "View diagnostic portfolio", fr: "Voir les diagnostics" },
        ],
      },
      {
        title: "Story section",
        fields: [
          { key: "home.story.image", label: "Image", kind: "image", aspect: ASPECT.story, en: "/ophthalmology-editorial.jpg" },
          { key: "home.story.image_alt", label: "Image description", kind: "text", en: "Ophthalmic examination in a clinical setting", fr: "Examen ophtalmologique en milieu clinique" },
          { key: "home.story.caption", label: "Caption on the image", kind: "text", en: "Care built around specialized needs.", fr: "Des soins adaptés aux besoins spécialisés." },
          { key: "home.story.eyebrow", label: "Small label", kind: "text", en: "Ribicon Pharma", fr: "Ribicon Pharma" },
          { key: "home.story.title", label: "Heading", kind: "text", en: "Local perspective. International experience.", fr: "Une perspective locale. Une expérience internationale." },
          { key: "home.story.body", label: "Paragraph", kind: "textarea", en: "From our Canadian base, we work across a network of healthcare partners to bring specialized products to the markets and professionals they are intended to serve. Our approach combines commercial discipline with long-term customer relationships.", fr: "Depuis notre base canadienne, nous collaborons avec un réseau de partenaires de la santé afin d’acheminer des produits spécialisés vers les marchés et professionnels concernés." },
          { key: "home.story.link", label: "Link", kind: "text", en: "Discover our approach", fr: "Découvrir notre approche" },
        ],
      },
      {
        title: "How we work",
        fields: [
          { key: "home.how.eyebrow", label: "Small label", kind: "text", en: "How we work", fr: "Notre façon de travailler" },
          { key: "home.how.title", label: "Heading", kind: "text", en: "Clear priorities. Responsible growth.", fr: "Des priorités claires. Une croissance responsable." },
          { key: "home.how.items", label: "Points", kind: "list", hint: "One point per line.", en: "Specialized portfolio focus\nCommercial and market expertise\nPartner-led customer support", fr: "Portefeuille spécialisé\nExpertise commerciale et de marché\nSoutien axé sur les partenaires" },
        ],
      },
      {
        title: "Closing call to action",
        fields: [
          { key: "home.cta.eyebrow", label: "Small label", kind: "text", en: "Start a conversation", fr: "Entamer une conversation" },
          { key: "home.cta.title", label: "Heading", kind: "text", en: "Building what comes next in specialty healthcare.", fr: "Construisons l’avenir des soins spécialisés." },
          { key: "home.cta.body", label: "Paragraph", kind: "textarea", en: "For commercial partnerships, portfolio inquiries, or company information.", fr: "Pour les partenariats commerciaux, les demandes liées au portefeuille ou l’information d’entreprise." },
          { key: "home.cta.link", label: "Link", kind: "text", en: "Contact Ribicon Pharma", fr: "Contacter Ribicon Pharma" },
        ],
      },
      seo("home", ["Ribicon Pharma | Specialized Healthcare", "Soins de santé spécialisés | Ribicon Pharma"], ["Ribicon Pharma is a Canada-based specialty healthcare company working across diagnostics, targeted therapeutics, ophthalmology, and cardiology.", "Ribicon Pharma est une entreprise canadienne active dans les diagnostics et les thérapies spécialisées."]),
    ],
  },
  {
    id: "about",
    title: "About page",
    description: "Company purpose, commitments and heritage.",
    path: "/about",
    sections: [
      banner("about", "/therapeutics-editorial.jpg", ["About Ribicon Pharma", "À propos de Ribicon Pharma"], ["A focused healthcare company with a wider view.", "Une entreprise de santé ciblée avec une vision plus large."], ["Ribicon Pharma is a Canada-based specialty healthcare company with a German-Canadian heritage and a focused portfolio in diagnostics, therapeutics, ophthalmology, and cardiology.", "Ribicon Pharma est une entreprise canadienne de soins spécialisés, issue d’un héritage germano-canadien et active en diagnostic, thérapies ciblées, ophtalmologie et cardiologie."]),
      {
        title: "Our purpose",
        fields: [
          { key: "about.purpose.eyebrow", label: "Small label", kind: "text", en: "Our purpose", fr: "Notre raison d’être" },
          { key: "about.purpose.title", label: "Heading", kind: "text", en: "Bring meaningful innovation closer to the people who use it.", fr: "Rapprocher l’innovation utile de ceux qui l’utilisent." },
          { key: "about.purpose.body", label: "Text", kind: "textarea", hint: "Leave an empty line between paragraphs.", en: "We work with healthcare stakeholders and commercial partners to support specialized products through thoughtful market development, customer relationships, and disciplined portfolio management.\n\nOur ambition is not to be broad. It is to be useful—choosing areas where expertise, access, and sustained support can make a meaningful difference.", fr: "Nous collaborons avec les acteurs de la santé et les partenaires commerciaux pour soutenir des produits spécialisés par un développement de marché réfléchi et une gestion rigoureuse du portefeuille.\n\nNotre ambition n’est pas d’être généralistes, mais d’être utiles dans les domaines où l’expertise, l’accès et le soutien durable peuvent faire une différence." },
        ],
      },
      {
        title: "Our commitments",
        fields: [
          { key: "about.commitments.eyebrow", label: "Small label", kind: "text", en: "Our commitments", fr: "Nos engagements" },
          { key: "about.commitments.title", label: "Heading", kind: "text", en: "Care in the details.", fr: "La rigueur dans chaque détail." },
          { key: "about.commitments.items", label: "Commitments", kind: "list", hint: "One per line.", en: "Operate with transparency and responsible governance.\nBuild durable relationships with customers and partners.\nUse verified information and responsible communication.\nConsider the social and environmental impact of our work.", fr: "Agir avec transparence et gouvernance responsable.\nBâtir des relations durables avec clients et partenaires.\nCommuniquer une information vérifiée et responsable.\nConsidérer l’impact social et environnemental de nos activités." },
          { key: "about.commitments.link", label: "Link", kind: "text", en: "How we work with partners", fr: "Notre travail avec les partenaires" },
        ],
      },
      {
        title: "Heritage",
        fields: [
          { key: "about.heritage.image", label: "Image", kind: "image", aspect: ASPECT.heritage, en: "/hero-diagnostics.png" },
          { key: "about.heritage.image_alt", label: "Image description", kind: "text", en: "Precision laboratory diagnostic equipment", fr: "Équipement de diagnostic de précision" },
          { key: "about.heritage.eyebrow", label: "Small label", kind: "text", en: "From the Ribicon heritage", fr: "L’héritage Ribicon" },
          { key: "about.heritage.title", label: "Heading", kind: "text", en: "Science, access, and commercial execution.", fr: "Science, accès et exécution commerciale." },
          { key: "about.heritage.body", label: "Text", kind: "textarea", hint: "Leave an empty line between paragraphs.", en: "The former Ribicon Group described a German-Canadian organization with activity across Canada, Germany, Sweden, and the Middle East. For the new Ribicon Pharma brand, the Canadian base remains central; current affiliate and market details are being verified before publication.\n\nIts original mission—to bring innovative medicines and diagnostics to market through marketing and sales excellence—continues to inform this focused portfolio.", fr: "L’ancien Groupe Ribicon se présentait comme une organisation germano-canadienne active au Canada, en Allemagne, en Suède et au Moyen-Orient. Pour la nouvelle marque Ribicon Pharma, la base canadienne demeure centrale; les renseignements actuels sur les sociétés affiliées et les marchés sont en cours de vérification.\n\nSa mission d’origine — mettre en marché des médicaments et diagnostics innovants grâce à l’excellence commerciale — continue d’orienter ce portefeuille ciblé." },
        ],
      },
      seo("about", ["About", "À propos"], ["Learn about Ribicon Pharma’s purpose, approach, and Canadian foundation.", "Découvrez la mission, l’approche et les racines canadiennes de Ribicon Pharma."]),
    ],
  },
  {
    id: "services",
    title: "Services page",
    description: "The services list and call to action.",
    path: "/services",
    sections: [
      banner("services", "/ophthalmology-editorial.jpg", ["Services", "Services"], ["Partnership is part of the product.", "Le partenariat fait partie du produit."], ["Ribicon Pharma brings commercial discipline and relationship-led support to specialized healthcare portfolios.", "Ribicon Pharma apporte rigueur commerciale et soutien relationnel aux portefeuilles de santé spécialisés."]),
      {
        title: "Services",
        fields: [
          { key: "services.items", label: "Services", kind: "list", hint: "One service per line: Title | Description", en: "Commercial Strategy | Market-aware planning, portfolio positioning, resource optimization, and focused commercialization for specialized healthcare products.\nCustomer Partnerships | Customer relationship management, key-account planning, education, and long-term support built around the practical needs of healthcare customers.\nMarket Coordination | Marketing and sales excellence programs coordinated with manufacturers, distributors, and local stakeholders to support responsible product access.", fr: "Stratégie commerciale | Planification adaptée au marché, positionnement du portefeuille, optimisation des ressources et commercialisation ciblée de produits de santé spécialisés.\nPartenariats clients | Gestion de la relation client, planification des comptes clés, formation et soutien à long terme adaptés aux besoins des professionnels et établissements de santé.\nCoordination du marché | Programmes d’excellence marketing et ventes coordonnés avec fabricants, distributeurs et acteurs locaux afin de soutenir un accès responsable aux produits." },
        ],
      },
      {
        title: "Call to action",
        fields: [
          { key: "services.cta.title", label: "Heading", kind: "text", en: "Have a portfolio or market opportunity to discuss?", fr: "Vous souhaitez discuter d’un portefeuille ou d’une occasion de marché?" },
          { key: "services.cta.button", label: "Button", kind: "text", en: "Start a conversation", fr: "Entamer une conversation" },
          { key: "services.cta.subject", label: "Email subject", kind: "text", en: "Partnership inquiry", fr: "Demande de partenariat" },
        ],
      },
      seo("services", ["Services", "Services"], ["Commercial, customer, and partner support from Ribicon Pharma.", "Stratégie commerciale et soutien aux partenaires de Ribicon Pharma."]),
    ],
  },
  {
    id: "portfolio",
    title: "Products page",
    description: "The page listing all categories and products (edit the categories and products themselves in their own sections).",
    path: "/portfolio",
    sections: [
      banner("portfolio", "/hero-diagnostics.png", ["Our portfolio", "Notre portefeuille"], ["Focused by design.", "Ciblé par choix."], ["A clear view of Ribicon Pharma’s current areas of focus. Detailed product information is provided only after appropriate regulatory and medical review.", "Une vue claire des domaines d’intérêt actuels de Ribicon Pharma. Les renseignements détaillés ne sont publiés qu’après une révision médicale et réglementaire appropriée."]),
      {
        title: "Category list",
        fields: [
          { key: "portfolio.draft_badge", label: "Badge on categories in development", kind: "text", en: "Information forthcoming", fr: "Information à venir" },
          { key: "portfolio.empty", label: "Text when a category has no products", kind: "textarea", en: "Product names, intended uses, and supporting documentation will be added after the portfolio is confirmed.", fr: "Les noms de produits, usages prévus et documents justificatifs seront ajoutés après confirmation du portefeuille." },
        ],
      },
      {
        title: "Professionals box",
        fields: [
          { key: "portfolio.info.eyebrow", label: "Small label", kind: "text", en: "For healthcare professionals", fr: "Pour les professionnels de la santé" },
          { key: "portfolio.info.title", label: "Heading", kind: "text", en: "Need verified product information?", fr: "Besoin d’information vérifiée?" },
          { key: "portfolio.info.body", label: "Paragraph", kind: "textarea", en: "Contact Ribicon Pharma for current product status, approved Canadian product documentation, and medical information. Public portfolio descriptions are not a substitute for an authorized product monograph or professional advice.", fr: "Communiquez avec Ribicon Pharma pour connaître le statut actuel des produits, obtenir la documentation canadienne approuvée et demander de l’information médicale." },
          { key: "portfolio.info.button", label: "Button", kind: "text", en: "Request product information", fr: "Demander de l’information" },
          { key: "portfolio.info.subject", label: "Email subject", kind: "text", en: "Product information request", fr: "Demande d’information sur un produit" },
        ],
      },
      seo("portfolio", ["Portfolio", "Portefeuille"], ["Explore Ribicon Pharma’s focused portfolio across diagnostics, specialty therapeutics, ophthalmology, and cardiology.", "Découvrez le portefeuille de Ribicon Pharma en diagnostic, thérapies spécialisées, ophtalmologie et cardiologie."]),
    ],
  },
  {
    id: "product",
    title: "Product page labels",
    description: "Headings and notices shown on every individual product page.",
    sections: [
      {
        title: "Labels",
        fields: [
          { key: "product.overview_eyebrow", label: "Overview label", kind: "text", en: "Product overview", fr: "Aperçu du produit" },
          { key: "product.overview_title", label: "Overview heading", kind: "text", en: "What it is.", fr: "De quoi s’agit-il." },
          { key: "product.how_it_works", label: "“How it works” heading", kind: "text", en: "How it works", fr: "Fonctionnement" },
          { key: "product.specs_eyebrow", label: "Specifications label", kind: "text", en: "Specifications", fr: "Spécifications" },
          { key: "product.specs_title", label: "Specifications heading", kind: "text", en: "Key figures.", fr: "Chiffres clés." },
          { key: "product.context_eyebrow", label: "Portfolio info label", kind: "text", en: "Portfolio information", fr: "Information sur le portefeuille" },
          { key: "product.context_title", label: "Portfolio info heading", kind: "text", en: "From the original portfolio.", fr: "Issu du portefeuille d’origine." },
          { key: "product.badge", label: "Badge", kind: "text", en: "Content review draft", fr: "Contenu à réviser" },
          { key: "product.note", label: "Notice", kind: "textarea", en: "This page preserves the former site’s product information for review. It does not establish current Canadian availability, approved indications, performance, or prescribing information. Request verified documentation before relying on it.", fr: "Cette page conserve l’information produit de l’ancien site à des fins de révision. Elle ne confirme pas la disponibilité au Canada, les indications approuvées, les performances ni les renseignements thérapeutiques. Demandez la documentation vérifiée avant de vous y fier." },
          { key: "product.cta", label: "Button", kind: "text", en: "Request verified information", fr: "Demander l’information vérifiée" },
          { key: "product.cta_subject", label: "Email subject (product name is added)", kind: "text", en: "Information request", fr: "Demande d’information" },
          { key: "product.legacy_source", label: "Former-site link", kind: "text", en: "View on the former site", fr: "Voir sur l’ancien site" },
          { key: "product.related_eyebrow", label: "Related products label", kind: "text", en: "Explore this area", fr: "Explorer ce domaine" },
          { key: "product.related_title", label: "Related products heading", kind: "text", en: "Related products", fr: "Produits connexes" },
        ],
      },
    ],
  },
  {
    id: "contact",
    title: "Contact page",
    description: "Contact details, the message form and privacy note.",
    path: "/contact",
    sections: [
      banner("contact", "/therapeutics-editorial.jpg", ["Contact", "Contact"], ["Let’s make the conversation useful.", "Rendons la conversation utile."], ["For portfolio, partnership, company, or product-information inquiries, contact Ribicon Pharma directly.", "Pour toute demande liée au portefeuille, aux partenariats, à l’entreprise ou à un produit, communiquez directement avec Ribicon Pharma."]),
      {
        title: "Contact boxes",
        description: "The email address and office address come from Site settings.",
        fields: [
          { key: "contact.general.eyebrow", label: "Small label", kind: "text", en: "General inquiries", fr: "Demandes générales" },
          { key: "contact.general.title", label: "Heading", kind: "text", en: "Start with the right question.", fr: "Commencez par la bonne question." },
          { key: "contact.general.body", label: "Paragraph", kind: "textarea", en: "Include your organization and the reason for your inquiry.", fr: "Indiquez votre organisation et la raison de votre demande." },
          { key: "contact.office.label", label: "Office label", kind: "text", en: "Canadian office", fr: "Bureau canadien" },
          { key: "contact.product.label", label: "Product info label", kind: "text", en: "Product information", fr: "Information sur les produits" },
          { key: "contact.product.body", label: "Product info text", kind: "text", en: "Use the subject “Product information request.”", fr: "Utilisez l’objet « Demande d’information sur un produit »." },
          { key: "contact.partner.label", label: "Partnerships label", kind: "text", en: "Partnerships", fr: "Partenariats" },
          { key: "contact.partner.body", label: "Partnerships text", kind: "text", en: "Use the subject “Partnership inquiry.”", fr: "Utilisez l’objet « Demande de partenariat »." },
        ],
      },
      {
        title: "Message form",
        fields: [
          { key: "contact.form.eyebrow", label: "Small label", kind: "text", en: "Write to us", fr: "Écrivez-nous" },
          { key: "contact.form.title", label: "Heading", kind: "text", en: "Send a message.", fr: "Envoyer un message." },
          { key: "contact.form.subjects", label: "Subject choices", kind: "list", hint: "One per line; the first is selected by default.", en: "General inquiry\nProduct information request\nPartnership inquiry\nAdverse event or product complaint", fr: "Demande générale\nDemande d’information sur un produit\nDemande de partenariat\nEffet indésirable ou plainte concernant un produit" },
          { key: "contact.form.sent", label: "Thank-you message", kind: "textarea", en: "Thank you. Your message has been sent and we will reply by email.", fr: "Merci. Votre message a été envoyé et nous vous répondrons par courriel." },
        ],
      },
      {
        title: "Privacy note",
        fields: [
          { key: "contact.privacy.eyebrow", label: "Small label", kind: "text", en: "Privacy and safety", fr: "Confidentialité et sécurité" },
          { key: "contact.privacy.title", label: "Heading", kind: "text", en: "Share only what is necessary.", fr: "Ne partagez que le nécessaire." },
          { key: "contact.privacy.body", label: "Paragraph", kind: "textarea", en: "Do not send personal health information through general email. If your message concerns a suspected adverse event or product complaint, identify that in the subject line so it can be routed appropriately.", fr: "N’envoyez pas de renseignements personnels sur la santé par courriel général. Si votre message concerne un effet indésirable présumé ou une plainte concernant un produit, indiquez-le dans l’objet." },
        ],
      },
      seo("contact", ["Contact", "Contact"], ["Contact Ribicon Pharma in Montréal, Québec, Canada.", "Communiquez avec Ribicon Pharma à Montréal, Québec, Canada."]),
    ],
  },
  {
    id: "privacy",
    title: "Privacy page",
    description: "Legal text.",
    path: "/privacy",
    sections: [
      {
        title: "Content",
        fields: [
          { key: "privacy.eyebrow", label: "Small label", kind: "text", en: "Legal information", fr: "Information juridique" },
          { key: "privacy.title", label: "Heading", kind: "text", en: "Privacy", fr: "Confidentialité" },
          { key: "privacy.body", label: "Text", kind: "rich", en: "This staging privacy notice is a content placeholder and must be reviewed against Ribicon Pharma’s actual data practices before launch.\n\n## Information you choose to provide\n\nIf you contact Ribicon Pharma by email, the company may receive your name, contact information, organization, and message. Do not include personal health information in a general inquiry.\n\n## Purpose and retention\n\nInformation should be used only to respond to the stated inquiry and retained only as long as required for that purpose and any applicable legal obligations.\n\n## Before launch\n\nRibicon Pharma must identify its privacy officer, service providers, hosting region, analytics choices, retention periods, cross-border transfers, and procedures for privacy requests before this notice is finalized.", fr: "Le présent avis de confidentialité provisoire doit être révisé en fonction des pratiques réelles de Ribicon Pharma avant le lancement.\n\n## Renseignements que vous fournissez\n\nSi vous communiquez avec Ribicon Pharma par courriel, l’entreprise peut recevoir votre nom, vos coordonnées, votre organisation et votre message. N’incluez pas de renseignements personnels sur la santé dans une demande générale.\n\n## Utilisation et conservation\n\nLes renseignements ne devraient servir qu’à répondre à la demande et être conservés uniquement pendant la période nécessaire à cette fin et au respect des obligations légales applicables.\n\n## Avant le lancement\n\nRibicon Pharma doit préciser son responsable de la protection des renseignements personnels, ses fournisseurs, la région d’hébergement, les choix analytiques, les périodes de conservation, les transferts transfrontaliers et les procédures de demande." },
        ],
      },
      seo("privacy", ["Privacy", "Confidentialité"], ["How Ribicon Pharma handles information you provide.", "Comment Ribicon Pharma traite les renseignements que vous fournissez."]),
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility page",
    description: "Accessibility statement.",
    path: "/accessibility",
    sections: [
      {
        title: "Content",
        fields: [
          { key: "accessibility.eyebrow", label: "Small label", kind: "text", en: "Our commitment", fr: "Notre engagement" },
          { key: "accessibility.title", label: "Heading", kind: "text", en: "Accessibility", fr: "Accessibilité" },
          { key: "accessibility.body", label: "Text", kind: "rich", en: "Ribicon Pharma is developing this website with the goal of conforming to WCAG 2.2 Level AA and providing an inclusive experience across devices and assistive technologies.\n\n## Design and development\n\nThe website uses semantic structure, keyboard-accessible navigation, visible focus states, adaptable layouts, meaningful image descriptions, and reduced-motion support.\n\n## Feedback\n\nIf you encounter an accessibility barrier, email [info@ribicongroup.com](mailto:info@ribicongroup.com) and describe the page and assistance you need.", fr: "Ribicon Pharma développe ce site afin de viser la conformité aux WCAG 2.2 niveau AA et d’offrir une expérience inclusive sur les différents appareils et technologies d’assistance.\n\n## Conception et développement\n\nLe site utilise une structure sémantique, une navigation accessible au clavier, des indicateurs de focus visibles, des mises en page adaptatives, des descriptions d’images pertinentes et une prise en charge de la réduction des animations.\n\n## Commentaires\n\nSi vous rencontrez un obstacle à l’accessibilité, écrivez à [info@ribicongroup.com](mailto:info@ribicongroup.com) en indiquant la page concernée et l’aide dont vous avez besoin." },
        ],
      },
      seo("accessibility", ["Accessibility", "Accessibilité"], ["Ribicon Pharma’s accessibility commitment.", "L’engagement de Ribicon Pharma en matière d’accessibilité."]),
    ],
  },
];

export const contentFields: FieldDef[] = contentPages.flatMap((page) => page.sections.flatMap((section) => section.fields));
export const contentFieldMap = new Map(contentFields.map((field) => [field.key, field]));

/** Shapes offered by the cropper for images in admin forms that aren't page content. */
export const IMAGE_ASPECT = { heroSlide: 5 / 2, category: 3 / 2, ...ASPECT };
