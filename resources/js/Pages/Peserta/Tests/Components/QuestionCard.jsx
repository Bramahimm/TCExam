import React from 'react';
import AnswerOptions from './AnswerOptions';
import EssayInput from './EssayInput';

export default function QuestionCard({ question, selectedAnswer, testUserId, onAnswer }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fade-in">
            {/* 1. Bagian Soal (Teks & Gambar) */}
            <div className="mb-8">
                <div className="prose max-w-none text-lg text-gray-800 font-medium leading-relaxed whitespace-pre-wrap">
                    {question.question_text}
                </div>
                
                {question.question_image && (
                    <div className="mt-4">
                        <img 
                            src={`/storage/${question.question_image}`} 
                            alt="Visual Soal" 
                            className="rounded-xl border border-gray-200 max-h-96 object-contain" 
                        />
                    </div>
                )}
            </div>

            {/* 2. Bagian Input Jawaban (Otomatis memilih komponen berdasarkan tipe soal) */}
            <div className="border-t border-gray-100 pt-6">
                {question.type === 'multiple_choice' ? (
                    <AnswerOptions 
                        question={question}
                        selectedAnswer={selectedAnswer} // Mengirim state jawaban yang dipilih
                        testUserId={testUserId}
                        onAnswer={onAnswer} // Callback ke parent (Start.jsx)
                    />
                ) : (
                    <EssayInput 
                        question={question}
                        selectedAnswer={selectedAnswer}
                        testUserId={testUserId}
                        onAnswer={onAnswer}
                    />
                )}
            </div>
        </div>
    );
}