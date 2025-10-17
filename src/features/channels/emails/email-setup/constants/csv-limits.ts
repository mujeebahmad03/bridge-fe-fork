// CSV Upload Configuration
export const CSV_UPLOAD_LIMITS = {
  // Maximum number of email accounts that can be uploaded at once
  MAX_RECORDS: 1000,

  // Maximum file size in bytes (5MB)
  MAX_FILE_SIZE: 5 * 1024 * 1024,

  // Pagination settings for validation results
  RECORDS_PER_PAGE: 10,

  // Preview settings
  PREVIEW_ROWS: 5,
} as const;

export type CsvUploadLimits = typeof CSV_UPLOAD_LIMITS;
