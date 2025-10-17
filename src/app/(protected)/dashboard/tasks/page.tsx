import { Tasks } from "@/components/features/tasks";
import { DashboardLayoutContent } from "@/components/layout/main-content";
import { dashboardRoutes } from "@/config/routes";

const crumbs = [
  { title: "Home", href: dashboardRoutes.home },
  { title: "Tasks", href: dashboardRoutes.tasks },
];

const TasksPage = () => {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="All Tasks">
      <h1 className="text-3xl font-semibold">Task Board</h1>
      <Tasks />
    </DashboardLayoutContent>
  );
};

export default TasksPage;
