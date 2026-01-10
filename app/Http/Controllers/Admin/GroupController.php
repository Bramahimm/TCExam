<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index()
    {
        return inertia('Admin/Groups/Index', [
            'groups' => Group::latest()->get(),
        ]);
    }

    public function create()
    {
        return inertia('Admin/Groups/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
        ]);

        Group::create($request->only('name', 'description'));

        return redirect()->route('admin.groups.index')
            ->with('success', 'Angkatan berhasil ditambahkan');
    }

    public function show(Group $group)
    {
        return inertia('Admin/Groups/Show', [
            'group' => $group->load('users'),
        ]);
    }

    public function edit(Group $group)
    {
        return inertia('Admin/Groups/Edit', [
            'group' => $group,
        ]);
    }

    public function update(Request $request, Group $group)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
        ]);

        $group->update($request->only('name', 'description'));

        return redirect()->route('admin.groups.index')
            ->with('success', 'Angkatan berhasil diperbarui');
    }

    public function destroy(Group $group)
    {
        $group->delete();

        return redirect()->route('admin.groups.index')
            ->with('success', 'Angkatan berhasil dihapus');
    }
}
