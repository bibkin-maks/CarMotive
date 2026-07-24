"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import NewHeader from "@/components/TopFlyingHeader";
import ContactForm from "@/components/ContactForm";
import ServiceHero from "@/components/ServicesBlocks";
import {
  FaCheckCircle,
  FaTools,
  FaRegClock,
  FaTruck,
  FaBurn,
  FaBolt,
  FaCarBattery,
  FaMotorcycle
} from "react-icons/fa";

import "@/app/globals.css";

const FloatingParticles = () => {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Decorative only — skip on phones/touch devices to spare the main thread.
    setEnabled(window.matchMedia("(min-width: 640px) and (pointer: fine)").matches);
  }, []);

  // Generate stable random values once
  const particles = useMemo(() => {
    return Array.from({ length: 10 }).map(() => ({
      x: [
        Math.random() * 100,
        Math.random() * 100
      ],
      y: [
        Math.random() * 100,
        Math.random() * 100
      ],
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1
    }));
  }, []);

  if (!enabled || reduceMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{
            x: [`${p.x[0]}vw`, `${p.x[1]}vw`],
            y: [`${p.y[0]}vh`, `${p.y[1]}vh`],
            opacity: [0, p.opacity, 0],
            scale: [0, p.scale, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
            delay: p.delay
          }}
          className="absolute w-1.5 h-1.5 bg-white/20 rounded-full blur-[1px]"
          style={{
            left: 0,
            top: 0
          }}
        />
      ))}
    </div>
  );
};

