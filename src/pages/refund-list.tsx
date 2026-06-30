import { Input } from "../components/Input";
import { IconButton } from "../components/IconButton";
import { Icon } from "../components/Icon";
import { Text } from "../components/Text";
import { useRefund } from "../contexts/refund-context";
import type { Category } from "../types/refund";
import { categoryLabels } from "../types/refund";
import MagnifyingGlassSvg from "../assets/icons/magnifying-glass.svg?react";
import ForkKnifeSvg from "../assets/icons/fork-knife.svg?react";
import BedSvg from "../assets/icons/bed.svg?react";
import DesktopTowerSvg from "../assets/icons/desktop-tower.svg?react";
import WrenchSvg from "../assets/icons/wrench.svg?react";
import ReceiptSvg from "../assets/icons/receipt.svg?react";
import CaretLeftSvg from "../assets/icons/caret-left.svg?react";
import CaretRightSvg from "../assets/icons/caret-right.svg?react";

const categoryIcon: Record<Category, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = {
  alimentacao: ForkKnifeSvg,
  hospedagem: BedSvg,
  transporte: DesktopTowerSvg,
  servicos: WrenchSvg,
  outros: ReceiptSvg,
};

export function RefundList() {
  const { searchQuery, setSearchQuery, filteredRefunds } = useRefund();

  return (
    <main className="mx-auto mt-10 w-full max-w-[1082px] rounded-2xl bg-gray-500 p-10">
      <Text as="h1" size="heading-lg" color="primary" className="mb-6">
        Solicitações
      </Text>

      <div className="mb-6 flex items-end gap-3 border-b border-gray-400 pb-6">
        <div className="flex-1">
          <Input
            placeholder="Pesquisar pelo nome"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <IconButton>
          <Icon svg={MagnifyingGlassSvg} className="size-6 text-white" />
        </IconButton>
      </div>

      <div className="space-y-4">
        {filteredRefunds.map((item) => {
          const SvgIcon = categoryIcon[item.category];
          return (
            <div
              key={item.id}
              className="flex items-center justify-between py-0.5"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-[34px] items-center justify-center rounded-full bg-gray-400">
                  <Icon svg={SvgIcon} className="size-[18px] text-green-100" />
                </div>
                <div>
                  <Text as="p" size="body-md" color="primary" className="font-bold">
                    {item.name}
                  </Text>
                  <Text as="p" size="body-sm" color="secondary" className="text-xs leading-4">
                    {categoryLabels[item.category]}
                  </Text>
                </div>
              </div>
              <div className="flex items-baseline gap-0.5">
                <Text as="span" size="body-sm" color="secondary" className="text-xs leading-4">
                  R$
                </Text>
                <Text as="span" size="body-md" color="primary" className="font-semibold">
                  {item.value.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <IconButton size="sm">
          <Icon svg={CaretLeftSvg} className="size-4 text-white" />
        </IconButton>
        <Text size="body-md" color="secondary">1/3</Text>
        <IconButton size="sm">
          <Icon svg={CaretRightSvg} className="size-4 text-white" />
        </IconButton>
      </div>
    </main>
  );
}
