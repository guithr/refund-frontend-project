import { useState } from "react";
import { useNavigate } from "react-router";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { SelectField } from "../components/SelectField";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { FileInput } from "../components/FileInput";
import { categoryLabels, categoryKeys } from "../types/refund";

const options = categoryKeys.map((key) => ({
  value: key,
  label: categoryLabels[key],
}));

export function NewRefund() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");

  function handleSubmit() {
    navigate("/sent");
  }

  return (
    <main className="mx-auto mt-10 w-full max-w-[512px]">
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex gap-4">
            <div className="flex-1">
              <SelectField
                labelText="CATEGORIA"
                placeholder="Selecione"
                value={category}
                onValueChange={setCategory}
                options={options}
              />
            </div>
            <div className="w-[154px]">
              <Input
                label="VALOR"
                placeholder="0,00"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>

          <FileInput
            labelText="COMPROVANTE"
            placeholder="Nome do arquivo.pdf"
          />
        </div>

        <Button className="mt-6 w-full" onClick={handleSubmit}>
          Enviar
        </Button>
      </Card>
    </main>
  );
}
