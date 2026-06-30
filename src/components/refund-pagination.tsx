import { IconButton } from "./IconButton";
import { Icon } from "./Icon";
import { Text } from "./Text";
import CaretLeftSvg from "../assets/icons/caret-left.svg?react";
import CaretRightSvg from "../assets/icons/caret-right.svg?react";

export function RefundPagination() {
  return (
    <div className="flex items-center justify-center gap-3">
      <IconButton size="sm">
        <Icon svg={CaretLeftSvg} className="size-4 text-white" />
      </IconButton>
      <Text size="body-md" color="secondary">
        1/3
      </Text>
      <IconButton size="sm">
        <Icon svg={CaretRightSvg} className="size-4 text-white" />
      </IconButton>
    </div>
  );
}
