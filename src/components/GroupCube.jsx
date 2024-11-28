'use client';

import React, { useState, useRef, useCallback, useMemo } from "react";
import Spline from "@splinetool/react-spline";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const splineRef = useRef(null);

  const randomSections = useMemo(() => 
    CONTENT_SECTIONS.map(section => section.id), 
    []
  );

  const handleSplineEvent = useCallback(() => {
    const randomSection = randomSections[Math.floor(Math.random() * randomSections.length)];
    setActiveSection(randomSection);
    
    // On mobile, open modal when cube is clicked
    if (window.innerWidth < 768) {
      setIsModalOpen(true);
    }
  }, [randomSections]);

  const renderContent = useMemo(() => {
    // If no active section, return default content
    if (!activeSection) {
      return (
        <div className="p-6 bg-blue-900/10 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Group Photo</h2>
          <p className="text-white">Click on the cube to explore more about us!</p>
        </div>
      );
    }

    // Find the active section's content
    const section = CONTENT_SECTIONS.find(s => s.id === activeSection);
    
    if (!section) return null;

    return (
      <div className="p-6 bg-blue-900/10 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">{section.title}</h2>
        <p className="text-white">{section.description}</p>
        <div className="mt-4 space-y-2 text-white">
          {section.details.map((detail, index) => (
            <p key={index}>{detail}</p>
          ))}
        </div>
      </div>
    );
  }, [activeSection]);

  const renderModal = () => {
    if (!isModalOpen || !activeSection) return null;

    const section = CONTENT_SECTIONS.find(s => s.id === activeSection);
    
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        onClick={() => setIsModalOpen(false)}
      >
        <div 
          className="bg-blue-950/90 rounded-lg p-6 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-4 text-white">{section?.title}</h2>
          <p className="text-white mb-4">{section?.description}</p>
          <div className="space-y-2 text-white">
            {section?.details.map((detail, index) => (
              <p key={index}>{detail}</p>
            ))}
          </div>
          <button 
            className="mt-4 w-full bg-white/20 text-white py-2 rounded hover:bg-white/30 transition"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6 py-10">
        {/* Desktop Content */}
        <div className="hidden md:block w-1/2 text-white">
          {renderContent}
        </div>
        
        {/* Spline Cube */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="max-w-[500px] w-full aspect-square">
            <Spline
              scene="./scene.splinecode"
              onMouseDown={handleSplineEvent}
              ref={splineRef}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile Modal */}
      {renderModal()}
    </div>
  );
}