"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackButton() {
    return (
        <div className="fixed top-8 left-8 z-50">
            <Link href="/">
                <Button variant="outline" size="sm" className="bg-black/20 backdrop-blur-md border-white/10 hover:bg-white/10 text-white rounded-test-test-full px-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                </Button>
            </Link>
        </div>
    );
}
