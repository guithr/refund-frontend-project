import { createContext, useContext, useState, useMemo, useEffect, type ReactNode } from "react";
import type { RefundItem } from "../types/refund";

const mockRefunds: RefundItem[] = [
  { id: "1", name: "Rodrigo", category: "alimentacao", value: 34.78 },
  { id: "2", name: "Tamires", category: "hospedagem", value: 1200.00 },
  { id: "3", name: "Lara", category: "alimentacao", value: 12.35 },
  { id: "4", name: "Elias", category: "transporte", value: 47.65 },
  { id: "5", name: "Thiago", category: "servicos", value: 99.90 },
  { id: "6", name: "Vinicius", category: "outros", value: 25.89 },
];

interface RefundContextType {
  refunds: RefundItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredRefunds: RefundItem[];
  isLoading: boolean;
}

const RefundContext = createContext<RefundContextType | undefined>(undefined);

interface RefundProviderProps {
  children: ReactNode;
}

export function RefundProvider({ children }: RefundProviderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredRefunds = useMemo(
    () =>
      mockRefunds.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  const value = useMemo(
    () => ({ refunds: mockRefunds, searchQuery, setSearchQuery, filteredRefunds, isLoading }),
    [searchQuery, isLoading],
  );

  return (
    <RefundContext.Provider value={value}>
      {children}
    </RefundContext.Provider>
  );
}

export function useRefund() {
  const context = useContext(RefundContext);

  if (!context) {
    throw new Error("useRefund must be used within a RefundProvider");
  }

  return context;
}
