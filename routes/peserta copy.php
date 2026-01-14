<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Peserta\{
    DashboardController,
    TestController,
    ResultController
};

/*
|--------------------------------------------------------------------------
| PESERTA – GLOBAL (LOGIN, DASHBOARD, LIST)
|--------------------------------------------------------------------------
*/
Route::middleware([
    'auth',
    'active',
    'role:peserta',
    'single.session',
])->prefix('peserta')->name('peserta.')->group(function () {

    /* ================= DASHBOARD ================= */
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    /* ================= DAFTAR UJIAN ================= */
    Route::get('/tests', [TestController::class, 'index'])
        ->name('tests.index');

    /* ================= HASIL UJIAN ================= */
    Route::get('/results', [ResultController::class, 'index'])
        ->name('results.index');

    Route::get('/results/{testUser}', [ResultController::class, 'show'])
        ->name('results.show');
});


/*
|--------------------------------------------------------------------------
| PESERTA – MODE UJIAN (FULL LOCK 🔒 SEB)
|--------------------------------------------------------------------------
*/
Route::middleware([
    'auth',
    'active',
    'role:peserta',

    'single.session',
    'seb',

    'exam.state',
    'exam.time',
    'test.access',
    'prevent.retake',
])->prefix('peserta')->name('peserta.')->group(function () {

    /* ================= MULAI UJIAN ================= */
    Route::get('/tests/{test}/start',
        [TestController::class, 'start']
    )->name('tests.start');

    /* ================= AUTOSAVE JAWABAN ================= */
    Route::post('/tests/{testUser}/answer',
        [TestController::class, 'answer']
    )->name('tests.answer');

    /* ================= SUBMIT UJIAN ================= */
    Route::post('/tests/{testUser}/submit',
        [TestController::class, 'submit']
    )->name('tests.submit');
});
