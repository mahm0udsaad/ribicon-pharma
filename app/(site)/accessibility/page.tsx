import { LegalPage } from "@/components/pages/legal-page";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = () => pageMetadata("accessibility", "en", "/accessibility");
export default function Page() { return <LegalPage page="accessibility" locale="en" />; }
