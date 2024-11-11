"use client";

import React from 'react';
import { 
  FaInstagram, 
  FaDiscord, 
  FaLinkedinIn,
  FaSpotify 
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface FooterLink {
  text: string;
  href: string;
}

const Footer = () => {
  const [scale, setScale] = useState(1);
  const [hoveredPrimary, setHoveredPrimary] = useState<string | null>(null);
  const [hoveredSecondary, setHoveredSecondary] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate how close to bottom (0 at top, 1 at bottom)
      const scrollProgress = (scrollTop + windowHeight) / documentHeight;
      
      // Start scaling when within 20% of bottom
      if (scrollProgress > 0.8) {
        const newScale = 1 - ((scrollProgress - 0.7) * 0.25);
        setScale(Math.min(newScale, 1));
      } else {
        setScale(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryLinks: FooterLink[] = [
    { text: 'Home', href: '/' },
    { text: 'Events', href: '/events' },
    { text: 'Podcasts', href: '/podcasts' },
  ];

  const secondaryLinks: FooterLink[] = [
    { text: 'Meet the Minds', href: '/members' },
    { text: 'Faces of Asymmetric', href: '/team' },
    { text: 'Contact Us', href: '/contact-us' },
  ];

  const events: FooterLink[] = [
    { text: 'Event 1', href: '/events' },
    { text: 'Event 2', href: '/events' },
    { text: 'Event 3', href: '/events' },
  ];

  const podcasts: FooterLink[] = [
    { text: 'Podcast 1', href: '/podcasts' },
    { text: 'Podcast 2', href: '/podcasts' },
    { text: 'Podcast 3', href: '/podcasts' },
  ];

  const year = new Date().getFullYear();

  return (
    <div className=''>
    <footer 
      className="bg-gradient-to-br from-blue-900 to-blue-200 text-white mx-16 pt-8 pb-1 rounded-3xl mb-10"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'bottom',
        transition: 'transform 0.3s ease-out'
      }}
    >
      <div className="max-w-7xl mx-auto py-4 border-white border-t">
        <div className="text-center mb-7">
          <h2 className="text-lg mb-4">Created by Students, for Students</h2>
          <div className='border-white border-t'/>
        </div>

        <div className="grid grid-cols-4 gap-10 mb-8 text-center">
          <div className="space-y-5 font-semibold">
            {primaryLinks.map((link) => (
              <div key={link.text}>
                <Link href={link.href} className={`transition-all duration-75 ${hoveredPrimary!==null && hoveredPrimary!==link.text ? 'text-gray-300': 'text-white'}`}
                onMouseEnter={() => setHoveredPrimary(link.text)}
                onMouseLeave={() => setHoveredPrimary(null)}
                >
                  <div className='transition-all duration-200 hover:scale-110'>{link.text}</div>
                </Link>
              </div>
            ))}
          </div>

          <div className="space-y-5 font-semibold">
            {secondaryLinks.map((link) => (
              <div key={link.text}>
                <Link href={link.href} className={`transition-all duration-75 ${hoveredSecondary!==null && hoveredSecondary!==link.text ? 'text-gray-300': 'text-white'}`}
                onMouseEnter={() => setHoveredSecondary(link.text)}
                onMouseLeave={() => setHoveredSecondary(null)}
                >
                  <div className='transition-all duration-200 hover:scale-110'>{link.text}</div>
                </Link>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-2">Events</h3>
            <div className="space-y-1">
              {events.map((event) => (
                <div key={event.text}>
                  <Link href={event.href} className="hover:text-gray-300 transition-colors">
                    {event.text}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-2">Podcasts</h3>
            <div className="space-y-1">
              {podcasts.map((podcast) => (
                <div key={podcast.text}>
                  <Link href={podcast.href} className="hover:text-gray-300 transition-colors">
                    {podcast.text}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center py-4 border-t border-white">
          <div className="text-sm">
            <p>Copyright © <span>{year}</span> ASYMMETRIC All Rights Reserved</p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center pt-6 border-t border-white">
          <div>
            <Link href='/'>
              <Image src="/logo.png" alt="Logo" className='cursor-pointer hover:scale-105 transition-all duration-300' width={175} height={100} />
            </Link>
          </div>
          <div className="flex items-center space-x-4 mt-0">
            <span className="text-sm text-white mr-2 hover:scale-105 transition-all duration-200 cursor-pointer">
              Stay in the <Link href='https://linktr.ee/Club_Asymmetric' target='_blank'>
                <span className='hover:text-gray-300 transition-all duration-200'>Loop</span>
              </Link>?
            </span>
            <Link href="https://www.instagram.com/clubasymmetric/" target='_blank' className="transition-colors">
              <FaInstagram className="transition-all duration-300 w-5 h-5 hover:bg-red-500 rounded-md" />
            </Link>
            <Link href="https://discord.gg/pswGgSt3rR" target='_blank' className="transition-colors">
              <FaDiscord className="transition-all duration-300 w-5 h-5 hover:bg-blue-500 rounded-lg" />
            </Link>
            <Link href="https://www.linkedin.com/company/club-asymmetric/" target='_blank' className="transition-colors">
              <FaLinkedinIn className="transition-all duration-300 w-5 h-5 hover:bg-blue-600 rounded-md" />
            </Link>
            <Link href='https://open.spotify.com/show/0iMKRNbZOWxKWIAUYD7T0C' target='_blank' className="transition-colors">
              <FaSpotify className="transition-all duration-300 w-5 h-5 hover:bg-green-400 rounded-lg" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;