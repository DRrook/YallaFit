<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'profile_image',
        'bio',
        'date_of_birth',
        'gender',
        'height',
        'weight',
        'fitness_level',
        'fitness_goals',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'fitness_goals' => 'json',
        ];
    }

    /**
     * Get the workouts created by the user.
     */
    public function workouts()
    {
        return $this->hasMany(Workout::class);
    }

    /**
     * Get the workouts completed by the user.
     */
    public function completedWorkouts()
    {
        return $this->hasMany(UserWorkout::class);
    }

    /**
     * Get all workouts that the user has saved or completed.
     */
    public function savedWorkouts()
    {
        return $this->belongsToMany(Workout::class, 'user_workouts')
            ->withTimestamps()
            ->withPivot(['completed_at', 'duration_minutes', 'notes', 'rating']);
    }
}
