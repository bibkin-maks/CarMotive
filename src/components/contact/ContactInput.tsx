import React from "react";
import { motion, Variants } from "framer-motion";

interface ContactInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    index: number;
    variants?: Variants;
}

const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * i, // Reduced delay for faster appearance
            duration: 0.4,   // Reduced duration
            ease: "easeOut"
        }
    })
};

const ContactInput: React.FC<ContactInputProps> = ({ index, variants = defaultVariants, className, ...props }) => {
    return (
        <motion.div
            custom={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <input
                className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#BE5161]/50 focus:bg-white/10 focus:ring-1 focus:ring-[#BE5161]/50 transition-all duration-300 backdrop-blur-sm ${className || ""}`}
                {...props}
            />
        </motion.div>
    );
};

export default ContactInput;
