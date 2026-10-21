import { ContactPage } from "@/components/pages/contact-page";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = () => pageMetadata("contact", "en", "/contact");
export default function Page() { return <ContactPage locale="en" />; }
