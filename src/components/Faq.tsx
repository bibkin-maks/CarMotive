import React, { useState, useRef, useCallback, useMemo, memo } from "react";
import {
  motion,
  useInView,
} from "framer-motion";
import Image from "next/image";
import { IconClock, ScheduleIcon } from "@/components/icons";
import { ChevronRight } from "lucide-react";
import { containerVariants, itemVariants } from "@/utils/animations";
import { LuxuryHeading, AnimatedBackground } from "@/components/ui/LuxuryElements";

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

// 5. Extract static data
const DEFAULT_ITEMS: FAQItem[] = [
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
];

// 1. Memoize static components & 3. Optimize animations
const LuxuryAccordionItem = memo(function LuxuryAccordionItem({
  item,
  index,
  isOpen,
  onClick
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.article
      variants={itemVariants}
      onClick={onClick}
      style={{ willChange: 'transform, opacity' }} // GPU acceleration
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
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-6 pt-0 pl-[4.5rem]">
          <p className="text-gray-400 font-light text-base leading-relaxed">
            {item.body}
          </p>
        </div>
      </div>
    </motion.article>
  );
});

// 4. Use CSS containment for image & memoize
const LuxuryImage = memo(function LuxuryImage({ imageSrc }: { imageSrc: string }) {
  return (
    <motion.div
      variants={itemVariants}
      style={{ contain: 'layout paint' }} // CSS containment
      className="relative w-full h-[400px] lg:h-full rounded-2xl overflow-hidden 
                 border border-white/10 bg-black/20"
    >
      <Image
        src={imageSrc}
        alt="Workshop"
        fill
        priority={false}
        loading="lazy" // Lazy load non-critical images
        quality={85} // Reduce image quality slightly
        className="object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 450px"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e141a] via-transparent to-transparent opacity-40 z-10" />
    </motion.div>
  );
});

const FaqSection = ({
  heading = "WHO WE ARE",
  accentColor = "#BE5161",
  imageSrc = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/FAQ.png`,
  items = DEFAULT_ITEMS,
  className,
}: Props) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Reduced threshold for better performance
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // 2. Optimize handlers with useCallback
  const handleItemClick = useCallback((id: string) => {
    setOpenId(prev => prev === id ? null : id);
  }, []);

  // Memoize items array to prevent unnecessary re-renders of list
  const memoizedItems = useMemo(() => items, [items]);

  // 7. Optimize re-renders with key selection and stable render function
  const renderItem = useCallback((item: FAQItem, index: number) => (
    <LuxuryAccordionItem
      key={item.id}
      item={item}
      index={index}
      isOpen={openId === item.id}
      onClick={() => handleItemClick(item.id)}
    />
  ), [openId, handleItemClick]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full max-w-7xl mx-auto rounded-[32px] 
                  border border-white/10 bg-gradient-to-br 
                  from-[#0e141a] to-[#131c24] overflow-hidden 
                  ${className || ""}`}
      style={{
        boxShadow: `
          0 20px 60px rgba(190, 81, 97, 0.15),
          0 0 0 1px rgba(255,255,255,0.1),
          inset 0 1px 0 rgba(255,255,255,0.1)
        `,
        '--accent-color': accentColor,
      } as React.CSSProperties}
    >
      <AnimatedBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 flex flex-col xl:flex-row gap-12 xl:gap-20 p-10"
      >
        {/* Left Content */}
        <div className="flex-1 flex flex-col">
          <LuxuryHeading heading={heading} />

          {/* Text content */}
          <div
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
                variants={itemVariants}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* FAQ Section */}
          <div>
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 mb-8"
            >
              <h3 className="font-['Bebas_Neue'] tracking-wider text-5xl text-white">
                <span className="bg-gradient-to-r from-white to-gray-300 
                                bg-clip-text text-transparent">
                  FAQS
                </span>
              </h3>
              <div
                className="flex-1 h-[1px] bg-gradient-to-r from-white/20 
                          via-white/40 to-transparent origin-left opacity-100"
              />
            </motion.div>

            {/* Accordion List */}
            <div
              className="flex flex-col gap-4"
            >
              {memoizedItems.map(renderItem)}
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div
          className="w-full xl:w-[450px] shrink-0"
        >
          <LuxuryImage imageSrc={imageSrc} />
        </div>
      </motion.div>
    </section>
  );
};

export default memo(FaqSection);