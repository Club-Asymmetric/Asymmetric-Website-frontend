import React from 'react';

const LoadingSpinner = () => (
  <div className="space-y-16 min-h-screen w-full p-6">
    {/* AboutUs Section Loading */}
    <div className="flex items-center justify-center my-10 px-6 md:px-0 w-full">
      <div className="flex flex-col lg:flex-row items-center justify-center rounded-xl p-6 md:p-10 max-w-6xl bg-ass-gradient/50 w-full gap-6 lg:gap-10">
        <div className="flex-1 text-center lg:text-left lg:ml-10 w-full">
          <div className="h-10 bg-gray-700 rounded-lg w-3/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-11/12"></div>
            <div className="h-4 bg-gray-700 rounded w-10/12"></div>
            <div className="h-4 bg-gray-700 rounded w-11/12"></div>
          </div>
          <div className="mt-6 h-8 bg-gray-700 rounded w-32"></div>
        </div>
        <div className="hidden lg:block">
          <div className="w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    </div>

    {/* Events Section Loading */}
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col bg-ass-gradient/50 max-w-6xl mx-8 sm:w-[80vw] pt-8 mt-8 rounded-[20px] animate-pulse">
        {[1, 2].map((item) => (
          <div key={item} className="flex flex-col md:flex-row p-8 gap-8 border-b border-gray-700 last:border-b-0">
            <div className="xl:w-[35%] md:w-[40%] sm:w-[50%] w-full h-64 bg-gray-700 rounded-lg"></div>
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-700 rounded w-3/4"></div>
              <div className="h-6 bg-gray-700 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-11/12"></div>
                <div className="h-4 bg-gray-700 rounded w-10/12"></div>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="h-6 bg-gray-700 rounded w-24"></div>
                <div className="h-6 bg-gray-700 rounded w-32"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Podcasts Section Loading */}
    <div className="container mx-auto xl:px-40 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {[1, 2, 3].map((item, index) => (
          <div
            key={item}
            className={`
              w-full max-w-sm bg-ass-gradient/50 rounded-xl p-6
              ${index === 0 ? 'block' : 'hidden lg:block'} 
              ${index === 1 ? 'hidden md:block' : ''} 
              ${index === 2 ? 'hidden lg:block' : ''}
            `}
          >
            <div className="flex flex-col items-center space-y-6">
              <div className="w-32 h-32 bg-gray-700 rounded-full"></div>
              <div className="w-full space-y-4">
                <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-11/12 mx-auto"></div>
                <div className="h-4 bg-gray-700 rounded w-10/12 mx-auto"></div>
              </div>
              <div className="w-full mt-4">
                <div className="h-10 bg-gray-700 rounded-lg w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default LoadingSpinner;