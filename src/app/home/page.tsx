"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Hero from "@/components/Header";
import AboutSection from "@/components/Faq";
import SiteNav from "@/components/TopFlyingHeader";
import { InfoPanels } from "@/components/InfoPanels";
import ContactForm from "@/components/ContactForm";
import Backdrop from "@/components/ui/Backdrop";
import SiteFooter from "@/components/SiteFooter";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const docHeight = document.body.scrollHeight - window.innerHeight;
      /* Guard against divide-by-zero on short pages — the original wrote
         NaN into the width style before the page grew tall enough. */
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full bg-brand-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default function Home() {
  const contactRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const toggle = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const scrollTo = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    /* The `zoom: 75%` that used to wrap every page is gone. It scaled the
       whole document down while media queries kept measuring the real
       viewport, so the responsive breakpoints never lined up with what was
       on screen, and every font size was 25% smaller than authored. The
       type scale is now set at true size instead. */
    <main className="relative min-h-screen">
      <ScrollProgress />
      <Backdrop />

      <div className="relative z-10">
        <SiteNav />

        <Hero />

        {/* Section rhythm is now a consistent vertical scale rather than
            the previous mix of my-16 / mb-24 / mt-[120px] one-offs. */}
        <section className="py-20 lg:py-28" aria-label="Explore">
          <InfoPanels
            handleAbout={() => scrollTo(aboutRef)}
            handleContact={() => scrollTo(contactRef)}
          />
        </section>

        <section
          id="about"
          ref={aboutRef}
          className="scroll-mt-24 px-5 pb-20 sm:px-8 lg:pb-28"
        >
          <div className="mx-auto max-w-[1280px]">
            <AboutSection />
          </div>
        </section>

        <section
          id="contactForm"
          ref={contactRef}
          className="scroll-mt-24 px-5 pb-20 sm:px-8 lg:pb-28"
        >
          <ContactForm />
        </section>

        <SiteFooter />
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`
          fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center
          rounded-full border border-steel-700 bg-steel-850/90 text-steel-50 backdrop-blur
          transition-all duration-300 hover:border-brand-500 hover:bg-brand-600
          ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}
        `}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
        </svg>
      </button>
    </main>
  );
}
