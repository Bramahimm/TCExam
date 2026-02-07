<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia;

class Handler extends ExceptionHandler
{
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function render($request, Throwable $e)
    {
        $response = parent::render($request, $e);

        // Handle Session Expired (419) agar balik ke login dengan pesan
        if ($response->status() === 419) {
            return redirect()->route('login')->with('error', 'Sesi Anda berakhir, silakan login kembali.');
        }

        // Daftar status yang ingin ditampilkan menggunakan DynamicError
        $errorStatuses = [500, 503, 404, 403];

        if (in_array($response->status(), $errorStatuses)) {
            return Inertia::render('Errors/DynamicError', [
                'status' => $response->status(),
                'message' => $e->getMessage() ?: 'Terjadi kesalahan sistem.',
            ])->toResponse($request)->setStatusCode($response->status());
        }

        return $response;
    }
}
