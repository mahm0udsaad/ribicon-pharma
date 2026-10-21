import { ServicesPage } from "@/components/pages/services-page";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = () => pageMetadata("services", "en", "/services");
export default function Page() { return <ServicesPage locale="en" />; }
