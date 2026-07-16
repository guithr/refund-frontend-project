import { Input } from "../../../components/Input";
import { useRefunds } from "../hooks/use-refunds";
import { debounce } from "../../../utils/debounce";
import React from "react";

export function RefundSearch() {
  const { setSearch } = useRefunds();
  const [inputValue, setInputValue] = React.useState("");

  const debouncedSetValue = React.useMemo(
    () => debounce((value: string) => setSearch(value), 200),
    [setSearch],
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetValue(value);
  }

  return (
    <div className="mb-6 border-b border-gray-400 pb-6">
      <Input
        placeholder="Pesquisar pelo nome"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
