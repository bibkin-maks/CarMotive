"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";
import { asset } from "@/utils/navigation";

type ImageItem = { src: string; alt: string };

const IMAGES: ImageItem[] = Array.from({ length: 13 }, (_, i) => ({
  src: asset(`/image/gallery/Carmotive-${i + 1}.jpg`),
  alt: `Carmotive workshop photo ${i + 1}`,
}));

export default function Gallery({ images = IMAGES }: { images?: ImageItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) =>
        i === null ? null : (i + delta + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    /* The lightbox left the page behind it scrollable. */
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, step]);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
      {/* The old grid nested every tile inside a heavy bordered panel with
          corner brackets and an ambient glow, which competed with the
          photographs. The work is the subject; the frame steps back. */}
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4"
      >
        {images.map((img, idx) => (
          <motion.li key={img.src} variants={itemVariants}>
            <button
              type="button"
              onClick={() => setOpenIndex(idx)}
              aria-label={`Open ${img.alt}`}
              className="group relative block w-full overflow-hidden rounded-card border border-steel-800 bg-steel-900 transition-colors duration-300 hover:border-brand-500/50"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  priority={idx < 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-950/70 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-30" />
              </div>

              {/* Expand affordance */}
              <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg border border-steel-700 bg-steel-950/80 text-steel-200 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                  />
                </svg>
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      {/* ---------- Lightbox ---------- */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Gallery viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[100] flex flex-col bg-steel-950/97 backdrop-blur-xl"
            onClick={close}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-5 sm:px-8">
              <span className="font-mono text-xs tracking-[0.2em] text-steel-400">
                <span className="text-brand-400">
                  {String(openIndex + 1).padStart(2, "0")}
                </span>
                {" / "}
                {String(images.length).padStart(2, "0")}
              </span>
              <button
                onClick={close}
                aria-label="Close viewer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-steel-700 bg-steel-850 text-steel-50 transition-colors hover:border-brand-500 hover:bg-brand-600"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Image */}
            <div
              className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={openIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full w-full"
              >
                <Image
                  src={images[openIndex].src}
                  alt={images[openIndex].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Arrows — now wrap around and are available on every
                  breakpoint, rather than being hidden below md. */}
              {(["prev", "next"] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => step(dir === "next" ? 1 : -1)}
                  aria-label={dir === "next" ? "Next image" : "Previous image"}
                  className={`absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-steel-700 bg-steel-850/90 text-steel-50 backdrop-blur transition-colors hover:border-brand-500 hover:bg-brand-600 ${
                    dir === "next" ? "right-2 sm:right-6" : "left-2 sm:left-6"
                  }`}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={dir === "next" ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"}
                    />
                  </svg>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
