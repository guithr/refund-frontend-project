import { useMutation, useQuery } from "@tanstack/react-query";
import { api, fetcher } from "../../../services/api";
import type { RefundCreate, RefundShow } from "../../../types/refund";
import type { RefundNewFormSchema } from "../schema";
import { toast } from "sonner";

export function useRefund(id?: string) {
  const { mutateAsync: createRefund, isPending: isCreatingRefund } =
    useMutation({
      mutationFn: (payload: RefundNewFormSchema) =>
        api
          .post<RefundCreate>("refunds", {
            title: payload.title,
            category: payload.category,
            value: payload.value,
            receipt: payload.receipt,
          })
          .then((res) => res.data),
      onError: () => {
        toast.error("Erro ao criar solicitação de reembolso");
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
    refund: data?.refund,
    isLoadingRefund: isLoading,
  };
}
