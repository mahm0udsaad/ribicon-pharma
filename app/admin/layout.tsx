import type { Metadata } from "next";
import "react-image-crop/dist/ReactCrop.css";
import "./admin.css";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin | Ribicon Pharma" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
