<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Strength Training',
                'description' => 'Exercises focused on building muscle strength and power.',
                'image_path' => 'categories/strength.jpg',
            ],
            [
                'name' => 'Cardio',
                'description' => 'Exercises that increase heart rate and improve cardiovascular health.',
                'image_path' => 'categories/cardio.jpg',
            ],
            [
                'name' => 'Flexibility',
                'description' => 'Exercises that improve range of motion and prevent injury.',
                'image_path' => 'categories/flexibility.jpg',
            ],
            [
                'name' => 'HIIT',
                'description' => 'High-Intensity Interval Training for maximum calorie burn.',
                'image_path' => 'categories/hiit.jpg',
            ],
            [
                'name' => 'Yoga',
                'description' => 'Mind-body exercises that promote strength, flexibility, and mental well-being.',
                'image_path' => 'categories/yoga.jpg',
            ],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
                'image_path' => $category['image_path'],
            ]);
        }
    }
}
