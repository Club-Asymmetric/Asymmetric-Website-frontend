
import React from 'react';

interface PodcastCardProps {
  title: string;
  author: string;
  description: string;
  imageUrl?: string;
}

const PodcastCard: React.FC<PodcastCardProps> = ({
  title,
  author,
  description,
  imageUrl = '/PodcastFace.png',
}) => {
  return (
    <div className="w-full max-w-[320px] bg-ass-gradient rounded-2xl p-4 sm:p-6 my-8 md:my-10 relative">
      {/* Image */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/30 z-10 rounded-full" />
          <img
            src={imageUrl}
            alt={`${title}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Content */}
      <div className="pt-12 md:pt-16 pb-2 text-center space-y-3 md:space-y-5">
        <h2 className="text-white text-base sm:text-lg md:text-xl font-semibold">
          {title}
        </h2>
        <div className="space-y-1">
          <p className="text-gray-400 font-parisienne text-sm sm:text-base">by</p>
          <p className="text-white text-base sm:text-lg md:text-xl font-light font-parisienne">
            {author}
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
