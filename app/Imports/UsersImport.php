<?php

namespace App\Imports;

use App\Models\User;
use App\Models\Group;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToCollection;

class UsersImport implements ToCollection
{
    public function collection(Collection $rows)
    {
        // skip header
        $rows = $rows->slice(1);

        foreach ($rows as $row) {

            $name  = trim($row[0] ?? '');
            $npm   = trim($row[1] ?? '');
            $email = trim($row[2] ?? '');
            $groupName = trim($row[3] ?? '');

            // VALIDASI MINIMAL
            if (!$name || !$email || !$groupName) {
                continue;
            }

            // GROUP (ANGKATAN)
            $group = Group::firstOrCreate([
                'name' => $groupName,
            ]);

            // USER
            $user = User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => $name,
                    'npm' => $npm,
                    'password' => Hash::make('password123'),
                    'role' => 'peserta',
                    'is_active' => true,
                ]
            );

            // SYNC GROUP
            $user->groups()->syncWithoutDetaching([$group->id]);
        }
    }
}
