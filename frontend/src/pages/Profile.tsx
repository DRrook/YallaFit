
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
import { FileUpload } from "@/components/ui/file-upload";
import userService from "@/api/services/userService";
import { Camera } from "lucide-react";
import { ImageCropper } from "@/components/ui/image-cropper";
import ProfileImageDebug from "@/components/debug/ProfileImageDebug";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading, refreshUserData } = useAuth();

  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

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

  // Redirect if not authenticated and refresh user data
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else {
        // Refresh user data when component mounts
        refreshUserData();
      }
    }
  }, [authLoading, isAuthenticated, navigate, refreshUserData]);

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

  const handleProfileUpdate = async (e: React.FormEvent | null, uploadedImage?: File) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    try {
      // Construct the full name from first and last name
      const fullName = `${profileData.firstName} ${profileData.lastName}`.trim();

      // Create profile update data
      const updateData = {
        name: fullName,
        email: profileData.email,
        phone: profileData.phone,
        bio: profileData.bio,
        ...(userRole === 'coach' && {
          specialization: profileData.specialization,
          experience: profileData.experience
        }),
        ...(uploadedImage ? { profile_image: uploadedImage } : profileImage ? { profile_image: profileImage } : {})
      };

      // Log the update data for debugging
      console.log('Updating profile with data:', {
        ...updateData,
        profile_image: updateData.profile_image ? 'File object present' : 'No file'
      });

      // Call the API to update the profile
      const response = await userService.updateProfile(updateData);

      // Log the response for debugging
      console.log('Profile update response:', {
        status: response.status,
        message: response.message,
        hasUser: !!response.data?.user,
        profileImage: response.data?.user?.profile_image
      });

      // Update the auth context with the new user data
      if (response.status && response.data.user) {
        // If this is not a direct form submission (e.g., from image cropper)
        // don't reload the page, just update the user in the auth context
        if (!e) {
          // The user service already updates localStorage
          // We just need to update the auth context
          const { user: updatedUser } = response.data;

          // Update the auth context by dispatching an event
          if (typeof window !== 'undefined') {
            const authEvent = new CustomEvent('auth-update', { detail: updatedUser });
            window.dispatchEvent(authEvent);
          }
        } else {
          // For form submissions, reload the page to refresh all data
          window.location.reload();
        }
      }

      setIsLoading(false);

      // Only show toast for form submissions
      if (e) {
        toast({
          title: "Profile updated",
          description: "Your profile information has been updated successfully.",
        });
      }

      // Return the response for promise chaining
      return response;
    } catch (error: any) {
      console.error('Profile update error:', error);
      setIsLoading(false);

      // Only show toast for form submissions
      if (e) {
        toast({
          title: "Update failed",
          description: error.response?.data?.message || "There was an error updating your profile. Please try again.",
          variant: "destructive"
        });
      }

      // Re-throw the error for promise chaining
      throw error;
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
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

    try {
      // Call the API to update the password
      await userService.updatePassword({
        current_password: profileData.currentPassword,
        password: profileData.newPassword,
        password_confirmation: profileData.confirmPassword,
      });

      setIsLoading(false);
      toast({
        title: "Password changed",
        description: "Your password has been updated successfully.",
      });

      // Clear password fields
      setProfileData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Password update failed",
        description: error.response?.data?.message || "There was an error updating your password. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Show loading screen while fetching user data
  if (pageLoading || authLoading) {
    return <LoadingScreen message="Loading profile..." />;
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`;
  };

  // Handle crop complete
  const handleCropComplete = (croppedBlob: Blob) => {
    // Create a File from the Blob
    const croppedFile = new File([croppedBlob], 'profile-photo.jpg', { type: 'image/jpeg' });

    // Set the profile image
    setProfileImage(croppedFile);

    // Close cropper
    setShowCropper(false);
    setTempImageUrl(null);

    // Create a preview URL for immediate visual feedback
    const previewUrl = URL.createObjectURL(croppedBlob);

    // Show a loading toast
    const loadingToast = toast({
      title: "Uploading profile photo",
      description: "Please wait while we upload your photo...",
    });

    // Immediately save the profile to the server
    handleProfileUpdate(null, croppedFile)
      .then((response) => {
        // If successful, update the user object with the server-provided image path
        if (response?.status && response?.data?.user?.profile_image) {
          // Clear the loading toast
          toast.dismiss(loadingToast);

          // Show success toast
          toast({
            title: "Profile photo updated",
            description: "Your profile photo has been updated successfully.",
          });

          // Force a refresh of user data to get the correct image URL
          refreshUserData();
        }
      })
      .catch((error) => {
        // Clear the loading toast
        toast.dismiss(loadingToast);

        // Show error toast
        toast({
          title: "Upload failed",
          description: "There was an error uploading your profile photo. Please try again.",
          variant: "destructive"
        });

        console.error("Error uploading profile photo:", error);
      });

    // Update the user object in state to show the preview immediately
    if (user) {
      // Create a new user object with the updated profile image (temporary preview)
      // Use the direct object URL for immediate preview
      const updatedUser = { ...user, profile_image: previewUrl };

      console.log('Setting temporary preview image:', previewUrl);

      // Update the auth context with the temporary preview
      if (typeof window !== 'undefined') {
        // Force a re-render by updating the user in the auth context
        const authEvent = new CustomEvent('auth-update', { detail: updatedUser });
        window.dispatchEvent(authEvent);
      }
    }
  };

  // Handle crop cancel
  const handleCropCancel = () => {
    setShowCropper(false);
    setTempImageUrl(null);
  };

  return (
    <>
      {/* Image Cropper Dialog */}
      {tempImageUrl && (
        <ImageCropper
          image={tempImageUrl}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          aspectRatio={1}
          open={showCropper}
        />
      )}
      <div className="container py-8 px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
              <CardHeader>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative cursor-pointer group" onClick={() => document.getElementById('profile-photo-upload')?.click()}>
                    <Avatar className="h-24 w-24 border-2 border-transparent group-hover:border-yalla-green transition-colors">
                      {user?.profile_image ? (
                        <>
                          {/* Use direct img tag for better debugging */}
                          <img
                            src={user.profile_image.startsWith('http')
                              ? user.profile_image
                              : `http://127.0.0.1:8000${user.profile_image}`
                            }
                            alt={`${profileData.firstName} ${profileData.lastName}`}
                            className="h-full w-full rounded-full object-cover"
                            onError={(e) => {
                              // If image fails to load, show fallback and log error
                              console.error('Failed to load profile image:', user.profile_image);
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';

                              // Show toast notification
                              toast({
                                title: "Image load error",
                                description: "Could not load profile image. Please try uploading again.",
                                variant: "destructive"
                              });
                            }}
                          />
                        </>
                      ) : null}
                      <AvatarFallback className="text-xl bg-yalla-green text-black">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>

                    {/* Overlay with camera icon on hover */}
                    <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <Camera className="h-8 w-8 text-white" />
                    </div>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      id="profile-photo-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 2 * 1024 * 1024) {
                            toast({
                              title: "File too large",
                              description: "Image must be less than 2MB",
                              variant: "destructive"
                            });
                            return;
                          }
                          setProfileImage(file);

                          // Create object URL for preview
                          const objectUrl = URL.createObjectURL(file);
                          // Show cropper
                          setTempImageUrl(objectUrl);
                          setShowCropper(true);
                        }
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <CardTitle className="text-xl">{`${profileData.firstName} ${profileData.lastName}`}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {userRole === "coach" ? "Fitness Coach" : `Member since ${new Date(user?.created_at || Date.now()).getFullYear()}`}
                    </CardDescription>
                    <p className="text-xs text-gray-400 mt-1">Click on photo to change</p>
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
              <TabsList className="bg-yalla-dark-gray text-white grid w-full grid-cols-2 p-1">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-yalla-green data-[state=active]:text-black data-[state=active]:shadow-none hover:bg-yalla-green/20 transition-colors"
                >
                  Profile Information
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:bg-yalla-green data-[state=active]:text-black data-[state=active]:shadow-none hover:bg-yalla-green/20 transition-colors"
                >
                  Security
                </TabsTrigger>
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
                        className="bg-yalla-green text-black hover:bg-yalla-green/90 font-medium"
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
                        className="bg-yalla-green text-black hover:bg-yalla-green/90 font-medium"
                      >
                        {isLoading ? "Changing password..." : "Change password"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Debug component - remove in production */}
            <ProfileImageDebug />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
