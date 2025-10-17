import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

import { DEFAULT_LAYOUT } from "@/config/widget-layout.config";
import {
  Layout,
  LayoutConfig,
  DateRange,
  DateRangePresetType,
  Campaign,
} from "@/types/dashboard-widget";
import { Breakpoint } from "@/types/dashboard-widget";

const LAYOUTS_STORAGE_KEY = "dashboard_layouts";

export const useDashboardState = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentLayout, setCurrentLayout] =
    useState<LayoutConfig>(DEFAULT_LAYOUT);
  const [originalLayout, setOriginalLayout] =
    useState<LayoutConfig>(DEFAULT_LAYOUT);
  const [savedLayouts, setSavedLayouts] = useState<LayoutConfig[]>([]);

  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });
  const [datePreset, setDatePreset] = useState<DateRangePresetType>("monthly");
  const [selectedCampaigns, setSelectedCampaigns] = useState<Campaign[]>([]);
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);

  // Load saved layouts from localStorage on mount
  useEffect(() => {
    const savedLayoutsStr = localStorage.getItem(LAYOUTS_STORAGE_KEY);
    if (savedLayoutsStr) {
      try {
        const layouts = JSON.parse(savedLayoutsStr);
        setSavedLayouts([DEFAULT_LAYOUT, ...layouts]);
        // Set the first layout as current if available
        if (layouts.length > 0) {
          const firstLayout = layouts[0];
          setCurrentLayout(firstLayout);
          setOriginalLayout(firstLayout);
        }
      } catch (error) {
        console.error("Error loading saved layouts:", error);
        toast.error("Failed to load saved layouts");
        setSavedLayouts([DEFAULT_LAYOUT]);
      }
    } else {
      setSavedLayouts([DEFAULT_LAYOUT]);
    }
  }, []);

  const onLayoutChange = useCallback(
    (layout: Layout[], breakpoint: Breakpoint) => {
      setCurrentLayout((prev) => ({
        ...prev,
        layouts: {
          ...prev.layouts,
          [breakpoint]: layout,
        },
      }));
    },
    [],
  );

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => {
      if (prev) {
        setOriginalLayout(currentLayout);
      }
      return !prev;
    });
  }, [currentLayout]);

  const cancelEdits = useCallback(() => {
    setCurrentLayout(originalLayout);
    setIsEditMode(false);
    toast.info("Changes have been discarded.");
  }, [originalLayout]);

  const removeWidget = useCallback((widgetId: string) => {
    setCurrentLayout((prev) => {
      const updatedLayouts = Object.fromEntries(
        Object.entries(prev.layouts).map(([bp, layout]) => [
          bp,
          layout.filter((item) => item.i !== widgetId),
        ]),
      ) as { [K in Breakpoint]: Layout[] };

      return { ...prev, layouts: updatedLayouts };
    });
    toast.success("The widget has been removed from your dashboard.");
  }, []);

  const addWidget = useCallback((widgetId: string) => {
    setCurrentLayout((prev) => {
      const addNewWidget = (layout: Layout[]): Layout[] => {
        const newLayout: Layout = DEFAULT_LAYOUT.layouts.lg.find(
          (item) => item.i === widgetId,
        ) || { i: widgetId, x: 0, y: 0, w: 1, h: 1 };

        return [...layout, newLayout];
      };

      const updatedLayouts = Object.fromEntries(
        Object.entries(prev.layouts).map(([bp, layout]) => [
          bp,
          addNewWidget(layout),
        ]),
      ) as { [K in Breakpoint]: Layout[] };

      return { ...prev, layouts: updatedLayouts };
    });
    toast.success("The widget has been added to your dashboard.");
  }, []);

  const saveLayout = useCallback(
    (name: string) => {
      const newLayout: LayoutConfig = {
        ...currentLayout,
        id: crypto.randomUUID(),
        name,
      };
      setSavedLayouts((prev) => {
        const defaultLayout = prev.find((l) => l.id === DEFAULT_LAYOUT.id);
        const otherLayouts = prev.filter((l) => l.id !== DEFAULT_LAYOUT.id);
        const updated = defaultLayout
          ? [defaultLayout, ...otherLayouts, newLayout]
          : [...otherLayouts, newLayout];
        localStorage.setItem(LAYOUTS_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
      setOriginalLayout(newLayout);
      toast.success(`Layout "${name}" has been saved successfully.`);
    },
    [currentLayout],
  );

  const loadLayout = useCallback(
    (layoutId: string) => {
      const layout = savedLayouts.find((l) => l.id === layoutId);
      if (layout) {
        setCurrentLayout(layout);
        setOriginalLayout(layout);
        toast.success(`Layout "${layout.name}" has been loaded successfully.`);
      }
    },
    [savedLayouts],
  );

  const deleteLayout = useCallback(
    (layoutId: string) => {
      if (layoutId === DEFAULT_LAYOUT.id) {
        toast.error("The default layout cannot be deleted.");
        return;
      }

      setSavedLayouts((prev) => {
        const defaultLayout = prev.find((l) => l.id === DEFAULT_LAYOUT.id);
        const otherLayouts = prev
          .filter((l) => l.id !== DEFAULT_LAYOUT.id)
          .filter((l) => l.id !== layoutId);

        // Save the updated layouts to localStorage
        localStorage.setItem(LAYOUTS_STORAGE_KEY, JSON.stringify(otherLayouts));

        // Find the next layout to load
        const isCurrentLayoutDeleted = currentLayout.id === layoutId;
        if (isCurrentLayoutDeleted) {
          // Try to load the most recent non-default layout, or fall back to default
          const nextLayout = otherLayouts[0] || defaultLayout || DEFAULT_LAYOUT;
          setCurrentLayout(nextLayout);
          setOriginalLayout(nextLayout);
          toast.success(`Switched to layout "${nextLayout.name}"`);
        }

        return defaultLayout ? [defaultLayout, ...otherLayouts] : otherLayouts;
      });

      toast.success("The layout has been deleted successfully.");
    },
    [currentLayout],
  );

  return {
    isEditMode,
    toggleEditMode,
    currentLayout,
    savedLayouts,
    dateRange,
    setDateRange,
    datePreset,
    setDatePreset,
    selectedCampaigns,
    setSelectedCampaigns,
    isAddWidgetOpen,
    setIsAddWidgetOpen,
    onLayoutChange,
    saveLayout,
    loadLayout,
    deleteLayout,
    removeWidget,
    addWidget,
    cancelEdits,
  };
};
