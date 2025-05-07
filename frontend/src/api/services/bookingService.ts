import apiClient from '../apiClient';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  profile_image?: string;
}

export interface Session {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  capacity: number;
  enrolled: number;
  price: number;
  status: 'active' | 'completed';
  coach_id: number;
}

export interface Booking {
  id: number;
  user_id: number;
  session_id: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paid_amount: number;
  created_at: string;
  updated_at: string;
  user: User;
  session: Session;
}

export interface BookingsResponse {
  status: boolean;
  message: string;
  data: {
    bookings: Booking[];
  };
}

export interface BookingResponse {
  status: boolean;
  message: string;
  data?: {
    booking: Booking;
  };
}

// Mock data for development
const mockBookings: Booking[] = [
  {
    id: 1,
    user_id: 2,
    session_id: 1,
    status: 'confirmed',
    paid_amount: 25,
    created_at: '2023-05-01T10:00:00',
    updated_at: '2023-05-01T10:30:00',
    user: {
      id: 2,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      role: 'client',
      profile_image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    session: {
      id: 1,
      title: 'Morning Yoga',
      description: 'Start your day with energizing yoga poses and breathing exercises.',
      date: '2023-05-15',
      time: '08:00 AM',
      capacity: 10,
      enrolled: 5,
      price: 25,
      status: 'active',
      coach_id: 1
    }
  },
  {
    id: 2,
    user_id: 3,
    session_id: 2,
    status: 'pending',
    paid_amount: 30,
    created_at: '2023-05-02T14:00:00',
    updated_at: '2023-05-02T14:00:00',
    user: {
      id: 3,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'client',
      profile_image: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    session: {
      id: 2,
      title: 'HIIT Workout',
      description: 'High-intensity interval training to boost your metabolism and burn calories.',
      date: '2023-05-16',
      time: '05:00 PM',
      capacity: 8,
      enrolled: 3,
      price: 30,
      status: 'active',
      coach_id: 1
    }
  },
  {
    id: 3,
    user_id: 4,
    session_id: 3,
    status: 'completed',
    paid_amount: 20,
    created_at: '2023-04-15T09:00:00',
    updated_at: '2023-04-15T10:00:00',
    user: {
      id: 4,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '987-654-3210',
      role: 'client'
    },
    session: {
      id: 3,
      title: 'Meditation Session',
      description: 'Learn mindfulness techniques to reduce stress and improve focus.',
      date: '2023-04-20',
      time: '07:00 PM',
      capacity: 15,
      enrolled: 10,
      price: 20,
      status: 'completed',
      coach_id: 1
    }
  },
  {
    id: 4,
    user_id: 5,
    session_id: 4,
    status: 'cancelled',
    paid_amount: 0,
    created_at: '2023-05-03T11:00:00',
    updated_at: '2023-05-03T12:00:00',
    user: {
      id: 5,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'client',
      profile_image: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    session: {
      id: 4,
      title: 'Strength Training',
      description: 'Build muscle and improve strength with this comprehensive workout.',
      date: '2023-05-18',
      time: '06:00 PM',
      capacity: 6,
      enrolled: 4,
      price: 35,
      status: 'active',
      coach_id: 1
    }
  }
];

// In-memory storage for mock data
let bookings = [...mockBookings];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const bookingService = {
  // Get all bookings for the current coach
  getCoachBookings: async (): Promise<BookingsResponse> => {
    try {
      // Simulate API call delay
      await delay(800);
      
      // In a real implementation, this would call the API
      // const response = await apiClient.get<BookingsResponse>('/api/coach/bookings');
      // return response.data;
      
      // Mock implementation
      return {
        status: true,
        message: "Bookings retrieved successfully",
        data: {
          bookings: bookings
        }
      };
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },
  
  // Update booking status (confirm or cancel)
  updateBookingStatus: async (bookingId: number, status: string): Promise<BookingResponse> => {
    try {
      // Simulate API call delay
      await delay(1000);
      
      // In a real implementation, this would call the API
      // const response = await apiClient.put<BookingResponse>(`/api/bookings/${bookingId}/status`, { status });
      // return response.data;
      
      // Mock implementation
      const bookingIndex = bookings.findIndex(b => b.id === bookingId);
      
      if (bookingIndex === -1) {
        throw new Error('Booking not found');
      }
      
      // Update booking status
      const updatedBooking = {
        ...bookings[bookingIndex],
        status: status as 'pending' | 'confirmed' | 'cancelled' | 'completed',
        updated_at: new Date().toISOString()
      };
      
      bookings[bookingIndex] = updatedBooking;
      
      return {
        status: true,
        message: `Booking ${status} successfully`,
        data: {
          booking: updatedBooking
        }
      };
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  }
};

export default bookingService;
