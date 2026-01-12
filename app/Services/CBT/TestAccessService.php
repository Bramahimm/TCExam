<?php

namespace App\Services\CBT;

use App\Models\Test;
use App\Models\User;

class TestAccessService
{
    public static function canAccess(User $user, Test $test): bool
    {
        // Cek aktif
        if (!$test->is_active) {
            return false;
        }

        // Cek waktu
        now()->between($test->start_time, $test->end_time);

        // Cek angkatan
        return $test->groups()
            ->whereIn('groups.id', $user->groups->pluck('id'))
            ->exists();
    }
}
