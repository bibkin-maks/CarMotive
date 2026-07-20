"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface ContactInfoItemProps {
  icon: IconType;
  text: string;
  /** When set, the row becomes a link (tel: / mailto: / maps). */
  href?: string;
  delay?: number;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({
  icon: Icon,
  text,
  href,
  delay = 0,
}) => {
  const inner = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-steel-700 bg-steel-850 text-brand-400 transition-colors duration-300 group-hover:border-brand-500 group-hover:bg-brand-600 group-hover:text-white">
        <Icon size={15} />
      </span>
      <span className="flex-1 text-sm leading-snug text-steel-200 transition-colors duration-300 group-hover:text-steel-50">
        {text}
      </span>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
    >
      {/* Phone and email were plain text before — not tappable on mobile,
          which is where most workshop enquiries come from. */}
      {href ? (
        <a href={href} className="group flex items-center gap-3.5">
          {inner}
        </a>
      ) : (
        <div className="group flex items-center gap-3.5">{inner}</div>
      )}
    </motion.div>
  );
};

export default ContactInfoItem;
