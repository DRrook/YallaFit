
import { ReactNode } from "react";
import Header, { UserRole } from "./Header";
import Footer from "./Footer";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  userRole?: UserRole;
}

const Layout = ({
  children,
  isAuthenticated: propIsAuthenticated,
  userRole: propUserRole
}: LayoutProps) => {
  // Get authentication state from context
  const { user, isAuthenticated } = useAuth();

  // Use props if provided, otherwise use context values
  const actualIsAuthenticated = propIsAuthenticated !== undefined ? propIsAuthenticated : isAuthenticated;
  const actualUserRole = propUserRole !== undefined ? propUserRole : (user?.role as UserRole || null);

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={actualIsAuthenticated} userRole={actualUserRole} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
