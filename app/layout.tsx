
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
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

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "10px",
              background: "#ffffff",
              color: "#252c27",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#15803d",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#dc2626",
                secondary: "#ffffff",
              },
            },
          }}
        />

        {children}

        <Footer />
      </body>
    </html>
  );
}