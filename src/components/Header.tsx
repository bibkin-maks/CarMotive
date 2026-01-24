"use client";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { Poppins } from "next/font/google";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

interface HeroIntroSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  onSchedule?: () => void;
}

const Header: React.FC<HeroIntroSectionProps> = ({
  imageSrc = "/image/3d_logo_carmotive.png",
  imageAlt = "Carmotive hero",
  onSchedule,
}) => {
  // --- Mouse Parallax / Magnetic Effect using Framer Motion ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the image movement
  const springConfig = { damping: 25, stiffness: 150 }; // Smooth and floaty
  const rotateX = useSpring(useTransform(y, [-300, 300], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-300, 300], [-10, 10]), springConfig);
  const moveX = useSpring(useTransform(x, [-300, 300], [-20, 20]), springConfig);
  const moveY = useSpring(useTransform(y, [-300, 300], [-20, 20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2, // Small delay to let page load
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    },
  };

  return (
    <section
      className="relative w-full "
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background ambient element */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-20 lg:mr-[-100px]">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20 relative z-10">

          {/* Left: Text Content - STAGGERED ANIMATION */}
          <motion.div
            className="flex-1 w-full text-center lg:text-left flex flex-col items-center lg:items-start"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >

            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center lg:justify-start mb-6">
              <div
                className={`${poppins.className} flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#99BACA]/40 bg-[#99BACA]/5 backdrop-blur-sm text-[#99BACA] text-sm sm:text-base font-bold tracking-[0.15em] uppercase shadow-sm transition hover:bg-[#99BACA]/10 hover:border-[#99BACA]/60`}
              >
                <FontAwesomeIcon icon={faAward} className="text-base" />
                <span>10 Years of Experience</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={itemVariants} className="font-['Bebas_Neue'] text-5xl sm:text-7xl lg:text-[90px] leading-[0.95] tracking-wide text-white drop-shadow-lg mb-6">
              Hey, we are <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BE5161] to-[#E67D8C]">Carmotive</span>
              <motion.span
                className="inline-block ml-4"
                animate={{ rotate: [0, 20, 0, 20, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >
                👋
              </motion.span>
            </motion.h1>

            {/* Subtitle - Responsive Flex Layout */}
            <motion.div
              variants={itemVariants}
              className={`flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-2 text-base sm:text-xl lg:text-2xl text-blue-100/80 font-light max-w-2xl leading-relaxed mb-8 sm:mb-10 ${poppins.className}`}
            >
              {[
                "Service & Maintenance",
                "Roadworthy Check",
                "Brakes & Suspension",
                "AC & Cooling"
              ].map((item, index, array) => (
                <div key={item} className="flex items-center">
                  <span>{item}</span>
                  {index < array.length - 1 && (
                    <span className="text-white/20 ml-3 hidden sm:inline">|</span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
              {/* Primary Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const form = document.querySelector('#contactForm');
                  if (form) form.scrollIntoView({ behavior: 'smooth' });
                  else window.location.href = '#contactForm';
                }}
                className="
                flex items-center justify-center
                relative overflow-hidden
                px-8 py-4 sm:py-5 rounded-full
                bg-[#BE5161] text-white font-semibold  tracking-wide
                border border-[#BE5161]/50
                shadow-[0_4px_20px_rgba(190,81,97,0.3)]
                transition-all duration-300
                w-full sm:w-auto
                group/cta
              "
              >
                <span className="relative z-10 flex items-center gap-2 font-['Poppins']">
                  Schedule Now
                  <svg className="w-4 h-4 transform group-hover/cta:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                {/* Shimmer Effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </motion.button>

              {/* Secondary Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`group bg-transparent border border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-full w-full sm:w-auto min-w-[160px] transition-colors ${poppins.className}`}
                onClick={() => {
                  window.location.href = "/services";
                }}
              >
                <span className="text-lg">Services</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: Hero Image - FLOATING ANIMATION */}
          <motion.div
            className="w-full lg:w-[45%] flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{
              rotateX,
              rotateY,
              x: moveX,
              y: moveY,
              perspective: 1000
            }}
          >
            <div className="relative z-10">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full max-w-[320px] sm:max-w-[480px] lg:max-w-[700px] h-auto object-contain drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
              />

              {/* Decorative radial gradient behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 rounded-full blur-[80px] -z-10 pointer-events-none mix-blend-screen animate-pulse-slow"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Header;