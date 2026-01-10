<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('test_topics', function (Blueprint $table) {
            $table->id();

            $table->foreignId('test_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->foreignId('topic_id')
                  ->constrained()
                  ->cascadeOnDelete();

            // Jumlah soal dari topik ini
            $table->integer('total_questions');

            // Jenis soal yang diambil
            $table->enum('question_type', [
                'multiple_choice',
                'essay',
                'mixed'
            ])->default('mixed');

            $table->unique(['test_id', 'topic_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('test_topics');
    }
};
