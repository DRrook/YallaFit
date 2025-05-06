<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
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
        'image_path',
    ];

    /**
     * Get the exercises in this category.
     */
    public function exercises()
    {
        return $this->hasMany(Exercise::class);
    }

    /**
     * Get the workouts in this category.
     */
    public function workouts()
    {
        return $this->hasMany(Workout::class);
    }
}
