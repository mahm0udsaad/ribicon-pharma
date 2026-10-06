import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import Image from "next/image";
import { ArrowLink } from "@/components/arrow-link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Ribicon Pharma’s purpose, approach, and Canadian foundation.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero image="/therapeutics-editorial.jpg">
        <p className="eyebrow">About Ribicon Pharma</p>
        <h1 className="display-title">A focused healthcare company with a wider view.</h1>
        <p>
          Ribicon Pharma is a Canada-based specialty healthcare company with a
          German-Canadian heritage and a focused portfolio in diagnostics,
          therapeutics, ophthalmology, and cardiology.
        </p>
      </PageHero>

      <section className="section section-blue">
        <div className="shell content-grid">
          <div>
            <p className="eyebrow">Our purpose</p>
            <h2>Bring meaningful innovation closer to the people who use it.</h2>
          </div>
          <div>
            <p>
              We work with healthcare stakeholders and commercial partners to support
              specialized products through thoughtful market development, customer
              relationships, and disciplined portfolio management.
            </p>
            <p>
              Our ambition is not to be broad. It is to be useful—choosing areas where
              expertise, access, and sustained support can make a meaningful difference.
            </p>
          </div>
        </div>

        <div className="shell content-grid">
          <div>
            <p className="eyebrow">Our commitments</p>
            <h2>Care in the details.</h2>
          </div>
          <div>
            <ul>
              <li>Operate with transparency and responsible governance.</li>
              <li>Build durable relationships with customers and partners.</li>
              <li>Use verified information and responsible communication.</li>
              <li>Consider the social and environmental impact of our work.</li>
            </ul>
            <ArrowLink href="/services">How we work with partners</ArrowLink>
          </div>
        </div>
      </section>

      <section className="section shell heritage-section">
        <div className="heritage-image"><Image src="/hero-diagnostics.png" alt="Precision laboratory diagnostic equipment" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
        <div>
          <p className="eyebrow">From the Ribicon heritage</p>
          <h2 className="section-title">Science, access, and commercial execution.</h2>
          <p>The former Ribicon Group described a German-Canadian organization with activity across Canada, Germany, Sweden, and the Middle East. For the new Ribicon Pharma brand, the Canadian base remains central; current affiliate and market details are being verified before publication.</p>
          <p>Its original mission—to bring innovative medicines and diagnostics to market through marketing and sales excellence—continues to inform this focused portfolio.</p>
        </div>
      </section>
    </>
  );
}
