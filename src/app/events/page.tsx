'use client';

import React, { useState, useEffect } from 'react';
import Event from '@/components/Event';
import { motion, AnimatePresence } from 'framer-motion';
import { events as staticEvents } from '@/data/events';
import { EventLoading } from '@/components/MemberLoading';
import { IoCalendarOutline, IoCloseOutline } from 'react-icons/io5';
import { RiMapPinLine } from 'react-icons/ri';

interface EventData {
  id: string;
  name: string;
  participants: number;
  date: string;
  registration_start: Date;
  location: string;
  min_team_size: number;
  max_team_size: number;
  description: string;
  photos: string[];
  category?: string;
  synopsis?: string;
}

const CATEGORIES = ["ALL", "TECH", "WORKSHOP", "HACKATHON", "TALK", "COMPETITION", "CULTURE"];

const Events = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);
  const [popupContent, setPopupContent] = useState<{
    desc: string;
    img: string;
    name: string;
    synopsis: string;
    location: string;
    date: string;
    type: string;
  }>({
    desc: "",
    img: "/placeholders/Events_Placeholder.png",
    name: "",
    synopsis: "",
    location: "",
    date: "",
    type: ""
  });

  useEffect(() => {
    const eventsArray = (Object.values(staticEvents) as EventData[]).map((event) => ({
      ...event,
      category: event.category || (event.name.toUpperCase().includes("WORKSHOP") ? "WORKSHOP" : "TECH"),
      synopsis: event.synopsis || event.description.split('.')[0] + '.',
    }));
    setEvents(eventsArray);
    setLoading(false);
  }, []);

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
      const prevent = (e: TouchEvent) => e.preventDefault();
      window.addEventListener('touchmove', prevent, { passive: false });
      (window as any).__modalPreventTouch = prevent;
    } else {
      document.body.style.overflow = '';
      const prevent = (window as any).__modalPreventTouch as (e: TouchEvent)=>void;
      if (prevent) window.removeEventListener('touchmove', prevent);
      delete (window as any).__modalPreventTouch;
    }
  }, [isOpen]);

  const openPopup = (content: { desc: string; img: string; name: string; synopsis: string; location: string; date: string; type: string }) => {
    setPopupContent(content);
    setIsOpen(true);
  };

  const closePopup = () => setIsOpen(false);

  function openRegistrationPage() {
    window.location.href = "/events/registration-form";
  }

  const filteredEvents = activeCategory === "ALL"
    ? events
    : events.filter(e => (e.category || "TECH").toUpperCase() === activeCategory);

  if (loading) return <EventLoading />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-outfit selection:bg-[#ccff00] selection:text-black overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative pt-8 pb-20 px-4 md:px-12 max-w-7xl mx-auto border-b border-zinc-800">

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4 mb-12 text-xs font-mono tracking-widest text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-[#ccff00] rounded-full animate-ping"></span>
            <span className="text-[#ccff00] font-bold">THINGS WE MAKE HAPPEN.</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>WORKSHOPS / HACKATHONS / TALKS / COMPETITIONS / CULTURE</span>
          </div>
          <div>[ SEASON 2025–2026 ]</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block bg-[#ccff00] text-black font-mono font-bold text-xs px-3 py-1 uppercase tracking-widest -rotate-1">
              ★ ASYMMETRIC EVENT ARCHIVE
            </div>

            <h1 className="text-7xl sm:text-8xl md:text-9xl xl:text-[10rem] font-black font-oswald uppercase leading-none tracking-tight">
              EVENTS<span className="text-[#ccff00]">.</span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-300 font-light max-w-xl leading-relaxed border-l-2 border-[#ccff00] pl-4">
              We host open hack nights, technical deep dives, underground art jams, and campus-wide competitions. Zero fluff. 100% build culture.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('featured-event');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#ccff00] text-black font-oswald text-lg font-bold uppercase px-6 py-3 hover:bg-white hover:scale-105 transition-all border border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] flex items-center gap-2"
              >
                <span>EXPLORE NEXT UP</span>
                <span>↘</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative mx-auto max-w-md">

              <div className="absolute inset-0 bg-[#ccff00] translate-x-4 translate-y-4 -rotate-3 opacity-90"></div>

              <div className="relative bg-zinc-900 border-2 border-zinc-700 p-3 shadow-2xl rotate-2 transition-transform hover:rotate-0 duration-300">
                <div className="overflow-hidden border border-zinc-800 relative group">
                  <img
                    src="/group-photo/CatapultProgram3.jpg"
                    alt="Asymmetric Event"
                    className="w-full h-80 sm:h-96 object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/90 text-[#ccff00] font-mono text-[10px] px-2 py-1 border border-zinc-700">
                    LIVE ARCHIVE // 2025
                  </div>
                  <div className="absolute bottom-3 right-3 text-[#ccff00] text-2xl font-bold">
                    *
                  </div>
                </div>

                <div className="pt-3 flex justify-between items-center text-xs font-mono text-zinc-400">
                  <span className="italic font-parisienne text-xl text-zinc-200">More Than Just Events.</span>
                  <span className="text-[#ccff00] font-bold">LIVE STAGE ↗</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-black border border-[#ccff00] text-[#ccff00] font-mono text-xs px-4 py-2 -rotate-6 shadow-xl">
                GOOD PEOPLE. BETTER NIGHTS.
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FEATURED / UPCOMING EVENT ("NEXT UP") */}
      <section id="featured-event" className="py-24 px-4 md:px-12 bg-[#eae8e1] text-black border-b-2 border-black relative">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-12 font-mono text-xs font-bold tracking-widest text-black/70">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-black"></span>
              <span className="text-base text-black bg-[#ccff00] px-2 py-0.5 border border-black">[ FEATURED HEADLINE ]</span>
            </div>
            <div>NEXT UP // 2025</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7 space-y-6">

              <div className="flex items-center gap-4 font-mono text-xs font-bold text-black/70">
                <span className="bg-black text-[#ccff00] px-3 py-1">OCT 12, 2025</span>
                <span>MAIN AUDITORIUM, CAMPUS</span>
                <span className="text-black font-extrabold">• CULTURE / MUSIC / ART</span>
              </div>

              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black font-oswald uppercase leading-none tracking-tight">
                ASYMMETRIC<br />
                <span className="bg-black text-white px-3 py-1 inline-block -rotate-1 my-2">AFTER DARK</span>
              </h2>

              <p className="font-parisienne text-2xl text-zinc-800">
                Music · Art · Games · People · Pure Unfiltered Energy
              </p>

              <p className="text-base md:text-lg text-zinc-800 font-light leading-relaxed max-w-xl border-l-2 border-black pl-4">
                A high-octane night of creative hacking, audio-visual experiments, live demos, and unexpected collaborations. Join us as campus transforms into a playground of sound, light, and code.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={openRegistrationPage}
                  className="bg-[#ccff00] text-black font-oswald text-xl font-bold uppercase px-8 py-4 hover:bg-black hover:text-white transition-all border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                >
                  <span>GET YOUR SPOT</span>
                  <span className="text-2xl">↗</span>
                </button>

                <button
                  onClick={() => openPopup({
                    name: "ASYMMETRIC AFTER DARK",
                    synopsis: "Music · Art · Games · People",
                    desc: "A high-octane night of creative hacking, audio-visual experiments, live demos, and unexpected collaborations. Join us as campus transforms into a playground of sound, light, and code.",
                    img: "/group-photo/CatapultProgram3.jpg",
                    location: "Main Auditorium, Campus",
                    date: "2025-10-12",
                    type: "CULTURE"
                  })}
                  className="bg-black text-white font-mono text-sm px-6 py-4 hover:bg-[#ccff00] hover:text-black transition-all border border-black"
                >
                  VIEW FULL POSTER DETAILS ↗
                </button>
              </div>

            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">

                <div className="border-2 border-black bg-white p-3 shadow-xl -rotate-2 hover:rotate-0 transition-transform">
                  <img
                    src="/group-photo/CatapultProgram3.jpg"
                    alt="Featured Event 1"
                    className="w-full h-64 object-cover grayscale contrast-125"
                  />
                  <div className="pt-2 text-xs font-mono font-bold flex justify-between">
                    <span>STAGE A // LIVE DEMOS</span>
                    <span>OCT 12 ↗</span>
                  </div>
                </div>

                <div className="border-2 border-black bg-[#0a0a0a] text-white p-3 shadow-2xl rotate-3 hover:rotate-0 transition-transform -mt-12 ml-8 relative z-10">
                  <img
                    src="/group-photo/OnamEthnic.jpg"
                    alt="Featured Event 2"
                    className="w-full h-56 object-cover grayscale contrast-125"
                  />
                  <div className="pt-2 text-xs font-mono font-bold text-[#ccff00] flex justify-between">
                    <span>INTERACTIVE JAM</span>
                    <span>NIGHT STAGE</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* EVENT ARCHIVE */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-6 mb-12 gap-4">
          <div>
            <div className="font-mono text-xs text-[#ccff00] tracking-widest uppercase mb-2">
              {"// COMPLETE CATALOGUE"}
            </div>
            <h2 className="text-5xl sm:text-6xl font-black font-oswald uppercase tracking-tight">
              EVENT <span className="text-[#ccff00]">ARCHIVE</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 max-w-xs">
            SELECT A CATEGORY TO FILTER PAST &amp; UPCOMING SESSIONS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-16 border-b border-zinc-800 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-xs font-bold px-4 py-2.5 transition-all border ${
                activeCategory === cat
                  ? "bg-[#ccff00] text-black border-[#ccff00] shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] scale-105"
                  : "bg-zinc-900/80 text-zinc-300 border-zinc-700 hover:border-[#ccff00] hover:text-white"
              }`}
            >
              [ {cat} ]
            </button>
          ))}
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-start">
            {filteredEvents.map((event, idx) => (
              <Event
                key={event.id || idx}
                index={idx}
                imageSrc={
                  event.photos && event.photos[0]
                    ? (event.photos[0].startsWith("/") ? event.photos[0] : `/images/${event.photos[0]}`)
                    : "/placeholders/Events_Placeholder.png"
                }
                desc={event.description}
                synopsis={event.synopsis || ""}
                name={event.name}
                type={event.category || (event.min_team_size === 1 ? (event.max_team_size === 1 ? "Individual" : "Individual/Team") : "Team")}
                date={event.date.slice(0, 10)}
                location={event.location}
                openPopup={openPopup}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-zinc-800 p-12">
            <div className="font-mono text-lg text-[#ccff00] mb-2">[ NO EVENTS FOUND ]</div>
            <p className="text-zinc-400 font-mono text-xs">NO SESSIONS CURRENTLY MATCH THIS CATEGORY FILTER.</p>
          </div>
        )}

      </section>

      {/* EDITORIAL EVENT DETAIL MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-50 p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
          >
            <motion.div
              className="relative bg-[#eae8e1] text-black w-full max-w-4xl max-h-[90vh] overflow-y-auto border-4 border-black p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(204,255,0,1)] my-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 bg-black text-white hover:bg-[#ccff00] hover:text-black p-2 transition-colors border border-black font-mono font-bold flex items-center gap-1"
                aria-label="Close modal"
              >
                <IoCloseOutline className="w-6 h-6" />
                <span className="text-xs hidden sm:inline">CLOSE [ESC]</span>
              </button>

              <div className="border-b-2 border-black pb-4 mb-6 pr-12">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold text-black/70 mb-2">
                  <span className="bg-black text-[#ccff00] px-2 py-0.5">
                    {"// " + (popupContent.type ? popupContent.type.toUpperCase() : "EVENT")}
                  </span>
                  <span className="flex items-center gap-1">
                    <IoCalendarOutline className="w-4 h-4" />
                    {popupContent.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <RiMapPinLine className="w-4 h-4" />
                    {popupContent.location}
                  </span>
                </div>

                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-oswald uppercase leading-none tracking-tight">
                  {popupContent.name}
                </h2>

                <p className="font-parisienne text-2xl text-zinc-800 pt-2">
                  &quot;{popupContent.synopsis}&quot;
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                <div className="md:col-span-5">
                  <div className="border-2 border-black p-2 bg-white shadow-md rotate-1">
                    <img
                      src={popupContent.img}
                      alt={popupContent.name}
                      className="w-full h-64 object-cover grayscale contrast-125"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholders/Events_Placeholder.png";
                      }}
                    />
                    <div className="pt-2 text-[10px] font-mono font-bold text-black flex justify-between border-t border-black/20 mt-2">
                      <span>ASYMMETRIC EVENT ARCHIVE</span>
                      <span>FIG 01 ↗</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-6">
                  <div>
                    <h3 className="font-mono text-xs font-bold text-black uppercase tracking-widest mb-2">
                      {"// SYNOPSIS & DESCRIPTION"}
                    </h3>
                    <p className="text-base text-zinc-800 leading-relaxed font-light">
                      {popupContent.desc}
                    </p>
                  </div>

                  <div className="border-t border-b border-black/20 py-4 grid grid-cols-2 gap-4 font-mono text-xs">
                    <div>
                      <span className="block font-bold text-black">ENTRY / ACCESS:</span>
                      <span className="text-zinc-700">OPEN TO ALL STUDENTS</span>
                    </div>
                    <div>
                      <span className="block font-bold text-black">FORMAT:</span>
                      <span className="text-zinc-700">HANDS-ON / INTERACTIVE</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      onClick={openRegistrationPage}
                      className="bg-black text-[#ccff00] font-oswald text-lg font-bold uppercase px-8 py-3.5 hover:bg-[#ccff00] hover:text-black transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                    >
                      <span>REGISTER NOW</span>
                      <span className="text-xl">↗</span>
                    </button>

                    <button
                      onClick={closePopup}
                      className="font-mono text-xs font-bold underline hover:text-zinc-600 px-4 py-2"
                    >
                      RETURN TO ARCHIVE
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Events;
