  "use client";

  import React from "react";
  import Image from "next/image";
  import { IconServ } from "./icons";
  import "../app/globals.css";

  interface InfoPanelsProps {
    handleAbout?: () => void;
    handleContact?: () => void;
  }

  export const InfoPanels: React.FC<InfoPanelsProps> = ({ handleAbout, handleContact }) => {
    const panels = [
      { title: "OUR\nSERVICES", image: "/image/services.png", className: "gear", onClick: ()=>{window.location.href = '/services'} },
      { title: "ABOUT\nUS", image: "/image/about.png", className: "pulse", onClick: handleAbout },
      { title: "GET IN TOUCH", image: "/image/contact.png", className: "phone-ring", onClick: handleContact },
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
      <div className="inline-flex justify-start items-center gap-17 max-md:flex max-md:flex-col max-md:w-full max-md:gap-6">
        {panels.map((panel, i) => (
          <div
            key={i}
            onClick={panel.onClick}
            className={`relative rounded-2xl info-panel cursor-pointer block-${panel.className} transform transition-transform duration-300 ease-in-out hover:scale-105 max-md:w-full max-md:mb-4`}
            style={{
              padding: `${borderPx}px`,
              background: gradient,
            }}
          >
            {/* INNER card */}
            <div 
              style={{height: '100%',}}
              className="relative w-72 rounded-2xl overflow-hidden bg-black/70 backdrop-blur-md flex justify-start items-center gap-2 px-12 pt-56 pb-9 max-md:flex max-md:justify-center max-md:w-full max-md:h-full max-md:pt-48 max-md:px-6"
            >
              {/* Background image */}
              <div className="absolute inset-0 -z-20 ">
                <Image
                  src={panel.image}
                  alt={panel.title.replace("\n", " ")}
                  fill
                  sizes="(min-width: 768px) 18rem, 100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 rounded-2xl -z-10 info-panel-bg" />

              {/* Content */}
              <div className="w-48 h-60 relative z-10 max-md:w-full max-md:flex max-md:justify-center max-md:items-center">
                <div className="w-48 left-[4.5px] top-[11.25px] absolute inline-flex flex-col justify-start items-center gap-10 max-md:relative max-md:left-0 max-md:top-0 max-md:w-full max-md:gap-10">
                 <div className="relative w-24 h-20 outline-[6px] outline-offset-[-3px] outline-red-600 blur-[47px] max-md:w-36 max-md:h-28 max-md:blur-[40px] max-md:hidden"></div>
                  <IconServ choice={i} className={"absolute w-92 h-20 outline-red-600 mt-[-10px] " + panel.className + " max-md:relative max-md:w-36 max-md:h-28 max-md:mt-0"} />
                  <div className="self-stretch text-center text-neutral-50 text-[59px] font-normal font-['Bebas_Neue'] leading-[55.5px] tracking-wide whitespace-pre-line max-md:text-7xl max-md:leading-[4rem]">
                    {panel.title}
                  </div>
                </div>
                {i === 2 && (
                  <div className="w-16 h-8 left-[103.5px] top-[64.5px] absolute bg-red-700/70 blur-[30px] max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-16 max-md:h-8 max-md:blur-[30px]" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };