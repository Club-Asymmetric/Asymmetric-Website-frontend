const LoadingSpinner = () => (
    <div className="min-h-screen flex flex-col gap-8 animate-pulse p-6">
      {/* AboutUs Section Loading */}
      <div className="flex flex-col lg:flex-row items-center justify-center rounded-xl p-6 md:p-10 max-w-6xl bg-ass-gradient/50 mx-auto w-full gap-6">
        <div className="flex-1 w-full">
          <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
        <div className="hidden lg:block w-96 h-64 bg-gray-700 rounded-lg"></div>
      </div>
  
      {/* Events Section Loading */}
      <div className="max-w-6xl w-full mx-auto rounded-xl bg-blue-950/50 p-6">
        <div className="space-y-6">
          {[1, 2].map((item) => (
            <div key={item} className="flex flex-col md:flex-row gap-4 p-4 bg-gray-800/50 rounded-lg">
              <div className="w-full md:w-64 h-48 bg-gray-700 rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
  
      {/* Podcasts Section Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[1, 2, 3].map((item) => (
          <div key={item} className="w-full max-w-[320px] bg-ass-gradient/50 rounded-2xl p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-gray-700 rounded-full"></div>
              <div className="space-y-3 w-full">
                <div className="h-5 bg-gray-700 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6 mx-auto"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
export default LoadingSpinner;