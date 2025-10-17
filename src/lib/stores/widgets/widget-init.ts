import { SavedLayout, WidgetItem } from "@/types/widget";
import { DEFAULT_LAYOUT_NAME, useWidgetsStore } from "./use-widget-store";

const initialWidgets: WidgetItem[] = [
  { id: "email-widget", type: "email" },
  { id: "linkedin-widget", type: "linkedin" },
  { id: "calls-widget", type: "calls" },
  { id: "campaign-widget", type: "campaign" },
  { id: "task-widget", type: "task" },
];

// Init function to set up initial state
export const initWidgetStore = () => {
  const {
    savedLayouts,
    setSavedLayouts,
    setCurrentLayout,
    setWidgets,
    setAddedWidgetTypes,
  } = useWidgetsStore.getState();

  // Initialize with default layout if no layouts exist
  if (savedLayouts.length === 0) {
    const defaultLayout: SavedLayout = {
      name: DEFAULT_LAYOUT_NAME,
      widgets: initialWidgets,
    };
    setSavedLayouts([defaultLayout]);
  }

  // Load the current layout's widgets
  const currentLayoutName =
    localStorage.getItem("currentLayout") || DEFAULT_LAYOUT_NAME;
  setCurrentLayout(currentLayoutName);

  const layout =
    savedLayouts.find((l) => l.name === currentLayoutName) ||
    savedLayouts.find((l) => l.name === DEFAULT_LAYOUT_NAME);

  if (layout) {
    setWidgets(layout.widgets);
    setAddedWidgetTypes(new Set(layout.widgets.map((w) => w.type)));
  }
};
