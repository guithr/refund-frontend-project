import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { FileTextIcon } from "@phosphor-icons/react";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { SelectField } from "../components/SelectField";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useRefund } from "../contexts/refund-context";
import { categoryLabels, categoryKeys } from "../types/refund";

const options = categoryKeys.map((key) => ({
  value: key,
  label: categoryLabels[key],
}));

export function RefundDetail() {
  const { id } = useParams();
  const { refunds } = useRefund();
  const navigate = useNavigate();

  const refund = refunds.find((item) => item.id === id);

  if (!refund) {
    return (
      <main className="mx-auto mt-10 w-full max-w-[512px]">
        <Card className="text-center">
          <Text as="p" size="body-md" color="secondary">
            Solicitação não encontrada.
          </Text>
        </Card>
      </main>
    );
  }

  const formattedValue = refund.value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function handleDelete() {
    toast.success("Solicitação excluída com sucesso.");
    navigate("/");
  }

  return (
    <main className="mx-auto mt-10 w-full max-w-[512px]">
      <Card>
        <Text as="h1" size="heading-lg" color="primary">
          Solicitação de reembolso
        </Text>

        <Text as="p" size="body-md" color="secondary" className="mt-3 mb-10">
          Dados da despesa para solicitar reembolso.
        </Text>

        <div className="flex flex-col gap-8">
          <Input label="NOME DA SOLICITAÇÃO" value={refund.name} disabled />

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
              <Input label="VALOR" value={formattedValue} disabled />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-8">
          <a
            href="#"
            className="flex items-center gap-[7px] text-sm font-semibold leading-6 text-green-100 hover:text-green-200"
          >
            <FileTextIcon size={18} className="text-green-100" />
            Abrir comprovante
          </a>

          <ConfirmDialog
            title="Excluir solicitação"
            description="Tem certeza que deseja excluir essa solicitação? Essa ação é irreversível."
            onConfirm={handleDelete}
          >
            <Button className="w-full">Excluir</Button>
          </ConfirmDialog>
        </div>
      </Card>
    </main>
  );
}
