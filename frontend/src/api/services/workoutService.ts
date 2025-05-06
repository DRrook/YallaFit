import apiClient from '../apiClient';

export interface WorkoutExercise {
  id: number;
  workout_id: number;
  exercise_id: number;
  order: number;
  sets?: number;
  reps?: number;
  duration_seconds?: number;
  rest_seconds?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  exercise?: any; // This would be the Exercise type when included
}

export interface Workout {
  id: number;
  name: string;
  slug: string;
  description?: string;
  duration_minutes?: number;
  difficulty_level: string;
  image_path?: string;
  is_public: boolean;
  user_id: number;
  category_id?: number;
  created_at: string;
  updated_at: string;
  exercises?: WorkoutExercise[];
  user?: any; // This would be the User type when included
  category?: any; // This would be the Category type when included
}

export interface WorkoutResponse {
  status: boolean;
  data: Workout[];
}

export interface SingleWorkoutResponse {
  status: boolean;
  data: Workout;
}

const workoutService = {
  // Get all workouts
  getWorkouts: async () => {
    const response = await apiClient.get<WorkoutResponse>('/workouts');
    return response.data;
  },
  
  // Get a single workout by ID
  getWorkout: async (id: number) => {
    const response = await apiClient.get<SingleWorkoutResponse>(`/workouts/${id}`);
    return response.data;
  },
  
  // Create a new workout
  createWorkout: async (workoutData: Partial<Workout>) => {
    const response = await apiClient.post<SingleWorkoutResponse>('/workouts', workoutData);
    return response.data;
  },
  
  // Update a workout
  updateWorkout: async (id: number, workoutData: Partial<Workout>) => {
    const response = await apiClient.put<SingleWorkoutResponse>(`/workouts/${id}`, workoutData);
    return response.data;
  },
  
  // Delete a workout
  deleteWorkout: async (id: number) => {
    const response = await apiClient.delete(`/workouts/${id}`);
    return response.data;
  },
  
  // Get user's workouts
  getUserWorkouts: async () => {
    const response = await apiClient.get<WorkoutResponse>('/user/workouts');
    return response.data;
  },
  
  // Save a workout for the user
  saveUserWorkout: async (workoutId: number, data: any) => {
    const response = await apiClient.post('/user/workouts', {
      workout_id: workoutId,
      ...data
    });
    return response.data;
  },
  
  // Update a user's saved workout
  updateUserWorkout: async (id: number, data: any) => {
    const response = await apiClient.put(`/user/workouts/${id}`, data);
    return response.data;
  },
  
  // Delete a user's saved workout
  deleteUserWorkout: async (id: number) => {
    const response = await apiClient.delete(`/user/workouts/${id}`);
    return response.data;
  }
};

export default workoutService;
