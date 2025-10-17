import {
  ForgotPasswordDto,
  forgotPasswordSchema,
} from "./forgot-password.schema";
import { LoginDto, loginSchema } from "./login.schema";
import { ResetPasswordDto, resetPasswordSchema } from "./reset-password.schema";
import { SignUpDto, signUpSchema } from "./sign-up.schema";
import { VerifyEmailDto, verifyEmailSchema } from "./verify-email";

export {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signUpSchema,
  verifyEmailSchema,
};

export type {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  SignUpDto,
  VerifyEmailDto,
};
