<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workout extends Model
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
        'duration_minutes',
        'difficulty_level',
        'image_path',
        'is_public',
        'user_id',
        'category_id',
    ];

    /**
     * Get the user that created the workout.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category that the workout belongs to.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the exercises in the workout.
     */
    public function exercises()
    {
        return $this->belongsToMany(Exercise::class, 'workout_exercises')
            ->withTimestamps()
            ->withPivot(['order', 'sets', 'reps', 'duration_seconds', 'rest_seconds', 'notes'])
            ->orderBy('workout_exercises.order');
    }

    /**
     * Get the users who have saved or completed this workout.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_workouts')
            ->withTimestamps()
            ->withPivot(['completed_at', 'duration_minutes', 'notes', 'rating']);
    }
}
