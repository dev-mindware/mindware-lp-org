import { CONTACT_EMAIL, PHONE_DISPLAY } from "@/constants/site";
import type { LegalDocument } from "./types";

export const termsOfService: LegalDocument = {
  eyebrow: "Documentos Legais",
  title: "Termos de",
  titleAccent: "Serviço",
  shortTitle: "Termos de Serviço",
  updatedAt: "Julho de 2026",
  intro:
    "Estes Termos regulam a relação entre a Mindware e quem contrata os seus serviços ou utiliza as suas plataformas. Leia-os com atenção antes de adjudicar um projecto ou subscrever o Mindgest — ao fazê-lo, aceita integralmente as condições aqui descritas.",
  sections: [
    {
      id: "aceitacao",
      title: "Aceitação e Âmbito",
      blocks: [
        {
          kind: "text",
          text: "Ao aceder ao website da Mindware, criar conta no Mindgest, adjudicar um projecto ou aderir ao Programa de Afiliados, o Cliente declara ter lido e aceite estes Termos e a **Política de Privacidade**, que deles faz parte integrante.",
        },
        {
          kind: "text",
          text: "Quando exista proposta comercial, contrato ou ordem de serviço assinada, essas condições específicas prevalecem sobre os presentes Termos naquilo em que forem divergentes. Nos restantes aspectos, os Termos continuam a aplicar-se.",
        },
      ],
    },
    {
      id: "servicos",
      title: "Serviços Prestados",
      blocks: [
        {
          kind: "text",
          text: "A Mindware é uma empresa de tecnologia sediada em Luanda. O âmbito de cada serviço é definido na proposta aprovada pelo Cliente.",
        },
        {
          kind: "list",
          items: [
            {
              label: "Desenvolvimento à medida",
              text: "websites, aplicações web e aplicações móveis, entregues por fases acordadas com o Cliente.",
            },
            {
              label: "Branding e design",
              text: "identidade visual, interface e materiais associados.",
            },
            {
              label: "Email profissional e domínios",
              text: "configuração e acompanhamento, sujeitos às condições dos fornecedores subjacentes.",
            },
            {
              label: "Mindgest",
              text: "plataforma de gestão e facturação disponibilizada em regime de subscrição (SaaS), com planos e limites descritos na página do produto.",
            },
            {
              label: "Programa de Afiliados",
              text: "comissões sobre subscrições efectivamente pagas, nos termos das regras publicadas na respectiva página.",
            },
          ],
        },
        {
          kind: "note",
          label: "Evolução do produto",
          text: "O Mindgest é um produto vivo. Podemos **acrescentar, alterar ou descontinuar funcionalidades**; quando uma alteração for substancial e desfavorável ao Cliente, avisamos com antecedência razoável.",
        },
      ],
    },
    {
      id: "conta",
      title: "Conta e Responsabilidades do Cliente",
      blocks: [
        {
          kind: "text",
          text: "O acesso às plataformas da Mindware é pessoal e intransmissível. O Cliente é responsável por manter as credenciais em segurança e por toda a actividade realizada a partir da sua conta.",
        },
        {
          kind: "list",
          items: [
            {
              text: "Fornecer informação verdadeira, completa e actualizada, em especial os dados fiscais usados na emissão de documentos.",
            },
            {
              text: "Comunicar de imediato qualquer utilização não autorizada ou suspeita de comprometimento da conta.",
            },
            {
              text: "Assegurar que tem base legal para introduzir na plataforma dados de terceiros, nomeadamente dos seus próprios clientes.",
            },
            {
              text: "Disponibilizar em tempo útil os conteúdos, acessos e aprovações necessários à execução dos projectos contratados.",
            },
          ],
        },
        {
          kind: "text",
          text: "Atrasos na entrega de materiais ou na validação de etapas pelo Cliente suspendem os prazos de execução por período equivalente.",
        },
      ],
    },
    {
      id: "uso-aceitavel",
      title: "Uso Aceitável",
      blocks: [
        {
          kind: "text",
          text: "É expressamente proibido utilizar os serviços da Mindware para:",
        },
        {
          kind: "list",
          items: [
            {
              text: "Praticar actos ilícitos, fraude fiscal ou falsificação de documentos comerciais.",
            },
            {
              text: "Aceder sem autorização a sistemas, contas ou dados de terceiros, ou tentar contornar mecanismos de segurança e limites de plano.",
            },
            {
              text: "Distribuir malware, realizar envio massivo de mensagens não solicitadas ou sobrecarregar deliberadamente a infra-estrutura.",
            },
            {
              text: "Copiar, descompilar ou revender o software da Mindware sem autorização escrita.",
            },
            {
              text: "Publicar conteúdos difamatórios, discriminatórios ou que violem direitos de terceiros.",
            },
          ],
        },
        {
          kind: "note",
          label: "Consequências",
          text: "A violação destas regras pode originar **suspensão imediata do acesso**, sem reembolso, e a comunicação dos factos às autoridades competentes quando aplicável.",
        },
      ],
    },
    {
      id: "pagamentos",
      title: "Preços, Pagamentos e Subscrições",
      blocks: [
        {
          kind: "text",
          text: "Salvo indicação em contrário, os preços são apresentados em Kwanzas (AOA) e acrescidos de IVA à taxa legal em vigor. Todos os pagamentos são titulados por factura ou factura-recibo emitida nos termos da legislação angolana.",
        },
        {
          kind: "list",
          items: [
            {
              label: "Projectos",
              text: "facturados por fases, com adiantamento na adjudicação e o remanescente conforme o plano de pagamentos da proposta.",
            },
            {
              label: "Subscrições",
              text: "cobradas antecipadamente por período (mensal ou anual) e renovadas automaticamente, salvo cancelamento antes do fim do período em curso.",
            },
            {
              label: "Atraso no pagamento",
              text: "decorridos os prazos acordados, a Mindware pode suspender o acesso ao serviço até regularização, mantendo-se o valor em dívida exigível.",
            },
            {
              label: "Alteração de preços",
              text: "as alterações de tabela aplicam-se apenas a novos períodos e são comunicadas com pelo menos 30 dias de antecedência.",
            },
          ],
        },
        {
          kind: "text",
          text: "Períodos já iniciados não são reembolsáveis, salvo falha imputável à Mindware que impeça de forma prolongada a utilização do serviço.",
        },
      ],
    },
    {
      id: "propriedade",
      title: "Propriedade Intelectual",
      blocks: [
        {
          kind: "list",
          items: [
            {
              label: "Entregáveis do projecto",
              text: "após o pagamento integral, os direitos de utilização do design e do código desenvolvido especificamente para o Cliente transferem-se para este.",
            },
            {
              label: "Componentes reutilizáveis",
              text: "bibliotecas, frameworks e módulos internos da Mindware mantêm-se propriedade da Mindware, ficando o Cliente com uma licença de uso perpétua para o âmbito do projecto.",
            },
            {
              label: "Mindgest",
              text: "é **licenciado, não vendido**. A subscrição confere um direito de utilização não exclusivo e revogável, limitado à duração do plano contratado.",
            },
            {
              label: "Dados do Cliente",
              text: "os conteúdos e registos introduzidos na plataforma são e permanecem propriedade do Cliente.",
            },
            {
              label: "Portfólio",
              text: "salvo oposição escrita do Cliente, a Mindware pode referir o projecto e apresentar imagens do resultado final para fins de divulgação.",
            },
          ],
        },
      ],
    },
    {
      id: "disponibilidade",
      title: "Disponibilidade, Suporte e Garantia",
      blocks: [
        {
          kind: "text",
          text: "Empenhamo-nos em manter os serviços disponíveis de forma contínua, mas não garantimos funcionamento ininterrupto. Podem ocorrer interrupções por manutenção programada, falhas de fornecedores externos, indisponibilidade de rede ou causas de força maior.",
        },
        {
          kind: "list",
          items: [
            {
              label: "Manutenção",
              text: "as intervenções planeadas são, sempre que possível, realizadas em horário de baixa utilização e comunicadas previamente.",
            },
            {
              label: "Suporte",
              text: "prestado em dias úteis pelos canais indicados na secção de contactos, com prioridade consoante o plano contratado.",
            },
            {
              label: "Garantia de correcção",
              text: "os projectos entregues beneficiam de correcção gratuita de defeitos comunicados nos 30 dias seguintes à entrega, desde que não resultem de alterações feitas por terceiros.",
            },
          ],
        },
      ],
    },
    {
      id: "responsabilidade",
      title: "Limitação de Responsabilidade",
      blocks: [
        {
          kind: "text",
          text: "A Mindware responde por danos directos comprovadamente causados por incumprimento seu, até ao limite dos valores efectivamente pagos pelo Cliente nos 12 meses anteriores ao facto que originou o pedido.",
        },
        {
          kind: "text",
          text: "Não somos responsáveis por lucros cessantes, perda de oportunidades de negócio, danos indirectos, nem por consequências resultantes de informação incorrecta prestada pelo Cliente, de uso indevido das plataformas ou de falhas de serviços de terceiros.",
        },
        {
          kind: "note",
          label: "Conformidade fiscal",
          text: "O Mindgest é uma ferramenta de apoio à gestão. A **responsabilidade pelo cumprimento das obrigações declarativas e fiscais perante a AGT é sempre do Cliente**, incluindo a exactidão dos dados que introduz.",
        },
      ],
    },
    {
      id: "cessacao",
      title: "Suspensão e Cessação",
      blocks: [
        {
          kind: "text",
          text: "O Cliente pode cancelar a subscrição a qualquer momento, produzindo efeitos no final do período já pago. A Mindware pode cessar a prestação em caso de incumprimento grave, falta de pagamento prolongada ou violação da secção de Uso Aceitável.",
        },
        {
          kind: "list",
          items: [
            {
              label: "Exportação de dados",
              text: "após a cessação, o Cliente dispõe de **30 dias** para exportar os seus dados através da plataforma ou mediante pedido escrito.",
            },
            {
              label: "Eliminação",
              text: "findo esse prazo, os dados são eliminados dos sistemas activos, salvo os que a lei obrigue a conservar.",
            },
            {
              label: "Obrigações remanescentes",
              text: "mantêm-se em vigor as cláusulas de confidencialidade, propriedade intelectual e limitação de responsabilidade.",
            },
          ],
        },
      ],
    },
    {
      id: "lei-aplicavel",
      title: "Lei Aplicável e Contacto",
      blocks: [
        {
          kind: "text",
          text: "Estes Termos regem-se pela lei angolana. As partes procurarão resolver qualquer diferendo por acordo; não sendo possível, fica eleito o foro da Comarca de Luanda, com renúncia expressa a qualquer outro.",
        },
        {
          kind: "text",
          text: "A Mindware pode actualizar estes Termos sempre que se justifique. A data da última revisão consta no topo da página e as alterações relevantes são comunicadas com antecedência.",
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
