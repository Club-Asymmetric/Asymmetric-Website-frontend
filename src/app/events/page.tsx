'use client'
import React, { useState, useEffect } from 'react';
import Event from '@/components/Event';
import FilteredEventsGallery from '@/components/FilteredEventsGallery';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { EventLoading } from '@/components/MemberLoading';

interface EventData {
  id: string;
  name: string;
  participants: number;
  date: string;
  registration_start: string;
  location: string;
  min_team_size: number;
  max_team_size: number;
  description: string;
  synopsis: string;
  photos: string[];
}

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

const Events = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupLocation, setPopupLocation] = useState({ x: 0, y: 0 });
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading , setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
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

  const localhost = process.env.NEXT_PUBLIC_LOCALHOST;

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const api = axios.create({
          baseURL: `${localhost}/api`,
        });
        const response = await api.get('/events');
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data =  await response.data;
        const eventsArray = Object.values(data) as EventData[];
        setEvents(eventsArray);
        console.log(eventsArray);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }finally{
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);
  if(loading) return <EventLoading />
  return (
    <div className="relative">
      {/* Filter Toggle Button - Mobile Responsive Fixed Position */}
      <motion.button
        onClick={() => setShowFilter(!showFilter)}
        className={`fixed top-28 lg:top-32 xl:top-36
          right-4 sm:right-6 md:right-10 lg:right-16 xl:right-20 
          z-50 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 
          rounded-full font-medium transition-all duration-300 backdrop-blur-md border 
          text-sm sm:text-base ${
          showFilter 
            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-500 shadow-lg shadow-blue-500/25' 
            : 'bg-black/60 text-white border-gray-700 hover:border-blue-500 hover:bg-black/80'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <motion.div
            animate={{ rotate: showFilter ? 0 : 45 }}
            transition={{ duration: 0.3 }}
            className="text-xs sm:text-sm"
          >
            {showFilter ? '✕' : '⊞'}
          </motion.div>
          <span className="hidden sm:inline">
            {showFilter ? 'List View' : 'Gallery View'}
          </span>
          <span className="sm:hidden">
            {showFilter ? 'List' : 'Gallery'}
          </span>
        </div>
      </motion.button>

      {/* Main Content with Smooth Transitions */}
      <AnimatePresence mode="wait">
        {showFilter ? (
          <motion.div
            key="filtered-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <FilteredEventsGallery events={events} localhost={localhost || ''} />
          </motion.div>
        ) : (
          <motion.div
            key="list-view"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <>
              <div className="flex flex-col items-center w-full">
                <div className="flex flex-col bg-ass-gradient max-w-full mx-8 sm:w-[80vw] pt-8 mt-8 rounded-[20px] animate-zoomIn">
                  {events.length > 0 ? (
                    events.map((event) => (
                      <Event
                        imageSrc={`${localhost}/images/are/not/here/${event.photos[0]}` || "/placeholders/Events_Placeholder.png"}
                        key={event.id}
                        desc={event.description}
                        synopsis={event.synopsis}
                        name={event.name}
                        type={event.min_team_size === 1 ? (event.max_team_size === 1 ? "Individual" : "Individual/Team") : "Team"}
                        date={event.date.slice(0,10)}
                        location={event.location}
                        openPopup={openPopup}
                      />
                    ))
                  ) : (
                    <div className="text-center py-10">No Events available.</div>
                  )
                  }
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
                    to-[rgba(60,65,165,1)] w-[80%] max-h-[90vh] min-h-[50vh] overflow-y-auto rounded-lg minimal-scrollbar "
                    onClick={handlePopupContentClick}
                    initial={{ opacity: 0 , scale: 0 , y:popupLocation.y-400  , x: popupLocation.x-800}}
                    animate={{ opacity: 1 , scale: 1 , y: 0 , x: 0}}
                    transition={{ duration: 0.7}}
                  >
                    <img 
                      src={popupContent.img} 
                      alt="Event" 
                      className="xl:w-[35%] md:w-[40%] sm:w-[50%] w-[20rem] md:h-full object-cover place-self-center py-4 px-12 rounded-[80px]" 
                    />
                    
                    <div className="flex flex-col flex-1 pr-12 mb-10 mt-7 lg:ml-0 ml-8 place-self-center justify-between">
                      <p className="lg:text-2xl md:text-xl text-lg font-medium font-oswald leading-tight mb-3">
                  {popupContent.synopsis}
                      </p>
                      <p className="lg:text-4xl md:text-3xl text-2xl font-extrabold font-outfit mb-8">
                  {popupContent.name}
                      </p>
                      <p className="text-white lg:text-2xl md:text-xl text-lg font-normal font-outfit leading-7">
                  {popupContent.desc}
                      </p>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;