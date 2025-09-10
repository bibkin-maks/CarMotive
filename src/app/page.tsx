"use client";
import { useEffect, useState } from "react";
import {
  IconMenu,
  IconX,
  IconWrench,
  IconSettings,
  IconBuilding,
  IconPhone,
} from "@/components/icons";
import Header from "@/components/header";
import FaqSection from "@/components/faq";
import NewHeader from "@/components/new_header";
import { InfoPanels } from "@/components/InfoPanels";

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
      {
        name: "Icons are functions",
        pass: [IconMenu, IconX, IconWrench].every((c) => typeof c === "function"),
      },
    ];
    if (process.env.NODE_ENV !== "production" && tests.some((t) => !t.pass)) {
      console.error("Self-tests failed", tests);
    }
  }, []);

  let cardIcons = [
    ["/image/Card1.png", "/image/CardVector.png"],
    ["/image/Card2.png", "/image/CardVector-1.png"],
    ["/image/Card3.png", "/image/CardVector-2.png"],
  ];

  return (
    // overflow-x-hidden prevents any horizontal scroll introduced by large backgrounds
    <main className="min-h-screen text-white bg-[#101B21] overflow-x-hidden relative" style={{zoom: '75%'}}>
    
      {/* CONTENT (above the bulbs) */}
      <div className="relative z-10">
        <NewHeader className="scale-[0.75]" />
        <Header />
        <div
          className="flex flex-wrap justify-center items-center p-4 mb-40"> 
           <InfoPanels/>
          </div>
        

        <div
          className="flex flex-wrap justify-center items-center p-4"
     
        >
          <FaqSection className="rounded-[25px]"/>
        </div>
      </div>

      {/* FIXED-POSITION BULBS (won't affect page width) */}
      <div
        // fixed so it doesn't change document width/flow; centered with translateX
        className="pointer-events-none"
        style={{
          position: "fixed",
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
          width: 1439,
          height: 3857,
          zIndex: 0,
          overflow: "visible", // bulbs may extend beyond viewport vertically
          // note: pointer-events-none keeps them non-interactive
        }}
        aria-hidden="true"
      >
        <div
          style={{
            width: 405,
            height: 363,
            left: -6,
            top: -137,
            position: "absolute",
            background: "rgba(142, 80, 66, 0.81)",
            boxShadow: "0 0 348px rgba(142,80,66,0.45)",
            borderRadius: 9999,
            filter: "blur(174px)",
          }}
        />
        <div
          style={{
            width: 309,
            height: 311,
            left: 1434,
            top: -45,
            position: "absolute",
            background: "#2A4E6D",
            boxShadow: "0 0 82px rgba(42,78,109,0.45)",
            borderRadius: 9999,
            filter: "blur(41px)",
          }}
        />
        <div
          style={{
            width: 410,
            height: 418,
            left: 1272,
            top: 601,
            position: "absolute",
            background: "#3B73A4",
            boxShadow: "0 0 348px rgba(59,115,164,0.35)",
            borderRadius: 9999,
            filter: "blur(174px)",
          }}
        />
        <div
          style={{
            width: 410,
            height: 418,
            left: 18,
            top: 1477,
            position: "absolute",
            background: "#3B73A4",
            boxShadow: "0 0 348px rgba(59,115,164,0.35)",
            borderRadius: 9999,
            filter: "blur(174px)",
          }}
        />
        <div
          style={{
            width: 410,
            height: 1400,
            left: 1333,
            top: 1760,
            position: "absolute",
            background: "#0F2940",
            boxShadow: "0 0 348px rgba(15,41,64,0.35)",
            borderRadius: 9999,
            filter: "blur(174px)",
          }}
        />
        <div
          style={{
            width: 481,
            height: 418,
            left: -104,
            top: -164,
            position: "absolute",
            background: "#3B73A4",
            boxShadow: "0 0 348px rgba(59,115,164,0.35)",
            borderRadius: 9999,
            filter: "blur(174px)",
          }}
        />
      </div>
     
    </main>
  );
}
