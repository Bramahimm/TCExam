<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuestionController extends Controller
{
    /**
     * STORE QUESTION
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'topic_id'        => 'required|exists:topics,id',
            'type'            => 'required|in:essay,multiple_choice',
            'question_text'   => 'required|string',
            'options'         => 'nullable|array',
            'options.*.text'  => 'required_with:options|string',
            'options.*.is_correct' => 'boolean',
        ]);

        DB::transaction(function () use ($validated) {

            $question = Question::create([
                'topic_id'      => $validated['topic_id'],
                'type'          => $validated['type'],
                'question_text' => $validated['question_text'],
                'is_active'     => true,
            ]);

            if (
                $validated['type'] === 'multiple_choice'
                && !empty($validated['options'])
            ) {
                foreach ($validated['options'] as $opt) {
                    Answer::create([
                        'question_id' => $question->id,
                        'answer_text' => $opt['text'],
                        'is_correct'  => $opt['is_correct'] ?? false,
                    ]);
                }
            }
        });

        return redirect()->back()->with('success', 'Question berhasil ditambahkan');
    }

    /**
     * UPDATE QUESTION
     */
    public function update(Request $request, Question $question)
    {
        $validated = $request->validate([
            'topic_id'        => 'required|exists:topics,id',
            'type'            => 'required|in:essay,multiple_choice',
            'question_text'   => 'required|string',
            'options'         => 'nullable|array',
            'options.*.text'  => 'required_with:options|string',
            'options.*.is_correct' => 'boolean',
        ]);

        DB::transaction(function () use ($validated, $question) {

            $question->update([
                'topic_id'      => $validated['topic_id'],
                'type'          => $validated['type'],
                'question_text' => $validated['question_text'],
            ]);

            // reset answers
            $question->answers()->delete();

            if (
                $validated['type'] === 'multiple_choice'
                && !empty($validated['options'])
            ) {
                foreach ($validated['options'] as $opt) {
                    Answer::create([
                        'question_id' => $question->id,
                        'answer_text' => $opt['text'],
                        'is_correct'  => $opt['is_correct'] ?? false,
                    ]);
                }
            }
        });

        return redirect()->back()->with('success', 'Question berhasil diperbarui');
    }

    /**
     * DELETE QUESTION
     */
    public function destroy(Question $question)
    {
        DB::transaction(function () use ($question) {
            $question->answers()->delete();
            $question->delete();
        });

        return redirect()->back()->with('success', 'Question berhasil dihapus');
    }
}
