import React from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface SocialLink {
    icon: IconType;
    href: string;
    label: string;
}

interface SocialLinksProps {
    links: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 mt-12"
        >
            {links.map(({ icon: Icon, href, label }) => (
                <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-[#BE5161] hover:text-white transition-all duration-300"
                >
                    <Icon size={20} />
                </motion.a>
            ))}
        </motion.div>
    );
};

export default SocialLinks;
