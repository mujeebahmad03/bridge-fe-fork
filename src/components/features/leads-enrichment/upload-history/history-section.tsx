"use client";

import { History } from "lucide-react";

import { useHistoryColumns } from "./column";
import { SectionCard } from "../section-card";
import {
  DataTableBody,
  DataTableHeader,
  DataTablePagination,
  DataTableSearch,
} from "@/components/common/data-table";
import { Table } from "@/components/ui";

import { useDataTable } from "@/hooks/ui";
import { mockUploadHistoryData } from "@/data/leads";

export const HistorySection = () => {
  const columns = useHistoryColumns();

  const { id, table, inputRef } = useDataTable({
    data: mockUploadHistoryData,
    columns,
    pageSize: 10,
  });

  return (
    <SectionCard
      title="History"
      icon={<History size={20} />}
      className="mt-8 overflow-hidden"
    >
      <div className="mx-auto mt-2 max-w-max space-y-4 overflow-hidden p-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <DataTableSearch
              id={id}
              placeholder="Filter file name"
              table={table}
              inputRef={inputRef}
              filterColumn="title"
            />
          </div>
        </div>

        <Table className="table-fixed rounded-xl">
          <DataTableHeader table={table} />
          <DataTableBody table={table} columns={columns} />
        </Table>

        <DataTablePagination id={id} table={table} />
      </div>
    </SectionCard>
  );
};
