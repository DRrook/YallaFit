import apiClient from '../apiClient';

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
}

export interface SessionCreateData {
  title: string;
  description: string;
  date: string;
  time: string;
  capacity: number;
  price: number;
}

export interface SessionUpdateData extends Partial<SessionCreateData> {
  id: number;
}

export interface SessionResponse {
  status: boolean;
  message: string;
  data: {
    session: Session;
  };
}

export interface SessionsResponse {
  status: boolean;
  message: string;
  data: {
    sessions: Session[];
  };
}

// Mock data for sessions
const mockSessions: Session[] = [
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

// In-memory storage for mock data
let sessions = [...mockSessions];
let nextId = sessions.length + 1;

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const sessionService = {
  // Get all sessions for the current coach
  getSessions: async (): Promise<SessionsResponse> => {
    try {
      // Simulate API call delay
      await delay(800);
      
      // In a real implementation, this would call the API
      // const response = await apiClient.get<SessionsResponse>('/api/sessions');
      // return response.data;
      
      // Mock implementation
      return {
        status: true,
        message: "Sessions retrieved successfully",
        data: {
          sessions: sessions
        }
      };
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }
  },
  
  // Get a single session by ID
  getSession: async (id: number): Promise<SessionResponse> => {
    try {
      // Simulate API call delay
      await delay(500);
      
      // In a real implementation, this would call the API
      // const response = await apiClient.get<SessionResponse>(`/api/sessions/${id}`);
      // return response.data;
      
      // Mock implementation
      const session = sessions.find(s => s.id === id);
      
      if (!session) {
        throw new Error('Session not found');
      }
      
      return {
        status: true,
        message: "Session retrieved successfully",
        data: {
          session
        }
      };
    } catch (error) {
      console.error('Error fetching session:', error);
      throw error;
    }
  },
  
  // Create a new session
  createSession: async (sessionData: SessionCreateData): Promise<SessionResponse> => {
    try {
      // Simulate API call delay
      await delay(1000);
      
      // In a real implementation, this would call the API
      // const response = await apiClient.post<SessionResponse>('/api/sessions', sessionData);
      // return response.data;
      
      // Mock implementation
      const newSession: Session = {
        ...sessionData,
        id: nextId++,
        enrolled: 0,
        status: 'active'
      };
      
      sessions.push(newSession);
      
      return {
        status: true,
        message: "Session created successfully",
        data: {
          session: newSession
        }
      };
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  },
  
  // Update an existing session
  updateSession: async (sessionData: SessionUpdateData): Promise<SessionResponse> => {
    try {
      // Simulate API call delay
      await delay(1000);
      
      // In a real implementation, this would call the API
      // const response = await apiClient.put<SessionResponse>(`/api/sessions/${sessionData.id}`, sessionData);
      // return response.data;
      
      // Mock implementation
      const index = sessions.findIndex(s => s.id === sessionData.id);
      
      if (index === -1) {
        throw new Error('Session not found');
      }
      
      const updatedSession = {
        ...sessions[index],
        ...sessionData
      };
      
      sessions[index] = updatedSession;
      
      return {
        status: true,
        message: "Session updated successfully",
        data: {
          session: updatedSession
        }
      };
    } catch (error) {
      console.error('Error updating session:', error);
      throw error;
    }
  },
  
  // Delete a session
  deleteSession: async (id: number): Promise<{ status: boolean; message: string }> => {
    try {
      // Simulate API call delay
      await delay(800);
      
      // In a real implementation, this would call the API
      // const response = await apiClient.delete(`/api/sessions/${id}`);
      // return response.data;
      
      // Mock implementation
      const index = sessions.findIndex(s => s.id === id);
      
      if (index === -1) {
        throw new Error('Session not found');
      }
      
      sessions = sessions.filter(s => s.id !== id);
      
      return {
        status: true,
        message: "Session deleted successfully"
      };
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  }
};

export default sessionService;
