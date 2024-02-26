import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import NextBreadcrumb from "./components/BreadCrumbs";

import AppHeader from "./components/AppHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anime world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppHeader/>
        <NextBreadcrumb
          homeElement={'Home'}
          separator={<span> - </span>}
          activeClasses='text-[#FF6A3D]'
          containerClasses='flex py-5' 
          listClasses='hover:underline mx-2 font-bold'
        />
        {children}
      </body>
    </html>
  );
}
