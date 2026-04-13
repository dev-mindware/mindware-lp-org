import React from "react";
import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { FYIContent } from "./components/fyi-content";

export const metadata: Metadata = {
    title: "FYI: Guia Completo de Facturação em Angola",
    description: "Conheça tudo sobre o regime de facturação electrónica em Angola, software certificado pela AGT e as notas de crédito necessárias para o seu negócio estar legal.",
    keywords: [
        "Software de Facturação Angola",
        "Melhor Software de Facturação em Angola",
        "Facturação Angola",
        "AGT Software Certificado",
        "SAF-T Angola",
        "IVA Angola 14%",
        "Nota de Crédito Angola",
        "Facturação Electrónica Angola"
    ],
    openGraph: {
        title: "Guia Completo de Facturação em Angola | Mindware",
        description: "Referência completa sobre conformidade fiscal, processos AGT e implementação de software certificado em Angola.",
        url: "https://mindware.ao/fyi",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "FYI Mindware - Facturação e Impostos em Angola",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Guia Completo de Facturação em Angola | Mindware",
        description: "Referência completa sobre conformidade fiscal, processos AGT e software certificado em Angola.",
        images: ["/og-image.png"],
    },
};

export default function FYIPage() {
    return (
        <>
            <Header />
            <FYIContent />
            <Footer />
        </>
    );
}
