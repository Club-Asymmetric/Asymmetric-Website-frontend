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
  const [buttonText, setButtonText] = useState('Click to COPY');

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Create a temporary span element
        const span = document.createElement('span');
        span.textContent = text;
        span.style.position = 'absolute';
        span.style.opacity = '0';
        span.style.whiteSpace = 'pre'; // Preserve whitespace
        document.body.appendChild(span);

        // Create a selection range
        const range = document.createRange();
        range.selectNodeContents(span);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
          document.execCommand('copy');
          selection.removeAllRanges();
        }
        
        // Clean up
        document.body.removeChild(span);
      }
      
      // Update button text in both cases
      setButtonText('DUMB ASS (Check your ClipBoard)');
      setTimeout(() => setButtonText('Click to COPY'), 2000);
      
    } catch (err) {
      console.error('Failed to copy:', err);
      setButtonText('Failed to copy');
      setTimeout(() => setButtonText('Click to COPY'), 2000);
    }
  };

  const handleCopy = (): void => {
    const textElement = document.getElementById('tooltipText');
    if (textElement) {
      const textToCopy = textElement.textContent || '';
      copyToClipboard(textToCopy.trim());
    }
  };

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
          <h2 className="md:text-lg text-base mb-4">Created by Students, for Students</h2>
          <div className='border-white border-t'/>
        </div>
        <div className="flex flex-row justify-center md:justify-evenly items-center border-white px-3 py-4">
          <div>
            <Link href='/'>
              <div className="md:w-72 md:h-28 relative py-7 md:py-0">
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
            <span className="md:text-base text-sm text-white mr-2 transition-all duration-200 cursor-pointer">
              Stay in the
              <Link href='https://linktr.ee/Club_Asymmetric' target='_blank'>
                <span className='hover:text-gray-300 transition-all duration-200'> Loop</span>
              </Link>?
              <div className="relative inline-block">
                <div className="peer">
                  <Image
                    src="/elements/breakingconnect.png"
                    alt="Breaking-Connect"
                    width={35}
                    height={35}
                    className="inline-block mb-1 ml-2 cursor-pointer"
                    onClick={handleCopy}
                  />
                </div>
                {/* Should I make it Transparent */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-blue-200/90 text-black text-xs sm:text-sm lg:text-base p-2 rounded-md opacity-0 peer-hover:opacity-0 transition-all duration-300 mb-1 w-64 sm:w-80 lg:w-96 text-center cursor-default">
                  <span id="tooltipText">
                    -... .-. . .- -.- .. -. --. / -.-. .. - / -.-. --- -. -. . -.-. - ... / -.--. ... .. -... .. --..-- / .. / .- -- / - .- .-. --. . - .. -. --. / -.-- --- ..- -.--.-
                  </span>
                </div>
                <div className="absolute -bottom-[36px] sm:-bottom-[50px] md:-bottom-[55px] left-1/2 transform -translate-x-1/2 bg-blue-200/90 text-black text-xs sm:text-sm lg:text-base p-2 rounded-md opacity-0 peer-hover:opacity-100 transition-all duration-300 mb-1 w-52 sm:w-60 lg:w-72 text-center cursor-default">
                  <span>
                    {buttonText}
                    <br />
                  </span>
                </div>
              </div>
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