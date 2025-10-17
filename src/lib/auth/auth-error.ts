/* eslint-disable @typescript-eslint/no-explicit-any */
export class AuthError extends Error {
  code: string;
  details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = "AuthError";
    this.code = code;
    this.details = details;
  }

  static fromAxiosError(error: any): AuthError {
    if (error.response) {
      // The request was made and the server responded with a status code
      const { status, data } = error.response;

      switch (status) {
        case 400:
          return new AuthError(
            data.message || "Invalid request",
            "INVALID_REQUEST",
            data,
          );
        case 401:
          return new AuthError(
            data.message || "Unauthorized",
            "UNAUTHORIZED",
            data,
          );
        case 403:
          return new AuthError(data.message || "Forbidden", "FORBIDDEN", data);
        case 429:
          return new AuthError(
            "Too many attempts. Please try again later.",
            "RATE_LIMITED",
            data,
          );
        default:
          return new AuthError(
            data.message || "An unexpected error occurred",
            "UNKNOWN_ERROR",
            data,
          );
      }
    } else if (error.request) {
      // The request was made but no response was received
      return new AuthError(
        "No response from server. Check your network connection.",
        "NETWORK_ERROR",
      );
    } else {
      // Something happened in setting up the request
      return new AuthError(
        "Error preparing the request",
        "REQUEST_ERROR",
        error.message,
      );
    }
  }
}
