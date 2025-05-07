import React from 'react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...' }) => {
  // Always use "Loading..." regardless of the message passed
  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Yalla<span className="text-yalla-green">Fit</span>
        </div>
        <div className="mt-4 relative">
          <div className="h-1 w-48 bg-yalla-dark-gray rounded-full overflow-hidden">
            <div className="h-full bg-yalla-green animate-pulse rounded-full"></div>
          </div>
        </div>
        <p className="mt-4 text-white text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
