<?php

namespace App\Services\CBT;

use App\Models\TestUser;

class ScoringService
{
    public static function calculate(TestUser $testUser): int
    {
        return $testUser->answers()
            ->where('is_correct', true)
            ->sum('score');
    }
}
