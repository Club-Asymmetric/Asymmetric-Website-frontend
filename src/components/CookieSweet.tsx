'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCookie, FaCheck, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

const CookieSweet: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  useEffect(() => {
    const funCookie = localStorage.getItem('funCookie');
    const funCookieDeclined = localStorage.getItem('funCookie-declined');
    const expirationTime = localStorage.getItem('funCookie-expiration');

    if (funCookie) {
      if (expirationTime && Date.now() > parseInt(expirationTime)) {
        // Remove expired consent
        localStorage.removeItem('funCookie');
        localStorage.removeItem('funCookie-expiration');
      } else {
        return;
      }
    }

    if (funCookieDeclined) {
      if (expirationTime && Date.now() > parseInt(expirationTime)) {
        // Remove expired declined state
        localStorage.removeItem('funCookie-declined');
        localStorage.removeItem('funCookie-expiration');
      } else {
        return;
      }
    }

    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptCookies = () => {
    // Set expiration to 5 minutes
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 5);

    localStorage.setItem('funCookie', 'true');
    localStorage.setItem('funCookie-expiration', expirationDate.getTime().toString());
    
    setIsAccepted(true);
    
    // Hide the banner after a short animation
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  const handleDeclineCookies = () => {
    // Set expiration to 5 minutes for declined state
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 5);

    localStorage.setItem('funCookie-declined', 'true');
    localStorage.setItem('funCookie-expiration', expirationDate.getTime().toString());

    setIsDeclined(true);
    
    // Hide the banner after a short animation
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="sticky bottom-5 z-50 px-4"
      >
        <div className="bg-gradient-to-tr backdrop-blur-md bg-blue-950/70 via-blue-950/70 to-blue-900/70 shadow-lg w-5/6 mx-auto rounded-3xl p-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center w-full sm:w-auto justify-center">
            <FaCookie className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 hover:animate-pulse" />
          </div>
          
          <div className="flex-grow text-center sm:text-left w-full sm:w-auto">
            <h3 className="font-bold text-base sm:text-lg mb-1">
              <span className='hover:text-pink-500 transition-all transform duration-300'>
                <Link href='https://youtu.be/Kyol_PgSVfM' target='_blank'>Mmm...</Link>
              </span> Cookies We Love it!
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 px-2 sm:px-0">
              We use cookies to make your experience sweeter. Care for a bite? Trust us bro we are not spying you and selling your data.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto items-center">
            <button 
              onClick={handleDeclineCookies}
              className={`w-full sm:w-auto px-4 py-2 rounded-md transition-all duration-300 flex items-center justify-center ${
                isDeclined 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-300 text-gray-800 hover:bg-black hover:text-gray-300'
              }`}
            >  
              {isDeclined ? <FaTimes className="mr-2" /> : null}
              {isDeclined ? 'Fuck You!' : 'Decline'}
            </button>
            <button 
              onClick={handleAcceptCookies}
              className={`w-full sm:w-auto px-4 py-2 rounded-md transition-all duration-300 flex items-center justify-center ${
                isAccepted 
                  ? 'bg-green-500 text-white' 
                  : 'bg-cyan-500 hover:bg-cyan-600 hover:text-white text-black'
              }`}
            >
              {isAccepted ? <FaCheck className="mr-2" /> : null}
              {isAccepted ? 'Love You!' : 'Accept'}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieSweet;