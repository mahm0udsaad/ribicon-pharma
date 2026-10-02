import type { Metadata } from "next";

export const metadata: Metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <article className="legal-copy">
      <p className="eyebrow">Our commitment</p>
      <h1>Accessibility</h1>
      <p>
        Ribicon Pharma is developing this website with the goal of conforming to WCAG 2.2
        Level AA and providing an inclusive experience across devices and assistive
        technologies.
      </p>
      <h2>Design and development</h2>
      <p>
        The website uses semantic structure, keyboard-accessible navigation, visible focus
        states, adaptable layouts, meaningful image descriptions, and reduced-motion support.
      </p>
      <h2>Feedback</h2>
      <p>
        If you encounter an accessibility barrier, email
        {" "}<a href="mailto:info@ribicongroup.com">info@ribicongroup.com</a> and describe the
        page and assistance you need.
      </p>
    </article>
  );
}
