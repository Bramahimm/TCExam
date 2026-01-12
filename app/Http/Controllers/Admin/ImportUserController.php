<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ImportUsersRequest;
use App\Imports\UsersImport;
use Maatwebsite\Excel\Facades\Excel;

class ImportUserController extends Controller
{
    public function store(ImportUsersRequest $request)
    {
        Excel::import(
            new UsersImport,
            $request->file('file')
        );

        return redirect()
            ->back()
            ->with('success', 'User peserta berhasil diimport');
    }
}
