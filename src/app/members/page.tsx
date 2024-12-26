'use client';
import React from "react";
import Member from "@/components/Member";

const Page = () => {
    return (
        <>
            <div className="min-h-screen w-screen">
                <div className="flex flex-col items-center justify-start w-full">
                    <Member 
                        name="HEMANTH RAJ" 
                        description="Meet Mr.Hemanth Raj – standing tall at 5'6' (on a good hair day), weighing just enough
                                to keep gravity working, and rocking a complexion that's somewhere between 'coffee with a splash of milk'
                                and 'golden hour glow.' A true tech wizard with a knack for making everyone laugh while debugging life's quirks! lorem
                                ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        imgSrc="/placeholders/Events_Placeholder.png"
                        energySource="Pizza, Coffee, burger, laptop"
                        dimension="1080 x 1440"
                        type="Human (mostly)"
                        hobbiesInstalled="yiu gys desid (propesional enklish)"
                        specialFeatures="Sarcasm enabled, humor mode on"
                    />
                    <Member 
                        name="HEMANTH RAJ" 
                        description="Meet Mr.Hemanth Raj – standing tall at 5'6' (on a good hair day), weighing just enough
                                to keep gravity working, and rocking a complexion that's somewhere between 'coffee with a splash of milk'
                                and 'golden hour glow.' A true tech wizard with a knack for making everyone laugh while debugging life's quirks!"
                        imgSrc="/placeholders/Events_Placeholder.png"
                        energySource="Pizza, Coffee, burger, laptop"
                        dimension="1080 x 1440"
                        type="Human (mostly)"
                        hobbiesInstalled="yiu gys desid (propesional enklish)"
                        specialFeatures="Sarcasm enabled, humor mode on"
                    />
                </div>
            </div>
        </>
    );
};

export default Page;