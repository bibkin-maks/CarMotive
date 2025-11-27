import * as React from "react";
import { useState } from "react";

interface NewHeaderProps {
  className?: string;
}

export default function NewHeader({ className }: NewHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative w-full">
      <div className="w-full max-w-[1280px] h-[50px] sm:h-[60px] mx-auto mt-4 sm:mt-6 lg:mt-10 relative flex items-center justify-between sm:justify-center rounded-full bg-black/35 px-4 sm:px-6">
        {/* Logo */}
        <img
          src="/image/logo.png"
          alt="Logo"
          className="left-4 sm:left-8 top-2 sm:top-3 w-[70px] sm:w-[80px] lg:w-[93px] h-[30px] sm:h-[35px] lg:h-[39px] absolute"
        />

        {/* Desktop Navigation - hidden on mobile, visible on tablet+ */}
        <nav className="hidden sm:flex items-center justify-center gap-6 lg:gap-10 rounded-full bg-black/40 px-6 lg:px-10 py-2 h-[40px] sm:h-[45px] lg:h-[49px]">
          {["Home", "About", "Services", "Gallery", "Contact"].map((item) => (
            <a
              href={item == "Contact" ?  '#contactForm'   : ( item == "About" ?  '/home#about' : `/${item.toLowerCase()}`)}
              key={item}
              className="text-[14px] sm:text-[15px] lg:text-[16px] font-normal text-white/90 tracking-wide cursor-pointer hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop CTA button - hidden on mobile */}
        <button 
          onClick={()=>{window.location.href = '#contactForm'}} 
          className="hidden sm:flex absolute right-[20px] top-[6px] items-center justify-center h-[44px] lg:h-[49px] w-[160px] lg:w-[182px] rounded-full bg-black/40 text-white font-semibold shadow-md hover:bg-black/50 transition-colors text-[14px] lg:text-base"
        >
          Schedule Now
        </button>

        {/* Mobile menu button - visible only on mobile, positioned on right */}
        <button 
          className="sm:hidden flex flex-col justify-center items-center w-8 h-8 absolute right-4"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`w-6 h-0.5 bg-white mb-1.5 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden mt-2 bg-black/35 rounded-2xl p-6 mx-4 backdrop-blur-md">
          <nav className="flex flex-col items-center gap-4">
            {["Home", "About", "Services", "Gallery", "Contact"].map((item) => (
              <a
                href={item == "Contact" ?  '#contactForm'   : ( item == "About" ?  '/home#about' : `/${item.toLowerCase()}`)}
                key={item}
                className="text-[18px] font-normal text-white/90 tracking-wide cursor-pointer hover:text-white transition-colors py-3 w-full text-center border-b border-white/20 last:border-b-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            
            {/* Schedule Now button inside mobile menu */}
            <button 
              onClick={() => {
                window.location.href = '#contactForm';
                setIsMobileMenuOpen(false);
              }} 
              className="mt-4 flex items-center justify-center h-[50px] w-full max-w-[200px] rounded-full bg-black/40 text-white font-semibold shadow-md hover:bg-black/50 transition-colors text-[16px]"
            >
              Schedule Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}