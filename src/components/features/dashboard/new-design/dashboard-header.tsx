import { Edit, Plus, X, Save, Trash2, ChevronDown } from "lucide-react";

import { WidgetSelector } from "./widget-selector";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";

import { useWidgetsStore } from "@/lib/stores/widgets";
import { WidgetType } from "@/types/widget";

export const DashboardHeader = () => {
  const {
    isEditMode,
    addedWidgetTypes,
    isLayoutChanged,
    currentLayout,
    savedLayouts,
    toggleEditMode,
    cancelEditMode,
    handleAddWidget,
    loadLayout,
    deleteLayout,
  } = useWidgetsStore();

  // We show all widget types, but mark those already added as disabled
  const allWidgetTypes: WidgetType[] = [
    "email",
    "linkedin",
    "calls",
    "campaign",
    "task",
  ];

  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 p-4 px-4 sm:flex-row sm:items-center md:px-8">
      <div className="flex flex-col">
        <h1 className="animate-scale-in text-3xl font-bold">
          Hello, Stephen 👋
        </h1>
        <div className="mt-2 flex items-center">
          <span className="mr-2 text-sm text-muted-foreground">
            Current Layout:
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isEditMode}>
              <Button variant="outline" size="sm" className="gap-1">
                {currentLayout} <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {savedLayouts.map((layout) => (
                <DropdownMenuItem
                  key={layout.name}
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => loadLayout(layout.name)}
                >
                  <span>{layout.name}</span>
                  {layout.name !== "Default Layout" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteLayout(layout.name);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex gap-3">
        {isEditMode ? (
          <>
            <WidgetSelector
              onSelect={handleAddWidget}
              availableWidgets={allWidgetTypes}
              addedWidgetTypes={addedWidgetTypes}
            >
              <Button className="gap-2" variant="secondary">
                <Plus className="h-4 w-4" />
                Add widget
              </Button>
            </WidgetSelector>
            <Button
              variant="default"
              onClick={toggleEditMode}
              className="gap-2"
              disabled={!isLayoutChanged}
            >
              <Save className="h-4 w-4" />
              Save layout
            </Button>
            <Button
              variant="outline"
              onClick={cancelEditMode}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="outline" onClick={toggleEditMode} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit layout
          </Button>
        )}
      </div>
    </div>
  );
};
