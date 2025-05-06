<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkoutExercise extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'workout_id',
        'exercise_id',
        'order',
        'sets',
        'reps',
        'duration_seconds',
        'rest_seconds',
        'notes',
    ];

    /**
     * Get the workout that owns the workout exercise.
     */
    public function workout()
    {
        return $this->belongsTo(Workout::class);
    }

    /**
     * Get the exercise that owns the workout exercise.
     */
    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }
}
