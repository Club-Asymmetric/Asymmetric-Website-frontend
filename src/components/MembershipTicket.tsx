import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const NEON = '#39ff14';

// Grainy noise texture as a tiny inline SVG data URI (no external asset).
const GRAIN =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>";

export default function MembershipTicket() {
  return (
    <Link
      href="/member-application"
      className="group relative mx-auto flex w-full max-w-3xl select-none overflow-hidden border-2 bg-black transition-transform duration-300 hover:-translate-y-1"
      style={{
        borderColor: NEON,
        clipPath:
          'polygon(28px 0, calc(100% - 28px) 0, 100% 28px, 100% calc(100% - 28px), calc(100% - 28px) 100%, 28px 100%, 0 calc(100% - 28px), 0 28px)',
        boxShadow: `0 0 0 1px rgba(57,255,20,0.15), 0 30px 80px -20px rgba(57,255,20,0.25)`,
      }}
      aria-label="Become a Member"
    >
      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN}")`, backgroundSize: '160px 160px' }}
      />

      {/* abstract flowing shapes */}
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: NEON, opacity: 0.16 }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full blur-3xl opacity-[0.08]"
        style={{ background: '#ffffff' }}
      />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]"
        preserveAspectRatio="none"
        viewBox="0 0 600 220"
        fill="none"
      >
        <path
          d="M-20 180C120 220 180 40 320 70C420 92 460 200 620 150"
          stroke={NEON}
          strokeWidth="1.5"
        />
        <path
          d="M-20 40C140 -10 200 150 360 110C460 86 500 10 620 40"
          stroke="#ffffff"
          strokeWidth="1"
        />
      </svg>

      {/* main body */}
      <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-9 md:p-10">
        <div>
          <p className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-white">
            CLUB ASYMMETRIC
          </p>
          <p className="mt-1 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-zinc-500">
            CHENNAI INSTITUTE OF TECHNOLOGY
          </p>
        </div>

        <h2 className="my-8 font-oswald text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl">
          <span className="block text-white">BECOME</span>
          <span className="block" style={{ color: NEON }}>
            A MEMBER
          </span>
        </h2>

        <p className="font-mono text-xs tracking-[0.3em] text-zinc-400 sm:text-sm">
          BUILD <span style={{ color: NEON }}>•</span> BREAK <span style={{ color: NEON }}>•</span> INNOVATE
        </p>
      </div>

      {/* perforated divider with ticket notches */}
      <div className="relative w-0 border-l-2 border-dashed" style={{ borderColor: 'rgba(57,255,20,0.45)' }}>
        <span
          className="absolute -top-4 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-black"
          style={{ boxShadow: `0 0 0 2px ${NEON}` }}
        />
        <span
          className="absolute -bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-black"
          style={{ boxShadow: `0 0 0 2px ${NEON}` }}
        />
      </div>

      {/* stub */}
      <div className="relative flex w-20 flex-shrink-0 flex-col items-center justify-between gap-4 py-8 sm:w-24">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full border transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          style={{ borderColor: NEON, color: NEON }}
        >
          <ArrowUpRight size={18} />
        </span>
        <span
          className="font-oswald text-lg font-bold uppercase tracking-[0.3em] text-white"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          JOIN US
        </span>
      </div>
    </Link>
  );
}
