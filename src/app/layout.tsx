import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { Outfit,Ovo } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight:["400","500","600","700"]
});

const ovo = Ovo({
  subsets: ["latin"],
  weight:["400"]
});

export const metadata = {
  title: "My page - tyz",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} ${ovo.className} antialiased`}>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
