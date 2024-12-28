import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { motion,AnimatePresence } from "framer-motion";

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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragDirection, setDragDirection] = useState(0);

  interface DragEventInfo {
    offset: {
      x: number;
    };
    velocity: {
      x: number;
    };
  }

  const handleDragEnd = (event: any, info: DragEventInfo) => {
    const threshold = 50; // minimum distance for swipe
    const velocity = 0.5; // minimum velocity for swipe

    if (info.offset.x < -threshold && info.velocity.x < -velocity && currentIndex === 0) {
      setCurrentIndex(1);
    } else if (info.offset.x > threshold && info.velocity.x > velocity && currentIndex === 1) {
      setCurrentIndex(0);
    }
  };

  const handleDrag = (event: any, info: DragEventInfo) => {
    setDragDirection(info.velocity.x);
  };

  interface Variants {
    [key: string]: any;
    enter: (direction: number) => { x: number; opacity: number };
    center: { x: number; opacity: number };
    exit: (direction: number) => { x: number; opacity: number };
  }

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0
    })
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
      className="fixed top-0 left-0 inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
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

const MainView = () => (
  <motion.div 
    key="main"
    className="col-span-2 flex lg:flex-row p-4 bg-[#15144D] rounded-xl flex-col relative hover:shadow-2xl"
    initial={{ opacity: 0 ,x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -1000 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 0.95 }}
  >
      <Image 
          src={props.imgSrc} 
          alt="Placeholder" 
          width={250} 
          height={250} 
          className="rounded-full place-self-center select-none md:min-w-[250px] md:min-h-[250px] w-[200px] h-[200px] pr-2"
          onContextMenu={(e) => {
              e.preventDefault();
              handleOpen();
              return false;
          }}
          draggable={false}
      />
      <div className="grid grid-flow-row ml-[2px]">
          <h1 className="text-4xl font-bold font-outfit place-self-center">{props.name}</h1>
          <p className="text-md place-self-center">{props.description}</p>
      </div>
  </motion.div>
);

const InfoView = () => (
  <motion.div 
    key="info"
    className="col-span-1 bg-[#15144D] rounded-xl flex flex-col hover:shadow-2xl"
    initial={{ opacity: 0 ,x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 0.95 }}
  >
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
  </motion.div>
);
 
    return (
        <>
            {showImage && <ImagePopup/>}
            <div className="2xl:px-[15rem] xl:px-[10rem] lg:px-[5rem] md:px-[3rem] overflow-x-hidden mt-8">
                <div className="hidden md:grid md:grid-flow-col md:grid-cols-3 md:gap-8">
                  <AnimatePresence>
                    <MainView key="main-view"/>
                    <InfoView key="info-view"/>
                  </AnimatePresence>
                </div>
            </div>

            <div className="md:hidden flex flex-row m w-full min-h-[80vh] overflow-hidden justify-center relative">
              <AnimatePresence initial={false} custom={dragDirection}>
                {currentIndex === 0 ? (
                  <motion.div
                    key="white-div"
                    className="absolute w-[95vw] min-h-[70vh] px-2 rounded-xl place-self-center"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDrag}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={dragDirection}
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.5 }
                    }}
                  >
                    <motion.div 
                      key="main"
                      className="col-span-2 flex lg:flex-row p-4 bg-[#15144D] rounded-xl flex-col relative hover:shadow-2xl"
                    >
                        <Image 
                            src={props.imgSrc} 
                            alt="Placeholder" 
                            width={250} 
                            height={250} 
                            className="rounded-full place-self-center select-none md:min-w-[250px] md:min-h-[250px] w-[200px] h-[200px]"
                            onContextMenu={(e) => {
                                e.preventDefault();
                                handleOpen();
                                return false;
                            }}
                            draggable={false}
                        />
                        <div className="grid grid-flow-row ml-[2px]">
                            <h1 className="text-4xl font-bold font-outfit place-self-center">{props.name}</h1>
                            <p className="text-md place-self-center">{props.description}</p>
                        </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="black-div"
                    className="absolute w-[95vw] min-h-[70vh] px-2 rounded-xl place-self-center justify-normal"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    onDrag={handleDrag}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={dragDirection}
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.5 }
                    }}
                  >
                    <motion.div 
                        key="info"
                        className="bg-[#15144D] rounded-xl flex flex-col hover:shadow-2xl place-self-"
                      >
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
                      </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pagination dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <div
                  key={0}
                  className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
                    currentIndex === 0 ? 'bg-white' : 'bg-gray-500'
                  }`}
                  onClick={() => setCurrentIndex(0)}
                />
                <div
                  key={1}
                  className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
                    currentIndex === 1 ? 'bg-white' : 'bg-gray-500'
                  }`}
                  onClick={() => setCurrentIndex(1)}
                />
              </div>
            </div>
        </>
    );
}

// 