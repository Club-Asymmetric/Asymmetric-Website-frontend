'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutUs() {
  const manifestoItems = [
    "We learn.",
    "We build.",
    "We experiment.",
    "We fail.",
    "We try again.",
    "We create together."
  ];

  const storySteps = [
    {
      num: "01",
      title: "THE BEGINNING",
      subtitle: "WHERE CHAOS MET PURPOSE",
      desc: "It started in a crowded campus lab with a simple frustration: conventional clubs were too rigid. We wanted a playground for the curious, the hackers, and the misfits who wanted to build real things without permissions.",
      image: "/group-photo/FirstMeet.jpg",
      rotation: "-rotate-2"
    },
    {
      num: "02",
      title: "THE BUILD",
      subtitle: "PROJECTS, HARDWARE & LATE NIGHTS",
      desc: "We shipped projects, threw open workshops, built hardware hacks, and broke things. Failure was not penalized—it was logged, analyzed, and turned into our next release.",
      image: "/group-photo/CatapultProgram.jpg",
      rotation: "rotate-2"
    },
    {
      num: "03",
      title: "THE COMMUNITY",
      subtitle: "MERGING DEVS, DESIGNERS & CREATIVES",
      desc: "Engineers joined artists, UI designers worked alongside systems programmers. The collective grew into a self-sustaining ecosystem of pure creative energy.",
      image: "/group-photo/JuniorMeet.jpg",
      rotation: "-rotate-1"
    },
    {
      num: "04",
      title: "WHAT IS NEXT",
      subtitle: "NO CEILINGS, NO BOUNDARIES",
      desc: "Scaling beyond campus borders, launching open-source initiatives, building hackathons, and expanding our physical & digital footprint across the ecosystem.",
      image: "/group-photo/AndroidEspion.jpg",
      rotation: "rotate-3"
    }
  ];

  const beliefBlocks = [
    { title: "BUILD THINGS.", subtitle: "Execution over theory. We turn abstract ideas into working prototypes.", bg: "bg-[#0a0a0a] text-white border-zinc-800", limeText: false },
    { title: "BREAK THINGS.", subtitle: "Dismantle rules, stress-test systems, and discover what lies beyond defaults.", bg: "bg-[#eae8e1] text-black border-black", limeText: true },
    { title: "LEARN TOGETHER.", subtitle: "Knowledge is shared freely. Radical transparency and peer-to-peer growth.", bg: "bg-[#0a0a0a] text-white border-zinc-800", limeText: false },
    { title: "THINK DIFFERENTLY.", subtitle: "The asymmetric approach: solving hard problems from unexpected angles.", bg: "bg-[#eae8e1] text-black border-black", limeText: true }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-outfit overflow-x-hidden selection:bg-[#00008b] selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-20 px-4 md:px-12 max-w-7xl mx-auto border-b border-zinc-800">
        
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4 mb-12 text-xs font-mono tracking-widest text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-[#00008b] rounded-full animate-pulse"></span>
            <span>ABOUT ASYMMETRIC</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>[ EST. 2024 ]</span>
            <span>STUDENT COLLECTIVE</span>
            <span className="text-[#00008b] font-bold">* NO LIMITS</span>
          </div>
          <div>CULTURE / TECH / EXPERIMENTATION</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block bg-[#00008b] text-white font-mono font-bold text-xs px-3 py-1 uppercase tracking-wider -rotate-1">
              [ VOL. 01 — IDENTITY ]
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-black font-oswald uppercase leading-none tracking-tight">
              WE THINK<br />
              <span className="text-[#00008b] underline decoration-4 underline-offset-8">DIFFERENTLY.</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-300 font-light max-w-xl leading-relaxed pt-4 border-l-2 border-[#00008b] pl-4">
              A student collective built around technology, creativity, experimentation and people. We operate at the intersection of code, design, and controlled chaos.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs text-zinc-400">
              <span className="border border-zinc-700 px-3 py-1 bg-zinc-900/50">01 / EVENTS</span>
              <span className="border border-zinc-700 px-3 py-1 bg-zinc-900/50">02 / PROJECTS</span>
              <span className="border border-zinc-700 px-3 py-1 bg-zinc-900/50">03 / CULTURE</span>
              <span className="border border-zinc-700 px-3 py-1 bg-zinc-900/50 text-[#00008b] border-[#00008b]/40">04 / CHAOS</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="absolute inset-0 bg-[#00008b] translate-x-3 translate-y-3 rotate-2 opacity-80"></div>
              
              <div className="relative bg-zinc-900 border border-zinc-700 p-3 shadow-2xl -rotate-1 transition-transform hover:rotate-0 duration-300">
                <div className="overflow-hidden border border-zinc-800 relative group">
                  <img
                    src="/group-photo/FirstMeet.jpg"
                    alt="Asymmetric Students"
                    className="w-full h-[380px] sm:h-[440px] object-cover grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 text-white font-mono text-[10px] px-2 py-1 border border-zinc-700">
                    FIG 1.0 — INITIAL REACTION
                  </div>
                  <div className="absolute bottom-3 right-3 text-[#00008b] text-xl font-bold">
                    ★
                  </div>
                </div>

                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono text-zinc-400">
                  <span className="italic font-parisienne text-lg text-zinc-200">Different Backgrounds. Same Madness.</span>
                  <span className="text-[#00008b]">↗ [E-333R]</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-black border border-[#00008b] text-[#00008b] font-mono text-xs px-4 py-2 rotate-6 shadow-xl flex items-center gap-2">
                <span className="text-base">✦</span>
                <span>NO PREDEFINED MOULDS</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MANIFESTO SECTION */}
      <section className="relative bg-[#eae8e1] text-black py-24 px-4 md:px-12 border-t-2 border-b-2 border-black">
        
        <div className="max-w-7xl mx-auto relative">
          
          <div className="flex items-center justify-between border-b border-black/20 pb-4 mb-12 font-mono text-xs font-bold tracking-widest text-black/70">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-black"></span>
              <span>SECTION 02 // MANIFESTO</span>
            </div>
            <div>[ PRINTED EDITORIAL SPREAD ]</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono uppercase text-zinc-600 tracking-wider">
                {"// OUR CORE PERSPECTIVE"}
              </div>

              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-oswald uppercase leading-none tracking-tight">
                SAME PEOPLE.<br />
                <span className="bg-black text-[#eae8e1] px-3 py-1 inline-block -rotate-1 my-2">DIFFERENT</span><br />
                <span className="text-black underline decoration-wavy decoration-[#00008b] decoration-4">PERSPECTIVE.</span>
              </h2>

              <p className="font-parisienne text-2xl md:text-3xl text-zinc-800 pt-4 leading-relaxed">
                {"\"We do not fit into standard boxes because we threw out the box.\""}
              </p>

              <div className="pt-4 flex items-center gap-3 font-mono text-xs font-bold">
                <span className="bg-[#00008b] border border-black text-white px-2 py-1">READ OUR LAWS ↘</span>
                <span className="text-black/50">————————————</span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#0a0a0a] text-white p-8 md:p-12 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative rotate-1 hover:rotate-0 transition-transform duration-300">
                
                <div className="absolute -top-4 right-8 bg-[#00008b] text-white font-mono text-[10px] font-bold px-3 py-1 border border-black uppercase tracking-widest">
                  {"CONFIDENTIAL // LAWS"}
                </div>

                <h3 className="font-mono text-xs text-[#00008b] tracking-widest uppercase mb-6 border-b border-zinc-800 pb-3 flex justify-between">
                  <span>MANIFESTO</span>
                  <span>[ 06 PRINCIPLES ]</span>
                </h3>

                <ul className="space-y-4 font-oswald text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide">
                  {manifestoItems.map((item, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-center justify-between border-b border-zinc-800/80 pb-2 group cursor-default"
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="group-hover:text-[#00008b] transition-colors">{item}</span>
                      <span className="font-mono text-xs text-zinc-500 group-hover:text-[#00008b]">0{idx + 1} ↗</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-400 flex items-center justify-between">
                  <span>ASYMMETRIC COLLECTIVE</span>
                  <span className="text-[#00008b] font-bold">NO EXCEPTIONS</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto relative">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-6 mb-16 gap-4">
          <div>
            <div className="font-mono text-xs text-[#00008b] tracking-widest uppercase mb-2">
              {"// EVOLUTION & ARCHIVE"}
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black font-oswald uppercase tracking-tight">
              OUR <span className="text-[#00008b]">STORY</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 max-w-xs">
            NOT A BORING LINEAR TIMELINE. AN EDITORIAL LOG OF MILESTONES &amp; BREAKTHROUGHS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {storySteps.map((step, index) => (
            <div 
              key={index} 
              className={`bg-zinc-950 border border-zinc-800 p-6 md:p-8 relative ${step.rotation} hover:rotate-0 transition-transform duration-300 hover:border-[#00008b]/50 group`}
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                <span className="text-4xl md:text-5xl font-black font-oswald text-[#00008b]">
                  {step.num}
                </span>
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest border border-zinc-800 px-2.5 py-1">
                  PHASE // {step.num}
                </span>
              </div>

              <div className="overflow-hidden border border-zinc-800 mb-6 relative">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-52 object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-2 right-2 bg-black/90 text-[#00008b] font-mono text-[10px] px-2 py-0.5 border border-zinc-700">
                  IMG_LOG.{step.num}
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-black font-oswald uppercase mb-1 text-white group-hover:text-[#00008b] transition-colors">
                {step.title}
              </h3>
              
              <div className="font-mono text-xs text-zinc-400 font-bold mb-4">
                {step.subtitle}
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {step.desc}
              </p>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                <span>ASYMMETRIC CHRONICLES</span>
                <span className="text-[#00008b] group-hover:translate-x-1 transition-transform">EXPAND ↗</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE BELIEVE */}
      <section className="py-20 border-t border-zinc-800 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="font-mono text-xs text-[#00008b] tracking-widest uppercase mb-2">
              {"// PHILOSOPHY & PILLARS"}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-oswald uppercase">
              WHAT WE BELIEVE
            </h2>
            <p className="text-zinc-400 font-mono text-xs mt-2">FOUR UNCOMPROMISING PRINCIPLES THAT DRIVE EVERYTHING WE DO.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beliefBlocks.map((block, idx) => (
              <div
                key={idx}
                className={`p-8 md:p-12 border-2 ${block.bg} shadow-lg transition-transform duration-300 hover:-translate-y-1 relative overflow-hidden`}
              >
                <div className="font-mono text-xs font-bold mb-4 opacity-70">
                  [ PILLAR 0{idx + 1} ]
                </div>

                <h3 className={`text-4xl sm:text-5xl font-black font-oswald uppercase leading-none mb-4 ${block.limeText ? 'text-black' : 'text-white'}`}>
                  {block.title}
                </h3>

                <p className="text-sm md:text-base font-light leading-relaxed max-w-md opacity-90">
                  {block.subtitle}
                </p>

                <div className="absolute bottom-4 right-4 font-mono text-xl font-bold opacity-40">
                  {idx % 2 === 0 ? '✦' : '★'}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section className="py-24 px-4 md:px-12 bg-[#eae8e1] text-black border-t-2 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="font-mono text-xs font-bold tracking-widest text-black/70">
                [ SECTION 05 // COMMUNITY ]
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black font-oswald uppercase leading-none">
                PEOPLE<br />
                IDEAS<br />
                EXPERIENCES<br />
                <span className="bg-black text-[#00008b] px-3 py-1 inline-block rotate-1">EVERYTHING</span><br />
                IN BETWEEN.
              </h2>
              <p className="font-parisienne text-2xl text-zinc-800 pt-2">
                {"\"Not just a student club—an ecosystem of builders, creators, and lifelong conspirators.\""}
              </p>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                
                <div className="border-2 border-black bg-white p-2 shadow-md -rotate-2 hover:rotate-0 transition-transform group">
                  <img 
                    src="/group-photo/JuniorMeet.jpg" 
                    alt="Community 1"
                    className="w-full h-44 object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="pt-2 text-[11px] font-mono text-black font-bold">
                    BUILDERS &amp; HACKERS ↗
                  </div>
                </div>

                <div className="border-2 border-black bg-white p-2 shadow-md rotate-3 hover:rotate-0 transition-transform mt-6 group">
                  <img 
                    src="/group-photo/OnamEthnic.jpg" 
                    alt="Community 2"
                    className="w-full h-44 object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="pt-2 text-[11px] font-mono text-black font-bold">
                    CULTURE &amp; MADNESS ↗
                  </div>
                </div>

                <div className="border-2 border-black bg-white p-2 shadow-md rotate-1 hover:rotate-0 transition-transform group">
                  <img 
                    src="/group-photo/ShootingVideo.jpg" 
                    alt="Community 3"
                    className="w-full h-44 object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="pt-2 text-[11px] font-mono text-black font-bold">
                    CREATIVE DIRECTION ↗
                  </div>
                </div>

                <div className="border-2 border-black bg-white p-2 shadow-md -rotate-3 hover:rotate-0 transition-transform -mt-4 group">
                  <img 
                    src="/group-photo/CatapultProgram2.jpg" 
                    alt="Community 4"
                    className="w-full h-44 object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="pt-2 text-[11px] font-mono text-black font-bold">
                    OPEN WORKSHOPS ↗
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-4 md:px-12 bg-[#0a0a0a] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          
          <div className="inline-block bg-zinc-900 border border-zinc-700 text-[#00008b] font-mono text-xs px-4 py-1 uppercase tracking-widest">
            {"// JOIN THE COLLECTIVE"}
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black font-oswald uppercase leading-none tracking-tight">
            YOU DO NOT HAVE<br />
            <span className="text-[#00008b]">TO FIT THE PATTERN.</span>
          </h2>

          <p className="font-parisienne text-3xl text-zinc-300">
            That is kind of the point.
          </p>

          <div className="pt-6">
            <Link
              href="/member-application"
              className="inline-flex items-center gap-3 bg-[#00008b] text-white font-oswald text-xl sm:text-2xl font-bold uppercase px-10 py-5 hover:bg-white hover:scale-105 transition-all duration-300 border-2 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]"
            >
              <span>JOIN ASYMMETRIC</span>
              <span className="text-2xl">↗</span>
            </Link>
          </div>

          <div className="pt-12 font-mono text-xs text-zinc-500 border-t border-zinc-900 flex justify-between items-center max-w-xl mx-auto">
            <span>ASYMMETRIC STUDENT COLLECTIVE</span>
            <span>MADE WITH CHAOS</span>
          </div>

        </div>
      </section>

    </div>
  );
}