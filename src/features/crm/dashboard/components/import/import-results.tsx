"use client";

import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ImportType = "contacts" | "companies" | "leads";

interface ImportResultsProps {
  importType: ImportType;
  onFinish: () => void;
}

export function ImportResults({ importType, onFinish }: ImportResultsProps) {
  // Mock results - in real app, this would come from the API response
  const results = {
    total: 150,
    successful: 142,
    failed: 8,
    errors: [
      "Row 15: Missing required field 'name'",
      "Row 23: Invalid email format",
      "Row 45: Duplicate entry",
      "Row 67: Missing required field 'name'",
      "Row 89: Invalid phone number format",
    ],
  };

  const successRate = Math.round((results.successful / results.total) * 100);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">Import Complete!</h3>
        <p className="text-sm text-muted-foreground">
          Your {importType} have been imported successfully.
        </p>
      </div>

      {/* Results Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-muted/20 p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {results.total}
          </div>
          <div className="text-sm text-muted-foreground">Total Records</div>
        </div>
        <div className="rounded-lg bg-green-500/10 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {results.successful}
          </div>
          <div className="text-sm text-muted-foreground">
            Successfully Imported
          </div>
        </div>
        <div className="rounded-lg bg-red-500/10 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {results.failed}
          </div>
          <div className="text-sm text-muted-foreground">Failed</div>
        </div>
      </div>

      {/* Success Rate */}
      <div className="rounded-lg bg-muted/20 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">Success Rate</span>
          <Badge
            variant={
              successRate >= 90
                ? "default"
                : successRate >= 70
                  ? "secondary"
                  : "destructive"
            }
          >
            {successRate}%
          </Badge>
        </div>
        <div className="h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${successRate}%` }}
          />
        </div>
      </div>

      {/* Error Details */}
      {results.failed > 0 && (
        <div className="rounded-lg border">
          <div className="border-b bg-muted/20 p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <h4 className="text-sm font-medium">
                Import Errors ({results.failed})
              </h4>
            </div>
          </div>
          <div className="max-h-48 space-y-2 overflow-y-auto p-4">
            {results.errors.map((error, index) => (
              <div
                key={index}
                className="rounded bg-red-500/5 p-2 text-sm text-muted-foreground"
              >
                {error}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="rounded-lg bg-muted/20 p-4">
        <h4 className="mb-2 text-sm font-medium">What&apos;s Next?</h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>
            • Your imported {importType} are now available in the main table
          </li>
          <li>• You can edit individual records if needed</li>
          <li>• Failed imports can be corrected and re-imported</li>
        </ul>
      </div>

      {/* Finish Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={onFinish}
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          Back to {importType.charAt(0).toUpperCase() + importType.slice(1)}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
