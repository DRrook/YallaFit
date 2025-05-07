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
      // Create FormData for file upload
      const formData = new FormData();
      
      // Add all profile data to FormData
      Object.entries(profileData).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });
      
      const response = await apiClient.post<UserResponse>('/api/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Update user data in localStorage
      if (response.data.status && response.data.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
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
