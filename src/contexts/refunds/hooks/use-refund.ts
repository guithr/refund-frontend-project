import { useMutation, useQuery } from "@tanstack/react-query";
import { api, fetcher } from "../../../services/api";
import type {
  RefundCreatePayload,
  RefundShow,
  RefundDelete,
  RefundCreateResponse,
} from "../../../types/refund";
import type { RefundCreateFormSchema } from "../schema";
import { useReceipt } from "../../receipts/hooks/use-receipt";
import { toast } from "sonner";

export function useRefund(id?: string) {
  const { createReceipt } = useReceipt();

  const { mutateAsync: createRefund, isPending: isCreatingRefund } =
    useMutation({
      mutationFn: (payload: RefundCreatePayload) =>
        api
          .post<RefundCreateResponse>("refunds", payload)
          .then((res) => res.data),
      onError: () => {
        toast.error("Erro ao criar solicitação de reembolso");
      },
    });

  async function createRefundWithReceipt(payload: RefundCreateFormSchema) {
    const receiptData = await createReceipt({
      receiptFile: payload.receiptFile,
    });

    return createRefund({
      title: payload.title,
      category: payload.category,
      value: payload.value,
      receipt: receiptData.receipt.id,
    });
  }

  const { mutateAsync: deleteRefund, isPending: isDeletingRefund } =
    useMutation({
      mutationFn: (refundId: string) =>
        api.delete<RefundDelete>(`refunds/${refundId}`).then((res) => res.data),
      onSuccess: () => {
        toast.success("Solicitação excluída com sucesso.");
      },
      onError: () => {
        toast.error("Erro ao excluir solicitação.");
      },
    });

  const { data, isLoading } = useQuery<RefundShow>({
    queryKey: ["refunds", id],
    queryFn: () => fetcher(`/refunds/${id}`),
    enabled: !!id,
  });

  return {
    createRefund,
    isCreatingRefund,
    createRefundWithReceipt,
    deleteRefund,
    isDeletingRefund,
    refund: data?.refund,
    isLoadingRefund: isLoading,
  };
}
