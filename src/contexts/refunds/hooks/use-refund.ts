import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../services/api";
import type { RefundShow } from "../../../types/refund";

export function useRefund(id?: string) {
  const { data, isLoading } = useQuery<RefundShow>({
    queryKey: ["refunds", id],
    queryFn: () => fetcher(`/refunds/${id}`),
    enabled: !!id,
  });

  return {
    refund: data?.refund,
    isLoadingRefund: isLoading,
  };
}
