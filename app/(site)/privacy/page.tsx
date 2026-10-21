import { LegalPage } from "@/components/pages/legal-page";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = () => pageMetadata("privacy", "en", "/privacy");
export default function Page() { return <LegalPage page="privacy" locale="en" />; }
