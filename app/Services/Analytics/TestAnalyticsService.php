<?php

namespace App\Services\Analytics;

use App\Models\TestUser;

class TestAnalyticsService
{
    public static function summary(int $testId): array
    {
        $data = TestUser::with('result')
            ->where('test_id', $testId)
            ->get();

        $validated = $data->where('result.status', 'validated');

        return [
            'participants' => $data->count(),
            'average'      => round($validated->avg('result.total_score') ?? 0, 2),
            'max'          => $validated->max('result.total_score') ?? 0,
            'min'          => $validated->min('result.total_score') ?? 0,
        ];
    }
}
