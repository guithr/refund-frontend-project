import { Input } from "./Input";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";
import { useRefund } from "../contexts/refund-context";
import MagnifyingGlassSvg from "../assets/icons/magnifying-glass.svg?react";

export function RefundSearch() {
  const { searchQuery, setSearchQuery } = useRefund();

  return (
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
  );
}
