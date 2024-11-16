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
  imageUrl='/PodcastFace.png'
}) => {
  return (
    <div className="w-80 bg-blue-950 rounded-lg p-6 my-10 relative">
      {/* Image */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2">
        <div className="w-24 h-24 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/30 z-10 rounded-full" />
          <img
            src={imageUrl}
            alt={`${title}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Content */}
      <div className="pt-16 pb-2 text-center space-y-5">
        <h2 className="text-white text-xl font-semibold">
          {title}
        </h2>
        <div className="space-y-1">
          <p className="text-gray-400 font-parisienne">
            by
          </p>
          <p className="text-white text-xl font-light font-parisienne">
            {author}
          </p>
        </div>
        <p className="text-gray-300 text-sm px-4 leading-relaxed">
          {description}
        </p>
        <button 
          onClick={() => window.location.href = '/podcast'}
          className="bg-cyan-500 text-white px-12 py-1 rounded-md hover:bg-white hover:text-black transition-all duration-300 mt-4"
        >
          Listen
        </button>
      </div>
    </div>
  );
};

export default PodcastCard;