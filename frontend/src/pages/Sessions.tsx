import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Calendar, Clock, Users, DollarSign, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/ui/loading-screen";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SessionForm from "@/components/sessions/SessionForm";
import sessionService, { Session, SessionCreateData } from "@/api/services/sessionService";

const Sessions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user is a coach
  const isCoach = user?.role === "coach";

  // Fetch sessions on component mount
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await sessionService.getSessions();
        if (response.status) {
          setSessions(response.data.sessions);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load sessions. Please try again.",
          variant: "destructive"
        });
      } finally {
        setPageLoading(false);
      }
    };

    if (isAuthenticated && isCoach) {
      fetchSessions();
    } else {
      setPageLoading(false);
    }
  }, [isAuthenticated, isCoach, toast]);

  const handleCreateSession = () => {
    setEditingSession(null);
    setFormOpen(true);
  };

  const handleEditSession = async (id: number) => {
    setPageLoading(true);
    try {
      const response = await sessionService.getSession(id);
      if (response.status) {
        setEditingSession(response.data.session);
        setFormOpen(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load session details. Please try again.",
        variant: "destructive"
      });
    } finally {
      setPageLoading(false);
    }
  };

  const handleDeleteSession = (id: number) => {
    // Show confirmation toast
    toast({
      title: "Delete session?",
      description: "Are you sure you want to delete this session?",
      action: (
        <Button
          variant="destructive"
          onClick={async () => {
            setPageLoading(true);
            try {
              const response = await sessionService.deleteSession(id);
              if (response.status) {
                // Update the sessions list
                setSessions(sessions.filter(session => session.id !== id));

                // Show success toast
                toast({
                  title: "Session deleted",
                  description: "The session has been successfully deleted.",
                });
              }
            } catch (error) {
              toast({
                title: "Error",
                description: "Failed to delete session. Please try again.",
                variant: "destructive"
              });
            } finally {
              setPageLoading(false);
            }
          }}
        >
          Delete
        </Button>
      ),
    });
  };

  const handleFormSubmit = async (data: SessionCreateData) => {
    setIsSubmitting(true);
    try {
      if (editingSession) {
        // Update existing session
        const response = await sessionService.updateSession({
          id: editingSession.id,
          ...data
        });

        if (response.status) {
          // Update the sessions list
          setSessions(sessions.map(session =>
            session.id === editingSession.id ? response.data.session : session
          ));

          toast({
            title: "Success",
            description: "Session updated successfully.",
          });
        }
      } else {
        // Create new session
        const response = await sessionService.createSession(data);

        if (response.status) {
          // Add the new session to the list
          setSessions([...sessions, response.data.session]);

          toast({
            title: "Success",
            description: "Session created successfully.",
          });
        }
      }

      // Close the form
      setFormOpen(false);
      setEditingSession(null);
    } catch (error) {
      toast({
        title: "Error",
        description: editingSession
          ? "Failed to update session. Please try again."
          : "Failed to create session. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormCancel = () => {
    setFormOpen(false);
    setEditingSession(null);
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

      {/* Session Form Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="bg-yalla-dark-gray text-white border-yalla-gray max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingSession ? "Edit Session" : "Create New Session"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingSession
                ? "Update the details of your fitness session."
                : "Fill in the details to create a new fitness session."}
            </DialogDescription>
          </DialogHeader>

          <SessionForm
            initialData={editingSession || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

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
                          onClick={() => {
                            // Clone the session for a new one
                            setEditingSession(null);
                            // We'll pre-fill the form with this session's data
                            // but without the ID so it creates a new one
                            const { id, status, enrolled, ...templateData } = session;
                            setEditingSession({ ...templateData, id: 0, status: 'active', enrolled: 0 } as Session);
                            setFormOpen(true);
                          }}
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
