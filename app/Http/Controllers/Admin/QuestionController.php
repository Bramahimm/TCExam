<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class QuestionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'topic_id' => 'required|exists:topics,id',
            'type' => 'required|in:essay,multiple_choice',
            'question_text' => 'required|string',

            // IMAGE
            'question_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',

            'options' => 'nullable|array',
            'options.*.text' => 'required_with:options|string',
            'options.*.is_correct' => 'boolean',
        ]);

        DB::transaction(function () use ($validated, $request) {

            $imagePath = null;

            if ($request->hasFile('question_image')) {
                // simpan ke storage/app/public/questions
                $imagePath = $request->file('question_image')->store('questions', 'public');
            }

            $question = Question::create([
                'topic_id' => $validated['topic_id'],
                'type' => $validated['type'],
                'question_text' => $validated['question_text'],
                'question_image' => $imagePath, // simpan path
                'is_active' => true,
            ]);

            if ($validated['type'] === 'multiple_choice') {

                $options = $validated['options'] ?? [];

                if (count($options) < 2) {
                    abort(422, 'Multiple choice harus memiliki minimal 2 opsi jawaban.');
                }

                $hasCorrect = collect($options)->contains(function ($o) {
                    return !empty($o['is_correct']);
                });

                if (!$hasCorrect) {
                    abort(422, 'Pilih salah satu jawaban yang benar.');
                }

                foreach ($options as $opt) {
                    Answer::create([
                        'question_id' => $question->id,
                        'answer_text' => $opt['text'],
                        'is_correct' => $opt['is_correct'] ?? false,
                    ]);
                }
            }
        });

        return redirect()
            ->route('admin.modules.index', ['section' => 'questions'])
            ->with('success', 'Question berhasil ditambahkan');
    }

    public function update(Request $request, Question $question)
    {
        $validated = $request->validate([
            'topic_id' => 'required|exists:topics,id',
            'type' => 'required|in:essay,multiple_choice',
            'question_text' => 'required|string',

            // IMAGE
            'question_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',

            'options' => 'nullable|array',
            'options.*.text' => 'required_with:options|string',
            'options.*.is_correct' => 'boolean',
        ]);

        DB::transaction(function () use ($validated, $request, $question) {

            // kalau upload image baru, replace
            if ($request->hasFile('question_image')) {

                // hapus file lama kalau ada
                if (!empty($question->question_image) && Storage::disk('public')->exists($question->question_image)) {
                    Storage::disk('public')->delete($question->question_image);
                }

                $newPath = $request->file('question_image')->store('questions', 'public');
                $question->question_image = $newPath;
            }

            $question->topic_id = $validated['topic_id'];
            $question->type = $validated['type'];
            $question->question_text = $validated['question_text'];
            $question->save();

            // reset answers
            $question->answers()->delete();

            if ($validated['type'] === 'multiple_choice') {

                $options = $validated['options'] ?? [];

                if (count($options) < 2) {
                    abort(422, 'Multiple choice harus memiliki minimal 2 opsi jawaban.');
                }

                $hasCorrect = collect($options)->contains(function ($o) {
                    return !empty($o['is_correct']);
                });

                if (!$hasCorrect) {
                    abort(422, 'Pilih salah satu jawaban yang benar.');
                }

                foreach ($options as $opt) {
                    Answer::create([
                        'question_id' => $question->id,
                        'answer_text' => $opt['text'],
                        'is_correct' => $opt['is_correct'] ?? false,
                    ]);
                }
            }
        });

        return redirect()
            ->route('admin.modules.index', ['section' => 'questions'])
            ->with('success', 'Question berhasil diperbarui');
    }

    public function destroy(Question $question)
    {
        DB::transaction(function () use ($question) {

            // hapus image juga
            if (!empty($question->question_image) && Storage::disk('public')->exists($question->question_image)) {
                Storage::disk('public')->delete($question->question_image);
            }

            $question->answers()->delete();
            $question->delete();
        });

        return redirect()
            ->route('admin.modules.index', ['section' => 'questions'])
            ->with('success', 'Question berhasil dihapus');
    }
}
