<?php

namespace App\Services\CBT;

use App\Models\TestUser;
use Carbon\Carbon;

class ExamTimeService
{
    /**
     * Apakah waktu ujian masih tersedia
     */
    public static function isStillRunning(TestUser $testUser): bool
    {
        $endTime = self::getEndTime($testUser);
        return now()->lessThanOrEqualTo($endTime);
    }

    /**
     * Waktu berakhir ujian peserta
     */
    public static function getEndTime(TestUser $testUser): Carbon
    {
        // 🔒 HARD GUARD (ANTI CRASH)
        if (is_null($testUser->started_at)) {
            return now(); // fallback aman
        }

        return $testUser->started_at
            ->copy()
            ->addMinutes($testUser->test->duration);
    }


    /**
     * Sisa waktu (detik)
     */
    public static function remainingSeconds(TestUser $testUser): int
    {
        $seconds = now()->diffInSeconds(
            self::getEndTime($testUser),
            false
        );

        return max(0, $seconds);
    }
}
