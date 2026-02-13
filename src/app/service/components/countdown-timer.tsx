"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
    targetDate: string;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex gap-3 md:gap-4 justify-center">
            {[
                { label: "Dias", value: timeLeft.days },
                { label: "Horas", value: timeLeft.hours },
                { label: "Min", value: timeLeft.minutes },
                { label: "Seg", value: timeLeft.seconds }
            ].map((unit, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-background/50 border border-white/10 flex items-center justify-center rounded-teste-xl mb-1.5 backdrop-blur-sm">
                        <span className="text-xl md:text-2xl font-black">{unit.value.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest font-bold opacity-60">{unit.label}</span>
                </div>
            ))}
        </div>
    );
}
