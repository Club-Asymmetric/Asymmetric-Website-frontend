'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Custom404: FC = () => {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  
  const messages = [
    "You seem to be lost in the digital void...",
    "Welcome to the realm of the unknown",
    "What brings you to this mysterious corner?",
    "You've ventured too far into cyberspace",
    "This page has vanished into thin air"
  ];

  const headings = [
    { text: "404", showLine: true },
    { text: "Not", showLine: true },
    { text: "Found" }
  ];

  const calculateCoordinates = (x: number, y: number) => {
    const lat = (y / window.innerHeight) * 180 - 90;
    const long = (x / window.innerWidth) * 360 - 180;
    return {
      latitude: lat.toFixed(6),
      longitude: long.toFixed(6)
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(messageInterval);
    };
  }, []);

  const startCountdown = () => {
    setCountdown(5);
  };

  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown === 0) {
      setShowFinalMessage(true);
      // Redirect after showing the message for 2 seconds
      setTimeout(() => {
        router.push('/');
      }, 2000);
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => prev !== null ? prev - 1 : null);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, router]);

  const coordinates = calculateCoordinates(mousePosition.x, mousePosition.y);

  return (
    <div className="min-h-screen my-10 w-[85%] mx-auto rounded-3xl px-4 py-8 md:px-8 bg-gradient-to-br from-blue-950 via-blue-950 to-blue-900 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="w-full h-screen flex flex-col items-center justify-center relative">
        <motion.div 
          className="absolute top-4 right-4 text-white/70 text-sm font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div>LATITUDE: {coordinates.latitude}°</div>
          <div>LONGITUDE: {coordinates.longitude}°</div>
        </motion.div>

        <div className="space-y-8 md:space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 w-full px-4">
            {headings.map((item, index) => (
              <motion.div
                key={`heading-${index}`}
                className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.5,
                  duration: 0.3
                }}
              >
                <h2 className="p-2 text-4xl md:text-6xl font-bold text-white transition-all hover:scale-95 ease-in-out duration-300 border border-transparent hover:border-white rounded-full hover:animate-pulse text-center w-fit md:w-auto">
                  {item.text}
                </h2>
                {item.showLine && (
                  <motion.div
                    className="h-[1px] w-20 md:w-40 bg-white hidden md:block"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ 
                      delay: index * 0.5 + 0.3,
                      duration: 0.3
                    }}
                    style={{ transformOrigin: 'left' }}
                  />
                )}
                {item.showLine && index < headings.length - 1 && (
                  <motion.div
                    className="w-[1px] h-8 bg-white block md:hidden"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ 
                      delay: index * 0.5 + 0.3,
                      duration: 0.3
                    }}
                    style={{ transformOrigin: 'top' }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          <div className="h-20">
            <AnimatePresence mode="wait">
              <motion.p
                key={`message-${currentMessageIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl text-white text-center px-4"
              >
                {messages[currentMessageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {!countdown && !showFinalMessage && (
              <motion.div
                key="preparing"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ 
                  opacity: 0,
                  scale: 0,
                  rotate: 360,
                  filter: "blur(10px)"
                }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <button
                  onClick={startCountdown}
                  className="group relative px-6 py-3 text-white transition-all duration-300"
                >
                  <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-blue-700 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-blue-900 border-2 border-white group-hover:bg-gray-300"></span>
                  <span className="relative text-white group-hover:text-black">
                    Enter Reality...or
                  </span>
                </button>
              </motion.div>
            )}

            {countdown !== null && !showFinalMessage && (
              <motion.div
                key="countdown"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-4xl font-bold text-white text-center"
              >
                {countdown}
              </motion.div>
            )}

            {showFinalMessage && (
              <motion.div
                key="final-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-red-500 text-center"
              >
                You will be entering reality...
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Custom404;