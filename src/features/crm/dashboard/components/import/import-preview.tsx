"use client";

import { ArrowLeft, Upload, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type ImportType = "contacts" | "companies" | "leads";

interface ImportPreviewProps<T extends Record<string, string>> {
  importType: ImportType;
  csvData: T[]; // each row is an object keyed by CSV headers
  fieldMapping: Record<string, keyof T>; // maps your entity fields -> CSV header
  fileName: string;
  onImport: () => void;
  onBack: () => void;
}

export function ImportPreview<T extends Record<string, string>>({
  importType,
  csvData,
  fieldMapping,
  fileName,
  onImport,
  onBack,
}: ImportPreviewProps<T>) {
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async () => {
    setIsImporting(true);

    console.log("Starting import process:", {
      type: importType,
      records: csvData.length,
      mapping: fieldMapping,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsImporting(false);
    onImport();
  };

  const getMappedData = () => {
    return csvData.slice(0, 5).map((row, index) => {
      const mappedRow: Record<string, string> = {};
      Object.entries(fieldMapping).forEach(([fieldKey, csvHeader]) => {
        mappedRow[fieldKey] = row[csvHeader] ?? "";
      });
      return { ...mappedRow, _originalIndex: index };
    });
  };

  const previewData = getMappedData();
  const totalRecords = csvData.length;

  const validRecords = csvData.filter((row) => {
    const requiredFields = Object.entries(fieldMapping).filter(([key]) => {
      switch (importType) {
        case "contacts":
          return key === "name";
        case "companies":
          return key === "name";
        case "leads":
          return key === "campaignName";
        default:
          return false;
      }
    });

    return requiredFields.every(([, csvHeader]) => row[csvHeader]?.trim());
  }).length;

  const invalidRecords = totalRecords - validRecords;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold">Preview Import</h3>
        <p className="text-sm text-muted-foreground">
          Review your data before importing. Showing first 5 records.
        </p>
      </div>

      {/* Import Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-muted/20 p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {totalRecords}
          </div>
          <div className="text-sm text-muted-foreground">Total Records</div>
        </div>
        <div className="rounded-lg bg-green-500/10 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {validRecords}
          </div>
          <div className="text-sm text-muted-foreground">Valid Records</div>
        </div>
        <div className="rounded-lg bg-red-500/10 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {invalidRecords}
          </div>
          <div className="text-sm text-muted-foreground">Invalid Records</div>
        </div>
      </div>

      {/* Validation Alerts */}
      {invalidRecords > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {invalidRecords} record(s) are missing required fields and will be
            skipped during import.
          </AlertDescription>
        </Alert>
      )}

      {validRecords > 0 && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            {validRecords} record(s) are ready to be imported.
          </AlertDescription>
        </Alert>
      )}

      {/* File Info */}
      <div className="rounded-lg bg-muted/20 p-4">
        <h4 className="mb-2 text-sm font-medium">File Information:</h4>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div>File: {fileName}</div>
          <div>Import Type: {importType}</div>
          <div>Mapped Fields: {Object.keys(fieldMapping).length}</div>
        </div>
      </div>

      {/* Data Preview */}
      <div className="rounded-lg border">
        <div className="border-b bg-muted/20 p-4">
          <h4 className="text-sm font-medium">
            Data Preview (First 5 Records)
          </h4>
        </div>
        <ScrollArea className="h-64">
          <div className="space-y-4 p-4">
            {previewData.map((row, index) => (
              <div key={index} className="space-y-2 rounded-lg border p-3">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Record {index + 1}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                  {Object.entries(fieldMapping).map(([fieldKey]) => (
                    <div key={fieldKey} className="flex justify-between">
                      <span className="capitalize text-muted-foreground">
                        {fieldKey.replace(/([A-Z])/g, " $1").trim()}:
                      </span>
                      <span className="font-medium">
                        {row[fieldKey as keyof typeof row] || (
                          <span className="text-muted-foreground">Empty</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} disabled={isImporting}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleImport}
          disabled={validRecords === 0 || isImporting}
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          {isImporting ? (
            <>Processing...</>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Import {validRecords} Records
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
