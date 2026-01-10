<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Topic;
use App\Models\Module;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    public function index()
    {
        return inertia('Admin/Topics/Index', [
            'topics' => Topic::with('module')->latest()->get(),
            'modules' => Module::where('is_active', true)->get(),
        ]);
    }

    public function create()
    {
        return inertia('Admin/Topics/Create', [
            'modules' => Module::where('is_active', true)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'module_id' => 'required|exists:modules,id',
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        Topic::create($request->only(
            'module_id',
            'name',
            'description',
            'is_active'
        ));

        return redirect()->route('admin.topics.index')
            ->with('success', 'Topik berhasil ditambahkan');
    }

    public function show(Topic $topic)
    {
        return inertia('Admin/Topics/Show', [
            'topic' => $topic->load('module', 'questions'),
        ]);
    }

    public function edit(Topic $topic)
    {
        return inertia('Admin/Topics/Edit', [
            'topic' => $topic,
            'modules' => Module::where('is_active', true)->get(),
        ]);
    }

    public function update(Request $request, Topic $topic)
    {
        $request->validate([
            'module_id' => 'required|exists:modules,id',
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $topic->update($request->only(
            'module_id',
            'name',
            'description',
            'is_active'
        ));

        return redirect()->route('admin.topics.index')
            ->with('success', 'Topik berhasil diperbarui');
    }

    public function destroy(Topic $topic)
    {
        $topic->delete();

        return redirect()->route('admin.topics.index')
            ->with('success', 'Topik berhasil dihapus');
    }
}
