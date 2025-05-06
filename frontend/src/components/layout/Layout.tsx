
import { ReactNode } from "react";
import Header, { UserRole } from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  userRole?: UserRole;
}

const Layout = ({ 
  children, 
  isAuthenticated = false,
  userRole = null
}: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={isAuthenticated} userRole={userRole} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
