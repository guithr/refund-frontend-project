import { tv, type VariantProps } from "tailwind-variants";

const iconButtonVariants = tv({
  base: "inline-flex items-center justify-center rounded-lg font-sans size-12 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    color: {
      primary: "bg-green-100 text-white hover:bg-green-200",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

interface IconButtonProps
  extends Omit<React.ComponentProps<"button">, "color">,
    VariantProps<typeof iconButtonVariants> {}

export function IconButton({ color, className, children, ...props }: IconButtonProps) {
  return (
    <button className={iconButtonVariants({ color, className })} {...props}>
      {children}
    </button>
  );
}
