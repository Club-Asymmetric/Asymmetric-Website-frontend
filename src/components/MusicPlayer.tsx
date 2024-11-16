// src/components/MusicPlayer.tsx
"use client";
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
      console.log(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    console.log('hello')
    console.log(audioRef.current);
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      console.log(audioRef.current.duration, "duration");
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
    <div className="flex items-center justify-between text-white py-4 rounded-lg gap-4">
      <audio
        ref={audioRef}
        src="/song.mp3" // Replace with your audio file
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div className="flex items-center gap-2">
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

      <div className="flex items-center gap-2 mx-4 flex-grow">
        <span className="text-sm">{formatTime(currentTime)}</span>
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
          className="w-40 h-1 rounded-full bg-gray-300 accent-blue-500 flex-grow"
        />
        <span className="text-sm">{formatTime(duration)}</span>
      </div>

      <div className="flex items-center gap-2">
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
      <button onClick={handlePlaybackSpeed} className="flex-none flex items-center space-x-1">
        <FaClock />
        <span>{playbackSpeed}x</span>
      </button>
      <button className="p-2 ml-2 rounded-full hover:bg-gray-600">
        <FaShare />
      </button>
    </div>
  );
};

export default MusicPlayer;
