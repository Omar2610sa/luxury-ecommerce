"use client"

import { motion } from "motion/react"

type Direction = "up" | "down" | "left" | "right"

interface FadeInProps {
    children: React.ReactNode
    direction?: Direction
    delay?: number
    duration?: number
    className?: string
}

const directionOffset: Record<Direction, { x?: number; y?: number }> = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
}

export default function FadeIn({
    children,
    direction = "up",
    delay = 0,
    duration = 0.6,
    className,
}: FadeInProps) {
    const offset = directionOffset[direction]

    return (
        <motion.div
            initial={{ opacity: 0, ...offset }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}