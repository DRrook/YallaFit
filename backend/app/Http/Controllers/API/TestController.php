<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TestController extends Controller
{
    /**
     * Return a simple test response.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'status' => true,
            'message' => 'API is working!',
            'data' => [
                'name' => 'YallaFit API',
                'version' => '1.0.0'
            ]
        ], 200);
    }
}
