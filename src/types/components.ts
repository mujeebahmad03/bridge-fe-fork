export interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  submenu?: NavItem[];
}

export interface CrumbItem extends Omit<NavItem, "submenu" | "icon"> {
  icon?: React.ElementType;
}
