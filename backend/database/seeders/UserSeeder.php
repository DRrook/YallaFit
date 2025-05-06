<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@yallafit.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'bio' => 'YallaFit administrator and fitness enthusiast.',
            'fitness_level' => 'advanced',
            'fitness_goals' => json_encode(['muscle_gain', 'strength']),
        ]);

        // Create coach user
        User::create([
            'name' => 'Coach User',
            'email' => 'coach@yallafit.com',
            'password' => Hash::make('password123'),
            'role' => 'coach',
            'bio' => 'Professional fitness coach with 5+ years of experience.',
            'fitness_level' => 'advanced',
            'fitness_goals' => json_encode(['strength', 'flexibility']),
        ]);

        // Create client user
        User::create([
            'name' => 'Client User',
            'email' => 'client@yallafit.com',
            'password' => Hash::make('password123'),
            'role' => 'client',
            'bio' => 'Fitness enthusiast looking to improve overall health.',
            'fitness_level' => 'beginner',
            'fitness_goals' => json_encode(['weight_loss', 'endurance']),
        ]);
    }
}
