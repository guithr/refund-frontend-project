import { useNavigate } from "react-router";
import { useRefund } from "./use-refund";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { refundCreateFormSchema, type RefundCreateFormSchema } from "../schema";

export function useRefundForm() {
  const navigate = useNavigate();
  const { createRefundWithReceipt, isCreatingRefund } = useRefund();

  const {
    register,
    control,
    handleSubmit: hookFormSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RefundCreateFormSchema>({
    resolver: zodResolver(refundCreateFormSchema),
  });

  async function onSubmit(data: RefundCreateFormSchema) {
    await createRefundWithReceipt(data);
    navigate("/sent");
  }

  const handleSubmit = hookFormSubmit(onSubmit);

  const submitting = isSubmitting || isCreatingRefund;

  return {
    register,
    control,

    errors,
    isSubmitting: submitting,

    handleSubmit,
  };
}
