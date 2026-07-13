import { Text } from "../components/Text";
import { RefundSearch } from "../contexts/refunds/components/refund-search";
import { RefundList } from "../contexts/refunds/components/refund-list";
import { RefundPagination } from "../contexts/refunds/components/refund-pagination";

export function Home() {
  return (
    <main className="mx-auto mt-10 w-full max-w-[1082px] rounded-2xl bg-gray-500 p-10">
      <Text as="h1" size="heading-lg" color="primary" className="mb-6">
        Solicitações
      </Text>

      <RefundSearch />

      <RefundList />

      <RefundPagination />
    </main>
  );
}
