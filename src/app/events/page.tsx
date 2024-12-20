'use client'
import React, { useState, useEffect } from 'react';
import Event from '@/components/Event';
import { motion } from 'framer-motion';

const Events = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupLocation, setPopupLocation] = useState({ x: 0, y: 0 });
  const [popupContent, setPopupContent] = useState<{
    desc: string;
    img: string;
    name: string;
    synopsis: string;
  }>({
    desc: "",
    img: "/placeholders/Events_Placeholder.png",
    name: "Title",
    synopsis: "synopsis"
  });
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  interface PopupContent {
    desc: string;
    img: string;
    name: string;
    synopsis: string;
  }

  interface PopupLocation {
    x: number;
    y: number;
  }

  const openPopup = (content: PopupContent, e: React.MouseEvent) => {
    setPopupLocation({ x: e.clientX, y: e.clientY });
    setPopupContent(content);
    setIsOpen(true);
  };

  const closePopup = () => setIsOpen(false);

  const handlePopupContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  function openRegistrationPage() {
    window.location.href="/events/registration-form"
  }

  const dataFromDB = {
    events: [
      {
        imageSrc: "/placeholders/Events_Placeholder.png",
        synopsis: "Event description goes here",
        name: "EVENT NAME GOES HERE",
        type: "Team",
        date: "Jan 24, 2025",
        desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam, si coactum est in alienum sensum omne quicquid est, ut non intellegamus, sic omne quod est in nostris sensibus, ut non videamus, nec audiamus, nec gustemus, nec concipiamus, sensibile est.",
        location: "CIT Chennai, Kundrathur"
      },
      {
        imageSrc: "/placeholders/Events_Placeholder.png",
        synopsis: "Birthday Party",
        name: "Hemanth Bday",
        type: "Individual",
        date: "Nov 21, 2024",
        desc: 'Birtday of hemanth who is a great person and a awesome Web developer with so much skills and is very brilliant, he is totally not sarcastically mean at all and is not a asshole',
        location: "Hemanth House"
      },
      {
        imageSrc: "/placeholders/Events_Placeholder.png",
        synopsis: "The day when the legend started",
        name: "Birth Date Of Legendary AK",
        type: "Individual/Team",
        date: "Dec 26, 2024",
        desc: 'The day when the legend AK was born, he is a great person and a awesome UI/UX designer with so much skills and is very brilliant, he also the legendary ak only found in cit chennai',
        location: "Akshay house"
      }
    ]
  };

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col bg-ass-gradient w-[80vw] pt-8 mt-8 rounded-[20px] animate-zoomIn">
          {dataFromDB.events.map((event, index) => (
            <Event
              key={index}
              imageSrc={event.imageSrc}
              synopsis={event.synopsis}
              name={event.name}
              type={event.type}
              date={event.date}
              desc={event.desc}
              location={event.location}
              openPopup={openPopup}
            />
          ))}
        </div>
      </div>

      {/* Popup */}
      {isOpen && (
        <motion.div 
          className="fixed bg-[#000000b8] flex justify-center items-center z-50 overflow-hidden" 
          style={{animationDuration: '1s', top: `${window.scrollY}px`, left: '0', width: window.innerWidth + "px", height: window.innerHeight + "px"}} 
          onClick={closePopup}
          // initial={{ opacity: 0 , scale: 0}}
          // animate={{ opacity: 1 , scale: 1}}
          // exit={{ opacity: 0 , scale: 0}}
        >
          <motion.div 
            className="relative flex flex-col lg:flex-row bg-gradient-to-br from-[rgb(23,25,63)] via-[rgba(25,27,68,1)] 
            to-[rgba(60,65,165,1)] w-[80%] max-h-[90vh] overflow-y-auto rounded-lg minimal-scrollbar"
            onClick={handlePopupContentClick}
            initial={{ opacity: 0 , scale: 0 , y:popupLocation.y-400  , x: popupLocation.x-800}}
            animate={{ opacity: 1 , scale: 1 , y: 0 , x: 0}}
            transition={{ duration: 0.7}}
          >
            <img 
              src={popupContent.img} 
              alt="Event" 
              className="xl:w-[35%] md:w-[50%] md:h-full object-cover place-self-center rounded-l-lg py-12 px-12" 
            />
            
            <div className="flex flex-col flex-1 py-12 pr-12 lg:ml-0 ml-8">
              <p className="text-2xl font-medium font-oswald leading-tight mb-3">
          {popupContent.synopsis}
              </p>
              <p className="text-5xl font-extrabold font-outfit mb-8">
          {popupContent.name}
              </p>
              <p className="text-white text-2xl font-normal font-outfit leading-7">
          {popupContent.desc}
              </p>
              <button 
          onClick={openRegistrationPage}
          className="px-20 py-2 bg-[#88d0d1]/80 rounded text-lg mt-8 mx-auto hover:scale-105 transition-transform ease-in-out duration-300 hover:bg-transparent hover:outline hover:outline-2"
              >
          Register
              </button>
            </div>
            
            <button 
              className="absolute top-4 right-4 text-white hover:scale-110 transition-transform duration-100 ease-linear p-4"
              onClick={closePopup}
              aria-label="Close popup"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Events;