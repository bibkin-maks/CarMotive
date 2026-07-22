"use client";
import React, { memo } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import Image from "next/image";

interface Props {
  heading?: string;
  accentColor?: string;
  className?: string;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const INK = "#0e141a";

// The workshop floor carries the masthead. Everything above the fold of this
// section sits on it, so it is the one image that loads eagerly.
const HERO = {
  src: `${BASE_PATH}/image/galleryAssets/d48a55e3-4e78-4eb6-bc22-57cbde58c3dc.jpg`,
  alt: "The Carmotive workshop floor, with vehicles up on the hoists",
};

// The pair: one on the tools, one at the front desk. Captions describe the role
// rather than naming the person — which face is Harijs or Linda is unconfirmed.
const PAIR = [
  {
    src: `${BASE_PATH}/image/galleryAssets/328789fd-cdbe-4242-b81a-5976e0eb61b5.jpg`,
    alt: "A Carmotive technician running diagnostics on an engine bay",
    caption: "On the tools",
    // Subject sits left of frame; bias the crop so he survives a narrow panel.
    position: "object-[35%_center]",
  },
  {
    src: `${BASE_PATH}/image/galleryAssets/d1824a79-29e4-4483-9161-ec37c537f653.jpg`,
    alt: "The Carmotive front desk, taking a customer booking by phone",
    caption: "At the front desk",
    // Subject sits hard right of frame — a centre crop cuts her out entirely.
    position: "object-[78%_center]",
  },
] as const;

// A second workshop frame, deliberately not the hero shot — repeating the same
// photograph inside one section reads as an oversight rather than a motif.
const CLOSING = {
  src: `${BASE_PATH}/image/galleryAssets/01e10a08-d174-4467-9f7e-3a5949196b37.jpg`,
  alt: "A car raised on a hoist while a Carmotive technician works on the wheel",
};

// Each statement opens on a display line that its paragraph finishes as one
// sentence; `lit` marks the clause the statement actually turns on.
const STATEMENTS = [
  {
    index: "01",
    heading: "We believe",
    body: [
      { text: "great service starts with honesty, quality workmanship and genuine customer care. " },
      { text: "With years of industry experience,", lit: true },
      { text: " we're committed to keeping your vehicle safe, reliable and performing at its best." },
    ],
  },
  {
    index: "02",
    heading: "From log book servicing & diagnostics",
    body: [
      { text: "to mechanical repairs, auto electrical work and roadworthy inspections, " },
      { text: "you can trust our team to provide expert advice", lit: true },
      { text: " and quality repairs at fair prices." },
    ],
  },
] as const;

const AboutUs = ({
  heading = "ABOUT US",
  accentColor = "#BE5161",
  className,
}: Props) => {
  const reduceMotion = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Each block drives its own reveal. Parent-stagger propagation proved
  // unreliable across this section's depth, and per-block reveals read better
  // on a section this tall anyway.
  const reveal = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.2 },
    variants: rise,
  } as const;

  return (
    <section
      aria-label="About Carmotive"
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
      {/* Masthead, set on the workshop floor itself */}
      <div className="relative h-[400px] sm:h-[500px] lg:h-[620px]">
        <Image
          src={HERO.src}
          alt={HERO.alt}
          fill
          priority
          quality={85}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-center"
        />
        {/* Two scrims: the vertical one seats the photo in the section, the
            horizontal one guarantees the copy never lands on a lit wall. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e141a]/50 via-[#0e141a]/80 to-[#0e141a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e141a]/95 via-[#0e141a]/40 to-transparent" />

        <motion.div
          {...reveal}
          className="absolute inset-0 flex flex-col justify-center
                     px-6 sm:px-10 lg:px-14"
        >
          <div className="max-w-[680px]">
            <span className="block text-[11px] sm:text-xs font-medium uppercase tracking-[0.25em] text-[#99BACA]">
              Family owned &amp; operated
            </span>

            <h2 className="mt-4 sm:mt-5 font-display text-[62px] sm:text-[88px] lg:text-[112px] leading-[0.92] tracking-wide text-white">
              {heading}
            </h2>

            <span className="mt-4 sm:mt-5 block h-1 w-20 sm:w-24 rounded-full bg-[#BE5161]" />

            <p className="mt-5 sm:mt-6 text-lg sm:text-xl lg:text-[26px] font-light leading-[1.45] text-white">
              Carmotive is a proudly family-owned and operated workshop, run by
              husband and wife team{" "}
              <span className="text-[#BE5161]">Harijs and Linda</span>.
            </p>
          </div>
        </motion.div>
      </div>

      {/* The pair, lifted up into the photo and joined at the seam */}
      <motion.div
        {...reveal}
        className="relative z-10 -mt-14 sm:-mt-20 lg:-mt-[130px]
                   px-6 sm:px-10 lg:px-14"
      >
        <div className="relative grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
          {PAIR.map((person) => (
            <figure
              key={person.caption}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10"
            >
              <div className="relative h-[190px] sm:h-[300px] lg:h-[400px]">
                <Image
                  src={person.src}
                  alt={person.alt}
                  fill
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 1280px) 50vw, 620px"
                  className={`object-cover ${person.position}
                              transition-transform duration-[1.2s] ease-out
                              group-hover:scale-[1.04] motion-reduce:transform-none`}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0e141a]/95 to-transparent" />
              </div>
              <figcaption className="absolute bottom-0 left-0 px-4 sm:px-6 lg:px-7 pb-3.5 sm:pb-5 lg:pb-6 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-white/75">
                {person.caption}
              </figcaption>
            </figure>
          ))}

          {/* Two halves of one business, made literal */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-20
                       flex h-11 w-11 sm:h-16 sm:w-16 lg:h-[88px] lg:w-[88px]
                       -translate-x-1/2 -translate-y-1/2 items-center justify-center
                       rounded-full border border-[#BE5161]/70 bg-[#0e141a]
                       font-display text-xl sm:text-3xl lg:text-[40px] leading-none text-white"
          >
            &amp;
          </span>
        </div>
      </motion.div>

      {/* Indexed statements — hairline per row, display line left, copy right */}
      <div className="px-6 sm:px-10 lg:px-14 pt-12 sm:pt-16 lg:pt-[88px] pb-6 sm:pb-8 lg:pb-10">
        {/* One rule spanning both, not a rule per row: these are a matched
            pair, and per-row borders made them read as an unrelated list. */}
        <div className="border-t border-white/[0.12] pt-8 sm:pt-10 lg:pt-12">
          {/* Subgrid rather than a min-height on the heading: the second
              heading wraps to two lines around 1024 but fits one at 1280, so a
              fixed height is either short at one width or dead space at the
              other. Subgrid lets the heading row size to whichever is taller
              and keeps both bodies on the same line at every width. */}
          <div
            className="grid gap-11 sm:gap-12
                       lg:grid-cols-2 lg:grid-rows-[auto_auto_auto]
                       lg:gap-x-16 lg:gap-y-0"
          >
            {STATEMENTS.map((s) => (
              <motion.div
                key={s.index}
                {...reveal}
                className="lg:grid lg:row-span-3 lg:grid-rows-subgrid"
              >
                <span className="block font-display text-lg sm:text-xl tracking-[0.12em] text-[#BE5161]">
                  {s.index}
                </span>

                <h3
                  className="mt-3 font-display text-[28px] sm:text-[34px] lg:text-[40px]
                             leading-[0.98] tracking-wide text-white"
                >
                  {s.heading}
                </h3>

                <p className="mt-4 text-[15px] sm:text-base font-light leading-[1.8] text-gray-300/90">
                  {s.body.map((seg, i) =>
                    "lit" in seg && seg.lit ? (
                      <span key={i} className="text-[#C75C6B]">
                        {seg.text}
                      </span>
                    ) : (
                      <React.Fragment key={i}>{seg.text}</React.Fragment>
                    )
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing band: the community line, back on the workshop floor */}
      <div className="relative">
        <Image
          src={CLOSING.src}
          alt={CLOSING.alt}
          fill
          loading="lazy"
          quality={85}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-center"
        />
        {/* Heavier than the hero scrim — this frame is busier and the line is
            centred, so it crosses the car's bright bodywork. Contrast alone was
            fine here; the mid stop is this dark to kill the visual noise. */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${INK}fa 0%, ${INK}e6 45%, ${INK}f7 100%)`,
          }}
        />

        <motion.div
          {...reveal}
          className="relative flex flex-col items-center text-center
                     px-6 sm:px-10 lg:px-14 py-16 sm:py-24 lg:py-[132px]"
        >
          <span className="block h-0.5 w-11 bg-[#BE5161]" />
          <p className="mt-6 sm:mt-7 max-w-[880px] text-xl sm:text-2xl lg:text-[30px] font-light leading-[1.45] text-white">
            When you bring your vehicle to Carmotive, you&apos;re not just
            another booking&mdash;you&apos;re part of our local community.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(AboutUs);
