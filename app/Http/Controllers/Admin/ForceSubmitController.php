<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TestUser;
use App\Services\CBT\ForceSubmitService;
use Illuminate\Support\Facades\Auth;

class ForceSubmitController extends Controller
{
    public function submit(TestUser $testUser)
    {
        ForceSubmitService::force($testUser, Auth::id());

        return redirect()
            ->back()
            ->with('success', 'Ujian peserta berhasil di-force submit');
    }
}
