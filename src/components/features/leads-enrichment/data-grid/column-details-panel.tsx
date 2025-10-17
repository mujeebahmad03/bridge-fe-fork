"use client";

import {
  Button,
  Input,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useDataGrid } from "./data-grid-context";

import { LeadsTypeEnum, leadsTypeOptions } from "@/config/leads";
import { CustomPanel, CustomPanelContent } from "./custom-panel";
import {
  CompanyData,
  EmailToLinkedInProfile,
  FindLeadsUsingDomain,
  FindWorkEmail,
  FullNameToLinkedInProfile,
  LinkedInToWorkEmail,
  VerifyEmail,
} from "./forms";
import { Play } from "lucide-react";

export function ColumnDetailsPanel() {
  const {
    columns,
    columnDetailsPanel,
    columnName,
    columnType,
    selectedColumn,
    setColumns,
    setColumnDetailsPanel,
    setColumnName,
    setColumnType,
  } = useDataGrid();

  const handleSave = () => {
    if (!selectedColumn) return;

    setColumns(
      columns.map((col) =>
        col.id === selectedColumn.id
          ? {
              ...col,
              name: columnName,
              type: columnType,
            }
          : col,
      ),
    );
    setColumnDetailsPanel(false);
  };

  const renderFormFields = () => {
    switch (columnType) {
      case LeadsTypeEnum.Text:
        return null; // No additional fields for text type

      case LeadsTypeEnum.FindWorkEmail:
        return <FindWorkEmail />;

      case LeadsTypeEnum.LinkedInScraper:
        return <LinkedInToWorkEmail />;

      case LeadsTypeEnum.FullNameToLinkedInProfile:
      case LeadsTypeEnum.FindWorkEmailAndLinkedInUrl:
      case LeadsTypeEnum.FindPhoneNumber:
        return <FullNameToLinkedInProfile />;

      case LeadsTypeEnum.EmailToLinkedInProfile:
        return <EmailToLinkedInProfile />;

      case LeadsTypeEnum.FindLeadsUsingDomain:
        return <FindLeadsUsingDomain />;

      case LeadsTypeEnum.CompanyData:
        return <CompanyData />;

      case LeadsTypeEnum.VerifyEmail:
        return <VerifyEmail />;

      default:
        return (
          <div className="py-2 text-sm text-muted-foreground">
            No additional configuration needed for this type.
          </div>
        );
    }
  };

  const selectedType = leadsTypeOptions.find((t) => t.id === columnType);

  return (
    <CustomPanel open={columnDetailsPanel} onOpenChange={setColumnDetailsPanel}>
      <CustomPanelContent
        className="p-4"
        footer={
          <div className="flex items-center justify-end gap-3 px-6 py-2">
            <Button
              variant="outline"
              onClick={() => setColumnDetailsPanel(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        }
      >
        <h2 className="mb-4 text-2xl font-bold">Column Details</h2>

        <div className="mt-6 space-y-6 px-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Name
            </label>
            <Input
              id="name"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="type"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Type
            </label>
            <Select
              value={columnType}
              onValueChange={(value) => {
                const selectedType = leadsTypeOptions.find(
                  (t) => t.id === value,
                );
                if (selectedType) {
                  setColumnType(selectedType.id);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select column type">
                  {selectedType && (
                    <div className="flex items-center gap-2">
                      {selectedType.icon}
                      {selectedType.name}
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {leadsTypeOptions.map((type) => (
                  <SelectItem
                    key={type.id}
                    value={type.id}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center gap-2">
                      {type.icon}
                      {type.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedType?.description && (
              <p className="text-sm text-muted-foreground">
                {selectedType.description}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <ScrollArea className="h-[calc(100vh-450px)]">
              {columnType === LeadsTypeEnum.Text ? (
                <>
                  <h4 className="text-sm font-medium leading-none">
                    Turn this into...
                  </h4>
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    {leadsTypeOptions.map((type) => (
                      <Button
                        key={type.id}
                        variant={columnType === type.id ? "secondary" : "ghost"}
                        className="h-auto justify-start gap-2 py-2"
                        onClick={() => setColumnType(type.id)}
                      >
                        {type.icon}
                        <span>{type.name}</span>
                      </Button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="px-1">
                  <h4 className="mb-4 text-sm font-medium">Configuration</h4>
                  <div className="space-y-4">{renderFormFields()}</div>
                  <div className="mt-4 flex items-center justify-between gap-4 rounded-md bg-accent px-4 py-2">
                    <div className="flex flex-col text-sm">
                      <strong>Preview</strong>
                      <span>Base on the first row of this worksheet</span>
                    </div>
                    <Button>
                      <Play className="size-4" />
                    </Button>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </CustomPanelContent>
    </CustomPanel>
  );
}
