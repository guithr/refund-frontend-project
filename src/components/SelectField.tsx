import { tv, type VariantProps } from "tailwind-variants";
import { Select } from "radix-ui";
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react";
import { useState } from "react";

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

interface SelectFieldProps extends VariantProps<typeof selectTriggerVariants> {
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
    <Select.Root
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

        <Select.Trigger className={selectTriggerVariants({ className })}>
          <Select.Value
            placeholder={placeholder}
            className="text-gray-100 data-placeholder:text-gray-200"
          />
          <Select.Icon>
            <CaretDownIcon
              size={20}
              className={`transition-colors ${open ? "text-green-100" : "text-gray-300"}`}
            />
          </Select.Icon>
        </Select.Trigger>
      </div>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="z-50 w-[--radix-select-trigger-width] rounded-lg border border-gray-300 bg-gray-500"
        >
          <Select.Viewport className="p-2">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className={`
                  flex h-[42px] cursor-pointer items-center gap-2 rounded-md px-4
                  text-sm text-gray-100 outline-none transition-colors
                  data-highlighted:bg-gray-400
                  data-[state=checked]:font-bold
                `}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="ml-auto text-green-100">
                  <CheckIcon size={20} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
