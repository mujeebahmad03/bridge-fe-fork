"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import type { EmailProvider } from "@/types/email";

interface ProviderSelectionProps {
  onSelectProvider: (provider: EmailProvider) => void;
}

export function ProviderSelection({
  onSelectProvider,
}: ProviderSelectionProps) {
  const handleOAuthProvider = (provider: "google" | "microsoft") => {
    // Simulate OAuth redirect
    const oauthUrl =
      provider === "google"
        ? "https://accounts.google.com/oauth/authorize?client_id=your-client-id&redirect_uri=your-redirect&scope=email&response_type=code"
        : "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=your-client-id&redirect_uri=your-redirect&scope=email&response_type=code";

    // In a real app, you would redirect to the OAuth URL
    console.log(`Redirecting to ${provider} OAuth:`, oauthUrl);
    alert(
      `This would redirect to ${provider} OAuth. For demo purposes, we'll skip this step.`,
    );
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Choose Email Provider</h1>
        <p className="text-muted-foreground">
          Select how you&apos;d like to connect your email account
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="group cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg">
          <CardContent className="space-y-4 p-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 transition-colors group-hover:bg-red-200 dark:bg-red-900/20 dark:group-hover:bg-red-900/40">
              <svg
                className="h-8 w-8 text-red-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">With Gmail</h3>
              <p className="text-sm text-muted-foreground">
                Set up using google mail
              </p>
            </div>
            <Button
              className="w-full"
              onClick={() => handleOAuthProvider("google")}
            >
              Connect with Google
            </Button>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg">
          <CardContent className="space-y-4 p-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-blue-200 dark:bg-blue-900/20 dark:group-hover:bg-blue-900/40">
              <svg
                className="h-8 w-8 text-blue-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7.78 12L10.67 14.89L16.22 9.34L12.11 5.23L7.78 9.56V12Z" />
                <path d="M12.11 2L22 11.89L12.11 21.78L2.22 11.89L12.11 2ZM12.11 5.23L7.78 9.56L7.78 12L10.67 14.89L16.22 9.34L12.11 5.23Z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">With Microsoft</h3>
              <p className="text-sm text-muted-foreground">
                Set up using microsoft
              </p>
            </div>
            <Button
              className="w-full"
              onClick={() => handleOAuthProvider("microsoft")}
            >
              Connect with Microsoft
            </Button>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg">
          <CardContent className="space-y-4 p-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-gray-200 dark:bg-gray-800 dark:group-hover:bg-gray-700">
              <Mail className="h-8 w-8 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">With any provider</h3>
              <p className="text-sm text-muted-foreground">
                Set up using SMTP/IMAP
              </p>
            </div>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => onSelectProvider("custom")}
            >
              Continue with Custom
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
