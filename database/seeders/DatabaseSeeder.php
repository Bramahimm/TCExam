<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Group;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | GROUP / ANGKATAN
        |--------------------------------------------------------------------------
        */
        $group = Group::firstOrCreate([
            'name' => 'Angkatan 2024',
        ], [
            'description' => 'Peserta Angkatan 2024',
        ]);

        /*
        |--------------------------------------------------------------------------
        | ADMIN
        |--------------------------------------------------------------------------
        */
        User::firstOrCreate(
            ['email' => 'admin@cbt.test'],
            [
                'name' => 'Admin CBT',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'is_active' => true,
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | PESERTA
        |--------------------------------------------------------------------------
        */
        $user = User::firstOrCreate(
            ['email' => 'user@cbt.test'],
            [
                'name' => 'Peserta CBT',
                'password' => Hash::make('user123'),
                'role' => 'peserta',
                'is_active' => true,
            ]
        );

        $user->groups()->syncWithoutDetaching([$group->id]);
    }
}