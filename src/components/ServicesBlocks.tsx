"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { asset, scrollToContact } from "@/utils/navigation";

interface Props {
  imageSrc?: string;
  heading?: string;
  /** Short lead paragraph. */
  description?: React.ReactNode;
  /** Bulleted capabilities, rendered as a checked list. */
  points?: string[];
  index?: number;
  onLearn?: () => void;
  swapOrder?: boolean;
}

export default function ServiceBlock({
  imageSrc = asset("/image/services/Vehicle Inspections.png"),
  heading = "Vehicle Inspections",
  description,
  points = [],
  index,
  onLearn,
  swapOrder = false,
}: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative mx-auto grid w-full max-w-[1280px] overflow-hidden rounded-panel border border-steel-800 bg-steel-900 lg:grid-cols-2"
    >
      {/* ---------- Copy ---------- */}
      <div
        className={`relative flex flex-col justify-center p-6 sm:p-10 lg:p-14 ${
          swapOrder ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="grid-rules-fine absolute inset-0 opacity-40" aria-hidden />

        <div className="relative">
          {typeof index === "number" && (
            <span className="mb-4 block font-mono text-xs tracking-[0.2em] text-brand-300">
              {String(index).padStart(2, "0")}
            </span>
          )}

          <h2 className="font-display text-display-sm tracking-[0.02em] text-steel-50 lg:text-display-md">
            {heading}
          </h2>

          <div className="mt-4 h-[3px] w-16 rounded-full bg-brand-500" />

          {description && (
            <div className="mt-6 text-[0.9375rem] leading-relaxed text-steel-300 lg:text-base">
              {description}
            </div>
          )}

          {points.length > 0 && (
            <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-400"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 10.5l4 4 8-8"
                    />
                  </svg>
                  <span className="text-sm leading-snug text-steel-200">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="md" onClick={onLearn ?? scrollToContact} withArrow>
              Book this service
            </Button>
            <Button
              size="md"
              variant="secondary"
              onClick={() => {
                window.location.href = "tel:+61395516555";
              }}
            >
              Call the workshop
            </Button>
          </div>
        </div>
      </div>

      {/* ---------- Image ---------- */}
      <div
        className={`relative h-64 overflow-hidden sm:h-80 lg:h-auto lg:min-h-[520px] ${
          swapOrder ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <Image
          src={imageSrc}
          alt={heading}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        {/* Seam gradient blends the photo into the panel rather than
            butting a hard edge against it. */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-steel-900 via-steel-900/20 to-transparent lg:bg-gradient-to-r ${
            swapOrder ? "lg:from-transparent lg:to-steel-900" : "lg:from-steel-900 lg:to-transparent"
          }`}
        />
      </div>
    </motion.article>
  );
}
