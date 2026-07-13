import { Routes, Route, BrowserRouter } from "react-router";
import { Layout } from "./pages/layout";
import { Home } from "./pages/home";
import { RefundDetail } from "./pages/refund-detail";
import { NewRefund } from "./pages/new-refund";
import { RefundSent } from "./pages/refund-sent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RefundProvider } from "./contexts/refund-context";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RefundProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/detalhe/:id" element={<RefundDetail />} />
              <Route path="/novo" element={<NewRefund />} />
              <Route path="/sent" element={<RefundSent />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RefundProvider>
    </QueryClientProvider>
  );
}
