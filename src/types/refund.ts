export const categoryKeys = ["alimentacao", "hospedagem", "transporte", "servicos", "outros"] as const;

export type Category = (typeof categoryKeys)[number];

export const categoryLabels: Record<Category, string> = {
  alimentacao: "Alimentação",
  hospedagem: "Hospedagem",
  transporte: "Transporte",
  servicos: "Serviços",
  outros: "Outros",
};

export interface RefundItem {
  id: string;
  name: string;
  category: Category;
  value: number;
}
