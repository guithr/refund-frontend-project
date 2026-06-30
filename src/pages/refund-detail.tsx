import { useParams, Link } from "react-router";
import { FileText } from "@phosphor-icons/react";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { SelectField } from "../components/SelectField";
import { Button } from "../components/Button";
import { useRefund } from "../contexts/refund-context";
import { categoryLabels, categoryKeys } from "../types/refund";

const options = categoryKeys.map((key) => ({
  value: key,
  label: categoryLabels[key],
}));

export function RefundDetail() {
  const { id } = useParams();
  const { refunds } = useRefund();

  const refund = refunds.find((item) => item.id === id);

  if (!refund) {
    return (
      <main className="mx-auto mt-10 w-full max-w-[512px] rounded-2xl bg-gray-500 p-10 text-center">
        <Text as="p" size="body-md" color="secondary">
          Solicitação não encontrada.
        </Text>
      </main>
    );
  }

  const formattedValue = refund.value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <main className="mx-auto mt-10 w-full max-w-[512px] rounded-2xl bg-gray-500 p-10">
      <Text as="h1" size="heading-lg" color="primary">
        Solicitação de reembolso
      </Text>

      <Text as="p" size="body-md" color="secondary" className="mt-3 mb-10">
        Dados da despesa para solicitar reembolso.
      </Text>

      <div className="flex flex-col gap-8">
        <Input
          label="NOME DA SOLICITAÇÃO"
          value={refund.name}
          disabled
        />

        <div className="flex gap-4">
          <div className="flex-1">
            <SelectField
              labelText="CATEGORIA"
              defaultValue={refund.category}
              options={options}
              disabled
            />
          </div>
          <div className="w-[154px]">
            <Input
              label="VALOR"
              value={formattedValue}
              disabled
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Link
          to="#"
          className="flex h-12 w-full items-center justify-center gap-[7px] text-sm font-semibold leading-6 text-green-100 hover:text-green-200"
        >
          <FileText size={18} className="text-green-100" />
          Abrir comprovante
        </Link>

        <Button className="w-full" onClick={() => window.history.back()}>
          Excluir
        </Button>
      </div>
    </main>
  );
}
