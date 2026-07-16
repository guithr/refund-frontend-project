import { IconButton } from "../../../components/IconButton";
import { Icon } from "../../../components/Icon";
import { Text } from "../../../components/Text";
import { useRefunds } from "../hooks/use-refunds";
import CaretLeftSvg from "../../../assets/icons/caret-left.svg?react";
import CaretRightSvg from "../../../assets/icons/caret-right.svg?react";

export function RefundPagination() {
  const { meta, pagination } = useRefunds();

  if (!meta) {
    return null;
  }

  const isFirstPage = meta.currentPage <= 1;
  const isLastPage = meta.currentPage >= meta.lastPage;

  return (
    <div className="flex items-center justify-center gap-3">
      <IconButton
        size="sm"
        disabled={isFirstPage}
        onClick={() => pagination.setPage(meta.currentPage - 1)}
      >
        <Icon svg={CaretLeftSvg} className="size-4" />
      </IconButton>
      <Text size="body-md" color="secondary">
        {meta.currentPage}/{meta.lastPage}
      </Text>
      <IconButton
        size="sm"
        disabled={isLastPage}
        onClick={() => pagination.setPage(meta.currentPage + 1)}
      >
        <Icon svg={CaretRightSvg} className="size-4" />
      </IconButton>
    </div>
  );
}
