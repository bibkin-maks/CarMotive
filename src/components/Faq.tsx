import React, { useState } from "react";
import { IconClock, ScheduleIcon } from "@/components/icons";

type FAQItem = { id: string; title: string; body: React.ReactNode };

interface Props {
  heading?: string;
  accentColor?: string;
  imageSrc?: string;
  items?: FAQItem[];
  className?: string;
}

export default function FaqSection({
  heading = "WHO WE ARE",
  accentColor = "#2F9BFF",
  imageSrc = "/image/FAQ.png",
  items = [
    {
      id: "faq-1",
      title: "What hours are you open?",
      body: "Carmotive is open five days a week, from 8:00am to 5:30pm Monday to Friday.",
    },
    {
      id: "faq-2",
      title: "Do I need to book in a visit?",
      body: "Yes, you will need to give us a quick call to set up an appointment. We don&apos;t want to waste your time and if you show up unannounced you may end up waiting a long time.",
    },
  ],
  className,
}: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
        className={`border-[#28475A] border-2 pt-8 md:pt-10 px-10 sm:px-10 md:px-10 w-full max-w-[1011px] mx-auto h-auto min-h-screen bg-gradient-to-b from-[#0b0f14] to-[#0e141a] text-[#E6EEF6] ${className ?? ""}`}
      >
      {/* Main heading */}
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
        <div className="flex-1">
          <h2
            className="font-['Bebas_Neue'] text-4xl sm:text-5xl md:text-6xl lg:text-[61px] tracking-wide leading-tight"
            style={{
              letterSpacing: "1px",
              margin: 0,
            }}
          >
            {heading}
          </h2>
          <div className="h-4 sm:h-[23px]" />
          <div className="flex flex-col gap-2">
            <div
              className="h-1 sm:h-[6px] rounded-sm"
              style={{ maxWidth: "120px", background: accentColor }}
            />
          </div>
          <div className="h-4 sm:h-7" />

          {/* Content block */}
          <div className="flex items-start">
            <div>
              <div
                className="text-[#C9D6E6] font-light text-base sm:text-lg md:text-[19px] leading-relaxed mb-6 sm:mb-[22px] w-full max-w-full lg:max-w-[422px] lg:mr-[68px]"
              >
                <p className="mt-0 mb-4 sm:mb-6">
                  Carmotive is an automotive repairs workshop which focuses on
                  providing an all encompassing service to our valued customers
                  in southeastern Melbourne.
                </p>

                <p className="mb-4 sm:mb-6">
                  Whether it&apos;s mechanical, auto electrical, or fleetcare
                  services, Carmotive is fully equipped and skilled to provide
                  automotive repairs.
                </p>

                <p className="mb-0">
                  With over 100 years of combined experience, we are confident
                  in saying that no matter what automotive problem you&apos;re
                  having, we can help.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="w-full lg:w-[402px] h-[300px] sm:h-[400px] lg:h-[545px] shrink-0 rounded-2xl overflow-hidden">
          <img
            src={imageSrc}
            alt="Workshop"
            className="w-full h-full object-cover block"
          />
        </div>
      </div>

      {/* FAQ section */}
      <div className="mt-8 md:mt-[60px] w-full max-w-full lg:max-w-[892px]">
        {/* FAQ heading */}
        <div className="mt-2 mb-6 md:mb-[18px]">
          <h3
            className="font-['Bebas_Neue'] tracking-wider text-4xl sm:text-4xl md:text-6xl leading-tight"
            style={{
              margin: 0,
              color: "#f4fafff0",
            }}
          >
            FAQS
          </h3>
          <div className="h-3" />
          <div className="w-20 sm:w-24 md:w-[124px] h-1 sm:h-[6px] rounded-sm bg-[#E66A6A]" />
        </div>

        {/* FAQ items */}
        <div
          role="region"
          aria-label="About and FAQs"
          className="rounded-2xl py-6 md:py-[35px]"
        >
          <div className="grid gap-4 md:gap-[18px]">
            {items.map((it, index) => {
              const isOpen = openId === it.id;
              return (
                <article
                  key={it.id}
                  onClick={() => setOpenId(isOpen ? null : it.id)}
                  tabIndex={0}
                  aria-expanded={isOpen}
                  className={`block w-full rounded-xl overflow-hidden bg-[rgba(6,11,15,0.55)] cursor-pointer transition-all duration-200 ${
                    isOpen ? "shadow-[0_10px_30px_rgba(0,0,0,0.5)]" : ""
                  }`}
                >
                  <div className="flex items-center px-4 sm:px-6 md:px-[22px] py-4 sm:py-5 md:py-[20px]">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center shrink-0 text-white ml-2 sm:ml-4 md:ml-[22px] mr-4 sm:mr-6 md:mr-[35px]"
                      aria-hidden
                    >
                      {index === 0 ? (
                        <IconClock className="w-6 h-6 sm:w-8 sm:h-8 md:w-[33px] md:h-[33px]" />
                      ) : (
                        <ScheduleIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-[33px] md:h-[33px]" />
                      )}
                    </div>

                    <h4
                      className="font-normal text-base sm:text-lg md:text-[20px] leading-tight text-[#F4FAFF] flex-1"
                      style={{
                        margin: 0,
                      }}
                    >
                      {it.title}
                    </h4>

                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`mr-2 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? "rotate-90" : "rotate-0"
                      }`}
                      aria-hidden
                    >
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="#DDEAF8"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 text-[16px] md:text-[18px] lg:text-[18px] ${
                      isOpen  
                        ? "max-h-[400px] opacity-100 py-4 px-4 sm:px-20 md:px-[120px]"
                        : "max-h-0 opacity-0 py-0 px-4 sm:px-20 md:px-[120px]"
                    }`}
                    style={{
                      lineHeight: "1.6",
                      color: "#C9D6E6",
                      marginTop: isOpen ? '-10px md:-25px' : '0px',
                      fontWeight: 600, 
                    }}
                  >
                 
                    {it.body}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
