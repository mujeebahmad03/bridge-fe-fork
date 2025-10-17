"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthCard } from "./auth-card";
import { OrComp, SocialAuth } from "./social-auth";
import { LoadingButton } from "@/components/common/buttons";
import {
  FormCheckboxFieldWrapper,
  FormInputFieldWrapper,
} from "@/components/common/forms";
import { Form } from "@/components/ui/form";
import { CardContent, CardFooter } from "@/components/ui/card";

import { type SignUpDto, signUpSchema } from "@/lib/validations/auth";
import { authRoutes } from "@/config/routes";
import { auth } from "@/lib/auth";

export function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { push } = useRouter();

  const form = useForm<SignUpDto>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
    },
    mode: "onChange",
  });

  async function onSubmit(values: SignUpDto) {
    setIsSubmitting(true);
    try {
      console.log(values);
      await auth.registerUser(values);

      localStorage.setItem("newUser", "true");

      push(authRoutes.verifyEmail);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard title="Create an Account">
      <CardContent>
        <SocialAuth />

        <OrComp />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormInputFieldWrapper
                control={form.control}
                name="firstName"
                label="First Name"
              />

              <FormInputFieldWrapper
                control={form.control}
                name="lastName"
                label="Last Name"
              />
            </div>

            <FormInputFieldWrapper
              control={form.control}
              name="email"
              label="Email"
              type="email"
            />

            <FormInputFieldWrapper
              control={form.control}
              name="password"
              label="Password"
              type="password"
              description={
                <div className="mt-2 text-sm text-gray-500">
                  Password must be at least{" "}
                  <span className="text-blue-600">8 Characters</span> and must
                  contain at least a{" "}
                  <span className="text-blue-600">Capital Letter</span>, a{" "}
                  <span className="text-blue-600">Number</span> and a{" "}
                  <span className="text-blue-600">Special Character</span>.
                </div>
              }
            />

            <FormCheckboxFieldWrapper
              form={form}
              name="terms"
              description={
                <div className="text-sm leading-none">
                  I hereby accept the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    T&C
                  </a>{" "}
                  of Bridge
                </div>
              }
            />

            <LoadingButton
              type="submit"
              loadingText="Signing up..."
              isLoading={isSubmitting}
            >
              Sign Up
            </LoadingButton>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <span className="w-full text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href={authRoutes.login}
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </span>
      </CardFooter>
    </AuthCard>
  );
}
