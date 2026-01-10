<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class EnsureSingleSession
{
    public function handle(Request $request, Closure $next)
    {
        /** @var User|null $user */
        $user = Auth::user();

        if (!$user) {
            return $next($request);
        }

        $currentSessionId = session()->getId();

        if (!$user->active_session_id) {
            $user->update([
                'active_session_id' => $currentSessionId,
            ]);
        }

        if ($user->active_session_id !== $currentSessionId) {
            Auth::logout();

            abort(403, 'Akun ini sedang digunakan di perangkat lain');
        }

        return $next($request);
    }
}
