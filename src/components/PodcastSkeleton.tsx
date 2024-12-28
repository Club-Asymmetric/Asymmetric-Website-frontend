import React from 'react';

const PodcastSkeleton = () => {
  return (
    <div className="w-full my-10 bg-gray-800 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 sm:gap-8 px-5 sm:px-8 py-6 sm:py-10 rounded-xl animate-pulse">
      <div className="flex justify-center lg:place-items-center mb-4 lg:mb-0">
        <div className="w-full sm:w-1/2 lg:w-full h-64 bg-gray-700 rounded-xl" />
      </div>
      <div className="flex flex-col gap-4 px-2 lg:px-10">
        <div className="h-8 bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-700 rounded w-1/2" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-700 rounded" />
          <div className="h-4 bg-gray-700 rounded w-5/6" />
        </div>
        <div className="flex gap-4">
          <div className="w-6 h-6 bg-gray-700 rounded" />
          <div className="w-6 h-6 bg-gray-700 rounded" />
          <div className="w-6 h-6 bg-gray-700 rounded" />
        </div>
        <div className="h-12 bg-gray-700 rounded w-full" />
      </div>
    </div>
  );
};

export default PodcastSkeleton;