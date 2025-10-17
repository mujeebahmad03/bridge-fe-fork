"use client";

import { Progress } from "@/components/ui/progress";

interface ImportProgressProps {
  progress: number;
}

export function ImportProgress({ progress }: ImportProgressProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Progress value={progress} className="mb-4 w-full" />
      <p className="text-center text-sm text-muted-foreground">
        Importing leads... {progress}%
      </p>
    </div>
  );
}
