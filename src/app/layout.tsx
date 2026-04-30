import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Void | Single-Origin Espresso",
  description: "A digital sommelier experience for our 2026 harvest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll>
          <Cursor />
          <div className="film-grain"></div>
          <NavBar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
