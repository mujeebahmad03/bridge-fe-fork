import { User, Building, Link, Zap } from "lucide-react";
import type { ReactNode } from "react";

export interface Variable {
  id: string;
  name: string;
  syntax: string;
  icon: ReactNode;
}

export const defaultVariables: Variable[] = [
  {
    id: "firstName",
    name: "First name",
    syntax: "{{firstName}}",
    icon: <User className="h-4 w-4" />,
  },
  {
    id: "lastName",
    name: "Last Name",
    syntax: "{{lastName}}",
    icon: <User className="h-4 w-4" />,
  },
  {
    id: "companyName",
    name: "Company name",
    syntax: "{{companyName}}",
    icon: <Building className="h-4 w-4" />,
  },
  {
    id: "icebreaker",
    name: "Icebreaker",
    syntax: "{{icebreaker}}",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    id: "linkedinUrl",
    name: "LinkedIn url",
    syntax: "{{linkedinUrl}}",
    icon: <Link className="h-4 w-4" />,
  },
];
