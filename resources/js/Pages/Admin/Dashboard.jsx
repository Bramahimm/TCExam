import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Table from '@/Components/UI/Table';

export default function Dashboard({ stats, latestTests }) {
    const [serverTime, setServerTime] = useState(new Date());

    useEffect(() => {
        const fetchServerTime = async () => {
            try {
                const response = await fetch('/api/time');
                if (response.ok) {
                    const data = await response.json();
                    setServerTime(new Date(data.server_time));
                }
            } catch (error) {
                console.warn('Gagal mengambil waktu server', error);
            }
        };

        fetchServerTime();
        const syncInterval = setInterval(fetchServerTime, 20_000);
        const tickInterval = setInterval(() => {
            setServerTime(prev => new Date(prev.getTime() + 1000));
        }, 1000);

        return () => {
            clearInterval(syncInterval);
            clearInterval(tickInterval);
        };
    }, []);

    const testColumns = [
        { label: 'Judul Ujian', key: 'title' },
        { label: 'Waktu Mulai', key: 'start_time' },
        { label: 'Waktu Selesai', key: 'end_time' },
        { 
            label: 'Aksi', 
            key: 'id', 
            render: (id) => (
                <button className="text-blue-600 hover:underline text-xs font-medium">
                    Lihat Detail
                </button>
            ) 
        },
    ];

    return (
        <AdminLayout>
            <Head title="Dasbor Admin" />

            <div className="px-4 sm:px-6 lg:px-8 py-6">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Monitor Sistem</h1>
                    <p className="text-gray-500 text-sm mt-1">Status real-time sistem manajemen CBT FK UNILA.</p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <StatCard 
                        label="Total Peserta" 
                        value={stats.totalUsers} 
                        icon="people" 
                        color="bg-blue-500" 
                    />
                    <StatCard 
                        label="Total Ujian" 
                        value={stats.totalTests} 
                        icon="assignment" 
                        color="bg-[#00a65a]" 
                    />
                    <StatCard 
                        label="Ujian Aktif" 
                        value={stats.activeTests} 
                        icon="verified" 
                        color="bg-orange-500" 
                    />
                    <StatCard 
                        label="Sesi Berlangsung" 
                        value={stats.ongoingTests} 
                        icon="timer" 
                        color="bg-purple-600" 
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Tabel Ujian Terbaru */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                                <span className="material-icons text-gray-400 text-sm">history</span>
                                <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Ujian Terbaru</h2>
                            </div>
                            <div className="p-5">
                                <Table 
                                    columns={testColumns} 
                                    data={latestTests} 
                                    emptyMessage="Belum ada ujian yang dijadwalkan."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Panel Kondisi Sistem */}
                    <div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                                <span className="material-icons text-gray-400 text-sm">notifications_active</span>
                                <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Kondisi Sistem</h2>
                            </div>
                            <div className="p-5 space-y-4">
                                <HealthItem label="Koneksi Database" status="stabil" />
                                <HealthItem label="Protokol Inertia" status="aktif" />
                                <HealthItem label="Layanan Mesin CBT" status="siap" />
                                <div className="border-t border-gray-100 pt-4">
                                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Waktu Server</p>
                                    <p className="text-lg font-mono font-semibold text-gray-900">
                                        {serverTime.toLocaleTimeString('id-ID', { hour12: false })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

// Kartu Statistik
const StatCard = ({ label, value, icon, color }) => (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-4">
        <div className={`${color} p-3 rounded-lg text-white`}>
            <span className="material-icons text-2xl">{icon}</span>
        </div>
        <div>
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

const HealthItem = ({ label, status }) => (
    <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[9px] font-bold uppercase tracking-wide">
            {status}
        </span>
    </div>
);