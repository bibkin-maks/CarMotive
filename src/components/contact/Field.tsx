"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";

interface BaseProps {
  label: string;
  index: number;
  /** Render a multi-line control instead of a single-line input. */
  multiline?: boolean;
  rows?: number;
  className?: string;
}

type FieldProps = BaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className">;

const variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.04 * i, duration: 0.35, ease: "easeOut" as const },
  }),
};

const CONTROL_CLASSES = `
  w-full rounded-card border border-steel-700 bg-steel-850
  px-4 py-3 text-[0.9375rem] text-steel-50
  placeholder:text-steel-500
  transition-colors duration-200
  hover:border-steel-600
  focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500
`;

/**
 * Replaces ContactInput + ContactTextarea.
 *
 * Both previously relied on `placeholder` alone to name the control, which
 * leaves the field with no accessible name and drops the hint entirely once
 * the user starts typing. Every field now carries a real <label>.
 */
const Field: React.FC<FieldProps> = ({
  label,
  index,
  multiline = false,
  rows = 4,
  className = "",
  ...props
}) => {
  const id = useId();

  return (
    <motion.div
      custom={index}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      <label
        htmlFor={id}
        className="mb-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-steel-400"
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          className={`${CONTROL_CLASSES} resize-none`}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={CONTROL_CLASSES}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </motion.div>
  );
};

export default Field;
