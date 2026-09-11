import React from "react";
import { RiMapPinLine } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";

export default function Event(props: {
  imageSrc: string;
  synopsis: string;
  name: string;
  type: string;
  date: string;
  desc: string;
  location: string;
  index?: number;
  openPopup: (content: { desc: string; img: string; name: string; synopsis: string; location: string; date: string; type: string }, e: React.MouseEvent) => void;
}) {
  const openRegistrationPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = "/events/registration-form";
  };

  const cardIndex = props.index || 0;
  const isDark = cardIndex % 2 === 0;
  const rotationClass = cardIndex % 3 === 0 ? "-rotate-1" : cardIndex % 3 === 1 ? "rotate-2" : "-rotate-2";

  return (
    <div
      onClick={(e) =>
        props.openPopup(
          {
            desc: props.desc,
            img: props.imageSrc,
            name: props.name,
            synopsis: props.synopsis,
            location: props.location,
            date: props.date,
            type: props.type,
          },
          e
        )
      }
      className={`group relative p-6 md:p-8 border-2 transition-all duration-300 cursor-pointer ${rotationClass} hover:rotate-0 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(204,255,0,1)] ${
        isDark
          ? "bg-[#0a0a0a] text-white border-zinc-800 hover:border-[#00008b]"
          : "bg-[#eae8e1] text-black border-black hover:border-black"
      }`}
    >
      <div className={`flex items-center justify-between border-b pb-4 mb-6 font-mono text-xs ${isDark ? "border-zinc-800 text-zinc-400" : "border-black/20 text-black/70"}`}>
        <span className="font-bold tracking-widest text-[#00008b] bg-black px-2 py-0.5 border border-zinc-700">
          {"// " + props.type.toUpperCase()}
        </span>
        <span className="flex items-center gap-1 font-bold">
          <IoCalendarOutline className="w-3.5 h-3.5 text-[#00008b]" />
          {props.date}
        </span>
      </div>

      <div className="overflow-hidden border border-black mb-6 relative bg-zinc-900">
        <img
          src={props.imageSrc}
          alt={props.name}
          className="w-full h-48 md:h-56 object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholders/Events_Placeholder.png";
          }}
        />
        <div className="absolute top-2 left-2 bg-black/90 text-[#00008b] font-mono text-[10px] px-2 py-0.5 border border-zinc-700">
          EVENT_IMG.{cardIndex + 1}
        </div>
        <div className="absolute bottom-2 right-2 text-[#00008b] font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          EXPAND ↗
        </div>
      </div>

      <div className="space-y-3">
        <div className={`font-mono text-xs italic ${isDark ? "text-zinc-400" : "text-zinc-700"}`}>
          &quot;{props.synopsis}&quot;
        </div>

        <h3 className={`text-3xl sm:text-4xl font-black font-oswald uppercase leading-none tracking-tight transition-colors ${isDark ? "group-hover:text-[#00008b]" : "group-hover:text-black underline decoration-[#00008b] decoration-4"}`}>
          {props.name}
        </h3>

        <div className={`flex items-center gap-2 font-mono text-xs pt-2 ${isDark ? "text-zinc-400" : "text-zinc-700"}`}>
          <RiMapPinLine className="w-4 h-4 text-[#00008b]" />
          <span>{props.location}</span>
        </div>
      </div>

      <div className={`mt-6 pt-4 border-t flex items-center justify-between font-mono text-xs ${isDark ? "border-zinc-800" : "border-black/20"}`}>
        <button
          onClick={openRegistrationPage}
          className="bg-[#00008b] text-white font-bold px-4 py-2 hover:bg-white transition-colors border border-black flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          <span>GET SPOT</span>
          <span>↗</span>
        </button>

        <span className="group-hover:translate-x-1 transition-transform text-[#00008b] font-bold">
          DETAILS ↗
        </span>
      </div>
    </div>
  );
}
