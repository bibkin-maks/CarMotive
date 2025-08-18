"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  logoPath: string;               // "/image/logo.png"
  backgroundImagePath: string;    // "/image/header_1.png"
}

export default function Header({ logoPath, backgroundImagePath }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative w-full text-white bg-transparent overflow-hidden h-[70vh] md:h-[75vh] lg:h-[80vh] min-[1440px]:h-[705px]">
      {/* Background image (fills header) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImagePath}
          alt="Header background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Global overlay (slightly darken background) */}
      <div className="absolute inset-0 z-10 bg-black/30" />

      {/* NAVBAR (z-20 so it sits above overlay) */}
      <nav
        className="max-h-[125px] relative z-20 w-full flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 bg-black/40 backdrop-blur-sm"
        aria-label="Main navigation"
      >
        {/* Left: logo + brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-flex items-center">
            <Image src={logoPath} alt="Carmotive Logo" width={124} height={36} className="w-auto h-auto" />
            
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="hover:text-gray-300 font-medium">ABOUT</Link>
          <Link href="/blog" className="hover:text-gray-300 font-medium">BLOG</Link>
          <Link href="/careers" className="hover:text-gray-300 font-medium">CAREERS</Link>
          <Link href="/support" className="hover:text-gray-300 font-medium">SUPPORT</Link>
        </div>

        {/* Right: login / mobile button */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:inline-block hover:text-gray-300 font-medium">Login</Link>

          {/* mobile hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/60"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((s) => !s)}
          >
            {/* simple hamburger / close icon */}
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu (slides down) */}
      <div
        className={`
          md:hidden relative z-20 transition-max-h duration-300 ease-in-out overflow-hidden
          ${open ? "max-h-[240px]" : "max-h-0"}
        `}
        aria-hidden={!open}
      >
        <div className="px-6 pt-4 pb-6 bg-black/40 backdrop-blur-sm flex flex-col gap-3">
          <Link href="/about" className="block py-2 font-medium hover:text-gray-300" onClick={() => setOpen(false)}>ABOUT</Link>
          <Link href="/blog" className="block py-2 font-medium hover:text-gray-300" onClick={() => setOpen(false)}>BLOG</Link>
          <Link href="/careers" className="block py-2 font-medium hover:text-gray-300" onClick={() => setOpen(false)}>CAREERS</Link>
          <Link href="/support" className="block py-2 font-medium hover:text-gray-300" onClick={() => setOpen(false)}>SUPPORT</Link>
          <Link href="/login" className="block py-2 font-medium hover:text-gray-300" onClick={() => setOpen(false)}>Login</Link>
        </div>
      </div>

      {/* Center content (z-20) */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <div
          className="mb-4"
          style={{
            width: "clamp(200px, 32vw, 461px)",  // Responsive width
            height: "auto",                      // Maintain ratio
          }}
        >
          <Image
            src={logoPath}
            alt="Carmotive Logo Large"
            width={461}
            height={691}
            className="w-full h-auto"
            priority
          />
        </div>

        <p className="mt-4 text-xl md:text-2xl font-medium">
          Welcome to the best car service in Melbourne
        </p>
      </div>

      {/* Fixed height for 1440px screens */}
      <style jsx>{`@media (min-width: 1440px) {header {height: 705px;}}`}</style>
    </header>
  );
}
