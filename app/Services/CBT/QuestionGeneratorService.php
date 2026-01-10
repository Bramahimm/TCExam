<?php

namespace App\Services\CBT;

use App\Models\Test;
use App\Models\Question;
use Illuminate\Support\Facades\Cache;

class QuestionGeneratorService
{
    /**
     * Generate & lock soal ujian
     */
    public static function generate(Test $test, int $userId): array
    {
        $cacheKey = self::cacheKey($test->id, $userId);

        // Jika sudah pernah generate → ambil dari cache (refresh-safe)
        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        $questionIds = [];

        // Ambil aturan per topik
        $test->load('topics');

        foreach ($test->topics as $topic) {

            $query = Question::where('topic_id', $topic->id)
                ->where('is_active', true);

            // Filter jenis soal
            if ($topic->pivot->question_type !== 'mixed') {
                $query->where('type', $topic->pivot->question_type);
            }

            // Acak atau tidak
            if ($topic->pivot->random_questions) {
                $query->inRandomOrder();
            }

            // Ambil sesuai jumlah
            $questions = $query
                ->limit($topic->pivot->total_questions)
                ->pluck('id')
                ->toArray();

            $questionIds = array_merge($questionIds, $questions);
        }

        // Kunci urutan soal final
        $payload = [
            'question_ids' => $questionIds,
            'started_at' => now(),
        ];

        // Simpan ke cache (bisa Redis / file)
        Cache::put(
            $cacheKey,
            $payload,
            now()->addHours(6) // cukup untuk ujian
        );

        return $payload;
    }

    /**
     * Ambil soal + jawaban sesuai aturan
     */
    public static function getQuestions(Test $test, int $userId)
    {
        $session = self::generate($test, $userId);

        return Question::with(['answers' => function ($q) use ($test) {

            $q->whereNotNull('answer_text');
        }])->whereIn('id', $session['question_ids'])
            ->get()
            ->map(function ($question) use ($test) {

                $pivot = $test->topics
                    ->where('id', $question->topic_id)
                    ->first()
                    ->pivot;

                // Atur jawaban PG
                if ($question->type === 'multiple_choice') {

                    $correct = $question->answers
                        ->where('is_correct', true);

                    $wrong = $question->answers
                        ->where('is_correct', false)
                        ->shuffle();

                    // Ambil sesuai max_answers
                    $answers = $correct
                        ->merge(
                            $wrong->take(
                                max(
                                    0,
                                    $pivot->max_answers - $correct->count()
                                )
                            )
                        );

                    if ($pivot->random_answers) {
                        $answers = $answers->shuffle();
                    }

                    $question->setRelation('answers', $answers->values());
                }

                return $question;
            });
    }

    /**
     * Hapus cache soal (setelah submit / expired)
     */
    public static function clear(int $testId, int $userId): void
    {
        Cache::forget(self::cacheKey($testId, $userId));
    }

    /**
     * Key unik per test + user
     */
    protected static function cacheKey(int $testId, int $userId): string
    {
        return "cbt_test_{$testId}_user_{$userId}";
    }
}
