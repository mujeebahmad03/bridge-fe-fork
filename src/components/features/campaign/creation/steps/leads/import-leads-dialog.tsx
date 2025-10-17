"use client";

import { ImportDialogWrapper } from "./import-dialog-wrapper";
import { ImportSourceSelector } from "./import-source-selector";
import { FileUploader } from "./file-uploader";
import { DataMapper } from "./data-mapper";
import { DataPreview } from "./data-preview";
import { ImportProgress } from "./import-progress";

import { useImportFlow } from "@/hooks/ui";
import type { Lead } from "@/types/campaign";

interface ImportLeadsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete: (leads: Lead[]) => void;
}

export function ImportLeadsDialog({
  open,
  onOpenChange,
  onImportComplete,
}: ImportLeadsDialogProps) {
  const {
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
  } = useImportFlow(onImportComplete, onOpenChange);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetState();
    }
    onOpenChange(newOpen);
  };

  // Render content based on current step
  const renderStepContent = () => {
    if (isUploading) {
      return <ImportProgress progress={uploadProgress} />;
    }

    switch (importStep) {
      case "source":
        return <ImportSourceSelector onSelectSource={handleSelectSource} />;
      case "upload":
        return <FileUploader onFileSelected={handleFileSelected} file={file} />;
      case "mapping":
        return (
          <DataMapper
            csvColumns={csvColumns}
            mappingFields={mappingFields}
            onUpdateMapping={handleUpdateMapping}
            onContinue={handleContinueMapping}
          />
        );
      case "preview":
        return (
          <DataPreview data={previewData} onImport={handleCompleteImport} />
        );
      default:
        return null;
    }
  };

  return (
    <ImportDialogWrapper
      open={open}
      onOpenChange={handleOpenChange}
      step={importStep}
    >
      {renderStepContent()}
    </ImportDialogWrapper>
  );
}
