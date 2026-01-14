import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PesertaLayout from '@/Layouts/PesertaLayout';
import { ArrowLeft, Calendar, Clock, CheckCircle, XCircle, Award } from 'lucide-react';

export default function Detail({ testUser }) {
    const { test, result, answers } = testUser;
    
    // Stats calculation
    const totalQuestions = answers?.length || 0;
    const correctCount = answers?.filter(a => a.is_correct).length || 0;
    const wrongCount = totalQuestions - correctCount;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    return (
        <PesertaLayout>
            <Head title={`Detail Hasil - ${test.title}`} />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Back Button */}
                <Link href={route('peserta.results.index')} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Kembali ke Riwayat
                </Link>

                {/* Score Card Hero */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
                    <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-center sm:text-left">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{test.title}</h1>
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(testUser.finished_at).toLocaleDateString('id-ID')}</span>
                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Durasi: {test.duration} Menit</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Akurasi</p>
                                <p className="text-lg font-semibold text-gray-700">{accuracy}%</p>
                            </div>
                            <div className="w-px h-10 bg-gray-200" />
                            <div className="text-center">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Nilai Akhir</p>
                                <p className={`text-4xl font-bold ${result.total_score >= 70 ? 'text-emerald-600' : 'text-red-500'}`}>
                                    {result.total_score}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mini Stats Grid */}
                    <div className="grid grid-cols-3 border-t border-gray-100 bg-gray-50/50">
                        <div className="p-4 text-center border-r border-gray-100">
                            <p className="text-xs text-gray-500 mb-1">Total Soal</p>
                            <p className="font-bold text-gray-800">{totalQuestions}</p>
                        </div>
                        <div className="p-4 text-center border-r border-gray-100">
                            <p className="text-xs text-green-600 mb-1">Benar</p>
                            <p className="font-bold text-green-700">{correctCount}</p>
                        </div>
                        <div className="p-4 text-center">
                            <p className="text-xs text-red-600 mb-1">Salah</p>
                            <p className="font-bold text-red-700">{wrongCount}</p>
                        </div>
                    </div>
                </div>

                {/* Review Jawaban */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-800 px-1">Pembahasan Jawaban</h2>
                    
                    {answers.map((ans, index) => {
                        const isCorrect = ans.is_correct;
                        return (
                            <div key={ans.id} className={`bg-white rounded-xl border p-5 transition-all ${isCorrect ? 'border-gray-200' : 'border-red-100 bg-red-50/10'}`}>
                                <div className="flex gap-4">
                                    <div className={`
                                        flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                                        ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                                    `}>
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="prose prose-sm max-w-none text-gray-800">
                                            {ans.question.question_text}
                                        </div>
                                        
                                        {/* Jawaban User vs Kunci (Jika diizinkan tampil) */}
                                        <div className="text-sm space-y-2 mt-2 pt-2 border-t border-dashed border-gray-100">
                                            <div className="flex items-start gap-2">
                                                <span className="min-w-[100px] text-gray-500 text-xs uppercase font-bold mt-0.5">Jawaban Anda:</span>
                                                <span className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-600'}`}>
                                                    {ans.answer_text || '(Kosong)'}
                                                </span>
                                                {isCorrect ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                                            </div>
                                            
                                            {/* Optional: Tampilkan Kunci Jawaban jika salah */}
                                            {!isCorrect && (
                                                <div className="flex items-start gap-2">
                                                    <span className="min-w-[100px] text-gray-500 text-xs uppercase font-bold mt-0.5">Kunci Jawaban:</span>
                                                    <span className="font-medium text-emerald-700">
                                                        {/* Logic untuk cari kunci jawaban harus dihandle di controller agar aman, atau dikirim via props */}
                                                        {/* Contoh: ans.question.correct_answer_text */}
                                                        (Lihat pembahasan)
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </PesertaLayout>
    );
}