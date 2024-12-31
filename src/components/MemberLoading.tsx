import React from "react";



export default function MemberLoading(){
    return(
        <>
            <div className="2xl:px-[15rem] xl:px-[10rem] lg:px-[5rem] md:px-[3rem] overflow-x-hidden mt-8 animate-pulse">
                {[1,2,3,4,5].map((index) => (
                    <div key={index} className="hidden md:grid md:grid-flow-col md:grid-cols-3 md:gap-8 mb-8">
                        <div className="col-span-2 flex lg:flex-row p-4 bg-gray-800/50 rounded-xl flex-col relative hover:shadow-2xl">
                            <div
                                className="rounded-full bg-gray-700 mr-4 place-self-center select-none md:min-w-[250px] md:min-h-[250px] w-[200px] h-[200px] pr-2"
                            ></div>
                            <div className="grid grid-flow-row ml-[2px]">
                                <h1 className="text-4xl font-bold font-outfit place-self-center bg-gray-700 w-64 h-10"></h1>
                                <p className="text-md place-self-center bg-gray-700 h-32 w-80"></p>
                            </div>
                        </div>
                        <div className="col-span-1 bg-gray-800/50 rounded-xl flex flex-col hover:shadow-2xl">
                            <div className="p-2">
                                <span className="fixed text-[#6a6fc1] pl-3 font-outfit font-semibold"></span>
                                <div className="w-full h-4 mt-3 pl-6 bg-gray-700 text-white text-sm p-2 outline-none cursor-auto">
                                </div>
                            </div>
                            <div className="p-2">
                                <span className="fixed text-[#6a6fc1] pl-3 font-outfit font-semibold"></span>
                                <div className="w-full h-4 mt-3 pl-6 bg-gray-700 text-white p-2 text-sm outline-none cursor-auto">
                                </div>
                            </div>
                            <div className="p-2">
                                <span className="fixed text-[#6a6fc1] pl-3 font-outfit font-semibold"></span>
                                <div className="w-full h-4 mt-3 pl-6 bg-gray-700 text-white p-2 text-sm outline-none cursor-auto">
                                </div>
                            </div>
                            <div className="p-2">
                                <span className="fixed text-[#6a6fc1] pl-3 font-outfit font-semibold"></span>
                                <div className="w-full h-4 mt-3 pl-6 bg-gray-700 text-white p-2 text-sm outline-none cursor-auto">
                                </div>
                            </div>
                            <div className="p-2">
                                <span className="fixed text-[#6a6fc1] pl-3 font-outfit font-semibold"></span>
                                <div className="w-full h-4 mt-3 pl-6 bg-gray-700 text-white p-2 text-sm outline-none cursor-auto">
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export function EventLoading(){
    return (
        <div className="max-w-6xl w-full mx-auto rounded-xl bg-blue-950/50 p-6">
            <div className="space-y-6">
            {[1, 2].map((item) => (
                <div key={item} className="flex flex-col md:flex-row gap-4 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-full md:w-64 h-48 bg-gray-700 rounded-lg"></div>
                <div className="flex-1 space-y-3">
                    <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                </div>
                </div>
            ))}
            </div>
        </div>
      )
}