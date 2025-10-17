"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { TableFilters, PaginationConfig } from "@/crm/dashboard/types";

interface UseTableDataOptions<T> {
  queryKey: string;
  fetchFn: (
    params: TableFilters & { page?: number; pageSize?: number },
  ) => Promise<{
    data: T[];
    total?: number;
    page?: number;
    pageSize?: number;
    totalPages?: number;
  }>;
  enablePagination?: boolean;
  initialPageSize?: number;
}

export function useTableData<T>({
  queryKey,
  fetchFn,
  enablePagination = false,
  initialPageSize = 24,
}: UseTableDataOptions<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const queryParams = enablePagination ? { page, pageSize } : {};

  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey, queryParams],
    queryFn: () => fetchFn(queryParams),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const pagination: PaginationConfig | undefined =
    enablePagination && data
      ? {
          page: data.page || 1,
          pageSize: data.pageSize || initialPageSize,
          total: data.total || 0,
          totalPages: data.totalPages || 1,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }
      : undefined;

  return {
    data: data?.data || [],
    isLoading,
    error,
    pagination,
  };
}
