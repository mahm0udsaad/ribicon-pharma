# Ribicon Pharma Website Redesign Plan

Prepared from a live audit of `ribicongroup.com`, the supplied logo, the owner’s product notes, and current Canadian regulatory/privacy guidance.

## Current build status (2 October 2026)

- Built a responsive English preview with Home, About, Portfolio, Services, Contact, Privacy, and Accessibility pages.
- Added individual review-draft pages for the 11 retained products; these pages are excluded from search indexing until medical/regulatory copy is approved.
- Added original editorial imagery for diagnostics, therapeutics, and ophthalmology; a custom ECG visual for cardiology; and restrained load, scroll, and hover motion with a reduced-motion fallback.
- Kept veterinary diagnostics as a clearly labelled placeholder. OTC products, Camera PL-800, and non-solid-tumor biomarkers are absent.
- Still required before public launch: owner approval of copy and imagery, current Canadian product documentation/availability, corporate contact details and affiliate claims, French translation, proper vector logo, and redirect mapping.

## 1. Project Goal

Replace the dated Ribicon Group website with a modern, bilingual, Canada-first corporate website for **Ribicon Pharma** that:

- establishes credibility with healthcare professionals, partners, and institutions;
- presents the approved portfolio in a clear therapeutic-area structure;
- supports future veterinary diagnostic biomarkers without publishing unverified claims;
- meets accessibility, privacy, performance, and Canadian health-product advertising requirements;
- preserves useful legacy search equity through redirects while removing obsolete content.

The site should feel precise, calm, clinical, and established—not like a generic technology startup.

## 2. What the Legacy Audit Found

### Structural and design problems

1. The visual identity and company name are still “Ribicon Group,” while the new business identity is Ribicon Pharma.
2. The fixed-width layout clips navigation and content on mobile screens and does not provide a modern responsive experience.
3. The hierarchy is weak: decorative banners dominate while the company’s value, portfolio, audience, and next action are unclear.
4. The product taxonomy is inconsistent. Vectraplex appears under both Cardiology and Medical Devices; CRP appears in Biomarkers although its page is labelled Cardiology.
5. Product pages are long, difficult to scan, and mix product information with copied patient-education material and external citations.
6. The website gives conflicting geographic signals: the homepage emphasizes Berlin, while the contact page lists Canada, Germany, and Sweden. The new site needs one clearly identified Canadian headquarters and accurate affiliate information.
7. The current site lacks a complete French version, accessible interaction patterns, a visible privacy policy, a modern inquiry path, and clear legal/regulatory controls.

### Logo assessment

- Supplied file: 418 × 251 px PNG, white background, no transparency.
- The blue serif wordmark and cyan wave can anchor the visual system, but this raster file is too small for high-density screens and large hero use.
- Before development, obtain the original vector file or redraw it as SVG, produce horizontal/stacked/monochrome variants, define clear space, and export a transparent favicon/app icon.

## 3. Recommended Content Migration

| Legacy content | Decision | New location / note |
|---|---|---|
| Who We Are | Rewrite and retain | About Ribicon Pharma |
| Vision, Mission & Values | Consolidate and rewrite | About page; remove repetition and generic language |
| Business Strategy | Reframe | “How We Work” or “Commercial Partnerships” within About/Services |
| Customer Services | Rewrite and shorten | Services page focused on partner and customer support |
| Canada, Germany, Sweden addresses | Verify before publishing | Contact page; Canada presented as headquarters if confirmed |
| Biomarkers: AFP | Retain | Solid-Tumor Biomarkers |
| Biomarkers: CA-125 | Retain | Solid-Tumor Biomarkers |
| Gastric Cancer GC-REAAD | Retain, verify claims/status | Solid-Tumor Biomarkers |
| Hepatocellular Cancer HCC-REAAD | Retain, verify claims/status | Solid-Tumor Biomarkers |
| Nasopharyngeal Cancer NPC-REAAD | Retain, verify claims/status | Solid-Tumor Biomarkers |
| SensiQuant | Remove from new biomarker group | Hematology/CML, not solid-tumor content |
| SMART SNP | Remove from new biomarker group | Human genetics/thrombophilia, not solid-tumor content |
| Mentype | Remove from new biomarker group | Hematology/transplant content, not solid-tumor content |
| CRP | Do not place under solid-tumor biomarkers | Confirm whether a specific cardiac assay is still in portfolio; otherwise omit |
| Tepadina | Retain after Canadian status/content review | Targeted Therapeutics |
| Phelinun | Retain after Canadian status/content review | Targeted Therapeutics |
| Bimatoprost | Retain | Ophthalmology |
| Latanoprost | Retain | Ophthalmology |
| Vectraplex ECG | Retain once, not twice | Cardiology; classify as a device within the product metadata |
| Troponin | Retain | Cardiology |
| Camera PL-800 | Remove | No migration or navigation link |
| Medical Devices category | Remove as a standalone category | Vectraplex remains under Cardiology; avoids a one-item duplicate section |
| Cosmetics / Dermo-Cosmetics / eczema / fungal nail | Remove | Treated as the legacy OTC group based on the current inventory; confirm with owner |
| Veterinary diagnostic biomarkers | Prepare but do not publish claims yet | CMS-ready category in draft until product names, species, intended use, authorization status, and approved claims are supplied |

