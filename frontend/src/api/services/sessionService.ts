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
  coach_id?: number; // Optional for now, will be used when connected to real backend
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

// Initialize from localStorage or use mock data
const initializeSessions = (): Session[] => {
  const storedSessions = localStorage.getItem('coach_sessions');
  if (storedSessions) {
    try {
      return JSON.parse(storedSessions);
    } catch (error) {
      console.error('Error parsing stored sessions:', error);
      return [...mockSessions];
    }
  }
  return [...mockSessions];
};

// Get the next available ID
const getNextId = (sessions: Session[]): number => {
  if (sessions.length === 0) return 1;
  return Math.max(...sessions.map(s => s.id)) + 1;
};

// In-memory storage for mock data
let sessions = initializeSessions();
let nextId = getNextId(sessions);

// Save sessions to localStorage
const saveSessions = (updatedSessions: Session[]): void => {
  try {
    localStorage.setItem('coach_sessions', JSON.stringify(updatedSessions));
  } catch (error) {
    console.error('Error saving sessions to localStorage:', error);
  }
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const sessionService = {
  // Clear all sessions (for testing purposes)
  clearSessions: (): void => {
    sessions = [];
    nextId = 1;
    localStorage.removeItem('coach_sessions');
  },

  // Get all sessions for the current coach
  getSessions: async (): Promise<SessionsResponse> => {
    try {
      // Try to get from API first
      try {
        const response = await apiClient.get<SessionsResponse>('/api/sessions');

        // Save to localStorage as backup
        if (response.data.status && response.data.data.sessions) {
          saveSessions(response.data.data.sessions);
        }

        return response.data;
      } catch (apiError) {
        console.error('API error, falling back to localStorage:', apiError);

        // Fallback to localStorage if API fails
        return {
          status: true,
          message: "Sessions retrieved from local storage",
          data: {
            sessions: sessions
          }
        };
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }
  },

  // Get a single session by ID
  getSession: async (id: number): Promise<SessionResponse> => {
    try {
      // Try to get from API first
      try {
        const response = await apiClient.get<SessionResponse>(`/api/sessions/${id}`);
        return response.data;
      } catch (apiError) {
        console.error('API error, falling back to localStorage:', apiError);

        // Fallback to localStorage if API fails
        const session = sessions.find(s => s.id === id);

        if (!session) {
          throw new Error('Session not found');
        }

        return {
          status: true,
          message: "Session retrieved from local storage",
          data: {
            session
          }
        };
      }
    } catch (error) {
      console.error('Error fetching session:', error);
      throw error;
    }
  },

  // Create a new session
  createSession: async (sessionData: SessionCreateData): Promise<SessionResponse> => {
    try {
      // Try to create via API first
      try {
        const response = await apiClient.post<SessionResponse>('/api/sessions', sessionData);

        // Update local storage with the new session
        if (response.data.status && response.data.data.session) {
          const newSession = response.data.data.session;
          const updatedSessions = [...sessions, newSession];
          sessions = updatedSessions;
          saveSessions(updatedSessions);

          // Update nextId if necessary
          if (newSession.id >= nextId) {
            nextId = newSession.id + 1;
          }
        }

        return response.data;
      } catch (apiError) {
        console.error('API error, falling back to localStorage:', apiError);

        // Fallback to localStorage if API fails
        // Create new session locally
        const newSession: Session = {
          ...sessionData,
          id: nextId++,
          enrolled: 0,
          status: 'active'
        };

        // Update in-memory sessions
        const updatedSessions = [...sessions, newSession];
        sessions = updatedSessions;

        // Save to localStorage
        saveSessions(updatedSessions);

        return {
          status: true,
          message: "Session created in local storage (offline mode)",
          data: {
            session: newSession
          }
        };
      }
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  },

  // Update an existing session
  updateSession: async (sessionData: SessionUpdateData): Promise<SessionResponse> => {
    try {
      // Try to update via API first
      try {
        const response = await apiClient.put<SessionResponse>(`/api/sessions/${sessionData.id}`, sessionData);

        // Update local storage with the updated session
        if (response.data.status && response.data.data.session) {
          const updatedSession = response.data.data.session;
          const index = sessions.findIndex(s => s.id === sessionData.id);

          if (index !== -1) {
            const updatedSessions = [...sessions];
            updatedSessions[index] = updatedSession;
            sessions = updatedSessions;
            saveSessions(updatedSessions);
          }
        }

        return response.data;
      } catch (apiError) {
        console.error('API error, falling back to localStorage:', apiError);

        // Fallback to localStorage if API fails
        // Find session to update
        const index = sessions.findIndex(s => s.id === sessionData.id);

        if (index === -1) {
          throw new Error('Session not found');
        }

        // Create updated session object
        const updatedSession = {
          ...sessions[index],
          ...sessionData
        };

        // Update in-memory sessions
        const updatedSessions = [...sessions];
        updatedSessions[index] = updatedSession;
        sessions = updatedSessions;

        // Save to localStorage
        saveSessions(updatedSessions);

        return {
          status: true,
          message: "Session updated in local storage (offline mode)",
          data: {
            session: updatedSession
          }
        };
      }
    } catch (error) {
      console.error('Error updating session:', error);
      throw error;
    }
  },

  // Delete a session
  deleteSession: async (id: number): Promise<{ status: boolean; message: string }> => {
    try {
      // Try to delete via API first
      try {
        const response = await apiClient.delete(`/api/sessions/${id}`);

        // Update local storage
        const updatedSessions = sessions.filter(s => s.id !== id);
        sessions = updatedSessions;
        saveSessions(updatedSessions);

        return response.data;
      } catch (apiError) {
        console.error('API error, falling back to localStorage:', apiError);

        // Fallback to localStorage if API fails
        // Find session to delete
        const index = sessions.findIndex(s => s.id === id);

        if (index === -1) {
          throw new Error('Session not found');
        }

        // Update in-memory sessions
        const updatedSessions = sessions.filter(s => s.id !== id);
        sessions = updatedSessions;

        // Save to localStorage
        saveSessions(updatedSessions);

        return {
          status: true,
          message: "Session deleted in local storage (offline mode)"
        };
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  }
};

export default sessionService;
