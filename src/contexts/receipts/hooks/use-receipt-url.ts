import { api } from "../../../services/api";
import type { RefundReceiptShow } from "../../../types/refund";
import { toast } from "sonner";
import { useCallback, useState } from "react";

export function useReceiptUrl() {
  const [isLoading, setIsLoading] = useState(false);
  const fetchRefundReceipt = useCallback(async (receiptId: string) => {
    try {
      setIsLoading(true);
      const response = await api.get<RefundReceiptShow>(
        `/receipts/download/${receiptId}`,
      );
      return response.data;
    } catch (error) {
      toast.error("Erro ao buscar comprovante do reembolso.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    fetchRefundReceipt,
    isLoading,
  };
}
