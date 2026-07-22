"use client";

import React from "react";
import Image from "next/image";
import { IconServ } from "./icons";
import "../app/globals.css";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";

interface InfoPanelsProps {
    handleAbout?: () => void;
    handleContact?: () => void;
}

export const InfoPanels: React.FC<InfoPanelsProps> = ({ handleAbout, handleContact }) => {
    const panels = [
        {
            title: "OUR\nSERVICES",
            image: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/services.png`,
            className: "gear",
            onClick: () => { window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/services` }
        },
        {
            title: "ABOUT\nUS",
            image: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/about.png`,
            className: "pulse",
            onClick: handleAbout
        },
        {
            title: "GET IN TOUCH",
            image: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image/contact.png`,
            className: "phone-ring",
            onClick: handleContact
        },
    ];

    return (
        <motion.div
            className="flex flex-wrap justify-center gap-8 w-full max-w-7xl mx-auto px-4 py-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {panels.map((panel, i) => (
                <motion.div
                    key={i}
                    onClick={panel.onClick}
                    variants={itemVariants}
                    className={`
                        group relative w-full md:w-80 min-w-[20rem] h-[28rem]
                        rounded-2xl cursor-pointer flex-shrink-0
                        transform transition-all duration-500 ease-out
                        hover:scale-[1.02] hover:-translate-y-2
                        block-${panel.className}
                        fade-in-up delay-${(i + 1) * 100}
                    `}
                >
                    {/* Metallic Border Gradient Background */}
                    < div
                        className="absolute inset-0 rounded-2xl opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                            background: `linear-gradient(145deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 20%, rgba(0,0,0,0.8) 50%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.4) 100%)`,
                            padding: '1px',
                        }}
                    >
                        {/* Inner Content Container */}
                        <div className="relative h-full w-full rounded-2xl overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-end pb-12">

                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 z-0 select-none">
                                <Image
                                    src={panel.image}
                                    alt={panel.title.replace("\n", " ")}
                                    fill
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                                    sizes="(min-width: 768px) 20rem, 100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                            </div>

                            {/* Main Content */}
                            <div className="relative z-10 flex flex-col items-center gap-8 text-center p-6">

                                {/* Icon Container with Glow */}
                                <div className="relative flex items-center justify-center">
                                    {/* Ambient Glow behind icon */}
                                    <div className="absolute w-24 h-24 bg-red-600/30 blur-[40px] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                    <IconServ
                                        choice={i}
                                        className={`w-20 h-20 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform duration-500 ${panel.className}`}
                                    />
                                </div>

                                {/* Typography */}
                                <div className="space-y-2">
                                    <h3 className="text-5xl font-display tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-lg leading-[0.9]">
                                        {panel.title}
                                    </h3>
                                    <div className="h-[2px] w-0 bg-red-600 mx-auto transition-all duration-300 group-hover:w-16" />
                                </div>
                            </div>

                            {/* Decorative element for 3rd item */}
                            {i === 2 && (
                                <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-600/20 blur-[50px] -z-10 rounded-full pointer-events-none" />
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};