import { HomePage } from "@/components/pages/home-page";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = () => pageMetadata("home", "fr", "/");
export default function Page() { return <HomePage locale="fr" />; }
