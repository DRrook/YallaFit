import { Outlet } from "react-router-dom";
import Header from "./Header"; // Assuming Header is in the same directory
import DashboardSidebar from "./DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";

const DashboardLayout = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-black/40">
      <Header isAuthenticated={isAuthenticated} userRole={user?.role} />
      <div className="flex flex-1 pt-16"> {/* pt-16 to offset for sticky header height */}
        <DashboardSidebar />
        <main className="flex-1 px-6 md:px-10 lg:px-16 py-6 overflow-auto ml-0 md:ml-64"> {/* Add margin-left to account for fixed sidebar */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
