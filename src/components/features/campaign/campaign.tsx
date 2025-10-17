"use client";

import { useState, useEffect } from "react";
import { SortingState } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/ui";
import { api } from "@/data/campaign-dashboard";
import { CampaignFilters } from "./list/filters";
import { CampaignTable } from "./list/table";
import { CampaignToolbar, MobileToolbarDrawer } from "./list/toolbar";
import { UpdateTagsDialog } from "./list/update-tags-dialog";
import { FilterParams } from "@/types/campaign";

export default function Campaigns() {
  // Check if on mobile
  const isMobile = useIsMobile();

  // State for filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>(["all"]);
  const [sendersFilter, setSendersFilter] = useState<string[]>(["all"]);
  const [tagsFilter, setTagsFilter] = useState<string[]>(["all"]);
  const [creatorsFilter, setCreatorsFilter] = useState<string[]>(["all"]);

  // State for sorting
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);

  // State for row selection
  const [rowSelection, setRowSelection] = useState({});
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<string[]>([]);

  // State for update tags dialog
  const [updateTagsOpen, setUpdateTagsOpen] = useState(false);

  // State for mobile toolbar open state
  const [toolbarOpen, setToolbarOpen] = useState(false);

  // Create filter params for API
  const filterParams: FilterParams = {
    search: search || undefined,
    status: statusFilter.includes("all") ? undefined : statusFilter,
    senders: sendersFilter.includes("all") ? undefined : sendersFilter,
    tags: tagsFilter.includes("all") ? undefined : tagsFilter,
    creators: creatorsFilter.includes("all") ? undefined : creatorsFilter,
    sortBy: sorting[0]?.id,
    sortOrder: sorting[0]?.desc ? "desc" : "asc",
  };

  // Fetch campaigns with filters
  const {
    data: campaignsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["campaigns", filterParams],
    queryFn: () => api.getCampaigns(filterParams),
  });

  // Fetch users (for creators and senders)
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.getUsers(),
  });

  // Fetch tags
  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: () => api.getTags(),
  });

  // Update selected campaign IDs when row selection changes
  useEffect(() => {
    if (campaignsData) {
      const selectedIds = Object.entries(rowSelection)
        .filter(([, selected]) => selected)
        .map(([index]) => campaignsData.data[parseInt(index)].id);

      setSelectedCampaignIds(selectedIds);
    }
  }, [rowSelection, campaignsData]);

  // Bulk action handlers
  const handleUpdateTags = () => {
    setUpdateTagsOpen(true);
  };

  const handlePauseCampaigns = async () => {
    try {
      await api.pauseCampaigns(selectedCampaignIds);
      toast.success(`${selectedCampaignIds.length} campaign(s) paused`);
      refetch();
      setRowSelection({});
    } catch (error) {
      console.error(error);
      toast.error("Failed to pause campaigns");
    }
  };

  const handleResumeCampaigns = async () => {
    try {
      await api.resumeCampaigns(selectedCampaignIds);
      toast.success(`${selectedCampaignIds.length} campaign(s) resumed`);
      refetch();
      setRowSelection({});
    } catch (error) {
      console.error(error);
      toast.error("Failed to resume campaigns");
    }
  };

  const handleArchiveCampaigns = async () => {
    try {
      await api.archiveCampaigns(selectedCampaignIds);
      toast.success(`${selectedCampaignIds.length} campaign(s) archived`);
      refetch();
      setRowSelection({});
    } catch (error) {
      console.error(error);
      toast.error("Failed to archive campaigns");
    }
  };

  const handleDeleteCampaigns = async () => {
    try {
      await api.deleteCampaigns(selectedCampaignIds);
      toast.success(`${selectedCampaignIds.length} campaign(s) deleted`);
      refetch();
      setRowSelection({});
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete campaigns");
    }
  };

  return (
    <div className="container mx-auto flex animate-fade-in flex-col py-6">
      <main className="flex flex-1 flex-col space-y-6 p-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Campaigns
        </h1>

        <CampaignFilters
          search={search}
          statusFilter={statusFilter}
          sendersFilter={sendersFilter}
          tagsFilter={tagsFilter}
          creatorsFilter={creatorsFilter}
          users={users}
          tags={tags}
          setSearch={setSearch}
          setStatusFilter={setStatusFilter}
          setSendersFilter={setSendersFilter}
          setTagsFilter={setTagsFilter}
          setCreatorsFilter={setCreatorsFilter}
        />

        <CampaignTable
          campaigns={campaignsData?.data || []}
          sorting={sorting}
          rowSelection={rowSelection}
          isLoading={isLoading}
          setSorting={setSorting}
          setRowSelection={setRowSelection}
        />
      </main>

      {/* Mobile version uses a drawer component */}
      {isMobile && selectedCampaignIds.length > 0 ? (
        <MobileToolbarDrawer
          selectedCampaignIds={selectedCampaignIds}
          open={toolbarOpen}
          setOpen={setToolbarOpen}
          onUpdateTags={handleUpdateTags}
          onPauseCampaigns={handlePauseCampaigns}
          onResumeCampaigns={handleResumeCampaigns}
          onArchiveCampaigns={handleArchiveCampaigns}
          onDeleteCampaigns={handleDeleteCampaigns}
        />
      ) : null}

      {/* Desktop version - fixed at bottom center of the page */}
      {!isMobile && selectedCampaignIds.length > 0 && (
        <div className="animate-slide-in fixed bottom-6 left-0 right-0 flex justify-center">
          <div className="flex items-center rounded-full bg-primary px-2 py-1 text-primary-foreground shadow-lg">
            <CampaignToolbar
              selectedCampaignIds={selectedCampaignIds}
              onUpdateTags={handleUpdateTags}
              onPauseCampaigns={handlePauseCampaigns}
              onResumeCampaigns={handleResumeCampaigns}
              onArchiveCampaigns={handleArchiveCampaigns}
              onDeleteCampaigns={handleDeleteCampaigns}
            />
          </div>
        </div>
      )}

      <UpdateTagsDialog
        open={updateTagsOpen}
        onOpenChange={setUpdateTagsOpen}
        campaignIds={selectedCampaignIds}
        onSuccess={() => {
          refetch();
          setRowSelection({});
        }}
      />
    </div>
  );
}
