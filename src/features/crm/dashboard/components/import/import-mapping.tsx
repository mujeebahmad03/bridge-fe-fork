"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type ImportType = "contacts" | "companies" | "leads";

interface ImportMappingProps {
  importType: ImportType;
  csvHeaders: string[];
  fieldMapping: Record<string, string>;
  onMappingChange: (mapping: Record<string, string>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ImportMapping({
  importType,
  csvHeaders,
  fieldMapping,
  onMappingChange,
  onNext,
  onBack,
}: ImportMappingProps) {
  const getRequiredFields = () => {
    switch (importType) {
      case "contacts":
        return [
          { key: "name", label: "Name", required: true },
          { key: "email", label: "Email", required: false },
          { key: "phone", label: "Phone", required: false },
          { key: "organization", label: "Organization", required: false },
          { key: "companyRole", label: "Company Role", required: false },
          { key: "assignedTo", label: "Assigned To", required: false },
          { key: "linkedin", label: "LinkedIn", required: false },
        ];
      case "companies":
        return [
          { key: "name", label: "Company Name", required: true },
          { key: "industry", label: "Industry", required: false },
          { key: "companyOwner", label: "Company Owner", required: false },
          {
            key: "organizationSize",
            label: "Organization Size",
            required: false,
          },
          { key: "email", label: "Email", required: false },
          { key: "phone", label: "Phone", required: false },
          { key: "linkedin", label: "LinkedIn", required: false },
          { key: "assignedTo", label: "Assigned To", required: false },
        ];
      case "leads":
        return [
          { key: "campaignName", label: "Campaign Name", required: true },
          { key: "name", label: "Contact Name", required: false },
          { key: "organization", label: "Organization", required: false },
          { key: "companyRole", label: "Company Role", required: false },
          { key: "email", label: "Email", required: false },
          { key: "phone", label: "Phone", required: false },
          { key: "linkedin", label: "LinkedIn", required: false },
          { key: "assignedTo", label: "Assigned To", required: false },
        ];
    }
  };

  const fields = getRequiredFields();
  const requiredFields = fields.filter((field) => field.required);
  const requiredFieldsMapped = requiredFields.every(
    (field) => fieldMapping[field.key],
  );

  const handleFieldMapping = (fieldKey: string, csvHeader: string) => {
    const newMapping = { ...fieldMapping };
    if (csvHeader === "none") {
      delete newMapping[fieldKey];
    } else {
      newMapping[fieldKey] = csvHeader;
    }
    onMappingChange(newMapping);
  };

  const getUsedHeaders = () => {
    return Object.values(fieldMapping);
  };

  const isHeaderUsed = (header: string) => {
    return getUsedHeaders().includes(header);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold">Map CSV Columns</h3>
        <p className="text-sm text-muted-foreground">
          Match your CSV columns to the corresponding fields in our system.
        </p>
      </div>

      {/* Required Fields Alert */}
      {!requiredFieldsMapped && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please map all required fields (marked with *) to continue.
          </AlertDescription>
        </Alert>
      )}

      {/* Field Mapping */}
      <div className="space-y-4">
        <div className="grid gap-4">
          {fields.map((field) => (
            <div
              key={field.key}
              className="grid grid-cols-1 items-center gap-4 rounded-lg border p-4 md:grid-cols-2"
            >
              <div>
                <Label className="text-sm font-medium">
                  {field.label}
                  {field.required && (
                    <span className="ml-1 text-destructive">*</span>
                  )}
                </Label>
                {field.required && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Required
                  </Badge>
                )}
              </div>
              <Select
                value={fieldMapping[field.key] || "none"}
                onValueChange={(value) => handleFieldMapping(field.key, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select CSV column" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Don&apos;t import</SelectItem>
                  {csvHeaders.map((header) => (
                    <SelectItem
                      key={header}
                      value={header}
                      disabled={
                        isHeaderUsed(header) &&
                        fieldMapping[field.key] !== header
                      }
                    >
                      {header}
                      {isHeaderUsed(header) &&
                        fieldMapping[field.key] !== header && (
                          <span className="ml-2 text-muted-foreground">
                            (already used)
                          </span>
                        )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      {/* CSV Headers Preview */}
      <div className="rounded-lg bg-muted/20 p-4">
        <h4 className="mb-2 text-sm font-medium">Available CSV Columns:</h4>
        <div className="flex flex-wrap gap-2">
          {csvHeaders.map((header) => (
            <Badge
              key={header}
              variant={isHeaderUsed(header) ? "default" : "outline"}
              className="text-xs"
            >
              {header}
            </Badge>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!requiredFieldsMapped}
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          Next: Preview
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
