"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  IconMenu,
  IconX,
  IconWrench,
  IconInfo,
  
  IconCheckCircle,
  IconMapPin,
  IconClock,
  IconSettings,
  IconBuilding,
  IconPhone,
  Check
} from "@/components/icons";
import Header from "@/components/header";
import InfoPanels from "@/components/InfoPanels";
import ServiceHero from "@/components/serviceBlock_small";
import FaqSection from "@/components/faq";
import NewHeader from "@/components/new_header";

export default function Home() {
   const cards = [
    {
      imageSrc: "/images/service.jpg",
      icon: <IconSettings />,
      title: "OUR SERVICES",
    },
    {
      imageSrc: "/images/about.jpg",
      icon: <IconBuilding />,
      title: "ABOUT US",
    },
    {
      imageSrc: "/images/contact.jpg",
      icon: <IconPhone />,
      title: "GET IN TOUCH",
    },
  ];

  const [open, setOpen] = useState(false);

  // Self-tests (optional)
  useEffect(() => {
    const tests = [
      { name: "Icons are functions", pass: [IconMenu, IconX, IconWrench].every((c) => typeof c === "function") },
    ];
    if (process.env.NODE_ENV !== "production" && tests.some((t) => !t.pass)) {
      console.error("Self-tests failed", tests);
    }
  }, []);

  let cardIcons = [['/image/Card1.png', '/image/CardVector.png'] , ['/image/Card2.png', '/image/CardVector-1.png'] , ['/image/Card3.png', '/image/CardVector-2.png'] ]
 
   return (
    <main className="min-h-screen text-white bg-black">
      <Header backgroundImagePath="/image/header_1.png" logoPath="/image/logo.png"/>
      <InfoPanels/>
      
      {/* Services Section */}
      <div 
        className="flex flex-wrap justify-center items-center gap-[120px] p-4"
        style={{
          background: "linear-gradient(167.068deg, #060D14 0%, #1D2839 55%, #1D293A 61%, #060D14 93%)"
        }}
      >
        <ServiceHero 
          imageSrc="/image/services/Vehicle Inspections.png" 
          description="We think that pre-trip inspections are vital if you're planning a long road trip or a camping trip, simply because we think it's a lot better to find a problem with your vehicle in a mechanic's workshop than to find out about it in the middle of nowhere." 
          heading="Vehicle Inspections"
        />
        <ServiceHero 
          imageSrc="/image/services/Logbook Servicing.png" 
          description={
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3">
                <Check className="w-[30px] h-[30px] text-green-400" />
                <span className="font-montserrat font-semibold">Petrol Vehicles</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-[30px] h-[30px] text-green-400" />
                <span className="font-montserrat font-semibold">Diesel Vehicles</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-[30px] h-[30px] text-green-400" />
                <span className="font-montserrat font-semibold">LPG Vehicles</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-[30px] h-[30px] text-green-400" />
                <span className="font-montserrat font-semibold">Electric/Hybrid Vehicles</span>
              </li>
            </ul>
          }
          heading="Logbook Servicing"
        />

         <ServiceHero 
          imageSrc="/image/services/Vehicle Inspections.png" 
          description="We think that pre-trip inspections are vital if you're planning a long road trip or a camping trip, simply because we think it's a lot better to find a problem with your vehicle in a mechanic's workshop than to find out about it in the middle of nowhere." 
          heading="Vehicle Inspections"
        />
         <ServiceHero 
          imageSrc="/image/services/Vehicle Inspections.png" 
          description="We think that pre-trip inspections are vital if you're planning a long road trip or a camping trip, simply because we think it's a lot better to find a problem with your vehicle in a mechanic's workshop than to find out about it in the middle of nowhere." 
          heading="Vehicle Inspections"
        />
         <ServiceHero 
          imageSrc="/image/services/Vehicle Inspections.png" 
          description="We think that pre-trip inspections are vital if you're planning a long road trip or a camping trip, simply because we think it's a lot better to find a problem with your vehicle in a mechanic's workshop than to find out about it in the middle of nowhere." 
          heading="Vehicle Inspections"
        />
      </div>

      {/* FAQ Section */}
      <div className="flex flex-wrap justify-center items-center p-4 bg-gradient-to-b from-[#0b0f14] to-[#0e141a]"
      style={{
          background: "linear-gradient(101.527deg, #0A1019 20%, #151E2F 100%)"
       }}
      >
        <FaqSection/>
      </div>

      <NewHeader></NewHeader>
    </main>
  );
}