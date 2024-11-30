"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverLogo, setHoverLogo] = useState<boolean>(false);
  const [shouldDissolve, setShouldDissolve] = useState(false);
  const [shouldDissolveLogo, setShouldDissolveLogo] = useState(false);

  // Get the current pathname to highlight active page
  const pathname = usePathname();

  useEffect(() => {
    let dissolveTimer: NodeJS.Timeout;
    if (hoverLogo) {
      dissolveTimer = setTimeout(() => {
        setShouldDissolveLogo(true);
      }, 2000);
    } else {
      setShouldDissolveLogo(false);
    }

    return () => clearTimeout(dissolveTimer);
  }, [hoverLogo]);

  useEffect(() => {
    let dissolveTimer: NodeJS.Timeout;
    if (hoveredItem) {
      dissolveTimer = setTimeout(() => {
        setShouldDissolve(true);
      }, 2000);
    } else {
      setShouldDissolve(false);
    }

    return () => clearTimeout(dissolveTimer);
  }, [hoveredItem]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Events', href: '/events' },
    { name: 'Podcasts', href: '/podcast' },
    { name: 'Members', href: '/members' },
    { name: 'Team', href: '/team' },
    { name: 'Contact Us', href: '/contact-us' }
  ];

  // Function to handle mobile menu item selection with a Timeout
  const handleMobileMenuItemClick = () => {
    setTimeout(() => setIsMenuOpen(false), 500);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);


  return (
    <div className="top-0 w-full min-w-max">
      <div className="container mx-auto min-w-max">
        <div className="flex items-center justify-center space-x-5 mt-6">
          {/* Logo */}
          <Link href="/">
            <div className="w-64 h-24 relative">
              <Image
                src="/logo/logo.png"
                alt="Logo"
                className={`z-50 transition-all duration-300 cursor-pointer ${
                  shouldDissolveLogo ? 'opacity-0' : 'opacity-100'
                } hover:scale-105`}
                fill
                style={{ objectFit: 'contain' }}
                onMouseEnter={() => {
                  setShouldDissolveLogo(false);
                  setHoverLogo(true);
                }}
                onMouseLeave={() => {
                  setShouldDissolveLogo(false);
                  setHoverLogo(false);
                }}
              />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="bg-blue-950/70 backdrop-blur-md rounded-full min-w-max hidden lg:block">
            <div className="flex items-center justify-center p-4 rounded-full px-10">
              <ul className="flex flex-wrap justify-center md:space-x-8 lg:space-x-14 xl:space-x-20">
                {navItems.map((item) => (
                  <li key={item.name} className="whitespace-nowrap">
                    <Link
                      href={item.href}
                      className={`
                        transition-all duration-200 text-base
                        ${
                          pathname === item.href
                            ? 'text-cyan-400 hover:rounded-2xl hover:bg-black hover:text-white hover:py-2 hover:px-4 lg:hover:px-8'
                            :
                          hoveredItem !== null && hoveredItem !== item.name
                            ? `text-gray-500 ${shouldDissolve ? 'opacity-0' : 'opacity-75'}`
                            : 'text-white hover:rounded-2xl hover:bg-white hover:text-black hover:py-2 hover:px-4 lg:hover:px-8'
                        }
                      `}
                      onMouseEnter={() => {
                        setHoveredItem(item.name);
                        setShouldDissolve(false);
                      }}
                      onMouseLeave={() => {
                        setHoveredItem(null);
                        setShouldDissolve(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Hamburger Menu */}
          <div className="lg:hidden">
            <button
              className="focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="-5 0 100 50" fill="none"
              className={`h-8 w-8 ${isMenuOpen ? "hidden" : "block"} `}
              >
                <rect x="10" y="20" width="60" height="10" rx="5" fill="white" />
                <rect x="10" y="40" width="40" height="10" rx="5" fill="white" />
                <rect x="10" y="60" width="30" height="10" rx="5" fill="white" />
              </svg>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`}
                fill="none"
                viewBox="1 0 24 15"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 h-screen overflow-hidden" onClick={() => setIsMenuOpen(false)}>
            <div 
              className="bg-blue-950/70 backdrop-blur-md rounded-bl-full rounded-tl-full py-4 px-5 text-right mx-10 lg:hidden right-0 top-1/2 transform translate-y-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <ul>
                {navItems.map((item) => (
                  <li key={item.name} className="py-2">
                    <Link
                      href={item.href}
                      className={`
                        transition-all duration-200 text-base 
                        ${
                          pathname === item.href 
                            ? 'text-cyan-400 bg-black/50 rounded-2xl py-2 px-4'
                            : 'text-white hover:rounded-2xl hover:bg-white hover:text-black hover:py-2 hover:px-4'
                        }
                      `}
                      onClick={handleMobileMenuItemClick}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;