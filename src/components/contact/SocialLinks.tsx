"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

export interface SocialLink {
  icon: IconType;
  /** Real profile URL. */
  href: string;
  /** Accessible name, e.g. "Carmotive on Facebook". */
  label: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

/**
 * Previously took a bare icon array and rendered every one with href="#"
 * and no accessible name — four identical unlabelled links to nowhere.
 * Callers now supply a real destination and label per platform, and any
 * platform the workshop isn't on simply isn't passed in.
 */
const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  if (!links.length) return null;

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="flex gap-2.5"
    >
      {links.map(({ icon: Icon, href, label }) => (
        <li key={label}>
          <motion.a
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-steel-700 bg-steel-850 text-steel-400 transition-colors duration-300 hover:border-brand-500 hover:bg-brand-600 hover:text-white"
          >
            <Icon size={16} />
          </motion.a>
        </li>
      ))}
    </motion.ul>
  );
};

export default SocialLinks;
