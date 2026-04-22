import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Press_Start_2P, Inclusive_Sans } from "next/font/google";
import "./globals.css";

const inclusiveFont = Inclusive_Sans({
  weight: "400",
  variable: "--font-inclusive",
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
    <html lang="en" suppressHydrationWarning className={`${inclusiveFont.variable} ${pixelFont.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-black text-white font-pixel">
        {children}
      </body>
    </html>
  );
}
