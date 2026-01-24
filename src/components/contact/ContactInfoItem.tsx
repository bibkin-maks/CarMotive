import React from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface ContactInfoItemProps {
    icon: IconType;
    text: string;
    delay: number;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon: Icon, text, delay }) => {
    return (
        <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }} // Optimized duration
            className="flex items-start gap-4 group"
        >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-[#BE5161] group-hover:bg-[#BE5161] group-hover:text-white transition-all duration-300 shrink-0">
                <Icon size={18} />
            </div>
            <span className="flex-1 font-light group-hover:text-white transition-colors duration-300 mt-2">
                {text}
            </span>
        </motion.div>
    );
};

export default ContactInfoItem;
