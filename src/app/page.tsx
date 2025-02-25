'use client';

interface PodcastData {
  id: string;
  name: string;
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
  registration_start: string;
  location: string;
  min_team_size: number;
  max_team_size: number;
  description: string;
  synopsis: string;
  photos: string[];
}

import ColorText from '@/components/ColorText';
import Event from '@/components/Event';
import LoadingSpinner from '@/components/LoadingSpinner';
import PodcastCard from '@/components/PodcastCard';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [popupLocation, setPopupLocation] = useState({ x: 0, y: 0 });
  const [events, setEvents] = useState<EventData[]>([]);
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

  const openPopup = () => {
    window.location.href = "/events";
  };

  const closePopup = () => setIsOpen(false);

  const handlePopupContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  function openRegistrationPage() {
    window.location.href = "/events/registration-form";
  }

  const localhost = process.env.NEXT_PUBLIC_LOCALHOST;

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
        eventsArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const limitedEventsArray = eventsArray.slice(0, 2);
        setEvents(limitedEventsArray);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
  
    fetchEvents();
  }, []);

  const [podcasts, setPodcasts] = useState<PodcastData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch(`${localhost}/api/podcasts`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setPodcasts(Object.values(data));
      } catch (error) {
        console.error('Failed to fetch podcasts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  if (loading) 
    return (
      <LoadingSpinner />
    )

  return (
    <div className='space-y-16'>
        {/* AboutUs Section */}
        <div className="flex items-center justify-center my-10 px-6 md:px-0 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center rounded-xl p-6 md:p-10 max-w-6xl bg-ass-gradient w-full gap-6 lg:gap-10">
            <div className="flex-1 text-center lg:text-left lg:ml-10">
              <h1 className="text-3xl md:text-4xl font-bold">
                <ColorText text="Welcome to Asymmetric !" />
              </h1>
              <p className="mt-4 text-sm md:text-base">
                <br/>
                Asymmetric Club is a technical community founded by students of the 2027 batch. We endeavour to build a team dedicated to organising workshops, hackathons, webinars, and technical events, creating projects and hosting competitions. We provide a supportive space for learning and personal growth.
                <br/><br/>
                Our goal is to empower ourselves in the fields such as cybersecurity and AI/ML and to share this knowledge with others. That is to be aware and raise awareness. 
                <br/><br/>
                Whether a seasoned tech enthusiast or just starting, Asymmetric Club offers versatile plans to help everyone and support them to enhance their technical skills.
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
            events.map((event,index) => (
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
          }
        </div>
      </div>

      {/*Podcast Section*/}
      <div className="container mx-auto xl:px-40 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center animate-zoomIn">
        {podcasts.slice(0, 3).map((podcast, index) => (
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
