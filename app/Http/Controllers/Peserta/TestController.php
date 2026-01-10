<?php

namespace App\Http\Controllers\Peserta;

use App\Http\Controllers\Controller;
use App\Http\Requests\Peserta\SaveAnswerRequest;
use App\Models\Test;
use App\Models\TestUser;
use App\Services\CBT\AnswerService;
use App\Services\CBT\ExamStateService;
use App\Services\CBT\ExamTimeService;
use App\Services\CBT\QuestionGeneratorService;
use App\Services\CBT\ScoringService;
use Illuminate\Support\Facades\Auth;

class TestController extends Controller
{
    /**
     * List ujian sesuai grup user
     */
    public function index()
    {
        $user = Auth::user();

        $tests = Test::whereHas('groups', function ($q) use ($user) {
            $q->whereIn('groups.id', $user->groups->pluck('id'));
        })
            ->where('is_active', true)
            ->get();

        return inertia('Peserta/Tests/Index', compact('tests'));
    }

    /**
     * Mulai ujian
     */
    public function start(Test $test)
    {
        $user = Auth::user();

        $testUser = TestUser::firstOrCreate(
            [
                'test_id' => $test->id,
                'user_id' => $user->id,
            ],
            [
                'started_at' => now(),
                'status' => 'ongoing',
            ]
        );

        // 🔒 AUTO EXPIRE WAJIB DI AWAL
        ExamStateService::autoExpire($testUser);

        if ($testUser->status === 'expired') {
            return redirect()
                ->route('peserta.dashboard')
                ->withErrors('Waktu ujian telah habis');
        }

        $session = QuestionGeneratorService::generate($test, $user->id);

        return inertia('Peserta/Tests/Start', [
            'test' => $test,
            'testUserId' => $testUser->id,
            'questionIds' => $session['question_ids'],
            'startedAt' => $testUser->started_at,
            'remainingSeconds' => ExamTimeService::remainingSeconds($testUser),
        ]);
    }

    /**
     * Autosave jawaban
     */
    public function answer(
        SaveAnswerRequest $request,
        TestUser $testUser
    ) {
        // 🔒 AUTO EXPIRE SEBELUM APA PUN
        ExamStateService::autoExpire($testUser);

        if ($testUser->status === 'expired') {
            return response()->json([
                'status' => 'expired',
                'message' => 'Waktu ujian telah habis',
            ], 403);
        }

        $data = $request->validated();

        AnswerService::save(
            $testUser->id,
            $data['question_id'],
            $data['answer_id']   ?? null,
            $data['answer_text'] ?? null,
            $data['is_correct']  ?? null,
            $data['score']       ?? null
        );

        return response()->json(['status' => 'saved']);
    }

    /**
     * Submit ujian
     */
    public function submit(TestUser $testUser)
    {
        // 🔒 AUTO EXPIRE SEBELUM SUBMIT
        ExamStateService::autoExpire($testUser);

        if ($testUser->status === 'expired') {
            return redirect()
                ->route('peserta.dashboard')
                ->withErrors('Waktu ujian telah habis');
        }

        $testUser->update([
            'status' => 'submitted',
            'finished_at' => now(),
        ]);

        $totalScore = ScoringService::calculate($testUser);

        $testUser->result()->create([
            'total_score' => $totalScore,
            'status' => 'pending',
        ]);

        QuestionGeneratorService::clear(
            $testUser->test_id,
            $testUser->user_id
        );

        return redirect()
            ->route('peserta.dashboard')
            ->with('success', 'Ujian berhasil dikirim');
    }
}
