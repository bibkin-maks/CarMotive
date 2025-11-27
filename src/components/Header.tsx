"use client";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300","400", "500", "600", "700"],
});

interface HeroIntroSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  onSchedule?: () => void;
}

const Header: React.FC<HeroIntroSectionProps> = ({
  imageSrc = "/image/3d_logo_carmotive.png",
  imageAlt = "Carmotive hero",
  onSchedule
}) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const RADIUS = 200;
  const STRENGTH = 1.0;
  const SMOOTHING = 0.01;

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

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate(${nx}px, ${ny}px)`;
      }

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
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Content above bulbs */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-24">
        <div className="max-w-[1440px] pl-4 sm:pl-0 lg:pl-[115px] flex flex-col-reverse lg:flex-row items-center gap-6 sm:gap-8 lg:gap-10 relative z-10">
          {/* Left: text area */}
          <div className="flex-1 max-w-2xl w-full text-center lg:text-left">
            <div className="inline-flex items-center mb-4 sm:mb-6 justify-center lg:justify-start">
              <div
                className={`${poppins.className} flex items-center justify-center w-full max-w-[500px] sm:w-[378px] h-[45px] sm:h-[55.6px] text-[#99BACA] text-[14px] sm:text-[16px] uppercase font-bold tracking-[3.90px] sm:tracking-[4.90px] break-words border border-[#99BACA] rounded-[40.6px] px-4`}
              >
                <FontAwesomeIcon icon={faAward} className="mr-2 sm:mr-3 w-3 h-3 sm:w-4 sm:h-4" />
                10 YEARS OF EXPERIENCE
              </div>
            </div>

            <h2
              className="mt-[16px] sm:mt-[20px] text-[clamp(32px,8vw,48px)] sm:text-[clamp(48px,5vw,60px)] lg:text-[60px] font-['Bebas_Neue'] font-normal uppercase leading-[110%] text-[#FEFCFA] tracking-[3.08px] sm:tracking-[4.08px] lg:tracking-[6.08px] break-words"
            >
              Hey, we are Carmotive <span className="inline-block">👋</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"><br /></span>
              we do various services for your car.
            </h2>

            <p className={`pt-[20px] sm:pt-[30px] self-stretch text-[#e8f7fde6] text-[16px] sm:text-[18px] lg:text-[20px] font-[100] capitalize tracking-[1.08px] sm:tracking-[1.58px] lg:tracking-[2.08px] break-words leading-relaxed ${poppins.className}`}
            >
              Service &amp; Maintenance | Roadworthy Check | Brakes &amp;
              Suspension | Ignition &amp; Starting Systems | AC, Heating &amp;
              Cooling | Tyres &amp; Exhaust...
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                type="button"
                className={`transition-transform duration-200 ease-in-out hover:scale-105 
                        flex items-center justify-center gap-3 bg-[#BF6069] hover:bg-[#AE4550] 
                        text-white font-semibold px-4 py-3 rounded-[100px] w-full sm:w-[210px] 
                        max-w-[280px] sm:max-w-[210px] h-[50px] sm:h-[55px] shadow-md cursor-pointer text-[14px] sm:text-[16px] ${poppins.className}`}
                onClick={onSchedule}
              >
                <span>Schedule now</span>
              </button>

              <button
                className={`transition-transform duration-200 ease-in-out hover:scale-105 
                        flex items-center justify-center gap-3 bg-[#BF6069] hover:bg-[#AE4550] 
                        text-white font-semibold px-4 py-3 rounded-[100px] w-full sm:w-[151px] 
                        max-w-[280px] sm:max-w-[151px] h-[50px] sm:h-[55px] shadow-md cursor-pointer text-[14px] sm:text-[16px] ${poppins.className}`}
                onClick={()=>{window.location.href = '/services'}}
              >
                Services
              </button>
            </div>
          </div>

          {/* Right: hero image */}
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
                className="max-w-[280px] sm:max-w-[400px] lg:max-w-[620px] w-full h-auto rounded-2xl object-cover levitate"
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