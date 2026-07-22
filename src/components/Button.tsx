import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 rounded-lg font-sans text-sm font-bold leading-4.5 h-12 px-5 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    color: {
      primary: "bg-green-100 text-white hover:bg-green-200",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "color">,
    VariantProps<typeof buttonVariants> {}

export function Button({ color, className, children, ...props }: ButtonProps) {
  return (
    <button className={buttonVariants({ color, className })} {...props}>
      {children}
    </button>
  );
}
