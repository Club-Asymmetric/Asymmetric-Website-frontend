"use client";

import MusicPlayer from "@/components/MusicPlayer";
import { FaYoutube, FaSpotify, FaApple } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PodcastSkeleton from "../../components/PodcastSkeleton";
import { motion } from "framer-motion";

interface PodcastData {
  id: string;
  name: string;
  guests: string[];
  description: string;
  image: string;
  mime: string;
  spotify: string;
}

const Podcast: React.FC<PodcastData> = ({ id, name, guests, description, image, mime, spotify }) => {
  const localhost = process.env.NEXT_PUBLIC_LOCALHOST;

  const guestNames = guests.join(", ");
  const sourceFile = `${localhost}/api/podcasts/${id}/stream`;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full my-10 bg-ass-gradient grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 sm:gap-8 px-5 sm:px-8 py-6 sm:py-10 rounded-xl"
    >
      <div className="flex justify-center lg:place-items-center mb-4 lg:mb-0">
        <Image
          src={`${image}`} // Assume the image is served from the /images folder
          alt={`${name} logo`}
          width={250}
          height={100}
          className="w-full sm:w-1/2 lg:w-full rounded-xl hover:scale-105 transition-all duration-300 hover:animate-pulse"
        />
      </div>
      <div className="flex flex-col gap-4 px-2 lg:px-10">
        <h1 className="text-lg sm:text-xl lg:text-3xl font-bold">{name}</h1>
        <h2 className="font-imprintMTShadow text-xs sm:text-sm lg:text-base">{guestNames}</h2>
        <p className="text-xs sm:text-sm lg:text-base">{description}</p>
        <div className="icons flex flex-cols gap-4 items-center">
          <Link href={spotify} target="_blank" className="transition-colors">
            <FaSpotify className="transition-all duration-300 w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 hover:bg-green-800 rounded-lg" />
          </Link>
        </div>
        <div className="flex items-center gap-4 relative">
          <MusicPlayer 
          sourceFile={sourceFile} 
          podcastName={name}
          spotifyLink={spotify}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState<PodcastData[]>([]);
  const [loading, setLoading] = useState(true);

  const localhost = process.env.NEXT_PUBLIC_LOCALHOST;

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch(`${localhost}/api/podcasts`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPodcasts(Object.values(data));
      } catch (error) {
        console.error("Failed to fetch podcasts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
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
      {podcasts.length > 0 ? (
        podcasts.map((podcast) => (
          <Podcast
            key={podcast.id}
            id={podcast.id}
            name={podcast.name}
            guests={podcast.guests}
            description={podcast.description}
            image={`${localhost}/images/are/not/here/${podcast.image}`}
            mime={`${localhost}/api/podcasts/${podcast.id}/stream`}
            spotify={podcast.spotify}
          />
        ))
      ) : (
        <div className="text-center py-10">No published podcasts available.</div>
      )}
    </motion.div>
  );
}