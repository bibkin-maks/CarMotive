"use client";

import { useRef, useCallback } from "react";
import SiteNav from "@/components/TopFlyingHeader";
import ContactForm from "@/components/ContactForm";
import ServiceBlock from "@/components/ServicesBlocks";
import Backdrop from "@/components/ui/Backdrop";
import PageHero from "@/components/ui/PageHero";
import SiteFooter from "@/components/SiteFooter";
import { asset } from "@/utils/navigation";

/**
 * The eleven service blocks were previously eleven hand-written copies of
 * the same JSX — roughly 450 lines in which the only real differences were
 * the copy, the image and the swap flag. Each copy also re-declared its own
 * icon/grid markup, so any styling fix had to be made eleven times.
 */
interface Service {
  slug: string;
  heading: string;
  image: string;
  description: string[];
  points?: string[];
}

const SERVICES: Service[] = [
  {
    slug: "brakes",
    heading: "Brake Services",
    image: "Brake Services.png",
    description: [
      "Your brakes are the most important safety feature on your vehicle. While airbags reduce injury severity, the braking system prevents collisions in the first place — and its condition often decides whether a situation ends safely.",
      "Brakes endure enormous wear every day; manufacturers recommend an annual inspection to keep them performing at their best.",
    ],
    points: [
      "Brake component replacement",
      "Brake machining",
      "Hose repairs & system checks",
      "Full safety inspections",
    ],
  },
  {
    slug: "logbook",
    heading: "Logbook Servicing",
    image: "Logbook Servicing.png",
    description: [
      "When you buy a new vehicle the manufacturer provides a warranty covering parts failures. That warranty is only valid if the vehicle is periodically serviced by a certified mechanic who records and stamps each service.",
      "Our mechanics are fully certified to provide logbook servicing for all passenger vehicles.",
    ],
    points: [
      "Petrol vehicles",
      "Diesel vehicles",
      "LPG vehicles",
      "Electric & hybrid vehicles",
    ],
  },
  {
    slug: "inspections",
    heading: "Vehicle Inspections",
    image: "Vehicle Inspections.png",
    description: [
      "If you're selling or transferring ownership of a vehicle you first need a roadworthy certificate, issued by a licensed tester after a thorough inspection.",
      "Buying secondhand? Bring it in for a pre-purchase inspection to avoid nasty surprises. And before a long road trip, it's far better to find a problem in the workshop than in the middle of nowhere.",
    ],
    points: [
      "Roadworthy certificates",
      "Pre-purchase inspections",
      "Pre-trip safety checks",
    ],
  },
  {
    slug: "steering",
    heading: "Steering & Suspension",
    image: "Steering and Suspension.png",
    description: [
      "Faults in steering and suspension affect handling and ride comfort, causing play in the steering wheel and body lean through corners. Your suspension also maximises tyre grip and minimises stopping distances.",
    ],
    points: [
      "Shock absorbers & springs",
      "Wheel balancing",
      "Bushing replacement",
      "Power steering repairs",
    ],
  },
  {
    slug: "air-conditioning",
    heading: "Air Conditioning",
    image: "Air Conditioning.png",
    description: [
      "Vehicle air conditioning degrades faster from disuse than from use — rubber tubing and seals dry out and crack over long idle periods, letting refrigerant gas leak away.",
      "Our technicians can fully repair your system: swapping faulty condensers or compressors, replacing cracked tubing, and recharging with refrigerant.",
    ],
    points: [
      "Compressor & condenser replacement",
      "Leak detection",
      "Tubing & seal repair",
      "Refrigerant regas",
    ],
  },
  {
    slug: "clutch",
    heading: "Clutch & Transmission",
    image: "Clutch and Transmission.png",
    description: [
      "The clutch and transmission are among the most complex machinery in your vehicle. Even minor problems can escalate quickly into very costly repairs.",
    ],
    points: [
      "Servicing",
      "Repairs and replacement",
      "Manual transmissions",
      "Automatic transmissions",
      "Differentials",
      "CV joints",
    ],
  },
  {
    slug: "engine",
    heading: "Engine Repairs",
    image: "Engine Repairs.png",
    description: [
      "The engine is the heart of your vehicle — if it breaks down, nothing else matters. Our skilled technicians provide comprehensive engine services.",
    ],
    points: ["Rebuilds", "Testing", "Engine blocks", "EFI diagnostics"],
  },
  {
    slug: "cooling",
    heading: "Cooling Systems",
    image: "Cooling Systems.png",
    description: [
      "A malfunctioning cooling system causes reduced fuel efficiency and a shorter engine lifespan, and will eventually leave your vehicle immobile with a costly repair bill.",
    ],
    points: [
      "Radiator & heater unit repairs",
      "Head gasket replacement",
      "Coolant flush & leak check",
      "Thermostat check",
    ],
  },
  {
    slug: "auto-electrical",
    heading: "Auto Electrical",
    image: "Auto Electrical Services.png",
    description: [
      "If the engine is the heart, the auto electrical network is the brain. It handles everything from entertainment to critical safety features.",
    ],
    points: [
      "Alternators & starter motors",
      "Battery check & replacement",
      "Component testing",
      "Diagnostic scans",
      "Lighting upgrades",
      "Solar & battery systems",
    ],
  },
  {
    slug: "other",
    heading: "Other Services",
    image: "Other Services.png",
    description: [
      "We offer a comprehensive repair service, including but not limited to the following.",
    ],
    points: [
      "Tyres (car & 4WD)",
      "Windscreen replacement",
      "Motorcycle repairs",
      "Accessory installation",
    ],
  },
  {
    slug: "fleet",
    heading: "Fleet Management",
    image: "Fleet Management.png",
    description: [
      "Carmotive provides independent management of your entire car fleet — one of our core business functions. We cover regular servicing, repairs, mid-contract inspections and end-of-lease preparation.",
      "Whatever the size of your fleet, we offer a servicing package to suit your requirements.",
    ],
    points: [
      "Scheduled fleet servicing",
      "Mid-contract inspections",
      "End-of-lease preparation",
      "Consolidated reporting",
    ],
  },
];

export default function ServicesPage() {
  const contactRef = useRef<HTMLDivElement>(null);

  const goToContact = useCallback(() => {
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main className="relative min-h-screen">
      <Backdrop />

      <div className="relative z-10">
        <SiteNav />

        <PageHero
          eyebrow="What we do"
          title="SERVICES"
          lede="Mechanical, auto electrical and fleetcare — the full range of automotive care, handled in one workshop."
        />

        <div className="flex flex-col gap-6 px-5 pb-20 sm:px-8 lg:gap-8 lg:pb-28">
          {SERVICES.map((service, i) => (
            <ServiceBlock
              key={service.slug}
              index={i + 1}
              heading={service.heading}
              imageSrc={asset(`/image/services/${service.image}`)}
              swapOrder={i % 2 === 1}
              onLearn={goToContact}
              points={service.points}
              description={
                <div className="space-y-4">
                  {service.description.map((paragraph, p) => (
                    <p key={p}>{paragraph}</p>
                  ))}
                </div>
              }
            />
          ))}
        </div>

        <section
          id="contactForm"
          ref={contactRef}
          className="scroll-mt-24 px-5 pb-20 sm:px-8 lg:pb-28"
        >
          <ContactForm />
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
