// src/components/MusicPlayer.tsx
"use client";
import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaShare, FaClock, FaYoutube, FaSpotify, FaApple } from "react-icons/fa";

interface PropType {
  sourceFile: string;
  podcastName?: string;
  spotifyLink?: string;
  youtubeLink?: string;
  appleLink?: string;
}

const MusicPlayer: React.FC<PropType> = ({ sourceFile, podcastName, spotifyLink, youtubeLink, appleLink }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [popupLocation, setPopupLocation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handlePlaybackSpeed = () => {
    const speeds = [1, 1.5, 2];
    const nextSpeedIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const newSpeed = speeds[nextSpeedIndex];
    setPlaybackSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleShare = (e: React.MouseEvent) => {
    setPopupLocation({ x: e.clientX, y: e.clientY });
    setIsShareOpen(true);
  };

  const closeSharePopup = () => {
    setIsShareOpen(false);
  };

  const handlePopupContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isShareOpen) {
        setIsShareOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isShareOpen]);

  useEffect(() => {
    if (isShareOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isShareOpen]);

  return (
    <>
      <div className="flex flex-col xl:flex-row items-center justify-between text-white py-4 rounded-lg gap-4 px-4 w-full animate-zoomIn">
        <audio
          ref={audioRef}
          src={sourceFile}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />

        <div className="flex items-center gap-2 w-full xl:w-auto justify-center">
          <button onClick={handleRewind} className="p-2 rounded-full hover:bg-gray-600">
            <FaBackward />
          </button>
          <button onClick={handlePlayPause} className="p-2 rounded-full hover:bg-gray-600">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={handleForward} className="p-2 rounded-full hover:bg-gray-600">
            <FaForward />
          </button>
        </div>

        <div className="flex items-center gap-2 mx-4 w-full xl:flex-grow">
          <span className="text-lg min-w-[40px]">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime = Number(e.target.value);
              }
            }}
            className="w-full h-1 rounded-full bg-gray-300 accent-blue-500"
          />
          <span className="text-lg min-w-[40px]">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center gap-4 w-full xl:w-auto justify-center xl:justify-end">
          <div className="hidden xl:flex items-center gap-2">
            <FaVolumeUp />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 rounded-full bg-gray-300 accent-blue-500"
            />
          </div>
          <button onClick={handlePlaybackSpeed} className="flex items-center space-x-1">
            <FaClock />
            <span>{playbackSpeed}x</span>
          </button>
          <button onClick={handleShare} className="p-2 rounded-full hover:bg-gray-600">
            <FaShare />
          </button>
        </div>
      </div>

      {isShareOpen && (
        <motion.div 
          className="fixed bg-[#000000b8] flex justify-center items-center z-50 overflow-hidden"
          style={{
            top: `${window.scrollY}px`,
            left: '0',
            right: '0',
            width: window.innerWidth + "px",
            height: window.innerHeight + "px"
          }}
          onClick={closeSharePopup}
        >
          <motion.div 
            className="relative flex flex-col bg-gradient-to-br from-[rgb(23,25,63)] via-[rgba(25,27,68,1)] to-[rgba(60,65,165,1)] p-6 sm:p-8 rounded-lg max-w-xs sm:max-w-sm w-full mx-4"
            onClick={handlePopupContentClick}
            initial={{ opacity: 0, scale: 0, y: popupLocation.y-400, x: popupLocation.x-800 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <button 
              className="absolute top-2 right-2 text-white hover:scale-110 transition-transform duration-100 ease-linear p-2"
              onClick={closeSharePopup}
              aria-label="Close popup"
            >
              ✕
            </button>
        
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-center text-white">Share {podcastName}</h3>
            
            <div className="flex gap-4 sm:gap-6 justify-center">
              {spotifyLink && (
                <a href={spotifyLink} target="_blank" rel="noopener noreferrer" 
                  className="flex flex-col items-center text-white hover:text-green-400 transition-colors">
                  <FaSpotify className="w-6 sm:w-8 h-6 sm:h-8 mb-2" />
                  <span className="text-sm sm:text-base">Spotify</span>
                </a>
              )}
              
              {youtubeLink && (
                <a href={youtubeLink} target="_blank" rel="noopener noreferrer" 
                  className="flex flex-col items-center text-white hover:text-red-500 transition-colors">
                  <FaYoutube className="w-6 sm:w-8 h-6 sm:h-8 mb-2" />
                  <span className="text-sm sm:text-base">YouTube</span>
                </a>
              )}
              
              {appleLink && (
                <a href={appleLink} target="_blank" rel="noopener noreferrer" 
                  className="flex flex-col items-center text-white hover:text-gray-300 transition-colors">
                  <FaApple className="w-6 sm:w-8 h-6 sm:h-8 mb-2" />
                  <span className="text-sm sm:text-base">Apple</span>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default MusicPlayer;
