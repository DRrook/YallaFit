<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Exercise;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get category IDs
        $strengthId = Category::where('name', 'Strength Training')->first()->id;
        $cardioId = Category::where('name', 'Cardio')->first()->id;
        $flexibilityId = Category::where('name', 'Flexibility')->first()->id;
        $hiitId = Category::where('name', 'HIIT')->first()->id;
        $yogaId = Category::where('name', 'Yoga')->first()->id;

        // Strength Training Exercises
        $strengthExercises = [
            [
                'name' => 'Push-up',
                'description' => 'A classic bodyweight exercise that targets the chest, shoulders, and triceps.',
                'instructions' => 'Start in a plank position with hands shoulder-width apart. Lower your body until your chest nearly touches the floor, then push back up.',
                'difficulty_level' => 'beginner',
                'target_muscle_group' => 'chest, shoulders, triceps',
                'equipment_needed' => 'none',
                'category_id' => $strengthId,
            ],
            [
                'name' => 'Squat',
                'description' => 'A compound exercise that targets the quadriceps, hamstrings, and glutes.',
                'instructions' => 'Stand with feet shoulder-width apart. Lower your body by bending your knees and pushing your hips back, as if sitting in a chair. Return to standing position.',
                'difficulty_level' => 'beginner',
                'target_muscle_group' => 'quadriceps, hamstrings, glutes',
                'equipment_needed' => 'none',
                'category_id' => $strengthId,
            ],
            [
                'name' => 'Deadlift',
                'description' => 'A compound exercise that targets the lower back, hamstrings, and glutes.',
                'instructions' => 'Stand with feet hip-width apart, barbell over midfoot. Bend at hips and knees to grip the bar. Lift the bar by extending hips and knees, keeping back straight.',
                'difficulty_level' => 'intermediate',
                'target_muscle_group' => 'lower back, hamstrings, glutes',
                'equipment_needed' => 'barbell, weights',
                'category_id' => $strengthId,
            ],
        ];

        // Cardio Exercises
        $cardioExercises = [
            [
                'name' => 'Running',
                'description' => 'A high-impact cardio exercise that improves cardiovascular health and burns calories.',
                'instructions' => 'Start with a warm-up walk, then gradually increase to a jog or run. Maintain good posture with shoulders relaxed.',
                'difficulty_level' => 'beginner',
                'target_muscle_group' => 'legs, core',
                'equipment_needed' => 'running shoes',
                'category_id' => $cardioId,
            ],
            [
                'name' => 'Jumping Jacks',
                'description' => 'A full-body cardio exercise that increases heart rate and improves coordination.',
                'instructions' => 'Start with feet together and arms at sides. Jump feet out to sides while raising arms overhead, then return to starting position.',
                'difficulty_level' => 'beginner',
                'target_muscle_group' => 'full body',
                'equipment_needed' => 'none',
                'category_id' => $cardioId,
            ],
        ];

        // HIIT Exercises
        $hiitExercises = [
            [
                'name' => 'Burpee',
                'description' => 'A high-intensity exercise that combines a squat, push-up, and jump.',
                'instructions' => 'Start standing, drop into a squat position, kick feet back into a plank, do a push-up, jump feet back to squat, then explosively jump up.',
                'difficulty_level' => 'intermediate',
                'target_muscle_group' => 'full body',
                'equipment_needed' => 'none',
                'category_id' => $hiitId,
            ],
            [
                'name' => 'Mountain Climber',
                'description' => 'A dynamic exercise that targets the core, shoulders, and legs.',
                'instructions' => 'Start in a plank position. Rapidly alternate bringing knees toward chest, as if running in place in a plank position.',
                'difficulty_level' => 'intermediate',
                'target_muscle_group' => 'core, shoulders, legs',
                'equipment_needed' => 'none',
                'category_id' => $hiitId,
            ],
        ];

        // Flexibility Exercises
        $flexibilityExercises = [
            [
                'name' => 'Hamstring Stretch',
                'description' => 'A stretch that targets the hamstrings and improves flexibility in the back of the legs.',
                'instructions' => 'Sit on the floor with one leg extended and the other bent. Reach toward the toes of the extended leg, holding for 20-30 seconds.',
                'difficulty_level' => 'beginner',
                'target_muscle_group' => 'hamstrings',
                'equipment_needed' => 'none',
                'category_id' => $flexibilityId,
            ],
            [
                'name' => 'Shoulder Stretch',
                'description' => 'A stretch that improves flexibility in the shoulders and upper back.',
                'instructions' => 'Bring one arm across your chest, use the other arm to gently pull the elbow toward your chest. Hold for 20-30 seconds.',
                'difficulty_level' => 'beginner',
                'target_muscle_group' => 'shoulders, upper back',
                'equipment_needed' => 'none',
                'category_id' => $flexibilityId,
            ],
        ];

        // Yoga Exercises
        $yogaExercises = [
            [
                'name' => 'Downward Dog',
                'description' => 'A yoga pose that stretches the hamstrings, calves, and shoulders.',
                'instructions' => 'Start on hands and knees. Lift hips up and back, forming an inverted V shape. Press heels toward the floor and relax head between arms.',
                'difficulty_level' => 'beginner',
                'target_muscle_group' => 'hamstrings, calves, shoulders',
                'equipment_needed' => 'yoga mat',
                'category_id' => $yogaId,
            ],
            [
                'name' => 'Warrior II',
                'description' => 'A standing yoga pose that strengthens legs and improves focus.',
                'instructions' => 'Step feet wide apart. Turn one foot out 90 degrees, the other in slightly. Bend the front knee, extend arms parallel to floor, and gaze over front hand.',
                'difficulty_level' => 'beginner',
                'target_muscle_group' => 'legs, core',
                'equipment_needed' => 'yoga mat',
                'category_id' => $yogaId,
            ],
        ];

        // Combine all exercises
        $allExercises = array_merge($strengthExercises, $cardioExercises, $hiitExercises, $flexibilityExercises, $yogaExercises);

        // Create exercises
        foreach ($allExercises as $exercise) {
            Exercise::create([
                'name' => $exercise['name'],
                'slug' => Str::slug($exercise['name']),
                'description' => $exercise['description'],
                'instructions' => $exercise['instructions'],
                'difficulty_level' => $exercise['difficulty_level'],
                'target_muscle_group' => $exercise['target_muscle_group'],
                'equipment_needed' => $exercise['equipment_needed'],
                'category_id' => $exercise['category_id'],
            ]);
        }
    }
}
