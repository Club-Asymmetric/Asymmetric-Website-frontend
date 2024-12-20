import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

export default function Member(props: {
    name: string,
    imgSrc: string,
    description: string,
    energySource: string,
    dimension: string,
    type: string,
    hobbiesInstalled: string,
    specialFeatures: string
  }) {
    const [showImage, setShowImage] = useState(false);
  
    const handleOpen = () => {
      setShowImage(true);
      document.body.classList.add('no-scroll');
    };
  
    const handleClose = () => {
      setShowImage(false);
      document.body.classList.remove('no-scroll');
    };

const ImagePopup: React.FC = () => {
  const [currentPopup, setCurrentPopup] = useState<'stop' | 'perv'>('stop');

  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    const timer = setTimeout(() => {
        document.getElementById('stop-container')?.classList.remove('animate-rotateIn');
        document.getElementById('stop-container')?.classList.add('animate-fadeOut');
        setTimeout(() => {
            setCurrentPopup('perv');
        }, 1000);
    }, 3000);

    return () => {
        const scrollY = parseInt(document.body.style.top || '0') * -1;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.paddingRight = '';
        window.scrollTo(0, scrollY);
        clearTimeout(timer)};
  }, []);

  return (
    <div 
      className="fixed inset-0 top-0 left-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
      style={{
        top: `${typeof window !== 'undefined' ? window.scrollY : 0}px`, 
        width: '100%', 
        height: '100%'
      }}
    >
      <div className="relative grid grid-flow-row">
        {currentPopup === 'stop' && (
          <div 
            id="stop-container" 
            className="animate-rotateIn"
          >
            <Image 
              src="/elements/stop.png" 
              alt="Popup Image" 
              width={300} 
              height={300} 
            />   
            <p className="text-white text-2xl place-self-center font-outfit font-bold">
              STOPPPP
            </p>
          </div>
        )}
        
        {currentPopup === 'perv' && (
          <div 
            id="perv-container" 
            className="animate-slideup"
          >
            <Image 
              src="/elements/perv.png" 
              alt="Popup Image" 
              width={300} 
              height={300} 
            />   
            <p className="text-white text-2xl place-self-center font-outfit font-bold">
              Why you right clicking the image PERV
            </p>
          </div>
        )}
        
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 mt-2 mr-2 text-white rounded-full p-2"
        >
          X
        </button>
      </div>
    </div>
  );
};

    
    return (
        <>
            {showImage && <ImagePopup/>}
            <div className="2xl:px-[15rem] xl:px-[10rem] lg:px-[5rem] md:px-[3rem] overflow-x-hidden">
                <div className="grid grid-flow-col grid-cols-3  gap-8">
                    <div 
                        className="col-span-2 flex lg:flex-row p-4 bg-[#15144D] rounded-xl flex-col relative hover:scale-95 hover:shadow-2xl transition-all duration-500 ease-in-out animate-slideRight"
                    >
                        <Image 
                            src={props.imgSrc} 
                            alt="Placeholder" 
                            width={250} 
                            height={250} 
                            className="rounded-full md:place-self-center select-none"
                            onContextMenu={(e) => {
                                e.preventDefault();
                                handleOpen();
                                return false;
                            }}
                            draggable={false}
                            />
                        <div className="grid grid-flow-row ml-[2px]">
                            <h1 className="text-4xl font-bold font-outfit place-self-center">{props.name}</h1>
                            <p className="text-md place-self-center">
                                {props.description}
                            </p>
                        </div>
                    </div>

                    <div className="col-span-1  bg-[#15144D] rounded-xl flex flex-col hover:scale-95 hover:shadow-2xl transition-all duration-500 ease-in-out animate-slideLeft">
                        <div className="bg-gradient-to-br from-[#17193F] via-[#191B4480] to-[#3C41A5B2] rounded-t-xl h-10 pl-3 pt-2">
                            <p className="text-xl font-outfit">Info</p>
                        </div>
                        <div className="p-2">
                            <span className="fixed text-[#6a6fc1] w-full pl-3 font-outfit font-semibold">Energy Source</span>
                            <div className="w-full mt-3 pl-6 bg-[#17193F] text-white text-sm p-2 outline-none cursor-auto">
                                {props.energySource}
                            </div>
                        </div>
                        <div className="p-2">
                            <span className="fixed text-[#6a6fc1] pl-3 font-outfit font-semibold">Dimension</span>
                            <div className="w-full mt-3 pl-6 bg-[#17193F] text-white p-2 text-sm outline-none cursor-auto">
                                {props.dimension}
                            </div>
                        </div>
                        <div className="p-2">
                            <span className="fixed text-[#6a6fc1] pl-3 font-outfit font-semibold">Type</span>
                            <div className="w-full mt-3 pl-6 bg-[#17193F] text-white p-2 text-sm outline-none cursor-auto">
                                {props.type}
                            </div>
                        </div>
                        <div className="p-2">
                            <span className="fixed text-[#6a6fc1] pl-3 font-outfit font-semibold">Hobbies installed</span>
                            <div className="w-full mt-3 pl-6 bg-[#17193F] text-white p-2 text-sm outline-none cursor-auto">
                                {props.hobbiesInstalled}
                            </div>
                        </div>
                        <div className="p-2">
                            <span className="fixed text-[#6a6fc1] pl-3 font-outfit font-semibold">Special features</span>
                            <div className="w-full mt-3 pl-6 bg-[#17193F] text-white p-2 text-sm outline-none cursor-auto">
                                {props.specialFeatures}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
