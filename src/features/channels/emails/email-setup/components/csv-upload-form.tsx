"use client";

import {
  Upload,
  FileText,
  X,
  CheckCircle,
  Download,
  AlertCircle,
  Info,
} from "lucide-react";
import { useState, useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CsvValidationResults } from "./csv-validation-results";
import {
  parseCsvContent,
  downloadSampleCsv,
  type CsvValidationResult,
  type CsvEmailAccount,
} from "@/emails/email-setup/validations";
import { CSV_UPLOAD_LIMITS } from "../constants";

interface CsvUploadFormProps {
  onUpload: (data: CsvEmailAccount[]) => void;
}

export function CsvUploadForm({ onUpload }: CsvUploadFormProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] =
    useState<CsvValidationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setUploadError(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.file.size > CSV_UPLOAD_LIMITS.MAX_FILE_SIZE) {
          setUploadError(
            `File size exceeds ${(CSV_UPLOAD_LIMITS.MAX_FILE_SIZE / (1024 * 1024)).toFixed(1)}MB limit`,
          );
        } else {
          setUploadError("Please upload a valid CSV file");
        }
        return;
      }

      const file = acceptedFiles[0];
      if (!file) return;

      setUploadedFile(file);
      setIsProcessing(true);

      try {
        const content = await file.text();
        const result = parseCsvContent(content);
        setValidationResult(result);
      } catch (error) {
        setUploadError(
          "Failed to parse CSV file. Please check the file format.",
        );
        console.error("CSV parsing error:", error);
      } finally {
        setIsProcessing(false);
      }
    },
    [],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
    maxSize: CSV_UPLOAD_LIMITS.MAX_FILE_SIZE,
  });

  const handleProceed = (data: CsvEmailAccount[]) => {
    onUpload(data);
  };

  const handleRetry = () => {
    setUploadedFile(null);
    setValidationResult(null);
    setUploadError(null);
  };

  const handleDownloadSample = () => {
    downloadSampleCsv();
  };

  // Show validation results if we have them
  if (validationResult) {
    return (
      <CsvValidationResults
        validationResult={validationResult}
        onProceed={handleProceed}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Upload Email Accounts</h1>
        <p className="text-muted-foreground">
          Upload a CSV file with multiple email account details
        </p>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Upload Limits Info */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <p className="font-semibold">Upload Limits:</p>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      • Maximum records per upload:{" "}
                      <strong>
                        {CSV_UPLOAD_LIMITS.MAX_RECORDS.toLocaleString()}
                      </strong>
                    </li>
                    <li>
                      • Maximum file size:{" "}
                      <strong>
                        {(
                          CSV_UPLOAD_LIMITS.MAX_FILE_SIZE /
                          (1024 * 1024)
                        ).toFixed(1)}
                        MB
                      </strong>
                    </li>
                    <li>
                      • Supported format: <strong>CSV files only</strong>
                    </li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>

            {/* Sample Download Section */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
              <div className="flex items-start gap-3">
                <Download className="mt-0.5 h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <h4 className="mb-2 font-semibold text-blue-800 dark:text-blue-200">
                    Need a template?
                  </h4>
                  <p className="mb-3 text-sm text-blue-700 dark:text-blue-300">
                    Download our sample CSV file to see the exact format
                    required for bulk email account import.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadSample}
                    className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/20"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Sample CSV
                  </Button>
                </div>
              </div>
            </div>

            {/* Upload Error */}
            {uploadError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{uploadError}</AlertDescription>
              </Alert>
            )}

            {/* File Upload Area */}
            {!uploadedFile ? (
              <div
                {...getRootProps()}
                className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                    : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold">
                  {isDragActive ? "Drop your CSV file here" : "Upload CSV File"}
                </h3>
                <p className="mb-2 text-muted-foreground">
                  Drag and drop your CSV file here, or click to browse
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  Maximum: {CSV_UPLOAD_LIMITS.MAX_RECORDS.toLocaleString()}{" "}
                  records,{" "}
                  {(CSV_UPLOAD_LIMITS.MAX_FILE_SIZE / (1024 * 1024)).toFixed(1)}
                  MB
                </p>
                <Button variant="outline">Choose File</Button>
              </div>
            ) : (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">
                        {uploadedFile.name}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRetry}
                    className="text-green-600 hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-900/20"
                    disabled={isProcessing}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {isProcessing && (
                  <div className="mt-3 text-sm text-green-600 dark:text-green-400">
                    Validating CSV file...
                  </div>
                )}
              </div>
            )}

            {/* Format Requirements */}
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
              <h4 className="mb-3 flex items-center gap-2 font-semibold">
                <FileText className="h-4 w-4" />
                CSV Format Requirements
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Your CSV file must include these exact column headers
                  (case-insensitive):
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <code className="rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700">
                      email
                    </code>
                    <code className="rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700">
                      imapServer
                    </code>
                    <code className="rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700">
                      imapPort
                    </code>
                  </div>
                  <div className="space-y-1">
                    <code className="rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700">
                      smtpServer
                    </code>
                    <code className="rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700">
                      smtpPort
                    </code>
                    <code className="rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700">
                      password
                    </code>
                  </div>
                </div>
                <div className="mt-3 rounded border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-950/20">
                  <p className="text-xs text-yellow-800 dark:text-yellow-200">
                    <strong>Note:</strong> All fields are required. Email
                    addresses will be validated, and port numbers must be
                    between 1-65535.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
