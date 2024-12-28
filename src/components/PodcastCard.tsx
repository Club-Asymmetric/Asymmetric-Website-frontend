import Image from 'next/image';

interface PodcastData {
  id: string;
  name: string;
  guests: string[];
  description: string;
  image: string;
  mime: string;
}

const PodcastCard: React.FC<PodcastData> = ({ name, guests, description, image }) => {
  const localhost = process.env.NEXT_PUBLIC_LOCALHOST;

  return (
    <div className="w-full max-w-[320px] bg-ass-gradient rounded-2xl p-4 sm:p-6 relative">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden relative">
          <Image
            src={`${localhost}/images/are/not/here/${image}`}
            alt={name}
            width={96}
            height={96}
            className="w-full h-full object-fill"
          />
        </div>
      </div>
      <div className="pt-12 md:pt-16 pb-2 text-center space-y-3 md:space-y-5">
        <h2 className="text-white text-base sm:text-lg md:text-xl font-semibold">
          {name}
        </h2>
        <div className="space-y-1">
          <p className="text-gray-400 font-parisienne text-sm sm:text-base">by</p>
          <p className="text-white text-base sm:text-lg md:text-xl font-light font-parisienne">
            {guests.join(', ')}
          </p>
        </div>
        <p className="text-gray-300 text-xs sm:text-sm px-2 md:px-4 leading-relaxed">
          {description}
        </p>
        <button
          onClick={() => window.location.href = '/podcast'}
          className="bg-ass-button text-white px-4 sm:px-8 md:px-12 py-1 rounded-md hover:bg-white hover:text-black transition-all duration-300 mt-4"
        >
          Listen
        </button>
      </div>
    </div>
  );
};

export default PodcastCard;