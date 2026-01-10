<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TestUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResultController extends Controller
{
    public function index()
    {
        return inertia('Admin/Results/Index', [
            'results' => TestUser::with('user', 'test', 'result')
                ->whereHas('result')
                ->get()
        ]);
    }

    public function validateResult(Request $request, TestUser $testUser)
    {
        $request->validate([
            'total_score' => 'required|integer|min:0',
        ]);

        $testUser->result->update([
            'total_score' => $request->total_score,
            'status' => 'validated',
            'validated_by' => Auth::id(),
            'validated_at' => now(),
        ]);
    }
}
