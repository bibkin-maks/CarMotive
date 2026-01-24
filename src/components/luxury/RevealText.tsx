import { motion } from 'framer-motion';

export const RevealText = ({ text, delay = 0 }: { text: string; delay?: number }) => (
    <div className="overflow-hidden">
        <motion.span
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.22, 1, 0.36, 1]
            }}
            className="inline-block"
        >
            {text}
        </motion.span>
    </div>
);
