"use client";

import React from "react";
import Image from "next/image";
import { IconSettings, IconBuilding, IconPhone } from "@/components/icons";

export default function InfoPanels() {
  const panels = [
    {
      image: "/image/services.png",
      icon: <IconSettings className="w-8 h-8 md:w-10 md:h-10 text-red-600" />,
      title: "OUR SERVICES",
    },
    {
      image: "/image/about.png",
      icon: <IconBuilding className="w-8 h-8 md:w-10 md:h-10 text-red-600" />,
      title: "ABOUT US",
    },
    {
      image: "/image/contact.png",
      icon: <IconPhone className="w-8 h-8 md:w-10 md:h-10 text-red-600" />,
      title: "GET IN TOUCH",
    },
  ];

  return (
    <div className="w-full py-10 md:py-20 " style={{background: "linear-gradient(-180deg, #0B131A 0%, #050D14 65%, #040C13 89%, #060D14 100%)"}}>
      <section className="mx-auto rounded-xl max-w-[90%] md:max-w-6xl p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0 w-full">
          {panels.map((panel, i) => (
            <div
              key={i}
              className={`relative overflow-hidden group aspect-[3/4] md:aspect-auto ${i < 2 ? 'md:border-r md:border-blue-900/30' : ''}`}
              style={{
                height: "clamp(300px, 50vh, 600px)",
              }}
            >
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              
              <div 
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(rgba(11, 19, 26, 0.1) 0%, rgba(7, 10, 24, 0.96) 83%, rgb(7, 10, 24) 100%)",
                }}
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white px-4 z-10 pb-10 md:pb-16">
                {panel.icon}
                <h3 className="mt-6 md:mt-8 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight font-bebas">
                  {panel.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}