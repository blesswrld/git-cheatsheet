import { motion } from "framer-motion";

export const RebaseViz = () => (
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
        <path
            d="M 10 20 H 190"
            stroke="#94a3b8"
            strokeWidth="2"
            markerEnd="url(#arrow)"
        />
        <circle cx="30" cy="20" r="4" fill="#94a3b8" />
        <circle cx="70" cy="20" r="4" fill="#94a3b8" />

        <motion.path
            d="M 70 20 C 100 20, 110 60, 140 60 H 10"
            stroke="#34d399"
            strokeWidth="2"
            markerEnd="url(#arrow)"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0.3 }}
        />
        <motion.circle
            cx="115"
            cy="52"
            r="4"
            fill="#34d399"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0.3 }}
        />

        <motion.circle
            cx="115"
            cy="52"
            r="4"
            fill="#34d399"
            initial={{ x: 0, y: 0 }}
            animate={{ x: [0, -5, 0], y: [0, -32, -32] }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
            d="M 110 20 H 150"
            stroke="#34d399"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
        />
    </svg>
);
