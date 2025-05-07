import apiClient from '../apiClient';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role?: string;
}

export interface AuthResponse {
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
      fitness_level?: string;
      fitness_goals?: string[];
      created_at: string;
      updated_at: string;
    };
    token: string;
  };
}

const authService = {
  // Login user
  login: async (credentials: LoginCredentials) => {
    console.log('Login attempt with:', credentials.email);
    try {
      // First get CSRF cookie
      await apiClient.get('/sanctum/csrf-cookie');

      // Then attempt login
      console.log('Attempting login with API endpoint...');
      const response = await apiClient.post<AuthResponse>('/api/login', credentials);
      console.log('Login response:', response.data);

      // Store token and user data in localStorage
      if (response.data.status && response.data.data.token) {
        localStorage.setItem('auth_token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        console.log('Auth data stored in localStorage');
      }

      return response.data;
    } catch (error) {
      console.error('Login error in service:', error);
      throw error;
    }
  },

  // Register new user
  register: async (userData: RegisterData) => {
    console.log('Register attempt with:', userData.email);
    try {
      // First get CSRF cookie
      await apiClient.get('/sanctum/csrf-cookie');

      // Then attempt registration
      console.log('Attempting registration with API endpoint...');
      const response = await apiClient.post<AuthResponse>('/api/register', userData);
      console.log('Register response:', response.data);

      // Store token and user data in localStorage
      if (response.data.status && response.data.data.token) {
        localStorage.setItem('auth_token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        console.log('Auth data stored in localStorage');
      }

      return response.data;
    } catch (error) {
      console.error('Register error in service:', error);
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    console.log('AuthService - Logout called');
    try {
      console.log('AuthService - Calling API logout endpoint');
      await apiClient.post('/api/logout');
      console.log('AuthService - API logout successful');
    } catch (error) {
      console.error('AuthService - API logout error:', error);
    } finally {
      // Clear local storage regardless of API response
      console.log('AuthService - Clearing localStorage');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      console.log('AuthService - LocalStorage cleared, current state:', {
        token: localStorage.getItem('auth_token'),
        user: localStorage.getItem('user')
      });
    }
  },

  // Get current authenticated user
  user: async () => {
    try {
      const response = await apiClient.get('/api/user');

      // Store updated user data in localStorage
      if (response.data.status && response.data.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },

  // Alias for backward compatibility
  getCurrentUser: async () => {
    return await authService.user();
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },

  // Get user role
  getUserRole: () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).role;
    }
    return null;
  }
};

export default authService;
