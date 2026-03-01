import { Activity, PieChart, TrendingUp, Share2 } from "lucide-react";

export const products = [
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
    reverse: true,
  },
];

export const videoSection = {
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
  urlDisplay: "mindgest.mindware.ao",
  cta: "Solicitar Demo",
  ctaLink: "https://mindgest.mindware.ao/auth/register",
  color: "from-primary/20 to-purple-500/20",
};
