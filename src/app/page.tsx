'use client';

import ColorText from '@/components/ColorText';
import Event from '@/components/Event';
import PodcastCard from '@/components/PodcastCard';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {

  const [isOpen, setIsOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({
    desc : "",
    img : "/Events_Placeholder.png",
    name : "Title",
    synopsis : "synopsis"
    });

  const openPopup = (content: { desc: string; img: string; name: string; synopsis: string }) => {
    setPopupContent(content);
    setIsOpen(true);
  };

  const closePopup = () => setIsOpen(false);

  return (
    <>
      <div>
        {/* AboutUs Section */}
        <div className="flex items-center justify-center my-10">
          <div className="flex flex-row items-center justify-center rounded-xl p-10 max-w-6xl bg-blue-950">
            <div className="flex-1 mb-0 ml-10">
              <h1 className="text-4xl font-bold">
                <ColorText text="Welcome to Asymmetric!" />
              </h1>
              <p className="mt-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti itaque id esse. Doloribus, iure dolores. Cupiditate est blanditiis cum, vitae quos deserunt eligendi eaque ullam qui porro eum dicta magnam?
                Sed omnis harum eveniet quas cumque id blanditiis non sunt voluptatem asperiores ab, nihil voluptate eligendi, aliquam suscipit laboriosam. Nostrum similique rem voluptatem recusandae, minus et tempore cum labore fugit!
              </p>
              <Link href='/about-us'>
              <button className="mt-6 bg-cyan-500 text-white hover:bg-white hover:text-black px-4 py-2 rounded-full transition-all duration-300">
                Dive Deeper
              </button>
              </Link>
            </div>
            <div className="flex justify-end items-center">
              <img src="Aboutus_Placeholder.png" alt="AboutUs" className="w-96" />
            </div>
          </div>
        </div>
        {/* Events Section */}
        <div className='flex flex-col w-fit rounded-xl bg-blue-950 my-20 pt-10 mx-auto'>
        <Event 
            imageSrc="/Events_Placeholder.png"
            synopsis="Event description goes here"
            name="EVENT NAME GOES HERE"
            type="Team"
            date="Jan 24, 2025"
            desc="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam, si coactum est in alienum sensum omne quicquid est, ut non intellegamus, sic omne quod est in nostris sensibus, ut non videamus, nec audiamus, nec gustemus, nec concipiamus, sensibile est."
            location="CIT Chennai, Kundrathur"
            openPopup={openPopup}
          />
          <Event 
            imageSrc="/Events_Placeholder.png"
            synopsis="Event description goes here"
            name="EVENT NAME GOES HERE"
            type="Team"
            date="Jan 24, 2025"
            desc="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam, si coactum est in alienum sensum omne quicquid est, ut non intellegamus, sic omne quod est in nostris sensibus, ut non videamus, nec audiamus, nec gustemus, nec concipiamus, sensibile est."
            location="CIT Chennai, Kundrathur"
            openPopup={openPopup}
          />
        </div>
      </div>
      {/* Global Popup for Events */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#000000b8] flex justify-center items-center animate-fadeIn transition-all duration-300 ease-in-out z-50">
          <div className="flex flex-row bg-gradient-to-br  from-[rgb(23,25,63)] via-[rgba(25,27,68,0.5)] to-[rgba(60,65,165,0.7)] w-[80%] rounded-[1rem]">
            
            <img src={popupContent.img} alt="Event" className="w-[296px] h-[348px] object-cover rounded-l-lg py-[3rem] px-[3rem]" />
            <div className='flex flex-col py-[3rem] pr-[3rem]'>
              <p className="text-2xl font-medium font-['oswald'] leading-[25px] mb-3">{popupContent.synopsis}</p>
              <p className="text-5xl font-extrabold font-['Outfit'] mb-[2rem]">{popupContent.name}</p>
              <p className='text-white text-2xl font-normal font-[Outfit] leading-7'>{popupContent.desc}</p>
            </div>
            <p className="cursor-pointer hover:scale-110 place-self-start transition-transform duration-100 ease-linear p-[1rem]" onClick={closePopup}>X</p >
          </div>
        </div>
      )}
      {/*Podcast Section*/}
      <div className='flex flex-row justify-evenly items-center -space-x-40'>
      <PodcastCard
        title="Morning Tech Talk"
        author="Jessica Page"
        description="Daily insights into the latest technology trends and innovations. lorem ipsum dolor sit amet, consectetur adipiscing elit."
        imageUrl="/PodcastFace.png"
      />
      <PodcastCard
        title="Morning Tech Talk"
        author="Jessica Page"
        description="Daily insights into the latest technology trends and innovations. lorem ipsum dolor sit amet, consectetur adipiscing elit."
        imageUrl="/PodcastFace.png"
      />
      <PodcastCard
        title="Morning Tech Talk"
        author="Jessica Page"
        description="Daily insights into the latest technology trends and innovations. lorem ipsum dolor sit amet, consectetur adipiscing elit."
        imageUrl="/PodcastFace.png"
      />
      </div>
      
    </>
  );
}
