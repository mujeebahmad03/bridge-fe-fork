export interface BaseTableItem {
  id: string;
}

export interface TableColumn<T extends BaseTableItem> {
  id: keyof T | string;
  header: string;
  accessor?: keyof T;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  draggable?: boolean;
  hideable?: boolean;
  width?: number;
  render?: (item: T) => React.ReactNode;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface TableConfig {
  columnsDraggable?: boolean;
  columnsPinnable?: boolean;
  columnsResizable?: boolean;
  columnsMovable?: boolean;
  columnsVisibility?: boolean;
  dense?: boolean;
}

export interface TableAction<T extends BaseTableItem> {
  label: string;
  onClick: (item: T) => void;
  variant?: "default" | "destructive";
  separator?: boolean;
}
