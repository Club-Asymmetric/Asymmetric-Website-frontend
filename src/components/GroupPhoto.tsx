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
    image: '/group-photo/AndroidEspion.png',
    title: 'Android Espion Workshop',
    description:
      'An interactive workshop where participants explored the intricacies of Android security, ethical hacking, and app vulnerabilities, gaining hands-on experience in mobile cybersecurity.',
  },
  {
    id: 2,
    image: '/group-photo/CatapultProgram.png',
    title: 'Pitching Session',
    description:
      'An exciting platform where aspiring entrepreneurs pitched their innovative ideas, received expert feedback, and refined their business strategies for real-world impact.',
  },
  {
    id: 3,
    image: '/group-photo/CatapultProgram2.png',
    title: 'Catapult Program',
    description:
      'A mentorship-driven program designed to accelerate tech-driven ideas, providing guidance, resources, and networking opportunities to aspiring developers and entrepreneurs.',
  },
  {
    id: 4,
    image: '/group-photo/CatapultProgram3.png',
    title: 'Trinity Trios',
    description:
      'A thrilling team-based competition where participants put their problem-solving, coding, and strategic thinking skills to the test in a high-energy environment.',
  },
  {
    id: 5,
    image: '/group-photo/FirstMeet.png',
    title: "The Beginning: Club's First Meetup",
    description:
      'A historic moment marking the foundation of Asymmetric Club, bringing together like-minded tech enthusiasts eager to build a strong and innovative community.',
  },
  {
    id: 6,
    image: '/group-photo/JuniorMeet.png',
    title: 'Welcoming the Juniors',
    description:
      'An engaging introduction session where seniors guided juniors through the club’s vision, fostering mentorship and collaboration in tech-driven initiatives.',
  },
  {
    id: 7,
    image: '/group-photo/OnamEthnic.png',
    title: 'Onam Special',
    description:
      'A vibrant celebration of culture and tradition, where members came together to enjoy the festive spirit, strengthening bonds beyond the realm of technology.',
  },
  {
    id: 8,
    image: '/group-photo/ShootingVideo.png',
    title: 'Behind the Scenes: Content Creation',
    description:
      'A fun-filled day of brainstorming, scripting, and filming as the club worked on promotional videos, showcasing creativity and teamwork at its best.',
  },
  {
    id: 9,
    image: '/group-photo/HappyJK.png',
    title: 'Life at Asymmetric',
    description:
      'More than just a club—it’s a family! From late-night coding sessions to exciting events, Asymmetric Club provides an unforgettable experience filled with learning, laughter, and growth.',
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
            //or change to object-cover or cover-fill
            className="object-contain rounded-xl"
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