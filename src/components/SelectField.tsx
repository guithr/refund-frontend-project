import { tv } from "tailwind-variants";
import { Select } from "radix-ui";
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react";

const selectTriggerVariants = tv({
  base: `
    group flex w-full flex-col items-start gap-2 outline-none
    text-gray-200 transition-all
  `,
});

const selectInputVariants = tv({
  base: `
    flex h-12 w-full items-center justify-between gap-4 rounded-lg border
    border-gray-300 bg-white px-4 text-sm outline-none transition-colors
    group-data-[state=open]:border-green-100
    disabled:cursor-not-allowed disabled:opacity-50
  `,
});

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps extends Select.SelectProps {
  labelText?: string;
  placeholder?: string;
  error?: string;
  options: Option[];
  className?: string;
}

export function SelectField({
  labelText,
  placeholder = "Selecione",
  options,
  error,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <Select.Root {...props}>
      <Select.Trigger className={selectTriggerVariants({ className })}>
        {labelText && (
          <span className="font-sans text-[10px] leading-[14px] uppercase transition-colors group-data-[state=open]:font-bold group-data-[state=open]:text-green-100">
            {labelText}
          </span>
        )}

        <div className={selectInputVariants()}>
          <Select.Value
            placeholder={placeholder}
            className="text-gray-100 data-placeholder:text-gray-200"
          />
          <Select.Icon>
            <CaretDownIcon
              size={20}
              className="text-gray-300 transition-colors group-data-[state=open]:text-green-100"
            />
          </Select.Icon>
        </div>

        {error && (
          <span className="text-sm font-medium text-green-100">
            {error}
          </span>
        )}
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="z-50 w-(--radix-select-trigger-width) rounded-lg border border-gray-300 bg-gray-500 shadow-[0_2px_24px_0_rgba(0,0,0,0.08)]"
        >
          <Select.Viewport className="p-2">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="flex h-[42px] cursor-pointer items-center justify-between rounded-md px-4 text-sm text-gray-100 outline-none transition-colors data-highlighted:bg-gray-400 data-[state=checked]:font-bold"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon className="size-5 text-green-100" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
