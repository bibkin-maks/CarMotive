import React, { useEffect, useState } from "react";
import Image from "next/image";

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

let imgArray: ImageItem[] = [];

for (let i = 1; i <= 13; i++) {
  let item: ImageItem = {
    src: `/image/gallery/Carmotive-${i}.jpg`,
    alt: `Carmotive ${i}`,
    caption: ''
  };
  imgArray.push(item);
}

export default function Gallery({
  images = [...imgArray],
  maxWidthClass = "max-w-6xl",
  minItemWidth = 220,
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
    <div className={`mx-auto px-3 sm:px-6 lg:px-8 ${maxWidthClass}`}>
      <div className={`grid ${gapClass} grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}>
        {images.map((img, idx) => (
          <figure
            key={idx}
            className="overflow-hidden rounded-lg bg-gray-800/50 cursor-pointer relative"
            onClick={() => setOpenIndex(idx)}
          >
            <Image
              src={img.src}
              alt={img.alt ?? `image-${idx}`}
              width={500}
              height={400}
              className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 object-cover transition-transform duration-300 ease-out hover:scale-105"
              priority={idx < 4}
            />
            {showCaptions && img.caption && (
              <figcaption className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent text-white px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {openIndex !== null && images[openIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          onClick={() => setOpenIndex(null)}
        >
          <div className="absolute inset-0 bg-black/70" />

          <div
            className="relative z-10 w-full max-w-[95vw] sm:max-w-[90vw] max-h-[90vh] flex items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              onClick={() => setOpenIndex(null)}
              className="absolute top-2 sm:top-3 right-2 sm:right-3 z-20 rounded-md bg-black/60 text-white px-2 sm:px-3 py-1 text-sm sm:text-base"
            >
              ✕
            </button>

            <button
              aria-label="Previous"
              onClick={() => setOpenIndex(i => (i === null ? null : Math.max(0, i - 1)))}
              className="absolute left-2 sm:left-3 md:left-6 z-20 rounded-full bg-black/40 text-white p-1 sm:p-2 text-sm"
            >
              ◀
            </button>

            <Image
              src={images[openIndex].src}
              alt={images[openIndex].alt ?? `image-${openIndex}`}
              width={800}
              height={600}
              className="w-full max-w-[95vw] sm:max-w-[90vw] max-h-[80vh] object-contain rounded-md"
              priority
            />

            <button
              aria-label="Next"
              onClick={() => setOpenIndex(i => (i === null ? null : Math.min(images.length - 1, i + 1)))}
              className="absolute right-2 sm:right-3 md:right-6 z-20 rounded-full bg-black/40 text-white p-1 sm:p-2 text-sm"
            >
              ▶
            </button>

            {/* Mobile-friendly indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {openIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}