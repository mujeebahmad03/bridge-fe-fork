"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { CSVColumn, MappingField } from "@/types/campaign";

interface DataMapperProps {
  csvColumns: CSVColumn[];
  mappingFields: MappingField[];
  onUpdateMapping: (fieldName: string, columnHeader: string) => void;
  onContinue: () => void;
}

export function DataMapper({
  csvColumns,
  mappingFields,
  onUpdateMapping,
  onContinue,
}: DataMapperProps) {
  return (
    <div className="py-4">
      <h3 className="mb-4 text-lg font-medium">Map Data</h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Map your CSV columns to the appropriate fields in Bridge
      </p>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="text-sm font-medium">Bridge field</div>
        <div className="text-sm font-medium">CSV header column</div>
        <div className="text-sm font-medium">Preview</div>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {mappingFields.map((field) => (
            <div
              key={field.fieldName}
              className="grid grid-cols-1 items-center gap-4 md:grid-cols-3"
            >
              <div>{field.fieldName}</div>
              <Select
                value={field.csvColumn || "do_not_import"}
                onValueChange={(value) =>
                  onUpdateMapping(field.fieldName, value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="do_not_import">Do not import</SelectItem>
                  {csvColumns.map((column) => (
                    <SelectItem key={column.index} value={column.header}>
                      {column.header}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="truncate text-sm text-muted-foreground">
                {field.csvColumn
                  ? `Sample data for ${field.csvColumn}`
                  : "No preview available"}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-6 flex justify-end">
        <Button onClick={onContinue}>Continue</Button>
      </div>
    </div>
  );
}
