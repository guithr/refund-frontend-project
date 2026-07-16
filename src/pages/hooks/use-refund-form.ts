import { useState } from "react";
import { useNavigate } from "react-router";
import { refundStepOneSchema } from "../../contexts/refunds/schema";
import { receiptNewFormSchema } from "../../contexts/receipts/schema";
import { useRefund } from "../../contexts/refunds/hooks/use-refund";
import { useReceipt } from "../../contexts/receipts/hooks/use-receipt";

type FieldErrors = Partial<Record<string, string>>;

export function useRefundForm() {
  const navigate = useNavigate();
  const { createRefund, isCreatingRefund } = useRefund();
  const { createReceipt } = useReceipt();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isUploading, setIsUploading] = useState(false);

  const isSubmitting = isUploading || isCreatingRefund;

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0] ?? null);
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const numericValue = Number(value.replace(",", "."));

    const refundResult = refundStepOneSchema.safeParse({
      title,
      category,
      value: numericValue,
    });

    if (!refundResult.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of refundResult.error.issues) {
        const path = issue.path[0] as string;
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    const receiptResult = receiptNewFormSchema.safeParse({
      receiptFile: file,
    });

    if (!receiptResult.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of receiptResult.error.issues) {
        fieldErrors.receipt = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setIsUploading(true);

    try {
      const receiptData = await createReceipt({ receiptFile: file! });
      const receiptId = receiptData.receipt.id;

      setIsUploading(false);

      await createRefund({
        title: refundResult.data.title,
        category: refundResult.data.category,
        value: refundResult.data.value,
        receipt: receiptId,
      });

      navigate("/sent");
    } catch {
      setIsUploading(false);
    }
  }

  return {
    title,
    setTitle,
    category,
    setCategory,
    value,
    setValue,
    handleFileChange,
    errors,
    isSubmitting,
    handleSubmit,
  };
}
