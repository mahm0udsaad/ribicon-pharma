import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ribicon Pharma in Montréal, Québec, Canada.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero image="/therapeutics-editorial.jpg">
        <p className="eyebrow">Contact</p>
        <h1 className="display-title">Let’s make the conversation useful.</h1>
        <p>
          For portfolio, partnership, company, or product-information inquiries, contact
          Ribicon Pharma directly.
        </p>
      </PageHero>

      <section className="shell contact-grid">
        <div className="contact-primary">
          <div>
            <p className="eyebrow" style={{ color: "#aee9f8" }}>General inquiries</p>
            <h2>Start with the right question.</h2>
          </div>
          <div>
            <p>Include your organization and the reason for your inquiry.</p>
            <a className="contact-email" href="mailto:info@ribicongroup.com">
              info@ribicongroup.com
            </a>
          </div>
        </div>

        <aside className="contact-secondary" aria-label="Office information">
          <h3>Ribicon Pharma Inc.</h3>
          <div className="contact-detail">
            <strong>Canadian office</strong>
            <span>7361 Avenue Victoria<br />Montréal, Québec H4P 0A7<br />Canada</span>
          </div>
          <div className="contact-detail">
            <strong>Product information</strong>
            <span>Use the subject “Product information request.”</span>
          </div>
          <div className="contact-detail">
            <strong>Partnerships</strong>
            <span>Use the subject “Partnership inquiry.”</span>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="shell content-grid">
          <div>
            <p className="eyebrow">Privacy and safety</p>
            <h2>Share only what is necessary.</h2>
          </div>
          <div>
            <p>
              Do not send personal health information through general email. If your message
              concerns a suspected adverse event or product complaint, identify that in the
              subject line so it can be routed appropriately.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
