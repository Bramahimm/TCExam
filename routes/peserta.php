<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Peserta\{
    DashboardController as PesertaDashboardController,
    TestController as PesertaTestController
};

/*
|--------------------------------------------------------------------------
| PESERTA – NON UJIAN
|--------------------------------------------------------------------------
*/
Route::middleware([
    'auth',
    'active',
    'role:peserta',
    'single.session',
])->prefix('peserta')->name('peserta.')->group(function () {

    Route::get('/dashboard', [PesertaDashboardController::class, 'index'])
        ->name('dashboard');

    Route::get('/tests', [PesertaTestController::class, 'index'])
        ->name('tests.index');
});


/*
|--------------------------------------------------------------------------
| PESERTA – UJIAN (FULL LOCK 🔒)
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

    Route::get('/tests/{test}/start',
        [PesertaTestController::class, 'start']
    )->name('tests.start');

    Route::post('/tests/{testUser}/answer',
        [PesertaTestController::class, 'answer']
    )->name('tests.answer');

    Route::post('/tests/{testUser}/submit',
        [PesertaTestController::class, 'submit']
    )->name('tests.submit');
});
