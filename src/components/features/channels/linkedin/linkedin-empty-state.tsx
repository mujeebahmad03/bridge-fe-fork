"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Users, Mail, Linkedin } from "lucide-react";

interface LinkedInEmptyStateProps {
  onConnectAccount: () => void;
}

export function LinkedInEmptyState({
  onConnectAccount,
}: LinkedInEmptyStateProps) {
  return (
    <Card className="border-2 border-dashed border-muted-foreground/20 bg-gradient-to-br from-background to-accent/10">
      <div className="p-12 text-center">
        {/* Enhanced Animated Illustration */}
        <div className="relative mb-8">
          <div className="relative inline-block">
            {/* Main LinkedIn Message Illustration */}
            <div className="relative z-10 animate-float">
              <div className="relative h-28 w-40 overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent" />
                {/* LinkedIn Logo */}
                <div className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-sm bg-white">
                  <Linkedin className="h-4 w-4 text-blue-600" />
                </div>
                {/* Message Lines */}
                <div className="absolute left-4 right-4 top-12 space-y-2">
                  <div className="h-1 w-3/4 rounded bg-white/40" />
                  <div className="h-1 w-1/2 rounded bg-white/30" />
                  <div className="h-1 w-2/3 rounded bg-white/30" />
                </div>
                {/* Notification Badge */}
                <div className="absolute -right-2 -top-2 flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white shadow-lg">
                  0
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-blue-800/50 to-transparent" />
              </div>
            </div>

            {/* Professional Person Illustration */}
            <div className="absolute -left-24 top-2 animate-float delay-300">
              <div className="relative h-24 w-20">
                {/* Head */}
                <div className="relative mx-auto mb-1 h-10 w-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-300">
                  <div className="absolute left-2 top-1 h-4 w-6 rounded-t-full bg-gradient-to-br from-amber-800 to-amber-900" />
                </div>
                {/* Professional Suit */}
                <div className="relative mx-auto h-10 w-14 rounded-t-lg bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="absolute left-1/2 top-2 h-6 w-1 -translate-x-1/2 transform bg-blue-600" />
                </div>
                {/* Arms */}
                <div className="absolute left-1 top-10 h-8 w-4 rotate-12 transform rounded-full bg-gradient-to-br from-gray-800 to-gray-900" />
                <div className="absolute right-1 top-10 h-8 w-4 -rotate-12 transform rounded-full bg-gradient-to-br from-gray-800 to-gray-900" />
                {/* Legs */}
                <div className="absolute bottom-0 left-3 h-8 w-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-900" />
                <div className="absolute bottom-0 right-3 h-8 w-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-900" />
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -right-6 -top-6 flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div className="absolute -bottom-4 -left-8 flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-green-100 delay-500 dark:bg-green-900/50">
              <Mail className="h-4 w-4 text-green-600" />
            </div>
            <div className="absolute -left-12 top-10 h-6 w-6 animate-pulse rounded-full bg-purple-100 delay-1000 dark:bg-purple-900/50" />

            {/* Office Plant */}
            <div className="animate-sway absolute -right-20 bottom-0">
              <div className="h-10 w-4 rounded-full bg-gradient-to-t from-amber-700 to-amber-600" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                <div className="h-10 w-8 rotate-12 transform rounded-full bg-gradient-to-br from-green-500 to-green-600" />
                <div className="absolute left-2 top-2 h-8 w-5 -rotate-12 transform rounded-full bg-gradient-to-br from-green-400 to-green-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            No LinkedIn account
          </h2>
          <p className="mx-auto max-w-md text-lg text-muted-foreground">
            Add a new LinkedIn account to get started
          </p>

          <Button
            size="lg"
            className="bg-blue-600 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
            onClick={onConnectAccount}
          >
            <Plus className="mr-2 h-5 w-5" />
            Connect LinkedIn account
          </Button>
        </div>
      </div>
    </Card>
  );
}
