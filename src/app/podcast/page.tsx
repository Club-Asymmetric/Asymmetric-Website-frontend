"use client";

import MusicPlayer from "@/components/MusicPlayer";
import { FaYoutube, FaSpotify, FaApple } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PodcastSkeleton from "../../components/PodcastSkeleton";
import { motion } from "framer-motion";
import { podcasts } from "@/data/podcasts";

interface PodcastData {
  id: string;
  name: string;
  publish: boolean;
  guests: string[];
  description: string;
  image: string;
  audioSrc: string;
  spotify: string;
  releaseDate: string;
}

const Podcast: React.FC<PodcastData> = ({ name, guests, description, image, audioSrc, spotify, releaseDate }) => {
  const guestNames = guests.join(", ");

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full my-10 bg-ass-gradient grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 sm:gap-8 px-5 sm:px-8 py-6 sm:py-10 rounded-xl"
    >
      <div className="flex justify-center lg:place-items-center mb-4 lg:mb-0">
        <Image
          src={image}
          alt={`${name} logo`}
          width={250}
          height={100}
          className="w-full sm:w-1/2 lg:w-full rounded-xl hover:scale-105 transition-all duration-300 hover:animate-pulse"
        />
      </div>
      <div className="flex flex-col gap-4 px-2 lg:px-10">
        <h1 className="text-lg sm:text-xl lg:text-3xl font-bold">{name}</h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-zinc-400">
          {guestNames && <span className="font-imprintMTShadow text-xs sm:text-sm lg:text-base text-white">{guestNames}</span>}
          <span>
            {new Date(releaseDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          </span>
        </div>
        <p className="text-xs sm:text-sm lg:text-base">{description}</p>
        <div className="icons flex flex-cols gap-4 items-center">
          <Link href={spotify} target="_blank" className="transition-colors">
            <FaSpotify className="transition-all duration-300 w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 hover:bg-green-800 rounded-lg" />
          </Link>
        </div>
        <div className="flex items-center gap-4 relative">
          {audioSrc ? (
            <MusicPlayer
              sourceFile={audioSrc}
              podcastName={name}
              spotifyLink={spotify}
            />
          ) : (
            <iframe
              title={`${name} on Spotify`}
              src={`https://open.spotify.com/embed/episode/${spotify.split("/episode/")[1]}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              style={{ border: 0, borderRadius: 12 }}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function Podcasts() {
  const [podcastsData, setPodcastsData] = useState<PodcastData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Convert podcasts object to array and set loading to false
    const podcastsArray = Object.values(podcasts) as PodcastData[];
    // Filter only published podcasts
    const publishedPodcasts = podcastsArray.filter(podcast => podcast.publish);
    setPodcastsData(publishedPodcasts);
    setLoading(false);
  }, []);
  if (loading) {
    return <div className="w-[95%] lg:w-[80%] mx-auto">
      <PodcastSkeleton />
    </div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[95%] lg:w-[80%] mx-auto"
    >
      <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
          Featured Episodes
        </h1>
        <Link
          href="https://open.spotify.com/show/0iMKRNbZOWxKWIAUYD7T0C"
          target="_blank"
          className="flex items-center gap-2 bg-ass-button text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition-all duration-300"
        >
          <FaSpotify className="w-4 h-4" />
          Listen on Spotify
        </Link>
      </div>
      {podcastsData.length > 0 ? (
        podcastsData.map((podcast) => (
          <Podcast
            key={podcast.id}
            id={podcast.id}
            name={podcast.name}
            publish={podcast.publish}
            guests={podcast.guests}
            description={podcast.description}
            image={podcast.image}
            audioSrc={podcast.audioSrc}
            spotify={podcast.spotify}
            releaseDate={podcast.releaseDate}
          />
        ))
      ) : (
        <div className="text-center py-10">No published podcasts available.</div>
      )}
    </motion.div>
  );
}