
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/error/AccessDenied";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Sessions from "./pages/Sessions";
import Bookings from "./pages/Bookings";
import ClientSessions from "./pages/ClientSessions";
import FindSessions from "./pages/FindSessions";
import TestPage from "./pages/TestPage";
import SimpleClientSessions from "./pages/SimpleClientSessions";

// Layouts
import DashboardLayout from "@/components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Dashboard Routes - Protected by DashboardLayout */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/bookings" element={<Bookings />} />
              {/* You can add more routes here that should use DashboardLayout */}
            </Route>

            {/* Simple test routes */}
            <Route path="/test" element={<TestPage />} />

            {/* Client Sessions Route - Simple version */}
            <Route
              path="/client/sessions"
              element={
                <ProtectedRoute>
                  <SimpleClientSessions />
                </ProtectedRoute>
              }
            />

            {/* Error Pages */}
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
