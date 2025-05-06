
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ClientDashboard from "./dashboard/ClientDashboard";
import CoachDashboard from "./dashboard/CoachDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import { UserRole } from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>(null);

  useEffect(() => {
    // Get the role from the authenticated user
    if (user && user.role) {
      setUserRole(user.role as UserRole);
    } else {
      // Fallback to location state (for backward compatibility)
      const role = location.state?.userRole || "client";
      setUserRole(role as UserRole);
    }
  }, [location, user]);

  return (
    <Layout isAuthenticated={true} userRole={userRole}>
      {userRole === "client" && <ClientDashboard />}
      {userRole === "coach" && <CoachDashboard />}
      {userRole === "admin" && <AdminDashboard />}
    </Layout>
  );
};

export default Dashboard;
