import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WidgetItem, SavedLayout, WidgetType } from "@/types/widget";

export const DEFAULT_LAYOUT_NAME = "Default Layout";

interface WidgetState {
  widgets: WidgetItem[];
  isEditMode: boolean;
  addedWidgetTypes: Set<WidgetType>;
  originalWidgets: WidgetItem[];
  isLayoutChanged: boolean;
  isSaveDialogOpen: boolean;
  layoutName: string;
  savedLayouts: SavedLayout[];
  currentLayout: string;

  // Actions
  setWidgets: (
    widgetsOrUpdater: WidgetItem[] | ((widgets: WidgetItem[]) => WidgetItem[]),
  ) => void;
  setIsEditMode: (isEditMode: boolean) => void;
  setAddedWidgetTypes: (types: Set<WidgetType>) => void;
  setOriginalWidgets: (widgets: WidgetItem[]) => void;
  setIsLayoutChanged: (isChanged: boolean) => void;
  setIsSaveDialogOpen: (isOpen: boolean) => void;
  setLayoutName: (name: string) => void;
  setSavedLayouts: (layouts: SavedLayout[]) => void;
  setCurrentLayout: (name: string) => void;

  // Helper methods
  toggleEditMode: () => void;
  cancelEditMode: () => void;
  handleAddWidget: (type: WidgetType) => void;
  handleRemoveWidget: (id: string) => void;
  saveLayout: (name: string) => void;
  loadLayout: (name: string) => void;
  deleteLayout: (name: string) => void;
}

export const useWidgetsStore = create<WidgetState>()(
  persist(
    (set, get) => ({
      widgets: [],
      isEditMode: false,
      addedWidgetTypes: new Set<WidgetType>(),
      originalWidgets: [],
      isLayoutChanged: false,
      isSaveDialogOpen: false,
      layoutName: "",
      savedLayouts: [],
      currentLayout: DEFAULT_LAYOUT_NAME,

      setWidgets: (widgetsOrUpdater) =>
        set((state) => {
          if (typeof widgetsOrUpdater === "function") {
            return { widgets: widgetsOrUpdater(state.widgets) };
          }
          return { widgets: widgetsOrUpdater };
        }),
      setIsEditMode: (isEditMode) => set({ isEditMode }),
      setAddedWidgetTypes: (types) => set({ addedWidgetTypes: types }),
      setOriginalWidgets: (widgets) => set({ originalWidgets: widgets }),
      setIsLayoutChanged: (isChanged) => set({ isLayoutChanged: isChanged }),
      setIsSaveDialogOpen: (isOpen) => set({ isSaveDialogOpen: isOpen }),
      setLayoutName: (name) => set({ layoutName: name }),
      setSavedLayouts: (layouts) => set({ savedLayouts: layouts }),
      setCurrentLayout: (name) => set({ currentLayout: name }),

      toggleEditMode: () => {
        const state = get();
        if (!state.isEditMode) {
          // Save the original widgets when entering edit mode
          set({
            isEditMode: true,
            originalWidgets: [...state.widgets],
          });
        } else {
          // Opening save dialog when saving
          set({ isSaveDialogOpen: true });
        }
      },

      cancelEditMode: () => {
        const state = get();
        set({
          widgets: [...state.originalWidgets],
          addedWidgetTypes: new Set(state.originalWidgets.map((w) => w.type)),
          isEditMode: false,
          isLayoutChanged: false,
        });
        toast.info("Edit mode canceled");
      },

      handleAddWidget: (type) => {
        const state = get();
        if (state.addedWidgetTypes.has(type)) return;

        const newWidget: WidgetItem = {
          id: `${type}-widget-${Date.now()}`,
          type,
        };

        set({
          widgets: [...state.widgets, newWidget],
          addedWidgetTypes: new Set([...state.addedWidgetTypes, type]),
        });
        toast.success(
          `${type.charAt(0).toUpperCase() + type.slice(1)} widget added!`,
        );
      },

      handleRemoveWidget: (id) => {
        const state = get();
        const widgetToRemove = state.widgets.find((w) => w.id === id);
        if (!widgetToRemove) return;

        const newWidgets = state.widgets.filter((w) => w.id !== id);
        const newTypes = new Set(state.addedWidgetTypes);

        // Only remove the type if there's no other widget of the same type
        if (!newWidgets.some((w) => w.type === widgetToRemove.type)) {
          newTypes.delete(widgetToRemove.type);
        }

        set({
          widgets: newWidgets,
          addedWidgetTypes: newTypes,
        });
        toast.success("Widget removed!");
      },

      saveLayout: (name) => {
        const state = get();
        // Prevent saving with an empty name
        if (!name.trim()) {
          toast.error("Please provide a layout name");
          return;
        }

        // Check if we're updating an existing layout or creating a new one
        const layoutExists = state.savedLayouts.some(
          (layout) => layout.name === name,
        );

        const newLayout: SavedLayout = {
          name,
          widgets: [...state.widgets],
        };

        let updatedLayouts: SavedLayout[];

        if (layoutExists) {
          // Update existing layout
          updatedLayouts = state.savedLayouts.map((layout) =>
            layout.name === name ? newLayout : layout,
          );
          toast.success(`Layout "${name}" updated!`);
        } else {
          // Add new layout
          updatedLayouts = [...state.savedLayouts, newLayout];
          toast.success(`Layout "${name}" saved!`);
        }

        // Save to state and localStorage
        set({
          savedLayouts: updatedLayouts,
          currentLayout: name,
          isSaveDialogOpen: false,
          layoutName: "",
          isEditMode: false,
          isLayoutChanged: false,
        });
        localStorage.setItem("currentLayout", name);
      },

      loadLayout: (name) => {
        const state = get();
        const layout = state.savedLayouts.find((l) => l.name === name);
        if (layout) {
          set({
            widgets: layout.widgets,
            addedWidgetTypes: new Set(layout.widgets.map((w) => w.type)),
            currentLayout: name,
          });
          localStorage.setItem("currentLayout", name);
          toast.success(`Layout "${name}" loaded!`);
        }
      },

      deleteLayout: (name) => {
        const state = get();
        // Prevent deleting the default layout
        if (name === DEFAULT_LAYOUT_NAME) {
          toast.error("Cannot delete the default layout");
          return;
        }

        const updatedLayouts = state.savedLayouts.filter(
          (l) => l.name !== name,
        );
        set({ savedLayouts: updatedLayouts });

        // If the current layout is being deleted, switch to the default layout
        if (state.currentLayout === name) {
          const defaultLayout = state.savedLayouts.find(
            (l) => l.name === DEFAULT_LAYOUT_NAME,
          );
          if (defaultLayout) {
            set({
              widgets: defaultLayout.widgets,
              addedWidgetTypes: new Set(
                defaultLayout.widgets.map((w) => w.type),
              ),
              currentLayout: DEFAULT_LAYOUT_NAME,
            });
            localStorage.setItem("currentLayout", DEFAULT_LAYOUT_NAME);
          }
        }

        toast.success(`Layout "${name}" deleted!`);
      },
    }),
    {
      name: "dashboard-storage",
      partialize: (state) => ({
        savedLayouts: state.savedLayouts,
        currentLayout: state.currentLayout,
      }),
    },
  ),
);
