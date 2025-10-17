import { Home, FileQuestion } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui";
import { dashboardRoutes } from "@/config/routes";

export default function TemplateNotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-8 text-foreground">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <FileQuestion className="h-64 w-64 text-primary" />
          </div>
          <div className="relative">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                  <FileQuestion className="h-12 w-12 text-primary" />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs text-white">
                  404
                </span>
              </div>
            </div>
            <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-primary">
              Template Not Found
            </h1>
            <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-primary/30"></div>
            <p className="mb-8 text-xl text-muted-foreground">
              The template you&apos;re looking for doesn&apos;t exist or
              isn&apos;t available.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <Link href={dashboardRoutes.leadsEnrichment} className="inline-block">
            <Button
              size="lg"
              className="transition-all hover:scale-105 hover:shadow-lg"
            >
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>

        <div className="pt-8 text-sm text-muted-foreground">
          <p>
            Need help?{" "}
            <Link href="/support" className="text-primary hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
