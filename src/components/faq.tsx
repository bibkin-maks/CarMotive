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
      body: "Yes, you will need to give us a quick call to set up an appointment. We don't want to waste your time and if you show up unannounced you may end up waiting a long time.",
    },
  ],
  className,
}: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      className={`border-[#28475A] border-2 pt-[130px] px-[60px] w-[1011px] h-[1210px] bg-gradient-to-b from-[#0b0f14] to-[#0e141a] text-[#E6EEF6] ${className || ""}`}
    >
      {/* Main heading */}
      <div className="flex">
        <div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "61px",
              letterSpacing: "1px",
              lineHeight: "1",
              margin: 0,
            }}
          >
            {heading}
          </h2>
          <div className="h-[23px]" />
          <div className="flex flex-col gap-2">
            <div
              className="h-[6px] rounded-sm"
              style={{ width: "180px", background: accentColor }}
            />
          </div>
          <div className="h-7" />

          {/* Content block */}
          <div className="flex items-start gap-[68px]">
            <div>
              <div
                className="text-[#C9D6E6] font-light text-[19px] leading-relaxed mb-[22px] w-[422px] mr-[68px]"
               
              >
                <p className="mt-0">
                  Carmotive is an automotive repairs workshop which focuses on
                  providing an all encompassing service to our valued customers
                  in southeastern Melbourne.
                </p>

                <p className="mt-3">
                  Whether it's mechanical, auto electrical, or fleetcare
                  services, Carmotive is fully equipped and skilled to provide
                  automotive repairs.
                </p>

                <p className="mt-3">
                  With over 100 years of combined experience, we are confident
                  in saying that no matter what automotive problem you're
                  having, we can help.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="w-[402px] h-[545px] shrink-0 rounded-[16px] overflow-hidden">
          <img
            src={imageSrc}
            alt="Workshop"
            className="w-full h-full object-cover block"
          />
        </div>
      </div>

      {/* FAQ section */}
      <div className="mt-[60px] max-w-[892px]">
        {/* FAQ heading */}
        <div className="mt-2 mb-[18px]">
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "3px",
              margin: 0,
              fontSize: "60px",
              lineHeight: "1.2",
              color: "#f4fafff0",
            }}
          >
            FAQS
          </h3>
          <div className="h-3" />
          <div className="w-[124px] h-[6px] rounded-sm bg-[#E66A6A]" />
        </div>

        {/* FAQ items */}
        <div
          role="region"
          aria-label="About and FAQs"
          className="rounded-2xl py-[35px]"
        >
          <div className="grid gap-[18px]">
            {items.map((it, index) => {
              const isOpen = openId === it.id;
              return (
                <article
                  key={it.id}
                  onMouseEnter={() => setOpenId(it.id)}
                  onMouseLeave={() => setOpenId(null)}
                  onFocus={() => setOpenId(it.id)}
                  onBlur={() => setOpenId(null)}
                  tabIndex={0}
                  aria-expanded={isOpen}
                  className={`block w-full rounded-xl overflow-hidden bg-[rgba(6,11,15,0.55)] cursor-pointer transition-all duration-200 ${
                    isOpen ? "shadow-[0_10px_30px_rgba(0,0,0,0.5)]" : ""
                  }`}
                >
                  <div className="flex items-center px-[22px] py-[20px]">
                    <div
                      className="w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0 text-white ml-[22px] mr-[35px]"
                      aria-hidden
                    >
                      {index === 0 ? (
                        <IconClock width="33px" height="33px" />
                      ) : (
                        <ScheduleIcon width="33px" height="33px" />
                      )}
                    </div>

                    <h4
                      style={{
                      
                        fontWeight: 400,
                        margin: 0,
                        fontSize: "20px",
                        lineHeight: "1.2",
                        color: "#F4FAFF",
                      }}
                    >
                      {it.title}
                    </h4>

                    <div className="flex-1" />

                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`mr-2 transition-transform duration-200 ${
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
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen  
                        ? "max-h-[400px] opacity-100 py-4 px-[120px]"
                        : "max-h-0 opacity-0 py-0 px-[120px]"
                    }`}
                    style={{
                     
                      fontSize: "20px",
                      lineHeight: "1.6",
                      color: "#C9D6E6",
                      marginTop: isOpen ? '-25px' : '0px',
                    }}
                  >
                    <span className="font-thin">
                    {it.body}
                    </span>
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
