<?php

namespace App\Services\Analytics;

use App\Models\TestUser;

class StudentAnalyticsService
{
    public static function summary(int $userId): array
    {
        $testUsers = TestUser::with('result')
            ->where('user_id', $userId)
            ->where('status', 'submitted')
            ->get();

        $validated = $testUsers->where('result.status', 'validated');

        return [
            'total_tests'   => $testUsers->count(),
            'average_score' => round($validated->avg('result.total_score') ?? 0, 2),
            'highest_score' => $validated->max('result.total_score') ?? 0,
            'lowest_score'  => $validated->min('result.total_score') ?? 0,
        ];
    }
}