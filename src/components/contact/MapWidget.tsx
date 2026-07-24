import React from "react";
import { motion } from "framer-motion";

const MapWidget: React.FC = () => {
    return (
        <motion.div
            initial={{ scale: 0.98, opacity: 0 }} // Reduced scale effect for smoother entry
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full h-[340px] sm:h-[440px] lg:h-full lg:min-h-[440px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0f14] relative group"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e141a]/80 to-transparent pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-50" />
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12578.54541670751!2d145.110033!3d-37.985615!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66d1adb8689b1%3A0xbb65bc7a9bd67320!2sCarmotive!5e0!3m2!1sen!2sau!4v1757586625186!5m2!1sen!2sau"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(85%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
            />
        </motion.div>
    );
};

export default MapWidget;
