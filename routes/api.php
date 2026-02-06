<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use karbon\Carbon;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// routes/web.php

Route::get('/api/time', function () {
    return response()->json([
        'server_time' => now()->toDateTimeString(),
    ]);
})->withoutMiddleware([\App\Http\Middleware\HandleInertiaRequests::class]);
