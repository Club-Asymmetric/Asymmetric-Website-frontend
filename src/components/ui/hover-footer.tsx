"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <motion.svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${Math.max(300, text.length * 60)} 100`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      animate={{ scale: hovered ? 1.006 : 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        {/* Cipher-blue sweep instead of the original rainbow, to match the
            site's navy/white/black theme. */}
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#4d6bff" />
              <stop offset="70%" stopColor="#00008b" />
              <stop offset="100%" stopColor="#000455" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>

        {/* Bloom filter so the gradient-revealed letters glow near the cursor */}
        <filter id="textGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="0.7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Soft cursor-follow spotlight blob behind the letters */}
      <motion.circle
        r="14%"
        fill="#3355cc"
        style={{ filter: "blur(26px)" }}
        initial={{ cx: "50%", cy: "50%", opacity: 0 }}
        animate={{ ...maskPosition, opacity: hovered ? 0.16 : 0 }}
        transition={{ duration: duration ?? 0, ease: "easeOut" }}
      />

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#00008b] font-[helvetica] text-7xl font-bold
        dark:stroke-[#3355cc99]"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      {/* Subtle neon flicker layer, only active while hovered */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="#4d6bff"
        strokeWidth="0.4"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
        animate={
          hovered
            ? { opacity: [0.08, 0.22, 0.1, 0.2, 0.08] }
            : { opacity: 0 }
        }
        transition={
          hovered
            ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth={hovered ? 0.35 : 0.3}
        mask="url(#textMask)"
        filter="url(#textGlow)"
        className="fill-transparent font-[helvetica] text-7xl font-bold transition-[stroke-width] duration-300"
      >
        {text}
      </text>
    </motion.svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #08080a66 50%, #00008b33 100%)",
      }}
    />
  );
};
