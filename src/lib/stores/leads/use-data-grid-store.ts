import { create } from "zustand";
import type {
  LeadsColumn,
  LeadsRow,
  RowHeight,
  SearchState,
} from "@/types/leads";

interface DataGridStore {
  // Data
  columns: LeadsColumn[];
  setColumns: (
    columns: LeadsColumn[] | ((prev: LeadsColumn[]) => LeadsColumn[]),
  ) => void;
  data: LeadsRow[];
  setData: (data: LeadsRow[] | ((prev: LeadsRow[]) => LeadsRow[])) => void;

  // UI state
  rowHeight: RowHeight;
  setRowHeight: (height: RowHeight) => void;
  searchState: SearchState | null;
  setSearchState: (state: SearchState | null) => void;

  // Editing state
  editingCell: { rowId: string; columnId: string } | null;
  setEditingCell: (cell: { rowId: string; columnId: string } | null) => void;

  // Panels state
  columnDetailsPanel: { columnId: string } | null;
  setColumnDetailsPanel: (panel: { columnId: string } | null) => void;
  rowDetailsPanel: { rowId: string } | null;
  setRowDetailsPanel: (panel: { rowId: string } | null) => void;
}

export const useDataGridStore = create<DataGridStore>((set) => ({
  // Initial state
  columns: [],
  setColumns: (value) =>
    set((state) => ({
      columns: typeof value === "function" ? value(state.columns) : value,
    })),

  data: [],
  setData: (value) =>
    set((state) => ({
      data: typeof value === "function" ? value(state.data) : value,
    })),

  rowHeight: "medium",
  setRowHeight: (height) => set({ rowHeight: height }),

  searchState: null,
  setSearchState: (state) => set({ searchState: state }),

  editingCell: null,
  setEditingCell: (cell) => set({ editingCell: cell }),

  columnDetailsPanel: null,
  setColumnDetailsPanel: (panel) => set({ columnDetailsPanel: panel }),

  rowDetailsPanel: null,
  setRowDetailsPanel: (panel) => set({ rowDetailsPanel: panel }),
}));
