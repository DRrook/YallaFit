import apiClient from '../apiClient';

export interface Exercise {
  id: number;
  name: string;
  slug: string;
  description?: string;
  instructions?: string;
  difficulty_level: string;
  target_muscle_group?: string;
  equipment_needed?: string;
  video_url?: string;
  image_path?: string;
  category_id: number;
  created_at: string;
  updated_at: string;
}

export interface ExerciseResponse {
  status: boolean;
  data: Exercise[];
}

export interface SingleExerciseResponse {
  status: boolean;
  data: Exercise;
}

const exerciseService = {
  // Get all exercises
  getExercises: async () => {
    const response = await apiClient.get<ExerciseResponse>('/exercises');
    return response.data;
  },
  
  // Get a single exercise by ID
  getExercise: async (id: number) => {
    const response = await apiClient.get<SingleExerciseResponse>(`/exercises/${id}`);
    return response.data;
  },
  
  // Create a new exercise (admin only)
  createExercise: async (exerciseData: Partial<Exercise>) => {
    const response = await apiClient.post<SingleExerciseResponse>('/exercises', exerciseData);
    return response.data;
  },
  
  // Update an exercise (admin only)
  updateExercise: async (id: number, exerciseData: Partial<Exercise>) => {
    const response = await apiClient.put<SingleExerciseResponse>(`/exercises/${id}`, exerciseData);
    return response.data;
  },
  
  // Delete an exercise (admin only)
  deleteExercise: async (id: number) => {
    const response = await apiClient.delete(`/exercises/${id}`);
    return response.data;
  }
};

export default exerciseService;
