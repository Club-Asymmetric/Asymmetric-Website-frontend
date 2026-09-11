'use client';

interface PodcastData {
  id: string;
  name: string;
  publish: boolean;
  guests: string[];
  description: string;
  image: string;
  mime: string;
}

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
}

import ColorText from '@/components/ColorText';
import Event from '@/components/Event';
import LoadingSpinner from '@/components/LoadingSpinner';
import PodcastCard from '@/components/PodcastCard';
import ScrollHero from '@/components/ScrollHero';
import AdmitOneTicket, { TICKET_LAYOUT, TICKET_TEXTURE } from '@/components/ui/admit-one-ticket';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState,useEffect } from 'react';
import { events as eventsData } from '@/data/events';
import { podcasts } from '@/data/podcasts';

export default function Home() {
  const [showApplyPopup, setShowApplyPopup] = useState(true); // show each refresh
  const [isOpen, setIsOpen] = useState(false);
  const [popupLocation, setPopupLocation] = useState({ x: 0, y: 0 });
  const [events, setEvents] = useState<EventData[]>([]);  const [popupContent, setPopupContent] = useState<{
    desc: string;
    img: string;
    name: string;
  }>({
    desc: "",
    img: "/placeholders/Events_Placeholder.png",
    name: "Title"
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
    if (isOpen || showApplyPopup) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.touchAction = 'none';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
    }
    return () => { 
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, showApplyPopup]);
  interface PopupContent {
    desc: string;
    img: string;
    name: string;
  }

  interface PopupLocation {
    x: number;
    y: number;
  }

  const openPopup = () => {
    window.location.href = "/events";
  };

  const closePopup = () => setIsOpen(false);

  const handlePopupContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  function openRegistrationPage() {
    window.location.href = "/events/registration-form";
  }  useEffect(() => {
    // Load events from local data
    const eventsArray = Object.values(eventsData) as EventData[];
    eventsArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const limitedEventsArray = eventsArray.slice(0, 2);
    setEvents(limitedEventsArray);
  }, []);

  const [podcastsData, setPodcastsData] = useState<PodcastData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Load podcasts from local data
    const podcastsArray = Object.values(podcasts) as PodcastData[];
    // Filter only published podcasts
    const publishedPodcasts = podcastsArray.filter(podcast => podcast.publish);
    setPodcastsData(publishedPodcasts);
    setLoading(false);
  }, []);

  return (
    <div className='space-y-16'>
        <ScrollHero />
        {showApplyPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="relative animate-zoomIn">
              <button
                aria-label="Close"
                onClick={() => setShowApplyPopup(false)}
                className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black hover:bg-[#00008b] hover:text-white transition-colors"
              >
                ✕
              </button>
              <Link
                href="/member-application"
                onClick={() => setShowApplyPopup(false)}
                aria-label="Apply to become a member"
                className="block origin-center cursor-pointer max-[560px]:scale-[0.62] max-[420px]:scale-[0.52]"
              >
                <AdmitOneTicket
                  name="Become a Member"
                  presenter="Club Asymmetric presents"
                  event="Open Applications"
                  venue="CIT Chennai"
                  dates="Rolling admissions"
                  stubText="Apply now"
                  watermark="ASY"
                  width={560}
                  layout={{ ...TICKET_LAYOUT, inkColor: '#ffffff', watermarkColor: '#ffffff', watermarkOpacity: 0.12 }}
                  texture={{ ...TICKET_TEXTURE, colorBack: '#00008b', colorFront: '#000455', colorHighlight: '#001a8b' }}
                  tilt={{ maxTilt: 7, glare: 0.12 }}
                />
              </Link>
            </div>
          </div>
        )}
        {/* AboutUs Section */}
        <div id="home-content" className="flex items-center justify-center my-10 px-6 md:px-0 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center rounded-xl p-6 md:p-10 max-w-6xl bg-ass-gradient w-full gap-6 lg:gap-10">
            <div className="flex-1 text-center lg:text-left lg:ml-10">
              <h1 className="text-3xl md:text-4xl font-bold">
                <ColorText text="Welcome to Asymmetric !" />
              </h1>
              <p className="mt-4 text-sm">
                <br/>
                Asymmetric Club is a student-founded technical community driven by the passion to explore, build, and share. We are a dynamic team dedicated to organizing workshops, hackathons, webinars, technical events, and competitions while also working on innovative projects.
                <br/><br/>
                We provide a collaborative and supportive space that encourages continuous learning and personal growth across a wide range of tech domains. Our mission is to empower ourselves and others through knowledge-sharing and hands-on experiences—raising awareness while staying aware.
                <br/><br/>
                Whether you're a seasoned tech enthusiast or just beginning your journey, Asymmetric Club welcomes you with open arms and versatile initiatives to support and enhance your technical skills.
              </p>
              <Link href='/about-us'>
                <button className="mt-6 bg-ass-button hover:bg-white hover:text-black px-4 py-1 hover:scale-105 rounded-md transition-all duration-300">
                  Dive Deeper
                </button>
              </Link>
            </div>
            <div className="hidden lg:flex lg:justify-end lg:items-center">
              <img 
                src="/placeholders/Aboutus_Placeholder.png" 
                alt="AboutUs" 
                className="w-64 md:w-80 lg:w-96 h-auto"
              />
            </div>
          </div>
        </div>
        {/* Events Section */}
        <div className="flex flex-col items-center w-full">
        <div className="flex flex-col bg-ass-gradient max-w-6xl mx-8 sm:w-[80vw] pt-8 mt-8 rounded-[20px] animate-zoomIn">
          {
            events.map((event, index) => (
              <Event
                imageSrc={`/images/${event.photos[0]}` || "/placeholders/Events_Placeholder.png"}
                key={event.id}
                desc={event.description}
                name={event.name}
                type={event.min_team_size === 1 ? (event.max_team_size === 1 ? "Individual" : "Individual/Team") : "Team"}
                date={event.date.slice(0,10)}
                location={event.location}
                openPopup={openPopup}
              />
            ))
          }
        </div>
      </div>

      {/*Podcast Section*/}
      <div className="container mx-auto xl:px-40 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center animate-zoomIn">
        {loading && <LoadingSpinner />}
        {podcastsData.slice(0, 3).map((podcast, index) => (
          <div
            key={index}
            className={`
              ${index === 0 ? 'block' : 'hidden lg:block'} 
              ${index === 1 ? 'hidden md:block' : ''} 
              ${index === 2 ? 'hidden lg:block' : ''}
            `}
          >
            <PodcastCard {...podcast} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
