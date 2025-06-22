'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import GroupPhoto from "@/components/GroupPhoto";
import FilteredGallery from "@/components/FilteredGallery";

const Page = () => {
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    // Hide scrollbar when component mounts
    document.body.classList.add('hide-scrollbar');
    
    // Remove the class when component unmounts
    return () => {
      document.body.classList.remove('hide-scrollbar');
    };
  }, []);
  return (
    <div className="relative">      {/* Filter Toggle Button - Mobile Responsive Fixed Position */}
      <motion.button
        onClick={() => setShowFilter(!showFilter)}
        className={`fixed top-20 sm:top-24 md:top-28 lg:top-32 xl:top-36 
          right-4 sm:right-6 md:right-10 lg:right-16 xl:right-20 
          z-50 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 
          rounded-full font-medium transition-all duration-300 backdrop-blur-md border 
          text-sm sm:text-base ${
          showFilter 
            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-500 shadow-lg shadow-blue-500/25' 
            : 'bg-black/60 text-white border-gray-700 hover:border-blue-500 hover:bg-black/80'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <motion.div
            animate={{ rotate: showFilter ? 0 : 45 }}
            transition={{ duration: 0.3 }}
            className="text-xs sm:text-sm"
          >
            {showFilter ? '✕' : '✕'}
          </motion.div>
          <span className="hidden sm:inline">
            {showFilter ? 'Close Filter' : 'Filter View'}
          </span>
          <span className="sm:hidden">
            {showFilter ? 'Close' : 'Filter'}
          </span>
        </div>
      </motion.button>

      {/* Main Content with Smooth Transitions */}
      <AnimatePresence mode="wait">
        {showFilter ? (
          <motion.div
            key="filtered-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <FilteredGallery />
          </motion.div>
        ) : (
          <motion.div
            key="scroll-view"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <GroupPhoto />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;