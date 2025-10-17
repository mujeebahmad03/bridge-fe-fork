"use client";

import {
  Plus,
  ChevronDown,
  User,
  Building2,
  Target,
  Upload,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContactFormModal } from "./forms/contact-form-modal";
import { CompanyFormModal } from "./forms/company-form-modal";
import { LeadFormModal } from "./forms/lead-form-modal";

import { dashboardRoutes } from "@/config/routes";

type TabType = "contacts" | "companies" | "leads";

interface AddDropdownMenuProps {
  activeTab: TabType;
}

export function AddDropdownMenu({ activeTab }: AddDropdownMenuProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  const handleSingleAdd = () => {
    switch (activeTab) {
      case "contacts":
        setContactModalOpen(true);
        break;
      case "companies":
        setCompanyModalOpen(true);
        break;
      case "leads":
        setLeadModalOpen(true);
        break;
    }
  };

  const handleMultipleAdd = () => {
    window.location.href = `${dashboardRoutes.crmImport}?type=${activeTab}`;
  };

  const getSingleAddText = () => {
    switch (activeTab) {
      case "contacts":
        return "Add Contact";
      case "companies":
        return "Add Company";
      case "leads":
        return "Add Lead";
    }
  };

  const getMultipleAddText = () => {
    switch (activeTab) {
      case "contacts":
        return "Import Contacts";
      case "companies":
        return "Import Companies";
      case "leads":
        return "Import Leads";
    }
  };

  const getIcon = () => {
    switch (activeTab) {
      case "contacts":
        return <User className="mr-2 h-4 w-4" />;
      case "companies":
        return <Building2 className="mr-2 h-4 w-4" />;
      case "leads":
        return <Target className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            className="w-fit bg-gradient-to-r from-primary to-primary/80 shadow-lg hover:from-primary/90 hover:to-primary/70"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={handleSingleAdd}
            className="cursor-pointer"
          >
            {getIcon()}
            {getSingleAddText()}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleMultipleAdd}
            className="cursor-pointer"
          >
            <Upload className="mr-2 h-4 w-4" />
            {getMultipleAddText()}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modals */}
      <ContactFormModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        mode="create"
      />
      <CompanyFormModal
        open={companyModalOpen}
        onOpenChange={setCompanyModalOpen}
        mode="create"
      />
      <LeadFormModal
        open={leadModalOpen}
        onOpenChange={setLeadModalOpen}
        mode="create"
      />
    </>
  );
}
