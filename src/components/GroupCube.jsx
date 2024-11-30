'use client';

import React, { useState, useRef, useCallback, useMemo } from "react";
import Spline from "@splinetool/react-spline";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

const CONTENT_SECTIONS = [
  {
    id: 'random1',
    title: 'Our Team',
    description: 'A group of passionate individuals working together to create innovative solutions.',
    details: [
      'Creative Designers',
      'Technical Experts', 
      'Strategic Thinkers'
    ]
  },
  {
    id: 'random2',
    title: 'Our Mission',
    description: 'Empowering connections through innovative visual storytelling and technology.',
    details: [
      'Bridging creativity and technology',
      'Delivering unique visual experiences'
    ]
  },
  {
    id: 'random3',
    title: 'Our Journey',
    description: 'Founded in 2020, we\'ve been pushing the boundaries of design and innovation.',
    details: [
      '2020: Startup inception',
      '2022: First major project launch', 
      '2024: Expanding global reach'
    ]
  },
  {
    id: 'random4',
    title: 'Contact Us',
    description: 'Get in touch with our team!',
    details: [
      'Email: hello@groupphoto.com',
      'Phone: +1 (555) 123-4567',
      'Address: 123 Innovation Lane'
    ]
  }
];

export default function GroupCube() {
  const [activeSection, setActiveSection] = useState(null);
  const splineRef = useRef(null);

  const randomSections = useMemo(() => 
    CONTENT_SECTIONS.map(section => section.id), 
    []
  );

  const handleSplineEvent = useCallback(() => {
    const randomSection = randomSections[Math.floor(Math.random() * randomSections.length)];
    setActiveSection(prevSection => 
      prevSection === randomSection 
        ? null  // If same section clicked, reset
        : randomSection
    );
  }, [randomSections]);

  const contentVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: 50,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  const renderContent = () => {
    // If no active section, return default content
    if (!activeSection) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-blue-900/10 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">Group Photo</h2>
          <p className="text-white">Click on the Cube to explore more about us!</p>
          <p className="flex justify-between">Rotate the Cube <span className="text-transparent transition-all transform duration-300 hover:cursor-wait hover:text-white"><Link href='https://www.youtube.com/watch?v=BBJa32lCaaY' target='_blank' className="cursor-wait">You DUMB (Fake Cursor)</Link></span></p>
        </motion.div>
      );
    }

    // Find the active section's content
    const section = CONTENT_SECTIONS.find(s => s.id === activeSection);
    
    if (!section) return null;

    return (
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeSection}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="p-6 bg-blue-900/10 rounded-lg"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl font-bold mb-4 text-white"
          >
            {section.title}
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-white mb-4"
          >
            {section.description}
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="mt-4 space-y-2 text-white"
          >
            {section.details.map((detail, index) => (
              <motion.p 
                key={index}
                variants={itemVariants}
              >
                {detail}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4" // Remove mx-auto from container
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6 py-10">
        {/* Desktop Content */}
        <div className="hidden md:block w-1/2 text-white">
          {renderContent()}
        </div>
        {/* Mobile Content */}
        <div className="block md:hidden w-full text-white">
          {renderContent()}
        </div>
        
        {/* Spline Cube */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="max-w-[500px] w-full aspect-square">
            <Spline
              scene="/3d-models/scene.splinecode"
              onMouseDown={handleSplineEvent}
              ref={splineRef}
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}