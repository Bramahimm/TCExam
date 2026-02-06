<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia;


class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */


    public function register()
    {
        $this->renderable(function (Throwable $e, $request) {
            if ($request->header('X-Inertia')) {
                // Jika sesi habis (419), lempar balik ke login dengan pesan
                if ($e instanceof \Illuminate\Session\TokenMismatchException) {
                    return redirect()->route('login')->with('error', 'Sesi Anda telah berakhir, silakan login kembali.');
                }

                // Jika error 500 di server saat ujian
                if (app()->environment('production') && $this->isHttpException($e)) {
                    /** @var \Symfony\Component\HttpKernel\Exception\HttpExceptionInterface $e */
                    $status = $e->getStatusCode();

                    return Inertia::render('Errors/DynamicError', [
                        'status' => $status,
                    ])->toResponse($request)->setStatusCode($status);
                }
            }
        });
    }
}
