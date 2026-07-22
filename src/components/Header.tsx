"use client";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";

interface HeroIntroSectionProps {
  imageSrc?: string;
  imageAlt?: string;
}

const SERVICES = [
  "Service & Maintenance",
  "Roadworthy Check",
  "Brakes & Suspension",
  "AC & Cooling",
] as const;

const Header: React.FC<HeroIntroSectionProps> = ({
  imageSrc = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/3d_logo_carmotive.png`,
  imageAlt = "The Carmotive badge — a chrome wordmark struck through by a lightning bolt",
}) => {
  const reduceMotion = useReducedMotion();

  // Mouse parallax on the badge. Springs keep it floaty rather than twitchy.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-300, 300], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-300, 300], [-10, 10]), springConfig);
  const moveX = useSpring(useTransform(x, [-300, 300], [-20, 20]), springConfig);
  const moveY = useSpring(useTransform(y, [-300, 300], [-20, 20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Same self-driving reveal the About Us and FAQ sections use — no parent
  // stagger, so nothing can be stranded at opacity 0 by variant propagation.
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

  const scrollToContact = () => {
    const form = document.querySelector("#contactForm");
    if (form) form.scrollIntoView({ behavior: "smooth" });
    else window.location.href = "#contactForm";
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient light. Radial gradients rather than blurred discs: a blurred
          circle parked at a negative offset is still bright where the section's
          overflow clip lands, which cut the glow off along a hard straight edge.
          These fade to zero well inside every edge, so nothing can be cropped. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(36% 42% at 68% 36%, rgba(190,81,97,0.17) 0%, rgba(190,81,97,0) 72%)",
            "radial-gradient(26% 34% at 20% 68%, rgba(153,186,202,0.11) 0%, rgba(153,186,202,0) 72%)",
          ].join(", "),
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-24">
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left: the pitch */}
          <div className="flex w-full flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div {...reveal}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[#99BACA]/30 bg-[#99BACA]/[0.06] px-4 py-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] text-[#99BACA]">
                <FontAwesomeIcon icon={faAward} className="text-xs" />
                10 Years of Experience
              </span>
            </motion.div>

            <motion.p
              {...reveal}
              className="mt-7 text-lg sm:text-xl font-light text-white/60"
            >
              Hey, we are
            </motion.p>

            {/* Held at greeting scale on purpose — the 3D badge alongside
                already spells CARMOTIVE, so a masthead-sized wordmark here
                would print the brand name twice. */}
            <motion.h1
              {...reveal}
              className="mt-1 font-display text-[56px] sm:text-[76px] lg:text-[88px] leading-[0.94] tracking-wide text-white"
            >
              Carmotive
              <motion.span
                className="ml-3 inline-block"
                animate={reduceMotion ? undefined : { rotate: [0, 18, 0, 18, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2.5 }}
              >
                👋
              </motion.span>
            </motion.h1>

            <motion.span
              {...reveal}
              className="mt-6 block h-1 w-20 rounded-full bg-[#BE5161]"
            />

            {/* Capability strip — same hairline/eyebrow language as the
                indexed rows in About Us and the FAQ. */}
            <motion.div
              {...reveal}
              className="mt-8 w-full border-y border-white/[0.12] py-5"
            >
              {/* Fixed 2×2. A plain wrap stranded "AC & Cooling" alone on a
                  second line; four columns squeezed every other label onto two
                  lines, leaving ragged baselines. Two columns keeps them all
                  on one line at every width. */}
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3.5">
                {SERVICES.map((service) => (
                  <li
                    key={service}
                    className="flex items-center gap-2.5 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-white/65"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 rounded-full bg-[#BE5161]"
                    />
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              {...reveal}
              className="mt-9 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
            >
              <button
                type="button"
                onClick={scrollToContact}
                className="group/cta relative flex w-full items-center justify-center overflow-hidden
                           rounded-full border border-[#BE5161]/50 bg-[#BE5161]
                           px-8 py-4 font-semibold tracking-wide text-white
                           shadow-[0_4px_20px_rgba(190,81,97,0.3)]
                           transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]
                           motion-reduce:transition-none motion-reduce:hover:scale-100
                           sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2 font-sans">
                  Schedule Now
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover/cta:translate-x-1 motion-reduce:transition-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full motion-reduce:hidden" />
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/services`;
                }}
                className="w-full rounded-full border border-white/20 px-8 py-4 font-semibold
                           text-white transition-colors duration-300 hover:border-white/50
                           hover:bg-white/[0.04] sm:w-auto sm:min-w-[160px]"
              >
                Services
              </button>
            </motion.div>
          </div>

          {/* Right: the badge */}
          <motion.div
            className="flex w-full justify-center lg:w-[44%] lg:justify-end"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 1,
              delay: reduceMotion ? 0 : 0.15,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            style={{ rotateX, rotateY, x: moveX, y: moveY, perspective: 1000 }}
          >
            <div className="relative">
              {/* Same reason as the ambient light above: a blurred disc spreads
                  ~90px past its own box, which pushed this glow through the
                  section's overflow clip and sheared it off along a straight
                  line above and below the badge. A radial gradient fades to
                  zero inside its own box, so no bright pixels reach the edge. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[14%] -z-10"
                style={{
                  background:
                    "radial-gradient(56% 56% at 50% 48%, rgba(190,81,97,0.22) 0%, rgba(190,81,97,0) 72%)",
                }}
              />
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={620}
                height={656}
                priority
                className="h-auto w-full max-w-[280px] object-contain sm:max-w-[400px] lg:max-w-[560px]"
                style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.55))" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Header;
