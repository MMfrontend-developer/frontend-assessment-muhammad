import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Checkit Store | Premium Product Explorer",
  description: "Explore a curated collection of premium products with the Checkit Content Explorer.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-black text-white selection:bg-white selection:text-black min-h-screen flex flex-col font-sans`}
      >
        <Navbar />
        <main className="grow">{children}</main>
        <Footer className="shrink-0" />
      </body>
    </html>
  );
}