// Luxury Background Component
const LuxuryBackground = () => (
  <div
    className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    style={{ transform: "translateZ(0)" }}
  >
    {/* Dark base background */}
    <div className="absolute inset-0 bg-[#0e141a]" />

    {/* Primary gradient orb — static. Animating a 120px blur re-rasterised the
        whole bitmap every frame, which was the main scroll-jank source. */}
    <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-br from-[#BE5161] via-purple-900/40 to-blue-900/40 rounded-full blur-[120px] opacity-[0.18]" />

    {/* Secondary orb — static */}
    <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-blue-900/30 via-transparent to-emerald-900/20 rounded-full blur-[100px] opacity-[0.12]" />

    {/* Dynamic Flying Particles (desktop only) */}
    <FloatingParticles />
  </div>
);

export default function ServicesPage() {
  const contactFormRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef(null);

  // Scroll progress for parallax or extra effects if needed
  // Scroll progress for parallax or extra effects if needed
  useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleClickToContact = () => {
    contactFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main style={{ zoom: "75%" }} className="min-h-screen text-white overflow-x-hidden relative selection:bg-[#BE5161]/30 selection:text-white">
      <LuxuryBackground />

      <div className="relative z-10" ref={containerRef}>
        <NewHeader />

        {/* Page Title Section */}
        <div className="pt-32 pb-12 lg:pt-48 lg:pb-24 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl sm:text-8xl lg:text-9xl tracking-wide text-white drop-shadow-2xl mb-6"
          >
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BE5161] to-[#E67D8C]">SERVICES</span>
          </motion.h1>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 120, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-1.5 bg-gradient-to-r from-transparent via-[#BE5161] to-transparent mx-auto rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed px-4"
          >
            Explore our comprehensive range of premium automotive care and repair solutions designed to keep you on the road.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="flex flex-col gap-12 lg:gap-24 px-4 sm:px-8 max-w-[1400px] mx-auto mb-32">

          {/* Service Blocks */}
          <ServiceHero
            onLearn={handleClickToContact}
            swapOrder={false}
            imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/services/Brake Services.png`}
            heading="Brake Services"
            description={
              <div className="text-base text-gray-300 font-light leading-relaxed space-y-4">
                <p>
                  Your brakes are the most important safety feature on your vehicle.
                  While airbags reduce injury severity, the braking system prevents collisions in the first place —
                  and its condition often decides whether a situation ends safely. Brakes endure enormous wear every day;
                  manufacturers recommend an annual inspection to keep them performing at their best.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-4">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                    <span>Brake component replacement</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaRegClock className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                    <span>Brake machining</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaTools className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                    <span>Hose repairs & system checks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                    <span>Full safety inspections</span>
                  </div>
                </div>
              </div>
            }
          />

          <ServiceHero
            onLearn={handleClickToContact}
            swapOrder={true}
            imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/services/Logbook Servicing.png`}
            heading="Logbook Servicing"
            description={
              <div className="text-base text-gray-300 font-light leading-relaxed space-y-4">
                <p>
                  Whenever you purchase a new vehicle, the manufacturer provides you with a warranty that covers the cost of any parts failures.
                  This warranty is only valid if you have your vehicle periodically serviced by a certified mechanic, who records and stamps these services.
                </p>
                <p className="border-t border-white/10 pt-4 mt-4">
                  Here at Carmotive, our mechanics are fully certified to provide logbook servicing for all passenger vehicles, including:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-2">
                  <div className="flex items-center gap-3">
                    <FaTruck className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                    <span>Petrol vehicles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaBurn className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                    <span>Diesel vehicles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaBolt className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                    <span>LPG vehicles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCarBattery className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                    <span>Electric/hybrid vehicles</span>
                  </div>
                </div>
              </div>
            }
          />

          <ServiceHero
            onLearn={handleClickToContact}
            swapOrder={false}
            imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/services/Vehicle Inspections.png`}
            heading="Vehicle Inspections"
            description={
              <div className="text-base text-gray-300 font-light leading-relaxed space-y-4">
                <p>
                  If you’re planning on selling or otherwise transferring ownership of a vehicle, you first have to obtain a roadworthy certificate,
                  issued by a licensed tester after a thorough inspection. This ensures your vehicle meets legal requirements.
                </p>
                <p>
                  When you’re thinking about buying a secondhand vehicle, we would recommend bringing it in for a pre-purchase inspection
                  to avoid nasty surprises.
                </p>
                <p className="italic text-gray-400 border-l-2 border-[#BE5161] pl-4">
                  We think pre-trip inspections are vital if you’re planning a long road trip or a camping trip. Better to find a problem in the workshop than in the middle of nowhere.
                </p>
              </div>
            }
          />

          <ServiceHero
            onLearn={handleClickToContact}
            swapOrder={true}
            imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/services/Steering and Suspension.png`}
            heading="Steering and Suspension"
            description={
              <div className="text-base text-gray-300 font-light leading-relaxed space-y-4">
                <p>
                  Faults and flaws in your vehicle&apos;s steering and suspension affect handling and ride comfort,
                  causing play in the steering wheel and body lean through corners. Your suspension is also
                  responsible for maximising tyre grip and minimizing stopping distances.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-4">
                  <div className="flex items-center gap-3">
                    <FaTools className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                    <span>Shock absorbers & springs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                    <span>Wheel balancing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaTools className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                    <span>Bushing replacement</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                    <span>Power steering repairs</span>
                  </div>
                </div>
              </div>
            }
          />

          <ServiceHero
            onLearn={handleClickToContact}
            swapOrder={false}
            imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/services/Air Conditioning.png`}
            heading="Air Conditioning"
            description={
              <div className="text-base text-gray-300 font-light leading-relaxed space-y-4">
                <p>
                  Your vehicle&apos;s air conditioning degrades faster from disuse than from use, as the rubber
                  tubing and seals dry up and crack if unused for long periods, allowing the refrigerant gas
                  to leak out.
                </p>
                <p>
                  Carmotive&apos;s expert technicians can fully repair your air conditioning, starting by swapping
                  out any faulty condensers or compressors, replacing cracked tubing, and recharging your system with refrigerant.
                </p>
              </div>
            }
          />

          <ServiceHero
            onLearn={handleClickToContact}
            swapOrder={true}
            imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/services/Clutch and Transmission.png`}
            heading="Clutch and Transmission"
            description={
              <div className="text-base text-gray-300 font-light leading-relaxed space-y-4">
                <p>
                  The clutch and transmission are made up of some of the most complex machinery in your vehicle.
                  Even minor problems can quickly escalate into very costly repairs.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-4">
                  {[
                    { icon: FaRegClock, text: "Servicing" },
                    { icon: FaTools, text: "Repairs and replacement" },
                    { icon: FaCheckCircle, text: "Manual transmissions" },
                    { icon: FaCheckCircle, text: "Automatic transmissions" },
                    { icon: FaTools, text: "Differentials" },
                    { icon: FaCheckCircle, text: "CV Joints" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          <ServiceHero
            onLearn={handleClickToContact}
            swapOrder={false}
            imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/services/Engine Repairs.png`}
            heading="Engine Repairs"
            description={
              <div className="text-base text-gray-300 font-light leading-relaxed space-y-4">
                <p>
                  The engine is the heart of your vehicle. If the engine breaks down, nothing else matters.
                  Carmotive’s skilled technicians can provide comprehensive engine services:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-4">
                  {[
                    { icon: FaTools, text: "Rebuilds" },
                    { icon: FaCheckCircle, text: "Testing" },
                    { icon: FaTools, text: "Engine blocks" },
                    { icon: FaCheckCircle, text: "EFI Diagnostics" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          <ServiceHero
            onLearn={handleClickToContact}
            swapOrder={true}
            imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/services/Cooling Systems.png`}
            heading="Cooling Systems"
            description={
              <div className="text-base text-gray-300 font-light leading-relaxed space-y-4">
                <p>
                  Malfunctioning cooling systems can cause reduced fuel efficiency, decreased engine lifespan,
                  and eventually render your vehicle immobile with costly repair bills.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-4">
                  {[
                    { icon: FaTools, text: "Radiator/heater unit repairs" },
                    { icon: FaCheckCircle, text: "Head gasket replacement" },
                    { icon: FaRegClock, text: "Coolant flush & leak check" },
                    { icon: FaTools, text: "Thermostat check" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          <ServiceHero
            onLearn={handleClickToContact}
            swapOrder={false}
            imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/services/Auto Electrical Services.png`}
            heading="Auto Electrical Services"
            description={
              <div className="text-base text-gray-300 font-light leading-relaxed space-y-4">
                <p>
                  If the engine is the heart, the auto electrical network is the brain. It handles everything from
                  entertainment to critical safety features.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-4">
                  {[
                    { icon: FaCarBattery, text: "Alternators & starter motors" },
                    { icon: FaCheckCircle, text: "Battery check & replacement" },
                    { icon: FaTools, text: "Component test" },
                    { icon: FaRegClock, text: "Diagnostic scans" },
                    { icon: FaBolt, text: "Lighting upgrades" },
                    { icon: FaTools, text: "Accessory installation" },
                    { icon: FaCarBattery, text: "Solar/battery systems" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          <ServiceHero
            onLearn={handleClickToContact}
            swapOrder={true}
            imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/services/Other Services.png`}
            heading="Other Services"
            description={
              <div className="text-base text-gray-300 font-light leading-relaxed space-y-4">
                <p>
                  Here at Carmotive, we offer a comprehensive repair service, including, but not limited to:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-4">
                  <div className="flex items-center gap-3">
                    <FaTruck className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                    <span>Tyres (Car & 4WD)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaTools className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                    <span>Windscreen replacement</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMotorcycle className="w-5 h-5 text-[#BE5161] shrink-0" aria-hidden />
                    <span>Motorcycle repairs</span>
                  </div>
                </div>
              </div>
            }
          />

          <ServiceHero
            onLearn={handleClickToContact}
            swapOrder={false}
            imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/services/Fleet Management.png`}
            heading="Fleet Management"
            description={
              <div className="text-base text-gray-300 font-light leading-relaxed space-y-4">
                <p>
                  Carmotive provides independent management of your entire car fleet. Fleet management and
                  maintenance are our core business functions. Carmotive covers all areas of fleet maintenance
                  including regular servicing, repairs, mid-contract inspections and end of lease preparation.
                  Whatever the size of your fleet, Carmotive offers a servicing package to suit your requirements.
                </p>
              </div>
            }
          />

        </div>


        {/* Contact Form Section */}
        <div ref={contactFormRef} id="contactForm" className="flex justify-center items-center px-4 mb-20">
          <ContactForm />
        </div>

        {/* Footer Copyright */}
        <div className="pb-10 px-4">
          <div className="max-w-[1130px] mx-auto h-[100px] flex justify-center items-center rounded-3xl border border-white/10 bg-[#050F15] backdrop-blur-md shadow-2xl">
            <span className="text-gray-400 text-sm sm:text-base text-center px-4 font-light tracking-wide">
              Copyright 2025 © Carmotive | Site by OurAuto Digital
            </span>
          </div>
        </div>

      </div>
    </main>
  );
}
