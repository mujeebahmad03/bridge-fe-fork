"use client";

import { useState } from "react";
import type {
  ImportSource,
  ImportStep,
  CSVColumn,
  MappingField,
  Lead,
} from "@/types/campaign";

export function useImportFlow(
  onImportComplete: (leads: Lead[]) => void,
  onOpenChange: (open: boolean) => void,
) {
  const [importSource, setImportSource] = useState<ImportSource | null>(null);
  const [importStep, setImportStep] = useState<ImportStep>("source");
  const [file, setFile] = useState<File | null>(null);
  const [csvColumns, setCsvColumns] = useState<CSVColumn[]>([]);
  const [mappingFields, setMappingFields] = useState<MappingField[]>([
    { fieldName: "First Name", csvColumn: null },
    { fieldName: "Last Name", csvColumn: null },
    { fieldName: "Email", csvColumn: null },
    { fieldName: "Company", csvColumn: null },
    { fieldName: "Phone", csvColumn: null },
    { fieldName: "Job Title", csvColumn: null },
    { fieldName: "LinkedIn URL", csvColumn: null },
  ]);
  const [previewData, setPreviewData] = useState<Lead[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const resetState = () => {
    setImportStep("source");
    setImportSource(null);
    setFile(null);
    setCsvColumns([]);
    setPreviewData([]);
    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleSelectSource = (source: ImportSource) => {
    setImportSource(source);
    if (source === "csv") {
      setImportStep("upload");
    } else {
      // For demo purposes, we'll just simulate importing leads
      simulateImport();
    }
  };

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    // Simulate parsing CSV headers
    setTimeout(() => {
      const mockColumns: CSVColumn[] = [
        { header: "first_name", index: 0 },
        { header: "last_name", index: 1 },
        { header: "email", index: 2 },
        { header: "company", index: 3 },
        { header: "phone", index: 4 },
        { header: "job_title", index: 5 },
        { header: "linkedin", index: 6 },
      ];
      setCsvColumns(mockColumns);
      setImportStep("mapping");
    }, 1000);
  };

  const handleUpdateMapping = (fieldName: string, columnHeader: string) => {
    setMappingFields((prev) =>
      prev.map((field) =>
        field.fieldName === fieldName
          ? {
              ...field,
              csvColumn: columnHeader === "do_not_import" ? null : columnHeader,
            }
          : field,
      ),
    );
  };

  const handleContinueMapping = () => {
    setImportStep("preview");
    // Generate preview data
    const mockPreviewData = Array(5)
      .fill(null)
      .map((_, i) => ({
        id: i + 1,
        firstName: `John ${i + 1}`,
        lastName: `Doe ${i + 1}`,
        email: `john.doe${i + 1}@example.com`,
        company: `Company ${i + 1}`,
        phone: `+1 555-${100 + i}`,
        jobTitle: `Job Title ${i + 1}`,
        linkedIn: `linkedin.com/in/johndoe${i + 1}`,
      }));
    setPreviewData(mockPreviewData);
  };

  const simulateImport = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          // Generate mock data
          const mockData = Array(10)
            .fill(null)
            .map((_, i) => ({
              id: i + 1,
              name: `Contact ${i + 1}`,
              email: `contact${i + 1}@example.com`,
              company: `Company ${i + 1}`,
              phone: `+1 555-${100 + i}`,
            }));

          onImportComplete(mockData);
          onOpenChange(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleCompleteImport = () => {
    simulateImport();
  };

  return {
    importSource,
    importStep,
    file,
    csvColumns,
    mappingFields,
    previewData,
    isUploading,
    uploadProgress,
    handleSelectSource,
    handleFileSelected,
    handleUpdateMapping,
    handleContinueMapping,
    handleCompleteImport,
    resetState,
    simulateImport,
  };
}
