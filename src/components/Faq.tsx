import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  Easing,
  Variants
} from "framer-motion";
import { IconClock, ScheduleIcon } from "@/components/icons";
import { ChevronRight } from "lucide-react";

// Luxury easing presets
const LUXURY_EASING = {
  enter: [0.22, 1, 0.36, 1] as Easing,
  exit: [0.87, 0, 0.13, 1] as Easing,
  bounce: [0.68, -0.55, 0.265, 1.55] as Easing
};

// Container variant for staggered children
const faqContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

// Item variant for smooth reveal
const faqItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: LUXURY_EASING.enter
    }
  }
};

interface FAQItem {
  id: string;
  title: string;
  body: React.ReactNode;
}

interface Props {
  heading?: string;
  accentColor?: string;
  imageSrc?: string;
  items?: FAQItem[];
  className?: string;
}

const AnimatedBackground = () => (
  <>
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
        x: [0, 50, 0],
        y: [0, -30, 0]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#BE5161]/10 via-transparent to-[#8B5CF6]/10 rounded-full blur-[120px] pointer-events-none"
    />

    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        x: [0, 30, 0],
        y: [0, -20, 0]
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-900/15 via-transparent to-emerald-500/10 rounded-full blur-[100px] pointer-events-none"
    />
  </>
);

const LuxuryHeading = ({ heading, accentColor }: { heading: string; accentColor: string }) => {
  return (
    <div className="relative mb-2">
      <motion.h2
        variants={faqItemVariants}
        className="font-['Bebas_Neue'] text-4xl sm:text-7xl tracking-wide leading-none"
      >
        <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          {heading}
        </span>
      </motion.h2>
      <motion.div
        variants={{
          hidden: { width: 0 },
          visible: {
            width: 406,
            transition: { duration: 0.8, ease: LUXURY_EASING.enter }
          }
        }}
        className="bg-gradient-to-r from-[#BE5161] to-transparent h-1.5 rounded-full"
      />
    </div>
  );
};

const LuxuryAccordionItem = ({
  item,
  index,
  isOpen,
  onClick,
  accentColor
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onClick: () => void;
  accentColor: string;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <motion.article
      variants={faqItemVariants}
      onClick={onClick}
      className={`
        group relative w-full rounded-xl overflow-hidden 
        cursor-pointer transition-all duration-300
        border backdrop-blur-sm
        ${isOpen
          ? "bg-white/[0.03] border-[#BE5161]/40"
          : "bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
        }
      `}
    >
      <div className="relative flex items-center p-6 gap-5 z-10">
        {/* Icon */}
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center 
            shrink-0 transition-all duration-300
            ${isOpen
              ? 'bg-[#BE5161] text-white'
              : 'bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-white/10'
            }
          `}
        >
          {index === 0 ? (
            <IconClock className="w-5 h-5" />
          ) : (
            <ScheduleIcon className="w-5 h-5" />
          )}
        </div>

        <h4 className={`
          font-medium text-lg flex-1 transition-colors duration-300
          ${isOpen ? "text-white" : "text-gray-300 group-hover:text-white"}
        `}>
          {item.title}
        </h4>

        <div
          className={`
             transition-transform duration-300
            ${isOpen ? 'rotate-90 text-[#BE5161]' : 'text-gray-500 group-hover:text-gray-300'}
          `}
        >
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{
          height: {
            duration: 0.4,
            ease: LUXURY_EASING.bounce
          },
          opacity: {
            duration: 0.3
          }
        }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="px-6 pb-6 pt-0 pl-[4.5rem]">
          <p className="text-gray-400 font-light text-base leading-relaxed">
            {item.body}
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
};

const LuxuryImage = ({ imageSrc }: { imageSrc: string }) => {
  const [isLoaded, setIsLoaded] = useState(true);

  return (
    <motion.div
      variants={faqItemVariants}
      className="relative w-full h-[400px] lg:h-full rounded-2xl overflow-hidden 
                 border border-white/10 bg-black/20"
    >
      <motion.img
        src={imageSrc}
        alt="Workshop"
        className="w-full h-full object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
        onLoad={() => setIsLoaded(true)}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e141a] via-transparent to-transparent opacity-40" />
    </motion.div>
  );
};

export default function FaqSection({
  heading = "WHO WE ARE",
  accentColor = "#BE5161",
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
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Parallax effect for image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={faqContainerVariants}
      className={`relative w-full max-w-7xl mx-auto rounded-[32px] 
                  border border-white/10 bg-gradient-to-br 
                  from-[#0e141a] to-[#131c24] overflow-hidden 
                  ${className || ""}`}
      style={{
        boxShadow: `
          0 20px 60px rgba(190, 81, 97, 0.15),
          0 0 0 1px rgba(255,255,255,0.1),
          inset 0 1px 0 rgba(255,255,255,0.1)
        `
      }}
    >
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col xl:flex-row gap-12 xl:gap-20 p-10">
        {/* Left Content */}
        <div className="flex-1 flex flex-col">
          <LuxuryHeading heading={heading} accentColor={accentColor} />

          {/* Text content with staggered reveal */}
          <motion.div
            variants={faqContainerVariants}
            className="text-gray-300/90 font-light text-lg 
                       leading-relaxed space-y-6 max-w-2xl my-12"
          >
            {[
              "Carmotive is an automotive repairs workshop which focuses on providing an all-encompassing service to our valued customers in southeastern Melbourne.",
              "Whether it's mechanical, auto electrical, or fleetcare services, Carmotive is fully equipped and skilled to provide automotive repairs.",
              "With over 100 years of combined experience, we are confident in saying that no matter what automotive problem you're having, we can help."
            ].map((paragraph, index) => (
              <motion.p
                key={index}
                variants={faqItemVariants}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <motion.div variants={faqContainerVariants}>
            <motion.div
              variants={faqItemVariants}
              className="flex items-center gap-4 mb-8"
            >
              <h3 className="font-['Bebas_Neue'] tracking-wider text-5xl text-white">
                <span className="bg-gradient-to-r from-white to-gray-300 
                                bg-clip-text text-transparent">
                  FAQS
                </span>
              </h3>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASING.enter }}
                className="flex-1 h-[1px] bg-gradient-to-r from-white/20 
                          via-white/40 to-transparent origin-left"
              />
            </motion.div>

            {/* Accordion List */}
            <motion.div
              className="flex flex-col gap-4"
              variants={faqContainerVariants}
            >
              {items.map((item, index) => (
                <LuxuryAccordionItem
                  key={item.id}
                  item={item}
                  index={index}
                  isOpen={openId === item.id}
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  accentColor={accentColor}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          style={{ y: imageY }}
          className="w-full xl:w-[450px] shrink-0"
          variants={faqItemVariants}
        >
          <LuxuryImage imageSrc={imageSrc} />
        </motion.div>
      </div>
    </motion.section>
  );
}