import { tv, type VariantProps } from "tailwind-variants";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useState } from "react";

function CaretDown({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M16.875 5.625L8.125 14.375L3.75 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const selectTriggerVariants = tv({
  base: `
    flex h-12 w-full items-center justify-between gap-4 rounded-lg border
    border-gray-300 bg-white px-4 text-sm transition-colors
    data-[state=open]:border-green-100
    disabled:cursor-not-allowed disabled:opacity-50
  `,
});

interface SelectFieldOption {
  value: string;
  label: string;
}

interface SelectFieldProps
  extends VariantProps<typeof selectTriggerVariants> {
  label?: string;
  placeholder?: string;
  options: SelectFieldOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function SelectField({
  label,
  placeholder = "Selecione",
  options,
  value,
  onValueChange,
  className,
  disabled,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <SelectPrimitive.Root
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <div className="flex flex-col gap-1">
        {label && (
          <span
            className={[
              "font-sans text-[10px] leading-[14px] uppercase transition-colors",
              open ? "font-bold text-green-100" : "text-gray-200",
            ].join(" ")}
          >
            {label}
          </span>
        )}

        <SelectPrimitive.Trigger className={selectTriggerVariants({ className })}>
          <SelectPrimitive.Value
            placeholder={placeholder}
            className="text-gray-100 data-[placeholder]:text-gray-200"
          />
          <SelectPrimitive.Icon>
            <CaretDown
              className={`transition-colors ${open ? "text-green-100" : "text-gray-300"}`}
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
      </div>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className="z-50 w-[--radix-select-trigger-width] rounded-lg border border-gray-300 bg-gray-500"
        >
          <SelectPrimitive.Viewport className="p-2">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className={`
                  flex h-[42px] cursor-pointer items-center gap-2 rounded-md px-4
                  text-sm text-gray-100 outline-none transition-colors
                  data-[highlighted]:bg-gray-400
                  data-[state=checked]:font-bold
                `}
              >
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="ml-auto text-green-100">
                  <Check />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
