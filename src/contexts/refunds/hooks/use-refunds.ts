import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../services/api";
import type { RefundIndex } from "../../../types/refund";
import {
  useQueryState,
  createSerializer,
  parseAsString,
  parseAsInteger,
} from "nuqs";

const toSearchParams = createSerializer({
  q: parseAsString,
  page: parseAsInteger,
});

export function useRefunds() {
  const [q, setQ] = useQueryState("q");
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data, isLoading } = useQuery<RefundIndex>({
    queryKey: ["refunds", q, page],
    queryFn: () => fetcher(`/refunds${toSearchParams({ q, page })}`),
  });

  const setSearch = useCallback(
    (value: string) => {
      setQ(value || null);
      setPage(1);
    },
    [setQ, setPage],
  );

  return {
    refunds: data?.refunds,
    meta: data?.refunds?.meta,
    isLoadingRefunds: isLoading,
    filters: {
      q,
      setQ,
    },
    pagination: {
      page,
      setPage,
    },
    setSearch,
  };
}
