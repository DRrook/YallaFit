<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'instructions',
        'difficulty_level',
        'target_muscle_group',
        'equipment_needed',
        'video_url',
        'image_path',
        'category_id',
    ];

    /**
     * Get the category that owns the exercise.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the workouts that include this exercise.
     */
    public function workouts()
    {
        return $this->belongsToMany(Workout::class, 'workout_exercises')
            ->withTimestamps()
            ->withPivot(['order', 'sets', 'reps', 'duration_seconds', 'rest_seconds', 'notes']);
    }
}
