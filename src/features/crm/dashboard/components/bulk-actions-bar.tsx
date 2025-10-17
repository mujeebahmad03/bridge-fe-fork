"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  List,
  Tag,
  UserPlus,
  Trash2,
  X,
  Users,
  Building2,
  Target,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddTagsModal } from "./bulk-actions/add-tags-modal";
import { AddStatusModal } from "./bulk-actions/add-status-modal";
import { AddToListModal } from "./bulk-actions/add-to-list-modal";
import { AddOwnersModal } from "./bulk-actions/add-owners-modal";
import { DeleteConfirmationModal } from "./bulk-actions/delete-confirmation-modal";

interface BulkActionsBarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onAddToList: () => void;
  onAddTags: () => void;
  onAddStatus: () => void;
  onAddOwners: () => void;
  onDelete: () => void;
  entityType: "contacts" | "companies" | "leads";
}

export function BulkActionsBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  entityType,
}: BulkActionsBarProps) {
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [showOwnersModal, setShowOwnersModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (selectedCount === 0) return null;

  const handleAddTags = (tags: string[]) => {
    console.log(`Adding tags to ${selectedCount} ${entityType}:`, tags);
    // TODO: Implement actual API call
  };

  const handleAddStatus = (status: string) => {
    console.log(`Adding status to ${selectedCount} ${entityType}:`, status);
    // TODO: Implement actual API call
  };

  const handleAddToList = (listId: string) => {
    console.log(`Adding ${selectedCount} ${entityType} to list:`, listId);
    // TODO: Implement actual API call
  };

  const handleAddOwners = (ownerId: string) => {
    console.log(`Assigning owner to ${selectedCount} ${entityType}:`, ownerId);
    // TODO: Implement actual API call
  };

  const handleDelete = () => {
    console.log(`Deleting ${selectedCount} ${entityType}`);
    // TODO: Implement actual API call
    onClearSelection();
  };

  const getEntityIcon = () => {
    switch (entityType) {
      case "contacts":
        return <Users className="h-4 w-4" />;
      case "companies":
        return <Building2 className="h-4 w-4" />;
      case "leads":
        return <Target className="h-4 w-4" />;
    }
  };

  const getEntityLabel = () => {
    switch (entityType) {
      case "contacts":
        return "contacts";
      case "companies":
        return "companies";
      case "leads":
        return "leads";
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform rounded-lg border-b bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 items-center gap-2">
            {getEntityIcon()}
            <span className="truncate text-sm font-medium">
              {selectedCount} {getEntityLabel()} selected
            </span>
            {selectedCount < totalCount && (
              <Button
                variant="link"
                size="sm"
                onClick={onSelectAll}
                className="hidden h-auto p-0 text-xs text-primary hover:text-primary/80 sm:inline-flex sm:text-sm"
              >
                Select all {totalCount} {getEntityLabel()}
              </Button>
            )}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowListModal(true)}
              className="flex items-center gap-2 bg-transparent"
            >
              <List className="h-4 w-4" />
              Add to List
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTagsModal(true)}
              className="flex items-center gap-2 bg-transparent"
            >
              <Tag className="h-4 w-4" />
              Add tags
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowStatusModal(true)}
              className="flex items-center gap-2 bg-transparent"
            >
              <Badge className="h-4 w-4" />
              Add Status
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOwnersModal(true)}
              className="flex items-center gap-2 bg-transparent"
            >
              <UserPlus className="h-4 w-4" />
              Add owners
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 bg-transparent text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between gap-2 sm:hidden">
            <div className="flex items-center gap-2">
              {selectedCount < totalCount && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={onSelectAll}
                  className="h-auto p-1 text-xs text-primary hover:text-primary/80"
                >
                  Select all
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => setShowListModal(true)}
                    className="flex items-center gap-2"
                  >
                    <List className="h-4 w-4" />
                    Add to List
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowTagsModal(true)}
                    className="flex items-center gap-2"
                  >
                    <Tag className="h-4 w-4" />
                    Add tags
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowStatusModal(true)}
                    className="flex items-center gap-2"
                  >
                    <Badge className="h-4 w-4" />
                    Add Status
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowOwnersModal(true)}
                    className="flex items-center gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    Add owners
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteModal(true)}
                className="bg-transparent p-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSelection}
                className="p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AddTagsModal
        open={showTagsModal}
        onOpenChange={setShowTagsModal}
        selectedCount={selectedCount}
        entityType={entityType}
        onConfirm={handleAddTags}
      />

      <AddStatusModal
        open={showStatusModal}
        onOpenChange={setShowStatusModal}
        selectedCount={selectedCount}
        entityType={entityType}
        onConfirm={handleAddStatus}
      />

      <AddToListModal
        open={showListModal}
        onOpenChange={setShowListModal}
        selectedCount={selectedCount}
        entityType={entityType}
        onConfirm={handleAddToList}
      />

      <AddOwnersModal
        open={showOwnersModal}
        onOpenChange={setShowOwnersModal}
        selectedCount={selectedCount}
        entityType={entityType}
        onConfirm={handleAddOwners}
      />

      <DeleteConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        selectedCount={selectedCount}
        entityType={entityType}
        onConfirm={handleDelete}
      />
    </>
  );
}
