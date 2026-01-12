<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TestUser;

class TestUserController extends Controller
{
    public function index()
    {
        return inertia('Admin/TestUsers/Index', [
            'testUsers' => TestUser::with('user', 'test', 'result')
                ->latest()
                ->get(),
        ]);
    }

    public function show(TestUser $testUser)
    {
        return inertia('Admin/TestUsers/Show', [
            'testUser' => $testUser->load(
                'user',
                'test',
                'answers.question.answers',
                'result'
            ),
        ]);
    }
}
