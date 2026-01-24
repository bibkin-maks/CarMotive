import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }}
        className={`
      backdrop-blur-xs bg-white/5 
      border border-white/10
      shadow-2xl shadow-black/20
      ${className}
    `}
    >
        {children}
    </motion.div>
);
