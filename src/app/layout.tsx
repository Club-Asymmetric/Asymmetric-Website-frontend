import type { Metadata } from "next";
import localFont from "next/font/local";
import { Oswald, Outfit, ABeeZee, Parisienne, Metal } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlowyThing from "@/components/Glowything";
import CookieSweet from "@/components/CookieSweet";

//Configure the fonts
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

const aBeeZee = ABeeZee({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ABeeZee",
});

const parisienne = Parisienne({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-parisienne",
});

const metal = Metal({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-metal",
});

const imprintMTShadow = localFont({
  src: "./fonts/imprint-mt-shadow.ttf",
  variable: "--font-imprintMTShadow",
});

const nicoMoji = localFont({
  src: "./fonts/NicoMoji-Regular.ttf",
  variable: "--font-nicomoji",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Club Asymmetric",
  description: "A club for the weird and wonderful && Made by Linngeshwaran B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${outfit.variable} ${oswald.variable} ${aBeeZee.variable} ${nicoMoji.variable} ${parisienne.variable} ${metal.variable} ${imprintMTShadow.variable} ${geistSans.variable}`}>
      <head>

      </head>
      <body
        className={`antialiased min-h-screen flex flex-col relative font-outfit`}
      >
        <div className="flex flex-col flex-grow relative over">
            <div className="absolute inset-0 w-full pointer-events-none overflow-hidden" style={{ bottom: 'auto', height: '100%' }}>
              <GlowyThing color="#88D0D1" left="-25vw" top="-120vh"/>
              <GlowyThing color="#00FFFF" left="80vw" top="60vh"/>
              <GlowyThing color="#E0C585" left="-50vw" top="350vh"/>  
            </div>
          <Navbar />
          <main className="flex-grow flex-shrink-0 mb-10 relative z-10">
            {children}
          </main>
          <CookieSweet />
          <Footer />
        </div>
      </body>
    </html>
  );
}