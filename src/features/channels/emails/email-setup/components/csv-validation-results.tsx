"use client";

import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  FileX,
} from "lucide-react";

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
import { Button } from "@/components/ui/button";
import type {
  CsvValidationResult,
  CsvEmailAccount,
} from "@/utils/csv-validator";
import { CSV_UPLOAD_LIMITS } from "@/constants/csv-limits";
import {
  CustomPagination,
  PaginationInfo,
} from "@/components/ui/custom-pagination";

interface CsvValidationResultsProps {
  validationResult: CsvValidationResult;
  onProceed: (data: CsvEmailAccount[]) => void;
  onRetry: () => void;
}

export function CsvValidationResults({
  validationResult,
  onProceed,
  onRetry,
}: CsvValidationResultsProps) {
  const [showPasswords, setShowPasswords] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    isValid,
    data,
    errors,
    totalRows,
    validRows,
    exceedsLimit,
    maxRecords,
  } = validationResult;

  const itemsPerPage = CSV_UPLOAD_LIMITS.RECORDS_PER_PAGE;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Validation Results</h2>
        <p className="text-muted-foreground">
          Review your CSV file validation results
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Valid Rows</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{validRows}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <span className="font-semibold">Errors</span>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {errors.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Total Rows</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{totalRows}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <FileX className="h-5 w-5 text-purple-600" />
              <span className="font-semibold">Limit</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {maxRecords}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Limit Exceeded Warning */}
      {exceedsLimit && (
        <Alert variant="destructive">
          <FileX className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Upload limit exceeded!</p>
              <p>
                Your file contains <strong>{totalRows} records</strong>, but the
                maximum allowed is <strong>{maxRecords} records</strong> per
                upload.
              </p>
              <p className="text-sm">
                Please split your file into smaller chunks or contact support to
                increase your upload limit.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Errors Section */}
      {errors.length > 0 && !exceedsLimit && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="h-5 w-5" />
              Validation Errors ({errors.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-60 space-y-2 overflow-y-auto">
              {errors.slice(0, 20).map((error, index) => (
                <Alert key={index} variant="destructive">
                  <AlertDescription>
                    <span className="font-semibold">Row {error.row}:</span>{" "}
                    {error.message} in field &quot;{error.field}&quot;
                    {error.value && (
                      <span className="mt-1 block text-sm opacity-75">
                        Value: &quot;{error.value}&quot;
                      </span>
                    )}
                  </AlertDescription>
                </Alert>
              ))}
              {errors.length > 20 && (
                <div className="py-2 text-center text-sm text-muted-foreground">
                  ... and {errors.length - 20} more errors
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Valid Data Preview */}
      {data.length > 0 && !exceedsLimit && (
        <Card>
          <CardHeader>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                Valid Email Accounts ({data.length})
              </CardTitle>
              <div className="flex items-center gap-2">
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
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Pagination Info */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <PaginationInfo
                    currentPage={currentPage}
                    totalItems={data.length}
                    itemsPerPage={itemsPerPage}
                  />
                  <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}

              {/* Data Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>IMAP Server</TableHead>
                      <TableHead>IMAP Port</TableHead>
                      <TableHead>SMTP Server</TableHead>
                      <TableHead>SMTP Port</TableHead>
                      <TableHead>Password</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentData.map((account, index) => {
                      const globalIndex = startIndex + index + 1;
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-sm text-muted-foreground">
                            {globalIndex}
                          </TableCell>
                          <TableCell className="font-medium">
                            {account.email}
                          </TableCell>
                          <TableCell>{account.imapServer}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {account.imapPort}
                            </Badge>
                          </TableCell>
                          <TableCell>{account.smtpServer}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {account.smtpPort}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {showPasswords ? (
                              <code className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                                {account.password}
                              </code>
                            ) : (
                              <span className="text-gray-400">••••••••</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Bottom CustomPagination */}
              {totalPages > 1 && (
                <div className="flex justify-center pt-4">
                  <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Button
          variant="outline"
          onClick={onRetry}
          className="flex items-center gap-2"
        >
          <XCircle className="h-4 w-4" />
          Upload Different File
        </Button>

        {isValid && data.length > 0 && !exceedsLimit && (
          <Button
            onClick={() => onProceed(data)}
            className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            <CheckCircle className="h-4 w-4" />
            Connect {data.length} Account{data.length !== 1 ? "s" : ""}
          </Button>
        )}
      </div>
    </div>
  );
}
