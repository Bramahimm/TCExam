<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\TestUser;
use App\Services\CBT\ExamStateService;

class EnsureExamStateIsValid
{
    public function handle($request, Closure $next)
    {
        $testUser = $request->route('testUser');

        if ($testUser instanceof TestUser) {
            ExamStateService::autoExpire($testUser);
        }

        return $next($request);
    }
}
