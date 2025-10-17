import type { ReactNode } from "react";

import { Logo } from "@/components/common/icons";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthCardProps {
  children: ReactNode;
  title: string;
}

export const AuthCard = ({ children, title }: AuthCardProps) => {
  return (
    <Card className="mx-auto w-full max-w-md animate-fade-in space-y-8 rounded-lg p-6">
      <CardHeader className="flex flex-col items-center">
        <Logo />
        <CardTitle className="text-center text-xl">{title}</CardTitle>
      </CardHeader>
      {children}
    </Card>
  );
};
