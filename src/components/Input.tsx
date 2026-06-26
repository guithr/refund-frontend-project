import { tv, type VariantProps } from "tailwind-variants";

const inputVariants = tv({
  base: `
    h-12 w-full rounded-lg border border-gray-300 bg-white px-4
    text-sm text-gray-100 outline-none transition-colors
    placeholder:text-gray-200 caret-green-100
    group-focus-within:border-green-100
  `,
});

interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <label className="group flex flex-col gap-1">
      {label && (
        <span className="font-sans text-[10px] leading-[14px] uppercase text-gray-200 transition-colors group-focus-within:font-bold group-focus-within:text-green-100">
          {label}
        </span>
      )}
      <input className={inputVariants({ className })} {...props} />
    </label>
  );
}
