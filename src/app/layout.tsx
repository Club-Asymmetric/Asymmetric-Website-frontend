import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlowyThing from "@/components/Glowything";

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
  description: "A club for the weird and wonderful.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative`}
      >
        <div className="flex flex-col flex-grow relative over">
            <div className="absolute inset-0 w-full pointer-events-none overflow-hidden" style={{ bottom: 'auto', height: '100%' }}>
              <GlowyThing color="#88D0D1" left="-25vw" top="-120vh"/>
              <GlowyThing color="#6F6F9A" left="80vw" top="60vh"/>
              <GlowyThing color="#E0C585" left="-35vw" top="350vh"/>  
            </div>
          <Navbar />
          <main className="flex-grow flex-shrink-0 mt-36 mb-10 relative z-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}