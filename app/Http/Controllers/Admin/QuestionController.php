<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Topic;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index()
    {
        return inertia('Admin/Questions/Index', [
            'questions' => Question::with('topic.module')->latest()->get(),
            'topics' => Topic::with('module')->where('is_active', true)->get(),
        ]);
    }

    public function create()
    {
        return inertia('Admin/Questions/Create', [
            'topics' => Topic::with('module')->where('is_active', true)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'topic_id' => 'required|exists:topics,id',
            'type' => 'required|string',
            'question_text' => 'nullable|string',
            'score' => 'nullable|integer|min:1',
            'is_active' => 'boolean',
        ]);

        Question::create($request->only(
            'topic_id',
            'type',
            'question_text',
            'question_image',
            'score',
            'is_active'
        ));

        return redirect()->route('admin.questions.index')
            ->with('success', 'Soal berhasil ditambahkan');
    }

    public function show(Question $question)
    {
        return inertia('Admin/Questions/Show', [
            'question' => $question->load('answers', 'topic.module'),
        ]);
    }

    public function edit(Question $question)
    {
        return inertia('Admin/Questions/Edit', [
            'question' => $question,
            'topics' => Topic::with('module')->where('is_active', true)->get(),
        ]);
    }

    public function update(Request $request, Question $question)
    {
        $request->validate([
            'topic_id' => 'required|exists:topics,id',
            'type' => 'required|string',
            'question_text' => 'nullable|string',
            'score' => 'nullable|integer|min:1',
            'is_active' => 'boolean',
        ]);

        $question->update($request->only(
            'topic_id',
            'type',
            'question_text',
            'question_image',
            'score',
            'is_active'
        ));

        return redirect()->route('admin.questions.index')
            ->with('success', 'Soal berhasil diperbarui');
    }

    public function destroy(Question $question)
    {
        $question->delete();

        return redirect()->route('admin.questions.index')
            ->with('success', 'Soal berhasil dihapus');
    }
}
