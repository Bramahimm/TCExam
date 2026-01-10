<?php

namespace App\Services\CBT;

use App\Models\TestUser;
use Carbon\Carbon;

class ExamTimeService
{
    public static function isStillRunning(TestUser $testUser): bool
    {
        $endTime = self::getEndTime($testUser);
        return now()->lessThanOrEqualTo($endTime);
    }

    public static function getEndTime(TestUser $testUser): Carbon
    {
        return $testUser->started_at
            ->copy()
            ->addMinutes($testUser->test->duration);
    }

    public static function remainingSeconds(TestUser $testUser): int
    {
        $seconds = now()->diffInSeconds(
            self::getEndTime($testUser),
            false
        );

        return max(0, $seconds);
    }
}
