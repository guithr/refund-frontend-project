import {
  BedIcon,
  ForkKnifeIcon,
  PoliceCarIcon,
  ReceiptIcon,
  WrenchIcon,
} from "@phosphor-icons/react";

export const categoryIcons = {
  food: {
    icon: ForkKnifeIcon,
    label: "Alimentação",
  },
  hosting: {
    icon: BedIcon,
    label: "Hospedagem",
  },
  transport: {
    icon: PoliceCarIcon,
    label: "Transporte",
  },
  services: {
    icon: WrenchIcon,
    label: "Serviços",
  },
  other: {
    icon: ReceiptIcon,
    label: "Outros",
  },
};

export const categoryOptions = Object.entries(categoryIcons).map(
  ([key, value]) => ({
    label: value.label,
    value: key,
  })
);
