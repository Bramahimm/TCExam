import React, { useState } from 'react';
import axios from 'axios';

export default function AnswerOptions({ question, selectedAnswer, testUserId, onAnswer }) {
    const [isSaving, setIsSaving] = useState(false);

    const handleSelect = async (answerId, answerText) => {
        // 1. Optimistic Update (Langsung update UI biar cepat)
        onAnswer({ answerId, answerText });

        // 2. Kirim ke Backend (Background Process)
        setIsSaving(true);
        try {
            await axios.post(route('peserta.tests.answer', testUserId), {
                question_id: question.id,
                answer_id: answerId,
            });
        } catch (error) {
            console.error("Gagal menyimpan jawaban", error);
            alert("Gagal menyimpan jawaban. Periksa koneksi internet Anda.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-3">
            {question.answers.map((option) => {
                const isSelected = selectedAnswer?.answerId === option.id;
                
                return (
                    <button
                        key={option.id}
                        onClick={() => handleSelect(option.id, option.answer_text)}
                        disabled={isSaving}
                        className={`
                            w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 group relative overflow-hidden
                            ${isSelected 
                                ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-1 ring-emerald-200' 
                                : 'border-gray-100 hover:border-emerald-200 hover:bg-gray-50'
                            }
                        `}
                    >
                        {/* Indikator Bulatan (Radio) */}
                        <div className={`
                            w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors
                            ${isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300 group-hover:border-emerald-400'}
                        `}>
                            {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                        </div>

                        {/* Teks Jawaban */}
                        <div className="flex-1">
                            {option.answer_image && (
                                <img src={`/storage/${option.answer_image}`} className="mb-2 max-h-40 rounded-lg" />
                            )}
                            <span className={`text-base ${isSelected ? 'text-emerald-900 font-medium' : 'text-gray-700'}`}>
                                {option.answer_text}
                            </span>
                        </div>

                        {/* Dekorasi Garis Kanan */}
                        {isSelected && (
                            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-emerald-500" />
                        )}
                    </button>
                );
            })}

            {/* Status Simpan Kecil di Bawah */}
            <div className="flex justify-end mt-2 h-5">
                {isSaving && (
                    <span className="text-xs text-emerald-600 animate-pulse font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-ping"></span>
                        Menyimpan...
                    </span>
                )}
            </div>
        </div>
    );
}