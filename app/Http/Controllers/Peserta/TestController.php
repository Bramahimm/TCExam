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
     * List ujian dengan Sorting Prioritas
     */
    public function index()
    {
        $user = Auth::user();

        $tests = Test::whereHas('groups', function ($q) use ($user) {
            $q->whereIn('groups.id', $user->groups->pluck('id'));
        })
            ->where('is_active', true)
            ->get()
            ->map(function ($test) use ($user) {
                $testUser = TestUser::where('test_id', $test->id)
                    ->where('user_id', $user->id)
                    ->first();

                $now = now();
                $status = 'KERJAKAN';
                $priority = 2; // Default priority (Normal)

                // 1. Cek Status Spesifik User
                if ($testUser) {
                    if ($testUser->status == 'submitted') {
                        $status = 'SELESAI';
                        $priority = 4; // Paling bawah
                    } elseif ($testUser->status == 'expired') {
                        $status = 'KADALUARSA';
                        $priority = 5;
                    } elseif ($testUser->status == 'ongoing') {
                        // Cek waktu global
                        if ($now > $test->end_time) {
                            $status = 'KADALUARSA';
                            $priority = 5;
                        } else {
                            $status = 'LANJUTKAN';
                            $priority = 1; // Paling atas (Urgent)
                        }
                    }
                }
                // 2. Cek Status Global
                else {
                    if ($now < $test->start_time) {
                        $status = 'BELUM_MULAI';
                        $priority = 3;
                    } elseif ($now > $test->end_time) {
                        $status = 'KADALUARSA';
                        $priority = 5;
                    } else {
                        $status = 'KERJAKAN'; // Sedang aktif
                        $priority = 2;
                    }
                }

                $test->user_status = $status;
                $test->sort_priority = $priority; // Helper untuk sorting
                return $test;
            })
            // 🔥 LOGIC SORTING: Urutkan berdasarkan prioritas, lalu waktu mulai
            ->sortBy([
                ['sort_priority', 'asc'],
                ['start_time', 'desc'],
            ])
            ->values(); // Reset array keys agar rapi di JSON

        return inertia('Peserta/Tests/Index', compact('tests'));
    }

    /**
     * Mulai ujian
     */
    public function start(Test $test)
    {
        $user = Auth::user();

        // Cek Waktu Global
        if (now() > $test->end_time) {
            return redirect()->route('peserta.tests.index')->withErrors('Waktu habis.');
        }

        // Create or Get Session
        $testUser = TestUser::firstOrCreate(
            ['test_id' => $test->id, 'user_id' => $user->id],
            ['started_at' => now(), 'status' => 'ongoing']
        );

        if (is_null($testUser->started_at)) {
            $testUser->update(['started_at' => now(), 'status' => 'ongoing']);
        }

        // Cek Expired
        ExamStateService::autoExpire($testUser);
        if ($testUser->status === 'expired' || $testUser->status === 'submitted') {
            return redirect()->route('peserta.dashboard')->withErrors('Akses ditutup.');
        }

        // Ambil Soal
        $questions = QuestionGeneratorService::getQuestions($test, $user->id);

        // 🔥 FIX 1: Ambil Jawaban Existing & Format Key-nya berdasarkan Question ID
        // Ini memperbaiki bug warna navigasi saat lompat nomor atau refresh
        $existingAnswers = $testUser->answers()
            ->select('question_id', 'answer_id', 'answer_text')
            ->get()
            ->mapWithKeys(function ($ans) {
                return [
                    $ans->question_id => [
                        'answerId' => $ans->answer_id,
                        'answerText' => $ans->answer_text
                    ]
                ];
            });

        return inertia('Peserta/Tests/Start', [
            'test' => $test,
            'testUserId' => $testUser->id,
            'questions' => $questions,
            'remainingSeconds' => ExamTimeService::remainingSeconds($testUser),
            'existingAnswers' => $existingAnswers, // 🔥 Dikirim ke Frontend
            'currentUser' => $user, // Opsional: kirim user explisit jika perlu debug NPM
        ]);
    }

    public function answer(SaveAnswerRequest $request, TestUser $testUser)
    {
        ExamStateService::autoExpire($testUser);

        if ($testUser->status === 'expired') {
            return response()->json(['status' => 'expired'], 403);
        }

        $data = $request->validated();

        AnswerService::save(
            $testUser->id,
            $data['question_id'],
            $data['answer_id'] ?? null,
            $data['answer_text'] ?? null
        );

        return response()->json(['status' => 'saved']);
    }

    public function submit(TestUser $testUser)
    {
        $testUser->update([
            'status' => 'submitted',
            'finished_at' => now()
        ]);

        $totalScore = ScoringService::calculate($testUser);

        $testUser->result()->create([
            'total_score' => $totalScore,
            'status' => 'pending'
        ]);

        QuestionGeneratorService::clear($testUser->test_id, $testUser->user_id);

        return redirect()->route('peserta.dashboard')->with('success', 'Ujian berhasil diselesaikan.');
    }
}
