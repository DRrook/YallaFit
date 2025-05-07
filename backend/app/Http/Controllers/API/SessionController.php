<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Session;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $user = Auth::user();

            // If user is a coach, show only their sessions
            if ($user->role === 'coach') {
                $sessions = Session::where('coach_id', $user->id)
                    ->orderBy('date', 'desc')
                    ->get();
            }
            // If user is a client, show all active sessions
            else {
                $sessions = Session::where('status', 'active')
                    ->where('date', '>=', now()->format('Y-m-d'))
                    ->orderBy('date', 'asc')
                    ->get();

                // Add enrollment status for the user
                $sessions->each(function ($session) use ($user) {
                    $enrollment = Enrollment::where('session_id', $session->id)
                        ->where('user_id', $user->id)
                        ->first();

                    $session->is_enrolled = !is_null($enrollment);
                    $session->enrollment_status = $enrollment ? $enrollment->status : null;
                });
            }

            return response()->json([
                'status' => true,
                'message' => 'Sessions retrieved successfully',
                'data' => [
                    'sessions' => $sessions
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve sessions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            // Only coaches can create sessions
            if ($user->role !== 'coach') {
                return response()->json([
                    'status' => false,
                    'message' => 'Only coaches can create sessions'
                ], 403);
            }

            // Validate request
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'date' => 'required|date|after_or_equal:today',
                'time' => 'required|string',
                'capacity' => 'required|integer|min:1',
                'price' => 'required|numeric|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Create session
            $session = new Session($request->all());
            $session->coach_id = $user->id;
            $session->status = 'active';
            $session->save();

            return response()->json([
                'status' => true,
                'message' => 'Session created successfully',
                'data' => [
                    'session' => $session
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to create session',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $user = Auth::user();
            $session = Session::findOrFail($id);

            // If user is a coach, check if they own the session
            if ($user->role === 'coach' && $session->coach_id !== $user->id) {
                return response()->json([
                    'status' => false,
                    'message' => 'You do not have permission to view this session'
                ], 403);
            }

            // If user is a client, add enrollment status
            if ($user->role === 'client') {
                $enrollment = Enrollment::where('session_id', $session->id)
                    ->where('user_id', $user->id)
                    ->first();

                $session->is_enrolled = !is_null($enrollment);
                $session->enrollment_status = $enrollment ? $enrollment->status : null;
            }

            return response()->json([
                'status' => true,
                'message' => 'Session retrieved successfully',
                'data' => [
                    'session' => $session
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve session',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $user = Auth::user();
            $session = Session::findOrFail($id);

            // Only the coach who created the session can update it
            if ($user->role !== 'coach' || $session->coach_id !== $user->id) {
                return response()->json([
                    'status' => false,
                    'message' => 'You do not have permission to update this session'
                ], 403);
            }

            // Validate request
            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'date' => 'sometimes|required|date',
                'time' => 'sometimes|required|string',
                'capacity' => 'sometimes|required|integer|min:1',
                'price' => 'sometimes|required|numeric|min:0',
                'status' => 'sometimes|required|in:active,completed',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Check if reducing capacity would affect existing enrollments
            if ($request->has('capacity') && $request->capacity < $session->enrolled) {
                return response()->json([
                    'status' => false,
                    'message' => 'Cannot reduce capacity below the number of enrolled users'
                ], 422);
            }

            // Update session
            $session->update($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Session updated successfully',
                'data' => [
                    'session' => $session
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to update session',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $user = Auth::user();
            $session = Session::findOrFail($id);

            // Only the coach who created the session can delete it
            if ($user->role !== 'coach' || $session->coach_id !== $user->id) {
                return response()->json([
                    'status' => false,
                    'message' => 'You do not have permission to delete this session'
                ], 403);
            }

            // Check if there are any enrollments
            $enrollmentCount = Enrollment::where('session_id', $id)->count();
            if ($enrollmentCount > 0) {
                return response()->json([
                    'status' => false,
                    'message' => 'Cannot delete a session with enrollments. Mark it as completed instead.'
                ], 422);
            }

            // Delete session
            $session->delete();

            return response()->json([
                'status' => true,
                'message' => 'Session deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete session',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
