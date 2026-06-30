import {
  MagnifyingGlass,
  ForkKnife,
  Bed,
  DesktopTower,
  Wrench,
  Receipt,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";
import { NavLink } from "../components/NavLink";

const categoryIcon = {
  alimentacao: ForkKnife,
  hospedagem: Bed,
  transporte: DesktopTower,
  servicos: Wrench,
  outros: Receipt,
} as const;

type Category = keyof typeof categoryIcon;

interface RefundItem {
  id: string;
  name: string;
  category: Category;
  categoryLabel: string;
  value: number;
}

const refunds: RefundItem[] = [
  { id: "1", name: "Rodrigo", category: "alimentacao", categoryLabel: "Alimentação", value: 34.78 },
  { id: "2", name: "Tamires", category: "hospedagem", categoryLabel: "Hospedagem", value: 1200.00 },
  { id: "3", name: "Lara", category: "alimentacao", categoryLabel: "Alimentação", value: 12.35 },
  { id: "4", name: "Elias", category: "transporte", categoryLabel: "Transporte", value: 47.65 },
  { id: "5", name: "Thiago", category: "servicos", categoryLabel: "Serviços", value: 99.90 },
  { id: "6", name: "Vinicius", category: "outros", categoryLabel: "Outros", value: 25.89 },
];

export function RefundList() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-400">
      <header className="mx-auto flex w-full max-w-[1185px] items-center justify-between py-2">
        <Logo />
        <nav className="flex items-center gap-0">
          <NavLink href="/" isActive>
            Solicitações de reembolso
          </NavLink>
          <Button>Nova solicitação</Button>
        </nav>
      </header>

      <main className="mx-auto mt-11 w-full max-w-[1082px] flex-1 rounded-2xl bg-gray-500 p-10">
        <h1 className="mb-6 text-xl font-bold text-gray-100">
          Solicitações
        </h1>

        <div className="mb-6 flex items-end gap-3">
          <div className="flex-1">
            <Input label="NOME da solicitação" placeholder="Pesquisar pelo nome" />
          </div>
          <IconButton>
            <MagnifyingGlass size={24} className="text-white" />
          </IconButton>
        </div>

        <div className="space-y-4">
          {refunds.map((item) => {
            const Icon = categoryIcon[item.category];
            return (
              <div
                key={item.id}
                className="flex items-center justify-between py-1"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-[34px] items-center justify-center rounded-full bg-gray-400">
                    <Icon size={18} className="text-green-100" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-100">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-200">
                      {item.categoryLabel}
                    </p>
                  </div>
                </div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xs text-gray-200">R$</span>
                  <span className="text-sm font-semibold text-gray-100">
                    {item.value.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <IconButton size="sm">
            <CaretLeft size={16} className="text-white" />
          </IconButton>
          <span className="text-sm text-gray-200">1/3</span>
          <IconButton size="sm">
            <CaretRight size={16} className="text-white" />
          </IconButton>
        </div>
      </main>
    </div>
  );
}

function Logo() {
  return (
    <svg
      width="101"
      height="32"
      viewBox="0 0 101 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.89 4.21C5.89 1.89 7.78 0 10.1 0C12.42 0 14.31 1.89 14.31 4.21V22.52C14.31 23.76 13.31 24.76 12.07 24.76H10.1C7.78 24.76 5.89 22.87 5.89 20.55V4.21Z"
        fill="#1F8459"
      />
      <path
        d="M0 14.31C0 12.42 1.53 10.89 3.42 10.89H5.89V20.55C5.89 22.87 7.78 24.76 10.1 24.76H3.42C1.53 24.76 0 23.23 0 21.34V14.31Z"
        fill="#1F8459"
      />
      <path
        d="M24.61 9.02C24.61 8.22 25.26 7.57 26.06 7.57H34.61V19.82C34.61 21.34 33.39 22.56 31.87 22.56H26.06C25.26 22.56 24.61 21.91 24.61 21.11V9.02Z"
        fill="#1F8459"
      />
      <path
        d="M24.61 5.89C24.61 4.61 25.62 3.58 26.9 3.58H31.87C33.39 3.58 34.61 4.8 34.61 6.32V7.57H26.06C25.26 7.57 24.61 6.93 24.61 6.13V5.89Z"
        fill="#1F8459"
      />
      <text
        x="42"
        y="24"
        fontFamily="Open Sans"
        fontSize="16"
        fontWeight="700"
        fill="#1F8459"
      >
        refund
      </text>
    </svg>
  );
}
