"use client";
import React, { useState, useCallback, memo } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  title: string;
  body: React.ReactNode;
}

interface Props {
  heading?: string;
  accentColor?: string;
  imageSrc?: string;
  items?: FAQItem[];
  className?: string;
}

const DEFAULT_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    title: "What hours are you open?",
    body: "Carmotive is open five days a week, from 8:00am to 5:00pm Monday to Friday.",
  },
  {
    id: "faq-2",
    title: "Do I need to book in a visit?",
    body: "Yes, you will need to give us a quick call to set up an appointment. We don't want to waste your time and if you show up unannounced you may end up waiting a long time.",
  },
];

// Row: the question is the control, so it is a real <button> — the previous
// version put the click handler on an <article>, which no keyboard could reach.
const FaqRow = memo(function FaqRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  // Derived from the item's own id, not useId(). useId() numbers nodes by tree
  // position, so the statically exported HTML and the hydrating client can
  // disagree and React throws a hydration mismatch. item.id is already unique
  // (it is the list key), so these are stable across both renders.
  const panelId = `${item.id}-panel`;
  const buttonId = `${item.id}-button`;

  return (
    <div className="border-t border-white/[0.12]">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group flex w-full items-start gap-4 sm:gap-7 lg:gap-9
                     py-6 sm:py-8 text-left
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BE5161]/70
                     focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e141a]"
        >
          <span
            aria-hidden="true"
            className="w-7 sm:w-9 shrink-0 pt-1 font-display text-lg sm:text-xl tracking-[0.08em] text-[#BE5161]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            className={`flex-1 font-display text-[25px] sm:text-[31px] lg:text-[34px]
                        leading-[1.06] tracking-wide transition-colors duration-300
                        ${isOpen ? "text-white" : "text-white/85 group-hover:text-white"}`}
          >
            {item.title}
          </span>

          <ChevronDown
            aria-hidden="true"
            className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-300 motion-reduce:transition-none
                        ${isOpen
                          ? "rotate-180 text-[#BE5161]"
                          : "text-white/40 group-hover:text-white/70"}`}
          />
        </button>
      </h3>

      {/* 0fr → 1fr animates to the content's real height, so no max-h guess can
          clip a long answer the way a fixed max-height would. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out
                    motion-reduce:transition-none
                    ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p
            className={`max-w-[820px] pb-7 sm:pb-9 pl-11 sm:pl-16 lg:pl-[72px]
                        text-[15px] sm:text-[17px] font-light leading-[1.75]
                        text-gray-300/90 transition-opacity duration-300
                        motion-reduce:transition-none
                        ${isOpen ? "opacity-100" : "opacity-0"}`}
          >
            {item.body}
          </p>
        </div>
      </div>
    </div>
  );
});

const FaqSection = ({
  heading = "FAQS",
  accentColor = "#BE5161",
  imageSrc = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/FAQ.png`,
  items = DEFAULT_ITEMS,
  className,
}: Props) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const reduceMotion = useReducedMotion();

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const rise: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const reveal = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.2 },
    variants: rise,
  } as const;

  return (
    <section
      aria-label="Frequently asked questions"
      className={`relative w-full max-w-7xl mx-auto rounded-[32px]
                  border border-white/10 bg-[#0e141a] overflow-hidden
                  ${className || ""}`}
      style={{
        boxShadow: `
          0 20px 60px rgba(190, 81, 97, 0.15),
          0 0 0 1px rgba(255,255,255,0.1),
          inset 0 1px 0 rgba(255,255,255,0.1)
        `,
        "--accent-color": accentColor,
      } as React.CSSProperties}
    >
      {/* Masthead — deliberately shorter and smaller-set than the About Us hero
          above it, so the two photo headers read as a hierarchy, not a pair. */}
      <div className="relative h-[300px] sm:h-[360px] lg:h-[420px]">
        <Image
          src={imageSrc}
          alt="A Carmotive technician inspecting a vehicle with a work light"
          fill
          loading="lazy"
          quality={85}
          sizes="(max-width: 1280px) 100vw, 1280px"
          // Portrait source in a ~3:1 band shows only ~25% of its height, and a
          // centre crop lands on the technician's hands. Bias upward to his face.
          className="object-cover object-[center_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e141a]/55 via-[#0e141a]/82 to-[#0e141a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e141a]/93 via-[#0e141a]/42 to-transparent" />

        <motion.div
          {...reveal}
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-14"
        >
          <div className="max-w-[620px]">
            <span className="block text-[11px] sm:text-xs font-medium uppercase tracking-[0.25em] text-[#99BACA]">
              Common questions
            </span>

            <h2 className="mt-4 font-display text-[52px] sm:text-[70px] lg:text-[88px] leading-[0.92] tracking-wide text-white">
              {heading}
            </h2>

            <span className="mt-4 block h-1 w-16 sm:w-20 rounded-full bg-[#BE5161]" />

            <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-[21px] font-light leading-[1.5] text-white/90">
              Everything you need to know before you book.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Indexed rows, same hairline language as the About Us statements */}
      <motion.div
        {...reveal}
        className="px-6 sm:px-10 lg:px-14 pt-8 sm:pt-12 lg:pt-14 pb-10 sm:pb-14 lg:pb-16"
      >
        <div className="border-b border-white/[0.12]">
          {items.map((item, index) => (
            <FaqRow
              key={item.id}
              item={item}
              index={index}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default memo(FaqSection);
