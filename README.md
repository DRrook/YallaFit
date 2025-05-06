# YallaFit

YallaFit is a fitness application that helps users track their workouts, create exercise plans, and achieve their fitness goals.

## Project Structure

The project is divided into two main parts:

1. **Backend**: A Laravel API with Sanctum authentication
2. **Frontend**: A React application with TypeScript and shadcn-ui components

## Features

- User authentication (register, login, logout)
- Different user roles (admin, coach, client)
- Exercise library with categories
- Workout creation and tracking
- User profiles

## Tech Stack

### Backend
- Laravel 12.x
- MySQL Database
- Laravel Sanctum for API authentication

### Frontend
- React with TypeScript
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling
- shadcn-ui component library

## Getting Started

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js and npm
- MySQL

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   composer install
   ```
3. Copy the example environment file:
   ```
   cp .env.example .env
   ```
4. Configure your database in the `.env` file
5. Run migrations:
   ```
   php artisan migrate
   ```
6. Start the server:
   ```
   php artisan serve
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login a user
- `POST /api/logout` - Logout a user (requires authentication)
- `GET /api/user` - Get the authenticated user (requires authentication)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get a specific category
- `POST /api/categories` - Create a new category (admin only)
- `PUT /api/categories/{id}` - Update a category (admin only)
- `DELETE /api/categories/{id}` - Delete a category (admin only)

### Exercises
- `GET /api/exercises` - Get all exercises
- `GET /api/exercises/{id}` - Get a specific exercise
- `POST /api/exercises` - Create a new exercise (admin/coach only)
- `PUT /api/exercises/{id}` - Update an exercise (admin/coach only)
- `DELETE /api/exercises/{id}` - Delete an exercise (admin/coach only)

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/{id}` - Get a specific workout
- `POST /api/workouts` - Create a new workout
- `PUT /api/workouts/{id}` - Update a workout
- `DELETE /api/workouts/{id}` - Delete a workout

## License

This project is licensed under the MIT License.
