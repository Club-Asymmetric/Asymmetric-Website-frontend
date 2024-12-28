// src/components/MusicPlayer.tsx
"use client";
import { source } from "framer-motion/client";
import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaShare, FaClock } from "react-icons/fa";

interface PropType {
  sourceFile: string;
}

const MusicPlayer: React.FC<PropType> = (sourceFile) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // Default playback speed is 1x
  // console.log(typeof sourceFile.sourceFile)
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
    handleLoadedMetadata();
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      // console.log(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    // console.log('hello')
    // console.log(audioRef.current);
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      // console.log(audioRef.current.duration, "duration");
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

  return (
<div className="flex flex-col xl:flex-row items-center justify-between text-white py-4 rounded-lg gap-4 px-4 w-full">
      <audio
        ref={audioRef}
        src={sourceFile.sourceFile}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Playback Controls */}
      <div className="flex items-center gap-2 w-full xl:w-auto justify-center">
        <button onClick={handleRewind} className="p-2 rounded-full hover:bg-gray-600">
          <FaBackward />
        </button>
        <button
          onClick={handlePlayPause}
          className="p-2 rounded-full hover:bg-gray-600"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleForward} className="p-2 rounded-full hover:bg-gray-600">
          <FaForward />
        </button>
      </div>

      {/* Progress Bar */}
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

      {/* Volume and Additional Controls */}
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
        <button className="p-2 rounded-full hover:bg-gray-600">
          <FaShare />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
