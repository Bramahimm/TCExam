<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Str;

class BackupController extends Controller
{
    public function index()
    {
        $driver = config('database.default');
        $connection = config("database.connections.{$driver}", []);

        return inertia('Admin/Backup', [
            'database' => [
                'driver' => $driver,
                'database' => $connection['database'] ?? null,
                'host' => $connection['host'] ?? null,
                'port' => $connection['port'] ?? null,
            ],
        ]);
    }

    public function download()
    {
        $driver = config('database.default');
        $connection = config("database.connections.{$driver}", []);
        $timestamp = now()->format('Ymd_His');
        $database = $connection['database'] ?? 'database';

        if ($driver === 'sqlite') {
            if ($database === ':memory:' || empty($database) || !is_file($database)) {
                return back()->with('error', 'Database SQLite tidak ditemukan untuk diunduh.');
            }

            $filename = "backup-{$timestamp}.sqlite";

            return response()->download(
                $database,
                $filename,
                ['Content-Type' => 'application/x-sqlite3']
            );
        }

        if ($driver === 'mysql') {
            $username = $connection['username'] ?? null;
            $password = $connection['password'] ?? null;
            $host = $connection['host'] ?? '127.0.0.1';
            $port = $connection['port'] ?? 3306;

            $env = [];
            if (!empty($password)) {
                $env['MYSQL_PWD'] = $password;
            }

            $process = Process::env($env)->run([
                'mysqldump',
                '--user=' . $username,
                '--host=' . $host,
                '--port=' . $port,
                '--single-transaction',
                '--quick',
                '--skip-lock-tables',
                $database,
            ]);

            if ($process->failed()) {
                return back()->with('error', 'Gagal membuat backup database. Pastikan mysqldump tersedia di server.');
            }

            $dump = $process->output();
            $safeDatabase = Str::slug($database, '_');
            $filename = "backup-{$safeDatabase}-{$timestamp}.sql";

            return response()->streamDownload(function () use ($dump) {
                echo $dump;
            }, $filename, ['Content-Type' => 'application/sql']);
        }

        if ($driver === 'pgsql') {
            $username = $connection['username'] ?? null;
            $password = $connection['password'] ?? null;
            $host = $connection['host'] ?? '127.0.0.1';
            $port = $connection['port'] ?? 5432;

            $env = [];
            if (!empty($password)) {
                $env['PGPASSWORD'] = $password;
            }

            $process = Process::env($env)->run([
                'pg_dump',
                '--username=' . $username,
                '--host=' . $host,
                '--port=' . $port,
                '--no-owner',
                '--no-privileges',
                $database,
            ]);

            if ($process->failed()) {
                return back()->with('error', 'Gagal membuat backup database. Pastikan pg_dump tersedia di server.');
            }

            $dump = $process->output();
            $safeDatabase = Str::slug($database, '_');
            $filename = "backup-{$safeDatabase}-{$timestamp}.sql";

            return response()->streamDownload(function () use ($dump) {
                echo $dump;
            }, $filename, ['Content-Type' => 'application/sql']);
        }

        return back()->with('error', 'Driver database tidak didukung untuk backup otomatis.');
    }
}
