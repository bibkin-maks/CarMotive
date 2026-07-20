"use client";

import React from "react";
import { motion } from "framer-motion";

const MapWidget: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.25, duration: 0.5 }}
      className="group relative h-[220px] w-full overflow-hidden rounded-card border border-steel-700 bg-steel-850 sm:h-[260px]"
    >
      {/* Scrim lifts on hover so the map is readable when you actually
          want it, and recedes into the panel when you don't. */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-steel-900/70 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
      <iframe
        title="Carmotive workshop location, 292 Boundary Road, Dingley Village"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12578.54541670751!2d145.110033!3d-37.985615!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66d1adb8689b1%3A0xbb65bc7a9bd67320!2sCarmotive!5e0!3m2!1sen!2sau!4v1757586625186!5m2!1sen!2sau"
        width="100%"
        height="100%"
        style={{
          border: 0,
          filter: "invert(92%) hue-rotate(180deg) contrast(88%) saturate(60%)",
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="grayscale transition-all duration-700 group-hover:grayscale-0"
      />
    </motion.div>
  );
};

export default MapWidget;
