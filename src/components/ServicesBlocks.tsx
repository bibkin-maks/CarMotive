import React, { SVGProps } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300","400", "500", "600", "700"],
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
    <path d="M5 12h14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DefaultScheduleIcon: React.FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" {...p} xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth={2} />
    <path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
  </svg>
);

export default function ServiceHero({
  imageSrc = "/image/Vehicle Inspections.png",
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
      className="flex flex-col lg:flex-row items-start w-full max-w-[1260px] bg-[#061217] rounded-2xl overflow-clip mt-6 lg:mt-[50px] gap-6 lg:gap-[90px] 
      min-h-[400px] lg:min-h-[721px] max-h-[1200px] border-[2px] border-[#28475a99] mx-auto"
    >
      {/* Text column - always first on mobile, order swaps on desktop based on prop */}
      <div
        className={`flex-1 flex flex-col justify-between p-6 lg:p-10 text-white pb-4 lg:pb-[25px] w-full ${
          swapOrder ? "lg:order-2" : "lg:order-1"
        }`}
        style={{
          height: '-webkit-fill-available'
        }}
      >
        <div className="flex-1 ">
          <h2
            className="leading-none m-0 font-['Bebas_Neue',system-ui,sans-serif] text-3xl lg:text-[46.74px] tracking-[1px]"
          >
            {heading}
          </h2>

          <div className="mt-4 lg:mt-[18px] font-bold text-base lg:text-[16.18px] leading-relaxed lg:leading-[23.4px] text-[#D1D5DB] max-w-[800px] lg:max-w-[520px]">
            {description}
          </div>
        </div>

        {/* Buttons container - sticks to bottom */}
        <div className="flex flex-col mt-6 lg:mt-[60px] w-full max-w-[400px]">
          <button
            onClick={handleButtons}
            className={`inline-flex items-center justify-center gap-2 rounded-md px-4 lg:px-[28px] py-3 lg:py-[12px] w-full lg:max-w-[400px] border-[0.9px] border-[#CE4141] 
            bg-transparent  font-semibold text-base lg:text-[16.18px] text-white cursor-pointer ${poppins.className}`}
            aria-label="Learn more"
          >
            <span>Learn more</span>
            <LearnIcon style={{ marginLeft: 8 }} />
          </button>

          <button
            onClick={handleButtons}
            className="rounded-lg px-4 lg:px-[28px] py-3 lg:py-[12px] bg-[#CE4141] text-white border-0 mt-3 lg:mt-[12px] mb-4 lg:mb-[25px] font-['Bebas_Neue',system-ui,sans-serif] font-bold text-xl lg:text-[26px] tracking-[0.5px] w-full lg:max-w-[400px] cursor-pointer"
            aria-label="Schedule now"
          >
            <ScheduleIcon className="inline-block shrink-0 text-inherit -ml-2 lg:-ml-[10px] mr-2 lg:mr-[10px] w-4 h-4 lg:w-5 lg:h-5" />
            <span>SCHEDULE NOW</span>
          </button>
        </div>
      </div>

      {/* Image column */}
      <div
        className={`flex-shrink-0 order-2 w-full lg:w-[560px] ${swapOrder ? "lg:order-1" : "lg:order-2"}`}
        style={{
          height: '-webkit-fill-available'
        }}
      >
        <img
          src={imageSrc}
          alt="Vehicle inspection"
          className="w-full h-[300px] lg:h-[100%] block rounded-none object-cover"
        />
      </div>
    </section>
  );
}