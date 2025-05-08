import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Users, DollarSign, Search, Bookmark, BookmarkCheck } from "lucide-react";
import LoadingScreen from "@/components/ui/loading-screen";
import { Session } from "@/api/services/sessionService";
import clientSessionService from "@/api/services/clientSessionService";
import { format } from "date-fns";
import ClientHeader from "@/components/layout/ClientHeader";
import ClientSidebar from "@/components/layout/ClientSidebar";

const BasicClientSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedSessions, setSavedSessions] = useState<number[]>([]);
  const { toast } = useToast();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
    fetchSavedSessions();

    // Debug user role
    console.log('BasicClientSessions - User:', user);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [sessions, searchTerm]);

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const response = await clientSessionService.getAvailableSessions();
      if (response.status) {
        setSessions(response.data.sessions);
        setFilteredSessions(response.data.sessions);
      } else {
        toast({
          title: "Error",
          description: "Failed to load sessions",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast({
        title: "Error",
        description: "Failed to load sessions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSavedSessions = async () => {
    try {
      const response = await clientSessionService.getSavedSessions();
      if (response.status) {
        setSavedSessions(response.data.savedSessions.map((s: any) => s.id));
      }
    } catch (error) {
      console.error("Error fetching saved sessions:", error);
    }
  };

  const applyFilters = () => {
    let result = [...sessions];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (session) =>
          session.title.toLowerCase().includes(term) ||
          session.description.toLowerCase().includes(term)
      );
    }

    setFilteredSessions(result);
  };

  const toggleSaveSession = async (sessionId: number) => {
    try {
      if (savedSessions.includes(sessionId)) {
        // Unsave session
        await clientSessionService.unsaveSession(sessionId);
        setSavedSessions(savedSessions.filter(id => id !== sessionId));
        toast({
          title: "Success",
          description: "Session removed from saved sessions",
        });
      } else {
        // Save session
        await clientSessionService.saveSession(sessionId);
        setSavedSessions([...savedSessions, sessionId]);
        toast({
          title: "Success",
          description: "Session saved successfully",
        });
      }
    } catch (error) {
      console.error("Error toggling save session:", error);
      toast({
        title: "Error",
        description: "Failed to save/unsave session",
        variant: "destructive",
      });
    }
  };

  const handleBookSession = async (sessionId: number) => {
    try {
      const response = await clientSessionService.bookSession(sessionId);
      if (response.status) {
        toast({
          title: "Success",
          description: "Session booked successfully",
        });
        // Refresh sessions to update availability
        fetchSessions();
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to book session",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error booking session:", error);
      toast({
        title: "Error",
        description: "Failed to book session",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Check if user is a client
  if (user?.role !== 'client' && user?.role !== undefined) {
    return (
      <div className="min-h-screen bg-black/40 flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">Access Denied</h1>
        <p className="text-gray-400">This page is only available to client users.</p>
        <p className="text-gray-400 mt-2">Your current role: {user?.role || 'Unknown'}</p>
        <Link
          to="/dashboard"
          className="mt-8 bg-yalla-green text-black py-2 px-4 rounded text-center hover:bg-yalla-green/90"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/40 flex flex-col">
      {/* Use our custom header component */}
      <ClientHeader isAuthenticated={isAuthenticated} userRole={user?.role} />

      <div className="flex flex-1 pt-16"> {/* pt-16 to offset for sticky header height */}
        {/* Use our custom sidebar component */}
        <ClientSidebar />

        <main className="flex-1 px-6 md:px-10 lg:px-16 py-6 overflow-auto ml-0 md:ml-64"> {/* Add margin-left to account for fixed sidebar */}
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-white">Find Sessions</h1>

            {/* Simple search */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search sessions..."
                  className="pl-8 bg-yalla-dark-gray text-white border-yalla-gray"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

          {/* Sessions grid */}
          {filteredSessions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSessions.map((session) => (
                <div key={session.id} className="bg-yalla-dark-gray text-white border border-yalla-gray rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">{session.title}</h3>
                      <button
                        onClick={() => toggleSaveSession(session.id)}
                        className="text-yalla-green hover:text-yalla-green/80"
                      >
                        {savedSessions.includes(session.id) ? (
                          <BookmarkCheck className="h-5 w-5" />
                        ) : (
                          <Bookmark className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      {session.description.substring(0, 100)}
                      {session.description.length > 100 ? "..." : ""}
                    </p>
                  </div>
                  <div className="p-4 border-t border-yalla-gray">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-yalla-green" />
                        <span>{format(new Date(session.date), "MMMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-yalla-green" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="mr-2 h-4 w-4 text-yalla-green" />
                        <span>
                          {session.enrolled} / {session.capacity} enrolled
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="mr-2 h-4 w-4 text-yalla-green" />
                        <span>${session.price}</span>
                      </div>

                      <Button
                        className="w-full bg-yalla-green text-black hover:bg-yalla-green/90"
                        disabled={session.enrolled >= session.capacity}
                        onClick={() => handleBookSession(session.id)}
                      >
                        {session.enrolled >= session.capacity ? "Session Full" : "Book Now"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No sessions found matching your criteria.</p>
            </div>
          )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BasicClientSessions;
