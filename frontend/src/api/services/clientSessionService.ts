import apiClient from '../apiClient';
import { Session } from './sessionService';

export interface SessionsResponse {
  status: boolean;
  message: string;
  data: {
    sessions: Session[];
  };
}

export interface SessionResponse {
  status: boolean;
  message: string;
  data?: {
    session: Session;
  };
}

export interface SavedSessionsResponse {
  status: boolean;
  message: string;
  data: {
    savedSessions: Session[];
  };
}

export interface BookingResponse {
  status: boolean;
  message: string;
  data?: {
    booking: any;
  };
}

// Mock data for development
const mockSessions: Session[] = [
  {
    id: 1,
    title: 'Morning Yoga',
    description: 'Start your day with energizing yoga poses and breathing exercises. This session is perfect for beginners and intermediate practitioners looking to improve flexibility and mindfulness.',
    date: '2023-05-15',
    time: '08:00 AM',
    capacity: 10,
    enrolled: 5,
    price: 25,
    status: 'active',
    coach_id: 1
  },
  {
    id: 2,
    title: 'HIIT Workout',
    description: 'High-intensity interval training to boost your metabolism and burn calories. This challenging workout alternates between intense bursts of activity and fixed periods of less-intense activity or rest.',
    date: '2023-05-16',
    time: '05:00 PM',
    capacity: 8,
    enrolled: 8, // Full session
    price: 30,
    status: 'active',
    coach_id: 1
  },
  {
    id: 3,
    title: 'Meditation Session',
    description: 'Learn mindfulness techniques to reduce stress and improve focus. This guided meditation session will help you develop a regular practice for mental clarity and emotional balance.',
    date: '2023-05-20',
    time: '07:00 PM',
    capacity: 15,
    enrolled: 10,
    price: 20,
    status: 'active',
    coach_id: 2
  },
  {
    id: 4,
    title: 'Strength Training',
    description: 'Build muscle and improve strength with this comprehensive workout. This session focuses on proper form and technique for major compound movements to help you build functional strength.',
    date: '2023-05-18',
    time: '06:00 PM',
    capacity: 6,
    enrolled: 4,
    price: 35,
    status: 'active',
    coach_id: 3
  },
  {
    id: 5,
    title: 'Pilates Core Workout',
    description: 'Strengthen your core and improve posture with this Pilates-based session. This class focuses on controlled movements that enhance flexibility, strength, and body awareness.',
    date: '2023-05-19',
    time: '09:00 AM',
    capacity: 12,
    enrolled: 7,
    price: 28,
    status: 'active',
    coach_id: 2
  },
  {
    id: 6,
    title: 'Cardio Kickboxing',
    description: 'Burn calories and release stress with this high-energy kickboxing workout. Combining martial arts techniques with fast-paced cardio, this total-body workout will improve your coordination and endurance.',
    date: '2023-05-17',
    time: '06:30 PM',
    capacity: 10,
    enrolled: 6,
    price: 32,
    status: 'active',
    coach_id: 3
  },
  {
    id: 7,
    title: 'Gentle Stretching',
    description: 'Improve flexibility and reduce muscle tension with gentle stretching exercises. This relaxing session is perfect for recovery days or for those with limited mobility.',
    date: '2023-05-21',
    time: '10:00 AM',
    capacity: 15,
    enrolled: 8,
    price: 22,
    status: 'active',
    coach_id: 1
  },
  {
    id: 8,
    title: 'Advanced Weightlifting',
    description: 'Take your strength training to the next level with advanced weightlifting techniques. This session is designed for experienced lifters looking to improve their form and increase their lifts.',
    date: '2023-05-22',
    time: '07:30 PM',
    capacity: 5,
    enrolled: 3,
    price: 40,
    status: 'active',
    coach_id: 3
  }
];

