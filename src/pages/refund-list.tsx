import { Link } from "react-router";
import { Text } from "../components/Text";
import { RefundSearch } from "../components/refund-search";
import { RefundRow } from "../components/refund-row";
import { RefundPagination } from "../components/refund-pagination";
import { Skeleton } from "../components/Skeleton";
import { useRefund } from "../contexts/refund-context";

export function RefundList() {
  const { filteredRefunds, isLoading } = useRefund();

  return (
    <main className="mx-auto mt-10 w-full max-w-[1082px] rounded-2xl bg-gray-500 p-10">
      <Text as="h1" size="heading-lg" color="primary" className="mb-6">
        Solicitações
      </Text>

      <RefundSearch />

      <div className="space-y-4 my-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-0.5 px-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-[34px] rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))
          : filteredRefunds.map((item) => (
              <Link
                key={item.id}
                to={`/detalhe/${item.id}`}
                className="block rounded-lg transition-colors hover:bg-gray-400 px-2 -mx-2"
              >
                <RefundRow
                  name={item.name}
                  category={item.category}
                  value={item.value}
                />
              </Link>
            ))}
      </div>

      <RefundPagination />
    </main>
  );
}
