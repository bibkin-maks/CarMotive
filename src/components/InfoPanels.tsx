"use client";

import React from "react";
import Image from "next/image";
import { IconServ } from "./icons";
import '../app/globals.css'

export const InfoPanels: React.FC = () => {
  const panels = [
    { title: "OUR\nSERVICES", image: "/image/services.png", className: 'gear' },
    { title: "ABOUT\nUS", image: "/image/about.png" , className: 'pulse'},
    { title: "GET IN TOUCH", image: "/image/contact.png", className: 'phone-ring'
     },
  ];

  // border thickness in px
  const borderPx = 2;

  const gradient = `linear-gradient(40.411deg,
    rgba(80, 79, 84, 0.5) 0%,
    rgba(177, 177, 177, 0.5) 18%,
    rgba(19, 24, 28, 0.5) 40%,
    rgba(198, 198, 200, 0.5) 61%,
    rgba(255, 255, 255, 0.5) 71%,
    rgba(12, 15, 20, 0.5) 83%,
    rgba(105, 106, 110, 0.5) 100%)`;

  return (
    <div className={"inline-flex justify-start items-center gap-17 "}>
      {panels.map((panel, i) => (
        // OUTER wrapper: sized to keep INNER exactly at w-72 h-[499px]
        <div
          key={i}
          className={`relative rounded-2xl info-panel cursor-pointer block-${panel.className} transform transition-transform duration-300 ease-in-out hover:scale-105`}
          style={{
            // outer size = inner size + 2 * borderPx
            width: `calc(18rem + ${borderPx * 2}px)`, // 18rem == w-72
            height: `calc(499px + ${borderPx * 2}px)`,
            padding: `${borderPx}px`,
            background: gradient,
          }}
        >
          {/* INNER card keeps your original sizes and paddings unchanged */}
          <div className="relative w-72 h-[499px] rounded-2xl overflow-hidden bg-black/70  backdrop-blur-md flex justify-start items-center gap-2 px-12 pt-56 pb-9">
            {/* Background image (fills inner card) */}
            <div className="absolute inset-0 -z-20">
              <Image
                src={panel.image}
                alt={panel.title.replace("\n", " ")}
                fill
                sizes="(min-width: 768px) 18rem, 33vw"
                className={"object-cover object-center"}
              />
            </div>

            {/* Double gradient overlay (exact overlay you provided) */}
            <div
              className="absolute inset-0 rounded-2xl -z-10 info-panel-bg"
           
            />

            {/* Content block (keeps your original absolute offsets if you rely on them) */}
            <div className="w-48 h-60 relative z-10">
              <div className="w-48 left-[4.5px] top-[11.25px] absolute inline-flex flex-col justify-start items-center gap-10">
                {/* Glowing red blurred box */}
                <div className="relative w-24 h-20 outline-[6px] outline-offset-[-3px] outline-red-600 blur-[47px]" />

                {/* Solid red outline box (your IconServ) */}
                <IconServ choice={i} className={"absolute w-92 h-20 outline-red-600 mt-[-10px] " + panel.className} />

                {/* Panel Title */}
                <div className="self-stretch text-center text-neutral-50 text-[59px] font-normal font-['Bebas_Neue'] leading-[55.5px] tracking-wide whitespace-pre-line">
                  {panel.title}
                </div>
              </div>

              {/* Extra red glow for last panel */}
              {i === 2 && (
                <div className="w-16 h-8 left-[103.5px] top-[64.5px] absolute bg-red-700/70 blur-[30px]" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
