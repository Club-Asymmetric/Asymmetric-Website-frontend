import Image from 'next/image';
import Link from 'next/link';
import { FaMicrophone } from 'react-icons/fa';

interface PodcastData {
  id: string;
  name: string;
  guests: string[];
  description: string;
  image: string;
}

const PodcastCard: React.FC<PodcastData> = ({ name, guests, description, image }) => {
  return (
    <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-7 shadow-[0_0_0_rgba(59,108,255,0)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#3b6cff]/50 hover:shadow-[0_12px_40px_-12px_rgba(59,108,255,0.35)]">
      <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#3b6cff] to-cyan-400 transition-transform duration-500 group-hover:scale-x-100" />

      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full border border-white/10 ring-2 ring-transparent transition-all duration-300 group-hover:ring-[#3b6cff]/40">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div>
          <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            <FaMicrophone className="h-2.5 w-2.5" />
            by
          </p>
          <p className="text-base sm:text-lg font-medium text-white">{guests.join(', ')}</p>
        </div>
      </div>

      <h2 className="mt-6 line-clamp-2 text-lg sm:text-xl font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-[#3b6cff]">
        {name}
      </h2>

      <p className="mt-3 flex-1 line-clamp-5 text-xs sm:text-sm leading-relaxed text-white/55">
        {description}
      </p>

      <div className="mt-6 h-px w-full bg-white/10" />
      <Link
        href="/podcast"
        className="group/link mt-4 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-widest text-white transition-colors duration-300 hover:text-[#3b6cff]"
      >
        Listen
        <span className="transition-transform duration-300 group-hover/link:translate-x-1">↗</span>
      </Link>
    </div>
  );
};

export default PodcastCard;
