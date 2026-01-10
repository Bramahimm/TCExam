<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureSafeExamBrowser
{
    public function handle(Request $request, Closure $next)
    {
        $userAgent = $request->userAgent();

        // Deteksi Safe Exam Browser
        if (!$userAgent || !str_contains($userAgent, 'SEB')) {
            abort(403, 'Ujian hanya dapat diakses menggunakan Safe Exam Browser');
        }

        return $next($request);
    }
}
