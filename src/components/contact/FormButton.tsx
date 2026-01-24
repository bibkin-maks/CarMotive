import React from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

interface FormButtonProps extends HTMLMotionProps<"button"> {
    index: number;
    variants?: Variants;
    children: React.ReactNode;
}

const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * i,
            duration: 0.4,
            ease: "easeOut"
        }
    })
};

const FormButton: React.FC<FormButtonProps> = ({ index, variants = defaultVariants, children, className, ...props }) => {
    return (
        <motion.div
            custom={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="pt-4"
        >
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-gradient-to-r from-[#BE5161] to-[#e05e70] text-white font-semibold py-4 px-10 rounded-full shadow-lg shadow-[#BE5161]/30 hover:shadow-[#BE5161]/50 transition-all duration-300 w-full sm:w-auto overflow-hidden relative group ${className || ""}`}
                {...props}
            >
                <span className="relative z-10">{children}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </motion.button>
        </motion.div>
    );
};

export default FormButton;
