"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Calendar, Users, Radio, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

export default function MemberApplicationPage() {
  return (
    <div className="relative min-h-[85vh] px-4 py-12 md:px-8 md:py-20 flex items-center justify-center">
      <div className="relative mx-auto w-full max-w-[900px] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0e]/90 p-6 sm:p-10 md:p-14 backdrop-blur-xl shadow-2xl">
        {/* Subtle glowing ambient lights */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#6366f1] opacity-[0.18] blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-[#39ff14] opacity-[0.12] blur-[120px]"
        />

        {/* Logo watermark background */}
        <Image
          src="/assets/logo/ass.png"
          alt=""
          aria-hidden="true"
          width={600}
          height={600}
          className="pointer-events-none absolute inset-0 z-0 m-auto h-[85%] w-[85%] object-contain opacity-[0.03]"
        />

        <div className="relative z-10 text-center space-y-8">
          {/* Header Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-xs font-mono uppercase tracking-[0.2em] text-red-400 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.15)]"
          >
            <Lock className="h-3.5 w-3.5 text-red-400" />
            <span>Applications Currently Closed</span>
          </motion.div>

          {/* Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="space-y-4 max-w-2xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Recruitment Drive <br />
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Is Now Closed
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              Thank you for the overwhelming interest in joining <span className="text-white font-semibold">Club Asymmetric</span>! Member applications for the current recruitment term are officially closed.
            </p>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 sm:p-8 text-left space-y-4 shadow-lg backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>Stay Engaged with the Community</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Don’t worry if you missed this drive! You can still participate in our public workshops, hackathons, open podcasts, and technical sessions. Keep an eye out for upcoming announcements regarding future recruitment opportunities.
            </p>
          </motion.div>

          {/* Quick Action Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
          >
            <Link
              href="/events"
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/60 p-4 transition-all duration-300 hover:border-[#6366f1] hover:bg-zinc-800/80"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6366f1]/10 text-[#6366f1] group-hover:bg-[#6366f1] group-hover:text-white transition-colors">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Explore Events</h3>
                  <p className="text-xs text-zinc-400">Discover upcoming workshops</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/podcast"
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/60 p-4 transition-all duration-300 hover:border-[#39ff14]/50 hover:bg-zinc-800/80"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#39ff14]/10 text-[#39ff14] group-hover:bg-[#39ff14] group-hover:text-black transition-colors">
                  <Radio className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Listen to Podcasts</h3>
                  <p className="text-xs text-zinc-400">Tech talks and discussions</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/team"
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/60 p-4 transition-all duration-300 hover:border-purple-500/50 hover:bg-zinc-800/80"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Meet the Team</h3>
                  <p className="text-xs text-zinc-400">Learn about our mentors</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="https://discord.gg/pswGgSt3rR"
              target="_blank"
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/60 p-4 transition-all duration-300 hover:border-sky-500/50 hover:bg-zinc-800/80"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Join Discord</h3>
                  <p className="text-xs text-zinc-400">Connect with members live</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="pt-4 text-xs text-zinc-500"
          >
            Have questions or inquiries?{' '}
            <Link href="/contact-us" className="text-indigo-400 underline underline-offset-4 hover:text-indigo-300">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
