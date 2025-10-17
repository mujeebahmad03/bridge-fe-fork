"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { TemplateCard } from "./template-card";

import { dashboardRoutes } from "@/config/routes";
import { templates } from "@/constants/leads-templates";

export const TemplatesModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { push } = useRouter();

  const handleClick = (type: string) => {
    setIsOpen(false);
    push(`${dashboardRoutes.leadsEnrichment}/work-sheet?template=${type}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-auto bg-primary px-6 py-2 hover:bg-primary/90">
          Use Template
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden bg-background p-0 sm:max-w-[900px]">
        <DialogHeader className="border-b p-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Templates
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="grid max-h-[70vh] grid-cols-1 gap-4 overflow-y-auto p-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              {...template}
              onClick={() => handleClick(template.title)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
