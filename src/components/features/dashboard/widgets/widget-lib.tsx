"use client";

import { Mail, Linkedin, Phone, LayoutGrid, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { WIDGET_TEMPLATES } from "@/data/widget-data";

interface WidgetLibProps {
  existingWidgetIds: string[];
  onAddWidget: (widgetId: string) => void;
}

export const WidgetLib = ({
  existingWidgetIds,
  onAddWidget,
}: WidgetLibProps) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [layoutName, setLayoutName] = useState("");

  const widgetIcons: { [key: string]: React.ReactNode } = {
    email: <Mail className="h-6 w-6 text-blue-500" />,
    linkedin: <Linkedin className="h-6 w-6 text-blue-500" />,
    calls: <Phone className="h-6 w-6 text-green-500" />,
    combined: <LayoutGrid className="h-6 w-6 text-purple-500" />,
  };

  const widgetDescriptions: { [key: string]: string } = {
    email: "Track email campaign performance and engagement metrics",
    linkedin: "Monitor LinkedIn social media engagement and growth",
    calls: "Analyze call metrics and conversation analytics",
    combined: "View unified analytics across all channels",
  };

  const handleAddWidget = (widgetId: string) => {
    onAddWidget(widgetId);
    toast("The widget has been added to your dashboard.");
  };

  const saveLayout = () => {
    if (!layoutName.trim()) {
      toast.error("Please enter a name for your layout");
      return;
    }

    const currentLayouts = JSON.parse(
      localStorage.getItem("dashboardLayouts") || "[]",
    );
    const newLayout = {
      id: Date.now().toString(),
      name: layoutName,
      date: new Date().toISOString(),
    };
    localStorage.setItem(
      "dashboardLayouts",
      JSON.stringify([...currentLayouts, newLayout]),
    );
    setShowSaveDialog(false);
    setLayoutName("");
    toast.success("Your layout has been saved successfully.");
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add Widget
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Add Widget</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {WIDGET_TEMPLATES.map((widget) => (
              <Card
                key={widget.id}
                className={cn(
                  "p-4 transition-all hover:shadow-md",
                  existingWidgetIds.includes(widget.id)
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:scale-[1.02]",
                )}
                onClick={() => {
                  if (!existingWidgetIds.includes(widget.id)) {
                    handleAddWidget(widget.id);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
                    {widgetIcons[widget.type]}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 font-medium">{widget.title}</h3>
                    <p className="mb-2 text-sm text-muted-foreground">
                      {widgetDescriptions[widget.type]}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{widget.metrics.length} metrics available</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                      <span>Real-time updates</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Layout</AlertDialogTitle>
            <AlertDialogDescription>
              Give your layout a name to save it for later use.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              placeholder="Layout name"
              value={layoutName}
              onChange={(e) => setLayoutName(e.target.value)}
              className="w-full"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={saveLayout}>
              Save Layout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
