"use client";

import { Building2, Users, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = "Loading..." }: PageLoadingProps) {
  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header Skeleton */}
      <div className="flex-none border-b bg-gradient-to-r from-card to-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
                <Building2 className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-semibold text-foreground">CRM</h1>
            </div>

            {/* Illustration Skeleton */}
            <div className="hidden lg:block">
              <div className="h-20 w-32 animate-pulse rounded-lg bg-gradient-to-r from-muted/40 to-muted/20" />
            </div>
          </div>

          {/* Navigation Tabs Skeleton */}
          <div className="mt-6 flex gap-1 border-b">
            {[
              { icon: Users, label: "Contacts" },
              { icon: Building2, label: "Companies" },
              { icon: Target, label: "Leads" },
            ].map((tab, index) => (
              <div
                key={index}
                className="flex animate-pulse items-center gap-2 rounded-t-md bg-gradient-to-r from-muted/20 to-muted/10 px-4 py-3 text-sm font-medium"
              >
                <tab.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{tab.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Loading Animation */}
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="border-primary/20 bg-gradient-to-br from-card to-card/80 p-8 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Animated Logo */}
            <div className="relative">
              <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
                <Building2 className="h-8 w-8" />
              </div>
              {/* Rotating Ring */}
              <div className="absolute inset-0 animate-spin rounded-xl border-2 border-primary/30">
                <div className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-primary" />
              </div>
            </div>

            {/* Loading Text */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                {message}
              </h3>
              <p className="text-sm text-muted-foreground">
                Setting up your workspace...
              </p>
            </div>

            {/* Animated Dots */}
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-2 w-2 animate-bounce rounded-full bg-primary"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-48 overflow-hidden rounded-full bg-muted">
              <div className="h-full animate-pulse rounded-full bg-gradient-to-r from-primary to-primary/80" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
