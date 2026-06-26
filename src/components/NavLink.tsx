import { tv, type VariantProps } from "tailwind-variants";

const navLinkVariants = tv({
  base: "font-sans text-sm font-semibold leading-6 px-5 py-3 transition-colors",
  variants: {
    isActive: {
      true: "text-green-100",
      false: "text-gray-200 hover:text-green-100",
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

interface NavLinkProps
  extends Omit<React.ComponentProps<"a">, "color">,
    VariantProps<typeof navLinkVariants> {}

export function NavLink({ isActive, className, children, ...props }: NavLinkProps) {
  return (
    <a
      className={navLinkVariants({ isActive, className })}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}
