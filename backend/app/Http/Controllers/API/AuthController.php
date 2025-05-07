<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        // Debug: Log the registration attempt
        \Log::info('Registration attempt', ['data' => $request->all()]);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            \Log::warning('Registration validation failed', ['errors' => $validator->errors()]);
            return response()->json([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role ?? 'client', // Default to client if not specified
            ]);

            \Log::info('User created successfully', ['user_id' => $user->id]);
            $token = $user->createToken('auth_token')->plainTextToken;
            \Log::info('Token created', ['user_id' => $user->id]);
        } catch (\Exception $e) {
            \Log::error('Error creating user', ['error' => $e->getMessage()]);
            return response()->json([
                'status' => false,
                'message' => 'Error creating user',
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'status' => true,
            'message' => 'User registered successfully',
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ], 201);
    }

    /**
     * Login user and create token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        // Debug: Log the request data
        \Log::info('Login attempt', ['email' => $request->email]);

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            \Log::warning('Login validation failed', ['errors' => $validator->errors()]);
            return response()->json([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Debug: Log authentication attempt
        \Log::info('Attempting authentication', ['email' => $request->email]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            \Log::warning('Authentication failed', ['email' => $request->email]);
            return response()->json([
                'status' => false,
                'message' => 'Invalid login credentials'
            ], 401);
        }

        \Log::info('Authentication successful', ['email' => $request->email]);

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        \Log::info('Token created', ['user_id' => $user->id]);

        return response()->json([
            'status' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ], 200);
    }

    /**
     * Logout user (revoke the token).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Successfully logged out'
        ], 200);
    }

    /**
     * Get the authenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function user(Request $request)
    {
        // Get the authenticated user with fresh data
        $user = $request->user()->fresh();

        // Log the user data for debugging
        \Log::info('User data retrieved', [
            'user_id' => $user->id,
            'has_profile_image' => !empty($user->profile_image)
        ]);

        return response()->json([
            'status' => true,
            'data' => [
                'user' => $user
            ]
        ], 200);
    }
}
