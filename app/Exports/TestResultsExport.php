<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;

class TestResultsExport implements FromCollection
{
    protected int $testId;

    public function __construct(int $testId)
    {
        $this->testId = $testId;
    }

    public function collection(): Collection
    {
        return collect([]);
    }
}
