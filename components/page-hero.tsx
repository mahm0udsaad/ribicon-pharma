import Image from "next/image";
import type { ReactNode } from "react";

export function PageHero({ image, children }: { image: string; children: ReactNode }) {
  return (
    <header className="product-hero page-hero">
      <Image src={image} alt="" fill priority sizes="100vw" className="product-hero-image" />
      <div className="shell product-hero-content">{children}</div>
    </header>
  );
}
