import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";

type ImageItem = {
  src: string;
  alt?: string;
  caption?: string;
};

interface Props {
  images?: ImageItem[];
  maxWidthClass?: string;
  minItemWidth?: number;
  gapClass?: string;
  showCaptions?: boolean;
}

const imgArray: ImageItem[] = [];

for (let i = 1; i <= 13; i++) {
  const item: ImageItem = {
    src: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/gallery/Carmotive-${i}.jpg`,
    alt: `Carmotive ${i}`,
    caption: ''
  };
  imgArray.push(item);
}

export default function Gallery({
  images = [...imgArray],
  maxWidthClass = "max-w-7xl",
  gapClass = "gap-3 sm:gap-6",
  showCaptions = true,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openIndex === null || images.length === 0) return;
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex(i => (i === null ? null : Math.min(images.length - 1, i + 1)));
      if (e.key === "ArrowLeft") setOpenIndex(i => (i === null ? null : Math.max(0, i - 1)));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, images.length]);

  return (
    <div className={`mx-auto px-4 ${maxWidthClass}`}>
      <div className="relative rounded-[2rem] bg-[#02050ad4] border border-white/5 p-6 sm:p-10 lg:p-14 overflow-hidden group/gallery isolate shadow-2xl shadow-black/50">

        {/* Gradient Border Accent */}
        <div className="absolute inset-0 rounded-[2rem] p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-[#BE5161]/20 -z-10 pointer-events-none" />

        {/* Engineered Corner Accents (Brand Red) */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#BE5161]/30 rounded-tl-xl pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#BE5161]/30 rounded-br-xl pointer-events-none" />

        {/* Background Ambient Glow */}
        <div className="hidden sm:block absolute top-0 right-0 w-[500px] h-[500px] bg-[#BE5161]/5 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen" />

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className={`grid ${gapClass} grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 relative z-10`}
        >
          {images.map((img, idx) => (
            <motion.figure
              key={idx}
              variants={itemVariants}
              className="group/card relative overflow-hidden rounded-xl border border-white/5 bg-white/5 cursor-pointer 
              transition-all duration-500 ease-out
              hover:-translate-y-2 hover:border-[#BE5161]/50
              hover:shadow-[0_15px_40px_-5px_rgba(190,81,97,0.3)]"
              onClick={() => setOpenIndex(idx)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#05090C] via-transparent to-transparent opacity-80 z-10 transition-opacity duration-300 group-hover/card:opacity-40" />

              <Image
                src={img.src}
                alt={img.alt ?? `image-${idx}`}
                width={500}
                height={400}
                className="w-full h-40 sm:h-52 md:h-60 lg:h-64 xl:h-72 object-cover transition-transform duration-700 ease-out group-hover/card:scale-110 grayscale-[20%] group-hover/card:grayscale-0"
                priority={idx < 4}
              />

              {/* Central Interact Icon */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform scale-75 group-hover/card:scale-100">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(190,81,97,0.5)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
              </div>

              {showCaptions && img.caption && (
                <figcaption className="absolute left-0 right-0 bottom-0 z-20 px-4 py-3 text-xs sm:text-sm font-medium text-white/90 transform translate-y-full group-hover/card:translate-y-0 transition-transform duration-300">
                  {img.caption}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {openIndex !== null && images[openIndex] && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            onClick={() => setOpenIndex(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#05090C]/98 backdrop-blur-3xl" />

            {/* Controls Container */}
            <div className="fixed top-0 left-0 right-0 p-6 flex justify-between z-[110] pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-4">
                <span className="text-[#BE5161] text-lg font-['Bebas_Neue'] tracking-wide">
                  {openIndex + 1} <span className="text-white/30 text-base mx-1">/</span> {images.length}
                </span>
              </div>
              <button
                aria-label="Close"
                onClick={() => setOpenIndex(null)}
                className="pointer-events-auto rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white w-12 h-12 flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:border-[#BE5161]/50 hover:text-[#BE5161]"
              >
                ✕
              </button>
            </div>

            {/* Main Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-[105] w-full max-w-7xl h-full flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                aria-label="Previous"
                onClick={() => setOpenIndex(i => (i === null ? null : Math.max(0, i - 1)))}
                className="absolute left-0 sm:-left-4 z-20 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white w-14 h-14 flex items-center justify-center transition-all hover:-translate-x-2 hidden md:flex hover:border-[#BE5161]/50 hover:text-[#BE5161]"
              >
                ◀
              </button>

              <div className="relative w-full max-h-[85vh] aspect-video shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden ring-1 ring-white/10">
                <Image
                  src={images[openIndex].src}
                  alt={images[openIndex].alt ?? `image-${openIndex}`}
                  fill
                  className="object-contain bg-black/50"
                  priority
                />
              </div>

              <button
                aria-label="Next"
                onClick={() => setOpenIndex(i => (i === null ? null : Math.min(images.length - 1, i + 1)))}
                className="absolute right-0 sm:-right-4 z-20 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white w-14 h-14 flex items-center justify-center transition-all hover:translate-x-2 hidden md:flex hover:border-[#BE5161]/50 hover:text-[#BE5161]"
              >
                ▶
              </button>
            </motion.div>

            {/* Mobile Navigation Footer */}
            <div className="fixed bottom-8 flex gap-6 md:hidden z-[110]">
              <button
                onClick={() => setOpenIndex(i => (i === null ? null : Math.max(0, i - 1)))}
                className="rounded-full bg-white/10 border border-white/10 text-white w-14 h-14 flex items-center justify-center active:scale-95 transition-transform"
              >
                ◀
              </button>
              <button
                onClick={() => setOpenIndex(i => (i === null ? null : Math.min(images.length - 1, i + 1)))}
                className="rounded-full bg-white/10 border border-white/10 text-white w-14 h-14 flex items-center justify-center active:scale-95 transition-transform"
              >
                ▶
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}