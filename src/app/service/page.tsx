"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";


// Extracted Components
import { BackButton } from "./components/back-button";
import { HeroSection } from "./components/hero-section";
import { BrandingSection } from "./components/branding-section";
import { WebsiteSection } from "./components/website-section";
import { PricingSection } from "./components/pricing-section";
import { Footer } from "@/components/layout/footer";
import { EmailServiceSection } from "./components/email-service-section";

export default function ServicePage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const springScroll = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Parallax Transforms
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const textY1 = useTransform(scrollYProgress, [0, 1], ["-5%", "25%"]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    // Additional animations for sections
    const brandingScale = useTransform(scrollYProgress, [0.1, 0.3], [0.9, 1]);
    const brandingOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
    const websiteX = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);

    return (
        <div ref={containerRef} className="relative bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
            {/* Nav / Back Button */}
            <BackButton />

            {/* Sticky Background Logic */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <motion.div
                    style={{ y: bgY, rotate }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--primary),transparent_70%)] opacity-10 dark:opacity-20"
                />

                {/* Large Background Text Layer 1 - Moving Down */}
                <motion.div
                    style={{ y: textY1 }}
                    className="absolute top-1/3 left-20 w-full opacity-10 dark:opacity-20"
                >
                    <h2 className="text-[18vw] font-black leading-none uppercase tracking-tighter select-none whitespace-nowrap text-primary blur-[2px]">
                        MINDWARE
                    </h2>
                </motion.div>
            </div>

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
                style={{ scaleX: springScroll }}
            />

            {/* Modular Sections */}
            <HeroSection heroScale={heroScale} heroOpacity={heroOpacity} />

            <BrandingSection brandingScale={brandingScale} brandingOpacity={brandingOpacity} />

            <WebsiteSection websiteX={websiteX} scrollYProgress={scrollYProgress} />

            <PricingSection />

            <EmailServiceSection />

            {/* Footer minimal */}
            <Footer />
        </div>
    );
}
