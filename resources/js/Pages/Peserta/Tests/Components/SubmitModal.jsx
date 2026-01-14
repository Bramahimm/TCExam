import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function SubmitModal({ isOpen, onClose, testUserId, unanswered, theme }) {
    if (!isOpen) return null;

    const handleSubmit = () => {
        router.post(route('peserta.tests.submit', testUserId), {}, {
            onFinish: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
                <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8 text-yellow-600" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Kumpulkan Ujian?</h3>
                    
                    <p className="text-gray-500 mb-6">
                        {unanswered > 0 
                            ? `Masih ada ${unanswered} soal yang belum dijawab. Yakin ingin mengakhiri?`
                            : 'Apakah Anda yakin ingin menyelesaikan dan mengumpulkan ujian ini?'
                        }
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 px-4 py-2.5 rounded-xl text-white font-bold hover:opacity-90 transition-opacity shadow-lg"
                            style={{ background: theme.primary }}
                        >
                            Ya, Kumpulkan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}