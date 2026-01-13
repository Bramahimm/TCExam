import React, { useState, useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { palettePeserta } from '@/constants/palette';
import { User, Calendar, Clock, BookOpen, Menu } from 'lucide-react';
import QuestionCard from './Components/QuestionCard';
import Timer from './Components/Timer';
import Navigation from './Components/Navigation';
import SubmitModal from './Components/SubmitModal';

export default function Start({ test, testUserId, questions, remainingSeconds, existingAnswers }) {
    const { auth } = usePage().props;
    const theme = palettePeserta.luxuryNature;

    // 1. Cek LocalStorage untuk posisi terakhir
    const [currentIndex, setCurrentIndex] = useState(() => {
        const savedIndex = localStorage.getItem(`cbt_last_index_${testUserId}`);
        const parsed = parseInt(savedIndex, 10);
        return !isNaN(parsed) && parsed >= 0 && parsed < questions.length ? parsed : 0;
    });

    const [answers, setAnswers] = useState(existingAnswers || {});
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Untuk Mobile

    const currentQuestion = questions[currentIndex];

    // 2. Simpan posisi ke LocalStorage setiap pindah soal
    useEffect(() => {
        localStorage.setItem(`cbt_last_index_${testUserId}`, currentIndex);
    }, [currentIndex, testUserId]);

    // 3. Real-time Clock (Jam di Header)
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // 4. Disable Klik Kanan (Security)
    useEffect(() => {
        const handleContext = (e) => e.preventDefault();
        document.addEventListener('contextmenu', handleContext);
        return () => document.removeEventListener('contextmenu', handleContext);
    }, []);

    // 🔥 FUNGSI UTAMA: Submit Ujian
    const submitTest = () => {
        // Hapus history posisi
        localStorage.removeItem(`cbt_last_index_${testUserId}`);

        // Post ke backend
        router.post(route('peserta.tests.submit', testUserId), {}, {
            replace: true,
        });
    };
    

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-900 flex flex-col">
            <Head title={`Ujian: ${test.title}`} />

            {/* --- HEADER --- */}
            <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-4 md:px-6 fixed top-0 inset-x-0 z-30 justify-between">
                <div className="flex items-center gap-4">
                    {/* Tombol Menu Mobile */}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 -ml-2 text-gray-600">
                        <Menu className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-sm md:text-lg font-bold text-gray-900 line-clamp-1">{test.title}</h1>
                        <p className="text-xs text-gray-500">Soal {currentIndex + 1} dari {questions.length}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 text-xs md:text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        <span>{currentTime.toLocaleDateString('id-ID')}</span>
                        <span className="w-px h-3 bg-gray-300 mx-1"></span>
                        <Clock className="w-3.5 h-3.5 text-gray-500" />
                        <span className="font-mono">{currentTime.toLocaleTimeString('id-ID')}</span>
                    </div>
                </div>
            </header>

            {/* --- MAIN LAYOUT --- */}
            <main className="flex-1 pt-20 pb-8 px-4 md:px-6 max-w-[1600px] mx-auto w-full grid grid-cols-12 gap-6 items-start">
                
                {/* 1. SIDEBAR KIRI (Navigasi Soal) */}
                <aside className={`
                    lg:col-span-3 lg:block lg:sticky lg:top-24 space-y-4
                    ${isSidebarOpen ? 'fixed inset-0 z-40 bg-white p-4 overflow-y-auto block' : 'hidden'}
                `}>
                    <div className="flex justify-between items-center lg:hidden mb-4">
                        <h3 className="font-bold">Menu Ujian</h3>
                        <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500">Tutup</button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="font-bold text-gray-800 mb-4 flex justify-between items-center text-sm">
                            Navigasi Soal
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">
                                {Object.keys(answers).length}/{questions.length}
                            </span>
                        </h3>
                        <Navigation 
                            questions={questions} 
                            current={currentIndex}
                            answers={answers}
                            onJump={(idx) => {
                                setCurrentIndex(idx);
                                setIsSidebarOpen(false);
                            }}
                        />
                    </div>
                    
                    <button
                        onClick={() => setShowSubmitModal(true)}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md transition-all text-sm flex items-center justify-center gap-2"
                    >
                        Selesai & Kumpulkan
                    </button>
                </aside>

                {/* 2. AREA TENGAH (Soal) */}
                <section className="col-span-12 lg:col-span-6 flex flex-col gap-6">
                    {/* 🔥 PERBAIKAN DI SINI: Tambahkan props key={currentQuestion.id} */}
                    <QuestionCard 
                        key={currentQuestion.id} 
                        question={currentQuestion}
                        selectedAnswer={answers[currentQuestion.id]}
                        testUserId={testUserId}
                        onAnswer={(val) => setAnswers(prev => ({...prev, [currentQuestion.id]: val}))}
                    />

                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentIndex === 0}
                            className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-sm font-medium shadow-sm transition-colors"
                        >
                            ← Sebelumnya
                        </button>
                        <button
                            onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                            disabled={currentIndex === questions.length - 1}
                            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium shadow-sm transition-colors"
                        >
                            Selanjutnya →
                        </button>
                    </div>
                </section>

                {/* 3. SIDEBAR KANAN (Info & Timer) */}
                <aside className="col-span-12 lg:col-span-3 lg:sticky lg:top-24 space-y-4">
                    {/* Timer Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Sisa Waktu
                        </div>
                        <div className="p-5 flex justify-center">
                            <Timer initialSeconds={remainingSeconds} onExpire={submitTest} />
                        </div>
                    </div>

                    {/* Info Peserta Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Peserta Ujian
                        </div>
                        <div className="p-5">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 shrink-0">
                                    <User className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0 overflow-hidden">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Nama Lengkap</p>
                                    <h4 className="font-bold text-gray-900 text-sm truncate" title={auth.user.name}>
                                        {auth.user.name}
                                    </h4>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100 text-purple-600 shrink-0">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">NPM</p>
                                    <h4 className="font-mono font-bold text-gray-900 text-sm">
                                        {auth.user.npm || auth.user.username || auth.user.id}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            {/* Modal Submit Manual */}
            <SubmitModal 
                isOpen={showSubmitModal} 
                onClose={() => setShowSubmitModal(false)}
                testUserId={testUserId}
                unanswered={questions.length - Object.keys(answers).length}
                theme={theme}
            />
        </div>
    );
}