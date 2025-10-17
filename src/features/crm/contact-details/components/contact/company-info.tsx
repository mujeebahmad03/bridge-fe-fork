"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, MapPin } from "lucide-react";
import { EditableField } from "./editable-field";

interface Company {
  name: string;
  industry: string;
  size: string;
  location: string;
  description: string;
}

interface CompanyInfoProps {
  company: Company;
  onUpdateField: (field: string, value: string) => void;
}

export function CompanyInfo({ company, onUpdateField }: CompanyInfoProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Company
      </h4>

      <Card className="gradient-subtle border-border/50">
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <EditableField
                label="Company Name"
                value={company.name}
                onSave={(value) => onUpdateField("name", value)}
                className="mb-1"
              />
              <EditableField
                label="Industry"
                value={company.industry}
                onSave={(value) => onUpdateField("industry", value)}
                className="text-sm text-muted-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
            <div className="space-y-1">
              <EditableField
                label="Size"
                value={company.size}
                icon={<Users className="h-3 w-3 text-muted-foreground" />}
                onSave={(value) => onUpdateField("size", value)}
              />
            </div>
            <div className="space-y-1">
              <EditableField
                label="Location"
                value={company.location}
                icon={<MapPin className="h-3 w-3 text-muted-foreground" />}
                onSave={(value) => onUpdateField("location", value)}
              />
            </div>
          </div>

          {/* Description Field */}
          <div className="pt-2">
            <EditableField
              label="Description"
              value={company.description}
              onSave={(value) => onUpdateField("description", value)}
              multiline
              className="gap-0"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
