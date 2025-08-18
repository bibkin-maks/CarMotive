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
      title: "What hours are you hours of operation?",
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

  // layout constants
  const paddingTop = 130;
  const sidePadding = 60;

  const headingSize = 61;
  const gapHeadingUnderline = 23;
  const underline1Width = 180;

  const imageWidth = 402;
  const imageHeight = 545;
  const imageRadius = 16;
  const gapBetweenImageAndText = 68;

  const infoWidth = 892;
  const infoHeadingSize = 29;
  const infoDescriptionSize = 20;
  const infoPaddingTB = 35; 

  const containerWidth = '1011px'
  const containerStyle: React.CSSProperties = {
    paddingTop,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    width: containerWidth,
    background: "linear-gradient(180deg, #0b0f14 0%, #0e141a 100%)",
    color: "#E6EEF6",
  };

  const mainHeadingStyle: React.CSSProperties = {
    fontFamily: "'Bebas Neue', system-ui, sans-serif",
    fontSize: headingSize,
    letterSpacing: 1,
    margin: 0,
    lineHeight: 1,
  };

  return (
    <section style={containerStyle} className={className}>
      {/* Main heading - stays at top */}
      <div style={{ display: "flex" }}>
        <div>
          <h2 style={mainHeadingStyle}>{heading}</h2>
          <div style={{ height: gapHeadingUnderline }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                width: underline1Width,
                height: 6,
                background: accentColor,
                borderRadius: 2,
              }}
              aria-hidden
            />
          </div>
          <div style={{ height: 28 }} />

          {/* Flex container for image and content */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: gapBetweenImageAndText,
            }}
          >
            {/* Content block (text + intro) */}
            <div style={{ display: "flex" }}>
              {/* Intro paragraphs */}
              <div
                style={{
                  color: "#C9D6E6",
                  fontSize: infoDescriptionSize,
                  lineHeight: 1.6,
                  marginBottom: 22,
                  width: '422px',
                  marginRight: '68px',
                  fontFamily: "'Montserrat', system-ui, sans-serif",
                }}
              >
                <p style={{ marginTop: 0 }}>
                  Carmotive is an automotive repairs workshop which focuses on providing an all encompassing
                  service to our valued customers in southeastern Melbourne.
                </p>

                <p style={{ marginTop: 12 }}>
                  Whether it's mechanical, auto electrical, or fleetcare services, Carmotive is fully
                  equipped and skilled to provide automotive repairs.
                </p>

                <p style={{ marginTop: 12 }}>
                  With over 100 years of combined experience, we are confident in saying that no matter what
                  automotive problem you're having, we can help.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image block */}
        <div
          style={{
            width: imageWidth,
            height: imageHeight,
            flexShrink: 0,
            borderRadius: imageRadius,
            overflow: "hidden",
          }}
        >
          <img
            src={imageSrc}
            alt="Workshop"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>  
      </div>

      {/* FAQ section */}
      <div style={{ marginTop: 60, maxWidth: infoWidth }}>
        {/* FAQ heading */}
        <div style={{ marginTop: 8, marginBottom: 18 }}>
          <h3 style={mainHeadingStyle}>FAQS</h3>
          <div style={{ height: 12 }} />
          <div style={{ width: 124, height: 6, background: "#E66A6A", borderRadius: 2 }} />
        </div>

        {/* FAQ items */}
        <div
          role="region"
          aria-label="About and FAQs"
          style={{
            borderRadius: 16,
            paddingTop: infoPaddingTB,
            paddingBottom: infoPaddingTB,
            paddingLeft: 32,
            paddingRight: 32,
          }}
        >
          <div style={{ display: "grid", gap: 18 }}>
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
                  style={{
                    display: "block",
                    width: "100%",
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "rgba(6,11,15,0.55)",
                    transition: "box-shadow 180ms ease, transform 180ms ease",
                    boxShadow: isOpen ? "0 10px 30px rgba(0,0,0,0.5)" : "none",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "20px 22px",
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "#fff",
                        marginLeft: '22px',
                        marginRight: '35px'
                      }}
                      aria-hidden
                    >
                      {/* Use IconClock for first item, ScheduleIcon for second */}
                      {index === 0 ? <IconClock width='33px' height='33px' /> : <ScheduleIcon width='33px' height='33px'/>}
                    </div>

                    <h4
                      style={{
                        fontFamily: "'Montserrat', system-ui, sans-serif",
                        fontWeight: '400',
                        margin: 0,
                        fontSize: infoHeadingSize,
                        lineHeight: 1.2,
                        color: "#F4FAFF",
                      }}
                    >
                      {it.title}
                    </h4>

                    <div style={{ flex: 1 }} />

                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 180ms ease",
                        marginRight: 8,
                      }}
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
                    style={{
                      fontFamily: "'Montserrat', system-ui, sans-serif",
                      maxHeight: isOpen ? 400 : 0,
                      transition: "max-height 260ms ease, opacity 260ms ease, padding 200ms ease",
                      opacity: isOpen ? 1 : 0,
                      // Apply paddingLeft conditionally to avoid affecting closed state
                      padding: "0px 137px 18px 120px" ,
                      lineHeight: 1.6,
                      color: "#C9D6E6",
                      overflow: "hidden",
                      fontSize: '22px',
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