<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ImportUsersRequest;
use App\Imports\UsersImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class ImportUserController extends Controller
{
    public function store(ImportUsersRequest $request)
    {
        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();

        // Variabel untuk menampung laporan
        $skippedData = [];
        $successCount = 0;

        DB::beginTransaction();
        try {
            if ($extension === 'xml') {
                // --- HANDLER XML ---
                // Kita panggil method lokal, tapi return-nya array [sukses, skipped]
                $result = $this->importXml($file);
                $skippedData = $result['skipped'];
                $successCount = $result['count'];
            } else {
                // --- HANDLER EXCEL/CSV ---
                // Kita instansiasi dulu class import-nya
                $importer = new UsersImport;
                Excel::import($importer, $file);

                // Ambil data dari properti class yang sudah kita buat
                $skippedData = $importer->skipped;
                $successCount = $importer->importedCount;
            }

            DB::commit();

            // --- MENYUSUN PESAN ALERT ---
            if (count($skippedData) > 0) {
                // Jika ada yang duplikat/skip
                $message = "Import Selesai. $successCount berhasil.";
                $message .= " Namun " . count($skippedData) . " data dilewati karena duplikat: ";
                // Ambil 3 contoh nama pertama agar alert tidak kepanjangan
                $examples = array_slice($skippedData, 0, 3);
                $message .= implode(", ", $examples);

                if (count($skippedData) > 3) {
                    $message .= ", dan lainnya.";
                }

                // Gunakan 'warning' atau 'error' tergantung preferensi
                return redirect()->back()->with('warning', $message);
            }

            // Jika sukses semua tanpa skip
            // return redirect()->back()->with('success', "Berhasil mengimport $successCount user peserta baru.");
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Import Error: " . $e->getMessage());
            return redirect()->back()->withErrors(['file' => 'Gagal Import: ' . $e->getMessage()]);
        }
    }

    /**
     * Parsing XML Manual (Updated return array)
     */
    private function importXml($file)
    {
        $skipped = [];
        $count = 0;

        try {
            $xmlData = simplexml_load_file($file->getRealPath());

            foreach ($xmlData->row as $row) {
                $data = [
                    'name'      => trim((string) $row->name),
                    'npm'       => trim((string) $row->npm),
                    'email'     => trim((string) $row->email),
                    'groupName' => trim((string) $row->group),
                ];

                // Panggil logic simpan static & cek statusnya
                $res = UsersImport::saveUser($data);

                if ($res['status'] === 'skipped') {
                    $skipped[] = $res['message'];
                } else {
                    $count++;
                }
            }
        } catch (\Exception $e) {
            throw $e; // Lempar ke catch utama di store()
        }

        return ['count' => $count, 'skipped' => $skipped];
    }

    // ... method downloadTemplate tetap sama ...
    public function downloadTemplate()
    {
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=template_users.csv",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];
        $columns = ['Name', 'NPM', 'Email', 'Group'];
        $example = ['Putra.dev', '2317051098', 'Putra@gmail.com', 'Angkatan 2023'];

        $callback = function () use ($columns, $example) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);
            fputcsv($file, $example);
            fclose($file);
        };
        return response()->stream($callback, 200, $headers);
    }
}
