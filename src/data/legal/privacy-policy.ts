import { CONTACT_EMAIL, PHONE_DISPLAY } from "@/constants/site";
import type { LegalDocument } from "./types";

/**
 * Política de Privacidade — inclui a antiga Política de Cookies como secção
 * própria (#cookies), para o utilizador ter um único documento de referência.
 */
export const privacyPolicy: LegalDocument = {
  eyebrow: "Documentos Legais",
  title: "Política de",
  titleAccent: "Privacidade",
  shortTitle: "Política de Privacidade",
  updatedAt: "Julho de 2026",
  intro:
    "A sua privacidade é uma prioridade para a Mindware. Esta Política explica que dados recolhemos, para que os usamos, com quem os partilhamos e que direitos lhe assistem quando utiliza o nosso website, a plataforma Mindgest e os nossos serviços de desenvolvimento, branding e email profissional.",
  sections: [
    {
      id: "dados-recolhidos",
      title: "Informações que Recolhemos",
      blocks: [
        {
          kind: "text",
          text: "Recolhemos apenas os dados necessários para prestar cada serviço. Consoante a forma como interage connosco, isso pode incluir:",
        },
        {
          kind: "list",
          items: [
            {
              label: "Dados de identificação",
              text: "nome, empresa, cargo, endereço de email e número de telefone, fornecidos em formulários de contacto, pedidos de orçamento ou no registo do Mindgest.",
            },
            {
              label: "Dados fiscais e de facturação",
              text: "NIF, denominação social e morada fiscal, necessários para emitir documentos válidos perante a AGT. Os pagamentos com cartão são processados por entidades especializadas — não guardamos os dados completos do seu cartão.",
            },
            {
              label: "Dados introduzidos na plataforma",
              text: "os documentos, clientes, artigos e movimentos que regista no Mindgest, alojados por nossa conta em infra-estrutura segura.",
            },
            {
              label: "Dados técnicos",
              text: "endereço IP, tipo de dispositivo e browser, páginas visitadas, origem do tráfego e registos de acesso, usados para segurança e diagnóstico.",
            },
            {
              label: "Comunicações",
              text: "o histórico de mensagens trocadas connosco por email, WhatsApp ou formulário, para acompanhamento do pedido e do suporte.",
            },
          ],
        },
        {
          kind: "note",
          label: "Dados dos seus clientes",
          text: "Quando utiliza o Mindgest, é você quem decide que dados de terceiros introduz na plataforma. Nesses casos, a **Mindware actua como subcontratante** e trata esses dados apenas segundo as suas instruções e o que a lei exigir — a responsabilidade pelo tratamento continua a ser sua.",
        },
      ],
    },
    {
      id: "finalidades",
      title: "Como Utilizamos os Seus Dados",
      blocks: [
        {
          kind: "text",
          text: "Cada dado recolhido tem uma finalidade concreta. Não usamos as suas informações para fins incompatíveis com aqueles que aqui são descritos.",
        },
        {
          kind: "list",
          items: [
            {
              label: "Prestação do serviço",
              text: "criar e manter a sua conta, desenvolver e entregar os projectos contratados, prestar suporte técnico e garantir a continuidade da plataforma.",
            },
            {
              label: "Facturação e obrigações legais",
              text: "emitir facturas e recibos, cumprir obrigações fiscais e contabilísticas e conservar os registos pelos prazos exigidos pela legislação angolana.",
            },
            {
              label: "Comunicação operacional",
              text: "avisos de manutenção, alterações a estes documentos, respostas a pedidos e informação relevante sobre o serviço que contratou.",
            },
            {
              label: "Segurança e prevenção de fraude",
              text: "detectar acessos indevidos, abusos e falhas, e proteger a integridade das contas e dos dados.",
            },
            {
              label: "Melhoria do produto",
              text: "compreender de forma agregada como as funcionalidades são utilizadas, para priorizar melhorias.",
            },
            {
              label: "Marketing",
              text: "envio de novidades, conteúdos e campanhas **apenas mediante o seu consentimento**. Pode cancelar a subscrição em qualquer mensagem, sem perder acesso ao serviço.",
            },
          ],
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies e Análise de Tráfego",
      blocks: [
        {
          kind: "text",
          text: "Cookies são pequenos ficheiros guardados no seu dispositivo que permitem ao site funcionar correctamente e recordar as suas preferências. Utilizamos também tecnologias equivalentes, como armazenamento local do browser.",
        },
        {
          kind: "table",
          head: ["Categoria", "Para que serve", "Duração"],
          rows: [
            [
              "Essenciais",
              "Sessão autenticada, segurança e equilíbrio de carga. Sem estes, a plataforma não funciona.",
              "Sessão",
            ],
            [
              "Preferências",
              "Memorizam escolhas como o tema claro/escuro e o idioma.",
              "Até 12 meses",
            ],
            [
              "Análise",
              "Métricas agregadas de tráfego e utilização para melhorar o site.",
              "Até 24 meses",
            ],
            [
              "Marketing",
              "Medem o desempenho de campanhas e evitam repetir anúncios.",
              "Até 12 meses",
            ],
          ],
        },
        {
          kind: "text",
          text: "As categorias de **análise e marketing só são activadas depois do seu consentimento explícito** no banner de cookies. Pode alterar ou retirar essa escolha a qualquer momento, sem perder acesso ao conteúdo essencial do site.",
        },
        {
          kind: "text",
          text: "Também pode bloquear ou eliminar cookies directamente nas definições do seu browser. Note que desactivar os cookies essenciais impede o funcionamento de áreas autenticadas, como o Mindgest.",
        },
      ],
    },
    {
      id: "partilha",
      title: "Partilha de Dados e Subcontratantes",
      blocks: [
        {
          kind: "text",
          text: "Não vendemos, alugamos nem cedemos dados pessoais a terceiros para fins comerciais. Partilhamos informação apenas nas situações estritamente necessárias:",
        },
        {
          kind: "list",
          items: [
            {
              label: "Prestadores de infra-estrutura",
              text: "alojamento, base de dados, backups e envio de email transaccional, vinculados por contrato a padrões de confidencialidade e segurança.",
            },
            {
              label: "Processadores de pagamento",
              text: "entidades bancárias e gateways que tratam as transacções em ambiente próprio e certificado.",
            },
            {
              label: "Ferramentas de análise",
              text: "serviços de estatística de tráfego, utilizados com dados agregados e apenas após consentimento.",
            },
            {
              label: "Autoridades competentes",
              text: "quando exista obrigação legal, ordem judicial ou pedido fundamentado da Administração Geral Tributária ou de outra entidade com poderes para tal.",
            },
          ],
        },
        {
          kind: "note",
          label: "Transferências internacionais",
          text: "Alguns dos nossos fornecedores operam servidores fora de Angola. Nesses casos, asseguramo-nos de que existem **garantias contratuais adequadas** de protecção equivalentes às exigidas pela legislação angolana.",
        },
      ],
    },
    {
      id: "seguranca",
      title: "Segurança e Conservação",
      blocks: [
        {
          kind: "text",
          text: "Aplicamos medidas técnicas e organizativas proporcionais ao risco: cifra do tráfego em trânsito (HTTPS/TLS), palavras-passe guardadas com algoritmos de derivação, controlo de acessos por perfil, registo de actividade e cópias de segurança periódicas.",
        },
        {
          kind: "list",
          items: [
            {
              label: "Dados de conta",
              text: "conservados enquanto a relação contratual estiver activa.",
            },
            {
              label: "Documentos fiscais e contabilísticos",
              text: "conservados pelo prazo mínimo exigido pela lei angolana, mesmo após o encerramento da conta.",
            },
            {
              label: "Registos técnicos",
              text: "conservados por períodos curtos, apenas o necessário para segurança e diagnóstico.",
            },
            {
              label: "Após a cessação",
              text: "os dados que não estejam sujeitos a conservação obrigatória são eliminados ou anonimizados.",
            },
          ],
        },
        {
          kind: "text",
          text: "Nenhum sistema é infalível. Se ocorrer um incidente de segurança com impacto nos seus dados, comprometemo-nos a notificá-lo sem demora injustificada e a informar as autoridades quando a lei o exigir.",
        },
      ],
    },
    {
      id: "direitos",
      title: "Os Seus Direitos",
      blocks: [
        {
          kind: "text",
          text: "Nos termos da Lei n.º 22/11, de 17 de Junho — Lei da Protecção de Dados Pessoais — pode, a qualquer momento, exercer os seguintes direitos:",
        },
        {
          kind: "list",
          items: [
            {
              label: "Acesso",
              text: "saber que dados seus tratamos e obter uma cópia.",
            },
            {
              label: "Rectificação",
              text: "corrigir dados incorrectos, desactualizados ou incompletos.",
            },
            {
              label: "Apagamento",
              text: "pedir a eliminação dos dados que não estejamos obrigados a conservar.",
            },
            {
              label: "Oposição e limitação",
              text: "opor-se a determinados tratamentos ou pedir que fiquem suspensos.",
            },
            {
              label: "Portabilidade",
              text: "receber os dados que nos forneceu num formato estruturado e de leitura automática.",
            },
            {
              label: "Retirada do consentimento",
              text: "revogar autorizações dadas para marketing ou cookies, sem afectar a legalidade do tratamento anterior.",
            },
          ],
        },
        {
          kind: "text",
          text: `Para exercer qualquer destes direitos, escreva para **${CONTACT_EMAIL}**. Respondemos no prazo máximo de 30 dias. Se considerar que os seus direitos não foram respeitados, pode apresentar reclamação junto da Agência de Protecção de Dados (APD) de Angola.`,
        },
      ],
    },
    {
      id: "alteracoes",
      title: "Alterações e Contacto",
      blocks: [
        {
          kind: "text",
          text: "Esta Política pode ser actualizada para reflectir alterações nos nossos serviços ou na legislação aplicável. A data da última revisão está indicada no topo da página e, quando as mudanças forem relevantes, avisamos previamente pelos canais habituais.",
        },
        {
          kind: "list",
          items: [
            { label: "Email", text: CONTACT_EMAIL },
            { label: "Telefone", text: PHONE_DISPLAY },
            { label: "Morada", text: "Vila Alice, Luanda — Angola" },
          ],
        },
      ],
    },
  ],
};
