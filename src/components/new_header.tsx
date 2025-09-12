import * as React from "react";
interface NewHeaderProps {
  className?: string;
}
export default function NewHeader({ className }: NewHeaderProps) {
  return (
    <header className="relative w-full ">
      <div className="w-[1280px] h-[60px] mx-auto mt-10 relative flex items-center justify-center rounded-full bg-black/35 px-6">
        {/* Logo */}
        <img
          src="/image/logo.png"
          alt="Logo"
          className="absolute left-8 top-3 w-[93px] h-[39px]"
        />

        {/* Navigation */}
        <nav className="absolute left-[374px] top-[6px] flex items-center gap-10 rounded-full bg-black/40 px-10 py-2 h-[49px]">
          {["Home", "About", "Services", "Gallery", "Contact"].map((item) => (
            <span
              key={item}
              className="text-[16px] font-normal text-white/90 tracking-wide"
            >
              {item}
            </span>
          ))}
          <div className="rounded-2xl bg-red absolute w-[100] h-[40]"></div>
        </nav>

        {/* CTA button */}
        <button className="absolute right-[20px] top-[6px] flex items-center justify-center h-[49px] w-[182px] rounded-full bg-black/40 text-white font-semibold shadow-md">
          Schedule Now
        </button>
      </div>
    </header>
  );
};