## 4. Proposed Information Architecture

### Primary navigation

1. **Home**
2. **About**
3. **Portfolio**
4. **Services**
5. **Contact**
6. **FR / EN** language switcher

Use a single prominent CTA: **Partner With Us** or **Contact Ribicon Pharma**.

### Portfolio hierarchy

- Portfolio overview
  - Solid-Tumor Biomarkers
    - AFP
    - CA-125
    - Gastric Carcinoma GC-REAAD
    - Hepatocellular Carcinoma HCC-REAAD
    - Nasopharyngeal Carcinoma NPC-REAAD
  - Targeted Therapeutics
    - Tepadina (thiotepa)
    - Phelinun (melphalan)
  - Ophthalmology
    - Bimatoprost eye drops
    - Latanoprost eye drops
  - Cardiology
    - Vectraplex ECG
    - Troponin test
    - CRP only if the owner confirms the exact cardiac product and approved positioning
  - Veterinary Diagnostics
    - Draft/unpublished until details are received and reviewed

### Utility and legal pages

- Healthcare Professional Resources or audience gate, if detailed prescription-product content is required
- Privacy Policy
- Cookie Preferences, only if non-essential tracking is used
- Terms of Use
- Accessibility Statement
- Adverse Event / Product Complaint contact instructions, if applicable to Ribicon’s role
- 404 page and legacy URL redirect map

## 5. Page-by-Page Content Plan

### Home

**Primary purpose:** establish Ribicon Pharma as a credible Canada-based specialty healthcare partner and route visitors to the portfolio or contact.

Recommended sequence:

1. Editorial hero with one corporate message, one proof-oriented supporting line, and 1–2 actions.
2. Four featured portfolio areas with one dominant feature and three secondary entries—not a uniform card grid.
3. “Why Ribicon Pharma” section covering specialized portfolio, commercial expertise, customer focus, and partnerships using only substantiated statements.
4. Canada-first company story with verified affiliate footprint.
5. Focused partnership/contact CTA.

Working hero direction:

> **Specialized healthcare, thoughtfully brought to market.**  
> Ribicon Pharma connects innovative diagnostics and therapies with the professionals and partners who need them.

This copy is a starting point and requires owner approval; it avoids unverified superiority or treatment claims.

### About

- concise company overview using “Ribicon Pharma” throughout;
- verified Canadian headquarters and affiliate footprint;
- sharpened mission and vision;
- values expressed through specific behaviours, not generic slogans;
- commercial capabilities and partnership model;
- optional leadership section only when approved biographies and photography are available.

### Portfolio Overview

- filters or direct anchors for therapeutic area, audience, and product type;
- short category introductions;
- restrained product cards showing name, category, and approved one-line description;
- no public efficacy, safety, superiority, or indication claims unless regulatory review confirms they are permitted.

### Product Detail Template

Each product record should support:

- brand/generic name;
- therapeutic area and product type;
- audience and access level;
- short approved summary;
- dosage form/strength only when verified;
- Health Canada status, DIN/device licence, sponsor/manufacturer, and market availability where applicable;
- approved monograph/label download separated from promotional copy;
- medical information, product complaint, or adverse-event contact path;
- “Last medically reviewed” date and content owner;
- mandatory disclaimers.

