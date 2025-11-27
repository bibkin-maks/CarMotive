"use client";
import { useEffect, useState, useRef  } from "react";
import NewHeader from "@/components/TopFlyingHeader";
import ContactForm from "@/components/ContactForm";
import ServiceHero from "@/components/ServicesBlocks";
import { Poppins } from "next/font/google";


import "@/app/globals.css";
import { FaCheckCircle, FaTools, FaRegClock,
  FaTruck,
  FaBurn,
  FaBolt,
  FaCarBattery, FaMotorcycle} from "react-icons/fa";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300","400", "500", "600", "700"], // choose the weights you need
});




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
    case 2:
    case 3:
    case 4:
      return {
        bulb1: { left: 1000, top: -200, bg: "#2D222A", width: 481, height: 418, blur: 100 },
        bulb2: { left: -200, top: -200, bg: "#2D222A", width: 481, height: 418, blur: 100 },
        bulb3: { left: -200, top: -200, bg: "#2D222A", width: 481, height: 418, blur: 100 },
        bulb4: { left: -200, top: -200, bg: "#8E5042", width: 481, height: 418, blur: 100 },
      };
    case 0:
    default:
      return {
        bulb1: { left: -6, top: -137, bg: "#2D222A", width: 481, height: 418, blur: 100 },
        bulb2: { left: 1200, top: -137, bg: "#2B4263", width: 311, height: 311, blur: 81 },
        bulb3: { left: 1272, top: 601, bg: "#2D222A", width: 410, height: 418, blur: 174 },
      };
  }
}

