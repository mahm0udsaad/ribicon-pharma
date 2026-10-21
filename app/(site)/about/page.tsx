import { AboutPage } from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = () => pageMetadata("about", "en", "/about");
export default function Page() { return <AboutPage locale="en" />; }
