<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DisableCsrfProtection
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Completely bypass CSRF protection
        app()['session']->forget('_token');
        $request->cookies->remove('XSRF-TOKEN');

        // Add a log entry to confirm this middleware is running
        \Log::info('CSRF protection disabled for request: ' . $request->fullUrl());

        return $next($request);
    }
}
