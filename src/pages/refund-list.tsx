import { Text } from "../components/Text";
import { RefundSearch } from "../components/refund-search";
import { RefundRow } from "../components/refund-row";
import { RefundPagination } from "../components/refund-pagination";
import { useRefund } from "../contexts/refund-context";

export function RefundList() {
  const { filteredRefunds } = useRefund();

  return (
    <main className="mx-auto mt-10 w-full max-w-[1082px] rounded-2xl bg-gray-500 p-10">
      <Text as="h1" size="heading-lg" color="primary" className="mb-6">
        Solicitações
      </Text>

      <RefundSearch />

      <div className="space-y-4 my-6">
        {filteredRefunds.map((item) => (
          <RefundRow
            key={item.id}
            name={item.name}
            category={item.category}
            value={item.value}
          />
        ))}
      </div>

      <RefundPagination />
    </main>
  );
}
