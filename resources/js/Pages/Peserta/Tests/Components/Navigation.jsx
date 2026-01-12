import React from 'react';

export default function Navigation({ questions, current, answers, onJump }) {
    return (
        <div>
            {/* LAYOUT FLEX:
               - flex-wrap: Tombol otomatis turun ke bawah jika mentok kanan
               - gap-2: Jarak antar tombol
               - justify-start: Rata kiri
            */}
            <div className="flex flex-wrap gap-2 justify-start">
                {questions.map((question, index) => {
                    const isActive = current === index;
                    
                    // Cek apakah ID soal ini ada di daftar jawaban
                    const isAnswered = answers[question.id] !== undefined;

                    return (
                        <button
                            key={question.id}
                            onClick={() => onJump(index)}
                            // 🔥 FIX: 'flex-none' agar ukuran tidak berubah/gepeng
                            // 'w-9 h-9' ukuran fix kotak
                            className={`
                                flex-none w-9 h-9 flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-200 border relative
                                ${isActive 
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-100 z-10 scale-105' 
                                    : isAnswered 
                                        ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600' 
                                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:border-gray-400' 
                                }
                            `}
                        >
                            {index + 1}
                            
                            {/* Indikator titik kecil (Opsional) */}
                            {isActive && !isAnswered && (
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-400 rounded-full border-2 border-white"></span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Legend Keterangan Warna */}
            <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-y-2 text-[10px] text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded"></div> Sedang Dibuka
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded"></div> Sudah Dijawab
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div> Belum Dijawab
                </div>
            </div>
        </div>
    );
}