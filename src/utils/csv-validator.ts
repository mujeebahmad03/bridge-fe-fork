import { z } from "zod";
import { CSV_UPLOAD_LIMITS } from "@/constants/csv-limits";

export const csvEmailAccountSchema = z.object({
  email: z.string().email("Invalid email format"),
  imapServer: z.string().min(1, "IMAP server is required"),
  imapPort: z.coerce
    .number()
    .min(1, "Invalid IMAP port")
    .max(65535, "Port must be less than 65536"),
  smtpServer: z.string().min(1, "SMTP server is required"),
  smtpPort: z.coerce
    .number()
    .min(1, "Invalid SMTP port")
    .max(65535, "Port must be less than 65536"),
  password: z.string().min(1, "Password is required"),
});

export type CsvEmailAccount = z.infer<typeof csvEmailAccountSchema>;

export interface CsvValidationResult {
  isValid: boolean;
  data: CsvEmailAccount[];
  errors: CsvValidationError[];
  totalRows: number;
  validRows: number;
  exceedsLimit: boolean;
  maxRecords: number;
}

export interface CsvValidationError {
  row: number;
  field: string;
  message: string;
  value: string;
}

export function parseCsvContent(csvContent: string): CsvValidationResult {
  const lines = csvContent.trim().split("\n");
  const headers = lines[0]?.split(",").map((h) => h.trim().toLowerCase());

  const requiredFields = [
    "email",
    "imapserver",
    "imapport",
    "smtpserver",
    "smtpport",
    "password",
  ];
  const missingFields = requiredFields.filter(
    (field) => !headers?.includes(field),
  );

  if (missingFields.length > 0) {
    return {
      isValid: false,
      data: [],
      errors: missingFields.map((field) => ({
        row: 0,
        field,
        message: `Missing required column: ${field}`,
        value: "",
      })),
      totalRows: 0,
      validRows: 0,
      exceedsLimit: false,
      maxRecords: CSV_UPLOAD_LIMITS.MAX_RECORDS,
    };
  }

  const dataRows = lines
    .slice(1)
    .filter(
      (line) => line.trim() && !line.split(",").every((cell) => !cell.trim()),
    );
  const exceedsLimit = dataRows.length > CSV_UPLOAD_LIMITS.MAX_RECORDS;

  if (exceedsLimit) {
    return {
      isValid: false,
      data: [],
      errors: [
        {
          row: 0,
          field: "file",
          message: `File contains ${dataRows.length} records. Maximum allowed is ${CSV_UPLOAD_LIMITS.MAX_RECORDS} records per upload.`,
          value: dataRows.length.toString(),
        },
      ],
      totalRows: dataRows.length,
      validRows: 0,
      exceedsLimit: true,
      maxRecords: CSV_UPLOAD_LIMITS.MAX_RECORDS,
    };
  }

  const data: CsvEmailAccount[] = [];
  const errors: CsvValidationError[] = [];

  for (let i = 0; i < dataRows.length; i++) {
    const values = dataRows[i]?.split(",").map((v) => v.trim());
    if (!values || values.length === 0) continue;

    const rowData: Record<string, string> = {};
    headers?.forEach((header, index) => {
      rowData[header] = values[index] || "";
    });

    try {
      const validatedData = csvEmailAccountSchema.parse({
        email: rowData.email,
        imapServer: rowData.imapserver,
        imapPort: rowData.imapport,
        smtpServer: rowData.smtpserver,
        smtpPort: rowData.smtpport,
        password: rowData.password,
      });
      data.push(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          errors.push({
            row: i + 2, // +2 because we start from line 1 (header) and array is 0-indexed
            field: err.path.join("."),
            message: err.message,
            value: String(rowData[err.path[0] as string] || ""),
          });
        });
      }
    }
  }

  return {
    isValid: errors.length === 0 && !exceedsLimit,
    data,
    errors,
    totalRows: dataRows.length,
    validRows: data.length,
    exceedsLimit,
    maxRecords: CSV_UPLOAD_LIMITS.MAX_RECORDS,
  };
}

export function generateSampleCsv(): string {
  const headers = [
    "email",
    "imapServer",
    "imapPort",
    "smtpServer",
    "smtpPort",
    "password",
  ];
  const sampleData = [
    [
      "john.doe@gmail.com",
      "imap.gmail.com",
      "993",
      "smtp.gmail.com",
      "587",
      "your-app-password",
    ],
    [
      "jane.smith@outlook.com",
      "outlook.office365.com",
      "993",
      "smtp.office365.com",
      "587",
      "your-password",
    ],
    [
      "admin@company.com",
      "mail.company.com",
      "993",
      "mail.company.com",
      "587",
      "secure-password",
    ],
  ];

  return [headers, ...sampleData].map((row) => row.join(",")).join("\n");
}

export function downloadSampleCsv() {
  const csvContent = generateSampleCsv();
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "email-accounts-sample.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
