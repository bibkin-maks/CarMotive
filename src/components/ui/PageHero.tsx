"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lede: string;
}

/**
 * Shared page masthead for the services and gallery routes.
 *
 * Both pages previously carried their own copy of this block with a
 * `pt-32 lg:pt-48` offset sized to clear a header that wasn't actually
 * fixed. With a genuinely sticky nav the offset is just section padding.
 */
export default function PageHero({ eyebrow, title, lede }: PageHeroProps) {
  return (
    <header className="px-5 pb-14 pt-16 text-center sm:px-8 lg:pb-20 lg:pt-24">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="eyebrow"
      >
        {eyebrow}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 font-display text-display-lg tracking-[0.02em] text-steel-50 lg:text-display-xl"
      >
        {title}
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-brand-500"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-steel-300 lg:text-lg"
      >
        {lede}
      </motion.p>
    </header>
  );
}
