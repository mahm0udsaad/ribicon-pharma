import { PortfolioPage } from "@/components/pages/portfolio-page";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = () => pageMetadata("portfolio", "en", "/portfolio");
export default function Page() { return <PortfolioPage locale="en" />; }
