"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AuthCard } from "./auth-card";
import { ToastMessage } from "@/components/common";
import { LoadingButton } from "@/components/common/buttons";
import { FormFieldWrapper } from "@/components/common/forms";
import { Form } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { type VerifyEmailDto, verifyEmailSchema } from "@/lib/validations/auth";
import { authRoutes } from "@/config/routes";

export function VerifyEmailForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { push } = useRouter();

  const form = useForm<VerifyEmailDto>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: VerifyEmailDto) {
    try {
      console.log(data);
      toast.success(
        <ToastMessage
          title="Success"
          description="Email verified successfully"
        />,
      );
      push(authRoutes.emailSuccess);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard title="Verify Email">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormFieldWrapper
            control={form.control}
            name="otp"
            description="Please enter the one-time password sent to your email."
            className="flex flex-col items-center"
            render={({ field }) => (
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                </InputOTPGroup>

                <InputOTPSeparator />

                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>

                <InputOTPSeparator />

                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          <LoadingButton
            type="submit"
            loadingText="Submitting..."
            isLoading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </form>
      </Form>
    </AuthCard>
  );
}
