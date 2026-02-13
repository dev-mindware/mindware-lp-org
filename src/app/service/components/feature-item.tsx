"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureItemProps {
    icon: LucideIcon;
    title: string;
    description: string;
    delay?: number;
}

export function FeatureItem({ icon: Icon, title, description, delay = 0 }: FeatureItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02, backgroundColor: "var(--muted)" }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="flex gap-4 p-6 rounded-teste-2xl bg-card/40 backdrop-blur-md border border-border/50 shadow-lg group cursor-default relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-12 h-12 rounded-teste-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6" />
            </div>
            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
}
