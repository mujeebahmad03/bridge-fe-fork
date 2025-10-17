"use client";

import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, createElement } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ImportMapping,
  ImportPreview,
  ImportResults,
  ImportUpload,
} from "@/crm/dashboard/components";

type ImportStep = "upload" | "mapping" | "preview" | "results";
type ImportType = "contacts" | "companies" | "leads";
type CsvRow = Record<string, string>;

export function ImportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<ImportStep>("upload");
  const [importType, setImportType] = useState<ImportType>("contacts");
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [fieldMapping, setFieldMapping] = useState<CsvRow>({});
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    const type = searchParams.get("type") as ImportType;
    if (type && ["contacts", "companies", "leads"].includes(type)) {
      setImportType(type);
    }
  }, [searchParams]);

  const handleBack = () => {
    router.back();
  };

  const getTitle = () => {
    switch (importType) {
      case "contacts":
        return "Import Contacts";
      case "companies":
        return "Import Companies";
      case "leads":
        return "Import Leads";
    }
  };

  const getDescription = () => {
    switch (importType) {
      case "contacts":
        return "Upload a CSV file to import multiple contacts at once";
      case "companies":
        return "Upload a CSV file to import multiple companies at once";
      case "leads":
        return "Upload a CSV file to import multiple leads at once";
    }
  };

  const steps = [
    { id: "upload", title: "Upload File", icon: Upload },
    { id: "mapping", title: "Map Fields", icon: FileText },
    { id: "preview", title: "Preview", icon: CheckCircle },
    { id: "results", title: "Results", icon: AlertCircle },
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-6">
      <div className="mx-auto max-w-4xl space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="hover:bg-muted/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-semibold text-foreground md:text-2xl">
              {getTitle()}
            </h1>
            <p className="text-xs text-muted-foreground md:text-sm">
              {getDescription()}
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 md:p-6">
            {/* Desktop Progress Steps */}
            <div className="hidden items-center justify-between md:flex">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;

                return (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                        isCompleted
                          ? "border-primary bg-primary text-primary-foreground"
                          : isActive
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-muted-foreground/30 text-muted-foreground"
                      }`}
                    >
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div
                        className={`mx-4 h-px w-12 ${
                          isCompleted ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Progress Steps */}
            <div className="md:hidden">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Step {currentStepIndex + 1} of {steps.length}
                </span>
                <div className="flex gap-1">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-8 rounded-full transition-colors ${
                        index <= currentStepIndex
                          ? "bg-primary"
                          : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${
                    currentStepIndex > 0
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-primary bg-primary/10 text-primary"
                  }`}
                >
                  {createElement(steps[currentStepIndex].icon, {
                    className: "h-4 w-4",
                  })}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    {steps[currentStepIndex].title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {currentStepIndex === 0 && "Upload your CSV file"}
                    {currentStepIndex === 1 && "Map CSV columns to fields"}
                    {currentStepIndex === 2 && "Review your data"}
                    {currentStepIndex === 3 && "Import complete"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 md:p-6">
            {currentStep === "upload" && (
              <ImportUpload
                importType={importType}
                onFileProcessed={(data, headers, filename) => {
                  setCsvData(data as unknown as CsvRow[]);
                  setCsvHeaders(headers);
                  setFileName(filename);
                  setCurrentStep("mapping");
                }}
              />
            )}

            {currentStep === "mapping" && (
              <ImportMapping
                importType={importType}
                csvHeaders={csvHeaders}
                fieldMapping={fieldMapping}
                onMappingChange={setFieldMapping}
                onNext={() => setCurrentStep("preview")}
                onBack={() => setCurrentStep("upload")}
              />
            )}

            {currentStep === "preview" && (
              <ImportPreview
                importType={importType}
                csvData={csvData}
                fieldMapping={fieldMapping}
                fileName={fileName}
                onImport={() => setCurrentStep("results")}
                onBack={() => setCurrentStep("mapping")}
              />
            )}

            {currentStep === "results" && (
              <ImportResults
                importType={importType}
                onFinish={() => router.push("/")}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
