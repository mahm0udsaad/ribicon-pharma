import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ribiconpharma.com"),
  title: {
    default: "Ribicon Pharma | Specialized Healthcare",
    template: "%s | Ribicon Pharma",
  },
  description:
    "Ribicon Pharma is a Canada-based specialty healthcare company working across diagnostics, targeted therapeutics, ophthalmology, and cardiology.",
  openGraph: {
    title: "Ribicon Pharma",
    description: "Specialized healthcare, thoughtfully brought to market.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <body>{children}</body>
    </html>
  );
}
