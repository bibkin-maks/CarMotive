import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "@/utils/animations";

export const AnimatedBackground = ({
    className = "",
    reduceMotionOnMobile = true
}: {
    className?: string;
    reduceMotionOnMobile?: boolean; // If true, hides on mobile or reduces blur
}) => (
    <>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#BE5161]/10 via-transparent to-[#8B5CF6]/10 rounded-full blur-[120px] pointer-events-none ${reduceMotionOnMobile ? 'hidden sm:block' : ''} ${className}`}
        />
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className={`absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-900/15 via-transparent to-emerald-500/10 rounded-full blur-[100px] pointer-events-none ${reduceMotionOnMobile ? 'hidden sm:block' : ''} ${className}`}
        />
    </>
);

export const LuxuryHeading = ({ heading, className = "" }: { heading: string; className?: string }) => {
    return (
        <div className={`relative mb-2 ${className}`}>
            <motion.h2
                variants={itemVariants}
                className="font-['Bebas_Neue'] text-4xl sm:text-7xl tracking-wide leading-none"
            >
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                    {heading}
                </span>
            </motion.h2>
            <motion.div
                variants={{
                    hidden: { width: 0, opacity: 0 },
                    visible: {
                        width: 100,
                        opacity: 1,
                        transition: { duration: 0.8, delay: 0.4, ease: "easeOut" }
                    }
                }}
                className="bg-gradient-to-r from-[#BE5161] to-transparent h-1.5 rounded-full"
            />
        </div>
    );
};
