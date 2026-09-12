import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Boxes, Fingerprint, Gamepad2, Sparkles } from "lucide-react";

const META_ROWS = (props: {
    energySource: string;
    dimension: string;
    type: string;
    hobbiesInstalled: string;
    specialFeatures: string;
}) => [
    { icon: Zap, label: "Energy Source", value: props.energySource },
    { icon: Boxes, label: "Dimension", value: props.dimension },
    { icon: Fingerprint, label: "Type", value: props.type },
    { icon: Gamepad2, label: "Hobbies Installed", value: props.hobbiesInstalled },
    { icon: Sparkles, label: "Special Features", value: props.specialFeatures },
];

export default function Member(props: {
    name: string,
    role?: string,
    imgSrc: string,
    description: string,
    energySource: string,
    dimension: string,
    type: string,
    hobbiesInstalled: string,
    specialFeatures: string,
    reverse?: boolean,
  }) {
    const [showImage, setShowImage] = useState(false);

    const handleOpen = () => {
      setShowImage(true);
      document.body.classList.add('no-scroll');
    };

    const handleClose = () => {
      setShowImage(false);
      document.body.classList.remove('no-scroll');
    };

const ImagePopup: React.FC = () => {
  const [currentPopup, setCurrentPopup] = useState<'stop' | 'perv'>('stop');

  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    const timer = setTimeout(() => {
        document.getElementById('stop-container')?.classList.remove('animate-rotateIn');
        document.getElementById('stop-container')?.classList.add('animate-fadeOut');
        setTimeout(() => {
            setCurrentPopup('perv');
        }, 1000);
    }, 3000);

    return () => {
        const scrollY = parseInt(document.body.style.top || '0') * -1;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.paddingRight = '';
        window.scrollTo(0, scrollY);
        clearTimeout(timer)};
  }, []);

  return (
    <div
      className="fixed top-0 left-0 inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
    >
      <div className="relative grid grid-flow-row">
        {currentPopup === 'stop' && (
          <div
            id="stop-container"
            className="animate-rotateIn"
          >
            <Image
              src="/assets/elements/stop.png"
              alt="Popup Image"
              width={300}
              height={300}
            />
            <p className="text-white text-2xl place-self-center font-outfit font-bold">
              STOPPPP
            </p>
          </div>
        )}

        {currentPopup === 'perv' && (
          <div
            id="perv-container"
            className="animate-slideup"
          >
            <Image
              src="/assets/elements/perv.png"
              alt="Popup Image"
              width={300}
              height={300}
            />
            <p className="text-white text-2xl place-self-center font-outfit font-bold">
              Why you right clicking the image PERV
            </p>
          </div>
        )}

        <button
          onClick={handleClose}
          className="absolute top-0 right-0 mt-2 mr-2 text-white rounded-full p-2"
        >
          X
        </button>
      </div>
    </div>
  );
};

    const rows = META_ROWS(props);

    return (
        <>
            {showImage && <ImagePopup />}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className={`group w-full max-w-5xl rounded-3xl border border-white/10 bg-[#101014] p-6 sm:p-9 md:p-11 hover:border-[#4f46e5]/40 transition-colors duration-300 flex flex-col md:flex-row gap-8 md:gap-10 ${
                    props.reverse ? "md:flex-row-reverse" : ""
                }`}
            >
                {/* Left 70%: photo + name + bio */}
                <div className="flex flex-col sm:flex-row gap-6 md:gap-8 md:w-[70%]">
                    <div className="shrink-0 self-center sm:self-start">
                        <div
                            className="relative w-[180px] h-[180px] md:w-[200px] md:h-[200px] rounded-[28px] overflow-hidden ring-1 ring-white/10 transition-shadow duration-300 group-hover:ring-[#4f46e5]/40 group-hover:shadow-[0_0_28px_-10px_rgba(79,70,229,0.5)] select-none"
                            onContextMenu={(e) => {
                                e.preventDefault();
                                handleOpen();
                                return false;
                            }}
                        >
                            <Image
                                src={props.imgSrc}
                                alt={props.name}
                                fill
                                sizes="200px"
                                className="object-cover select-none"
                                draggable={false}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col min-w-0">
                        <h2 className="font-outfit font-bold text-[28px] md:text-[32px] leading-tight text-[#f5f5f5]">
                            {props.name}
                        </h2>
                        {props.role && (
                            <span className="mt-3 inline-flex w-fit items-center rounded-full border border-[#4f46e5]/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#a5b4fc]">
                                {props.role}
                            </span>
                        )}
                        <div className="mt-4 mb-4 h-px w-16 bg-white/10" />
                        <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#d4d4dc] max-w-[600px]">
                            {props.description}
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-white/10 shrink-0" />

                {/* Right 30%: metadata */}
                <div className="flex flex-col md:w-[30%] md:min-w-[220px] gap-5">
                    {rows.map(({ icon: Icon, label, value }, i) => (
                        <div
                            key={label}
                            className={`pt-4 first:pt-0 ${i !== 0 ? "border-t border-white/[0.06]" : ""}`}
                        >
                            <div className="flex items-center gap-2 text-[#9494a3]">
                                <Icon size={13} strokeWidth={1.5} />
                                <span className="text-[11px] font-semibold uppercase tracking-widest">
                                    {label}
                                </span>
                            </div>
                            <p className="mt-1.5 text-[14px] text-[#f5f5f5] leading-snug">
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </>
    );
}
