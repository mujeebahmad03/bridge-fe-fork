"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Download, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  validateLinkedInCsv,
  generateLinkedInSampleCsv,
  LINKEDIN_CSV_LIMITS,
} from "@/utils/linkedin-csv-validator";
import { LinkedInCsvValidationResults } from "./linkedin-csv-validation-results";
import type { LinkedInCsvValidationResult } from "@/utils/linkedin-csv-validator";

interface LinkedInCsvUploadFormProps {
  onUpload: (file: File) => void;
}

export function LinkedInCsvUploadForm({
  onUpload,
}: LinkedInCsvUploadFormProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationResult, setValidationResult] =
    useState<LinkedInCsvValidationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = async (selectedFile: File) => {
    setError(null);
    setValidationResult(null);

    // Validate file type
    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      setError("Please select a CSV file");
      return;
    }

    // Validate file size
    if (selectedFile.size > LINKEDIN_CSV_LIMITS.MAX_FILE_SIZE) {
      setError(
        `File size must be less than ${LINKEDIN_CSV_LIMITS.MAX_FILE_SIZE / (1024 * 1024)}MB`,
      );
      return;
    }

    setFile(selectedFile);
    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Read and validate file
      const fileContent = await selectedFile.text();
      const result = validateLinkedInCsv(fileContent);

      clearInterval(progressInterval);
      setUploadProgress(100);

      setTimeout(() => {
        setUploading(false);
        setValidationResult(result);
      }, 500);
    } catch (err) {
      setUploading(false);
      setError("Failed to process the CSV file. Please try again.");
      console.error("CSV processing error:", err);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const downloadSampleCsv = () => {
    const csvContent = generateLinkedInSampleCsv();
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "linkedin-accounts-sample.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleProceed = () => {
    if (file) {
      onUpload(file);
    }
  };

  const handleRetry = () => {
    setFile(null);
    setValidationResult(null);
    setError(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (validationResult) {
    return (
      <LinkedInCsvValidationResults
        result={validationResult}
        onProceed={handleProceed}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold">
          Upload LinkedIn Accounts CSV
        </h2>
        <p className="text-muted-foreground">
          Upload a CSV file containing multiple LinkedIn account credentials
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            CSV File Upload
          </CardTitle>
          <CardDescription>
            Upload a CSV file with LinkedIn account information. Maximum{" "}
            {LINKEDIN_CSV_LIMITS.MAX_RECORDS} accounts, file size limit{" "}
            {LINKEDIN_CSV_LIMITS.MAX_FILE_SIZE / (1024 * 1024)}MB.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!uploading ? (
            <div
              className={cn(
                "cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors",
                dragActive
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50",
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-lg font-medium">
                    {dragActive
                      ? "Drop your CSV file here"
                      : "Click to upload or drag and drop"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    CSV files only, up to{" "}
                    {LINKEDIN_CSV_LIMITS.MAX_FILE_SIZE / (1024 * 1024)}MB
                  </p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <p className="font-medium">Processing {file?.name}...</p>
                <p className="text-sm text-muted-foreground">
                  Validating LinkedIn account data
                </p>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* CSV Format Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">CSV Format Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="mb-2 font-medium">Required Columns:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                • <code className="rounded bg-muted px-1">email</code> -
                LinkedIn account email
              </li>
              <li>
                • <code className="rounded bg-muted px-1">password</code> -
                LinkedIn account password
              </li>
              <li>
                • <code className="rounded bg-muted px-1">country</code> -
                Account country
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-medium">Optional Columns:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                •{" "}
                <code className="rounded bg-muted px-1">synchronizeChats</code>{" "}
                - true/false
              </li>
              <li>
                •{" "}
                <code className="rounded bg-muted px-1">
                  synchronizeMessages
                </code>{" "}
                - true/false
              </li>
              <li>
                • <code className="rounded bg-muted px-1">useOwnProxy</code> -
                true/false
              </li>
              <li>
                • <code className="rounded bg-muted px-1">proxyUrl</code> -
                Proxy server URL
              </li>
            </ul>
          </div>

          <Button
            variant="outline"
            onClick={downloadSampleCsv}
            className="w-full bg-transparent"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Sample CSV Template
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
