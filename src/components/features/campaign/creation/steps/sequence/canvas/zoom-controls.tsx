"use client";

import { useReactFlow } from "@xyflow/react";
import { Maximize2, ZoomIn, ZoomOut } from "lucide-react";

interface ZoomControlsProps {
  setPanelOpen: (open: boolean) => void;
  panelOpen: boolean;
}

export function ZoomControls({ setPanelOpen, panelOpen }: ZoomControlsProps) {
  const { zoomIn, zoomOut } = useReactFlow();

  return (
    <div className="absolute right-4 top-4 z-50 flex items-center gap-2 rounded-md bg-white/90 p-1.5 shadow-lg backdrop-blur-sm dark:bg-gray-800/90 dark:text-gray-100">
      <button
        onClick={() => zoomOut()}
        className="rounded-md p-1.5 text-gray-700 transition-colors hover:bg-gray-200/80 dark:text-gray-200 dark:hover:bg-gray-700/80"
        aria-label="Zoom out"
      >
        <ZoomOut size={18} />
      </button>
      <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
      <button
        onClick={() => zoomIn()}
        className="rounded-md p-1.5 text-gray-700 transition-colors hover:bg-gray-200/80 dark:text-gray-200 dark:hover:bg-gray-700/80"
        aria-label="Zoom in"
      >
        <ZoomIn size={18} />
      </button>
      <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        className="rounded-md p-1.5 text-gray-700 transition-colors hover:bg-gray-200/80 dark:text-gray-200 dark:hover:bg-gray-700/80"
        aria-label="Toggle panel"
      >
        <Maximize2 size={18} />
      </button>
    </div>
  );
}
