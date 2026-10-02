"use client";

import { useEffect } from "react";

const revealSelector = [
  ".section-heading-row",
  ".feature-card",
  ".area-row",
  ".story-visual",
  ".story-copy",
  ".proof-strip",
  ".proof-item",
  ".portfolio-section",
  ".service-row",
  ".heritage-section",
  ".contact-primary",
  ".contact-secondary",
  ".product-detail > div",
  ".related-products a",
  ".cta-panel > div",
].join(",");

export function MotionController() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );

    document.documentElement.classList.add("motion-ready");

    elements.forEach((element, index) => {
      element.classList.add("motion-reveal");
      element.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);

      if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
        element.classList.add("is-revealed");
      } else {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
      elements.forEach((element) => {
        element.classList.remove("motion-reveal", "is-revealed");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return null;
}
