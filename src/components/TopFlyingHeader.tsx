"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { asset, scrollToContact } from "@/utils/navigation";
import Button from "@/components/ui/Button";

const NAV_ITEMS = [
  { name: "Home", href: asset("/") },
  { name: "About", href: asset("/#about") },
  { name: "Services", href: asset("/services") },
  { name: "Gallery", href: asset("/gallery") },
];

export default function SiteNav({ className }: { className?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  /* Lock scroll behind the mobile menu, and let Escape close it —
     the original had no keyboard escape. */
  useEffect(() => {
    if (!isMenuOpen) return;

    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    const path = href.replace(asset(""), "") || "/";
    if (path.startsWith("/#")) return false;
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  return (
    <>
      {/* The nav is genuinely sticky now. Previously it carried
          `top-0 z-50` with no positioning context, so it scrolled away
          and the scroll-shrink behaviour below was never visible. */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-50 w-full px-4 pt-4 sm:px-6 ${className || ""}`}
      >
        <nav
          className={`
            mx-auto flex max-w-[1280px] items-center justify-between gap-4
            rounded-full border px-4 backdrop-blur-xl
            transition-all duration-300 sm:px-6
            ${
              isScrolled
                ? "h-14 border-steel-700/80 bg-steel-950/85 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                : "h-16 border-steel-800/70 bg-steel-900/50"
            }
          `}
          aria-label="Main"
        >
          {/* Logo */}
          <a
            href={asset("/")}
            className="flex shrink-0 items-center"
            aria-label="Carmotive home"
          >
            <Image
              src={asset("/image/logo.png")}
              alt="Carmotive"
              width={150}
              height={55}
              priority
              className={`w-auto transition-all duration-300 ${
                isScrolled ? "h-7" : "h-9"
              }`}
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`
                      relative block rounded-full px-4 py-2 text-xs font-semibold
                      uppercase tracking-[0.14em] transition-colors duration-200
                      ${
                        active
                          ? "text-steel-50"
                          : "text-steel-400 hover:text-steel-50"
                      }
                    `}
                  >
                    {item.name}
                    {/* Active page marker — the old nav gave no indication
                        of which page you were on. */}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-px h-px bg-brand-500"
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+61395516555"
              className="hidden text-sm font-semibold tracking-wide text-steel-200 transition-colors hover:text-brand-400 xl:block"
            >
              (03) 9551 6555
            </a>

            <Button
              size="sm"
              onClick={scrollToContact}
              className="hidden lg:inline-flex"
              withArrow
            >
              Book now
            </Button>

            {/* Burger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-steel-700 bg-steel-800/60 text-steel-50 transition-colors hover:border-brand-500/60 hover:bg-steel-800 lg:hidden"
            >
              <div className="flex w-4 flex-col gap-[3px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
                <span className="h-px w-2/3 bg-current" />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ---------- Mobile overlay ---------- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col bg-steel-950/97 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="grid-rules absolute inset-0 opacity-40" aria-hidden />

            <div className="relative flex items-center justify-between px-5 pt-6 sm:px-6">
              <Image
                src={asset("/image/logo.png")}
                alt="Carmotive"
                width={120}
                height={44}
                className="h-8 w-auto"
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-steel-700 bg-steel-800/60 text-steel-50 transition-all hover:border-brand-500 hover:bg-brand-600"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="relative flex flex-1 flex-col justify-center px-5 sm:px-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.06 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex items-baseline justify-between border-b border-steel-800 py-5 transition-colors hover:border-brand-500/50"
                >
                  <span className="font-display text-display-md text-steel-200 transition-colors group-hover:text-steel-50">
                    {item.name}
                  </span>
                  <span className="font-mono text-xs text-steel-600 transition-colors group-hover:text-brand-400">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              className="relative flex flex-col gap-4 px-5 pb-10 sm:px-6"
            >
              <Button
                size="lg"
                withArrow
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToContact();
                }}
                className="w-full"
              >
                Book a service
              </Button>
              <a
                href="tel:+61395516555"
                className="text-center font-display text-2xl tracking-wide text-steel-200 transition-colors hover:text-brand-400"
              >
                (03) 9551 6555
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
