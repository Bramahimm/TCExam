<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    public function create()
    {
        return inertia('Auth/Login');
    }

    public function store(LoginRequest $request)
    {
        $field = filter_var($request->login, FILTER_VALIDATE_EMAIL)
            ? 'email'
            : 'npm';

        if (! Auth::attempt(
            [$field => $request->login, 'password' => $request->password],
            $request->remember
        )) {
            throw ValidationException::withMessages([
                'login' => 'NPM / Email atau Password salah.',
            ]);
        }

        $request->session()->regenerate();

        $user = Auth::user();
        $user->update(['active_session_id' => session()->getId()]);

        return redirect()->intended(
            $user->role === 'admin'
                ? route('admin.dashboard')
                : route('peserta.dashboard')
        );
    }

    public function destroy()
    {
        $user = Auth::user();
        if ($user) {
            $user->update(['active_session_id' => null]);
        }

        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect()->route('login');
    }
}
