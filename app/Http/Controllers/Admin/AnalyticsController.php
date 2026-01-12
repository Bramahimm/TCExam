<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Test;
use App\Models\User;
use App\Services\Analytics\TestAnalyticsService;
use App\Services\Analytics\StudentAnalyticsService;

class AnalyticsController extends Controller
{
    public function test(Test $test)
    {
        return inertia('Admin/Analytics/Test', [
            'test' => $test,
            'summary' => TestAnalyticsService::summary($test->id),
        ]);
    }

    public function student(User $user)
    {
        return inertia('Admin/Analytics/Student', [
            'user' => $user,
            'summary' => StudentAnalyticsService::summary($user->id),
        ]);
    }
}
