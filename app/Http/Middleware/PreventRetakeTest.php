<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\TestUser;
use Illuminate\Support\Facades\Auth;

class PreventRetakeTest
{
    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        $test = $request->route('test');

        if (!$test) {
            return $next($request);
        }

        $testUser = TestUser::where('test_id', $test->id)
            ->where('user_id', $user->id)
            ->first();

        if (!$testUser) {
            return $next($request);
        }

        if (in_array($testUser->status, ['submitted', 'expired'])) {
            abort(403, 'Anda sudah menyelesaikan ujian ini');
        }

        return $next($request);
    }
}
