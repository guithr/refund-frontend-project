import { tv, type VariantProps } from "tailwind-variants";

const skeletonVariants = tv({
  base: "animate-pulse bg-gray-300 pointer-events-none rounded-xs text-transparent",
});

interface SkeletonProps
  extends VariantProps<typeof skeletonVariants>,
    React.ComponentProps<"div"> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={skeletonVariants({ className })} {...props} />;
}
