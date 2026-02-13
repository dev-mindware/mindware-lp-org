"use client";

import {
  Check,
  ExternalLink,
  Activity,
  PieChart,
  TrendingUp,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const products = [
  {
    id: "finance",
    label: "MindGest ERP",
    title: {
      line1: "Controle Financeiro",
      highlight: "Reimaginado",
    },
    description:
      "Diga adeus às planilhas espalhadas. O MindGest centraliza suas operações financeiras, dando a você uma visão cristalina da saúde da sua empresa. Experimente contabilidade automatizada, previsões precisas e gestão de conformidade perfeita.",
    features: [
      {
        title: "Reconciliação Automatizada",
        desc: "Conecte feeds bancários e deixe a IA cuidar da correspondência.",
      },
      {
        title: "Suporte Multimoeda",
        desc: "Negócios globais facilitados com taxas de câmbio em tempo real.",
      },
      {
        title: "Faturamento Inteligente",
        desc: "Crie, envie e rastreie faturas profissionais instantaneamente.",
      },
    ],
    image: "/screen2.png",
    imageAlt: "Dashboard Financeiro MindGest",
    urlDisplay: "finance.mindgest.app",
    cta: "Explorar Finanças",
    color: "from-primary/20 to-blue-500/20",
    dots: ["bg-red-500/80", "bg-yellow-500/80", "bg-green-500/80"],
  },
  {
    id: "analytics",
    label: "MindGest IA",
    title: {
      line1: "Dados em Tempo Real",
      highlight: "Na Sua Mão",
    },
    description:
      "Dados só são bons se gerarem insights. O Motor de Analytics do MindGest processa milhões de pontos de dados instantaneamente, apresentando inteligência acionável através de dashboards personalizáveis e interativos.",
    gridFeatures: [
      {
        title: "Monitoramento ao Vivo",
        desc: "KPIs atualizados em tempo real.",
        icon: Activity,
      },
      {
        title: "Relatórios Personalizados",
        desc: "Construtor arrasta-e-solta.",
        icon: PieChart,
      },
      {
        title: "IA Preditiva",
        desc: "Preveja tendências instantaneamente.",
        icon: TrendingUp,
      },
      {
        title: "Compartilhamento Fácil",
        desc: "Compartilhe insights com segurança.",
        icon: Share2,
      },
    ],
    image: "/screen1.png",
    imageAlt: "Dashboard Analytics MindGest",
    urlDisplay: "analytics.mindgest.app",
    cta: "Ver Demo Analytics",
    color: "from-primary/20 to-cyan-500/20",
    dots: ["bg-red-500/80", "bg-yellow-500/80", "bg-green-500/80"],
    reverse: true, // Layout invertido para esta seção
  },
];

const videoSection = {
  label: "MindGest em Ação",
  title: {
    line1: "Veja o Software",
    highlight: "ao Vivo",
  },
  description:
    "Explore como a nossa plataforma funciona na prática. Interface intuitiva, fluxos de trabalho otimizados e recursos poderosos ao seu alcance.",
  features: [
    {
      title: "Interface Intuitiva",
      desc: "Design pensado para maximizar produtividade.",
    },
    {
      title: "Fluxo Simplificado",
      desc: "Processos otimizados para economia de tempo.",
    },
    {
      title: "Recursos Avançados",
      desc: "Ferramentas poderosas de forma acessível.",
    },
  ],
  videoIn: "/screen3.mp4",
  urlDisplay: "app.mindgest.app",
  cta: "Solicitar Demo",
  color: "from-primary/20 to-purple-500/20",
};

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

        {/* Video Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-primary"></span>
              <span className="text-primary font-bold uppercase tracking-widest text-sm">
                {videoSection.label}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {videoSection.title.line1} <br />
              <span className="text-primary">
                {videoSection.title.highlight}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {videoSection.description}
            </p>

            <ul className="space-y-5 mb-10">
              {videoSection.features.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-teste-full bg-primary/10 flex items-center justify-center text-primary">
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

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25"
            >
              {videoSection.cta}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 relative group"
          >
            <div
              className={`absolute inset-0 bg-linear-to-r ${videoSection.color} rounded-teste-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700`}
            />
            <div className="relative rounded-teste-2xl overflow-hidden shadow-2xl border border-white/10 bg-card transform transition-transform duration-500 group-hover:scale-[1.01]">
              <div className="absolute top-0 left-0 right-0 h-10 bg-muted/50 flex items-center px-4 space-x-2 border-b border-border z-20">
                <div className="w-3 h-3 rounded-teste-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-teste-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-teste-full bg-green-500/80" />
                <div className="ml-4 px-3 py-1 bg-background/50 rounded-teste text-[10px] text-muted-foreground font-mono">
                  {videoSection.urlDisplay}
                </div>
              </div>
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-auto mt-10 opacity-95 hover:opacity-100 transition-opacity"
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
          <div className="inline-block p-1 rounded-teste-full bg-linear-to-r from-primary/20 to-blue-500/20 backdrop-blur-sm border border-white/10">
            <Button
              size="lg"
              className="rounded-teste-full px- h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30"
            >
              Visitar Site Oficial MindGest{" "}
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="mt-4 text-muted-foreground text-sm">
            Experimente o futuro da gestão empresarial hoje.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ProductSection({ data, index }: { data: any; index: number }) {
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
                <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-teste-full bg-primary/10 flex items-center justify-center text-primary">
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
                className="p-4 rounded-teste-xl bg-card border border-border"
              >
                <div className="w-10 h-10 rounded-teste-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
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
          {data.cta}
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
          className={`absolute inset-0 bg-linear-to-r ${data.color} rounded-teste-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700`}
        />
        <div className="relative rounded-teste-2xl overflow-hidden shadow-2xl border border-white/10 bg-card transform transition-transform duration-500 group-hover:scale-[1.01]">
          <div className="absolute top-0 left-0 right-0 h-10 bg-muted/50 flex items-center px-4 space-x-2 border-b border-border z-20">
            {data.dots.map((dotClass: string, i: number) => (
              <div key={i} className={`w-3 h-3 rounded-teste-full ${dotClass}`} />
            ))}
            <div className="ml-4 px-3 py-1 bg-background/50 rounded-teste text-[10px] text-muted-foreground font-mono">
              {data.urlDisplay}
            </div>
          </div>
          <img
            src={data.image}
            alt={data.imageAlt}
            className={`w-full h-auto mt-10 opacity-95 hover:opacity-100 transition-opacity ${
              data.reverse ? "hue-rotate-30 saturate-150" : ""
            }`}
          />
        </div>
      </motion.div>
    </div>
  );
}
