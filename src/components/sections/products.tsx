/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { products, videoSection } from "@/data";
import Link from "next/link";

export function Products() {
  return (
    <section
      id="products"
      className="py-24 bg-background overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-primary/5 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {products.map((product, index) => (
          <ProductSection key={product.id} data={product} index={index} />
        ))}

        <div className="flex flex-col items-center mb-32 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-primary"></span>
              <span className="text-primary font-bold uppercase tracking-widest text-sm">
                {videoSection.label}
              </span>
              <span className="h-px w-8 bg-primary"></span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
              {videoSection.title.line1} <br />
              <span className="text-primary">
                {videoSection.title.highlight}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              {videoSection.description}
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {videoSection.features.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="shrink-0 w-8 h-8 bg-primary/10 flex items-center justify-center text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href={videoSection.ctaLink}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/25 h-14 px-10 text-lg font-bold "
              >
                {videoSection.cta}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full relative group"
          >
            <div
              className={`absolute inset-0 bg-linear-to-r ${videoSection.color}  blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity duration-1000`}
            />
            <div className="relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 bg-card/50 backdrop-blur-sm">
              <div className="absolute top-0 left-0 right-0 h-12 bg-muted/40 backdrop-blur-md flex items-center px-6 space-x-3 border-b border-border/50 z-20">
                <div className="w-3.5 h-3.5 rounded-test-full bg-red-500/60 shadow-inner" />
                <div className="w-3.5 h-3.5 rounded-test-full bg-yellow-500/60 shadow-inner" />
                <div className="w-3.5 h-3.5 rounded-test-full bg-green-500/60 shadow-inner" />
                <div className="ml-6 px-4 py-1.5 bg-background/30 rounded-test-full text-[11px] text-muted-foreground font-mono tracking-wider border border-white/5">
                  {videoSection.urlDisplay}
                </div>
              </div>
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-auto mt-12 opacity-95 hover:opacity-100 transition-opacity"
              >
                <source src={videoSection.videoIn} type="video/mp4" />
                Seu navegador não suporta vídeos HTML5.
              </video>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center"
        >
          <div className="inline-block p-1 rounded-test-full bg-linear-to-r from-primary/20 to-blue-500/20 backdrop-blur-sm border border-white/10">
            <Link href="https://mindgest.mindware.ao">
              <Button
                size="lg"
                className="rounded-test-full px- h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30"
              >
                Visitar Site Oficial MindGest{" "}
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-muted-foreground text-sm">
            Experimente o futuro da gestão empresarial hoje.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ProductSection({ data }: { data: any; index: number }) {
  const isReverse = data.reverse;

  return (
    <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
      <motion.div
        initial={{ opacity: 0, x: isReverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`order-2 lg:${isReverse ? "order-2" : "order-1"}`}
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="h-px w-8 bg-primary"></span>
          <span className="text-primary font-bold uppercase tracking-widest text-sm">
            {data.label}
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {data.title.line1} <br />
          <span className="text-primary">{data.title.highlight}</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {data.description}
        </p>

        {data.features && (
          <ul className="space-y-5 mb-10">
            {data.features.map((item: any, i: number) => (
              <li key={i} className="flex items-start gap-4">
                <div className="shrink-0 mt-1 w-6 h-6 rounded-test-full bg-primary/10 flex items-center justify-center text-primary">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-base">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {data.gridFeatures && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {data.gridFeatures.map((item: any, i: number) => (
              <div
                key={i}
                className="p-4 rounded-test-xl bg-card border border-border"
              >
                <div className="w-10 h-10 rounded-test-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <item.icon className="h-5 w-5" />
                </div>
                <h4 className="font-bold mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25"
        >
          <Link href="https://mindgest.mindware.ao/auth/register">
            {data.cta}
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isReverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`order-1 lg:${
          isReverse ? "order-1" : "order-2"
        } relative group`}
      >
        <div
          className={`absolute inset-0 bg-linear-to-r ${data.color} rounded-test-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700`}
        />
        <div className="relative rounded-test-2xl overflow-hidden shadow-2xl border border-white/10 bg-card transform transition-transform duration-500 group-hover:scale-[1.01]">
          <div className="absolute top-0 left-0 right-0 h-10 bg-muted/50 flex items-center px-4 space-x-2 border-b border-border z-20">
            {data.dots.map((dotClass: string, i: number) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-test-full ${dotClass}`}
              />
            ))}
            <div className="ml-4 px-3 py-1 bg-background/50 rounded-test text-[10px] text-muted-foreground font-mono">
              {data.urlDisplay}
            </div>
          </div>

          <div className="relative aspect-video mt-10 bg-black/5">
            <NextImage
              src={data.image}
              alt={data.imageAlt}
              fill
              className="object-contain opacity-95 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
