import {
  Phone,
  Mail,
  Linkedin,
  CheckCircle2,
  User,
  Calendar,
} from "lucide-react";

export const getTaskIcon = (type: string) => {
  switch (type) {
    case "call":
      return Phone;
    case "email":
      return Mail;
    case "linkedin":
      return Linkedin;
    default:
      return CheckCircle2;
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-destructive text-destructive-foreground";
    case "medium":
      return "bg-warning text-warning-foreground";
    case "low":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export const getStatIcon = (type: string) => {
  switch (type) {
    case "calls":
      return Phone;
    case "emails":
      return Mail;
    case "leads":
      return User;
    case "meetings":
      return Calendar;
    default:
      return CheckCircle2;
  }
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
