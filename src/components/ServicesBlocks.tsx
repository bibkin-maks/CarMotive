import React, { SVGProps } from "react";
import Image from "next/image";

interface Props {
  imageSrc?: string;
  heading?: string;
  description?: React.ReactNode;
  onLearn?: () => void;
  LearnIcon?: React.FC<SVGProps<SVGSVGElement>>;
  ScheduleIcon?: React.FC<SVGProps<SVGSVGElement>>;
  swapOrder?: boolean;
}

const CARD_BG = "#05090C";

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
  description = "We think that pre-trip inspections are vital if you're planning a long road trip or a camping trip, simply because we think it's a lot better to find a problem with your vehicle in a mechanic's workshop than to find out about it in the middle of nowhere.",
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
      aria-label={`${heading} service`}
      className="group relative mx-auto mt-6 flex w-full max-w-[1260px] flex-col items-stretch
                 overflow-hidden rounded-[28px] border border-white/10 bg-[#05090C]
                 transition-shadow duration-500 lg:mt-[50px] lg:min-h-[560px] lg:flex-row"
      style={{
        boxShadow: `
          0 20px 60px rgba(190, 81, 97, 0.12),
          inset 0 1px 0 rgba(255,255,255,0.08)
        `,
      }}
    >
      {/* Text column */}
      <div
        className={`relative z-10 flex flex-1 flex-col justify-center p-8 lg:p-14
                    ${swapOrder ? "lg:order-2" : "lg:order-1"}`}
      >
        <h2 className="m-0 font-display text-4xl leading-[0.95] tracking-wide text-white lg:text-6xl">
          {heading}
        </h2>

        <span className="mt-5 block h-1 w-16 rounded-full bg-[#BE5161]" />

        <div className="mt-7 max-w-[620px] text-base font-light leading-relaxed text-gray-300/85 lg:text-lg">
          {description}
        </div>

        <div className="mt-9 flex w-full max-w-[480px] flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={handleButtons}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full
                       border border-white/20 px-6 py-3.5 text-sm font-semibold text-white
                       transition-colors duration-300 hover:border-white/50 hover:bg-white/[0.04]
                       lg:text-base"
            aria-label={`Learn more about ${heading}`}
          >
            <span>Learn more</span>
            <LearnIcon className="h-4 w-4 opacity-70" />
          </button>

          <button
            type="button"
            onClick={handleButtons}
            className="inline-flex flex-[1.4] items-center justify-center gap-2 rounded-full
                       border border-[#BE5161]/50 bg-[#BE5161] px-6 py-3.5
                       text-sm font-semibold tracking-wide text-white
                       shadow-[0_4px_20px_rgba(190,81,97,0.3)]
                       transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]
                       motion-reduce:transition-none motion-reduce:hover:scale-100
                       lg:text-base"
            aria-label={`Contact us about ${heading}`}
          >
            <ScheduleIcon className="h-5 w-5" />
            <span>Contact us</span>
          </button>
        </div>
      </div>

      {/* Image column */}
      <div
        className={`relative h-[280px] w-full overflow-hidden lg:h-auto lg:w-[45%]
                    ${swapOrder ? "lg:order-1" : "lg:order-2"}`}
      >
        <Image
          src={imageSrc}
          alt={`${heading} at the Carmotive workshop`}
          fill
          loading="lazy"
          quality={85}
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-cover transition-transform duration-1000 ease-out
                     group-hover:scale-105 motion-reduce:transform-none"
        />

        {/* Seam: the photo fades into the panel on whichever side the panel
            actually sits, so the join reads as one surface rather than a
            pasted-in rectangle. Stacked, the panel is above; side by side it
            is left or right depending on swapOrder. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:hidden"
          style={{
            background: `linear-gradient(to bottom, ${CARD_BG} 0%, ${CARD_BG}00 42%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{
            background: `linear-gradient(to ${swapOrder ? "left" : "right"}, ${CARD_BG} 0%, ${CARD_BG}66 22%, ${CARD_BG}00 55%)`,
          }}
        />
      </div>
    </section>
  );
}
