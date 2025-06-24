'use client';
import React from "react";
import Member from "@/components/Member";
import MemberLoading from "@/components/MemberLoading";
import { useState,useEffect } from "react";
import { members } from "@/data/members";

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


const Page = () => {
    const [membersData, setMembersData] = useState<MemberData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Convert members object to array and set loading to false
        const membersArray = Object.values(members) as MemberData[];
        setMembersData(membersArray);
        setLoading(false);
    }, []);
    if(loading) return <MemberLoading />

    return (
        <>
            <div className="flex flex-col items-center justify-start overflow-x-hidden">                {membersData.length > 0 ? (
                    membersData.map((member) => (
                        <Member
                            key={member.id}
                            name={member.name}
                            description={member.description}
                            energySource={member.energySource}
                            dimension={member.dimension}
                            type={member.type}
                            imgSrc={`/images/${member.photos[0]}`}
                            hobbiesInstalled={member.hobbiesInstalled}
                            specialFeatures={member.specialFeatures}
                        />
                    ))) : (
                        <div className="text-center py-10">No members available.</div>
                    )
                }
            </div>
        </>
    );
};

export default Page;