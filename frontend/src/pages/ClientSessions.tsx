import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, DollarSign, Search, Bookmark, BookmarkCheck } from "lucide-react";
import LoadingScreen from "@/components/ui/loading-screen";
import { Session } from "@/api/services/sessionService";
import clientSessionService from "@/api/services/clientSessionService";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ClientSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [savedSessions, setSavedSessions] = useState<number[]>([]);
  const [bookingSession, setBookingSession] = useState<Session | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchSessions();
    fetchSavedSessions();

    // Debug user role
    console.log('ClientSessions - User:', user);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [sessions, searchTerm, priceFilter, dateFilter]);

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

    // Apply price filter
    if (priceFilter) {
      switch (priceFilter) {
        case "low":
          result = result.filter((session) => session.price <= 25);
          break;
        case "medium":
          result = result.filter((session) => session.price > 25 && session.price <= 50);
          break;
        case "high":
          result = result.filter((session) => session.price > 50);
          break;
      }
    }

    // Apply date filter
    if (dateFilter) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      switch (dateFilter) {
        case "today":
          result = result.filter((session) => {
            const sessionDate = new Date(session.date);
            return sessionDate.toDateString() === today.toDateString();
          });
          break;
        case "tomorrow":
          result = result.filter((session) => {
            const sessionDate = new Date(session.date);
            return sessionDate.toDateString() === tomorrow.toDateString();
          });
          break;
        case "week":
          result = result.filter((session) => {
            const sessionDate = new Date(session.date);
            return sessionDate >= today && sessionDate <= nextWeek;
          });
          break;
        case "month":
          result = result.filter((session) => {
            const sessionDate = new Date(session.date);
            return sessionDate >= today && sessionDate <= nextMonth;
          });
          break;
      }
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

  const handleBookSession = async () => {
    if (!bookingSession) return;

    setIsBooking(true);
    try {
      const response = await clientSessionService.bookSession(bookingSession.id);
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
    } finally {
      setIsBooking(false);
      setBookingSession(null);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Check if user is a client
  if (user?.role !== 'client' && user?.role !== undefined) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-6 text-white">Access Denied</h1>
        <p className="text-gray-400">This page is only available to client users.</p>
        <p className="text-gray-400 mt-2">Your current role: {user?.role || 'Unknown'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Find Sessions</h1>

      {/* Search and filters */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <div className="md:col-span-2">
          <div className="relative">
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
        <Select value={priceFilter} onValueChange={setPriceFilter}>
          <SelectTrigger className="bg-yalla-dark-gray text-white border-yalla-gray">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent className="bg-yalla-dark-gray text-white border-yalla-gray">
            <SelectItem value="">All Prices</SelectItem>
            <SelectItem value="low">Low ($0-$25)</SelectItem>
            <SelectItem value="medium">Medium ($26-$50)</SelectItem>
            <SelectItem value="high">High ($50+)</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="bg-yalla-dark-gray text-white border-yalla-gray">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent className="bg-yalla-dark-gray text-white border-yalla-gray">
            <SelectItem value="">Any Date</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="tomorrow">Tomorrow</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sessions grid */}
      {filteredSessions.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="bg-yalla-dark-gray text-white border-yalla-gray">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{session.title}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSaveSession(session.id)}
                    className="text-yalla-green hover:text-yalla-green/80"
                  >
                    {savedSessions.includes(session.id) ? (
                      <BookmarkCheck className="h-5 w-5" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <CardDescription className="text-gray-400">
                  {session.description.substring(0, 100)}
                  {session.description.length > 100 ? "..." : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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
                    {session.enrolled >= session.capacity && (
                      <Badge className="ml-2 bg-red-500">Full</Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="mr-2 h-4 w-4 text-yalla-green" />
                    <span>${session.price}</span>
                  </div>

                  <Button
                    className="w-full bg-yalla-green text-black hover:bg-yalla-green/90"
                    disabled={session.enrolled >= session.capacity}
                    onClick={() => setBookingSession(session)}
                  >
                    {session.enrolled >= session.capacity ? "Session Full" : "Book Now"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No sessions found matching your criteria.</p>
        </div>
      )}

      {/* Booking confirmation dialog */}
      <Dialog open={!!bookingSession} onOpenChange={(open) => !open && setBookingSession(null)}>
        <DialogContent className="bg-yalla-dark-gray text-white border-yalla-gray">
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
            <DialogDescription className="text-gray-400">
              You are about to book the following session:
            </DialogDescription>
          </DialogHeader>
          {bookingSession && (
            <div className="space-y-4 py-4">
              <h3 className="font-medium text-lg">{bookingSession.title}</h3>
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-yalla-green" />
                <span>{format(new Date(bookingSession.date), "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-yalla-green" />
                <span>{bookingSession.time}</span>
              </div>
              <div className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-yalla-green" />
                <span>${bookingSession.price}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setBookingSession(null)}
              className="border-yalla-gray text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBookSession}
              className="bg-yalla-green text-black hover:bg-yalla-green/90"
              disabled={isBooking}
            >
              {isBooking ? "Booking..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientSessions;
