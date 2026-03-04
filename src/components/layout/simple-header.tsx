import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function SimpleHeader() {
  return (
    <header
      className={`fixed backdrop-blur-sm border-b top-0 left-0 right-0 z-50 transition-all duration-300 bg-background`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 text-foreground font-semibold text-lg"
        >
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <span>Mindware</span>
        </Link>
        <Link href="/" className="text-foreground flex items-center gap-2 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Link>
      </div>
    </header> 
  );
}
