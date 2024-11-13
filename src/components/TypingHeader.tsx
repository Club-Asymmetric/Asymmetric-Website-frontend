import React, { useEffect, useState } from 'react';

interface TextItem {
  text: string;
  showLine?: boolean;
}

interface TypingHeaderProps {
  items: TextItem[];
  delay?: number;
  duration?: number;
}

const TypingHeader: React.FC<TypingHeaderProps> = ({ 
  items, 
  delay = 300, // Delay between each item in ms
  duration = 200 // Animation duration in ms (faster fade)
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    setIsVisible(true);
    
    const timer = setInterval(() => {
      setCurrentStep(prev => prev < items.length ? prev + 1 : prev);
    }, delay);
    
    return () => clearInterval(timer);
  }, [items.length, delay]);

  return (
      <div className={`flex flex-row items-center justify-center gap-2 transition-opacity duration-200
        ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {items.map((item, index) => (
          <div 
            key={index}
            className={`flex items-center gap-4 transition-opacity`}
            style={{
              transitionDuration: `${duration}ms`,
              opacity: currentStep >= index + 1 ? 1 : 0
            }}
          >
            <h2 className={`p-2 text-3xl font-bold cursor-pointer transition-all hover:scale-95 ease-in-out duration-300 border border-transparent hover:border-white rounded-full hover:animate-pulse`}>
              {item.text}
            </h2>
            {item.showLine && (
              <div className="h-[1px] w-40 bg-white"></div>
            )}
          </div>
        ))}
      </div>
  );
};

export default TypingHeader;