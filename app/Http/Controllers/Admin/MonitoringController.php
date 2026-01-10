<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Test;
use App\Services\CBT\ExamStateService;

class MonitoringController extends Controller
{
    public function index(Test $test)
    {
        $testUsers = $test->testUsers()
            ->with('user')
            ->get();

        // 🔒 pastikan tidak ada ongoing palsu
        foreach ($testUsers as $testUser) {
            ExamStateService::autoExpire($testUser);
        }

        return inertia('Admin/Monitoring/Index', [
            'test' => $test,
            'participants' => $testUsers,
        ]);
    }
}
