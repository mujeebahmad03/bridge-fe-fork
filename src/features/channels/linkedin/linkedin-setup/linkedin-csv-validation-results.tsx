"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LinkedInCsvValidationResult } from "@/utils/linkedin-csv-validator";
import { generateLinkedInSampleCsv } from "@/utils/linkedin-csv-validator";
import {
  CustomPagination,
  PaginationInfo,
} from "@/components/ui/custom-pagination";

interface LinkedInCsvValidationResultsProps {
  result: LinkedInCsvValidationResult;
  onProceed: () => void;
  onRetry: () => void;
}

export function LinkedInCsvValidationResults({
  result,
  onProceed,
  onRetry,
}: LinkedInCsvValidationResultsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPasswords, setShowPasswords] = useState(false);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(result.data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = result.data.slice(startIndex, endIndex);

  const downloadSampleCsv = () => {
    const csvContent = generateLinkedInSampleCsv();
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "linkedin-accounts-sample.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold">
          LinkedIn CSV Validation Results
        </h2>
        <p className="text-muted-foreground">
          Review the validation results for your LinkedIn accounts CSV file
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Rows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{result.summary.totalRows}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valid Rows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-green-600">
                {result.summary.validRows}
              </div>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Invalid Rows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-red-600">
                {result.summary.invalidRows}
              </div>
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Duplicates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-yellow-600">
                {result.summary.duplicateEmails}
              </div>
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Alert */}
      <Alert
        className={cn(
          result.isValid
            ? "border-green-200 bg-green-50"
            : "border-red-200 bg-red-50",
        )}
      >
        <div className="flex items-center gap-2">
          {result.isValid ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600" />
          )}
          <AlertDescription
            className={result.isValid ? "text-green-800" : "text-red-800"}
          >
            {result.isValid
              ? "Your CSV file has been validated successfully. All LinkedIn accounts are ready to be imported."
              : `Found ${result.errors.length} validation errors. Please fix these issues before proceeding.`}
          </AlertDescription>
        </div>
      </Alert>

      {/* Tabs for Data and Errors */}
      <Tabs defaultValue="data" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="data">
            Data Preview ({result.data.length} valid)
          </TabsTrigger>
          <TabsTrigger value="errors">
            Errors ({result.errors.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="space-y-4">
          {result.data.length > 0 ? (
            <>
              {/* Password Visibility Toggle */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="flex items-center gap-2"
                >
                  {showPasswords ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  {showPasswords ? "Hide" : "Show"} Passwords
                </Button>

                {totalPages > 1 && (
                  <PaginationInfo
                    currentPage={currentPage}
                    totalItems={result.data.length}
                    itemsPerPage={itemsPerPage}
                  />
                )}
              </div>

              {/* Data Table */}
              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Password</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Sync Chats</TableHead>
                      <TableHead>Sync Messages</TableHead>
                      <TableHead>Use Proxy</TableHead>
                      <TableHead>Proxy URL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentData.map((row, index) => (
                      <TableRow key={startIndex + index}>
                        <TableCell className="font-medium">
                          {row.email}
                        </TableCell>
                        <TableCell>
                          {showPasswords
                            ? row.password
                            : "•".repeat(row.password.length)}
                        </TableCell>
                        <TableCell>{row.country}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              row.synchronizeChats ? "default" : "secondary"
                            }
                          >
                            {row.synchronizeChats ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              row.synchronizeMessages ? "default" : "secondary"
                            }
                          >
                            {row.synchronizeMessages ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={row.useOwnProxy ? "default" : "secondary"}
                          >
                            {row.useOwnProxy ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {row.proxyUrl || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* CustomPagination */}
              {totalPages > 1 && (
                <div className="flex justify-center">
                  <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No valid data found. Please check the errors tab for details.
            </div>
          )}
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          {result.errors.length > 0 ? (
            <div className="space-y-2">
              {result.errors.map((error, index) => (
                <Alert key={index} className="border-red-200 bg-red-50">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <span className="font-medium">
                      Row {error.row}, Field &quot;{error.field}&quot;:
                    </span>{" "}
                    {error.message}
                    {error.value && (
                      <span className="mt-1 block text-sm opacity-75">
                        Value: &quot;{error.value}&quot;
                      </span>
                    )}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No errors found. Your CSV file is valid!
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row">
        <div className="flex gap-3">
          <Button variant="outline" onClick={onRetry}>
            Upload Different File
          </Button>
          <Button variant="outline" onClick={downloadSampleCsv}>
            <Download className="mr-2 h-4 w-4" />
            Download Sample CSV
          </Button>
        </div>

        <Button
          onClick={onProceed}
          disabled={!result.isValid}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          Import {result.summary.validRows} LinkedIn Accounts
        </Button>
      </div>
    </div>
  );
}
