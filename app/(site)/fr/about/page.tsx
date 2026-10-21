import { AboutPage } from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = () => pageMetadata("about", "fr", "/about");
export default function Page() { return <AboutPage locale="fr" />; }
