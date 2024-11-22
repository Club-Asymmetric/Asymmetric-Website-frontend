'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TextItem {
  text: string;
  showLine?: boolean;
}

interface TypingHeaderProps {
  items: TextItem[];
  delay?: number;
  duration?: number;
  onClick?: (text: string) => void;
}

const TypingHeader: React.FC<TypingHeaderProps> = ({ 
  items, 
  delay = 500, 
  duration = 300, 
  onClick 
}) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-4 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * (delay / 1000), 
            duration: duration / 1000 
          }}
          onClick={() => onClick?.(item.text)}
        >
          <h2 className="p-2 text-3xl font-bold transition-all hover:scale-95 ease-in-out duration-300 border border-transparent hover:border-white rounded-full hover:animate-pulse">
            {item.text}
          </h2>
          {item.showLine && (
            <motion.div
              className="h-[1px] w-40 bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                delay: index * (delay / 1000) + duration / 1000, 
                duration: duration / 1000 
              }}
              style={{ transformOrigin: 'left' }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default TypingHeader;