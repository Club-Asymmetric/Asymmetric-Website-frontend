"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { FaInstagram, FaDiscord, FaLinkedinIn, FaSpotify } from "react-icons/fa";
import { FooterBackgroundGradient } from "@/components/ui/hover-footer";

const footerLinks = [
  {
    title: "Club",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Team", href: "/team" },
      { label: "Events", href: "/events" },
      { label: "Become a Member", href: "/member-application" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Podcasts", href: "/podcast" },
      { label: "Blogs", href: "/blogs" },
      { label: "Members", href: "/members" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Live Chat", href: "https://discord.gg/pswGgSt3rR", pulse: true },
    ],
  },
];

const socialLinks = [
  { icon: <FaInstagram size={20} />, label: "Instagram", href: "https://www.instagram.com/clubasymmetric/" },
  { icon: <FaDiscord size={20} />, label: "Discord", href: "https://discord.gg/pswGgSt3rR" },
  { icon: <FaLinkedinIn size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/company/club-asymmetric/" },
  { icon: <FaSpotify size={20} />, label: "Spotify", href: "https://open.spotify.com/show/0iMKRNbZOWxKWIAUYD7T0C" },
];

function HoverFooter() {
  return (
    <footer className="bg-black relative h-fit rounded-3xl overflow-hidden m-4 md:m-8 border border-white/10">
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px z-30"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #3355cc 50%, transparent 100%)",
        }}
      />
      <div className="max-w-7xl mx-auto p-8 md:p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image src="/logo/logo.png" alt="Club Asymmetric logo" fill style={{ objectFit: "contain" }} />
              </div>
              <span className="text-white text-2xl font-bold">Club Asymmetric</span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400">
              A student-founded technical community at Chennai Institute of Technology,
              building, breaking, and innovating together.
            </p>
            <span className="flex items-center gap-2 text-sm text-zinc-400">
              <MapPin size={16} className="text-[#3355cc]" />
              Chennai Institute of Technology
            </span>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative w-fit">
                    <Link
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      className="text-zinc-400 hover:text-[#3355cc] transition-colors"
                    >
                      {link.label}
                    </Link>
                    {"pulse" in link && link.pulse && (
                      <span className="absolute top-0 right-[-10px] w-2 h-2 rounded-full bg-[#3355cc] animate-pulse" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Stay in the loop */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Stay in the Loop</h4>
            <Link
              href="https://linktr.ee/Club_Asymmetric"
              target="_blank"
              className="text-sm text-zinc-400 hover:text-[#3355cc] transition-colors"
            >
              All our links, in one place ↗
            </Link>
            <div className="flex space-x-5 text-zinc-400 mt-6">
              {socialLinks.map(({ icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  className="hover:text-[#3355cc] transition-colors"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-t border-white/10 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 text-zinc-400">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Club Asymmetric. All rights reserved.
          </p>
          <p className="text-center md:text-right tracking-[0.2em] uppercase text-xs text-zinc-500">
            Build &middot; Break &middot; Innovate
          </p>
        </div>
      </div>

      {/* Static brand wordmark — decorative only, no interaction */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none text-center font-black uppercase leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white/15 to-white/0 pb-4 md:pb-6"
        style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}
      >
        Asymmetric
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default HoverFooter;
