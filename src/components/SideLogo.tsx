'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function SideLogo() {
  return (
    <Link
      href="/"
      aria-label="Club Asymmetric home"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 transition-transform duration-300 hover:scale-105 lg:block"
    >
      <div className="relative h-40 w-40 xl:h-52 xl:w-52 opacity-90 drop-shadow-[0_0_25px_rgba(59,108,255,0.35)]">
        <Image
          src="/logo/ass.png"
          alt="Club Asymmetric"
          fill
          className="object-contain"
        />
      </div>
    </Link>
  );
}
