import React, { SVGProps, useState } from "react";

interface Props {
  imageSrc?: string;
  heading?: string;
  /** Accept string or JSX for richer descriptions */
  description?: React.ReactNode;
  /** Called when Learn more is clicked (kept as original signature) */
  onLearn?: () => void;
  onSchedule?: () => void;
  /** Optional custom icon components for buttons */
  LearnIcon?: React.FC<SVGProps<SVGSVGElement>>;
  ScheduleIcon?: React.FC<SVGProps<SVGSVGElement>>;
  /** Controlled expanded state (if provided, component becomes controlled) */
  extended?: boolean;
  /** Initial uncontrolled state (used only when `extended` is undefined) */
  initialExtended?: boolean;
  /** Notifies parent about toggles (receives new expanded value) */
  onToggle?: (extended: boolean) => void;
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
  description = "We think that pre-trip inspections are vital if you're planning a long road trip or a camping trip, simply because we think it's a lot better to find a problem with your vehicle in a mechanic's workshop than to find out about it in the middle of nowhere.",
  onLearn,
  onSchedule,
  LearnIcon = DefaultLearnIcon,
  ScheduleIcon = DefaultScheduleIcon,
  // new props:
  extended,
  initialExtended = true,
  onToggle,
}: Props) {
  const [internalExtended, setInternalExtended] = useState<boolean>(!!initialExtended);
  const isControlled = extended !== undefined;
  const isExpanded = isControlled ? extended : internalExtended;

  const toggleExpanded = () => {
    const next = !isExpanded;
    if (!isControlled) setInternalExtended(next);
    // keep original onLearn behaviour
    if (onLearn) onLearn();
    if (onToggle) onToggle(next);
  };

  // visual values you requested
  const containerWidth = isExpanded ? "1260px" : "602px";
  const gap = isExpanded ? "128px" : "63px";
  const textPaddingTop = isExpanded ? "0px" : "150px";
  const learnBtnWidth = isExpanded ? "400px" : "192.5px";
  // example: increase image size when expanded; tweak as needed
  const imageWidth = isExpanded ? "560px" : "320px";
  const btnTextSize = isExpanded? "26px" : "22px"

  return (
    <section
      aria-label="Vehicle inspection hero"
      aria-expanded={isExpanded}
      className="flex flex-col md:flex-row items-start"
      style={{
        gap,
        height: "721px",
        width: containerWidth,
        position: "relative",
        // smooth transition for main layout changes
        transition: "width 300ms ease, gap 300ms ease",
      }}
    >
      {/* Image column */}
      <div
        className="flex-shrink-0"
        style={{
          transition: "width 300ms ease",
          width: imageWidth,
        }}
      >
        <img
          src={imageSrc}
          alt="Vehicle inspection"
          style={{
            width: "100%",
            height: "721px",
            display: "block",
            borderRadius: 0,
            objectFit: "cover",
            transition: "transform 300ms ease",
          }}
        />
      </div>

      {/* Text column */}
      <div
        className="flex-1 flex flex-col justify-between"
        style={{
          height: "721px",
          paddingTop: textPaddingTop,
          color: "#FFFFFF",
          paddingBottom: "25px",
          transition: "padding-top 300ms ease",
        }}
      >
        <div>
          <h2
            className="leading-none"
            style={{
              fontFamily: "'Bebas Neue', system-ui, sans-serif",
              fontSize: 46.74,
              letterSpacing: 1,
              margin: 0,
            }}
          >
            {heading}
          </h2>

          <div
            style={{
              marginTop: 18,
              fontFamily: "'Montserrat', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 16.18,
              lineHeight: "23.4px",
              color: "#D1D5DB",
              maxWidth: 520,
            }}
          >
            {description}
          </div>
        </div>

        {/* Buttons container */}
        <div className="flex flex-col" style={{ marginTop: "auto" }}>
          <button
            onClick={toggleExpanded}
            className="rounded-md"
            aria-expanded={isExpanded}
            aria-label="Learn more"
            style={{
              padding: "12px 28px",
              border: "0.9px solid #E91D1D",
              background: "transparent",
              fontFamily: "'Montserrat', system-ui, sans-serif",
              minWidth: learnBtnWidth,
              width: learnBtnWidth,
              fontWeight: 600,
              fontSize: 16.18,
              color: "#FFFFFF",
              alignItems: "center",
              gap: 8,
              display: "inline-flex",
              justifyContent: "center",
              transition: "width 300ms ease",
            }}
          >
            <span>{isExpanded ? "Close" : "Learn more"}</span>
            <LearnIcon style={{ marginLeft: 8 }} />
          </button>

          <button
            onClick={onSchedule}
            className="rounded-lg"
            style={{
              padding: "12px 28px",
              background: "#CE4141",
              color: "#ffffff",
              border: "none",
              marginTop: "12px",
              marginBottom: "25px",
              fontFamily: "'Bebas Neue', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: btnTextSize,
              letterSpacing: 0.5,
              minWidth: learnBtnWidth,
              width: learnBtnWidth
            }}
            aria-label="Schedule now"
          >
            <ScheduleIcon style={{ display: "inline-block", flexShrink: 0, color: "inherit", marginLeft: '-10px', marginRight: '10px'}} />
            <span>SCHEDULE NOW</span>
          </button>
        </div>
      </div>
    </section>
  );
}
