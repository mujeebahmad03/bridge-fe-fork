import { useQuery } from "@tanstack/react-query";
import {
  fetchDataGridData,
  getStatusCounts,
  DataGridApiParams,
} from "@/services/data-grid-api";

export const useDataGridData = (params: DataGridApiParams) => {
  return useQuery({
    queryKey: ["dataGrid", params],
    queryFn: () => fetchDataGridData(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useStatusCounts = () => {
  return useQuery({
    queryKey: ["statusCounts"],
    queryFn: getStatusCounts,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};
