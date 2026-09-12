'use client';
import React from "react";
import Member from "@/components/Member";
import MemberLoading from "@/components/MemberLoading";
import { useState, useEffect, useMemo } from "react";
import { members } from "@/data/members";

interface MemberData {
    id: string;
    name: string;
    role: string;
    generation: 1 | 2 | 3;
    photos: string[];
    description: string;
    portfolio: string;
    energySource: string;
    dimension: string;
    type: string;
    hobbiesInstalled: string;
    specialFeatures: string;
}

const GENERATIONS: { value: 1 | 2 | 3; label: string }[] = [
    { value: 1, label: "1st Generation" },
    { value: 2, label: "2nd Generation" },
    { value: 3, label: "3rd Generation" },
];

// Lower rank shows first; roles matching none of these keep their existing
// relative order, listed after all ranked roles (in any order).
const ROLE_PRIORITY_RULES: { test: RegExp; priority: number }[] = [
    { test: /vice[\s-]?president/, priority: 1 },
    { test: /\bpresident\b/, priority: 0 },
    { test: /secretary/, priority: 2 },
    { test: /human resources?|hiring|\bhr\b/, priority: 3 },
    { test: /tech(nical)?\s*lead/, priority: 4 },
    { test: /coordinator/, priority: 5 },
    { test: /treasur/, priority: 6 },
    { test: /\bpr\b|marketing|public relations?/, priority: 7 },
    { test: /\bcco\b|chief communication/, priority: 8 },
    { test: /media\s*lead/, priority: 9 },
    { test: /editor/, priority: 10 },
    { test: /documentation/, priority: 11 },
];

function getRolePriority(role: string): number {
    const normalized = role.toLowerCase();
    for (const rule of ROLE_PRIORITY_RULES) {
        if (rule.test.test(normalized)) return rule.priority;
    }
    return 100;
}

const Page = () => {
    const [membersData, setMembersData] = useState<MemberData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedGeneration, setSelectedGeneration] = useState<1 | 2 | 3>(1);

    useEffect(() => {
        // Convert members object to array and set loading to false
        const membersArray = Object.values(members) as MemberData[];
        setMembersData(membersArray);
        setLoading(false);
    }, []);

    const filteredMembers = useMemo(
        () =>
            membersData
                .filter((member) => member.generation === selectedGeneration)
                .slice()
                .sort((a, b) => getRolePriority(a.role) - getRolePriority(b.role)),
        [membersData, selectedGeneration]
    );

    if (loading) return <MemberLoading />

    return (
        <>
            <div className="flex items-center justify-center mt-12 px-4">
                <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#101014] p-1">
                    {GENERATIONS.map((gen) => (
                        <button
                            key={gen.value}
                            onClick={() => setSelectedGeneration(gen.value)}
                            className={`px-4 sm:px-5 py-2 rounded-full font-outfit text-sm font-semibold transition-colors duration-300 ${
                                selectedGeneration === gen.value
                                    ? "bg-[#4f46e5] text-white"
                                    : "bg-transparent text-[#9494a3] hover:text-white"
                            }`}
                        >
                            {gen.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center justify-start overflow-x-hidden gap-8 px-4 sm:px-6 md:px-10 mt-10 mb-16">
                {filteredMembers.length > 0 ? (
                    filteredMembers.map((member, index) => (
                        <Member
                            key={member.id}
                            name={member.name}
                            role={member.role}
                            description={member.description}
                            energySource={member.energySource}
                            dimension={member.dimension}
                            type={member.type}
                            imgSrc={`/assets/images/${member.photos[0]}`}
                            hobbiesInstalled={member.hobbiesInstalled}
                            specialFeatures={member.specialFeatures}
                            reverse={index % 2 === 1}
                        />
                    ))
                ) : (
                    <div className="text-center py-10 text-[#9494a3]">No members in this generation yet.</div>
                )}
            </div>
        </>
    );
};

export default Page;
