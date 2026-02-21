export const fyiData = [
  {
    question: "O que é a Facturação Electrónica?",
    answer:
      "A facturação electrónica é o processo de emissão de facturas em formato digital, através de software certificado, com validação automática e garantia de integridade dos dados. Em Angola, tornou-se obrigatória de forma progressiva, começando pelos Grandes Contribuintes e fornecedores do Estado, estendendo-se posteriormente aos demais contribuintes.",
  },
  {
    question:
      "Quando a Facturação Electrónica passou a ser obrigatória em Angola?",
    answer:
      "A obrigatoriedade iniciou para Grandes Contribuintes e fornecedores do Estado in 2026, sendo alargada aos restantes contribuintes enquadrados nos regimes Geral e Simplificado de IVA a partir de 2027.",
  },
  {
    question: "O que é Software Certificado pela AGT?",
    answer:
      "É um programa de facturação previamente validado pela Administração Geral Tributária. Esse software garante numeração sequencial automática, geração de código hash, impossibilidade de alteração da factura após emissão, exportação de ficheiro SAF-T e cumprimento dos requisitos técnicos e fiscais.",
    highlights: [
      "Numeração sequencial automática",
      "Geração de código hash",
      "Impossibilidade de alteração da factura após emissão",
      "Exportação de ficheiro SAF-T",
      "Cumprimento dos requisitos técnicos e fiscais",
    ],
  },
  {
    question: "O que é o Código Hash na Facturação?",
    answer:
      "O código hash é uma sequência alfanumérica gerada automaticamente pelo sistema certificado no momento da emissão da factura. Ele funciona como assinatura digital, assegurando que o documento não foi adulterado após a sua emissão.",
  },
  {
    question: "Por que os valores devem estar em Kwanza?",
    answer:
      "A legislação determina que os preços nas facturas devem ser apresentados em moeda nacional (AOA – Kwanza). Apenas em casos específicos, como operações de importação ou exportação, pode ser utilizada moeda estrangeira, devendo haver conversão quando aplicável.",
  },
  {
    question: "O que é o IVA?",
    details: [
      {
        sub: "O que é?",
        text: "O IVA (Imposto sobre o Valor Acrescentado) é um imposto indirecto aplicado sobre a venda de bens e prestação de serviços.",
      },
      {
        sub: "Qual é a taxa?",
        text: "A taxa geral é 14%, podendo existir taxas reduzidas conforme o tipo de actividade ou regime fiscal.",
      },
      {
        sub: "O que deve constar na factura?",
        text: "Base tributável, taxa aplicada, valor do IVA, total com imposto incluído e indicação de isenção ou regime especial, quando aplicável. O IVA torna-se devido no momento da emissão da factura.",
      },
    ],
  },
  {
    question: "O que é a Retenção na Fonte?",
    answer:
      "A Retenção na Fonte é um mecanismo pelo qual parte do valor a pagar numa operação é retido pelo cliente e entregue directamente ao Estado como antecipação de imposto. As prestações de serviços estão, em regra, sujeitas a tributação mediante retenção na fonte, à taxa de 6,5%, com excepção de:",
    highlights: [
      "Serviços de ensino, jardins de infância e berçários",
      "Assistência médico-sanitária e operações conexas",
      "Serviços com valor inferior a Kz 20.000",
      "Transporte de passageiros",
      "Locação de máquinas ou equipamentos (Royalties IAC)",
      "Intermediação financeira e seguradora (se estabelecido em Angola)",
      "Hotelaria e similares (se estabelecido em Angola)",
      "Telecomunicações (se estabelecido em Angola)",
    ],
    subText:
      "Na factura deve constar: percentagem aplicada, valor retido, base legal da retenção e valor líquido a receber após retenção.",
  },
  {
    question: "O que é Arquivo Digital de Facturas?",
    answer:
      "É a obrigação de conservar facturas e documentos fiscais em formato digital seguro, garantindo integridade, legibilidade e disponibilidade para auditorias. O período mínimo geralmente exigido é de 5 anos.",
  },
];

