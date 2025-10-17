"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthCard } from "./auth-card";
import { OrComp, SocialAuth } from "./social-auth";
import { FormInputFieldWrapper } from "@/components/common/forms";
import { CardContent, CardFooter } from "@/components/ui/card";
import { LoadingButton } from "@/components/common/buttons";
import { Form } from "@/components/ui/form";

import { type LoginDto, loginSchema } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";
import { onboardingRoutes } from "@/config/routes";
import { auth } from "@/lib/auth";

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { push } = useRouter();

  const form = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: LoginDto) {
    setIsSubmitting(true);
    try {
      console.log(values);
      await auth.loginWithEmailPassword(values);
      push(onboardingRoutes.welcome);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard title="Login">
      <CardContent>
        <SocialAuth />
        <OrComp />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormInputFieldWrapper
              control={form.control}
              name="email"
              label="Email"
              type="email"
            />

            <div className="flex flex-col">
              <FormInputFieldWrapper
                control={form.control}
                name="password"
                label="Password"
                type="password"
              />
              <Link
                href="/forgot-password"
                className="text-end text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <LoadingButton
              isLoading={isSubmitting}
              loadingText="Logging in..."
              type="submit"
            >
              Login
            </LoadingButton>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <span className="w-full text-center text-sm text-gray-500">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create one
          </Link>
        </span>
      </CardFooter>
    </AuthCard>
  );
}
