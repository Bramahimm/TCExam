import React from "react";
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function ImportAlert({ flash }) {
    // Jika tidak ada pesan apapun dari server, jangan tampilkan apa-apa (return null)
    if (!flash.success && !flash.warning && !flash.error) return null;

    return (
        <div className="mb-8 space-y-4">
            {/* SUKSES (HIJAU) */}
            {flash.success && (
                <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200 shadow-sm animate-fade-in-down">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-bold text-emerald-800">Berhasil</h3>
                            <div className="mt-1 text-sm text-emerald-700">{flash.success}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* PERINGATAN / DATA SKIP (KUNING) */}
            {flash.warning && (
                <div className="rounded-lg bg-amber-50 p-4 border border-amber-200 shadow-sm animate-fade-in-down">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <ExclamationCircleIcon className="h-5 w-5 text-amber-500" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-bold text-amber-800">Perhatian</h3>
                            <div className="mt-1 text-sm text-amber-700">{flash.warning}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* ERROR / GAGAL (MERAH) */}
            {flash.error && (
                <div className="rounded-lg bg-red-50 p-4 border border-red-200 shadow-sm animate-fade-in-down">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-bold text-red-800">Gagal Mengimport</h3>
                            <div className="mt-1 text-sm text-red-700">{flash.error}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}