'use client';
import React from "react";
import Member from "@/components/Member";
import { useState,useEffect } from "react";
import Axios from "axios";

interface MemberData {
    id: string;
    name: string;
    role: string;
    photos: string[];
    description: string;
    portfolio: string;
    energySource: string;
    dimension: string;
    type: string;
    hobbiesInstalled: string;
    specialFeatures: string;
}
// "00000000000000jinbei": {
//     id: "00000000000000jinbei",
//     name: "Jinbei",
//     role: "Helmsman",
//     photos: [
//       "000000000jinbei1.jpg",
//       "000000000jinbei2.jpg",
//       "000000000jinbei3.jpg",
//       "000000000jinbei4.jpg",
//       "000000000jinbei5.jpg",
//       "000000000jinbei6.jpg",
//       "000000000jinbei7.jpg",
//       "000000000jinbei8.jpg",
//     ],
//     portfolio: "https://onepiece.fandom.com/wiki/Jinbei",
//     description:
//       "Meet Mr.Hemanth Raj – standing tall at 5'6' (on a good hair day), weighing just enough to keep gravity working, and rocking a complexion that's somewhere between 'coffee with a splash of milk' and 'golden hour glow.' A true tech wizard with a knack for making everyone laugh while debugging life's quirks! lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     energySource: "Pizza, Coffee, burger, laptop",
//     dimension: "1080 x 1440",
//     type: "Human (mostly)",
//     hobbiesInstalled: "yiu gys desid (propesional enklish)",
//     specialFeatures: "Sarcasm enabled, humor mode on",
//   },

const Page = () => {
    const [members, setMembers] = useState<MemberData[]>([]);

    const localhost = process.env.NEXT_PUBLIC_LOCALHOST;

    useEffect(() => {
        const api = Axios.create({
            baseURL: `${localhost}/api`,
        });
        const fetchData = async () => {
            try {
                const response = await api.get("/members");
                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.data;
                const membersArray = Object.values(data) as MemberData[];
                setMembers(membersArray);
                console.log(data);
            } catch (error) {
                console.error("Failed to fetch members:", error);
            } 
        }
        fetchData();
    }, []);
    return (
        <>
            <div className="min-h-screen w-screen">
                <div className="flex flex-col items-center justify-start w-full">
                    {
                        members.map((member) => (
                            <Member
                                key={member.id}
                                name={member.name}
                                description={member.description}
                                energySource={member.energySource}
                                dimension={member.dimension}
                                type={member.type}
                                imgSrc={`${localhost}/images/are/not/here/${member.photos[0]}`}
                                hobbiesInstalled={member.hobbiesInstalled}
                                specialFeatures={member.specialFeatures}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Page;