import React from "react";
import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { FYIContent } from "./components/fyi-content";

export const metadata: Metadata = {
    title: "FYI | Guia de Facturação em Angola - MindGest",
    description: "Conheça tudo sobre o regime de facturação electrónica em Angola, software certificado pela AGT e os melhores softwares de facturação em Angola para o seu negócio.",
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
        title: "Guia Completo de Facturação em Angola | MindWare",
        description: "Referência completa sobre conformidade fiscal e software certificado em Angola.",
        url: "https://mindware.ao/fyi",
        siteName: "MindWare",
        locale: "pt_AO",
        type: "website",
    }
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