export const docTypes = [
  {
    title: "1) FACTURA",
    desc: "A factura é o documento fiscal obrigatório que formaliza juridicamente a transmissão de bens ou a prestação de serviços. É o documento que origina a obrigação tributária e serve de base para o apuramento do IVA e demais impostos aplicáveis.",
    elements: [
      "Identificação completa do fornecedor",
      "NIF do fornecedor",
      "Morada fiscal",
      "Identificação do cliente",
      "NIF do cliente (quando exigido)",
      "Numeração sequencial e série",
      "Data e hora de emissão",
      "Descrição detalhada dos bens ou serviços",
      "Quantidade e preço unitário",
      "Base tributável",
      "Taxa e montante de IVA",
      "Total a pagar",
    ],
    scenarios: [
      {
        title: "Venda a crédito",
        desc: "Quando a mercadoria é entregue mas o pagamento será efectuado posteriormente (30, 60 ou 90 dias).",
      },
      {
        title: "Prestação de serviços com pagamento diferido",
        desc: "Consultorias, empreitadas, manutenção técnica ou contratos mensais.",
      },
      {
        title: "Operações entre empresas (B2B)",
        desc: "Sempre que o cliente necessite do documento para dedução de IVA ou registo contabilístico.",
      },
      {
        title: "Fornecimento ao Estado",
        desc: "Contratos públicos exigem factura formal para liquidação.",
      },
      {
        title: "Facturação por etapas",
        desc: "Obras ou projectos executados por fases exigem emissão parcial conforme cada etapa concluída.",
      },
      {
        title: "Serviços contínuos",
        desc: "Aluguer, telecomunicações, fornecimento de energia ou contratos de avença.",
      },
      {
        title: "Entrega parcial de mercadorias",
        desc: "Quando parte do pedido é entregue hoje e o restante posteriormente.",
      },
    ],
    example:
      "Uma empresa de engenharia celebra contrato de 50 milhões Kz. O projecto será executado em 4 fases. A cada fase concluída, emite-se factura parcial correspondente à percentagem executada.",
  },
  {
    title: "2) FACTURA-RECIBO",
    desc: "Documento que combina factura e confirmação de pagamento no mesmo acto.",
    scenarios: [
      {
        title: "Pagamento imediato no acto da venda",
        desc: "Lojas de retalho, supermercados, farmácias.",
      },
      {
        title: "Serviços pagos na hora",
        desc: "Consultas médicas, honorários profissionais pagos no momento.",
      },
      {
        title: "Vendas em numerário ou TPA",
        desc: "Quando não há prazo de pagamento.",
      },
      {
        title: "Actividade informal formalizada",
        desc: "Pequenos comerciantes enquadrados no regime simplificado.",
      },
      {
        title: "Eventos e vendas pontuais",
        desc: "Bilheteiras, workshops, formações pagas no acto.",
      },
    ],
    example:
      "Uma clínica privada presta consulta e o paciente paga imediatamente. Emite-se factura-recibo porque a obrigação fiscal e o pagamento ocorrem simultaneamente.",
  },
  {
    title: "3) RECIBO",
    desc: "Documento que comprova pagamento de uma factura anteriormente emitida.",
    scenarios: [
      {
        title: "Pagamento posterior",
        desc: "Factura emitida em Janeiro, paga em Março.",
      },
      {
        title: "Pagamento parcial",
        desc: "Cliente paga 40% agora e 60% depois. Emitem-se recibos parciais.",
      },
      {
        title: "Pagamento em prestações",
        desc: "Venda de equipamento com parcelamento mensal.",
      },
      {
        title: "Regularização de dívida antiga",
        desc: "Liquidação de factura vencida há meses.",
      },
      {
        title: "Comprovação para auditoria interna",
        desc: "Empresas que necessitam demonstrar liquidação para controlo financeiro.",
      },
    ],
    example:
      "Uma empresa vende viatura por 10 milhões Kz. Cliente paga 5 milhões inicialmente. Emite-se recibo parcial. Quando paga o restante, emite-se novo recibo referenciando a mesma factura.",
  },
  {
    title: "4) FACTURA PROFORMA",
    desc: "Documento comercial preliminar sem valor fiscal.",
    scenarios: [
      {
        title: "Aprovação de orçamento",
        desc: "Cliente analisa antes de confirmar compra.",
      },
      {
        title: "Pedido de adiantamento",
        desc: "Fornecedor exige 50% antes da produção.",
      },
      {
        title: "Importação e exportação",
        desc: "Necessária para processos bancários e cambiais.",
      },
      {
        title: "Concursos públicos",
        desc: "Submissão de proposta financeira estimativa.",
      },
      {
        title: "Encomendas sob medida",
        desc: "Produção personalizada que só inicia após confirmação.",
      },
      {
        title: "Negociação internacional",
        desc: "Base para contratos preliminares.",
      },
    ],
    example:
      "Empresa angolana pretende importar máquinas industriais. O fornecedor envia proforma com valores e condições para que o comprador trate da abertura de carta de crédito no banco.",
  },
  {
    title: "5) NOTA DE CRÉDITO",
    desc: "Documento fiscal utilizado para corrigir ou anular total ou parcialmente uma factura.",
    scenarios: [
      {
        title: "Devolução total de mercadoria",
        desc: "Cliente devolve produto defeituoso.",
      },
      {
        title: "Devolução parcial",
        desc: "Parte do lote apresenta problema.",
      },
      {
        title: "Erro no preço unitário",
        desc: "Factura emitida com valor acima do acordado.",
      },
      {
        title: "Erro no cálculo do IVA",
        desc: "Imposto calculado incorrectamente.",
      },
      {
        title: "Concessão de desconto posterior",
        desc: "Desconto comercial concedido após facturação.",
      },
      {
        title: "Cancelamento da operação",
        desc: "Contrato rescindido após emissão.",
      },
      {
        title: "Ajuste cambial",
        desc: "Correcção em operações inicialmente estimadas.",
      },
    ],
    example:
      "Uma empresa facturou 5 milhões Kz com IVA de 14%. Posteriormente concede desconto de 500 mil Kz por acordo comercial. Deve emitir nota de crédito ajustando a base tributável e o IVA correspondente.",
  },
];

export const comparisonTable = [
  { doc: "Factura", iva: "Sim", payment: "Não", fiscal: "Sim" },
  { doc: "Factura-Recibo", iva: "Sim", payment: "Sim", fiscal: "Sim" },
  { doc: "Recibo", iva: "Não", payment: "Sim", fiscal: "Parcial" },
  { doc: "Proforma", iva: "Não", payment: "Não", fiscal: "Não" },
  { doc: "Nota de Crédito", iva: "Ajusta", payment: "Não", fiscal: "Sim" },
];
