import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Services",
  description: "Commercial, customer, and partner support from Ribicon Pharma.",
};

const services = [
  {
    number: "01",
    title: "Commercial Strategy",
    copy: "Market-aware planning, portfolio positioning, resource optimization, and focused commercialization for specialized healthcare products.",
  },
  {
    number: "02",
    title: "Customer Partnerships",
    copy: "Customer relationship management, key-account planning, education, and long-term support built around the practical needs of healthcare customers.",
  },
  {
    number: "03",
    title: "Market Coordination",
    copy: "Marketing and sales excellence programs coordinated with manufacturers, distributors, and local stakeholders to support responsible product access.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero image="/ophthalmology-editorial.jpg">
        <p className="eyebrow">Services</p>
        <h1 className="display-title">Partnership is part of the product.</h1>
        <p>
          Ribicon Pharma brings commercial discipline and relationship-led support to
          specialized healthcare portfolios.
        </p>
      </PageHero>

      <section className="shell service-list" aria-label="Ribicon Pharma services">
        {services.map((service) => (
          <article className="service-row" key={service.number}>
            <span>{service.number}</span>
            <h2>{service.title}</h2>
            <p>{service.copy}</p>
          </article>
        ))}
      </section>

      <section className="section section-dark">
        <div className="shell cta-panel">
          <h2 className="section-title">Have a portfolio or market opportunity to discuss?</h2>
          <a className="button-secondary" style={{ color: "white", borderColor: "white" }} href="mailto:info@ribicongroup.com?subject=Partnership%20inquiry">
            Start a conversation
          </a>
        </div>
      </section>
    </>
  );
}
