import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../services/api";
import type { RefundIndex } from "../../../types/refund";
import { useQueryState, createSerializer, parseAsString } from "nuqs";

const toSearchParams = createSerializer({
  q: parseAsString,
});

export function useRefunds() {
  const [q, setQ] = useQueryState("q");

  const { data, isLoading } = useQuery<RefundIndex>({
    queryKey: ["refunds", q],
    queryFn: () => fetcher(`/refunds${toSearchParams({ q })}`),
  });

  return {
    refunds: data?.refunds,
    isLoadingRefunds: isLoading,
    filters: {
      q,
      setQ,
    },
  };
}
