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
        openPopup: (content: { desc: string; img: string; name: string; synopsis: string; }, e: React.MouseEvent) => void;
    }
) {

    const openRegistrationPage = () =>{
        window.location.href = "/events/registration-form"
    }
    return (
        <>
            <div className="flex flex-col md:flex-row pb-[3rem] px-[2rem] animate-zoomIn">
                <img src={props.imageSrc} className="place-self-center w-fit h-fit md:w-[250px] md:h-[250px]"/>
                <div className="flex flex-col place-self-center w-full md:max-w-[58vw]">
                    <div className="flex flex-col justify-between md:flex-row lg:justify-between ml-0 md:ml-[2rem] w-full ">
                        <p className="lg:text-xl font-medium font-oswald md:text-lg text-base leading-[25px] w-full md:w-[90%] self-start">{props.synopsis}</p>
                        <p className="text-sm font-normal font-aBeeZee leading-[10px] self-start mt-2 md:mt-0 mr-10">{props.type}</p>
                    </div>
                    <p className="place-self-start text-white lg:text-[40px] md:text-3xl text-2xl font-extrabold mt-2 lg:mt-5 ml-0 md:ml-[2rem] pb-3 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text hover:text-transparent cursor-pointer transition-all duration-300 ease-in-out" 
                    onClick={(e) => props.openPopup({
                        desc : props.desc,
                        img : props.imageSrc,
                        name : props.name,
                        synopsis : props.synopsis
                        }, e)}
                    >{props.name}</p>
                    <div className="flex flex-col md:flex-row mt-[1rem]">
                        <div className="flex flex-row items-center pr-0 md:pr-[5rem]">
                            <IoCalendarOutline className="ml-0 lg:ml-[2rem] mr-[0.5rem] w-[20px] h-[20px]" />
                            <div className="text-white lg:text-lg text-sm font-medium font-outfit leading-[25px]">{props.date}</div>
                        </div>
                        <div className="flex flex-row items-center mt-2 md:mt-0">
                            <RiMapPinLine className="ml-0 lg:ml-[2rem] mr-[0.5rem] h-[20px] w-[20px]" />
                            <div className="text-white lg:text-lg text-sm font-medium font-outfit leading-[25px]">{props.location}</div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between lg:flex-row mt-2 lg:mt-[2rem]">
                        <button 
                            className="px-12 py-1 bg-[#88d0d1]/80 rounded-[5px] ml-0 md:ml-7 mx-0 md:mb-4 lg:mb-0 hover:scale-105 transition-all ease-in-out duration-300 hover:bg-white hover:text-black mt-2 md:mt-0 w-auto min-w-[200px]" 
                            onClick={(e) => props.openPopup({
                            desc : props.desc,
                            img : props.imageSrc,
                            name : props.name,
                            synopsis : props.synopsis
                            }, e)}>
                            Explore Further
                        </button>
                        <button
                        onClick={openRegistrationPage}
                        className="px-6 py-1 md:ml-7 bg-[#88d0d1]/80 rounded-[5px] hover:scale-105 transition-transform ease-in-out duration-300 hover:bg-white hover:text-black mt-2 md:mt-0 w-auto min-w-[200px]"
                        >
                        Get Involved
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
