import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, DollarSign, CheckCircle, XCircle } from "lucide-react";
import LoadingScreen from "@/components/ui/loading-screen";
import bookingService, { Booking } from "@/api/services/bookingService";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await bookingService.getCoachBookings();
      if (response.status) {
        setBookings(response.data.bookings);
      } else {
        toast({
          title: "Error",
          description: "Failed to load bookings",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: number, status: string) => {
    setIsLoading(true);
    try {
      const response = await bookingService.updateBookingStatus(bookingId, status);
      if (response.status) {
        toast({
          title: "Success",
          description: `Booking ${status === 'confirmed' ? 'confirmed' : 'cancelled'} successfully`,
        });
        fetchBookings(); // Refresh bookings after update
      } else {
        toast({
          title: "Error",
          description: `Failed to ${status === 'confirmed' ? 'confirm' : 'cancel'} booking`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(`Error ${status === 'confirmed' ? 'confirming' : 'cancelling'} booking:`, error);
      toast({
        title: "Error",
        description: `Failed to ${status === 'confirmed' ? 'confirm' : 'cancel'} booking`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.session.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (activeTab === "upcoming") {
      return bookingDate >= today && (booking.status === "confirmed" || booking.status === "pending");
    } else if (activeTab === "pending") {
      return booking.status === "pending";
    } else if (activeTab === "completed") {
      return booking.status === "completed" || (bookingDate < today && booking.status === "confirmed");
    } else if (activeTab === "cancelled") {
      return booking.status === "cancelled";
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Manage Bookings</h1>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        {["upcoming", "pending", "completed", "cancelled"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {filteredBookings.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBookings.map((booking) => (
                  <Card key={booking.id} className="bg-yalla-dark-gray text-white border-yalla-gray">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{booking.session.title}</CardTitle>
                          <CardDescription className="text-gray-400">
                            {booking.session.description.substring(0, 100)}
                            {booking.session.description.length > 100 ? "..." : ""}
                          </CardDescription>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-yalla-green" />
                          <span>{format(new Date(booking.session.date), "MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-yalla-green" />
                          <span>{booking.session.time}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="mr-2 h-4 w-4 text-yalla-green" />
                          <span>
                            {booking.session.enrolled} / {booking.session.capacity} enrolled
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <DollarSign className="mr-2 h-4 w-4 text-yalla-green" />
                          <span>${booking.session.price}</span>
                        </div>

                        <div className="border-t border-yalla-gray pt-4 mt-4">
                          <h4 className="font-medium mb-2">Client Information</h4>
                          <p className="text-sm mb-1">Name: {booking.user.name}</p>
                          <p className="text-sm mb-1">Email: {booking.user.email}</p>
                          {booking.user.phone && (
                            <p className="text-sm mb-1">Phone: {booking.user.phone}</p>
                          )}
                        </div>

                        {booking.status === "pending" && (
                          <div className="flex gap-2 mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                              onClick={() => updateBookingStatus(booking.id, "confirmed")}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" /> Confirm
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                              onClick={() => updateBookingStatus(booking.id, "cancelled")}
                            >
                              <XCircle className="mr-2 h-4 w-4" /> Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No {tab} bookings found.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Bookings;
