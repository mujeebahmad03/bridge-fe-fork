"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";
import type { ConnectionMode } from "@/types/email";

interface ConnectionModeSelectionProps {
  onSelectMode: (mode: ConnectionMode) => void;
}

export function ConnectionModeSelection({
  onSelectMode,
}: ConnectionModeSelectionProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Select Connection Model</h1>
        <p className="text-muted-foreground">
          Choose how you want to connect your email accounts
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="group cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg">
          <CardContent className="space-y-6 p-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-blue-200 dark:bg-blue-900/20 dark:group-hover:bg-blue-900/40">
              <User className="h-10 w-10 text-blue-600" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">
                Connect a Single Account
              </h3>
              <p className="text-muted-foreground">
                Connect one email account to sync your data.
              </p>
            </div>
            <Button
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              size="lg"
              onClick={() => onSelectMode("single")}
            >
              Single Account
            </Button>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg">
          <CardContent className="space-y-6 p-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-gray-200 dark:bg-gray-800 dark:group-hover:bg-gray-700">
              <Users className="h-10 w-10 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">
                Connect Multiple Accounts (via CSV)
              </h3>
              <p className="text-muted-foreground">
                Connect multiple email accounts simultaneously by uploading a
                CSV file.
              </p>
            </div>
            <Button
              className="w-full"
              variant="outline"
              size="lg"
              onClick={() => onSelectMode("multiple")}
            >
              Multiple Accounts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
