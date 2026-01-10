<?php

namespace App\Http\Controllers\Peserta;

use App\Http\Controllers\Controller;
use App\Models\TestUser;
use App\Services\Analytics\StudentAnalyticsService;
use App\Services\CBT\ExamStateService;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // 🔒 AUTO-EXPIRE SEMUA UJIAN YANG MASIH ONGOING
        foreach ($user->testUsers as $testUser) {
            ExamStateService::autoExpire($testUser);
        }

        return inertia('Peserta/Dashboard', [
            'summary' => StudentAnalyticsService::summary($user->id),
            'recentTests' => TestUser::with('test', 'result')
                ->where('user_id', $user->id)
                ->latest()
                ->limit(5)
                ->get(),
        ]);
    }
}
