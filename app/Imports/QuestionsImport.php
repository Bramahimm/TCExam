<?php

namespace App\Imports;

use App\Models\Module;
use App\Models\Topic;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Facades\Log;

class QuestionsImport implements ToCollection
{
    public function collection(Collection $rows)
    {
        // skip header
        $rows = $rows->slice(1);

        foreach ($rows as $row) {

            $moduleName = trim($row[0] ?? '');
            $topicName  = trim($row[1] ?? '');
            $rawType    = strtolower(trim($row[2] ?? ''));
            $question   = trim($row[3] ?? '');
            $score      = $row[10] ?? null;

            if (!$moduleName || !$topicName || !$rawType || !$question) {
                continue;
            }

            // NORMALISASI TYPE
            $typeMap = [
                'pg' => 'multiple_choice',
                'multiple_choice' => 'multiple_choice',
                'essay' => 'essay',
                'uraian' => 'essay',
            ];

            $type = $typeMap[$rawType] ?? null;
            if (!$type) continue;

            // MODULE
            $module = Module::firstOrCreate([
                'name' => $moduleName,
            ]);

            // TOPIC
            $topic = Topic::firstOrCreate([
                'module_id' => $module->id,
                'name' => $topicName,
            ]);

            // QUESTION
            $questionModel = Question::create([
                'topic_id' => $topic->id,
                'type' => $type,
                'question_text' => $question,
                'score' => $score,
                'is_active' => true,
            ]);

            // PILIHAN GANDA
            if ($type === 'multiple_choice') {

                $options = [
                    'A' => $row[4] ?? null,
                    'B' => $row[5] ?? null,
                    'C' => $row[6] ?? null,
                    'D' => $row[7] ?? null,
                    'E' => $row[8] ?? null,
                ];

                $correct = strtoupper(trim($row[9] ?? ''));

                foreach ($options as $key => $text) {
                    if (!$text) continue;

                    Answer::create([
                        'question_id' => $questionModel->id,
                        'answer_text' => trim($text),
                        'is_correct' => ($key === $correct),
                    ]);
                }
            }
        }
    }
}
