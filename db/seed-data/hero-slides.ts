type SeedSlide = {
  image: string;
  en: { alt: string; eyebrow: string; title: string; body: string };
  fr: { alt: string; eyebrow: string; title: string; body: string };
};

export const heroSlides: SeedSlide[] = [
  {
    image: "/hero-diagnostics.png",
    en: { alt: "Precision laboratory diagnostic equipment with a suspended sample droplet", eyebrow: "Canada-based specialty healthcare", title: "Precision in every possibility.", body: "Ribicon Pharma connects specialized diagnostics and therapies with the healthcare professionals and partners who move patient care forward." },
    fr: { alt: "Équipement de diagnostic de précision avec une goutte d’échantillon", eyebrow: "Soins spécialisés basés au Canada", title: "La précision ouvre les possibles.", body: "Ribicon Pharma relie diagnostics et thérapies spécialisés aux professionnels et partenaires qui font progresser les soins." },
  },
  {
    image: "/ophthalmology-editorial.jpg",
    en: { alt: "Ophthalmic examination in a clinical setting", eyebrow: "Ophthalmology", title: "Clarity for specialized eye care.", body: "Trusted ophthalmic treatments, supplied to the clinicians and partners who protect vision." },
    fr: { alt: "Examen ophtalmologique en milieu clinique", eyebrow: "Ophtalmologie", title: "La clarté au service des soins oculaires.", body: "Des traitements ophtalmiques de confiance, destinés aux cliniciens et partenaires qui protègent la vision." },
  },
  {
    image: "/therapeutics-editorial.jpg",
    en: { alt: "Specialty therapeutics in a clinical setting", eyebrow: "Specialty therapeutics", title: "Specialty medicines, delivered with care.", body: "A focused range of therapies, backed by commercial discipline and long-term partnerships." },
    fr: { alt: "Thérapies spécialisées en milieu clinique", eyebrow: "Thérapies spécialisées", title: "Des médicaments spécialisés, livrés avec soin.", body: "Une gamme ciblée de thérapies, soutenue par la rigueur commerciale et des partenariats durables." },
  },
];
