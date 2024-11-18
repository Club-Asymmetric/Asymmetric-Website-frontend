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
            <div className="flex flex-row pb-[3rem] px-[2rem] animate-zoomIn">
                <img src={props.imageSrc} className="w-[281px] h-[287px]"/>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row mt-10 ml-[2rem] w-[92%]">
                        <p className="text-2xl font-medium font-oswald leading-[25px] w-[90%] self-start">{props.synopsis}</p>
                        <p className="text-sm font-normal font-aBeeZee leading-[10px] self-start">{props.type}</p>
                    </div>
                    <p className="place-self-start text-white text-5xl font-extrabold mt-4 ml-[2rem] pb-3 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text hover:text-transparent cursor-pointer transition-all duration-300 ease-in-out" 
                        onClick={() => props.openPopup({
                            desc : props.desc,
                            img : props.imageSrc,
                            name : props.name,
                            synopsis : props.synopsis
                            })}
                    >{props.name}</p>
                    <div className="flex flex-row mt-[2rem]">
                        <div className="flex flex-row pr-[5rem]">
                            <IoCalendarOutline className="ml-[2rem] mr-[1rem] place-self-start w-[22px] h-[22px]" />
                            <div className="text-white text-xl font-medium font-outfit leading-[25px]">{props.date}</div>
                        </div>
                        <div className="flex flex-row">
                            <RiMapPinLine className="ml-[2rem] mr-[1rem] place-self-start h-[22px] w-[22px]" />
                            <div className="text-white text-xl font-medium font-outfit leading-[25px]">{props.location}</div>
                        </div>
                    </div>
                    <div className="flex flex-row mt-[2rem]">
                        <button 
                            className="px-[3rem] h-9 bg-[#88d0d1]/80 rounded-[5px] mx-[2rem] hover:scale-105 transition-all ease-in-out duration-300 hover:bg-transparent hover:outline-2 hover:outline" 
                            onClick={() => props.openPopup({
                                desc : props.desc,
                                img : props.imageSrc,
                                name : props.name,
                                synopsis : props.synopsis
                                })}>
                            Explore Further
                        </button>
                        <button onClick={openRegistrationPage}  className="px-[5rem] h-9 bg-[#88d0d1]/80 rounded-[5px] ml-[20rem] hover:scale-105 transition-transform ease-in-out duration-300 hover:bg-transparent hover:outline-2 hover:outline">
                            Get Involved
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
