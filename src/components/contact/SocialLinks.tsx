import React from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface SocialLinksProps {
    icons: IconType[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ icons }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 mt-12"
        >
            {icons.map((Icon, i) => (
                <motion.a
                    key={i}
                    href="#"
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
