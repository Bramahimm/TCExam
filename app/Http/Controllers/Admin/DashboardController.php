<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Test;
use App\Models\TestUser;
use App\Models\Result;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia('Admin/Dashboard', [
            'totalUsers' => User::where('role', 'peserta')->count(),
            'totalTests' => Test::count(),
            'ongoingTests' => TestUser::where('status', 'ongoing')->count(),
            'validatedResults' => Result::where('status', 'validated')->count(),
        ]);
    }
}
