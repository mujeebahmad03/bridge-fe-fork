import { redirect } from "next/navigation";

import { auth } from "./auth";

import { authRoutes } from "@/config/routes";
import { User } from "@/types/auth";

export interface WithAuthProps {
  user: User;
}

export function withAuth<P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>,
) {
  return async function AuthComponent(props: Omit<P, keyof WithAuthProps>) {
    const user = await auth.getCurrentUser();

    if (!user) {
      redirect(authRoutes.login);
    }

    return <WrappedComponent {...(props as P)} user={user} />;
  };
}
