"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingStickerProps {
    children: ReactNode;
    className?: string; // For positioning (absolute) and sizing
    delay?: number;
    duration?: number;
    rotateRange?: [number, number]; // e.g. [-10, 10]
    yRange?: [number, number]; // e.g. [-10, 10]
}

export function FloatingSticker({
    children,
    className,
    delay = 0,
    duration = 4,
    rotateRange = [-5, 5],
    yRange = [-10, 10],
}: FloatingStickerProps) {
    return (
        <motion.div
            className={cn("absolute pointer-events-none select-none", className)}
            initial={{ y: 0, rotate: 0 }}
            animate={{
                y: yRange,
                rotate: rotateRange,
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay,
            }}
        >
            {children}
        </motion.div>
    );
}
