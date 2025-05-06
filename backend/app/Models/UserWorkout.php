<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserWorkout extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'workout_id',
        'completed_at',
        'duration_minutes',
        'notes',
        'rating',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'completed_at' => 'datetime',
    ];

    /**
     * Get the user that owns the user workout.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the workout that owns the user workout.
     */
    public function workout()
    {
        return $this->belongsTo(Workout::class);
    }
}
