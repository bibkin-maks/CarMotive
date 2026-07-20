"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconServ } from "./icons";
import { containerVariants, itemVariants } from "@/utils/animations";
import { asset } from "@/utils/navigation";

interface InfoPanelsProps {
  handleAbout?: () => void;
  handleContact?: () => void;
}

export const InfoPanels: React.FC<InfoPanelsProps> = ({
  handleAbout,
  handleContact,
}) => {
  const panels = [
    {
      index: "01",
      title: "Our Services",
      blurb:
        "Mechanical, auto electrical and fleetcare — the full range, under one roof.",
      cta: "Browse services",
      image: asset("/image/services.png"),
      iconClass: "gear",
      onClick: () => {
        window.location.href = asset("/services");
      },
    },
    {
      index: "02",
      title: "About Us",
      blurb:
        "A workshop built on 100+ years of combined experience in southeastern Melbourne.",
      cta: "Our story",
      image: asset("/image/about.png"),
      iconClass: "pulse",
      onClick: handleAbout,
    },
    {
      index: "03",
      title: "Get in Touch",
      blurb:
        "Book a slot, ask a question, or get a quote — we'll come back to you quickly.",
      cta: "Contact us",
      image: asset("/image/contact.png"),
      iconClass: "phone-ring",
      onClick: handleContact,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      /* Was `flex-wrap` with `min-w-[20rem]` on each card, which forced a
         320px floor and overflowed viewports at or below 360px. A grid
         with `minmax(0, 1fr)` tracks cannot overflow. */
      className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-5 px-5 sm:px-8 md:grid-cols-3 lg:gap-6"
    >
      {panels.map((panel, i) => (
        <motion.button
          key={panel.index}
          type="button"
          onClick={panel.onClick}
          variants={itemVariants}
          /* The old card carried both the `fade-in-up` CSS keyframe and a
             framer-motion opacity variant. Both animated opacity from 0,
             so whichever finished second re-hid the card mid-entrance.
             Motion is now owned by framer alone. */
          className={`
            group relative block-${panel.iconClass}
            min-w-0 overflow-hidden rounded-panel border border-steel-800
            bg-steel-900 text-left
            transition-colors duration-300 hover:border-steel-700
          `}
        >
          {/* Photo */}
          <div className="relative h-44 overflow-hidden lg:h-52">
            <Image
              src={panel.image}
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover object-center opacity-45 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-65 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-steel-900 via-steel-900/60 to-transparent" />

            {/* Index marker */}
            <span className="absolute right-5 top-4 font-mono text-xs tracking-widest text-steel-500">
              {panel.index}
            </span>

            {/* Icon sits on the seam between photo and body */}
            <div className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-xl border border-steel-700 bg-steel-850 shadow-lg">
              <IconServ
                choice={i}
                className={`h-6 w-6 text-brand-500 ${panel.iconClass}`}
              />
            </div>
          </div>

          {/* Body */}
          <div className="px-6 pb-6 pt-10">
            <h3 className="font-display text-3xl tracking-wide text-steel-50">
              {panel.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-steel-300">
              {panel.blurb}
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">
              {panel.cta}
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden
              >
                <path strokeLinecap="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </span>
          </div>

          {/* Bottom accent that draws in on hover */}
          <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-brand-500 transition-all duration-500 group-hover:w-full" />
        </motion.button>
      ))}
    </motion.div>
  );
};

export default InfoPanels;
