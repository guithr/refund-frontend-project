import { Icon } from "./Icon";
import { Text } from "./Text";
import type { Category } from "../types/refund";
import { categoryLabels } from "../types/refund";
import ForkKnifeSvg from "../assets/icons/fork-knife.svg?react";
import BedSvg from "../assets/icons/bed.svg?react";
import DesktopTowerSvg from "../assets/icons/desktop-tower.svg?react";
import WrenchSvg from "../assets/icons/wrench.svg?react";
import ReceiptSvg from "../assets/icons/receipt.svg?react";

const categoryIcon: Record<Category, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = {
  alimentacao: ForkKnifeSvg,
  hospedagem: BedSvg,
  transporte: DesktopTowerSvg,
  servicos: WrenchSvg,
  outros: ReceiptSvg,
};

interface RefundRowProps {
  name: string;
  category: Category;
  value: number;
}

export function RefundRow({ name, category, value }: RefundRowProps) {
  const SvgIcon = categoryIcon[category];

  return (
    <div className="flex items-center justify-between py-0.5">
      <div className="flex items-center gap-3">
        <div className="flex size-[34px] items-center justify-center rounded-full bg-gray-400">
          <Icon svg={SvgIcon} className="size-[18px] text-green-100" />
        </div>
        <div>
          <Text as="p" size="body-md" color="primary" className="font-bold">
            {name}
          </Text>
          <Text as="p" size="body-sm" color="secondary" className="text-xs leading-4">
            {categoryLabels[category]}
          </Text>
        </div>
      </div>
      <div className="flex items-baseline gap-0.5">
        <Text as="span" size="body-sm" color="secondary" className="text-xs leading-4">
          R$
        </Text>
        <Text as="span" size="body-md" color="primary" className="font-semibold">
          {value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </div>
    </div>
  );
}
