'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { HiLocationMarker, HiUsers } from 'react-icons/hi';

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
  photos: string[];
}

interface FilteredEventsGalleryProps {
  events: EventData[];
  localhost: string;
}

const FilteredEventsGallery: React.FC<FilteredEventsGalleryProps> = ({ events, localhost }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  
  // Simple overflow control like in events page
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEvent]);

  // Determine event categories based on team size
  const getEventCategory = (event: EventData) => {
    if (event.min_team_size === 1 && event.max_team_size === 1) {
      return 'Individual';
    } else if (event.min_team_size === 1) {
      return 'Individual/Team';
    } else {
      return 'Team';
    }
  };

  // Get unique categories from events
  const categories = ['All', ...Array.from(new Set(events.map(event => getEventCategory(event))))];
  
  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(event => getEventCategory(event) === selectedCategory);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-transparent text-white overflow-x-hidden w-full">      
      {/* Category Filter */}
      <div className="sticky top-20 my-10 lg:top-0 lg:my-0 z-40">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          layout
        >
          <AnimatePresence>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500 transition-all duration-300">
                  {/* Category Badge */}
                  <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 z-10">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-600/80 backdrop-blur-sm rounded-full text-xs font-medium">
                      {getEventCategory(event)}
                    </span>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 z-10">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-600/80 backdrop-blur-sm rounded-full text-xs font-medium">
                      {event.date.slice(0, 10)}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <Image
                      src={event.photos[0] ? `${localhost}/images/are/not/here/${event.photos[0]}` : "/placeholders/Events_Placeholder.png"}
                      alt={event.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 md:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                      {event.name}
                    </h3>                    
                    <div className="flex items-center gap-3 text-gray-500 text-xs mb-3 sm:mb-4">
                      <div className="flex items-center gap-1">
                        <HiLocationMarker className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HiUsers className="w-3 h-3" />
                        <span>{event.participants} participants</span>
                      </div>
                    </div>
                    
                    {/* View More Button */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs sm:text-sm font-medium rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 transform hover:scale-105">
                        <span>View Details</span>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Events Message */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 text-lg mb-4">No events found in this category</div>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
            >
              Show All Events
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal for event details */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] p-2 sm:p-4 md:p-6"
            style={{
              top: `${typeof window !== 'undefined' ? window.scrollY : 0}px`,
              left: '0',
              width: typeof window !== 'undefined' ? window.innerWidth + "px" : '100vw',
              height: typeof window !== 'undefined' ? window.innerHeight + "px" : '100vh'
            }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-700 flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-shrink-0 h-40 sm:h-48 md:h-64 lg:h-80 xl:h-96">
                <Image
                  src={`${localhost}/images/are/not/here/${selectedEvent.photos[0]}` || "/placeholders/Events_Placeholder.png"}
                  alt={selectedEvent.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-colors duration-200 z-10 backdrop-blur-sm text-sm sm:text-base"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto flex-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-600 rounded-full text-xs sm:text-sm font-medium">
                    {getEventCategory(selectedEvent)}
                  </span>
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-600 rounded-full text-xs sm:text-sm font-medium">
                    {formatDate(selectedEvent.date)}
                  </span>
                </div>
                
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-blue-400">
                  {selectedEvent.name}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <div className="text-gray-400 mb-1">Location</div>
                    <div className="text-white">{selectedEvent.location}</div>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <div className="text-gray-400 mb-1">Participants</div>
                    <div className="text-white">{selectedEvent.participants}</div>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <div className="text-gray-400 mb-1">Team Size</div>
                    <div className="text-white">
                      {selectedEvent.min_team_size === selectedEvent.max_team_size 
                        ? selectedEvent.min_team_size 
                        : `${selectedEvent.min_team_size}-${selectedEvent.max_team_size}`}
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <div className="text-gray-400 mb-1">Registration Opens</div>
                    <div className="text-white">{formatDate(selectedEvent.registration_start)}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-cyan-400">Description</h3>
                  <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilteredEventsGallery;
