export type Refund = {
  id: string;
  title: string;
  category: "food" | "hosting" | "transport" | "services" | "other";
  value: number;
};
