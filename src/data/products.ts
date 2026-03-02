export const products = [
  {
    id: "faturacao",
    label: "MindGest ERP",
    title: {
      line1: "Faturação Fácil",
      highlight: "& Descomplicada",
    },
    description:
      "Diga adeus à burocracia na hora de faturar. O MindGest agiliza ao máximo a emissão de documentos. Seja uma Fatura, Fatura/Recibo, Proforma ou Nota de crédito, crie documentos profissionais e com total validade fiscal em questão de segundos.",
    features: [
      {
        title: "Diversidade de Documentos",
        desc: "Emita Faturas, Faturas/Recibo, Proformas e muito mais.",
      },
      {
        title: "Vários formatos",
        desc: "Emita e baixe em formatos A4, talão e muito mais.",
      },
      {
        title: "Gestão Simplificada",
        desc: "Organização clara para que saiba rapidamente quem pagou ou falta pagar.",
      },
    ],
    image: "/docs.png",
    imageAlt: "Gestão de Documentos no MindGest",
    urlDisplay: "documents.mindgest.app",
    cta: "Emitir Faturas Agora",
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
    features: [
      {
        title: "Monitoramento em Tempo Real",
        desc: "KPIs operacionais atualizados ao segundo num ecrã limpo de fácil compreensão.",
      },
      {
        title: "Relatórios Visuais",
        desc: "Transforme dados analíticos intensos em gráficos dinâmicos práticos.",
      },
      {
        title: "Exportação Simples",
        desc: "Faça download da visão global e partilhe os relatórios em Excel/PDF para as equipas.",
      },
    ],
    image: "/dashboard.png",
    imageAlt: "Dashboard Analytics MindGest",
    urlDisplay: "dashboard.mindgest.app",
    cta: "Ver Demostração",
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
