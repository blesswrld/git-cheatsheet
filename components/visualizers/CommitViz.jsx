import { motion } from "framer-motion";

export const CommitViz = () => (
    <svg width="100%" height="80" viewBox="0 0 200 80">
        <defs>
            <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
            >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
        </defs>
        <motion.path
            d="M 10 40 H 190"
            stroke="#94a3b8"
            strokeWidth="2"
            markerEnd="url(#arrow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
        />
        <motion.circle
            cx="50"
            cy="40"
            r="4"
            fill="#94a3b8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
        />
        <motion.circle
            cx="90"
            cy="40"
            r="4"
            fill="#94a3b8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
        />

        <motion.circle
            cx="130"
            cy="40"
            r="5"
            fill="#34d399"
            stroke="#fff"
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                delay: 1.5,
                type: "spring",
                stiffness: 300,
                damping: 20,
            }}
        />
    </svg>
);
