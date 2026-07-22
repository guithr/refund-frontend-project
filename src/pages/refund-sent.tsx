import { Link } from "react-router";
import { CheckCircleIcon } from "@phosphor-icons/react";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export function RefundSent() {
  return (
    <main className="mx-auto mt-10 w-full max-w-lg">
      <Card>
        <div className="flex flex-col items-center gap-6">
          <Text
            as="h1"
            size="heading-xl"
            color="success"
            className="text-center"
          >
            Solicitação enviada!
          </Text>

          <CheckCircleIcon
            size={110}
            weight="regular"
            className="text-green-100"
          />

          <Text as="p" size="body-md" color="secondary" className="text-center">
            Agora é apenas aguardar! Sua solicitação será analisada e, em breve,
            o setor financeiro irá entrar em contato com você.
          </Text>
        </div>

        <div className="mt-10">
          <Link to="/novo">
            <Button className="w-full">Nova solicitação</Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}
