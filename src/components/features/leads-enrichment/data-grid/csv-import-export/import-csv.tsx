/* eslint-disable quotes */
"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Download, Upload } from "lucide-react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";

import { cn } from "@/lib/utils";

export function CSVImport() {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const [importStatus, setImportStatus] = useState<null | {
    success: boolean;
    message: string;
  }>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle CSV import
  const handleImportCSV = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setImportStatus({ success: true, message: "Processing..." });

      const text = await file.text();
      const result = parseCSV(text);

      if (result.length > 0) {
        setImportStatus({
          success: true,
          message: `Successfully imported ${result.length} records.`,
        });

        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        // Close dialog after 2 seconds
        setTimeout(() => {
          setIsImportDialogOpen(false);
          setImportStatus(null);
        }, 2000);
      } else {
        setImportStatus({
          success: false,
          message: "No valid data found in the CSV file.",
        });
      }
    } catch (error) {
      console.error("Error importing CSV:", error);
      setImportStatus({
        success: false,
        message: "Failed to import CSV. Please check the file format.",
      });
    }
  };

  // Function to parse CSV
  const parseCSV = (text: string) => {
    const lines = text.split("\n");
    const headers = lines[0].split(",").map((header) => header.trim());

    return lines
      .slice(1)
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const values = line.split(",").map((value) => value.trim());
        const entry: Record<string, string> = {};

        headers.forEach((header, index) => {
          entry[header] = values[index] || "";
        });

        return entry;
      });
  };

  interface ExportData {
    [key: string]: string | number | null | undefined;
  }

  // Function to generate CSV
  const generateCSV = (dataToExport: ExportData[]): string => {
    if (dataToExport.length === 0) return "";

    const headers = Object.keys(dataToExport[0]);
    const csvRows = [
      headers.join(","),
      ...dataToExport.map((row) =>
        headers
          .map((header) => {
            const cell = row[header] || "";
            // Escape quotes and wrap in quotes if contains comma
            return typeof cell === "string" &&
              (cell.includes(",") || cell.includes('"'))
              ? `"${cell.replace(/"/g, '""')}"`
              : cell;
          })
          .join(","),
      ),
    ];

    return csvRows.join("\n");
  };

  // Function to generate example CSV
  const handleDownloadExample = () => {
    const exampleData = [
      {
        id: 1,
        name: "Example Name",
        email: "example@email.com",
        status: "Status",
      },
      {
        id: 2,
        name: "Another Example",
        email: "another@email.com",
        status: "Status",
      },
    ];

    const csv = generateCSV(exampleData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "example.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setIsImportDialogOpen(true)}
      >
        <Upload className="h-4 w-4" />
        <span>Import CSV</span>
      </Button>

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Import CSV
            </DialogTitle>
          </DialogHeader>

          <div className="py-6">
            <p className="mb-6 text-center text-lg text-muted-foreground">
              You can import up to 100,000 records at a time.
            </p>

            {importStatus ? (
              <div
                className={cn(
                  "mb-4 rounded-md p-4 text-center",
                  importStatus.success
                    ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
                )}
              >
                {importStatus.message}
              </div>
            ) : (
              <>
                <input
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  onChange={handleImportCSV}
                  className="hidden"
                  id="csv-file-input"
                />
                <label htmlFor="csv-file-input">
                  <Button
                    className="flex w-full items-center justify-center gap-2 bg-primary hover:bg-primary/90"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-5 w-5" />
                    <span>Select CSV File</span>
                  </Button>
                </label>

                <div className="mt-8 text-center">
                  <Button
                    variant="ghost"
                    className="flex w-full items-center justify-center gap-2 text-primary"
                    onClick={handleDownloadExample}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Example CSV</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
