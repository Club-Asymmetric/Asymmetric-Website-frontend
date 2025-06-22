'use client';

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface SectionData {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
}

const sectionsData: SectionData[] = [
  {
    id: 1,
    image: '/group-photo/AndroidEspion.png',
    title: 'Android Espion Workshop',
    description: 'An interactive workshop where participants explored the intricacies of Android security, ethical hacking, and app vulnerabilities, gaining hands-on experience in mobile cybersecurity.',
    category: 'Workshop'
  },
  {
    id: 2,
    image: '/group-photo/CatapultProgram.png',
    title: 'Pitching Session',
    description: 'An exciting platform where aspiring entrepreneurs pitched their innovative ideas, received expert feedback, and refined their business strategies for real-world impact.',
    category: 'Competition'
  },
  {
    id: 3,
    image: '/group-photo/CatapultProgram2.png',
    title: 'Catapult Program',
    description: 'A mentorship-driven program designed to accelerate tech-driven ideas, providing guidance, resources, and networking opportunities to aspiring developers and entrepreneurs.',
    category: 'Program'
  },
  {
    id: 4,
    image: '/group-photo/CatapultProgram3.png',
    title: 'Trinity Trios',
    description: 'A thrilling team-based competition where participants put their problem-solving, coding, and strategic thinking skills to the test in a high-energy environment.',
    category: 'Competition'
  },
  {
    id: 5,
    image: '/group-photo/FirstMeet.png',
    title: "The Beginning: Club's First Meetup",
    description: 'A historic moment marking the foundation of Asymmetric Club, bringing together like-minded tech enthusiasts eager to build a strong and innovative community.',
    category: 'Milestone'
  },
  {
    id: 6,
    image: '/group-photo/JuniorMeet.png',
    title: 'Welcoming the Juniors',
    description: "An engaging introduction session where seniors guided juniors through the club's vision, fostering mentorship and collaboration in tech-driven initiatives.",
    category: 'Event'
  },
  {
    id: 7,
    image: '/group-photo/OnamEthnic.png',
    title: 'Onam Special',
    description: 'A vibrant celebration of culture and tradition, where members came together to enjoy the festive spirit, strengthening bonds beyond the realm of technology.',
    category: 'Celebration'
  },
  {
    id: 8,
    image: '/group-photo/ShootingVideo.png',
    title: 'Behind the Scenes: Content Creation',
    description: 'A fun-filled day of brainstorming, scripting, and filming as the club worked on promotional videos, showcasing creativity and teamwork at its best.',
    category: 'Creative'
  },
  {
    id: 9,
    image: '/group-photo/HappyJK.png',
    title: 'Life at Asymmetric',
    description: "More than just a club—it's a family! From late-night coding sessions to exciting events, Asymmetric Club provides an unforgettable experience filled with learning, laughter, and growth.",
    category: 'Culture'
  }
];

const FilteredGallery: React.FC = () => {  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<SectionData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Simple overflow control like in events page
  React.useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  const categories = ['All', ...Array.from(new Set(sectionsData.map(item => item.category)))];
  
  const filteredSections = selectedCategory === 'All' 
    ? sectionsData 
    : sectionsData.filter(section => section.category === selectedCategory);

  return (
    <div className="min-h-screen bg-transparent text-white overflow-x-hidden w-full">
      {/* Category Filter */}
      <div className="sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredSections.map((section, index) => (
              <motion.div
                key={section.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(section)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500 transition-all duration-300">
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">                    <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-sm rounded-full text-xs font-medium">
                      {section.category}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-200">
                      {section.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3 group-hover:text-gray-300 transition-colors duration-200 mb-4">
                      {section.description}
                    </p>
                    
                    {/* View More Button */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 transform hover:scale-105">
                        <span>View More</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                    {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal for enlarged image */}
      <AnimatePresence>
        {selectedImage && (          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 md:p-6"
            style={{
              top: `${typeof window !== 'undefined' ? window.scrollY : 0}px`,
              left: '0',
              width: typeof window !== 'undefined' ? window.innerWidth + "px" : '100vw',
              height: typeof window !== 'undefined' ? window.innerHeight + "px" : '100vh'
            }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden border border-gray-700 flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-shrink-0 h-48 sm:h-64 md:h-80 lg:h-96">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-colors duration-200 z-10 backdrop-blur-sm"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-4 md:p-6 lg:p-8 overflow-y-auto flex-1">                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
                    {selectedImage.category}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-blue-400">
                  {selectedImage.title}
                </h2>
                <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilteredGallery;