import { FileTextIcon, XIcon, ArrowSquareOutIcon } from "@phosphor-icons/react";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
} from "../../../components/Dialog";
import { Skeleton } from "../../../components/Skeleton";
import { Text } from "../../../components/Text";
import { api } from "../../../services/api";
import { useReceiptUrl } from "../hooks/use-receipt-url";
import { useEffect, useState } from "react";

interface ReceiptViewerProps {
  receiptId: string;
  extname: string;
  originalFilename: string;
}

export function ReceiptViewer({
  receiptId,
  extname,
  originalFilename,
}: ReceiptViewerProps) {
  const { fetchRefundReceipt, isLoading } = useReceiptUrl();
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const ext = extname.replace(/^\./, "").toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "webp"].includes(ext);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setHasError(false);
        const data = await fetchRefundReceipt(receiptId);
        if (mounted) setReceiptUrl(`${api.defaults.baseURL}${data.url}`);
      } catch {
        if (mounted) setHasError(true);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [receiptId, fetchRefundReceipt]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex cursor-pointer items-center gap-[7px] text-sm font-semibold leading-6 text-green-100 transition-colors hover:text-green-200">
          <FileTextIcon size={18} />
          Abrir comprovante
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />

        <DialogContent className="max-w-[640px]">
          <div className="flex items-start justify-between">
            <DialogTitle>{originalFilename}</DialogTitle>

            <Dialog.Close asChild>
              <button className="cursor-pointer text-gray-200 transition-colors hover:text-gray-100">
                <XIcon size={20} />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-6 flex min-h-[400px] items-center justify-center">
            {isLoading && <Skeleton className="h-[400px] w-full rounded-lg" />}

            {!isLoading && receiptUrl && isImage && (
              <img
                src={receiptUrl}
                alt={originalFilename}
                className="max-h-[500px] max-w-full rounded-lg object-contain"
              />
            )}

            {!isLoading && receiptUrl && !isImage && (
              <iframe
                src={receiptUrl}
                className="h-[500px] w-full rounded-lg"
                title={originalFilename}
              />
            )}

            {!isLoading && hasError && (
              <Text as="p" size="body-md" color="secondary">
                Não foi possível carregar o comprovante.
              </Text>
            )}
          </div>

          {receiptUrl && (
            <a
              href={receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-green-100 transition-colors hover:text-green-200"
            >
              <ArrowSquareOutIcon size={18} />
              Abrir em nova guia
            </a>
          )}
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
