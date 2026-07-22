"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FaTimes } from "react-icons/fa"; // Fallback if custom SVGs aren't preferred, but we'll use custom for luxury
import Image from "next/image";

// Navigation Data
const navigationItems = [
  { name: "Home", href: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/` },
  { name: "About", href: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/home#about` },
  { name: "Services", href: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/services` },
  { name: "Gallery", href: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/gallery` },
  { name: "Contact", href: `#contactForm` },
];

export default function TopFlyingHeader({ className }: { className?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Scroll detection for header sizing/styling
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) setIsScrolled(true);
    else if (latest <= 50 && isScrolled) setIsScrolled(false);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${className || ""}`}
      >
        <motion.div
          layout
          className={`
            relative w-full max-w-[1440px]
            flex items-center justify-between
            px-4 sm:px-8 lg:px-12
            bg-[#05090C]/60 backdrop-blur-md
            border border-white/5
            shadow-[0_8px_32px_rgba(0,0,0,0.4)]
            rounded-full
            overflow-hidden
            h-[75px] sm:h-[85px] mt-4
            group/header
          `}
        >
          {/* 1. Logo Section */}
          <div className="flex-shrink-0 z-20 flex items-center gap-4 cursor-pointer" onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}`}>
            <div className="relative group/logo">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/logo.png`}
                alt="CarMotive Logo"
                width={150}
                height={55}
                className={`
                  object-contain transition-all duration-500
                  ${isScrolled ? "h-[32px] sm:h-[35px]" : "h-[38px] sm:h-[55px]"} w-auto
                  drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]
                  group-hover/logo:scale-105 group-hover/logo:brightness-110
                `}
              />
              {/* Logo Glow Effect */}
              <div className="absolute inset-0 bg-white/20 blur-[40px] opacity-0 group-hover/logo:opacity-30 transition-opacity duration-500 rounded-full" />
            </div>
            {/* Optional Text Logo if image fails or for SEO hidden */}
            <span className="sr-only">CarMotive</span>
          </div>

          {/* 2. Desktop Navigation */}
          <nav className="hidden min-[1100px]:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2 h-full">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="
                  relative px-2 py-1
                  text-sm font-medium tracking-widest text-white/60
                  transition-all duration-300
                  hover:text-white
                  group/navitem
                "
              >
                <span className="relative z-10 font-sans uppercase text-xs">{item.name}</span>
                {/* Subtle Hover Indicator */}
                <span className="absolute -bottom-1 left-1/2 w-1 h-1 bg-[#BE5161] rounded-full transform -translate-x-1/2 scale-0 group-hover/navitem:scale-100 transition-transform duration-300" />
              </a>
            ))}
          </nav>

          {/* 3. Actions (CTA + Mobile Toggle) */}
          <div className="flex items-center gap-4 z-20">
            {/* Desktop CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const form = document.querySelector('#contactForm');
                if (form) form.scrollIntoView({ behavior: 'smooth' });
                else window.location.href = '#contactForm';
              }}
              className="
                hidden min-[1100px]:flex items-center justify-center
                relative overflow-hidden
                px-6 py-3 rounded-full
                bg-[#BE5161] text-white font-semibold text-xs tracking-widest uppercase font-sans
                border border-[#BE5161]/50
                shadow-[0_4px_20px_rgba(190,81,97,0.3)]
                transition-all duration-300
                group/cta
              "
            >
              <span className="relative z-10 flex items-center gap-2">
                Schedule Now
                <svg className="w-3.5 h-3.5 transform group-hover/cta:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              {/* Shimmer Effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            </motion.button>

            {/* Mobile Burger Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="
                min-[1100px]:hidden flex items-center justify-center
                w-10 h-10 sm:w-12 sm:h-12 rounded-full
                bg-white/5 hover:bg-white/10
                border border-white/10 hover:border-[#BE5161]/50
                text-white transition-all duration-300
                group/burger
              "
              aria-label="Open Menu"
            >
              <div className="flex flex-col gap-[5px] items-center justify-center w-6">
                <span className="w-full h-[2px] bg-white rounded-full transition-all group-hover/burger:w-3/4 group-hover/burger:bg-[#BE5161]" />
                <span className="w-3/4 h-[2px] bg-white rounded-full transition-all group-hover/burger:w-full group-hover/burger:bg-[#BE5161]" />
                <span className="w-full h-[2px] bg-white rounded-full transition-all group-hover/burger:w-3/4 group-hover/burger:bg-[#BE5161]" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </motion.header>

      {/* FULL SCREEN MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#05090C]/98 backdrop-blur-3xl"
          >
            {/* Abstract Background Elements */}
            <div className="hidden sm:block absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#BE5161]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="hidden sm:block absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#28475A]/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <span className="text-[20vw] font-display text-white/[0.02] leading-none select-none">
                MENU
              </span>
            </div>

            {/* Header in Overlay */}
            <div className="w-full flex items-center justify-between px-6 py-6 sm:px-10 mt-2 z-10">
              <div className="relative h-[40px] w-[120px]">
                <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/logo.png`} alt="Logo" fill className="object-contain opacity-90" />
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="
                   w-12 h-12 flex items-center justify-center rounded-full
                   bg-white/5 text-white border border-white/10
                   hover:bg-[#BE5161] hover:border-[#BE5161] hover:text-white
                   transition-all duration-300
                 "
              >
                <FaTimes className="text-xl" />
              </motion.button>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col items-center justify-center flex-1 gap-2 z-10">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1 + index * 0.1
                  }}
                  className=""
                >
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group/link relative block py-2"
                  >
                    <span className="
                          block text-5xl sm:text-7xl font-display text-white/50
                          transition-all duration-500 ease-out
                          group-hover/link:text-white group-hover/link:scale-105
                        ">
                      {item.name}
                    </span>
                    {/* Hover indicator */}
                    <span className="
                          absolute top-1/2 left-[-20px] -translate-y-1/2
                          w-3 h-3 rounded-full bg-[#BE5161]
                          opacity-0 -translate-x-full
                          group-hover/link:opacity-100 group-hover/link:translate-x-0
                          transition-all duration-300
                        " />
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Footer / CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-full px-6 pb-10 z-10 flex flex-col gap-6"
            >
              <div className="w-full h-[1px] bg-white/10" />
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => {
                    const form = document.querySelector('#contactForm');
                    if (form) form.scrollIntoView({ behavior: 'smooth' });
                    else window.location.href = '#contactForm';
                    setIsMobileMenuOpen(false);
                  }}
                  className="
                      w-full max-w-sm py-4 rounded-xl
                      bg-[#BE5161] text-white font-bold text-lg tracking-wide font-sans
                      shadow-[0_10px_30px_-10px_rgba(190,81,97,0.5)]
                      hover:shadow-[0_15px_40px_-5px_rgba(190,81,97,0.6)]
                      active:scale-[0.98] transition-all duration-300
                    "
                >
                  SCHEDULE APPOINTMENT
                </button>
                <p className="text-white/30 text-xs tracking-[0.2em] font-sans uppercase">
                  Driven by Excellence
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
