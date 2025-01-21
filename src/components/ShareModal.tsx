import React from "react";
import { FaSpotify, FaYoutube, FaApple } from "react-icons/fa";

interface ShareModalProps {
  spotifyLink: string;
  youTubeLink: string;
  appleLink: string;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ spotifyLink, youTubeLink, appleLink, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-lg font-bold mb-4">Share Podcast</h2>
        <div className="flex justify-around mb-4">
          <a href={spotifyLink} target="_blank" rel="noopener noreferrer" className="text-green-500 text-3xl">
            <FaSpotify />
          </a>
          <a href={youTubeLink} target="_blank" rel="noopener noreferrer" className="text-red-500 text-3xl">
            <FaYoutube />
          </a>
          <a href={appleLink} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-3xl">
            <FaApple />
          </a>
        </div>
        <button
          onClick={onClose}
          className="block w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;