import * as React from "react";
import { useState } from "react";

interface NewHeaderProps {
  className?: string;
}

export default function NewHeader({ className }: NewHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`relative w-full z-50 ${className || ""}`}>
      <div
        className="
        w-full max-w-[1280px] 
        h-[55px] sm:h-[70px] lg:h-[80px]
        mx-auto mt-4 sm:mt-6 lg:mt-10
        relative flex items-center
        justify-between sm:justify-center
        rounded-full 
        bg-black/30 backdrop-blur-xl 
        border border-white/10
        shadow-[0_8px_25px_rgba(0,0,0,0.35)]
        px-6 sm:px-10
        transition-all duration-300
      "
      >
        {/* Logo */}
        <img
          src="/image/logo.png"
          alt="Logo"
          className="
            absolute left-4 sm:left-8 
            w-[80px] sm:w-[95px] lg:w-[110px]
            h-auto top-1/2 -translate-y-1/2
            opacity-95 hover:opacity-100 transition
          "
        />

        {/* Desktop Navigation */}
        <nav
          className="
          hidden sm:flex items-center 
          justify-center gap-8 lg:gap-12
          rounded-full px-8 py-3
          backdrop-blur-md border border-white/10
          
          bg-black/20

          /* BLUE GLOW */
          
        "
        >
          {["Home", "About", "Services", "Gallery", "Contact"].map((item) => (
            <a
              href={
                item == "Contact"
                  ? "#contactForm"
                  : item == "About"
                  ? "/home#about"
                  : `/${item.toLowerCase()}`
              }
              key={item}
              className="
                text-[15px] lg:text-[17px]
                font-medium 
                text-white/85 
                tracking-wide 
                transition-all
                hover:text-[#ffffff]
                hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]
              "
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA Button (DEEP DARK BLACK) */}
        <button
          onClick={() => {
            window.location.href = "#contactForm";
          }}
          className="
            hidden sm:flex absolute right-[20px]
            items-center justify-center
            h-[46px] lg:h-[52px]
            w-[165px] lg:w-[190px]
            rounded-full

            bg-black
            text-white font-semibold

            border border-white/10
            shadow-[0_4px_20px_rgba(0,0,0,0.4)]
            hover:bg-[#160e0e]
            hover:border-white/20

            transition-all text-[14px] lg:text-base
          "
        >
          Schedule Now
        </button>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-8 h-8 absolute right-4"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span
            className={`w-6 h-[3px] bg-white rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-[3px] bg-white rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-[3px] bg-white rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="
          sm:hidden mt-2 mx-4 
          bg-black/40 backdrop-blur-xl 
          border border-white/10
          rounded-2xl p-6

          /* BLUE GLOW */
          shadow-[0_0_18px_rgba(0,140,255,0.45)]
          animate-fadeIn
        "
        >
          <nav className="flex flex-col items-center gap-4">
            {["Home", "About", "Services", "Gallery", "Contact"].map((item) => (
              <a
                href={
                  item == "Contact"
                    ? "#contactForm"
                    : item == "About"
                    ? "/home#about"
                    : `/${item.toLowerCase()}`
                }
                key={item}
                className="
                  text-[19px] text-white/90 
                  py-3 w-full text-center
                  border-b border-white/15 last:border-none
                  hover:text-[#66c8ff]
                  transition-all
                "
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}

            {/* Dark Black Button (Mobile) */}
            <button
              onClick={() => {
                window.location.href = "#contactForm";
                setIsMobileMenuOpen(false);
              }}
              className="
                mt-5 w-full max-w-[220px]
                h-[50px] rounded-full

                bg-black border border-white/10 
                text-white font-semibold

                shadow-[0_4px_20px_rgba(0,0,0,0.4)]
                hover:bg-[#060606]
                hover:border-white/20

                transition-all
              "
            >
              Schedule Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
