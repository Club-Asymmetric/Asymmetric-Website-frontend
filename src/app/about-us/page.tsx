'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ColorText from "@/components/ColorText";
import TypingHeader from "@/components/TypingHeader";

const contentData = {
  Vision: {
    subtitle: "Empowering Innovation Through Vision",
    content: "Our vision is to revolutionize the way organizations approach development and collaboration. We see a future where technology seamlessly integrates with human creativity, breaking down barriers and enabling teams to achieve unprecedented levels of productivity and innovation. By providing cutting-edge tools and frameworks, we aim to transform complex challenges into opportunities for growth and breakthrough solutions."
  },
  Mission: {
    subtitle: "Driving Collaborative Excellence",
    content: "Our mission is to equip teams with powerful, intuitive tools that streamline development processes and enhance collaborative potential. We are committed to creating flexible, adaptable solutions that empower developers, designers, and innovators to work more efficiently, communicate more effectively, and bring their most ambitious ideas to life. Through our template and support, we enable organizations to build robust, scalable applications that stand out in today's competitive landscape."
  },
  Asymmetric: {
    subtitle: "Redefining Technological Boundaries",
    content: "The asymmetric approach represents our unique methodology of tackling complex problems from multiple angles. We believe in breaking traditional development paradigms by offering solutions that are not just functional, but transformative. Our asymmetric strategy involves creating flexible, modular systems that can adapt to diverse challenges, ensuring that your technological infrastructure remains agile, resilient, and always ahead of the curve."
  }
};

export default function AboutUs() {
  const [activeSection, setActiveSection] = useState<keyof typeof contentData>('Vision');

  const heading: { text: keyof typeof contentData; showLine?: boolean }[] = [
    { text: "Vision", showLine: true },
    { text: "Mission", showLine: true },
    { text: "Asymmetric" }
  ];

  const handleSectionChange = (text: string) => {
    setActiveSection(text as keyof typeof contentData);
  };

  const currentContent = contentData[activeSection];

  return (
    <div className="min-h-fit w-[95%] lg:w-[85%] mx-auto px-4 py-8 md:px-8 space-y-12">
      <div className="font-bold text-2xl sm:text-3xl md:text-4xl flex justify-start mb-6 sm:mb-8">
        <h1 className="hover:animate-pulse hover:scale-95 cursor-pointer transition-all duration-300 text-center text-white">
          About Us
        </h1>
      </div>
      <div>
      <section className="w-full sm:max-w-[80vw] mx-auto bg-ass-gradient text-white p-4 sm:p-8 md:p-12 lg:p-16 rounded-xl sm:rounded-2xl">
        <div className="w-full max-w-6xl mx-auto">
          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            {/* Clickable Typing Header */}
            <TypingHeader 
              items={heading.map(item => ({
                ...item,
                text: item.text,
                active: item.text === activeSection
              }))} 
              delay={500} 
              duration={300} 
              onClick={handleSectionChange}
            />

            {/* Subtitle */}
            <AnimatePresence mode='wait'>
              <motion.div 
                key={currentContent.subtitle}
                className="text-lg sm:text-xl font-nicoMoji text-center px-2 sm:px-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <ColorText text={currentContent.subtitle} interval={100} />
              </motion.div>
            </AnimatePresence>

            {/* Animated Main Content */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto text-sm sm:text-base md:text-lg text-white leading-relaxed text-center px-2 sm:px-4"
              >
                {currentContent.content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}