export default function Home() {
  const [animationObj, setAnimation] = useState<AnimObj>(() => returnOffset(0));

  const contactForm  = useRef<HTMLDivElement>(null);

  const handleClickToContact = () => {
        contactForm.current?.scrollIntoView({
        behavior: "smooth", 
        block: "start",    
      });
  }



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
    <main className={`${poppins.className} min-h-screen text-white  overflow-x-hidden relative`} style={{ zoom: "75%" }}>
      <div className="relative z-10">
        <NewHeader />
       
      
    

        <div className={`grid  justify-center items-center p-4 mb-20 mt-20`}>

        <ServiceHero onLearn={handleClickToContact} swapOrder={false} imageSrc="/image/services/Brake Services.png" heading="Brake Services" description={
        <div className={` ${poppins.className} text-small` } >
        <p className="mt-3 text-gray-300 font-normal text-[18px]  leading-relaxed"> 
            Your brakes are the most important safety feature on your vehicle. 
            While airbags reduce injury severity, the braking system prevents collisions in the first place — 
            and its condition often decides whether a situation ends safely. Brakes endure enormous wear every day; 
            manufacturers recommend an annual inspection to keep them performing at their best. </p> 
            <div className="mt-6 space-y-3"> 
                <div className="flex items-start gap-3"> 
                    <FaCheckCircle className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden /> 
                    <p className="text-gray-100">Brake component replacement</p> </div> 
                    <div className="flex items-start gap-3"> <FaRegClock className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden /> 
                    <p className="text-gray-100">Brake machining to restore smooth stopping</p> </div> 
                    <div className="flex items-start gap-3"> 
                        <FaTools className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden /> 
                        <p className="text-gray-100">Brake hose repairs and system checks</p> 
                        </div> <div className="flex items-start gap-3"> 
                            <FaCheckCircle className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden /> 
                            <p className="text-gray-100">Full brake restorations and safety inspections</p> 
                            </div> </div>

        </div>}/>

        <ServiceHero onLearn={handleClickToContact} swapOrder={true} imageSrc="/image/services/Logbook Servicing.png" heading="Logbook Servicing" description={
        <div className={` ${poppins.className} text-small` } >
        <p><span className="mt-3 text-gray-300 font-normal text-[18px]  leading-relaxed" >Whenever you purchase a new vehicle, the manufacturer provides you with a warranty that covers the cost of any parts failures. This warranty is only valid if you have your vehicle periodically serviced by a certified mechanic, who records and stamps these services in your vehicle’s logbook.</span></p>
        <br></br> <p>Here at Carmotive, our mechanics are fully certified to provide logbook servicing for all passenger vehicles, including:</p>
          <br></br>
        <div className="flex items-start gap-3"> 
                                  <FaTruck className="mt-1 w-6 h-6 text-[#516D79]" type="petrol"  aria-hidden/>
                        <p className="text-gray-100">Petrol vehicles</p> 
        </div> 
        <div className="flex items-start gap-3"> 
                                            <FaBurn className="mt-1 w-6 h-6 text-[#516D79]" type="diesel" aria-hidden/>
                        <p className="text-gray-100">Diesel vehicles</p> 
        </div> 
        <div className="flex items-start gap-3"> 
                                  <FaBolt className="mt-1 w-6 h-6 text-[#516D79]" type="lpg" aria-hidden/>
                        <p className="text-gray-100">LPG vehicles</p> 
        </div> 
        <div className="flex items-start gap-3"> 
                                  <FaCarBattery className="mt-1 w-6 h-6 text-[#516D79]" type="electric" aria-hidden/>
                        <p className="text-gray-100">Electric/hybrid vehicles</p> 
        </div> 

        </div>}/>

        <ServiceHero onLearn={handleClickToContact} swapOrder={false} imageSrc="/image/services/Vehicle Inspections.png" heading="Vehicle Inspections" description={
        <div className={` ${poppins.className} text-small` } >
        <p><span className="mt-3 text-gray-300 font-normal text-[18px]  leading-relaxed" >If you’re planning on selling or otherwise transferring ownership of a vehicle, you first have to obtain a roadworthy certificate, issued by a licensed tester after a thorough inspection. The roadworthy inspection ensures that your vehicle meets the legal requirements to be safely driven on Victorian roads,and you have to have a roadworthy certificate before you even advertise the vehicle for sale.</span></p>
        <br></br> <p>When you’re thinking about buying a secondhand vehicle, we would recommend bringing it in for a pre-purchase inspection, so you avoid any nasty surprises and know exactly what you’re buying.</p>
        <br></br>
        <p>
        We think that pre-trip inspections are vital if you’re planning a long road trip or a camping trip, simply because we think it’s a lot better to find a problem with your vehicle in a mechanic’s workshop than to find out about it in the middle of nowhere.
        </p>
          <br></br>
 
        </div>
      
      }/>
        <ServiceHero onLearn={handleClickToContact} swapOrder={true} 
                                imageSrc="/image/services/Steering and Suspension.png" 
                                heading="Steering and Suspension"
                                description={
                                  <div className={`${poppins.className} text-small`}>
                                    <p className="mt-3 text-gray-300 font-normal text-[18px] leading-relaxed">
                                      Faults and flaws in your vehicle&apos;s steering and suspension affect handling and ride comfort, 
                                      causing play in the steering wheel and body lean through corners. Your suspension is also 
                                      responsible for maximising the grip that your tyres exert on the road surface, and a poor 
                                      suspension will increase your stopping distance.
                                    </p>
                                    <div className="mt-6 space-y-3">
                                      <div className="flex items-start gap-3">
                                        <FaTools className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Shock absorbers, springs and struts</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaCheckCircle className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Wheel balancing</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaTools className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Bushing replacement</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaCheckCircle className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Power steering repairs and replacement</p>
                                      </div>
                                    </div>
                                  </div>
                                }
                              />

                              <ServiceHero onLearn={handleClickToContact} 
                                swapOrder={false} 
                                imageSrc="/image/services/Air Conditioning.png" 
                                heading="Air Conditioning"
                                description={
                                  <div className={`${poppins.className} text-small`}>
                                    <p className="mt-3 text-gray-300 font-normal text-[18px] leading-relaxed">
                                      Your vehicle&apos;s air conditioning degrades faster from disuse than from use, as the rubber 
                                      tubing and seals dry up and crack if unused for long periods, allowing the refrigerant gas 
                                      to leak out and rob your aircon of its cooling power.
                                    </p>
                                    <p className="mt-3 text-gray-300 font-normal text-[18px] leading-relaxed">
                                      Carmotive&apos;s expert technicians can fully repair your air conditioning, starting by swapping 
                                      out any faulty condensers or compressors, then replacing any cracked tubing, and finally 
                                      recharging your system with refrigerant once we&apos;re certain it&apos;s airtight.
                                    </p>
                                  </div>
                                }
                              />

                              <ServiceHero onLearn={handleClickToContact} 
                                swapOrder={true} 
                                imageSrc="/image/services/Clutch and Transmission.png" 
                                heading="Clutch and Transmission"
                                description={
                                  <div className={`${poppins.className} text-small`}>
                                    <p className="mt-3 text-gray-300 font-normal text-[18px] leading-relaxed">
                                      As part of the assembly that transfers power from the engine to the wheels, the clutch and 
                                      transmission are made up of some of the most complex machinery in your vehicle. Due to their 
                                      sophisticated nature, even minor problems can quickly escalate into very costly repairs.
                                    </p>
                                    <div className="mt-6 space-y-3">
                                      <div className="flex items-start gap-3">
                                        <FaRegClock className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Servicing</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaTools className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Repairs and replacement</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaCheckCircle className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Manual transmissions</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaCheckCircle className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Automatic transmissions</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaTools className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Differentials</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaCheckCircle className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">CV Joints</p>
                                      </div>
                                    </div>
                                  </div>
                                }
                              />

                              <ServiceHero onLearn={handleClickToContact} 
                                swapOrder={false} 
                                imageSrc="/image/services/Engine Repairs.png" 
                                heading="Engine Repairs"
                                description={
                                  <div className={`${poppins.className} text-small`}>
                                    <p className="mt-3 text-gray-300 font-normal text-[18px] leading-relaxed">
                                      The engine is the heart of your vehicle. If the engine breaks down, it doesn&apos;t really matter 
                                      whether the air conditioning is working or not.
                                    </p>

                                    <br></br>

                                    <p>
                                      Carmotive’s skilled technicians can provide the following engine services:
                                    </p>
                                    <div className="mt-6 space-y-3">
                                      <div className="flex items-start gap-3">
                                        <FaTools className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Rebuilds</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaCheckCircle className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Testing</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaTools className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Engine blocks</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaCheckCircle className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">EFI Diagnostics</p>
                                      </div>
                                    </div>
                                  </div>
                                }
                              />

                              <ServiceHero onLearn={handleClickToContact} 
                                swapOrder={true} 
                                imageSrc="/image/services/Cooling Systems.png" 
                                heading="Cooling Systems"
                                description={
                                  <div className={`${poppins.className} text-small`}>
                                    <p className="mt-3 text-gray-300 font-normal text-[18px] leading-relaxed">
                                      If your cooling system is malfunctioning, it can cause multiple issues, including reduced 
                                      fuel efficiency and power output, even decreased engine lifespan as leaking coolant and 
                                      overheating damages the engine. If these problems are ignored for long enough, they will 
                                      render your vehicle immobile, with the cost of repairs being comparable to buying a 
                                      secondhand car!
                                    </p>
                                    <div className="mt-6 space-y-3">
                                      <div className="flex items-start gap-3">
                                        <FaTools className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Radiator/heater unit repairs and replacement</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaCheckCircle className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Head gasket replacement</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaRegClock className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Coolant flush and leak check</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaTools className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Thermostat check and replacement</p>
                                      </div>
                                    </div>
                                  </div>
                                }
                              />

                              <ServiceHero onLearn={handleClickToContact} 
                                swapOrder={false} 
                                imageSrc="/image/services/Auto Electrical Services.png" 
                                heading="Auto Electrical Services"
                                description={
                                  <div className={`${poppins.className} text-small`}>
                                    <p className="mt-3 text-gray-300 font-normal text-[18px] leading-relaxed">
                                      If the engine is the heart of the vehicle, the auto electrical network is the brain. The 
                                      auto electrical network handles everything from playing music and monitoring fuel consumption 
                                      to assisting with braking and gear changes, even putting your vehicle into limp mode if a 
                                      serious flaw is detected, preventing lasting damage.
                                    </p>
                                    <div className="mt-6 space-y-3">
                                      <div className="flex items-start gap-3">
                                        <FaCarBattery className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Alternators and starter motors</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaCheckCircle className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Battery check and replacement</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaTools className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Component test and replacement</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaRegClock className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Diagnostic scans</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaBolt className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Lighting upgrades</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaTools className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Accessory installation</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaCarBattery className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Solar/battery systems</p>
                                      </div>
                                    </div>
                                  </div>
                                }
                              />

                              <ServiceHero onLearn={handleClickToContact} 
                                swapOrder={true} 
                                imageSrc="/image/services/Other Services.png" 
                                heading="Other Services"
                                description={
                                  <div className={`${poppins.className} text-small`}>
                                    <p className="mt-3 text-gray-300 font-normal text-[18px] leading-relaxed">
                                      Here at Carmotive, we offer a comprehensive repair service, including, but not limited to:
                                    </p>
                                    <div className="mt-6 space-y-3">
                                      <div className="flex items-start gap-3">
                                        <FaTruck className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Tyres from major brands for all makes and models</p>
                                      </div>
                                      <div className="ml-9 text-gray-100 space-y-2">
                                        <p>• Car</p>
                                        <p>• 4WD</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaTools className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Windscreen replacement</p>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <FaMotorcycle className="mt-1 w-6 h-6 text-[#516D79]" aria-hidden />
                                        <p className="text-gray-100">Motorcycle repairs</p>
                                      </div>
                                    </div>
                                  </div>
                                }
                              />

                              <ServiceHero onLearn={handleClickToContact} 
                                swapOrder={false} 
                                imageSrc="/image/services/Fleet Management.png" 
                                heading="Fleet Management"
                                description={
                                  <div className={`${poppins.className} text-small`}>
                                    <p className="mt-3 text-gray-300 font-normal text-[18px] leading-relaxed">
                                      Carmotive provides independent management of your entire car fleet. Fleet management and 
                                      maintenance are our core business functions. Carmotive covers all areas of fleet maintenance 
                                      including regular servicing, repairs, mid-contract inspections and end of lease preparation. 
                                      Whatever the size of your fleet, Carmotive offers a servicing package to suit your requirements.
                                    </p>
                                  </div>
                                }
                              />


                                          </div>
                                    </div>

    

      <div className="flex flex-wrap justify-center items-center mt-[120px] mb-[40px] relative z-20" ref={contactForm} id="contactForm">
          <ContactForm/>

      </div>

      <div className="flex flex-wrap justify-center items-center p-10 relative z-20">
        <div className="flex justify-center items-center w-[1130px] h-[100px] rounded-[33px] border-[#28475A] border-2 bg-[#050F15]">
          <span className="text-white text-[19px]" >
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
          transition: "all 1s ease-in-out", 
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
            transition: "all 1s ease-in-out", 
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
              transition: "all 1s ease-in-out", 
            }}
          />
        )}

        {/* rest of the static bulbs */}
        <div style={{ width: 410, height: 418, left: 18, top: 1477, position: "absolute", background: "#3B73A4", boxShadow: "0 0 348px rgba(59,115,164,0.35)", borderRadius: 9999, filter: "blur(174px)" }} />
        <div style={{ width: 410, height: 1400, left: 1333, top: 1760, position: "absolute", background: "#0F2940", boxShadow: "0 0 348px rgba(15,41,64,0.35)", borderRadius: 9999, filter: "blur(174px)" }} />
        <div style={{ width: 481, height: 418, left: -104, top: -164, position: "absolute", background: "#3B73A4", boxShadow: "0 0 348px rgba(59,115,164,0.35)", borderRadius: 9999, filter: "blur(174px)" }} />
      </div>
    </main>
  );
}
