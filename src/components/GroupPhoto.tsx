import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

interface SectionData {
  id: number;
  image: string;
  title: string;
  description: string;
}

const sectionsData: SectionData[] = [
  {
    id: 1,
    image: '/group-photo/AndroidEspion.jpg',
    title: 'First Section Title',
    description:
      'Detailed description for the first section goes here. This can be multiple lines of engaging content about your topic.',
  },
  {
    id: 2,
    image: '/group-photo/CatapultProgram.jpg',
    title: 'Second Section Title',
    description:
      'Another detailed description for the second section. Provide compelling information that captures the reader’s attention.',
  },
  {
    id: 3,
    image: '/group-photo/CatapultProgram2.jpg',
    title: 'Third Section Title',
    description:
      'A third section with its own unique description. Continue to provide valuable and interesting content.',
  },
  {
    id: 4,
    image: '/group-photo/CatapultProgram3.jpg',
    title: 'Fourth Section Title',
    description:
      'A fourth section with its own unique description. Continue to provide valuable and interesting content.',
  },
  {
    id: 5,
    image: '/group-photo/FirstMeet.jpg',
    title: 'Fifth Section Title',
    description:
      'Detailed description for the fifth section goes here. This can be multiple lines of engaging content about your topic.',
  },
  {
    id: 6,
    image: '/group-photo/JuniorMeet.jpg',
    title: 'Sixth Section Title',
    description:
      'Another detailed description for the sixth section. Provide compelling information that captures the reader’s attention.',
  },
  {
    id: 7,
    image: '/group-photo/OnamEthnic.jpg',
    title: 'Seventh Section Title',
    description:
      'Another detailed description for the seventh section. Provide compelling information that captures the reader’s attention.',
  },
  {
    id: 8,
    image: '/group-photo/ShootingVideo.jpg',
    title: 'Eighth Section Title',
    description:
      'Another detailed description for the eighth section. Provide compelling information that captures the reader’s attention.',
  },
  {
    id: 9,
    image: '/group-photo/HappyJK.jpg',
    title: 'Ninth Section Title',
    description:
      'Another detailed description for the ninth section. Provide compelling information that captures the reader’s attention.',
  }
];

const GroupPhoto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    //Change the Height for Longer or Smaller Scroll
    <div ref={containerRef} className="h-[600vh] w-full relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {sectionsData.map((section, index) => (
          <SectionContent
            key={section.id}
            section={section}
            index={index}
            scrollProgress={scrollYProgress}
            totalSections={sectionsData.length}
          />
        ))}
      </div>
    </div>
  );
};

interface SectionContentProps {
  section: SectionData;
  index: number;
  scrollProgress: any;
  totalSections: number;
}

const SectionContent: React.FC<SectionContentProps> = ({
  section,
  index,
  scrollProgress,
  totalSections,
}) => {
  const sectionStart = index / totalSections;
  const sectionEnd = (index + 1) / totalSections;
  const delayOffset = 0.05; // Add a delay for smoother transition between sections

  // Smooth progress for animations
  const animationProgress = useSpring(
    useTransform(
      scrollProgress,
      [sectionStart - delayOffset, sectionStart, sectionEnd - delayOffset, sectionEnd],
      [0, 1, 1, 0]
    ),
    { stiffness: 120, damping: 20 }
  );

  const xOffset = useSpring(
    useTransform(
      scrollProgress,
      [sectionStart - delayOffset, sectionStart, sectionEnd - delayOffset, sectionEnd],
      [index % 2 === 0 ? -150 : 150, 0, 0, index % 2 === 0 ? 150 : -150]
    ),
    { stiffness: 150, damping: 25 }
  );

  const scale = useSpring(
    useTransform(
      scrollProgress,
      [sectionStart, (sectionStart + sectionEnd) / 2, sectionEnd],
      [0.95, 1, 0.9]
    ),
    { stiffness: 200, damping: 25 }
  );

  const zIndex = useTransform(
    scrollProgress,
    [sectionStart - delayOffset, sectionStart, sectionEnd],
    [-1, 10, -1]
  );

  return (
    //CHECK THE TOP PROPERTY BECAUSE INSET IS BETTER || top-[60px] md:inset-0 
    <motion.div
    className="absolute inset-0 flex flex-col md:flex-row items-center justify-center"
    style={{
        opacity: animationProgress,
        scale,
        zIndex: zIndex.get() > 0 ? 10 : 1,
    }}
    >
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
        {/* Image Container */}

        <motion.div
        className={`w-full md:w-1/2 h-[300px] md:h-[600px] relative ${
            index % 2 === 0 ? 'md:order-1' : 'md:order-2'
        }`}
        style={{
            x: xOffset,
        }}
        >
        <Image
            src={section.image}
            alt={section.title}
            fill
            //or change to object-cover
            className="object-contain rounded-lg"
            priority={index === 0}
        />
        </motion.div>

        {/* Content Container */}
        <motion.div
        className={`w-full md:w-1/2 p-4 md:p-8 ${
            index % 2 === 0 ? 'md:order-2' : 'md:order-1'
        }`}
        style={{
            x: xOffset,
        }}
        >
        <motion.h2
            className="text-xl md:text-3xl font-bold mb-4"
            style={{
            opacity: animationProgress,
            }}
        >
            {section.title}
        </motion.h2>
        <motion.p
            className="text-base md:text-lg text-gray-700"
            style={{
            opacity: animationProgress,
            }}
        >
            {section.description}
        </motion.p>
        </motion.div>
    </div>
    </motion.div>
  );
};

export default GroupPhoto;