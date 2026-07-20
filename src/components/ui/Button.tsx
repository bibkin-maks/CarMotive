"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  /** Renders a right-pointing arrow that nudges on hover. */
  withArrow?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  /* brand-600 fill: white label clears AA at 5.75:1 */
  primary:
    "bg-brand-600 text-white border border-brand-500/60 shadow-[0_8px_24px_-8px_rgba(236,26,42,0.55)] hover:bg-brand-500 hover:shadow-[0_10px_32px_-8px_rgba(236,26,42,0.7)]",
  secondary:
    "bg-steel-800/60 text-steel-50 border border-steel-700 backdrop-blur-sm hover:bg-steel-800 hover:border-steel-600",
  ghost:
    "bg-transparent text-steel-200 border border-transparent hover:text-steel-50 hover:bg-steel-800/50",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-xs tracking-[0.12em]",
  md: "h-11 px-6 text-[0.8125rem] tracking-[0.12em]",
  lg: "h-14 px-8 text-sm tracking-[0.1em]",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      withArrow = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ y: 0, scale: 0.985 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={`
        group/btn relative inline-flex items-center justify-center gap-2
        rounded-full font-semibold uppercase
        transition-colors duration-200
        ${VARIANTS[variant]} ${SIZES[size]} ${className}
      `}
      {...props}
    >
      {children}
      {withArrow && (
        <svg
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 12h14m0 0l-6-6m6 6l-6 6"
          />
        </svg>
      )}
    </motion.button>
  )
);

Button.displayName = "Button";

export default Button;
