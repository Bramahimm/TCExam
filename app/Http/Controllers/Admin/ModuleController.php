<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Http\Requests\Admin\StoreModuleRequest;
use App\Http\Requests\Admin\UpdateModuleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ModuleController extends Controller
{
    /**
     * List modul
     */

    public function index()
    {
        return inertia('Admin/Modules/Index', [
            // CLASS
            'modules' => Module::latest()->get(),

            // SUBJECTS
            'topics' => \App\Models\Topic::with('module')
                ->where('is_active', true)
                ->get(),

            // QUESTIONS + ANSWERS
            'questions' => \App\Models\Question::with([
                'topic',
                'answers'
            ])->latest()->get(),
        ]);
    }


    /**
     * Form tambah modul
     */
    public function create()
    {
        return inertia('Admin/Modules/Create'); 
    }

    /**
     * Simpan modul baru
     */
    public function store(StoreModuleRequest $request)
    {
        Module::create($request->validated());

        return redirect()
            ->route('admin.modules.index')
            ->with('success', 'Modul berhasil ditambahkan');
    }

    /**
     * Detail modul
     */
    public function show(Module $module)
    {
        return inertia('Admin/Modules/Show', [
            'module' => $module->load('topics'),
        ]);
    }

    /**
     * Form edit modul
     */
    public function edit(Module $module)
    {
        return inertia('Admin/Modules/Edit', [
            'module' => $module,
        ]);
    }

    /**
     * Update modul
     */
    public function update(UpdateModuleRequest $request, Module $module)
    {
        $module->update($request->validated());

        return redirect()
            ->route('admin.modules.index')
            ->with('success', 'Modul berhasil diperbarui');
    }

    /**
     * Hapus modul
     */
    public function destroy(Module $module)
    {
        $module->delete();

        return redirect()
            ->route('admin.modules.index')
            ->with('success', 'Modul berhasil dihapus');
    }
}
