import React, { useState, useEffect, useCallback } from 'react';

interface ColorTextProps {
  text: string;
  interval?: number;
}

const ColorText = ({ text, interval = 100 }: ColorTextProps) => {
  const colors = ['#FFFFFF', '#FF0000', '#00FF00', '#0000FF']; // White, Red, Green, Blue [SUGGEST A GOOD COLOR SCHEME]
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(-1);
  const [colorIndices, setColorIndices] = useState<number[]>(new Array(text.length).fill(0));
  const [isHovering, setIsHovering] = useState(false);

  const updateColors = useCallback(() => {
    if (isHovering) {
      setCurrentCharIndex(prev => {
        const nextIndex = prev + 1;
        if (nextIndex >= text.length) {
          return 0;
        }
        return nextIndex;
      });

      setColorIndices(prev => {
        const newIndices = [...prev];
        if (currentCharIndex >= 0 && currentCharIndex < text.length) {
          newIndices[currentCharIndex] = (newIndices[currentCharIndex] + 1) % colors.length;
        }
        return newIndices;
      });
    }
  }, [isHovering, text.length, currentCharIndex]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isHovering) {
      intervalId = setInterval(updateColors, interval);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHovering, interval, updateColors]);

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCurrentCharIndex(-1);
    setColorIndices(new Array(text.length).fill(0));
  };

  return (
    <div 
      className="inline-block cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      {text.split('').map((char, index) => (
        <span 
          key={index}
          className="transition-colors duration-300"
          style={{ color: colors[colorIndices[index]] }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default ColorText;