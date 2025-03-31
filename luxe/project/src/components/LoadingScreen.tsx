import React, { useState, useEffect } from 'react';
import { Crown } from 'lucide-react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <Crown className="h-16 w-16 text-[#C6A45C] mx-auto mb-4 animate-pulse" />
        <div className="h-1 w-48 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-[#C6A45C] animate-loading-progress" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;