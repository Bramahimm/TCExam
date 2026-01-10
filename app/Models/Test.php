<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Test extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'duration',
        'start_time',
        'end_time',
        'is_active',
    ];

    // Ujian ↔ Topik
    public function topics()
    {
        return $this->belongsToMany(Topic::class, 'test_topics')
            ->withPivot(['total_questions', 'question_type']);
    }

    // Ujian ↔ Angkatan
    public function groups()
    {
        return $this->belongsToMany(Group::class, 'test_groups');
    }

    // Ujian → Peserta yang ikut
    public function testUsers()
    {
        return $this->hasMany(TestUser::class);
    }
}