Detailed prescription information should use an appropriate healthcare-professional gate and `noindex` where required. The public view should remain corporate and non-promotional.

### Services

Replace the current long essay with 3 concrete capabilities:

- commercial strategy and market access support;
- customer relationship and key-account support;
- distribution/partner coordination, only if this accurately reflects current operations.

Each capability should include who it serves, what Ribicon does, and a specific inquiry CTA.

### Contact

- verified Canadian headquarters first;
- verified affiliate locations second;
- role-based contact choices: partnerships, medical information, product complaints/adverse events, and general inquiries;
- short, accessible form collecting only necessary data;
- clear privacy notice at the point of collection;
- no request for patient medical information in the general contact form.

## 6. Visual Direction

### Recommended concept: “Clinical Precision, Human Scale”

- **Palette:** preserve the logo’s deep navy and cyan; build around warm white, cool white, ink, and one pale clinical-blue surface. Avoid purple gradients, glowing effects, and decorative glass cards.
- **Typography:** modern sans-serif for interface/body text paired with a restrained editorial serif for selected headlines, echoing the logo without copying its dated feel.
- **Composition:** asymmetric editorial layouts, generous whitespace, 12-column desktop grid, strong left alignment, and sections separated by scale rather than decoration.
- **Imagery:** commissioned or licensed Canadian clinical/laboratory photography, high-quality molecular or diagnostic imagery, and real people only when authentic and consented. Avoid generic handshake, pill-in-hand, and smiling-doctor stock clichés.
- **Motion:** one subtle page-load or section-reveal system using opacity/transform only; respect `prefers-reduced-motion`. No autoplay carousel.
- **Cards:** image-led with minimal copy; one visually dominant therapeutic area per viewport rather than equal-weight boxes.
- **Iconography:** consistent outline SVG icons; no emoji or mixed icon styles.

### Suggested design tokens

- Brand navy: approximately `#123E79` (confirm from vector source)
- Clinical cyan: approximately `#1496BD` (confirm from vector source)
- Ink: `#101820`
- Warm white: `#F8F7F3`
- Surface blue: `#EAF4F8`
- Section spacing: 96–128 px desktop, 64–80 px mobile
- Body width: 65–75 characters for long-form reading
- Corner radius: 8–16 px, used sparingly

The primary experience should be light, not dark: it better supports clinical clarity, the existing logo, long-form readability, and document viewing.

## 7. Responsive and Accessibility Requirements

- Mobile-first layouts validated at 320, 768, 1024, and 1440 px.
- WCAG 2.2 AA target, with a Lighthouse accessibility goal of 100 for core templates.
- Semantic landmarks, one clear H1, logical heading order, skip link, visible focus states, keyboard-accessible navigation, and minimum 44 × 44 px touch targets.
- Contrast of at least 4.5:1 for normal text and 3:1 for large text/UI graphics.
- Meaningful alt text, explicit image dimensions, responsive image formats, and no text embedded in imagery.
- Reduced-motion alternative, no content-only hover states, no horizontal overflow, and accessible tables on product pages.
- French typography and line-length QA, not automated translation pasted without review.

## 8. Canadian Compliance and Governance Gate

Before any product page is approved for launch:

1. Confirm Ribicon Pharma’s legal entity name, headquarters, affiliate relationships, and the party responsible for each product in Canada.
2. Verify every drug’s current DIN/status, strength, sponsor, market availability, and approved Canadian product monograph.
3. Verify device licensing and ensure every device claim matches its authorized intended use.
4. Separate public corporate content from healthcare-professional product information; implement gating and `noindex` where required.
5. Have medical/regulatory review approve every indication, performance, safety, and comparative statement.
6. Create a content approval record with owner, source, approval date, and review/expiry date.
7. Publish a complete French website for the Québec business presence, with human review of medical terminology.
8. Publish a plain-language privacy policy, identify the privacy officer/contact, disclose form purposes and vendors, and obtain meaningful consent where required.
9. Decide whether analytics are necessary. Prefer privacy-respecting analytics; block non-essential trackers until consent.

The current Tepadina page should not be migrated verbatim. Health Canada currently lists Tepadina products, but the old page’s strengths and claims must be reconciled against the exact Ribicon-distributed product and current monograph. Phelinun and Vectraplex also require direct Canadian authorization/relationship verification before publication.

