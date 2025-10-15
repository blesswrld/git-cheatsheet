import { motion } from "framer-motion";

export const MergeViz = () => (
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
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
            </marker>
        </defs>
        <motion.path
            d="M 10 20 H 190"
            stroke="#94a3b8"
            strokeWidth="2"
            markerEnd="url(#arrow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
        />
        <motion.circle
            cx="30"
            cy="20"
            r="4"
            fill="#94a3b8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
        />
        <motion.circle
            cx="70"
            cy="20"
            r="4"
            fill="#94a3b8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
        />

        <motion.path
            d="M 70 20 C 100 20, 110 60, 140 60 H 10"
            stroke="#34d399"
            strokeWidth="2"
            markerEnd="url(#arrow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.circle
            cx="115"
            cy="52"
            r="4"
            fill="#34d399"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
        />

        <motion.path
            d="M 140 60 C 150 60, 160 20, 160 20"
            stroke="#34d399"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
        />
        <motion.circle
            cx="160"
            cy="20"
            r="5"
            fill="#f472b6"
            stroke="#fff"
            strokeWidth="1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2 }}
        />
    </svg>
);
