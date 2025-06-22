import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
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
  useEffect(() => {
    // Add keyboard navigation for better UX
    const handleKeyDown = (e: KeyboardEvent) => {
      const sections = document.querySelectorAll('.snap-section');
      const currentSection = Array.from(sections).findIndex((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });

      let targetIndex = currentSection;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        targetIndex = Math.min(currentSection + 1, sections.length - 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        targetIndex = Math.max(currentSection - 1, 0);
      }

      if (targetIndex !== currentSection && targetIndex >= 0) {
        sections[targetIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="snap-container">
      {sectionsData.map((section, index) => (
        <div
          key={section.id}
          className="snap-section"
          id={`section-${index}`}
        >
          <SectionContent
            section={section}
            index={index}
          />
        </div>
      ))}
    </div>
  );
};

interface SectionContentProps {
  section: SectionData;
  index: number;
}

const SectionContent: React.FC<SectionContentProps> = ({
  section,
  index,
}) => {
  return (
    <motion.div
      className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-8 h-full"
      initial={{ opacity: 0, y: 50 }}
      // FUCKED FIX USING `whileInView` instead of actual positioning
      whileInView={{ opacity: 1, y: -50 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Image Container */}
      <motion.div
        className={`w-full lg:w-1/2 h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] relative mb-4 sm:mb-6 lg:mb-0 ${
          index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
        }`}
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <Image
          src={section.image}
          alt={section.title}
          fill
          className="object-contain rounded-xl"
          priority={index === 0}
        />
      </motion.div>

      {/* Content Container */}
      <motion.div
        className={`w-full lg:w-1/2 p-2 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-center ${
          index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
        }`}
        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-center lg:text-left"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {section.title}
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed text-center lg:text-left"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {section.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default GroupPhoto;