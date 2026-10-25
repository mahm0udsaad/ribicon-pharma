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

export type HeroSlide = { src: string; alt: string; eyebrow: string; title: string; body: string };

export type Locale = "en" | "fr";
