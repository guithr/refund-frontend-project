import { Icon } from "../../../components/Icon";
import { Text } from "../../../components/Text";
import { categoryIcons } from "../../../utils/helpers";

interface RefundRowProps {
  title: string;
  category: keyof typeof categoryIcons;
  value: number;
}

export function RefundRow({ title, category, value }: RefundRowProps) {
  const IconComponent = categoryIcons[category].icon;
  const categoryText = categoryIcons[category].label;

  return (
    <div className="flex items-center justify-between py-0.5">
      <div className="flex items-center gap-3">
        <div className="flex size-[34px] items-center justify-center rounded-full bg-gray-400">
          <Icon svg={IconComponent} className="size-[18px] text-green-100" />
        </div>
        <div>
          <Text as="p" size="body-md" color="primary" className="font-bold">
            {title}
          </Text>
          <Text
            as="p"
            size="body-sm"
            color="secondary"
            className="text-xs leading-4"
          >
            {categoryText}
          </Text>
        </div>
      </div>
      <div className="flex items-baseline gap-0.5">
        <Text
          as="span"
          size="body-sm"
          color="secondary"
          className="text-xs leading-4"
        >
          R$
        </Text>
        <Text
          as="span"
          size="body-md"
          color="primary"
          className="font-semibold"
        >
          {value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </div>
    </div>
  );
}
