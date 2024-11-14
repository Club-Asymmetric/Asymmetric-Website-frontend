'use client';

import Event from '@/components/Event';
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
        <h1>Home</h1>
        <div className='flex justify-center'>
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
      {/* Global Popup */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#000000b8] flex justify-center items-center animate-fadeIn transition-all duration-300 ease-in-out z-50">
          <div className="flex flex-row bg-gradient-to-br  from-[rgb(23,25,63)] via-[rgba(25,27,68,0.5)] to-[rgba(60,65,165,0.7)] w-[80%] rounded-[1rem]">
            
            <img src={popupContent.img} alt="Event" className="w-[50%] h-[50%] object-cover rounded-l-lg py-[3rem] px-[3rem]" />
            <div className='flex flex-col py-[3rem] pr-[3rem]'>
              <p className="text-2xl font-medium font-['oswald'] leading-[25px] mb-3">{popupContent.synopsis}</p>
              <p className="text-5xl font-extrabold font-['Outfit'] mb-[2rem]">{popupContent.name}</p>
              <p className='text-white text-2xl font-normal font-[Outfit] leading-7'>{popupContent.desc}</p>
            </div>
            <p className="cursor-pointer hover:scale-110 place-self-start transition-transform duration-100 ease-linear p-[1rem]" onClick={closePopup}>X</p >
          </div>
        </div>
      )}
    </>
  );
}
