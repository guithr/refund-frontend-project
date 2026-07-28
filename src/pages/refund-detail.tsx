import { useParams, useNavigate } from "react-router";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { SelectField } from "../components/SelectField";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Skeleton } from "../components/Skeleton";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { ReceiptViewer } from "../contexts/receipts/components/receipt-viewer";
import { useRefund } from "../contexts/refunds/hooks/use-refund";
import { categoryOptions } from "../utils/helpers";

export function RefundDetail() {
  const { id } = useParams();
  const { refund, isLoadingRefund, deleteRefund, isDeletingRefund } =
    useRefund(id);
  const navigate = useNavigate();

  if (isLoadingRefund) {
    return (
      <main className="mx-auto mt-10 w-full max-w-lg">
        <Card>
          <Skeleton className="h-7 w-72 mb-3" />
          <Skeleton className="h-5 w-56 mb-10" />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-11 w-full" />
              </div>
              <div className="flex w-38.5 flex-col gap-1">
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-11 w-full" />
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center gap-8">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-12 w-full" />
          </div>
        </Card>
      </main>
    );
  }

  if (!refund) {
    return (
      <main className="mx-auto mt-10 w-full max-w-lg">
        <Card className="text-center">
          <Text as="p" size="body-md" color="secondary">
            Solicitação não encontrada.
          </Text>
        </Card>
      </main>
    );
  }

  const refundId = refund.id;

  const formattedValue = refund.value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  async function handleDelete() {
    try {
      await deleteRefund(refundId);
      navigate("/");
    } catch {
      // Error handled by mutation's onError toast
    }
  }

  return (
    <main className="mx-auto mt-10 w-full max-w-lg">
      <Card>
        <Text as="h1" size="heading-lg" color="primary">
          Solicitação de reembolso
        </Text>

        <Text as="p" size="body-md" color="secondary" className="mt-3 mb-10">
          Dados da despesa para solicitar reembolso.
        </Text>

        <div className="flex flex-col gap-8">
          <Input label="Nome da solicitação" value={refund.title} disabled />

          <div className="flex gap-4">
            <div className="flex-1">
              <SelectField
                labelText="Categoria"
                defaultValue={refund.category}
                options={categoryOptions}
                disabled
              />
            </div>
            <div className="w-38.5">
              <Input label="Valor" value={formattedValue} disabled />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-8">
          <ReceiptViewer
            receiptId={refund.receipt.id}
            extname={refund.receipt.extname}
            originalFilename={refund.receipt.originalFilename}
          />

          <ConfirmDialog
            title="Excluir solicitação"
            description="Tem certeza que deseja excluir essa solicitação? Essa ação é irreversível."
            onConfirm={handleDelete}
          >
            <Button className="w-full" disabled={isDeletingRefund}>
              {isDeletingRefund ? "Excluindo..." : "Excluir"}
            </Button>
          </ConfirmDialog>
        </div>
      </Card>
    </main>
  );
}
