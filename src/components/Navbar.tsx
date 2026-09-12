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
    { name: 'Blogs', href: '/blogs' },
    { name: 'Members', href: '/members' },
    { name: 'Team', href: '/team' },
    { name: 'Apply', href: '/member-application' },
    { name: 'Contact Us', href: '/contact-us' },
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
    <div className="sticky top-0 z-[70] w-full">
      <div className="flex w-full items-center gap-10 px-7 py-5 [transform:translateZ(0)] [will-change:transform]">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="relative h-12 w-32 sm:h-14 sm:w-40">
              <Image
                src="/assets/logo/logo.png"
                alt="Logo"
                className={`-z-10 transition-all duration-300 cursor-pointer ${
                  shouldDissolveLogo ? 'opacity-0' : 'opacity-100'
                } hover:scale-105`}
                fill
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
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
          <nav className="hidden lg:flex h-20 flex-1 items-center rounded-full border border-zinc-800 bg-black/80 backdrop-blur-md">
            <ul className="flex h-full w-full items-center justify-evenly whitespace-nowrap px-6 font-mono text-sm xl:text-base uppercase tracking-wider">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`
                        inline-block rounded-full px-2.5 xl:px-3.5 py-1.5 xl:py-2 transition-all duration-200
                        ${
                          pathname === item.href
                            ? `text-[#4f46e5] hover:bg-[#4f46e5] hover:text-white
                            ${hoveredItem!==null && hoveredItem !== item.name ? `${shouldDissolve ? 'opacity-0' : 'opacity-75'}` : 'opacity-100'}
                            `
                            :
                          hoveredItem !== null && hoveredItem !== item.name
                            ? `text-zinc-500 ${shouldDissolve ? 'opacity-0' : 'opacity-75'}`
                            : 'text-white hover:bg-[#4f46e5] hover:text-white'
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
          </nav>

          {/* Hamburger Menu */}
          <div className="lg:hidden shrink-0 ml-auto">
            <button
              className="focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="-5 0 100 50" fill="none"
              className={`h-8 w-8 ${isMenuOpen ? "hidden" : "block"} `}
              >
                <rect x="10" y="20" width="60" height="10" rx="5" fill="white" />
                <rect x="10" y="40" width="40" height="10" rx="5" fill="white" />
                <rect x="10" y="60" width="30" height="10" rx="5" fill="white" />
              </svg>
              <svg
                className={`h-8 w-8 ${isMenuOpen ? 'block z-50' : 'hidden'}`}
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[65] h-screen overflow-hidden"
            onClick={() => setIsMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black/90 backdrop-blur-md border border-zinc-800 rounded-bl-full rounded-tl-full py-4 px-5 text-right mx-10 lg:hidden mt-[25vh] -translate-y-1/2"
              onClick={(e) => e.stopPropagation()}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.ul className="font-mono uppercase tracking-wider">
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
                            ? 'text-[#00008b] bg-zinc-900/70 rounded-2xl py-2 px-4'
                            : 'text-white hover:rounded-2xl hover:bg-[#00008b] hover:text-white hover:py-2 hover:px-4'
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
  );
};

export default Navbar;