"use client";
import { useRef, useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import FaqSection from "@/components/Faq";
import NewHeader from "@/components/TopFlyingHeader";
import { InfoPanels } from "@/components/InfoPanels";
import ContactForm from "@/components/ContactForm";
import { Poppins } from "next/font/google"; // Keep font for now, though it might be better in layout
import "@/app/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setProgress((scrollTop / docHeight) * 100);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-900/50">
      <div
        className="h-full bg-gradient-to-r from-[#BE5161] to-[#1e3a5f] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default function Home() {
  const contactForm = useRef<HTMLDivElement>(null);
  const aboutBlock = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollContact = useCallback(() => {
    contactForm.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const scrollAbout = useCallback(() => {
    aboutBlock.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <main
      className={`${poppins.className} bg-background min-h-screen text-white relative selection:bg-[#BE5161] selection:text-white`}
      style={{ zoom: "75%" }}
    >
      <ScrollProgress />

      {/* GLOBAL BACKGROUND - Ambient Glows */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none glows-container">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] sm:w-[30vw] sm:h-[30vw] bg-[#2D222A] rounded-full blur-[120px] opacity-60 mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[40vw] sm:w-[25vw] sm:h-[25vw] bg-[#1e3a5f] rounded-full blur-[120px] opacity-40 mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] sm:w-[35vw] sm:h-[35vw] bg-[#0F2940] rounded-full blur-[100px] opacity-50 mix-blend-screen"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="relative z-50 w-full flex flex-col items-center">
          <NewHeader className="mb-4 sm:mb-8" />

        </div>

        <div className="relative z-0">
          <Header />
        </div>

        <div className="flex flex-wrap justify-center items-center p-4 my-16 sm:my-24 w-full ">
          <div className="transition-all duration-300 w-full">
            <InfoPanels handleAbout={scrollAbout} handleContact={scrollContact} />
          </div>
        </div>

        <section
          className="flex flex-wrap justify-center items-center w-full max-w-[1440px] px-4 md:px-8 mb-24 scroll-mt-20 sm:scroll-mt-28"
          id="about"
          ref={aboutBlock}
          aria-label="About section"
        >
          <FaqSection className="rounded-[20px] sm:rounded-[40px] shadow-2xl shadow-black/20" />
        </section>

        <div
          className="flex flex-wrap justify-center items-center w-full px-4 mb-20 scroll-mt-20 sm:scroll-mt-28 relative z-20"
          id="contactForm"
          ref={contactForm}
        >
          <ContactForm />
        </div>

        <footer className="w-full flex justify-center pb-10 px-4">
          <div className="flex justify-center items-center w-full max-w-[1130px] py-8 rounded-3xl border border-[#28475A] bg-[#050F15]/80 backdrop-blur-sm text-center">
            <span className="footer-text text-sm sm:text-base">
              Copyright 2025 © Carmotive | Site by OurAuto Digital
            </span>
          </div>
        </footer>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#BE5161] text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Back to top"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </main>
  );
}
