import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="auth-card">{children}</div>;
};

export default AuthLayout;
