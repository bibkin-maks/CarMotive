"use client";

import { motion } from "framer-motion";
import { itemVariants } from "@/utils/animations";

interface SectionHeadingProps {
  /** Small uppercase kicker above the heading. */
  eyebrow?: string;
  heading: string;
  /** Optional supporting line under the heading. */
  lede?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * The single heading treatment for the whole site.
 *
 * The old `LuxuryHeading` clipped a white→grey gradient into every heading,
 * which greyed out the bottom third of each glyph and dropped contrast.
 * Headings are now solid; emphasis comes from the red rule and the eyebrow,
 * so the accent stays a signal rather than decoration.
 */
export const SectionHeading = ({
  eyebrow,
  heading,
  lede,
  align = "left",
  className = "",
}: SectionHeadingProps) => {
  const centered = align === "center";

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <motion.p variants={itemVariants} className="eyebrow mb-4">
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        variants={itemVariants}
        className="font-display text-display-md lg:text-display-lg tracking-[0.02em] text-steel-50"
      >
        {heading}
      </motion.h2>

      <motion.div
        variants={{
          hidden: { scaleX: 0 },
          visible: {
            scaleX: 1,
            transition: { duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
          },
        }}
        className={`mt-5 h-[3px] w-20 origin-left rounded-full bg-brand-500 ${
          centered ? "mx-auto origin-center" : ""
        }`}
      />

      {lede && (
        <motion.p
          variants={itemVariants}
          className={`mt-6 text-base leading-relaxed text-steel-300 lg:text-lg ${
            centered ? "mx-auto max-w-2xl" : "max-w-xl"
          }`}
        >
          {lede}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
