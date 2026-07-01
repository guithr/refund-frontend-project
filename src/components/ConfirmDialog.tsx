import { Dialog, DialogOverlay, DialogContent, DialogTitle, DialogDescription } from "./Dialog";
import { Button } from "./Button";
import type { ReactNode } from "react";

interface ConfirmDialogProps {
  children: ReactNode;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}

export function ConfirmDialog({
  children,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />

        <DialogContent>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3">
              <DialogTitle>
                {title}
              </DialogTitle>

              <DialogDescription>
                {description}
              </DialogDescription>
            </div>

            <div className="flex justify-end gap-4">
              <Dialog.Close asChild>
                <button className="cursor-pointer rounded-lg px-5 py-3 text-sm font-semibold leading-6 text-green-100 transition-colors hover:text-green-200">
                  {cancelLabel}
                </button>
              </Dialog.Close>

              <Dialog.Close asChild>
                <Button onClick={onConfirm}>
                  {confirmLabel}
                </Button>
              </Dialog.Close>
            </div>
          </div>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
