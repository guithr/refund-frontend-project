import { tv, type VariantProps } from "tailwind-variants";

const iconButtonVariants = tv({
  base: `
    inline-flex items-center justify-center rounded-lg font-sans
    transition-colors cursor-pointer
    disabled:cursor-not-allowed disabled:opacity-50
  `,
  variants: {
    color: {
      primary: "bg-green-100 text-white hover:bg-green-200",
    },
    size: {
      md: "size-12",
      sm: "size-8",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

interface IconButtonProps
  extends Omit<React.ComponentProps<"button">, "color">,
    VariantProps<typeof iconButtonVariants> {}

export function IconButton({ color, size, className, children, ...props }: IconButtonProps) {
  return (
    <button className={iconButtonVariants({ color, size, className })} {...props}>
      {children}
    </button>
  );
}
