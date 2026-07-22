import ForkKnife from "../assets/icons/fork-knife.svg?react";
import Bed from "../assets/icons/bed.svg?react";
import PoliceCar from "../assets/icons/police-car.svg?react";
import Wrench from "../assets/icons/wrench.svg?react";
import Receipt from "../assets/icons/receipt.svg?react";

export const categoryIcons = {
  food: {
    icon: ForkKnife,
    label: "Alimentação",
  },
  hosting: {
    icon: Bed,
    label: "Hospedagem",
  },
  transport: {
    icon: PoliceCar,
    label: "Transporte",
  },
  services: {
    icon: Wrench,
    label: "Serviços",
  },
  other: {
    icon: Receipt,
    label: "Outros",
  },
};

export const categoryOptions = Object.entries(categoryIcons).map(
  ([key, value]) => ({
    label: value.label,
    value: key,
  })
);
