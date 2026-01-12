import React from 'react';
import { Menu, Bell, User, LogOut, ChevronDown } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function NavbarPeserta({ toggleSidebar, theme }) {
    const { auth } = usePage().props;

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20 px-6 py-3 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={toggleSidebar} className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Menu className="w-6 h-6" />
                    </button>
                    <h2 className="text-lg font-semibold text-gray-800 hidden md:block">
                        Selamat Datang, <span style={{ color: theme.primary }}>{auth.user.name}</span>
                    </h2>
                </div>

                <div className="flex items-center gap-4">
                    {/* Notification */}
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full relative transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-gray-800">{auth.user.name}</p>
                            <p className="text-xs text-gray-500">Peserta Ujian</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-500">
                            <User className="w-5 h-5 text-emerald-700" />
                        </div>
                        
                        <Link 
                            href={route('logout')} 
                            method="post" 
                            as="button" 
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Keluar"
                        >
                            <LogOut className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}