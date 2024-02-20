import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
