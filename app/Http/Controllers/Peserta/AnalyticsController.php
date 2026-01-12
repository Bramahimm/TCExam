<?php

namespace App\Http\Controllers\Peserta;

use App\Http\Controllers\Controller;
use App\Services\Analytics\StudentAnalyticsService;
use Illuminate\Support\Facades\Auth;

class AnalyticsController extends Controller
{
    public function index()
    {
        return inertia('Peserta/Analytics', [
            'summary' => StudentAnalyticsService::summary(Auth::id()),
        ]);
    }
}
