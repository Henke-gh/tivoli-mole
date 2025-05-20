import type { Metadata } from "next";
import { Flavors, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const flavor = Flavors({
  variable: "--headerFlavor",
  subsets: ["latin"],
  weight: "400",
});

const robotoSlab = Roboto_Slab({
  variable: "--robotoSlab",
  subsets: ["latin"],
  weight: ["200", "300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Guac-a-Mole",
  description:
    "A whack-a-mole game with a twist, part of the YRGO Tivoli Project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoSlab.variable} ${flavor.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
