import { Link } from "react-router";
import { RefundRow } from "./refund-row";
import { Skeleton } from "../../../components/Skeleton";
import { useRefunds } from "../hooks/use-refunds";

export function RefundList() {
  const { refunds, isLoadingRefunds } = useRefunds();
  return (
    <div className="space-y-4 my-6">
      {isLoadingRefunds ? (
        Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-0.5 px-2"
          >
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
      ) : refunds && refunds.data.length > 0 ? (
        refunds.data.map((refund) => (
          <Link
            key={refund.id}
            to={`/detalhe/${refund.id}`}
            className="block rounded-lg transition-colors hover:bg-gray-400 px-2 -mx-2"
          >
            <RefundRow
              title={refund.title}
              category={refund.category}
              value={refund.value}
            />
          </Link>
        ))
      ) : (
        <Skeleton className="h-4 w-16" />
      )}
    </div>
  );
}
