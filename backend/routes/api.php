<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ExerciseController;
use App\Http\Controllers\API\SessionController;
use App\Http\Controllers\API\TestController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\UserWorkoutController;
use App\Http\Controllers\API\WorkoutController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('test', [TestController::class, 'index']);

// Public API routes
Route::get('categories', [CategoryController::class, 'index']);
Route::get('categories/{id}', [CategoryController::class, 'show']);
Route::get('exercises', [ExerciseController::class, 'index']);
Route::get('exercises/{id}', [ExerciseController::class, 'show']);
Route::get('workouts', [WorkoutController::class, 'index']);
Route::get('workouts/{id}', [WorkoutController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // User routes
    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('user/profile', [UserController::class, 'updateProfile']);
    Route::post('user/password', [UserController::class, 'updatePassword']);

    // Category routes (admin only)
    Route::post('categories', [CategoryController::class, 'store']);
    Route::put('categories/{id}', [CategoryController::class, 'update']);
    Route::delete('categories/{id}', [CategoryController::class, 'destroy']);

    // Exercise routes (admin only)
    Route::post('exercises', [ExerciseController::class, 'store']);
    Route::put('exercises/{id}', [ExerciseController::class, 'update']);
    Route::delete('exercises/{id}', [ExerciseController::class, 'destroy']);

    // Workout routes
    Route::post('workouts', [WorkoutController::class, 'store']);
    Route::put('workouts/{id}', [WorkoutController::class, 'update']);
    Route::delete('workouts/{id}', [WorkoutController::class, 'destroy']);

    // User workout routes
    Route::get('user/workouts', [UserWorkoutController::class, 'index']);
    Route::post('user/workouts', [UserWorkoutController::class, 'store']);
    Route::get('user/workouts/{id}', [UserWorkoutController::class, 'show']);
    Route::put('user/workouts/{id}', [UserWorkoutController::class, 'update']);
    Route::delete('user/workouts/{id}', [UserWorkoutController::class, 'destroy']);

    // Session routes
    Route::get('sessions', [SessionController::class, 'index']);
    Route::post('sessions', [SessionController::class, 'store']);
    Route::get('sessions/{id}', [SessionController::class, 'show']);
    Route::put('sessions/{id}', [SessionController::class, 'update']);
    Route::delete('sessions/{id}', [SessionController::class, 'destroy']);
});
