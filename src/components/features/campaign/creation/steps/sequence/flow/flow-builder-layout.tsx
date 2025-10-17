import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { FlowSidebar } from "../sidebar";
import { FlowBuilder } from "../canvas/";
import { LayoutHeader, LayoutHeaderProps } from "./layout-header";

// Import flow styles
// import "@/styles/flow.css";

export default function FlowBuilderLayout({ ...props }: LayoutHeaderProps) {
  return (
    <SidebarProvider>
      <FlowSidebar />
      <SidebarInset>
        <LayoutHeader {...props} />
        <FlowBuilder />
      </SidebarInset>
    </SidebarProvider>
  );
}
