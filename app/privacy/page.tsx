import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <article className="legal-copy">
      <p className="eyebrow">Legal information</p>
      <h1>Privacy</h1>
      <p>
        This staging privacy notice is a content placeholder and must be reviewed against
        Ribicon Pharma’s actual data practices before launch.
      </p>
      <h2>Information you choose to provide</h2>
      <p>
        If you contact Ribicon Pharma by email, the company may receive your name, contact
        information, organization, and message. Do not include personal health information in
        a general inquiry.
      </p>
      <h2>Purpose and retention</h2>
      <p>
        Information should be used only to respond to the stated inquiry and retained only as
        long as required for that purpose and any applicable legal obligations.
      </p>
      <h2>Before launch</h2>
      <p>
        Ribicon Pharma must identify its privacy officer, service providers, hosting region,
        analytics choices, retention periods, cross-border transfers, and procedures for
        privacy requests before this notice is finalized.
      </p>
    </article>
  );
}
