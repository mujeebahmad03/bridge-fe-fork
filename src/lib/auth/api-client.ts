import { AuthResponse } from "@/types/auth";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { TokenStorage } from "./token-storage";

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry: boolean;
}

export class ApiClient {
  private static instance: AxiosInstance;
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  private static createInstance() {
    const instance = axios.create({
      baseURL: this.BASE_URL,
      withCredentials: true,
    });

    // Request interceptor to add access token
    instance.interceptors.request.use(
      (config) => {
        const token = TokenStorage.getAccessToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor for token refresh
    instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        // If unauthorized and we haven't tried to refresh yet
        if (
          error.response?.status === 401 &&
          !(originalRequest as AxiosRequestConfigWithRetry)._retry
        ) {
          (originalRequest as AxiosRequestConfigWithRetry)._retry = true;

          try {
            const refreshToken = TokenStorage.getRefreshToken();

            if (!refreshToken) throw new Error("No refresh token");

            const response = await axios.post<AuthResponse>(
              `${this.BASE_URL}/auth/refresh-token`,
              { refreshToken },
            );

            // Update tokens
            TokenStorage.setTokens(response.data.tokens);

            // Retry the original request
            if (originalRequest) {
              originalRequest.headers["Authorization"] =
                `Bearer ${response.data.tokens.accessToken}`;
              return instance(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, clear tokens and redirect to login
            TokenStorage.clearTokens();
            if (typeof window !== "undefined") {
              window.location.href = "/auth";
            }
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    return instance;
  }

  static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = this.createInstance();
    }
    return this.instance;
  }
}

export const api = ApiClient.getInstance();
