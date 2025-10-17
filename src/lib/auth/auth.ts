import { LoginDto, SignUpDto } from "../validations/auth";
import { api } from "./api-client";
import { AuthError } from "./auth-error";
import { TokenStorage } from "./token-storage";
import { User, AuthResponse } from "@/types/auth";

export class AuthService {
  async registerUser(values: SignUpDto) {
    try {
      await api.post("/users/user/signup/", values);
    } catch (error) {
      console.error("Sign-up failed", JSON.stringify(error, null, 2));
      throw AuthError.fromAxiosError(error);
    }
  }

  async loginWithEmailPassword(values: LoginDto): Promise<User> {
    const { email, password } = values;

    try {
      const response = await api.post<AuthResponse>("/users/login/", {
        email,
        password,
      });

      // Store tokens
      TokenStorage.setTokens(response.data.tokens);

      return response.data.user;
    } catch (error) {
      console.error("Login failed", JSON.stringify(error, null, 2));
      throw AuthError.fromAxiosError(error);
    }
  }

  async googleSignIn(googleToken: string): Promise<User> {
    try {
      const response = await api.post<AuthResponse>("/auth/google-signin", {
        token: googleToken,
      });

      TokenStorage.setTokens(response.data.tokens);

      return response.data.user;
    } catch (error) {
      console.error("Google Sign-in failed", JSON.stringify(error, null, 2));
      throw AuthError.fromAxiosError(error);
    }
  }

  async logout() {
    try {
      // Invalidate refresh token on the server
      await api.post("/auth/logout", {
        refreshToken: TokenStorage.getRefreshToken(),
      });
    } catch (error) {
      console.error("Logout failed", JSON.stringify(error, null, 2));
      throw AuthError.fromAxiosError(error);
    } finally {
      // Always clear tokens
      TokenStorage.clearTokens();
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get<User>("/users/user/from-auth/");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch current user", error);
      return null;
    }
  }
}

export const auth = new AuthService();
