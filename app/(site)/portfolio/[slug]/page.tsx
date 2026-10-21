import { ProductPage, productMetadata } from "@/components/pages/product-page";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) { return productMetadata((await params).slug, "en"); }
export default async function Page({ params }: Props) { return <ProductPage slug={(await params).slug} locale="en" />; }
