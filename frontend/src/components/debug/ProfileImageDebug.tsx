import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const ProfileImageDebug: React.FC = () => {
  const { user, refreshUserData } = useAuth();
  const [imageStatus, setImageStatus] = useState<string>('Not checked');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [fullImageUrl, setFullImageUrl] = useState<string>('');

  useEffect(() => {
    if (user?.profile_image) {
      setImageUrl(user.profile_image);
      const fullUrl = `http://127.0.0.1:8000${user.profile_image}`;
      setFullImageUrl(fullUrl);

      // Check if image is loadable
      const img = new Image();
      img.onload = () => {
        setImageStatus('Image loaded successfully');
      };
      img.onerror = () => {
        setImageStatus('Failed to load image');
      };
      img.src = fullUrl;
    } else {
      setImageStatus('No profile image set');
      setImageUrl('');
      setFullImageUrl('');
    }
  }, [user]);

  const handleRefresh = () => {
    refreshUserData();
  };

  const handleTestImage = () => {
    if (fullImageUrl) {
      window.open(fullImageUrl, '_blank');
    }
  };

  return (
    <div className="bg-black/80 text-white p-4 rounded-lg mt-4 border border-yalla-green">
      <h3 className="text-lg font-bold mb-2">Profile Image Debug</h3>
      <div className="space-y-2 text-sm">
        <div><strong>User ID:</strong> {user?.id || 'Not logged in'}</div>
        <div><strong>Image Path:</strong> {imageUrl || 'None'}</div>
        <div><strong>Full URL:</strong> {fullImageUrl || 'None'}</div>
        <div><strong>Status:</strong> {imageStatus}</div>
        <div><strong>API URL Env:</strong> {import.meta.env.VITE_API_URL || 'Not set'}</div>

        <div className="flex space-x-2 mt-4">
          <Button
            onClick={handleRefresh}
            className="bg-yalla-green text-black hover:bg-yalla-green/90"
          >
            Refresh User Data
          </Button>

          <Button
            onClick={handleTestImage}
            disabled={!fullImageUrl}
            className="bg-yalla-green text-black hover:bg-yalla-green/90"
          >
            Test Image URL
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageDebug;
