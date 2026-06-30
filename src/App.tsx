import { Routes, Route } from "react-router";
import { RefundProvider } from "./contexts/refund-context";
import { Layout } from "./pages/layout";
import { RefundList } from "./pages/refund-list";

export function App() {
  return (
    <RefundProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<RefundList />} />
        </Route>
      </Routes>
    </RefundProvider>
  );
}
