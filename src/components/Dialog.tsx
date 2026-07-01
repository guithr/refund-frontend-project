import { Dialog as RadixDialog } from "radix-ui";
import { tv, type VariantProps } from "tailwind-variants";

export const Dialog = RadixDialog;

const dialogOverlayVariants = tv({
  base: "fixed inset-0 bg-gray-100/80",
});

const dialogContentVariants = tv({
  base: `
    fixed left-1/2 top-1/2 w-full max-w-[512px] -translate-x-1/2 -translate-y-1/2
    rounded-2xl bg-gray-500 p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
  `,
});

const dialogTitleVariants = tv({
  base: "font-sans text-xl leading-6 font-bold text-gray-100",
});

const dialogDescriptionVariants = tv({
  base: "font-sans text-sm leading-[18px] font-normal text-gray-200",
});

interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>,
    VariantProps<typeof dialogOverlayVariants> {}

export function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return <RadixDialog.Overlay className={dialogOverlayVariants({ className })} {...props} />;
}

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Content>,
    VariantProps<typeof dialogContentVariants> {}

export function DialogContent({ className, ...props }: DialogContentProps) {
  return <RadixDialog.Content className={dialogContentVariants({ className })} {...props} />;
}

interface DialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Title>,
    VariantProps<typeof dialogTitleVariants> {}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <RadixDialog.Title className={dialogTitleVariants({ className })} {...props} />;
}

interface DialogDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Description>,
    VariantProps<typeof dialogDescriptionVariants> {}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <RadixDialog.Description className={dialogDescriptionVariants({ className })} {...props} />;
}
