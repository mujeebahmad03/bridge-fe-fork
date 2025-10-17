import { Button, Card } from "@/components/ui";
import { Plus } from "lucide-react";

export const EmptyState = ({
  setShowEmailSetup,
}: {
  setShowEmailSetup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Card className="border-2 border-dashed border-muted-foreground/20 bg-gradient-to-br from-background to-accent/10">
      <div className="p-12 text-center">
        {/* Animated Illustration */}
        <div className="relative mb-8">
          <div className="relative inline-block">
            {/* Floating Email Icon */}
            <div className="relative z-10 animate-bounce">
              <div className="relative h-24 w-32 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent" />
                <div className="absolute left-3 right-3 top-3">
                  <div className="mb-2 h-1 rounded bg-white/30" />
                  <div className="mb-2 h-1 w-3/4 rounded bg-white/20" />
                  <div className="h-1 w-1/2 rounded bg-white/20" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-blue-700/50 to-transparent" />
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -right-4 -top-4 h-8 w-8 animate-pulse rounded-full bg-blue-100 dark:bg-blue-900/50" />
            <div className="absolute -bottom-2 -left-6 h-6 w-6 animate-pulse rounded-full bg-blue-200 delay-300 dark:bg-blue-800/50" />
            <div className="absolute -left-8 top-8 h-4 w-4 animate-pulse rounded-full bg-blue-300 delay-700 dark:bg-blue-700/50" />

            {/* Person Illustration */}
            <div className="absolute -left-20 top-4 animate-float">
              <div className="relative h-20 w-16">
                {/* Head */}
                <div className="mx-auto mb-1 h-8 w-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-300" />
                {/* Hair */}
                <div className="absolute left-1/2 top-0 h-6 w-10 -translate-x-1/2 transform rounded-t-full bg-gradient-to-br from-amber-800 to-amber-900" />
                {/* Body */}
                <div className="mx-auto h-8 w-12 rounded-t-lg bg-gradient-to-br from-blue-600 to-blue-700" />
                {/* Arms */}
                <div className="absolute left-0 top-8 h-6 w-3 rotate-12 transform rounded-full bg-gradient-to-br from-blue-600 to-blue-700" />
                <div className="absolute right-0 top-8 h-6 w-3 -rotate-12 transform rounded-full bg-gradient-to-br from-blue-600 to-blue-700" />
                {/* Legs */}
                <div className="absolute bottom-0 left-2 h-6 w-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-900" />
                <div className="absolute bottom-0 right-2 h-6 w-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-900" />
              </div>
            </div>

            {/* Plant */}
            <div className="animate-sway absolute -right-16 bottom-0">
              <div className="h-8 w-3 rounded-full bg-gradient-to-t from-amber-700 to-amber-600" />
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 transform">
                <div className="h-8 w-6 rotate-12 transform rounded-full bg-gradient-to-br from-green-500 to-green-600" />
                <div className="absolute left-1 top-1 h-6 w-4 -rotate-12 transform rounded-full bg-gradient-to-br from-green-400 to-green-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
            No email account
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            Add a new email account to get started with sending and managing
            your email campaigns.
          </p>

          <Button
            size="lg"
            className="bg-blue-600 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
            onClick={() => setShowEmailSetup(true)}
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Email
          </Button>
        </div>
      </div>
    </Card>
  );
};
