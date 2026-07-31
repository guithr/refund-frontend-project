import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { SelectField } from "../components/SelectField";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { FileInput } from "../components/FileInput";
import { categoryOptions } from "../utils/helpers";
import { useRefundForm } from "../contexts/refunds/hooks/use-refund-form";
import { Controller } from "react-hook-form";

export function NewRefund() {
  const {
    register,
    control,

    errors,
    isSubmitting,

    handleSubmit,
  } = useRefundForm();

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 w-full max-w-lg">
      <Card>
        <Text as="h1" size="heading-lg" color="primary">
          Nova solicitação de reembolso
        </Text>

        <Text as="p" size="body-md" color="secondary" className="mt-3 mb-10">
          Dados da despesa para solicitar reembolso.
        </Text>

        <div className="flex flex-col gap-6">
          <Input
            label="Nome da solicitação"
            placeholder="Nome da solicitação"
            error={errors.title?.message}
            {...register("title")}
          />

          <div className="flex gap-4">
            <div className="flex-1">
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <SelectField
                    labelText="Categoria"
                    placeholder="Selecione"
                    options={categoryOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.category?.message}
                  />
                )}
              />
            </div>

            <div className="w-38.5">
              <Input
                type="number"
                label="Valor"
                placeholder="0,00"
                {...register("value", {
                  valueAsNumber: true,
                })}
                error={errors.value?.message}
              />
            </div>
          </div>
          <Controller
            control={control}
            name="receiptFile"
            render={({ field }) => (
              <FileInput
                labelText="Comprovante"
                placeholder="Nome do arquivo.pdf"
                error={errors.receiptFile?.message}
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  field.onChange(file);
                }}
              />
            )}
          />
        </div>

        <Button className="mt-6 w-full" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar"}
        </Button>
      </Card>
    </form>
  );
}
