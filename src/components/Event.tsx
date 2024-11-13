import React from "react";

export default function Event(
    props: { 
        imageSrc: string;
        synopsis: string;
        name: string;
        type: string;
        date: string;
        desc: string;
        location: string;
        openPopup: (content: { desc: string; img: string; name: string; synopsis: string }) => void;
    }
) {
    return (
        <>
            <div className="flex flex-row pb-[3rem] px-[2rem] animate-zoomIn">
                <img src={props.imageSrc} className=""></img>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row mt-10 ml-[2rem] w-[80%]">
                        <p className="text-2xl font-medium font-['oswald'] leading-[25px] w-[90%] self-start">{props.synopsis}</p>
                        <p className="text-sm font-normal font-['ABeeZee'] leading-[10px] self-start">{props.type}</p>
                    </div>
                    <p className="text-white text-5xl font-extrabold font-['Outfit'] mt-4 ml-[2rem]">{props.name}</p>
                    <div className="flex flex-row mt-[2rem]">
                        <div className="flex flex-row pr-[5rem]">
                            <img src="/calendar.png" className="ml-[2rem] mr-[1rem] place-self-start" alt="date"></img>
                            <div className="text-white text-xl font-medium font-['Outfit'] leading-[25px]">{props.date}</div>
                        </div>
                        <div className="flex flex-row">
                            <img src="/map_pin.png" className="ml-[2rem] mr-[1rem] place-self-start" alt="location"></img>
                            <div className="text-white text-xl font-medium font-['Outfit'] leading-[25px]">{props.location}</div>
                        </div>
                    </div>
                    <div className="flex flex-row mt-[2rem]">
                        <button 
                            className="px-[3rem] h-9 bg-[#88d0d1]/80 rounded-[5px] mx-[2rem] hover:scale-105 transition-transform ease-in-out duration-300 hover:bg-[#88d0d1]/70" 
                            onClick={() => props.openPopup({
                                desc : props.desc,
                                img : props.imageSrc,
                                name : props.name,
                                synopsis : props.synopsis
                                })}>
                            Explore Further
                        </button>
                        <button className="px-[5rem] h-9 bg-[#88d0d1]/80 rounded-[5px] ml-[6rem] hover:scale-105 transition-transform ease-in-out duration-300 hover:bg-[#88d0d1]/70">
                            Get Involved
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
