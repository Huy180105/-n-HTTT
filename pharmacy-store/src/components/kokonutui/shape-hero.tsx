"use client";

/**
 * @author: @dorian_baffier
 * @description: Shape Hero
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
    borderRadius = 16,
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
    borderRadius?: number;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    style={{ borderRadius }}
                    className={cn(
                        "absolute inset-0",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px]",
                        "ring-1 ring-white/[0.1] dark:ring-white/[0.02]",
                        "shadow-[0_2px_16px_-2px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_16px_-2px_rgba(255,255,255,0.04)]",
                        "after:absolute after:inset-0",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)] dark:after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_70%)]",
                        "after:rounded-[inherit]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

export default function ShapeHero() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-50 via-slate-50 to-cyan-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-violet-950 dark:to-slate-900">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.05] via-transparent to-cyan-500/[0.05] dark:from-violet-500/[0.03] dark:via-transparent dark:to-cyan-500/[0.03]" />

            <div className="absolute inset-0 overflow-hidden">
                {/* Tall rectangle - top left */}
                <ElegantShape
                    delay={0.3}
                    width={300}
                    height={500}
                    rotate={-8}
                    borderRadius={24}
                    gradient="from-violet-600/[0.18] dark:from-violet-500/[0.15]"
                    className="left-[-15%] top-[-10%]"
                />

                {/* Wide rectangle - bottom right */}
                <ElegantShape
                    delay={0.5}
                    width={600}
                    height={200}
                    rotate={15}
                    borderRadius={20}
                    gradient="from-cyan-500/[0.18] dark:from-cyan-500/[0.15]"
                    className="right-[-20%] bottom-[-5%]"
                />

                {/* Square - middle left */}
                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={300}
                    rotate={24}
                    borderRadius={32}
                    gradient="from-indigo-500/[0.18] dark:from-indigo-500/[0.15]"
                    className="left-[-5%] top-[40%]"
                />

                {/* Small rectangle - top right */}
                <ElegantShape
                    delay={0.6}
                    width={250}
                    height={100}
                    rotate={-20}
                    borderRadius={12}
                    gradient="from-sky-500/[0.18] dark:from-sky-500/[0.15]"
                    className="right-[10%] top-[5%]"
                />

                {/* Medium rectangle - center right */}
                <ElegantShape
                    delay={0.7}
                    width={400}
                    height={150}
                    rotate={35}
                    borderRadius={16}
                    gradient="from-violet-500/[0.18] dark:from-violet-500/[0.15]"
                    className="right-[-10%] top-[45%]"
                />

                {/* Small square - bottom left */}
                <ElegantShape
                    delay={0.2}
                    width={200}
                    height={200}
                    rotate={-25}
                    borderRadius={28}
                    gradient="from-cyan-600/[0.18] dark:from-cyan-600/[0.15]"
                    className="left-[20%] bottom-[10%]"
                />

                {/* Tiny rectangle - top center */}
                <ElegantShape
                    delay={0.8}
                    width={150}
                    height={80}
                    rotate={45}
                    borderRadius={10}
                    gradient="from-indigo-600/[0.18] dark:from-indigo-600/[0.15]"
                    className="left-[40%] top-[15%]"
                />

                {/* Wide rectangle - middle */}
                <ElegantShape
                    delay={0.9}
                    width={450}
                    height={120}
                    rotate={-12}
                    borderRadius={18}
                    gradient="from-sky-600/[0.18] dark:from-sky-600/[0.15]"
                    className="left-[25%] top-[60%]"
                />
            </div>

            {/* Gradient overlay để tạo depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50/40 via-transparent to-slate-50/20 dark:from-slate-950/40 dark:via-transparent dark:to-slate-950/20 pointer-events-none" />
        </div>
    );
}
