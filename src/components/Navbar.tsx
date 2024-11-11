"use client";

import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverLogo, setHoverLogo] = useState<boolean>(false);
  const [shouldDissolve, setShouldDissolve] = useState(false);
  const [shouldDissolveLogo, setShouldDissolveLogo] = useState(false);

  useEffect(() => {
    let dissolveTimer: NodeJS.Timeout;
    if (hoverLogo) {
      dissolveTimer = setTimeout(() => {
        setShouldDissolveLogo(true);
      }, 2000); // 2 seconds delay before dissolve effect starts
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
      }, 2000); // 2 seconds delay before dissolve effect starts
    } else {
      setShouldDissolve(false);
    }

    return () => clearTimeout(dissolveTimer);
  }, [hoveredItem]);

  const navItems = [
    { name: 'Home', href: '/' },
    {name:'About Us', href:'/about-us'},
    { name: 'Events', href: '/events' },
    { name: 'Podcasts', href: '/podcast' },
    { name: 'Members', href: '/members' },
    { name: 'Team', href: '/team' },
    { name: 'Contact Us', href: '/contact-us' }
  ];

  return (
    <>
    <div className=''>
    <Link href='/'>
    <Image src="/logo.png" alt="Logo" className={`transition-all duration-300 fixed top-[4.5%] left-[6%] cursor-pointer ${shouldDissolveLogo ? 'opacity-0': 'opacity-100'} hover:scale-105`} width={250} height={100} 
    onMouseEnter={() => {
        setShouldDissolveLogo(false);
        setHoverLogo(true);
    }}
        onMouseLeave={() => {
        setShouldDissolveLogo(false);
        setHoverLogo(false);
    }}
    />
    </Link>
    <nav className="fixed top-[5%] inset-x-0 w-fit z-50 bg-blue-950/70 backdrop-blur-md rounded-full mx-auto">
      <div className="flex items-center justify-between p-4 rounded-full px-10">
        <ul className="flex space-x-16">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`
                  transition-all duration-200
                  ${hoveredItem !== null && hoveredItem !== item.name ? `text-gray-500 ${shouldDissolve ? 'opacity-0' : 'opacity-75'}` : 'text-white hover:rounded-2xl hover:bg-white hover:text-black hover:p-2 hover:px-8'}
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
    </div>
    </>
  );
};

export default Navbar;