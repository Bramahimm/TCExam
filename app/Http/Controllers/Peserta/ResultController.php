<?php

namespace App\Http\Controllers\Peserta;

use App\Http\Controllers\Controller;
use App\Models\TestUser;
use Illuminate\Support\Facades\Auth;

class ResultController extends Controller
{
    public function index()
    {
        return inertia('Peserta/Results/Index', [
            'results' => TestUser::with('test', 'result')
                ->where('user_id', Auth::id())
                ->whereHas('result', function ($q) {
                    $q->where('status', 'validated');
                })
                ->get(),
        ]);
    }

    public function show(TestUser $testUser)
    {
        abort_if($testUser->user_id !== Auth::id(), 403);

        abort_if(!$testUser->result || $testUser->result->status !== 'validated', 403);

        return inertia('Peserta/Results/Show', [
            'testUser' => $testUser->load(
                'test',
                'answers.question.answers',
                'result'
            ),
        ]);
    }
}
