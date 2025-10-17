"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchContacts,
  fetchCompanies,
  fetchLeads,
} from "@/crm/dashboard/lib/api";
import type { Contact, Company, Lead } from "@/crm/dashboard/types";

type EntityType = "contacts" | "companies" | "leads";
type EntityData = Contact | Company | Lead;

interface BaseResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

type ContactsResponse = BaseResponse<Contact>;
type CompaniesResponse = BaseResponse<Company>;
type LeadsResponse = BaseResponse<Lead>;

type EntityResponseMap = {
  contacts: ContactsResponse;
  companies: CompaniesResponse;
  leads: LeadsResponse;
};

interface UseEntityTableProps<T extends EntityType> {
  entityType: T;
  searchQuery: string;
  filterValue: string;
}

interface UseEntityTableReturn<T extends EntityData> {
  data: T[] | undefined;
  isLoading: boolean;
  error: unknown;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  };
}

export function useEntityTable<T extends EntityType>({
  entityType,
  searchQuery,
  filterValue,
}: UseEntityTableProps<T>): UseEntityTableReturn<
  EntityResponseMap[T]["data"][number]
> {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  const queryKey = [
    entityType,
    { page, pageSize, search: searchQuery, filter: filterValue },
  ];

  const queryFn = (): Promise<EntityResponseMap[T]> => {
    const params = { page, pageSize, search: searchQuery, filter: filterValue };

    switch (entityType) {
      case "contacts":
        return fetchContacts(params) as Promise<EntityResponseMap[T]>;
      case "companies":
        return fetchCompanies(params) as Promise<EntityResponseMap[T]>;
      case "leads":
        return fetchLeads(params) as Promise<EntityResponseMap[T]>;
      default:
        throw new Error(`Unknown entity type: ${entityType}`);
    }
  };

  const {
    data: response,
    isLoading,
    error,
  } = useQuery<EntityResponseMap[T]>({
    queryKey,
    queryFn,
  });

  const handlePageChange = (newPage: number) => setPage(newPage);
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const pagination =
    response && "page" in response
      ? {
          page: response.page,
          pageSize: response.pageSize,
          total: response.total,
          totalPages: response.totalPages,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }
      : undefined;

  return {
    data: response?.data as EntityResponseMap[T]["data"],
    isLoading,
    error,
    pagination,
  };
}
