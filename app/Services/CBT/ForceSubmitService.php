<?php

namespace App\Services\CBT;

use App\Models\TestUser;

class ForceSubmitService
{
    public static function force(TestUser $testUser, int $adminId): void
    {
        if (!in_array($testUser->status, ['ongoing', 'expired'])) {
            return;
        }

        $testUser->update([
            'status' => 'force_submitted',
            'finished_at' => now(),
        ]);

        if (!$testUser->result) {
            $testUser->result()->create([
                'total_score' => ScoringService::calculate($testUser),
                'status' => 'pending',
                'validated_by' => $adminId,
                'validated_at' => now(),
            ]);
        }
    }
}
