import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
// import ConditionalBackground from "../components/ConditionalBackground";
import ThreeBackground from "../components/ThreeBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "GenZ-inspired personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <ConditionalBackground /> */}
        <ThreeBackground />
        <PageTransition />
        <Navbar />
        <main className="page-transition-element">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
