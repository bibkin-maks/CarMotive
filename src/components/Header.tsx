"use client";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

interface HeroIntroSectionProps {
  imageSrc?: string;
  imageAlt?: string;
}

const Header: React.FC<HeroIntroSectionProps> = ({
  imageSrc = "/image/3d_logo_carmotive.png",
  imageAlt = "Carmotive hero",
}) => {
  // optional visible state for debugging / readout
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // refs
  const imageRef = useRef<HTMLImageElement | null>(null); // used to measure image center
  const wrapperRef = useRef<HTMLDivElement | null>(null); // used to apply JS transform
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // tuning
  const RADIUS = 200; // how far the mouse influences the repulse
  const STRENGTH = 1.0; // push multiplier
  const SMOOTHING = 0.01; // lerp (0..1) lower = smoother

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const imgCx = rect.left + rect.width / 2;
      const imgCy = rect.top + rect.height / 2;

      const dx = imgCx - e.clientX;
      const dy = imgCy - e.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const influence = Math.max(0, (RADIUS - distance) / RADIUS);

      if (influence > 0) {
        const nx = dx / (distance || 1);
        const ny = dy / (distance || 1);

        const push = influence * RADIUS * STRENGTH * 0.6;
        const targetX = nx * push;
        const targetY = ny * push;

        targetRef.current.x = targetX;
        targetRef.current.y = targetY;
      } else {
        targetRef.current.x = 0;
        targetRef.current.y = 0;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      const cx = currentRef.current.x;
      const cy = currentRef.current.y;
      const tx = targetRef.current.x;
      const ty = targetRef.current.y;

      const nx = cx + (tx - cx) * SMOOTHING;
      const ny = cy + (ty - cy) * SMOOTHING;

      currentRef.current.x = nx;
      currentRef.current.y = ny;

      // apply transform to wrapper (so img child animation can run independently)
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate(${nx}px, ${ny}px)`;
      }

      // update react state occasionally to keep things in sync
      if (Math.abs(nx - pos.x) > 0.5 || Math.abs(ny - pos.y) > 0.5) {
        setPos({ x: nx, y: ny });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run on mount only

  return (
    <section className="relative w-full overflow-hidden">
      {/* Content above bulbs */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-[1440px] pl-[115px] flex flex-col-reverse lg:flex-row items-center gap-10 relative z-10">
          {/* Left: text area */}
          <div className="flex-1 max-w-2xl w-full text-left">
            <div className="inline-flex items-center mb-6">
              <div
                className="flex items-center justify-center text-[#99BACA] text-[14.40px] uppercase font-bold tracking-[4.90px] break-words"
                style={{
                  width: "378px",
                  height: "45.6px",
                  fontWeight: 700,
                  fontSize: "16.0px",
                  border: "1px solid",
                  borderRadius: "21.6px",
                }}
              >
                <FontAwesomeIcon icon={faAward} className="mr-3" />
                10 YEARS OF EXPERIENCE
              </div>
            </div>

            <h2
              style={{
                color: "#FEFCFA",
                fontSize: 60,
                fontFamily: "Bebas Neue",
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: 6.08,
                lineHeight: "110%",
                marginTop: "20px",
                wordWrap: "break-word",
              }}
              className="text-[clamp(28px,4.5vw,64px)] sm:text-[clamp(36px,5.2vw,72px)] font-[Bebas_Neue] uppercase font-normal leading-tight text-white tracking-wide"
            >
              Hey, we are Carmotive <span className="inline-block">👋</span>
              <br className="hidden sm:block" />
              we do various services for your car.
            </h2>

            <p
              style={{
                paddingTop: "30px",
                alignSelf: "stretch",
                color: "#e8f7fde6",
                fontSize: "20px",
                fontFamily: "'Montserrat', system-ui, sans-serif",
                fontWeight: 100,
                textTransform: "capitalize",
                letterSpacing: "2.08px",
                wordWrap: "break-word",
              }}
            >
              Service &amp; Maintenance | Roadworthy Check | Brakes &amp;
              Suspension | Ignition &amp; Starting Systems | AC, Heating &amp;
              Cooling | Tyres &amp; Exhaust...
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="
transition-transform duration-200 ease-in-out hover:scale-105 
                        flex items-center justify-center gap-3 bg-[#BF6069] hover:bg-[#AE4550] 
                        text-white font-semibold px-4 py-3 rounded-[100px] w-[210px] 
                        max-w-[210px] h-[55px] shadow-md cursor-pointer"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                <span>Schedule now</span>
              </button>

              <button
                className="transition-transform duration-200 ease-in-out hover:scale-105 
                        flex items-center justify-center gap-3 bg-[#BF6069] hover:bg-[#AE4550] 
                        text-white font-semibold px-4 py-3 rounded-[100px] w-[151px] h-[55px] shadow-md cursor-pointer"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                Services
              </button>
            </div>
          </div>

          {/* Right: hero image - wrapper gets JS transform, img gets levitate animation */}
          <div className="w-full lg:w-1/2 max-w-xl flex-shrink-0 flex justify-center lg:justify-end relative z-20">
            <div
              ref={wrapperRef}
              style={{ willChange: "transform" }}
              className="relative"
              aria-hidden="false"
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                ref={imageRef}
                className="max-w-[620px] sm:w-full h-auto rounded-2xl object-cover levitate"
                style={{ display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
