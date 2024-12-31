'use client';
import React from "react";
import Member from "@/components/Member";
import MemberLoading from "@/components/MemberLoading";
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


const Page = () => {
    const [members, setMembers] = useState<MemberData[]>([]);
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    if(loading) return <MemberLoading />

    return (
        <>
            <div className="flex flex-col items-center justify-start overflow-x-hidden">
                {members.length > 0 ? (
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
                    ))) : (
                        <div className="text-center py-10">No members available.</div>
                    )
                }
            </div>
        </>
    );
};

export default Page;