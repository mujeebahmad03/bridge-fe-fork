import Cookies from "js-cookie";
import { EncryptJWT, jwtDecrypt } from "jose";
import { TokenPair } from "@/types/auth";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export class TokenStorage {
  private static async encrypt(
    data: string,
    expirationInSeconds: number,
  ): Promise<string> {
    return await new EncryptJWT({ data })
      .setProtectedHeader({ alg: "dir", enc: "A256GCM" })

      .setExpirationTime(expirationInSeconds)
      .encrypt(SECRET_KEY);
  }

  private static async decrypt(token: string): Promise<string | null> {
    try {
      const { payload } = await jwtDecrypt(token, SECRET_KEY);
      return payload.data as string;
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  }

  static async setTokens(token: TokenPair) {
    const { accessToken, refreshToken } = token;

    const encryptedAccessToken = await this.encrypt(accessToken, 15 * 60); // 15 minutes
    const encryptedRefreshToken = await this.encrypt(
      refreshToken,
      7 * 24 * 60 * 60,
    ); // 7 days

    Cookies.set("access_token", encryptedAccessToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: 15 / 1440, // 15 minutes
    });

    Cookies.set("refresh_token", encryptedRefreshToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: 7, // 7 days
    });
  }

  static async getAccessToken(): Promise<string | null> {
    const encryptedToken = Cookies.get("access_token");
    return encryptedToken ? await this.decrypt(encryptedToken) : null;
  }

  static async getRefreshToken(): Promise<string | null> {
    const encryptedToken = Cookies.get("refresh_token");
    return encryptedToken ? await this.decrypt(encryptedToken) : null;
  }

  static clearTokens() {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  }
}
