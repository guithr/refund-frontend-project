import { z } from "zod";

const MAX_LIMIT_FILE_SIZE_IN_BYTES = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];

export const receiptNewFormSchema = z.object({
  receiptFile: z
    .file()
    .min(1, { message: "Informe um arquivo de comprovante." })
    .max(MAX_LIMIT_FILE_SIZE_IN_BYTES, {
      message: "O arquivo de comprovante deve ter no máximo 2MB.",
    })
    .mime(ACCEPTED_FILE_TYPES, {
      message: "Formato inválido. Aceitos: jpg, jpeg, png ou pdf.",
    }),
});

export type ReceiptNewFormSchema = z.infer<typeof receiptNewFormSchema>;
