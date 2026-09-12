import React from "react";



export default function MemberLoading(){
    return(
        <>
            <div className="flex justify-center mt-12 px-4">
                <div className="h-11 w-72 rounded-full bg-[#101014] border border-white/10 animate-pulse" />
            </div>
            <div className="flex flex-col items-center gap-8 px-4 sm:px-6 md:px-10 mt-10 mb-16 animate-pulse">
                {[1, 2, 3].map((index) => (
                    <div
                        key={index}
                        className="w-full max-w-5xl rounded-3xl border border-white/10 bg-[#101014] p-6 sm:p-9 md:p-11 flex flex-col md:flex-row gap-8 md:gap-10"
                    >
                        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 md:w-[70%]">
                            <div className="shrink-0 self-center sm:self-start rounded-[28px] bg-white/5 w-[180px] h-[180px] md:w-[200px] md:h-[200px]" />
                            <div className="flex flex-col min-w-0 w-full gap-3">
                                <div className="h-8 w-48 rounded bg-white/5" />
                                <div className="h-5 w-28 rounded-full bg-white/5" />
                                <div className="h-px w-16 bg-white/10 my-1" />
                                <div className="h-4 w-full max-w-[500px] rounded bg-white/5" />
                                <div className="h-4 w-full max-w-[460px] rounded bg-white/5" />
                                <div className="h-4 w-2/3 max-w-[300px] rounded bg-white/5" />
                            </div>
                        </div>
                        <div className="hidden md:block w-px bg-white/10 shrink-0" />
                        <div className="flex flex-col md:w-[30%] md:min-w-[220px] gap-5">
                            {[1, 2, 3, 4, 5].map((row) => (
                                <div key={row} className={`pt-4 first:pt-0 ${row !== 1 ? "border-t border-white/[0.06]" : ""}`}>
                                    <div className="h-3 w-24 rounded bg-white/5" />
                                    <div className="h-4 w-32 rounded bg-white/5 mt-2" />
                                </div>
                            ))}
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
