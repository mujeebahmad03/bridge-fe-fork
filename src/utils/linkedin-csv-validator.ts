import { z } from "zod";

export const LINKEDIN_CSV_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_RECORDS: 500,
  REQUIRED_HEADERS: ["email", "password", "country"],
  OPTIONAL_HEADERS: [
    "synchronizeChats",
    "synchronizeMessages",
    "useOwnProxy",
    "proxyUrl",
  ],
};

export const linkedInCsvRowSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
  country: z.string().min(1, "Country is required"),
  synchronizeChats: z
    .string()
    .optional()
    .transform((val) => val === "true" || val === "1" || val === "yes"),
  synchronizeMessages: z
    .string()
    .optional()
    .transform((val) => val === "true" || val === "1" || val === "yes"),
  useOwnProxy: z
    .string()
    .optional()
    .transform((val) => val === "true" || val === "1" || val === "yes"),
  proxyUrl: z.string().optional(),
});

export type LinkedInCsvRow = z.infer<typeof linkedInCsvRowSchema>;

export interface LinkedInCsvValidationResult {
  isValid: boolean;
  data: LinkedInCsvRow[];
  errors: {
    row: number;
    field: string;
    message: string;
    value: string;
  }[];
  summary: {
    totalRows: number;
    validRows: number;
    invalidRows: number;
    duplicateEmails: number;
  };
}

export function validateLinkedInCsv(
  csvContent: string,
): LinkedInCsvValidationResult {
  const lines = csvContent.trim().split("\n");
  const headers = lines[0]?.split(",").map((h) => h.trim().toLowerCase());

  if (!headers || headers.length === 0) {
    return {
      isValid: false,
      data: [],
      errors: [
        { row: 1, field: "headers", message: "No headers found", value: "" },
      ],
      summary: {
        totalRows: 0,
        validRows: 0,
        invalidRows: 0,
        duplicateEmails: 0,
      },
    };
  }

  // Check required headers
  const missingHeaders = LINKEDIN_CSV_LIMITS.REQUIRED_HEADERS.filter(
    (required) => !headers.includes(required.toLowerCase()),
  );

  if (missingHeaders.length > 0) {
    return {
      isValid: false,
      data: [],
      errors: [
        {
          row: 1,
          field: "headers",
          message: `Missing required headers: ${missingHeaders.join(", ")}`,
          value: headers.join(", "),
        },
      ],
      summary: {
        totalRows: 0,
        validRows: 0,
        invalidRows: 0,
        duplicateEmails: 0,
      },
    };
  }

  const dataRows = lines.slice(1);
  const validData: LinkedInCsvRow[] = [];
  const errors: LinkedInCsvValidationResult["errors"] = [];
  const emailSet = new Set<string>();
  let duplicateEmails = 0;

  // Check record limit
  if (dataRows.length > LINKEDIN_CSV_LIMITS.MAX_RECORDS) {
    errors.push({
      row: 0,
      field: "file",
      message: `Too many records. Maximum allowed: ${LINKEDIN_CSV_LIMITS.MAX_RECORDS}`,
      value: dataRows.length.toString(),
    });
  }

  dataRows.forEach((line, index) => {
    const rowNumber = index + 2; // +2 because we start from row 2 (after headers)
    const values = line.split(",").map((v) => v.trim());

    if (values.length !== headers.length) {
      errors.push({
        row: rowNumber,
        field: "structure",
        message: `Row has ${values.length} columns, expected ${headers.length}`,
        value: line,
      });
      return;
    }

    // Create row object
    const rowData: Record<string, string> = {};
    headers.forEach((header, i) => {
      rowData[header] = values[i] || "";
    });

    // Check for duplicate emails
    const email = rowData.email?.toLowerCase();
    if (email && emailSet.has(email)) {
      duplicateEmails++;
      errors.push({
        row: rowNumber,
        field: "email",
        message: "Duplicate email address",
        value: email,
      });
    } else if (email) {
      emailSet.add(email);
    }

    // Validate row data
    try {
      const validatedRow = linkedInCsvRowSchema.parse(rowData);
      validData.push(validatedRow);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          errors.push({
            row: rowNumber,
            field: err.path.join("."),
            message: err.message,
            value: rowData[err.path[0] as string] || "",
          });
        });
      }
    }
  });

  return {
    isValid: errors.length === 0,
    data: validData,
    errors,
    summary: {
      totalRows: dataRows.length,
      validRows: validData.length,
      invalidRows: dataRows.length - validData.length,
      duplicateEmails,
    },
  };
}

export function generateLinkedInSampleCsv(): string {
  const headers = [
    "email",
    "password",
    "country",
    "synchronizeChats",
    "synchronizeMessages",
    "useOwnProxy",
    "proxyUrl",
  ];
  const sampleRows = [
    [
      "john.doe@example.com",
      "password123",
      "United States",
      "true",
      "true",
      "false",
      "",
    ],
    [
      "jane.smith@example.com",
      "securepass456",
      "Canada",
      "false",
      "true",
      "true",
      "http://proxy.example.com:8080",
    ],
    [
      "bob.wilson@example.com",
      "mypassword789",
      "United Kingdom",
      "true",
      "false",
      "false",
      "",
    ],
  ];

  return [headers.join(","), ...sampleRows.map((row) => row.join(","))].join(
    "\n",
  );
}
