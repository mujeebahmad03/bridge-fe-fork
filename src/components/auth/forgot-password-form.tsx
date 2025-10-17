"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthCard } from "./auth-card";
import { OrComp, SocialAuth } from "./social-auth";
import { LoadingButton } from "@/components/common/buttons";
import { FormInputFieldWrapper } from "@/components/common/forms";
import { Form } from "@/components/ui/form";
import { CardContent } from "@/components/ui/card";

import {
  type ForgotPasswordDto,
  forgotPasswordSchema,
} from "@/lib/validations/auth";

export function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ForgotPasswordDto>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  function onSubmit(values: ForgotPasswordDto) {
    setIsSubmitting(true);
    console.log(values);
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
              name="email"
              label="Email"
              type="email"
            />

            <div className="flex flex-col space-y-2">
              <LoadingButton
                isLoading={isSubmitting}
                loadingText="Verifying..."
                type="submit"
              >
                Verify Email
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

        <OrComp />

        <SocialAuth />
      </CardContent>
    </AuthCard>
  );
}
