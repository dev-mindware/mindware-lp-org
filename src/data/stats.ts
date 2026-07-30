export type Stat = {
  /** Valor numérico — a contagem animada precisa dele como número, não como string. */
  value: number;
  /** Ex.: "+" em "+15". */
  prefix?: string;
  /** Ex.: "%" ou "k". */
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 2, prefix: "+", label: "Anos de Experiência" },
  { value: 10, prefix: "+", label: "Projetos Entregues" },
  { value: 15, prefix: "+", label: "Membros da Equipa" },
  // { value: 2, label: "Prémios Globais" },
];
