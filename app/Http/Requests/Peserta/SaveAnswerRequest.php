<?php

namespace App\Http\Requests\Peserta;

use Illuminate\Foundation\Http\FormRequest;

class SaveAnswerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'peserta';
    }

    public function rules(): array
    {
        return [
            'question_id' => 'required|exists:questions,id',
            'answer_id' => 'nullable|exists:answers,id',
            'answer_text' => 'nullable|string',
            'is_correct' => 'nullable|boolean',
            'score' => 'nullable|integer|min:0',
        ];
    }
}
