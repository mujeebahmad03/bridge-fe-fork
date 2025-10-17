import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { FilterPopover } from "./filter-popover";
import { CreateCampaignButton } from "../create-campaign-button";

import { Tag, User } from "@/types/campaign";

interface CampaignFiltersProps {
  search: string;
  statusFilter: string[];
  sendersFilter: string[];
  tagsFilter: string[];
  creatorsFilter: string[];
  users?: User[];
  tags?: Tag[];
  setSearch: (search: string) => void;
  setStatusFilter: (filter: string[]) => void;
  setSendersFilter: (filter: string[]) => void;
  setTagsFilter: (filter: string[]) => void;
  setCreatorsFilter: (filter: string[]) => void;
}

export const CampaignFilters = ({
  search,
  statusFilter,
  sendersFilter,
  tagsFilter,
  creatorsFilter,
  users,
  tags,
  setSearch,
  setStatusFilter,
  setSendersFilter,
  setTagsFilter,
  setCreatorsFilter,
}: CampaignFiltersProps) => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search a campaign..."
            className="border-border bg-background pl-9 text-foreground"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="ml-auto flex gap-2">
          <CreateCampaignButton />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterPopover
          title="Status"
          options={[
            { id: "draft", label: "Draft (1)" },
            { id: "in_progress", label: "In progress (0)" },
            { id: "completed", label: "Completed (0)" },
            { id: "paused", label: "Paused (0)" },
            { id: "in_error", label: "In error (0)" },
            { id: "archived", label: "Archived (0)" },
          ]}
          selectedIds={statusFilter}
          onChange={setStatusFilter}
        />

        <FilterPopover
          title="Senders"
          options={
            users
              ? users.map((user) => ({
                  id: user.name,
                  label: user.name,
                }))
              : []
          }
          selectedIds={sendersFilter}
          onChange={setSendersFilter}
        />

        <FilterPopover
          title="Tags"
          options={
            tags
              ? tags.map((tag) => ({
                  id: tag.name,
                  label: tag.name,
                }))
              : []
          }
          selectedIds={tagsFilter}
          onChange={setTagsFilter}
        />

        <FilterPopover
          title="Creators"
          options={
            users
              ? users.map((user) => ({
                  id: user.id,
                  label: user.name,
                }))
              : []
          }
          selectedIds={creatorsFilter}
          onChange={setCreatorsFilter}
        />
      </div>
    </>
  );
};
