import apiClient from '../apiClient';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_path?: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  status: boolean;
  data: Category[];
}

export interface SingleCategoryResponse {
  status: boolean;
  data: Category;
}

const categoryService = {
  // Get all categories
  getCategories: async () => {
    const response = await apiClient.get<CategoryResponse>('/categories');
    return response.data;
  },
  
  // Get a single category by ID
  getCategory: async (id: number) => {
    const response = await apiClient.get<SingleCategoryResponse>(`/categories/${id}`);
    return response.data;
  },
  
  // Create a new category (admin only)
  createCategory: async (categoryData: Partial<Category>) => {
    const response = await apiClient.post<SingleCategoryResponse>('/categories', categoryData);
    return response.data;
  },
  
  // Update a category (admin only)
  updateCategory: async (id: number, categoryData: Partial<Category>) => {
    const response = await apiClient.put<SingleCategoryResponse>(`/categories/${id}`, categoryData);
    return response.data;
  },
  
  // Delete a category (admin only)
  deleteCategory: async (id: number) => {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  }
};

export default categoryService;
