import React from "react";
import { RiMapPinLine } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";

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

    const openRegistrationPage = () =>{
        window.location.href = "/events/registration-form"
    }
    return (
        <>
            <div className="flex flex-col md:flex-row pb-[3rem] px-[2rem] animate-zoomIn">
                <img src={props.imageSrc} className="place-self-center w-[70%] md:w-[250px] h-[70%] md:h-[250px]"/>
                <div className="flex flex-col w-full md:max-w-[58vw]">
                    <div className="flex flex-col md:flex-row mt-10 ml-0 lg:ml-[2rem] w-full md:w-[92%]">
                    <p className="text-2xl font-medium font-oswald leading-[25px] w-full md:w-[90%] self-start">{props.synopsis}</p>
                    <p className="text-sm font-normal font-aBeeZee leading-[10px] self-start mt-2 md:mt-0">{props.type}</p>
                    </div>
                    <p className="place-self-start text-white text-5xl font-extrabold mt-4 ml-0 lg:ml-[2rem] pb-3 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text hover:text-transparent cursor-pointer transition-all duration-300 ease-in-out" 
                    onClick={() => props.openPopup({
                        desc : props.desc,
                        img : props.imageSrc,
                        name : props.name,
                        synopsis : props.synopsis
                        })}
                    >{props.name}</p>
                    <div className="flex flex-col md:flex-row mt-[2rem]">
                    <div className="flex flex-row pr-0 md:pr-[5rem]">
                        <IoCalendarOutline className="ml-0 lg:ml-[2rem] mr-[1rem] place-self-start w-[22px] h-[22px]" />
                        <div className="text-white text-xl font-medium font-outfit leading-[25px]">{props.date}</div>
                    </div>
                    <div className="flex flex-row mt-2 md:mt-0">
                        <RiMapPinLine className="ml-0 lg:ml-[2rem] mr-[1rem] place-self-start h-[22px] w-[22px]" />
                        <div className="text-white text-xl font-medium font-outfit leading-[25px]">{props.location}</div>
                    </div>
                    </div>
                    <div className="flex flex-col lg:flex-row mt-[2rem]">
                        <button 
                            className="px-12 py-2 bg-[#88d0d1]/80 rounded-[5px] mx-0 md:mb-4 lg:mb-0 hover:scale-105 transition-all ease-in-out duration-300 hover:bg-transparent hover:outline-2 hover:outline mt-2 md:mt-0 w-auto min-w-[200px]" 
                            onClick={() => props.openPopup({
                            desc : props.desc,
                            img : props.imageSrc,
                            name : props.name,
                            synopsis : props.synopsis
                            })}>
                            Explore Further
                        </button>
                        <button
                        onClick={openRegistrationPage}
                        className="px-6 py-2 bg-[#88d0d1]/80 rounded-[5px]  ml-0 lg:ml-[8rem] xl:ml-[15rem] 2xl:ml-[20rem] hover:scale-105 transition-transform ease-in-out duration-300 hover:bg-transparent hover:outline-2 hover:outline mt-2 md:mt-0 w-auto min-w-[200px]"
                        >
                        Get Involved
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
