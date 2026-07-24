"use client";
import { useEffect, useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import NewHeader from "@/components/TopFlyingHeader";
import ContactForm from "@/components/ContactForm";
import Gallery from "@/components/Gallery";
import "@/app/globals.css";

type ImageItem = {
  src: string;
  alt?: string;
  caption?: string;
};

const FloatingParticles = () => {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Decorative only — skip on phones/touch devices to spare the main thread.
    setEnabled(window.matchMedia("(min-width: 640px) and (pointer: fine)").matches);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 10 }).map(() => ({
      x: [Math.random() * 100, Math.random() * 100],
      y: [Math.random() * 100, Math.random() * 100],
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1
    }));
  }, []);

  if (!enabled || reduceMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{
            x: [`${p.x[0]}vw`, `${p.x[1]}vw`],
            y: [`${p.y[0]}vh`, `${p.y[1]}vh`],
            opacity: [0, p.opacity, 0],
            scale: [0, p.scale, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
            delay: p.delay
          }}
          className="absolute w-1.5 h-1.5 bg-white/20 rounded-full blur-[1px]"
          style={{ left: 0, top: 0 }}
        />
      ))}
    </div>
  );
};

// Luxury Background Component
const LuxuryBackground = () => (
  <div
    className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    style={{ transform: "translateZ(0)" }}
  >
    {/* Dark base background */}
    <div className="absolute inset-0 bg-[#0e141a]" />

    {/* Primary gradient orb — static. Animating a 120px blur re-rasterised the
        whole bitmap every frame, which was the main scroll-jank source. */}
    <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-br from-[#BE5161] via-purple-900/40 to-blue-900/40 rounded-full blur-[120px] opacity-[0.18]" />

    {/* Secondary orb — static */}
    <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-blue-900/30 via-transparent to-emerald-900/20 rounded-full blur-[100px] opacity-[0.12]" />

    {/* Dynamic Flying Particles (desktop only) */}
    <FloatingParticles />
  </div>
);

export default function GalleryPageClient({ images }: { images: ImageItem[] }) {
  return (
    <main className="min-h-screen text-white overflow-x-hidden relative selection:bg-[#BE5161]/30 selection:text-white" style={{ zoom: "75%" }}>
      <LuxuryBackground />

      <div className="relative z-10">
        <NewHeader />

        {/* Page Title Section */}
        <div className="pt-32 pb-12 lg:pt-48 lg:pb-24 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl sm:text-8xl lg:text-9xl tracking-wide text-white drop-shadow-2xl mb-6"
          >
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BE5161] to-[#E67D8C]">GALLERY</span>
          </motion.h1>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 120, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-1.5 bg-gradient-to-r from-transparent via-[#BE5161] to-transparent mx-auto rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed px-4"
          >
            A visual showcase of our premium automotive craftsmanship and workshop excellence.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center items-center mb-[40px] relative z-10">
            <Gallery images={images} />
          </div>

          <div className="flex flex-wrap justify-center items-center mt-[120px] mb-[40px] relative z-5" id="contactForm">
            <ContactForm />
          </div>

          {/* Footer Copyright */}
          <div className="pb-10 px-4">
            <div className="max-w-[1130px] mx-auto h-[100px] flex justify-center items-center rounded-3xl border border-white/10 bg-[#050F15] backdrop-blur-md shadow-2xl">
              <span className="text-gray-400 text-sm sm:text-base text-center px-4 font-light tracking-wide">
                Copyright 2025 © Carmotive | Site by OurAuto Digital
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
