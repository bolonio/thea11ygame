import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Press_Start_2P, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "The A11y Game",
  description: "A screen-reader-first graphic adventure game",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${pixelFont.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-black text-white font-[family-name:var(--font-pixel)]">
        {children}
      </body>
    </html>
  );
}
