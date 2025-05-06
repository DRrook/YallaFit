
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { UserRole } from "@/components/layout/Header";

const Profile = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  // In a real app, this would come from authentication
  const [userRole, setUserRole] = useState<UserRole>("client");
  const [isLoading, setIsLoading] = useState(false);
  
  // Profile fields
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Fitness enthusiast looking to improve my strength and endurance.",
    specialization: userRole === "coach" ? "HIIT, Strength Training" : "",
    experience: userRole === "coach" ? "5 years" : "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate profile update
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
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

  return (
    <Layout isAuthenticated={true} userRole={userRole}>
      <div className="container py-8 px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
              <CardHeader>
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" />
                    <AvatarFallback className="text-xl bg-yalla-green text-black">JD</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <CardTitle className="text-xl">John Doe</CardTitle>
                    <CardDescription className="text-gray-400">
                      {userRole === "coach" ? "Fitness Coach" : "Member since 2023"}
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
    </Layout>
  );
};

export default Profile;
