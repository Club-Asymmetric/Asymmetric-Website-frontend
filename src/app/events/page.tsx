'use client'
import React, { useState, useEffect } from 'react';
import Event from '@/components/Event';

const Events = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [popupContent, setPopupContent] = useState<{
    desc: string;
    img: string;
    name: string;
    synopsis: string;
  }>({
    desc: "",
    img: "/Events_Placeholder.png",
    name: "Title",
    synopsis: "synopsis"
  });

  // Save scroll position and lock scroll when popup opens
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    }
  }, [isOpen, scrollPosition]);

  const openPopup = (content: { desc: string; img: string; name: string; synopsis: string }) => {
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
        imageSrc: "/Events_Placeholder.png",
        synopsis: "Event description goes here",
        name: "EVENT NAME GOES HERE",
        type: "Team",
        date: "Jan 24, 2025",
        desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam, si coactum est in alienum sensum omne quicquid est, ut non intellegamus, sic omne quod est in nostris sensibus, ut non videamus, nec audiamus, nec gustemus, nec concipiamus, sensibile est.",
        location: "CIT Chennai, Kundrathur"
      },
      {
        imageSrc: "/Events_Placeholder.png",
        synopsis: "Birthday Party",
        name: "Hemanth Bday",
        type: "Individual",
        date: "Nov 21, 2024",
        desc: 'Birtday of hemanth who is a great person and a awesome Web developer with so much skills and is very brilliant, he is totally not sarcastically mean at all and is not a asshole',
        location: "Hemanth House"
      },
      {
        imageSrc: "/Events_Placeholder.png",
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
        <div className="flex flex-col items-start justify-center w-[80%] mb-16 ml-1">
          <h1 className="font-outfit text-4xl font-bold animate-fadeIn">Events</h1>
        </div>
        <div className="flex flex-col bg-gradient-to-br from-[rgb(23,25,63)] via-[rgba(25,27,68,0.5)] to-[rgba(60,65,165,0.7)] w-[80%] pt-8 rounded-[20px] animate-zoomIn">
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
        <div 
          className="fixed inset-0 w-full h-full bg-[#000000b8] flex justify-center items-center z-50 animate-fadeIn" 
          style={{animationDuration: '1s'}} 
          onClick={closePopup}
        >
          <div 
            className="relative flex flex-row bg-gradient-to-br animate-zoomIn from-[rgb(23,25,63)] via-[rgba(25,27,68,1)] to-[rgba(60,65,165,1)] w-[80%] max-h-[90vh] overflow-y-auto rounded-lg"
            onClick={handlePopupContentClick}
          >
            <img 
              src={popupContent.img} 
              alt="Event" 
              className="w-[35%] object-cover rounded-l-lg py-12 px-12" 
            />
            
            <div className="flex flex-col flex-1 py-12 pr-12">
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
          </div>
        </div>
      )}
    </>
  );
};

export default Events;