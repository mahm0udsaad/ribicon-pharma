import { ServicesPage } from "@/components/pages/services-page";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = () => pageMetadata("services", "fr", "/services");
export default function Page() { return <ServicesPage locale="fr" />; }
