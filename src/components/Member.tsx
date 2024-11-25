export default function Member() {
    return (
        <>
            <div className="2xl:px-[15rem] xl:px-[10rem] lg:px-[5rem] md:px-[3rem]">
                <div className="grid grid-flow-col grid-cols-3  gap-8">
                    <div className="col-span-2 flex lg:flex-row p-4 bg-[#15144D] rounded-xl md:flex-col relative hover:scale-95 hover:shadow-2xl transition-all duration-500 ease-in-out ">
                        <img src="Events_Placeholder.png" alt="Placeholder" className="w-60 h-60 rounded-full md:place-self-center" />
                        <div className="grid grid-flow-row ml-[2px]">
                            <h1 className="text-4xl font-bold font-outfit place-self-center">HEMANTH RAJ</h1>
                            <p className="text-md place-self-center">
                                Meet Mr.Hemanth Raj – standing tall at 5'6" (on a good hair day), weighing just enough
                                to keep gravity working, and rocking a complexion that's somewhere between 'coffee with a splash of milk'
                                and 'golden hour glow.' A true tech wizard with a knack for making everyone laugh while debugging life's quirks!
                            </p>
                        </div>
                    </div>

                    <div className="col-span-1  bg-[#15144D] rounded-xl flex flex-col hover:scale-95 hover:shadow-2xl transition-all duration-500 ease-in-out ">
                        <div className="bg-gradient-to-br from-[#17193F] via-[#191B4480] to-[#3C41A5B2] rounded-t-xl h-10 pl-3 pt-2">
                            <p className="text-xl font-outfit">Info</p>
                        </div>
                        <div className="p-2">
                            <span className="fixed text-[#6a6fc1] w-full pl-3 font-outfit">Energy Source</span>
                            <div className="w-full mt-3 bg-[#17193F] text-white p-2 outline-none cursor-auto">
                                Pizza, Coffee, burger, laptop
                            </div>
                        </div>
                        <div className="p-2">
                            <span className="fixed text-[#6a6fc1] pl-3 font-outfit">Dimension</span>
                            <div className="w-full mt-3 bg-[#17193F] text-white p-2 outline-none cursor-auto">
                                1080 x 1440
                            </div>
                        </div>
                        <div className="p-2">
                            <span className="fixed text-[#6a6fc1] pl-3 font-outfit">Type</span>
                            <div className="w-full mt-3 bg-[#17193F] text-white p-2 outline-none cursor-auto">
                                Human (mostly)
                            </div>
                        </div>
                        <div className="p-2">
                            <span className="fixed text-[#6a6fc1] pl-3 font-outfit">Hobbies installed</span>
                            <div className="w-full mt-3 bg-[#17193F] text-white p-2 outline-none cursor-auto">
                                yiu gys desid (propesional enklish)
                            </div>
                        </div>
                        <div className="p-2">
                            <span className="fixed text-[#6a6fc1] pl-3 font-outfit">Special features</span>
                            <div className="w-full mt-3 bg-[#17193F] text-white p-2 outline-none cursor-auto">
                                Sarcasm enabled, humor mode on
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
