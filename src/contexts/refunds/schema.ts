import { z } from "zod";
import { receiptNewFormSchema } from "../receipts/schema";

/**
 * ============================================================================
 * Schemas principais
 * ============================================================================
 */

export const refundSchema = z.object({
  title: z.string().min(1, { message: "Informe um nome." }).max(255),
  category: z.enum(["food", "hosting", "transport", "services", "other"], {
    error: "Informe uma categoria.",
  }),
  value: z.number().positive({ message: "Informe um valor positivo." }),
  receipt: z.uuid(),
});

export const refundStepOneSchema = refundSchema.pick({
  title: true,
  category: true,
  value: true,
});

export const refundReceiptSchema = refundSchema.pick({
  receipt: true,
});

export const refundCreateFormSchema = refundStepOneSchema.extend({
  receiptFile: receiptNewFormSchema.shape.receiptFile,
});

export type RefundSchema = z.infer<typeof refundSchema>;

export type RefundCreateFormSchema = z.infer<typeof refundCreateFormSchema>;
