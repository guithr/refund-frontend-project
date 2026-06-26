import type React from "react";

interface IconProps extends React.ComponentProps<"svg"> {
  svg: React.FC<React.ComponentProps<"svg">>;
}

export function Icon({ svg: SvgComponent, ...props }: IconProps) {
  return <SvgComponent {...props} />;
}
