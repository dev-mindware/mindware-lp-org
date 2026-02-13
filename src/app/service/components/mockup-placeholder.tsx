"use client";

import React from "react";

interface MockupPlaceholderProps {
    type?: "desktop" | "mobile";
    children?: React.ReactNode;
}

export function MockupPlaceholder({ type = "desktop", children }: MockupPlaceholderProps) {
    return (
        <div className="relative group">
            {/* Glow Effect */}
            <div className={`absolute inset-0 bg-linear-to-br from-primary/20 to-blue-500/20 rounded-teste-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700`} />

            <div className={`relative ${type === "desktop" ? "aspect-video w-full" : "aspect-9/19 w-64 mx-auto"} bg-card rounded-teste-2xl border border-white/10 overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.01]`}>
                {/* Browser/Macbook Header */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-muted/50 backdrop-blur-md flex items-center px-4 space-x-2 border-b border-border z-20">
                    <div className="w-3 h-3 rounded-teste-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-teste-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-teste-full bg-green-500/80" />
                    <div className="ml-4 px-3 py-1 bg-background/50 rounded-teste text-[10px] text-muted-foreground font-mono">
                        {type === "desktop" ? "service.mindware.ao" : "m.mindware.ao"}
                    </div>
                </div>

                {/* Content Area */}
                <div className="absolute inset-0 mt-10 bg-linear-to-br from-primary/5 to-transparent overflow-hidden">
                    {children ? children : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/5 font-black uppercase tracking-[1em] text-2xl rotate-12 select-none">
                            {type} VISUAL
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
