"use client";

import { Upload, FileText, AlertCircle } from "lucide-react";
import Papa, { ParseResult } from "papaparse";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ImportRowMap } from "@/crm/dashboard/types";

type ImportType = "contacts" | "companies" | "leads";

interface ImportUploadProps<T extends ImportType> {
  importType: T;
  onFileProcessed: (
    data: ImportRowMap[T][],
    headers: string[],
    filename: string,
  ) => void;
}

export function ImportUpload<T extends ImportType>({
  importType,
  onFileProcessed,
}: ImportUploadProps<T>) {
  const [error, setError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setError("");
      setIsProcessing(true);

      if (!file.name.toLowerCase().endsWith(".csv")) {
        setError("Please upload a CSV file only");
        setIsProcessing(false);
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        setIsProcessing(false);
        return;
      }

      Papa.parse<ImportRowMap[T]>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: ParseResult<ImportRowMap[T]>) => {
          if (results.errors.length > 0) {
            setError(`CSV parsing error: ${results.errors[0].message}`);
            setIsProcessing(false);
            return;
          }

          if (results.data.length === 0) {
            setError("CSV file is empty or has no valid data");
            setIsProcessing(false);
            return;
          }

          const headers = Object.keys(results.data[0] ?? {});
          if (headers.length === 0) {
            setError("CSV file has no headers");
            setIsProcessing(false);
            return;
          }

          onFileProcessed(results.data, headers, file.name);
          setIsProcessing(false);
        },
        error: (error) => {
          setError(`Failed to parse CSV: ${error.message}`);
          setIsProcessing(false);
        },
      });
    },
    [onFileProcessed],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"], "application/vnd.ms-excel": [".csv"] },
    multiple: false,
    disabled: isProcessing,
  });

  const getSampleTemplate = () => {
    switch (importType) {
      case "contacts":
        return "Name,Email,Phone,Organization,Company Role,Assigned To";
      case "companies":
        return "Name,Industry,Company Owner,Organization Size,Email,Phone,LinkedIn,Assigned To";
      case "leads":
        return "Campaign Name,Name,Organization,Company Role,Email,Phone,LinkedIn,Assigned To";
    }
  };

  const downloadTemplate = () => {
    const template = getSampleTemplate();
    const blob = new Blob([template], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${importType}_template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold">Upload CSV File</h3>
        <p className="text-sm text-muted-foreground">
          Upload a CSV file to import your {importType}. Make sure your file
          includes the required columns.
        </p>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/20"
        } ${isProcessing ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-muted/50 p-4">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="text-lg font-medium">
              {isDragActive
                ? "Drop your CSV file here"
                : "Drag & drop your CSV file here"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              or click to browse files
            </p>
          </div>
          <Button variant="outline" size="sm" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Choose File"}
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Template Download */}
      <div className="rounded-lg bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <h4 className="text-sm font-medium">Need a template?</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Download our CSV template with the correct column headers for{" "}
              {importType}.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadTemplate}
              className="mt-2 bg-transparent"
            >
              Download Template
            </Button>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="rounded-lg bg-muted/20 p-4">
        <h4 className="mb-2 text-sm font-medium">File Requirements:</h4>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>• File format: CSV only</li>
          <li>• Maximum file size: 10MB</li>
          <li>• First row must contain column headers</li>
          <li>• Required columns vary by import type</li>
        </ul>
      </div>
    </div>
  );
}
