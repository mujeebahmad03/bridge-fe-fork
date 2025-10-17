"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthCard } from "./auth-card";
import { LoadingButton } from "@/components/common/buttons";
import { FormInputFieldWrapper } from "@/components/common/forms";
import { Form } from "@/components/ui/form";
import { CardContent } from "@/components/ui/card";

import {
  type ResetPasswordDto,
  resetPasswordSchema,
} from "@/lib/validations/auth";
import { authRoutes } from "@/config/routes";

export function ResetPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { push } = useRouter();

  const form = useForm<ResetPasswordDto>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  function onSubmit(values: ResetPasswordDto) {
    try {
      setIsSubmitting(true);
      console.log(values);
      push(authRoutes.login);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard title="Forgot password">
      <CardContent className="space-y-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-8"
          >
            <FormInputFieldWrapper
              control={form.control}
              name="newPassword"
              label="New Password"
              type="password"
            />

            <FormInputFieldWrapper
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
            />

            <div className="flex flex-col space-y-2">
              <LoadingButton
                isLoading={isSubmitting}
                loadingText="Verifying..."
                type="submit"
              >
                Reset Password
              </LoadingButton>

              <span className="w-full text-center text-sm text-gray-500">
                Don&apos;t have an account yet?{" "}
                <Link href="/sign-up" className="text-blue-600 hover:underline">
                  Create one
                </Link>
              </span>
            </div>
          </form>
        </Form>
      </CardContent>
    </AuthCard>
  );
}
