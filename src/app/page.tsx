'use client';

interface PodcastData {
  id: string;
  name: string;
  publish: boolean;
  guests: string[];
  description: string;
  image: string;
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

import Event from '@/components/Event';
import LoadingSpinner from '@/components/LoadingSpinner';
import PodcastCard from '@/components/PodcastCard';
import ScrollHero from '@/components/ScrollHero';
import ScrollExpand from '@/components/ScrollExpand';
import BorderGlow from '@/components/BorderGlow';
import { FloatingPaths } from '@/components/ui/background-paths';
import AdmitOneTicket, { TICKET_LAYOUT, TICKET_TEXTURE } from '@/components/ui/admit-one-ticket';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState,useEffect } from 'react';
import { events as eventsData } from '@/data/events';
import { podcasts } from '@/data/podcasts';

const teamPhotos = [
  '/assets/group-photo/TeamGroupPhoto.png',
  '/assets/group-photo/TeamOfficeGroup.png',
  '/assets/group-photo/FreshworksVisit.png',
  '/assets/group-photo/DevFestMumbaiStage.png',
  '/assets/group-photo/HacksymmetricGroupPhoto.png',
  '/assets/group-photo/HacksymmetricOpenInnovationWinners.png',
  '/assets/group-photo/HacksymmetricAgenticAIWinners.png',
  '/assets/group-photo/HacksymmetricRunnerUps.png',
  '/assets/group-photo/AvatarWorkshopDemo.png',
  '/assets/group-photo/TeamSpeakersMoments.png',
];

export default function Home() {
  const [showApplyPopup, setShowApplyPopup] = useState(true); // show each refresh
  const [teamPhotoIndex, setTeamPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [popupLocation, setPopupLocation] = useState({ x: 0, y: 0 });
  const [events, setEvents] = useState<EventData[]>([]);  const [popupContent, setPopupContent] = useState<{
    desc: string;
    img: string;
    name: string;
  }>({
    desc: "",
    img: "/assets/placeholders/Events_Placeholder.png",
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
            <button
              aria-label="Close"
              onClick={() => setShowApplyPopup(false)}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:bg-[#00008b] hover:text-white transition-colors"
            >
              ✕
            </button>
            <div className="relative animate-zoomIn">
              <Link
                href="/member-application"
                onClick={() => setShowApplyPopup(false)}
                aria-label="Apply to become a member"
                className="block origin-center cursor-pointer max-[620px]:scale-[0.68] max-[480px]:scale-[0.55] max-[360px]:scale-[0.48]"
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
        {/* AboutUs / Manifesto Section */}
        <div id="home-content" className="w-full px-6 md:px-10 lg:px-16">
          <BorderGlow
            className="w-full max-w-7xl mx-auto"
            backgroundColor="#080809"
            borderRadius={6}
            glowColor="228 90 65"
            glowRadius={28}
            glowIntensity={0.7}
            coneSpread={20}
            colors={['#1E3FCC', '#3b6cff', '#00008B']}
          >
            <div className="relative flex flex-col lg:flex-row items-center gap-10 overflow-hidden px-5 py-8 sm:px-8 md:px-10 md:py-12 lg:gap-16">
              <FloatingPaths position={1} className="text-[#3b6cff]/25" />
              <FloatingPaths position={-1} className="text-[#3b6cff]/15" />

              <div className="relative z-10 w-full lg:flex-1">
                <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-white/50 uppercase">
                  <span>About // 01</span>
                  <span>Asymmetric&reg;</span>
                </div>
                <div className="mt-3 h-px w-full bg-white/15" />

                <h2 className="mt-8 md:mt-10 font-bold uppercase leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-[64px]">
                  We break things.
                  <br />
                  <span className="text-[#3b6cff]">We build things.</span>
                </h2>

                <p className="mt-8 max-w-xl text-sm md:text-base text-white/70 leading-relaxed">
                  ASYMMETRIC is a student-driven technical club that turns curiosity into capability&mdash;bringing emerging technologies, hands-on learning, competitions, Technical Fest, and real-world problem solving together to help students build, compete, and create meaningful impact.
                </p>

                <p className="mt-5 max-w-xl text-lg md:text-xl italic text-white/90">
                  No spectators. Just curious people building together.
                </p>

                <Link
                  href="/about-us"
                  className="group mt-10 inline-flex items-center gap-2 border-b border-[#3b6cff]/60 pb-1 font-mono text-sm uppercase tracking-widest text-white transition-all duration-300 hover:border-[#3b6cff]"
                >
                  Explore Asymmetric
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&#8599;</span>
                </Link>

                <div className="mt-14 h-px w-full bg-white/15" />
                <p className="mt-4 text-center font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase lg:text-left">
                  Built by students // for the curious
                </p>
              </div>

              <div className="relative z-10 flex w-full shrink-0 items-center justify-center lg:w-[320px]">
                <img
                  src="/assets/logo/AboutUsLogo.png"
                  alt="Asymmetric Club"
                  className="w-48 sm:w-56 lg:w-full h-auto drop-shadow-[0_0_50px_rgba(59,108,255,0.4)]"
                />
              </div>
            </div>
          </BorderGlow>
        </div>
        {/* Team Section */}
        <ScrollExpand
          src={teamPhotos[teamPhotoIndex]}
          alt="Club Asymmetric team"
          title="One Team, One Family"
          scrollHint="Scroll"
          overlayScrim={0.7}
          useWindowScroll
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
            Club Asymmetric
          </h2>
          <p className="mt-2 max-w-xl mx-auto text-sm md:text-base text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
            The people who build, break, and grow together.
          </p>
          <span className="mt-6 font-mono text-xs tracking-widest text-white/70 [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
            {String(teamPhotoIndex + 1).padStart(2, '0')} / {String(teamPhotos.length).padStart(2, '0')}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTeamPhotoIndex((i) => (i + 1) % teamPhotos.length);
            }}
            aria-label="Next photo"
            className="absolute right-4 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 flex h-11 w-11 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#3b6cff] text-lg md:text-xl text-white transition-transform duration-300 hover:scale-110"
          >
            →
          </button>
        </ScrollExpand>

        {/* Events Section */}
        <div className="flex flex-col items-center w-full">
        <div className="flex flex-col bg-ass-gradient max-w-6xl mx-8 sm:w-[80vw] pt-8 mt-8 rounded-[20px] animate-zoomIn">
          {
            events.map((event, index) => (
              <Event
                imageSrc={`/assets/images/${event.photos[0]}` || "/assets/placeholders/Events_Placeholder.png"}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-stretch animate-zoomIn">
        {loading && <LoadingSpinner />}
        {podcastsData.slice(0, 3).map((podcast, index) => (
          <div
            key={index}
            className={`
              h-full
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
