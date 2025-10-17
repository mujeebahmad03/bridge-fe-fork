"use client";

import type React from "react";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type {
  LeadsColumn,
  LeadsRow,
  RowHeight,
  SearchState,
} from "@/types/leads";
import { LeadsTypeEnum } from "@/config/leads";

interface DataGridContextType {
  columns: LeadsColumn[];
  setColumns: Dispatch<SetStateAction<LeadsColumn[]>>;
  data: LeadsRow[];
  setData: Dispatch<SetStateAction<LeadsRow[]>>;
  rowHeight: RowHeight;
  setRowHeight: Dispatch<SetStateAction<RowHeight>>;
  searchState: SearchState | null;
  setSearchState: Dispatch<SetStateAction<SearchState | null>>;
  editingCell: { rowId: string; columnId: string } | null;
  setEditingCell: Dispatch<
    SetStateAction<{ rowId: string; columnId: string } | null>
  >;
  columnDetailsPanel: boolean;
  setColumnDetailsPanel: Dispatch<SetStateAction<boolean>>;
  rowDetailsPanel: boolean;
  setRowDetailsPanel: Dispatch<SetStateAction<boolean>>;
  selectedColumn: LeadsColumn | null;
  setSelectedColumn: Dispatch<React.SetStateAction<LeadsColumn | null>>;
  columnName: string;
  setColumnName: Dispatch<React.SetStateAction<string>>;
  columnType: LeadsTypeEnum;
  setColumnType: Dispatch<React.SetStateAction<LeadsTypeEnum>>;
}

const DataGridContext = createContext<DataGridContextType | undefined>(
  undefined,
);

export function DataGridProvider({
  children,
  columns,
  setColumns,
  data,
  setData,
  rowHeight,
  setRowHeight,
}: {
  children: React.ReactNode;
  columns: LeadsColumn[];
  setColumns: Dispatch<SetStateAction<LeadsColumn[]>>;
  data: LeadsRow[];
  setData: Dispatch<SetStateAction<LeadsRow[]>>;
  rowHeight: RowHeight;
  setRowHeight: Dispatch<SetStateAction<RowHeight>>;
}) {
  const [searchState, setSearchState] = useState<SearchState | null>(null);
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    columnId: string;
  } | null>(null);
  const [columnDetailsPanel, setColumnDetailsPanel] = useState(false);
  const [rowDetailsPanel, setRowDetailsPanel] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<LeadsColumn | null>(
    null,
  );
  const [columnName, setColumnName] = useState(selectedColumn?.name ?? "");
  const [columnType, setColumnType] = useState<LeadsTypeEnum>(
    selectedColumn?.type ?? LeadsTypeEnum.Text,
  );

  useEffect(() => {
    if (selectedColumn) {
      setColumnName(selectedColumn.name);
      setColumnType(selectedColumn.type ?? LeadsTypeEnum.Text);
    }
  }, [selectedColumn]);

  return (
    <DataGridContext.Provider
      value={{
        columns,
        setColumns,
        data,
        setData,
        rowHeight,
        setRowHeight,
        searchState,
        setSearchState,
        editingCell,
        setEditingCell,
        columnDetailsPanel,
        setColumnDetailsPanel,
        rowDetailsPanel,
        setRowDetailsPanel,
        selectedColumn,
        setSelectedColumn,
        columnName,
        setColumnName,
        columnType,
        setColumnType,
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
}

export function useDataGrid() {
  const context = useContext(DataGridContext);
  if (context === undefined) {
    throw new Error("useDataGrid must be used within a DataGridProvider");
  }
  return context;
}
