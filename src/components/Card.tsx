import { tv, type VariantProps } from "tailwind-variants";

const cardVariants = tv({
  base: "rounded-2xl bg-gray-500 p-10",
});

interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={cardVariants({ className })} {...props}>
      {children}
    </div>
  );
}
