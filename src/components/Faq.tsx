"use client";

import React, { useState, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { containerVariants, itemVariants } from "@/utils/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { asset } from "@/utils/navigation";

interface FAQItem {
  id: string;
  title: string;
  body: React.ReactNode;
}

interface Props {
  heading?: string;
  imageSrc?: string;
  items?: FAQItem[];
  className?: string;
}

const DEFAULT_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    title: "What hours are you open?",
    body: "Carmotive is open five days a week, from 8:00am to 5:30pm Monday to Friday.",
  },
  {
    id: "faq-2",
    title: "Do I need to book in a visit?",
    body: "Yes, you will need to give us a quick call to set up an appointment. We don't want to waste your time and if you show up unannounced you may end up waiting a long time.",
  },
];

/* Credibility figures, pulled out of the prose so they can be scanned. */
const STATS = [
  { value: "100+", label: "Years combined experience" },
  { value: "10", label: "Years in Dingley Village" },
  { value: "5", label: "Days a week" },
];

const AccordionItem = memo(function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={`overflow-hidden rounded-card border transition-colors duration-300 ${
        isOpen
          ? "border-brand-500/40 bg-steel-850"
          : "border-steel-800 bg-steel-900/60 hover:border-steel-700"
      }`}
    >
      {/* Was a click handler on a non-interactive <article> with no
          keyboard access or state exposed. Now a real disclosure button. */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${item.id}-panel`}
        className="flex w-full items-center gap-4 px-5 py-4 text-left lg:px-6 lg:py-5"
      >
        <span
          className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${
            isOpen ? "bg-brand-500" : "bg-steel-600"
          }`}
        />
        <span
          className={`flex-1 text-[0.9375rem] font-medium transition-colors duration-300 lg:text-base ${
            isOpen ? "text-steel-50" : "text-steel-200"
          }`}
        >
          {item.title}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-brand-400" : "text-steel-500"
          }`}
          aria-hidden
        />
      </button>

      {/* Height is animated properly instead of the previous
          max-h-[500px] guess, which made short answers snap open. */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${item.id}-panel`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-5 pb-5 pl-12 text-sm leading-relaxed text-steel-300 lg:px-6 lg:pb-6 lg:pl-14">
              {item.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const AboutSection = ({
  heading = "Who we are",
  imageSrc = asset("/image/FAQ.png"),
  items = DEFAULT_ITEMS,
  className,
}: Props) => {
  const [openId, setOpenId] = useState<string | null>(DEFAULT_ITEMS[0].id);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden rounded-panel border border-steel-800 bg-steel-900 ${
        className || ""
      }`}
    >
      <div className="grid-rules-fine absolute inset-0 opacity-50" aria-hidden />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative grid gap-12 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-14"
      >
        {/* ---------- Copy ---------- */}
        <div className="flex flex-col">
          <SectionHeading eyebrow="About Carmotive" heading={heading} />

          <div className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-steel-300 lg:text-base">
            {[
              "Carmotive is an automotive repairs workshop focused on providing an all-encompassing service to our customers in southeastern Melbourne.",
              "Whether it's mechanical, auto electrical, or fleetcare services, we're fully equipped and skilled to handle the job.",
              "With over 100 years of combined experience, no matter what automotive problem you're having, we can help.",
            ].map((paragraph, i) => (
              <motion.p key={i} variants={itemVariants}>
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Stats strip */}
          <motion.dl
            variants={itemVariants}
            className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-card border border-steel-800 bg-steel-800"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-steel-850 px-4 py-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-4xl leading-none text-brand-500">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-[0.6875rem] uppercase leading-tight tracking-[0.1em] text-steel-400">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ---------- Image + FAQ ---------- */}
        <div className="flex flex-col gap-8">
          <motion.div
            variants={itemVariants}
            className="relative h-64 overflow-hidden rounded-card border border-steel-800 lg:h-80"
          >
            <Image
              src={imageSrc}
              alt="Inside the Carmotive workshop"
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-steel-900/80 to-transparent" />
          </motion.div>

          <div>
            <motion.h3
              variants={itemVariants}
              className="mb-4 flex items-center gap-4 font-display text-2xl tracking-wide text-steel-50"
            >
              Common questions
              <span className="rule-fade flex-1" />
            </motion.h3>

            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default memo(AboutSection);
