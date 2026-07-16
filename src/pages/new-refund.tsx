import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { SelectField } from "../components/SelectField";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { FileInput } from "../components/FileInput";
import { categoryOptions } from "../utils/helpers";
import { useRefundForm } from "./hooks/use-refund-form";

export function NewRefund() {
  const {
    title,
    setTitle,
    category,
    setCategory,
    value,
    setValue,
    handleFileChange,
    errors,
    isSubmitting,
    handleSubmit,
  } = useRefundForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 w-full max-w-[512px]"
    >
      <Card>
        <Text as="h1" size="heading-lg" color="primary">
          Nova solicitação de reembolso
        </Text>

        <Text as="p" size="body-md" color="secondary" className="mt-3 mb-10">
          Dados da despesa para solicitar reembolso.
        </Text>

        <div className="flex flex-col gap-6">
          <Input
            label="NOME DA SOLICITAÇÃO"
            placeholder="Nome da solicitação"
            value={title}
            error={errors.title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex gap-4">
            <div className="flex-1">
              <SelectField
                labelText="CATEGORIA"
                placeholder="Selecione"
                value={category}
                onValueChange={setCategory}
                options={categoryOptions}
                error={errors.category}
              />
            </div>
            <div className="w-[154px]">
              <Input
                label="VALOR"
                placeholder="0,00"
                value={value}
                error={errors.value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>

          <FileInput
            labelText="COMPROVANTE"
            placeholder="Nome do arquivo.pdf"
            error={errors.receipt}
            onChange={handleFileChange}
          />
        </div>

        <Button className="mt-6 w-full" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar"}
        </Button>
      </Card>
    </form>
  );
}
