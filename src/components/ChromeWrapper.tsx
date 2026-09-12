'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import HoverFooter from '@/components/HoverFooter';
import SideLogo from '@/components/SideLogo';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Fully standalone pages (own nav, own footer-less layout) opt out of all site chrome.
const BARE_ROUTES = ['/lithos'];
// Pages that bring their own top nav skip only the site Navbar, keeping the
// Footer/margins. The homepage's ScrollHero has no nav of its own, so it uses
// the normal site Navbar.
const OWN_NAV_ROUTES: string[] = [];

export default function ChromeWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const path = pathname ?? '';
  const bare = BARE_ROUTES.includes(path);
  const ownNav = OWN_NAV_ROUTES.includes(path);

  if (bare) {
    return (
      <main className="relative z-10">
        {children}
        <SpeedInsights />
      </main>
    );
  }

  return (
    <>
      {!ownNav && <Navbar />}
      <SideLogo />
      <main className="flex-grow flex-shrink-0 mb-10 relative z-10">
        {children}
        <SpeedInsights />
      </main>
      <HoverFooter />
    </>
  );
}
