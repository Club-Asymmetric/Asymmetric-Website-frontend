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

const Footer = () => {
  const [scale, setScale] = useState(1);

  const handleEasterEggHover = (isHovering: boolean) => {
    document.documentElement.classList.toggle('grayscale-active', isHovering);
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate how close to bottom (0 at top, 1 at bottom)
      const scrollProgress = (scrollTop + windowHeight) / documentHeight;
      
      // Start scaling when within 20% of bottom
      if (scrollProgress > 0.8) {
        const newScale = 1 - ((scrollProgress - 0.7) * 0.3);
        setScale(Math.min(newScale, 1));
      } else {
        setScale(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.documentElement.classList.remove('grayscale-active');
    };
  }, []);

  const year = new Date().getFullYear();

  return (
    <div className=''>
    <footer 
      className="relative bg-gradient-to-br from-blue-900 to-blue-200 text-white mx-auto pt-8 pb-1 rounded-xl mb-10 max-w-6xl"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'bottom',
        transition: 'transform 0.3s ease-out'
      }}
    >
      <div className="max-w-5xl mx-auto py-4 border-white border-t">
        <div className="text-center">
          <h2 className="md:text-lg text-base md:font-normal font-bold mb-4">Created by Students, for Students</h2>
          <div className='border-white border-t'/>
        </div>
        <div className="flex flex-row justify-center md:justify-evenly items-center border-white px-3 py-4">
          <div>
            <Link href='/'>
              <div className="md:w-72 md:h-28 scale-110 relative py-7 md:py-0">
                <Image 
                  src="/logo/logo.png" 
                  alt="Logo" 
                  fill
                  style={{ objectFit: 'contain' }}
                  className='cursor-pointer hover:scale-105 transition-all duration-300' 
                />
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4 mt-0 px-3">
            <span className="md:text-lg text-sm text-white mr-2 transition-all duration-200 cursor-pointer">
              Stay in the
              <Link href='https://linktr.ee/Club_Asymmetric' target='_blank'>
                <span className='hover:text-gray-300 transition-all duration-200'> Loop</span>
              </Link>?
            </span>
            <Link href="https://www.instagram.com/clubasymmetric/" target='_blank' className="transition-colors">
              <FaInstagram className="transition-all duration-300 md:w-7 md:h-7 w-5 h-5 hover:bg-red-500 hover:scale-105 rounded-md" />
            </Link>
            <Link href="https://discord.gg/pswGgSt3rR" target='_blank' className="transition-colors">
              <FaDiscord className="transition-all duration-300 md:w-7 md:h-7 w-5 h-5 hover:bg-blue-700 hover:scale-105 rounded-lg" />
            </Link>
            <Link href="https://www.linkedin.com/company/club-asymmetric/" target='_blank' className="transition-colors">
              <FaLinkedinIn className="transition-all duration-300 md:w-7 md:h-7 w-5 h-5 hover:bg-blue-500 hover:scale-105 rounded-md" />
            </Link>
            <Link href='https://open.spotify.com/show/0iMKRNbZOWxKWIAUYD7T0C' target='_blank' className="transition-colors">
              <FaSpotify className="transition-all duration-300 md:w-7 md:h-7 w-5 h-5 hover:bg-green-400 hover:scale-105 rounded-lg" />
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center px-4 py-4 border-t border-white border-b">
          <div className="md:text-base text-sm">
            <p>Copyright © <span>{year}</span> ASYMMETRIC All Rights Reserved</p>
          </div>
          <div>
            <span className='text-transparent text-sm hover:text-black hover:border rounded-md hover:bg-white transition-all duration-200 cursor-pointer'
            onMouseEnter={() => handleEasterEggHover(true)}
            onMouseLeave={() => handleEasterEggHover(false)}
            >
              <Link href='https://youtu.be/Od6Vug4MDxA' target='_blank'>
              WOW YOU FOUND A ORGANIC ESTER EGG MF
              </Link>
              </span>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;