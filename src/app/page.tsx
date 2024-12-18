'use client';

interface PodcastCardProps {
  title: string;
  author: string;
  description: string;
  imageUrl: string;
}

import ColorText from '@/components/ColorText';
import Event from '@/components/Event';
import PodcastCard from '@/components/PodcastCard';
import Link from 'next/link';
import { useState,useEffect } from 'react';

export default function Home() {

  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [popupContent, setPopupContent] = useState({
    desc : "",
    img : "/placeholders/Events_Placeholder.png",
    name : "Title",
    synopsis : "synopsis"
    });
  
  function openRegistrationPage() {
    window.location.href="/events/registration-form"
  }

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

  const podcasts: PodcastCardProps[] = [
    {
      title: "Morning Tech Talk",
      author: "Jessica Page",
      description: "Daily insights into the latest technology trends and innovations. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "/placeholders/PodcastFace.png"
    },
    {
      title: "Morning Tech Talk",
      author: "Jessica Page",
      description: "Daily insights into the latest technology trends and innovations. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "/placeholders/PodcastFace.png"
    },
    {
      title: "Morning Tech Talk",
      author: "Jessica Page",
      description: "Daily insights into the latest technology trends and innovations. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "/placeholders/PodcastFace.png"
    },
    {
      title: "Morning Tech Talk",
      author: "Jessica Page",
      description: "Daily insights into the latest technology trends and innovations. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "/placeholders/PodcastFace.png"
    }
  ];

  return (
    <>
        {/* AboutUs Section */}
        <div className="flex items-center justify-center my-5 px-6 md:px-0 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center rounded-xl p-6 md:p-10 max-w-6xl bg-ass-gradient w-full gap-6 lg:gap-10">
            <div className="flex-1 text-center lg:text-left lg:ml-10">
              <h1 className="text-3xl md:text-4xl font-bold">
                <ColorText text="Welcome to Asymmetric!" />
              </h1>
              <p className="mt-4 text-sm md:text-base">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti itaque id esse. Doloribus, iure dolores. Cupiditate est blanditiis cum, vitae quos deserunt eligendi eaque ullam qui porro eum dicta magnam?
                Sed omnis harum eveniet quas cumque id blanditiis non sunt voluptatem asperiores ab, nihil voluptate eligendi, aliquam suscipit laboriosam. Nostrum similique rem voluptatem recusandae, minus et tempore cum labore fugit!
              </p>
              <Link href='/about-us'>
                <button className="mt-6 bg-ass-button text-white hover:bg-white hover:text-black px-4 py-2 rounded-md transition-all duration-300">
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
        <div className='flex flex-col w-fit rounded-xl bg-blue-950 my-20 pt-10 mx-auto'>
        <Event 
            imageSrc="/placeholders/Events_Placeholder.png"
            synopsis="Event description goes here"
            name="EVENT NAME GOES HERE"
            type="Team"
            date="Jan 24, 2025"
            desc="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam, si coactum est in alienum sensum omne quicquid est, ut non intellegamus, sic omne quod est in nostris sensibus, ut non videamus, nec audiamus, nec gustemus, nec concipiamus, sensibile est.
            CONTENT TEAM IS LAZY AF TO WRITE A DESCRIPTION
            "
            location="CIT Chennai, Kundrathur"
            openPopup={openPopup}
          />
          <Event 
            imageSrc="/placeholders/Events_Placeholder.png"
            synopsis="Event description goes here"
            name="EVENT NAME GOES HERE"
            type="Team"
            date="Jan 24, 2025"
            desc="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam, si coactum est in alienum sensum omne quicquid est, ut non intellegamus, sic omne quod est in nostris sensibus, ut non videamus, nec audiamus, nec gustemus, nec concipiamus, sensibile est."
            location="CIT Chennai, Kundrathur"
            openPopup={openPopup}
          />
        </div>
      {/* Global Popup for Events */}
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
      {/*Podcast Section*/}
      <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-44 justify-items-center">
        {podcasts.slice(0,2).map((podcast, index) => (
          // On mobile, show only first podcast
          // On others, show first two podcasts

          //ADD 3
            <div key={index} className={`
            ${index === 0 ? 'block' : 'hidden md:block'}
            `}>
            <PodcastCard {...podcast} />
            </div>
        ))}
      </div>
    </div>
    </>
  );
}
