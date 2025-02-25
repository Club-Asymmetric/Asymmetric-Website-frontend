'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ColorText from "@/components/ColorText";
import TypingHeader from "@/components/TypingHeader";

const contentData = {
  Vision: {
    subtitle: "Innovating Fearlessly, Securing the Future",
    content: "To combine human creativity with technology and reach new heights of innovation while safeguarding the digital world. The club aims to strengthen excellence in emerging fields like cybersecurity and AI/ML, empowering students to become skilled and forward-thinking leaders in the tech industry."
  },
  Mission: {
    subtitle: "Building a Stronger Tech Community",
    content: "The club's mission is to unite a team of tech-minded people, empower them with cyber, AI/ML knowledge, and transform emerging cyber challenges into opportunities."
  },
  Asymmetric: {
    subtitle: "Unleashing Potential, One Innovation at a Time",
    content: "Asymmetric Club is a technical community founded by students of the 2027 batch. We endeavour to build a team dedicated to organising workshops, hackathons, webinars, and technical events, creating projects and hosting competitions. We provide a supportive space for learning and personal growth.\n\nOur goal is to empower ourselves in the fields such as cybersecurity and AI/ML and to share this knowledge with others. That is to be aware and raise awareness. \n\nWhether a seasoned tech enthusiast or just starting, Asymmetric Club offers versatile plans to help everyone and support them to enhance their technical skills. \n(Sorry, the content is repeated `LAZY CONTENT TEAM`)"
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
    <div className="min-h-fit w-[95%] lg:w-[85%] mx-auto px-4 py-9 md:px-8 space-y-12">
      <div>
      <section className="w-full sm:max-w-[80vw] mx-auto bg-ass-gradient text-white p-8 sm:p-8 md:p-12 lg:p-16 rounded-2xl sm:rounded-2xl">
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
                style={{ whiteSpace: "pre-line" }}
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