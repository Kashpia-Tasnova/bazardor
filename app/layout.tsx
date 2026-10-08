import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MarketNavigation from "@/components/MarketNavigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজার দর",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="bg-white text-zinc-900 antialiased">
        <Navbar />

        <MarketNavigation />

        {children}

        <Footer />
      </body>
    </html>
  );
}