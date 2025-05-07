import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Calendar, Clock, Users, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/ui/loading-screen";

// Mock data for sessions
const mockSessions = [
  {
    id: 1,
    title: "Morning HIIT",
    description: "High-intensity interval training to start your day",
    date: "2023-05-15",
    time: "09:00 - 10:00",
    capacity: 10,
    enrolled: 3,
    price: 25,
    status: "active"
  },
  {
    id: 2,
    title: "Evening Yoga Flow",
    description: "Relaxing yoga session to end your day",
    date: "2023-05-15",
    time: "18:00 - 19:00",
    capacity: 15,
    enrolled: 5,
    price: 20,
    status: "active"
  },
  {
    id: 3,
    title: "Weight Training Basics",
    description: "Introduction to weight training techniques",
    date: "2023-05-16",
    time: "14:00 - 15:30",
    capacity: 8,
    enrolled: 2,
    price: 30,
    status: "active"
  },
  {
    id: 4,
    title: "Cardio Blast",
    description: "High-energy cardio workout",
    date: "2023-05-10",
    time: "17:00 - 18:00",
    capacity: 12,
    enrolled: 8,
    price: 22,
    status: "completed"
  },
  {
    id: 5,
    title: "Pilates Fundamentals",
    description: "Core-strengthening pilates session",
    date: "2023-05-08",
    time: "10:00 - 11:00",
    capacity: 10,
    enrolled: 6,
    price: 28,
    status: "completed"
  }
];

const Sessions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [sessions, setSessions] = useState(mockSessions);
  const [pageLoading, setPageLoading] = useState(false);

  // Check if user is a coach
  const isCoach = user?.role === "coach";

  const handleCreateSession = () => {
    setPageLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Create Session",
        description: "This feature is coming soon!",
      });
      setPageLoading(false);
    }, 500);
  };

  const handleEditSession = (id: number) => {
    setPageLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Edit Session",
        description: "This feature is coming soon!",
      });
      setPageLoading(false);
    }, 500);
  };

  const handleDeleteSession = (id: number) => {
    // Show confirmation toast
    toast({
      title: "Delete session?",
      description: "Are you sure you want to delete this session?",
      action: (
        <Button 
          variant="destructive" 
          onClick={() => {
            setPageLoading(true);
            // Simulate API call delay
            setTimeout(() => {
              // Filter out the deleted session
              setSessions(sessions.filter(session => session.id !== id));
              
              // Show success toast
              toast({
                title: "Session deleted",
                description: "The session has been successfully deleted.",
              });
              setPageLoading(false);
            }, 1000);
          }}
        >
          Delete
        </Button>
      ),
    });
  };

  // Filter sessions by status
  const activeSessions = sessions.filter(session => session.status === "active");
  const completedSessions = sessions.filter(session => session.status === "completed");

  // Show loading screen
  if (isLoading || pageLoading) {
    return <LoadingScreen />;
  }

  // Redirect non-coaches to dashboard
  if (isAuthenticated && !isCoach) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Sessions</h1>
        <Button 
          onClick={handleCreateSession}
          className="bg-yalla-green text-black hover:bg-yalla-green/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Session
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-yalla-dark-gray text-white grid w-full grid-cols-2 p-1 mb-8">
          <TabsTrigger 
            value="active" 
            className="data-[state=active]:bg-yalla-green data-[state=active]:text-black data-[state=active]:shadow-none hover:bg-yalla-green/20 transition-colors"
          >
            Active Sessions
          </TabsTrigger>
          <TabsTrigger 
            value="completed" 
            className="data-[state=active]:bg-yalla-green data-[state=active]:text-black data-[state=active]:shadow-none hover:bg-yalla-green/20 transition-colors"
          >
            Completed Sessions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeSessions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeSessions.map(session => (
                <Card key={session.id} className="bg-yalla-dark-gray text-white border-yalla-gray">
                  <CardHeader>
                    <CardTitle>{session.title}</CardTitle>
                    <CardDescription className="text-gray-400">{session.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-yalla-green" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-yalla-green" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="mr-2 h-4 w-4 text-yalla-green" />
                        <span>{session.enrolled} / {session.capacity} enrolled</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="mr-2 h-4 w-4 text-yalla-green" />
                        <span>${session.price}</span>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-yalla-green text-yalla-green hover:bg-yalla-green hover:text-black"
                          onClick={() => handleEditSession(session.id)}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          onClick={() => handleDeleteSession(session.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">You don't have any active sessions yet.</p>
              <Button 
                onClick={handleCreateSession}
                className="bg-yalla-green text-black hover:bg-yalla-green/90"
              >
                <Plus className="mr-2 h-4 w-4" /> Create Your First Session
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completedSessions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedSessions.map(session => (
                <Card key={session.id} className="bg-yalla-dark-gray text-white border-yalla-gray opacity-80">
                  <CardHeader>
                    <CardTitle>{session.title}</CardTitle>
                    <CardDescription className="text-gray-400">{session.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-yalla-green" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-yalla-green" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="mr-2 h-4 w-4 text-yalla-green" />
                        <span>{session.enrolled} / {session.capacity} attended</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="mr-2 h-4 w-4 text-yalla-green" />
                        <span>${session.price}</span>
                      </div>
                      <div className="mt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full border-yalla-green text-yalla-green hover:bg-yalla-green hover:text-black"
                          onClick={handleCreateSession}
                        >
                          <Plus className="mr-2 h-4 w-4" /> Create Similar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">You don't have any completed sessions yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sessions;
