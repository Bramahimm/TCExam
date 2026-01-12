<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Module;
use App\Models\Topic;
use App\Models\Question;
use App\Models\Answer;

class MassQuestionSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Pastikan Modul Ada
        $module = Module::firstOrCreate(['name' => 'Bank Soal 2026']);

        // 2. Buat Topik Khusus
        $topic = Topic::create([
            'module_id' => $module->id,
            'name' => 'Pengetahuan Umum Kedokteran',
            'is_active' => true,
        ]);

        // 3. Generate 150 Soal secara otomatis (Looping)
        for ($i = 1; $i <= 150; $i++) {
            $question = Question::create([
                'topic_id' => $topic->id,
                'type' => 'multiple_choice',
                'question_text' => "Soal Latihan Nomor $i: Manakah pernyataan yang benar terkait fisiologi dasar tubuh manusia dalam konteks simulasi ini?",
                'score' => 2, // Score per soal
                'is_active' => true,
            ]);

            // Buat Pilihan Jawaban A, B, C, D, E
            $answers = [
                ['text' => "Jawaban Benar untuk soal $i (Opsi A)", 'correct' => true],
                ['text' => "Pengecoh Salah 1 untuk soal $i (Opsi B)", 'correct' => false],
                ['text' => "Pengecoh Salah 2 untuk soal $i (Opsi C)", 'correct' => false],
                ['text' => "Pengecoh Salah 3 untuk soal $i (Opsi D)", 'correct' => false],
                ['text' => "Pengecoh Salah 4 untuk soal $i (Opsi E)", 'correct' => false],
            ];

            foreach ($answers as $ans) {
                Answer::create([
                    'question_id' => $question->id,
                    'answer_text' => $ans['text'],
                    'is_correct' => $ans['correct'],
                ]);
            }
        }
    }
}
