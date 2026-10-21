import { HomePage } from "@/components/pages/home-page";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = () => pageMetadata("home", "en", "/");
export default function Page() { return <HomePage locale="en" />; }
