"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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

  const menuVariants = {
    closed: {
      x: "100%",
      opacity: 0
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      x: 50,
      opacity: 0
    },
    open: {
      x: 0,
      opacity: 1
    }
  };

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
        <div className="flex lg:items-center lg:justify-center justify-between items-center lg:space-x-5 lg:mt-5 mt-0">
          {/* Logo */}
          <Link href="/">
            <div className="w-72 h-28 relative lg:scale-125">
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
                            ? `text-cyan-400 hover:rounded-2xl hover:bg-black hover:text-white hover:py-2 hover:px-4 lg:hover:px-8 
                            ${hoveredItem!==null && hoveredItem !== item.name ? `${shouldDissolve ? 'opacity-0' : 'opacity-75'}` : 'opacity-100'}
                            `
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
          <div className="lg:hidden relative -left-7">
            <button
              className="focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {/* CHECK THE HAMBURGER POSITION */}
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="-5 0 100 50" fill="none"
              className={`h-10 w-10 ${isMenuOpen ? "hidden" : "block"} `}
              >
                <rect x="10" y="20" width="60" height="10" rx="5" fill="white" />
                <rect x="10" y="40" width="40" height="10" rx="5" fill="white" />
                <rect x="10" y="60" width="30" height="10" rx="5" fill="white" />
              </svg>
              <svg
                className={`h-10 w-10 ${isMenuOpen ? 'block' : 'hidden'}`}
                fill="none"
                viewBox="5 0 24 15"
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
        <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 h-screen overflow-hidden" 
            onClick={() => setIsMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-blue-950/70 backdrop-blur-md rounded-bl-full rounded-tl-full py-4 px-5 text-right mx-10 lg:hidden"
              onClick={(e) => e.stopPropagation()}
              style={{
                marginTop: `${window.innerHeight/4}px`, // Dynamically set vertical center
                transform: "translateY(-50%)" // Adjust to center vertically
              }}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.ul>
                {navItems.map((item) => (
                  <motion.li 
                    key={item.name} 
                    className="py-2"
                    variants={itemVariants}
                  >
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
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;