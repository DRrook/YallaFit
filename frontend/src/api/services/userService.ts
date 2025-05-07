import apiClient from '../apiClient';

export interface ProfileUpdateData {
  name?: string;
  email?: string;
  bio?: string;
  phone?: string;
  specialization?: string;
  experience?: string;
  profile_image?: File;
}

export interface PasswordUpdateData {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface UserResponse {
  status: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
      profile_image?: string;
      bio?: string;
      phone?: string;
      specialization?: string;
      experience?: string;
      created_at: string;
      updated_at: string;
    };
  };
}

const userService = {
  // Update user profile
  updateProfile: async (profileData: ProfileUpdateData) => {
    try {
      console.log('Starting profile update with data:', {
        ...profileData,
        profile_image: profileData.profile_image ? 'File present' : 'No file'
      });

      // Create FormData for file upload
      const formData = new FormData();

      // Add all profile data to FormData
      Object.entries(profileData).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === 'profile_image' && value instanceof File) {
            console.log('Adding profile image to FormData:', {
              name: value.name,
              type: value.type,
              size: value.size
            });
          }
          formData.append(key, value);
        }
      });

      // Log FormData contents (for debugging)
      console.log('FormData entries:');
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1] instanceof File ? 'File object' : pair[1]}`);
      }

      const response = await apiClient.post<UserResponse>('/api/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Profile update response:', response.data);

      // Update user data in localStorage
      if (response.data.status && response.data.data.user) {
        const userData = response.data.data.user;
        console.log('Updating localStorage with user data:', {
          id: userData.id,
          name: userData.name,
          profile_image: userData.profile_image
        });

        localStorage.setItem('user', JSON.stringify(userData));
      }

      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // Update user password
  updatePassword: async (passwordData: PasswordUpdateData) => {
    try {
      const response = await apiClient.post('/api/user/password', passwordData);
      return response.data;
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  }
};

export default userService;