## 9. SEO and Migration

- Use descriptive URLs such as `/portfolio/solid-tumor-biomarkers/ca-125`.
- Create unique English and French titles, descriptions, canonical tags, and `hreflang` pairs.
- Add `Organization`, `Product` only where appropriate, `BreadcrumbList`, and `ContactPoint` structured data using verified facts.
- Preserve useful old URLs with one-to-one 301 redirects; send removed products to the closest relevant category only when that is genuinely useful, otherwise return a clear 410/retired-content page.
- Do not index gated professional content, draft veterinary content, search/filter permutations, or internal documents not intended for public discovery.
- Rewrite legacy copy rather than duplicating it. The current long patient-education pages should become concise, source-controlled content.
- Monitor Search Console, broken links, redirect errors, Core Web Vitals, and indexed pages after launch.

## 10. Recommended Technical Baseline

- Next.js with TypeScript for a fast, statically generated corporate site.
- A structured headless CMS so Ribicon can add veterinary biomarkers and maintain approved product records without code changes.
- Reusable content models for therapeutic area, product, document, office, contact route, and legal notice.
- Canadian or approved data-hosting region where required by the privacy assessment.
- Server-side form handling with spam protection that does not force inaccessible puzzles; minimal retention and role-based routing.
- Automated image optimization, sitemap/robots generation, redirects, uptime monitoring, and dependency/security updates.
- No ecommerce, patient account, or medical-data collection in phase 1.

## 11. Delivery Phases

### Phase 1 — Discovery and verification

- stakeholder workshop;
- confirm primary audiences and conversion goal;
- validate company facts, legal name, addresses, email routing, product ownership, licences, DINs, and monographs;
- receive veterinary product details and logo source files;
- decide public versus HCP-gated content.

**Exit gate:** signed content inventory and regulatory matrix.

### Phase 2 — Content strategy and UX

- finalize sitemap and navigation;
- create English page briefs and product schema;
- rewrite legacy content;
- map redirects;
- define French translation workflow;
- wireframe Home, Portfolio, Product, About, Services, and Contact.

**Exit gate:** approved wireframes and English content.

### Phase 3 — Visual design

- vectorize/finalize logo assets;
- establish type, colour, spacing, image, icon, and motion systems;
- design desktop and mobile key pages;
- prototype navigation, product filters, language switching, and HCP access.

**Exit gate:** approved responsive design system and page templates.

### Phase 4 — Development and CMS

- build reusable components and CMS models;
- implement bilingual routing, SEO, redirects, forms, privacy controls, and gated resources;
- migrate approved content and optimize media.

**Exit gate:** feature-complete staging site.

### Phase 5 — Validation and launch

- medical/regulatory/legal content approval;
- French linguistic QA;
- keyboard/screen-reader and 320–1440 px responsive QA;
- Lighthouse, Core Web Vitals, forms, redirects, metadata, analytics, security headers, and browser testing;
- backup old site, publish, submit sitemaps, and monitor launch.

**Exit gate:** signed launch checklist and content-governance owner assigned.

## 12. Inputs Needed From the Owner

1. Exact legal company name and registered Canadian address.
2. Confirmation that the Montréal office is the public headquarters.
3. Current phone numbers and role-based email addresses.
4. Original vector logo and any brand guidelines.
5. Final list of products actually marketed/distributed by Ribicon Pharma in Canada.
6. DINs, device licence numbers, current monographs/IFUs, approved claims, and manufacturer/partner permissions.
7. Confirmation that Cosmetics/Dermo-Cosmetics are the OTC products to remove.
8. Decision on CRP: keep under Cardiology, move elsewhere, or remove.
9. Veterinary biomarker names, species, sample type, intended use, format/platform, status, markets, supporting documents, and approved claims.
10. French translations or approval to commission medical translation.
11. Privacy officer/contact and required form-routing recipients.
12. Approved photos, partner logos, certifications, and leadership biographies, if they will be used.

## 13. Definition of Done

The redesign is complete when it is visibly modern and responsive, but also when every public claim is approved, every retained product is correctly classified, French and English are complete, contact data is verified, removed products cannot be found through navigation, legacy URLs are handled intentionally, accessibility checks pass, and an internal owner can safely update the portfolio through the CMS.
