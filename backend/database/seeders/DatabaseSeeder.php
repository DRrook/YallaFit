<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Run seeders in the correct order to maintain relationships
        $this->call([
            UserSeeder::class,        // First create users
            CategorySeeder::class,    // Then create categories
            ExerciseSeeder::class,    // Then create exercises (depends on categories)
            WorkoutSeeder::class,     // Finally create workouts (depends on users, categories, and exercises)
        ]);
    }
}
