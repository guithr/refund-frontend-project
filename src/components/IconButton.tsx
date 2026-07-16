import { tv, type VariantProps } from "tailwind-variants";

const iconButtonVariants = tv({
  base: `
    inline-flex items-center justify-center rounded-lg font-sans
    transition-colors cursor-pointer
  `,
  variants: {
    color: {
      primary: "bg-green-100 text-white enabled:hover:bg-green-200",
    },
    size: {
      md: "size-12",
      sm: "size-8",
    },
    disabled: {
      true: "cursor-not-allowed opacity-50",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    disabled: false,
  },
});

interface IconButtonProps
  extends
    Omit<React.ComponentProps<"button">, "color" | "disabled">,
    VariantProps<typeof iconButtonVariants> {}

export function IconButton({
  color,
  size,
  disabled,
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={iconButtonVariants({ color, size, disabled, className })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
