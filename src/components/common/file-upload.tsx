"use client";

import { Upload } from "lucide-react";

import { useState, useRef } from "react";
import type React from "react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes: string;
  maxSize: number; // in MB
}

export function FileUploader({
  onFileSelect,
  acceptedFileTypes,
  maxSize,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    setError(null);

    // Check file type
    const fileType = file.name.split(".").pop()?.toLowerCase();
    if (acceptedFileTypes && !acceptedFileTypes.includes(fileType || "")) {
      setError(
        `Only ${acceptedFileTypes.replace(/\./g, "")} files are allowed`,
      );
      return;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    setFileName(file.name);
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes}
        className="hidden"
      />

      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-10 transition-colors ${isDragging ? "border-blue-500 bg-blue-50" : "border-blue-300"} ${fileName ? "bg-blue-50" : ""} `}
      >
        <div className="mb-4 rounded-full bg-blue-100 p-4">
          <Upload className="h-6 w-6 text-blue-600" />
        </div>

        {fileName ? (
          <div className="text-center">
            <p className="font-medium text-blue-600">{fileName}</p>
            <p className="mt-1 text-sm text-gray-500">Click to change file</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="font-medium text-blue-600">
              <span className="underline">Click to upload</span> or drag and
              drop
            </p>
            <p className="mt-1 text-sm text-gray-500">
              PDF only (max. {maxSize}MB)
            </p>
          </div>
        )}

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
