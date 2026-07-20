"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";
import { asset, scrollToContact } from "@/utils/navigation";
import Button from "@/components/ui/Button";

interface HeroProps {
  imageSrc?: string;
  imageAlt?: string;
}

/* The four service pillars, promoted from a pipe-separated run of text
   into a real spec strip — this is the site's proof of competence, so it
   gets structure rather than being buried in a subtitle. */
const CAPABILITIES = [
  { label: "Service & Maintenance", detail: "Logbook stamped" },
  { label: "Roadworthy Check", detail: "VicRoads certified" },
  { label: "Brakes & Suspension", detail: "Same-day fitting" },
  { label: "AC & Cooling", detail: "Regas & repair" },
];

const Hero: React.FC<HeroProps> = ({
  imageSrc = asset("/image/3d_logo_carmotive.png"),
  imageAlt = "Carmotive emblem",
}) => {
  /* Pointer parallax on the emblem. Softened from the original: the old
     values swung the mark 20px and 10deg, which fought the text for
     attention on every mouse move. */
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { damping: 30, stiffness: 120 };

  const rotateX = useSpring(useTransform(y, [-400, 400], [6, -6]), spring);
  const rotateY = useSpring(useTransform(x, [-400, 400], [-6, 6]), spring);
  const moveX = useSpring(useTransform(x, [-400, 400], [-12, 12]), spring);
  const moveY = useSpring(useTransform(y, [-400, 400], [-12, 12]), spring);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const resetPointer = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      className="relative w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPointer}
      aria-label="Introduction"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 pb-16 pt-10 sm:px-8 lg:px-12 lg:pb-24 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------- Copy column ---------- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 text-center lg:order-1 lg:text-left"
          >
            {/* Credential chip */}
            <motion.div
              variants={itemVariants}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-steel-700 bg-steel-900/70 py-1.5 pl-1.5 pr-4 backdrop-blur-sm"
            >
              <span className="rounded-full bg-brand-600 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-white">
                Est. 10 Yrs
              </span>
              <span className="text-xs font-medium tracking-wide text-steel-200">
                100+ years combined experience
              </span>
            </motion.div>

            {/* Headline. Solid white with a single red accent word — the old
                version gradient-clipped the brand name into a dusty rose,
                which neither matched the logo nor held contrast. */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-display-lg tracking-[0.01em] text-steel-50 sm:text-display-xl"
            >
              Melbourne&rsquo;s
              <br />
              <span className="text-brand-500">automotive</span> workshop
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-steel-300 lg:mx-0 lg:text-lg"
            >
              Mechanical, auto electrical and fleetcare repairs done properly
              &mdash; in Dingley Village, southeastern Melbourne.
            </motion.p>

            {/* Actions */}
            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
            >
              <Button size="lg" onClick={scrollToContact} withArrow>
                Book a service
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  window.location.href = asset("/services");
                }}
              >
                View services
              </Button>
            </motion.div>

            {/* Direct line — a workshop's most-used action shouldn't be
                buried at the bottom of the contact panel. */}
            <motion.div
              variants={itemVariants}
              className="mt-7 flex items-center justify-center gap-3 lg:justify-start"
            >
              <span className="text-xs uppercase tracking-[0.16em] text-steel-400">
                Or call
              </span>
              <a
                href="tel:+61395516555"
                className="font-display text-2xl tracking-wide text-steel-50 transition-colors hover:text-brand-400"
              >
                (03) 9551 6555
              </a>
            </motion.div>
          </motion.div>

          {/* ---------- Emblem column ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX, rotateY, x: moveX, y: moveY, perspective: 1200 }}
            className="order-1 flex justify-center lg:order-2"
          >
            <div className="relative">
              {/* Concentric technical rings behind the mark */}
              <div className="absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-steel-700/50" />
              <div className="absolute left-1/2 top-1/2 h-[108%] w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-steel-800/60" />
              <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/10 blur-[70px]" />

              <Image
                src={imageSrc}
                alt={imageAlt}
                width={620}
                height={620}
                priority
                className="relative w-full max-w-[260px] object-contain sm:max-w-[360px] lg:max-w-[480px]"
                style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.6))" }}
              />
            </div>
          </motion.div>
        </div>

        {/* ---------- Capability strip ---------- */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-steel-800 bg-steel-800 lg:mt-24 lg:grid-cols-4"
        >
          {CAPABILITIES.map((cap) => (
            <motion.li
              key={cap.label}
              variants={itemVariants}
              className="group bg-steel-900 p-5 transition-colors duration-300 hover:bg-steel-850 lg:p-6"
            >
              <div className="mb-3 h-px w-8 bg-brand-500 transition-all duration-300 group-hover:w-14" />
              <p className="text-sm font-semibold leading-snug text-steel-50 lg:text-base">
                {cap.label}
              </p>
              <p className="mt-1 text-xs text-steel-400">{cap.detail}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Hero;
