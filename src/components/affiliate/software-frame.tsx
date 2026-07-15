"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

type SoftwareFrameProps = {
  label: string;
  urlDisplay: string;
  src?: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
};

/** Browser chrome frame for affiliate product shots — shows image or placeholder. */
export function SoftwareFrame({
  label,
  urlDisplay,
  src,
  alt,
  className = "",
  priority = false,
}: SoftwareFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
      className={`group relative ${className}`}
    >
      <div className="absolute inset-0 bg-primary/20 blur-[80px] opacity-40 transition-opacity duration-700 group-hover:opacity-60" />
      <div className="relative overflow-hidden border border-border bg-card shadow-[0_40px_100px_-30px_rgba(153,86,246,0.35)]">
        <div className="flex h-11 items-center gap-2 border-b border-border bg-muted/40 px-4">
          <span className="size-2.5 bg-red-500/70" />
          <span className="size-2.5 bg-yellow-500/70" />
          <span className="size-2.5 bg-green-500/70" />
          <span className="ml-3 truncate bg-background/60 px-3 py-1 font-mono text-[10px] tracking-wider text-muted-foreground">
            {urlDisplay}
          </span>
          <span className="ml-auto hidden text-[10px] font-bold tracking-widest text-primary uppercase sm:inline">
            {label}
          </span>
        </div>

        <div className="relative aspect-video w-full bg-muted/20">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 640px, 100vw"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br from-primary/10 via-background to-muted/40 p-8 text-center">
              <div className="grid size-14 place-items-center border border-dashed border-primary/40 bg-primary/10 text-primary">
                <ImageIcon className="size-6" />
              </div>
              <p className="text-sm font-bold tracking-wide text-foreground">
                Imagem do software
              </p>
              <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                Espaço reservado para capturas do portal — {label.toLowerCase()}.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
