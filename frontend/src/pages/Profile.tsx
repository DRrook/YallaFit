
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { UserRole } from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/ui/loading-screen";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Profile fields
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    specialization: "",
    experience: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Initialize profile data from user object
  useEffect(() => {
    if (user) {
      // Set user role
      setUserRole(user.role);

      // Split name into first and last name
      const nameParts = user.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      setProfileData({
        firstName,
        lastName,
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        specialization: user.role === 'coach' ? (user.specialization || '') : '',
        experience: user.role === 'coach' ? (user.experience || '') : '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      setPageLoading(false);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real implementation, you would call an API endpoint to update the user profile
      // For now, we'll simulate a successful update

      // Construct the full name from first and last name
      const fullName = `${profileData.firstName} ${profileData.lastName}`.trim();

      // Create updated user object
      const updatedUserData = {
        ...user,
        name: fullName,
        email: profileData.email,
        phone: profileData.phone,
        bio: profileData.bio,
        ...(userRole === 'coach' && {
          specialization: profileData.specialization,
          experience: profileData.experience
        })
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update local storage to reflect changes (in a real app, this would come from the API)
      localStorage.setItem('user', JSON.stringify(updatedUserData));

      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate passwords
    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New passwords do not match. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate password change
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Password changed",
        description: "Your password has been updated successfully.",
      });
      setProfileData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    }, 1000);
  };

  // Show loading screen while fetching user data
  if (pageLoading || authLoading) {
    return <LoadingScreen message="Loading profile..." />;
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`;
  };

  return (
    <>
      <div className="container py-8 px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
              <CardHeader>
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    {user?.profile_image ? (
                      <AvatarImage src={user.profile_image} />
                    ) : null}
                    <AvatarFallback className="text-xl bg-yalla-green text-black">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <CardTitle className="text-xl">{`${profileData.firstName} ${profileData.lastName}`}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {userRole === "coach" ? "Fitness Coach" : `Member since ${new Date(user?.created_at || Date.now()).getFullYear()}`}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Email</h3>
                    <p className="text-white">{profileData.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Phone</h3>
                    <p className="text-white">{profileData.phone}</p>
                  </div>
                  {userRole === "client" && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">
                        Completed Sessions
                      </h3>
                      <p className="text-white">27</p>
                    </div>
                  )}
                  {userRole === "coach" && (
                    <>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">
                          Active Sessions
                        </h3>
                        <p className="text-white">8</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Rating</h3>
                        <div className="flex items-center">
                          <p className="text-white mr-1">4.8</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={i < 4 || i === 4 ? "#D4FF00" : "currentColor"}
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="bg-yalla-dark-gray text-white grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="mt-6">
                <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-white">
                            First name
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleInputChange}
                            className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-white">
                            Last name
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleInputChange}
                            className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-white">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={profileData.bio}
                          onChange={handleInputChange}
                          rows={4}
                          className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                        />
                      </div>

                      {userRole === "coach" && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="specialization" className="text-white">
                              Specialization
                            </Label>
                            <Input
                              id="specialization"
                              name="specialization"
                              value={profileData.specialization}
                              onChange={handleInputChange}
                              className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                              placeholder="e.g. HIIT, Yoga, Strength Training"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="experience" className="text-white">
                              Years of Experience
                            </Label>
                            <Input
                              id="experience"
                              name="experience"
                              value={profileData.experience}
                              onChange={handleInputChange}
                              className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                            />
                          </div>
                        </>
                      )}

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-yalla-green text-black hover:bg-yalla-green/90"
                      >
                        {isLoading ? "Saving changes..." : "Save changes"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="security" className="mt-6">
                <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your password
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-white">
                          Current password
                        </Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={profileData.currentPassword}
                          onChange={handleInputChange}
                          required
                          className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-white">
                          New password
                        </Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={profileData.newPassword}
                          onChange={handleInputChange}
                          required
                          className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-white">
                          Confirm new password
                        </Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={profileData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-yalla-green text-black hover:bg-yalla-green/90"
                      >
                        {isLoading ? "Changing password..." : "Change password"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
