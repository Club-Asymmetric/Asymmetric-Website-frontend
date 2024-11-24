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
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 w-full px-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: index * (delay / 1000), 
            duration: duration / 1000 
          }}
          onClick={() => onClick?.(item.text)}
        >
          <h2 className="p-2 text-xl md:text-2xl font-bold transition-all hover:scale-95 ease-in-out duration-300 border border-transparent hover:border-white rounded-full hover:animate-pulse text-center w-fit md:w-auto">
            {item.text}
          </h2>
          {item.showLine && (
            <motion.div
              className="h-[1px] w-20 md:w-40 bg-white hidden md:block"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                delay: index * (delay / 1000) + duration / 1000, 
                duration: duration / 1000 
              }}
              style={{ transformOrigin: 'left' }}
            />
          )}
          {item.showLine && index < items.length - 1 && (
            <motion.div
              className="w-[1px] h-8 bg-white block md:hidden"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ 
                delay: index * (delay / 1000) + duration / 1000, 
                duration: duration / 1000 
              }}
              style={{ transformOrigin: 'top' }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default TypingHeader;