// In-memory storage for mock data
let sessions = [...mockSessions];
let savedSessions: number[] = [1, 3]; // Mock saved sessions
let userBookings: any[] = []; // Mock user bookings

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const clientSessionService = {
  // Get all available sessions
  getAvailableSessions: async (): Promise<SessionsResponse> => {
    try {
      // Try to get from API first
      try {
        console.log('Fetching available sessions from API');
        const response = await apiClient.get<SessionsResponse>('/api/sessions');

        // Save to localStorage as backup
        if (response.data.status && response.data.data.sessions) {
          localStorage.setItem('available_sessions', JSON.stringify(response.data.data.sessions));
        }

        return {
          status: true,
          message: "Sessions retrieved successfully",
          data: {
            sessions: response.data.data.sessions.filter((s: Session) => s.status === 'active')
          }
        };
      } catch (apiError) {
        console.error('API error, falling back to localStorage or mock data:', apiError);

        // Try to get from localStorage
        const storedSessions = localStorage.getItem('available_sessions');
        if (storedSessions) {
          try {
            const parsedSessions = JSON.parse(storedSessions);
            return {
              status: true,
              message: "Sessions retrieved from local storage",
              data: {
                sessions: parsedSessions.filter((s: Session) => s.status === 'active')
              }
            };
          } catch (parseError) {
            console.error('Error parsing stored sessions:', parseError);
          }
        }

        // Fall back to mock data if API and localStorage fail
        return {
          status: true,
          message: "Sessions retrieved from mock data",
          data: {
            sessions: sessions.filter(s => s.status === 'active')
          }
        };
      }
    } catch (error) {
      console.error('Error fetching available sessions:', error);
      throw error;
    }
  },

  // Get user's saved sessions
  getSavedSessions: async (): Promise<SavedSessionsResponse> => {
    try {
      // Try to get from API first
      try {
        console.log('Fetching saved sessions from API');
        const response = await apiClient.get<SavedSessionsResponse>('/api/client/saved-sessions');

        // Save to localStorage as backup
        if (response.data.status && response.data.data.savedSessions) {
          localStorage.setItem('saved_sessions', JSON.stringify(response.data.data.savedSessions));
        }

        return response.data;
      } catch (apiError) {
        console.error('API error, falling back to localStorage or mock data:', apiError);

        // Try to get from localStorage
        const storedSavedSessions = localStorage.getItem('saved_sessions');
        if (storedSavedSessions) {
          try {
            const parsedSavedSessions = JSON.parse(storedSavedSessions);
            return {
              status: true,
              message: "Saved sessions retrieved from local storage",
              data: {
                savedSessions: parsedSavedSessions
              }
            };
          } catch (parseError) {
            console.error('Error parsing stored saved sessions:', parseError);
          }
        }

        // Fall back to mock data if API and localStorage fail
        const savedSessionsData = sessions.filter(s => savedSessions.includes(s.id));
        return {
          status: true,
          message: "Saved sessions retrieved from mock data",
          data: {
            savedSessions: savedSessionsData
          }
        };
      }
    } catch (error) {
      console.error('Error fetching saved sessions:', error);
      throw error;
    }
  },

  // Save a session
  saveSession: async (sessionId: number): Promise<{ status: boolean; message: string }> => {
    try {
      // Try to save via API first
      try {
        console.log('Saving session via API:', sessionId);
        const response = await apiClient.post('/api/client/save-session', { sessionId });

        // Update localStorage
        const storedSavedSessions = localStorage.getItem('saved_sessions');
        if (storedSavedSessions) {
          try {
            const parsedSavedSessions = JSON.parse(storedSavedSessions);
            const updatedSavedSessions = [...parsedSavedSessions, { id: sessionId }];
            localStorage.setItem('saved_sessions', JSON.stringify(updatedSavedSessions));
          } catch (parseError) {
            console.error('Error updating stored saved sessions:', parseError);
          }
        }

        return response.data;
      } catch (apiError) {
        console.error('API error, falling back to mock implementation:', apiError);

        // Mock implementation
        if (!savedSessions.includes(sessionId)) {
          savedSessions.push(sessionId);
        }

        return {
          status: true,
          message: "Session saved successfully (mock)"
        };
      }
    } catch (error) {
      console.error('Error saving session:', error);
      throw error;
    }
  },

  // Unsave a session
  unsaveSession: async (sessionId: number): Promise<{ status: boolean; message: string }> => {
    try {
      // Try to unsave via API first
      try {
        console.log('Unsaving session via API:', sessionId);
        const response = await apiClient.delete(`/api/client/saved-sessions/${sessionId}`);

        // Update localStorage
        const storedSavedSessions = localStorage.getItem('saved_sessions');
        if (storedSavedSessions) {
          try {
            const parsedSavedSessions = JSON.parse(storedSavedSessions);
            const updatedSavedSessions = parsedSavedSessions.filter((s: any) => s.id !== sessionId);
            localStorage.setItem('saved_sessions', JSON.stringify(updatedSavedSessions));
          } catch (parseError) {
            console.error('Error updating stored saved sessions:', parseError);
          }
        }

        return response.data;
      } catch (apiError) {
        console.error('API error, falling back to mock implementation:', apiError);

        // Mock implementation
        savedSessions = savedSessions.filter(id => id !== sessionId);

        return {
          status: true,
          message: "Session unsaved successfully (mock)"
        };
      }
    } catch (error) {
      console.error('Error unsaving session:', error);
      throw error;
    }
  },

  // Book a session
  bookSession: async (sessionId: number): Promise<BookingResponse> => {
    try {
      // Try to book via API first
      try {
        console.log('Booking session via API:', sessionId);
        const response = await apiClient.post('/api/client/book-session', { sessionId });
        return response.data;
      } catch (apiError) {
        console.error('API error, falling back to mock implementation:', apiError);

        // Mock implementation
        const sessionIndex = sessions.findIndex(s => s.id === sessionId);

        if (sessionIndex === -1) {
          return {
            status: false,
            message: "Session not found"
          };
        }

        const session = sessions[sessionIndex];

        // Check if session is full
        if (session.enrolled >= session.capacity) {
          return {
            status: false,
            message: "Session is already full"
          };
        }

        // Update session enrollment
        const updatedSession = {
          ...session,
          enrolled: session.enrolled + 1
        };

        sessions[sessionIndex] = updatedSession;

        // Add to user bookings
        const booking = {
          id: userBookings.length + 1,
          user_id: 1, // Mock user ID
          session_id: sessionId,
          status: 'confirmed',
          created_at: new Date().toISOString()
        };

        userBookings.push(booking);

        return {
          status: true,
          message: "Session booked successfully (mock)",
          data: {
            booking
          }
        };
      }
    } catch (error) {
      console.error('Error booking session:', error);
      throw error;
    }
  }
};

export default clientSessionService;
