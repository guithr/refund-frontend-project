import { z } from "zod";

export const refundNewFormSchema = z.object({
  title: z.string().min(1, { message: "Informe um nome." }).max(255),
  category: z.enum(["food", "hosting", "transport", "services", "other"], {
    error: "Informe uma categoria.",
  }),
  value: z.number().positive({ message: "Informe um valor positivo." }),
  receipt: z.uuid(),
});

export const refundStepOneSchema = refundNewFormSchema.pick({
  title: true,
  category: true,
  value: true,
});

export const refundReceiptSchema = refundNewFormSchema.pick({
  receipt: true,
});

export type RefundNewFormSchema = z.infer<typeof refundNewFormSchema>;
