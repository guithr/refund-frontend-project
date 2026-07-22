import { useState, type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import CloudArrowUp from "../assets/icons/cloud-arrow-up.svg?react";

const fileInputVariants = tv({
  base: `
    flex h-12 w-full cursor-pointer items-center rounded-lg border border-gray-300
    bg-white pr-0 transition-colors group-focus-within:border-green-100
  `,
});

const fileInputTriggerVariants = tv({
  base: `
    flex size-12 shrink-0 items-center justify-center rounded-lg bg-green-100
    transition-colors group-hover:bg-green-200
  `,
});

interface FileInputProps
  extends
    Omit<ComponentProps<"input">, "size" | "placeholder">,
    VariantProps<typeof fileInputVariants> {
  labelText?: string;
  error?: string;
  placeholder?: string;
}

export function FileInput({
  labelText,
  placeholder,
  error,
  className,
  onChange,
  ...props
}: FileInputProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setFileName(file?.name ?? null);
    onChange?.(event);
  }

  return (
    <label className="group flex cursor-pointer flex-col gap-2  ">
      {labelText && (
        <span className="font-sans text-[10px] leading-3.5 uppercase text-gray-200 transition-colors group-focus-within:font-bold group-focus-within:text-green-100">
          {labelText}
        </span>
      )}

      <div className={fileInputVariants({ className })}>
        <div className="relative flex flex-1 items-center pl-3">
          <input
            {...props}
            type="file"
            className="absolute inset-0 w-full cursor-pointer opacity-0"
            onChange={handleChange}
          />

          <span
            className={`text-sm ${fileName ? "text-gray-100" : "text-gray-200"}`}
          >
            {fileName || placeholder}
          </span>
        </div>

        <div className={fileInputTriggerVariants()}>
          <CloudArrowUp className="size-6 text-white" />
        </div>
      </div>

      {error && (
        <span className="text-sm font-medium text-green-100">{error}</span>
      )}
    </label>
  );
}
