<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Exercise;
use App\Models\User;
use App\Models\Workout;
use App\Models\WorkoutExercise;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class WorkoutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get user IDs
        $adminId = User::where('email', 'admin@yallafit.com')->first()->id;

        // Get category IDs
        $strengthId = Category::where('name', 'Strength Training')->first()->id;
        $cardioId = Category::where('name', 'Cardio')->first()->id;
        $hiitId = Category::where('name', 'HIIT')->first()->id;

        // Create a strength training workout
        $strengthWorkout = Workout::create([
            'name' => 'Full Body Strength',
            'slug' => 'full-body-strength',
            'description' => 'A comprehensive full-body strength workout targeting all major muscle groups.',
            'duration_minutes' => 45,
            'difficulty_level' => 'intermediate',
            'is_public' => true,
            'user_id' => $adminId,
            'category_id' => $strengthId,
        ]);

        // Add exercises to the strength workout
        $strengthExercises = [
            [
                'name' => 'Push-up',
                'sets' => 3,
                'reps' => 12,
                'order' => 1,
            ],
            [
                'name' => 'Squat',
                'sets' => 3,
                'reps' => 15,
                'order' => 2,
            ],
            [
                'name' => 'Deadlift',
                'sets' => 3,
                'reps' => 10,
                'order' => 3,
            ],
        ];

        foreach ($strengthExercises as $index => $exerciseData) {
            $exercise = Exercise::where('name', $exerciseData['name'])->first();

            WorkoutExercise::create([
                'workout_id' => $strengthWorkout->id,
                'exercise_id' => $exercise->id,
                'order' => $exerciseData['order'],
                'sets' => $exerciseData['sets'],
                'reps' => $exerciseData['reps'],
                'rest_seconds' => 60,
            ]);
        }

        // Create a HIIT workout
        $hiitWorkout = Workout::create([
            'name' => 'Quick HIIT Blast',
            'slug' => 'quick-hiit-blast',
            'description' => 'A high-intensity interval training workout to maximize calorie burn in minimal time.',
            'duration_minutes' => 20,
            'difficulty_level' => 'intermediate',
            'is_public' => true,
            'user_id' => $adminId,
            'category_id' => $hiitId,
        ]);

        // Add exercises to the HIIT workout
        $hiitExercises = [
            [
                'name' => 'Burpee',
                'sets' => 4,
                'reps' => 10,
                'order' => 1,
            ],
            [
                'name' => 'Mountain Climber',
                'sets' => 4,
                'duration_seconds' => 30,
                'order' => 2,
            ],
            [
                'name' => 'Jumping Jacks',
                'sets' => 4,
                'duration_seconds' => 45,
                'order' => 3,
            ],
        ];

        foreach ($hiitExercises as $index => $exerciseData) {
            $exercise = Exercise::where('name', $exerciseData['name'])->first();

            $workoutExercise = [
                'workout_id' => $hiitWorkout->id,
                'exercise_id' => $exercise->id,
                'order' => $exerciseData['order'],
                'sets' => $exerciseData['sets'],
                'rest_seconds' => 30,
            ];

            if (isset($exerciseData['reps'])) {
                $workoutExercise['reps'] = $exerciseData['reps'];
            }

            if (isset($exerciseData['duration_seconds'])) {
                $workoutExercise['duration_seconds'] = $exerciseData['duration_seconds'];
            }

            WorkoutExercise::create($workoutExercise);
        }

        // Create a cardio workout
        $cardioWorkout = Workout::create([
            'name' => 'Cardio Endurance',
            'slug' => 'cardio-endurance',
            'description' => 'A cardio-focused workout to improve endurance and cardiovascular health.',
            'duration_minutes' => 30,
            'difficulty_level' => 'beginner',
            'is_public' => true,
            'user_id' => $adminId,
            'category_id' => $cardioId,
        ]);

        // Add exercises to the cardio workout
        $cardioExercises = [
            [
                'name' => 'Running',
                'duration_seconds' => 600, // 10 minutes
                'order' => 1,
            ],
            [
                'name' => 'Jumping Jacks',
                'sets' => 3,
                'duration_seconds' => 60,
                'order' => 2,
            ],
        ];

        foreach ($cardioExercises as $index => $exerciseData) {
            $exercise = Exercise::where('name', $exerciseData['name'])->first();

            $workoutExercise = [
                'workout_id' => $cardioWorkout->id,
                'exercise_id' => $exercise->id,
                'order' => $exerciseData['order'],
                'rest_seconds' => 60,
            ];

            if (isset($exerciseData['sets'])) {
                $workoutExercise['sets'] = $exerciseData['sets'];
            }

            if (isset($exerciseData['duration_seconds'])) {
                $workoutExercise['duration_seconds'] = $exerciseData['duration_seconds'];
            }

            WorkoutExercise::create($workoutExercise);
        }
    }
}
