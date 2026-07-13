import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../services/api";
import type { RefundIndex } from "../../../types/refund";

export function useRefunds() {
  const { data, isLoading } = useQuery<RefundIndex>({
    queryKey: ["refunds"],
    queryFn: () => fetcher("/refunds"),
  });

  return {
    refunds: data?.refunds,
    isLoadingRefunds: isLoading,
  };
}
