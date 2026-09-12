import Image from 'next/image';
import Link from 'next/link';

interface PodcastData {
  id: string;
  name: string;
  guests: string[];
  description: string;
  image: string;
}

const PodcastCard: React.FC<PodcastData> = ({ name, guests, description, image }) => {
  return (
    <div className="flex h-full w-full max-w-[340px] flex-col border border-white/10 bg-[#080809] p-6 sm:p-7 transition-colors duration-300 hover:border-[#3b6cff]/50">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full border border-white/10">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">by</p>
          <p className="font-parisienne text-lg sm:text-xl text-white">{guests.join(', ')}</p>
        </div>
      </div>

      <h2 className="mt-6 line-clamp-2 text-lg sm:text-xl font-semibold leading-snug text-white">
        {name}
      </h2>

      <p className="mt-3 flex-1 line-clamp-5 text-xs sm:text-sm leading-relaxed text-white/55">
        {description}
      </p>

      <div className="mt-6 h-px w-full bg-white/10" />
      <Link
        href="/podcast"
        className="group mt-4 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-widest text-white transition-colors duration-300 hover:text-[#3b6cff]"
      >
        Listen
        <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
      </Link>
    </div>
  );
};

export default PodcastCard;
