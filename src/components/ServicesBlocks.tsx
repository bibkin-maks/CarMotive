import React, { SVGProps } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

interface Props {
  imageSrc?: string;
  heading?: string;
  description?: React.ReactNode;
  onLearn?: () => void;
  LearnIcon?: React.FC<SVGProps<SVGSVGElement>>;
  ScheduleIcon?: React.FC<SVGProps<SVGSVGElement>>;
  swapOrder?: boolean;
}

const DefaultLearnIcon: React.FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...p} xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M5 12h14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DefaultScheduleIcon: React.FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" {...p} xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth={2} />
    <path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </svg>
);

export default function ServiceHero({
  imageSrc = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/Vehicle Inspections.png`,
  heading = "VEHICLE INSPECTIONS",
  description = "We think that pre-trip inspections are vital if you&apos;re planning a long road trip or a camping trip, simply because we think it&apos;s a lot better to find a problem with your vehicle in a mechanic&apos;s workshop than to find out about it in the middle of nowhere.",
  onLearn,
  LearnIcon = DefaultLearnIcon,
  ScheduleIcon = DefaultScheduleIcon,
  swapOrder = false,
}: Props) {

  const handleButtons = () => {
    if (onLearn) onLearn();
  };

  return (
    <section
      aria-label="Vehicle inspection hero"
      className="relative flex flex-col lg:flex-row items-stretch w-full max-w-[1260px] 
      bg-[#05090C]
      rounded-3xl overflow-hidden mt-6 lg:mt-[50px] 
      min-h-[400px] lg:min-h-[600px] 
      shadow-[0_20px_50px_rgba(0,0,0,0.4)]
      hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)]
      transition-all duration-500
      mx-auto group isolate"
    >
      {/* Gradient Border Implementation - Blue Accent */}
      <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-[#3B82F6]/40 -z-10 group-hover:via-[#3B82F6]/20 transition-all duration-700" />

      {/* Slight Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Text column */}
      <div
        className={`flex-1 flex flex-col justify-center p-8 lg:p-16 relative z-10 ${swapOrder ? "lg:order-2" : "lg:order-1"
          }`}
      >
        {/* Engineered Corner Accents - Blue */}
        <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-[#3B82F6]/30 rounded-tl-lg" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-[#3B82F6]/30 rounded-br-lg hidden lg:block" />

        {/* Background Glow - Blue */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3B82F6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10 mt-[1rem]">
          <h2
            className="leading-[0.9] m-0 font-['Bebas_Neue',system-ui,sans-serif] text-4xl lg:text-7xl tracking-wide  mb-6
            text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 drop-shadow-sm"
          >
            {heading}
          </h2>

          <div className="font-light text-base lg:text-lg leading-relaxed text-gray-300/80 max-w-[600px]">
            {description}
          </div>
        </div>

        {/* Buttons container */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 lg:mt-12 w-full max-w-[500px]">
          <button
            onClick={handleButtons}
            className={`
              flex-1 inline-flex items-center justify-center gap-2 
              rounded-full px-6 py-4 
              border border-white/10 hover:border-[#3B82F6]/50
              bg-white/5 hover:bg-white/10
              font-medium text-sm lg:text-base text-white 
              transition-all duration-300
              backdrop-blur-sm
              ${poppins.className}
            `}
            aria-label="Learn more"
          >
            <span>Learn more</span>
            <LearnIcon className="w-4 h-4 opacity-70" />
          </button>

          <button
            onClick={handleButtons}
            className={`
              flex-[1.5] inline-flex items-center justify-center gap-2
              rounded-full px-6 py-4 
              bg-gradient-to-r from-[#BE5161] to-[#a34452]
              hover:from-[#D65D6E] hover:to-[#BE5161]
              text-white font-semibold text-sm lg:text-base tracking-wide
              shadow-[0_10px_30px_rgba(190,81,97,0.3)]
              hover:shadow-[0_10px_40px_rgba(190,81,97,0.5)]
              hover:-translate-y-0.5
              transition-all duration-300
              ${poppins.className}
            `}
            aria-label="Schedule now"
          >
            <ScheduleIcon className="w-5 h-5" />
            <span>SCHEDULE NOW</span>
          </button>
        </div>
      </div>

      {/* Image column */}
      <div
        className={`relative w-full lg:w-[45%] h-[300px] lg:h-auto overflow-hidden ${swapOrder ? "lg:order-1" : "lg:order-2"}`}
      >
        {/* Enhanced Image Blending */}
        {/* <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-[#05090C] via-[#05090C]/20 to-transparent z-10" /> */}
        <div className="absolute inset-0 bg-[#3B82F6] mix-blend-overlay opacity-0 group-hover:opacity-10 transition-opacity duration-700 z-20" />

        <Image
          src={imageSrc}
          alt="Vehicle inspection"
          fill
          className="w-full h-full object-cover transform transition-transform duration-1000 ease-out group-hover:scale-105"
        />
      </div>
    </section>
  );
}
