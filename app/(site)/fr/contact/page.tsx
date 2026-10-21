import { ContactPage } from "@/components/pages/contact-page";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = () => pageMetadata("contact", "fr", "/contact");
export default function Page() { return <ContactPage locale="fr" />; }
