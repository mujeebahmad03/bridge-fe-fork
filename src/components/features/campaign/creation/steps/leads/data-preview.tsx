"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Lead } from "@/types/campaign";

interface DataPreviewProps {
  data: Lead[];
  onImport: () => void;
}

export function DataPreview({ data, onImport }: DataPreviewProps) {
  return (
    <div className="py-4">
      <h3 className="mb-2 text-lg font-medium">Preview Data</h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Review your data before importing
      </p>

      <div className="overflow-hidden rounded-md border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>Total records: {data.length}</p>
        <p>
          Showing {Math.min(5, data.length)} of {data.length} records
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={onImport}>Import Leads</Button>
      </div>
    </div>
  );
}
