"use client";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import FaqSection from "@/components/faq";
import NewHeader from "@/components/new_header";
import { InfoPanels } from "@/components/InfoPanels";
import "@/app/globals.css";

type Bulb = {
  left: number;
  top: number;
  bg: string;
  width: number;
  height: number;
  blur: number; // pixels
};
type AnimObj = {
  bulb1: Bulb;
  bulb2?: Bulb;
  bulb3?: Bulb;
  bulb4?: Bulb;
};

function returnOffset(state: number): AnimObj {
  switch (state) {
    case 1:
      return {
        bulb1: { left: 1000, top: -200, bg: "#8E5042", width: 481, height: 418, blur: 100 },
        bulb2: { left: -200, top: -200, bg: "#8E5042", width: 481, height: 418, blur: 100 },
        bulb3: { left: -200, top: -200, bg: "#8E5042", width: 481, height: 418, blur: 100 },
        bulb4: { left: -200, top: -200, bg: "#8E5042", width: 481, height: 418, blur: 100 },
      };
    case 2:
    case 3:
    case 4:
      return {
        bulb1: { left: 1000, top: -200, bg: "#8E5042", width: 481, height: 418, blur: 100 },
        bulb2: { left: -200, top: -200, bg: "#8E5042", width: 481, height: 418, blur: 100 },
        bulb3: { left: -200, top: -200, bg: "#8E5042", width: 481, height: 418, blur: 100 },
        bulb4: { left: -200, top: -200, bg: "#8E5042", width: 481, height: 418, blur: 100 },
      };
    case 0:
    default:
      return {
        bulb1: { left: -6, top: -137, bg: "#8e5042cf", width: 481, height: 418, blur: 100 },
        bulb2: { left: 1434, top: -137, bg: "#8e5042cf", width: 311, height: 311, blur: 41 },
        bulb3: { left: 1272, top: 601, bg: "#3b73a4", width: 410, height: 418, blur: 174 },
      };
  }
}

export default function Home() {
  const [animationObj, setAnimation] = useState<AnimObj>(() => returnOffset(0));

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY 
      let offsetState = 0
      if(scrollY < 550) offsetState = 0; 
      else if(scrollY < 2120) offsetState = 2;
      else if(scrollY < 2240) offsetState = 3;
      else offsetState = 4; 
      setAnimation(returnOffset(offsetState));
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    console.log("page height:", document.body.scrollHeight, "viewport:", window.innerHeight);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen text-white bg-[#101B21] overflow-x-hidden relative" style={{ zoom: "75%" }}>
      <div className="relative z-10">
        <NewHeader />
        <Header />
        <div className="flex flex-wrap justify-center items-center p-4 mb-40">
          <InfoPanels />
        </div>
        <div className="flex flex-wrap justify-center items-center p-4">
          <FaqSection className="rounded-[25px]" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center p-30 relative z-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12578.54541670751!2d145.110033!3d-37.985615!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66d1adb8689b1%3A0xbb65bc7a9bd67320!2sCarmotive!5e0!3m2!1sen!2sau!4v1757586625186!5m2!1sen!2sau"
          width={988}
          height={550}
          className="border-black border-1 rounded-[42px] relative z-20"
          style={{ filter: "invert(90%) hue-rotate(180deg)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="flex flex-wrap justify-center items-center p-10 relative z-20">
        <div className="flex justify-center items-center w-[1130px] h-[100px] rounded-[33px] border-[#FFFFFF] border-1 bg-[#050F15]">
          <span className="text-white text-[19px]" style={{ fontFamily: "Montserrat, sans-serif, system-ui" }}>
            Copyright 2025 © Carmotive | Site by OurAuto Digital
          </span>
        </div>
      </div>

      {/* FIXED BULBS */}
      <div
        className="pointer-events-none"
        style={{
          position: "fixed",
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
          width: 1439,
          height: 3857,
          zIndex: 0,
          overflow: "visible",
        }}
        aria-hidden="true"
      >
        {/* dynamic bulbs - ensure units in styles */}
        <div
          style={{
            width: animationObj.bulb1.width,
            height: animationObj.bulb1.height,
            left: animationObj.bulb1.left,
            top: animationObj.bulb1.top,
            position: "absolute",
            background: animationObj.bulb1.bg,
            boxShadow: "0 0 82px rgba(42,78,109,0.45)",
            borderRadius: 9999,
            filter: `blur(${animationObj.bulb1.blur}px)`,
          }}
        />
        {animationObj.bulb2 && (
          <div
            style={{
              width: animationObj.bulb2.width,
              height: animationObj.bulb2.height,
              left: animationObj.bulb2.left,
              top: animationObj.bulb2.top,
              position: "absolute",
              background: animationObj.bulb2.bg,
              boxShadow: "0 0 82px rgba(42,78,109,0.45)",
              borderRadius: 9999,
              filter: `blur(${animationObj.bulb2.blur}px)`,
            }}
          />
        )}

        {/* rest of the static bulbs */}
        <div style={{ width: 410, height: 418, left: 1272, top: 601, position: "absolute", background: "#3B73A4", boxShadow: "0 0 348px rgba(59,115,164,0.35)", borderRadius: 9999, filter: "blur(174px)" }} />
        <div style={{ width: 410, height: 418, left: 18, top: 1477, position: "absolute", background: "#3B73A4", boxShadow: "0 0 348px rgba(59,115,164,0.35)", borderRadius: 9999, filter: "blur(174px)" }} />
        <div style={{ width: 410, height: 1400, left: 1333, top: 1760, position: "absolute", background: "#0F2940", boxShadow: "0 0 348px rgba(15,41,64,0.35)", borderRadius: 9999, filter: "blur(174px)" }} />
        <div style={{ width: 481, height: 418, left: -104, top: -164, position: "absolute", background: "#3B73A4", boxShadow: "0 0 348px rgba(59,115,164,0.35)", borderRadius: 9999, filter: "blur(174px)" }} />
      </div>
    </main>
  );
}
