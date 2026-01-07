import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Sidebar({ isVisible, onToggle }) {
    const { url } = usePage();

    const menuItems = [
        { name: 'Index', icon: 'home', route: '/admin' },
        { name: 'Users', icon: 'people', route: '/admin/users', isParent: true },
        { name: 'Modules', icon: 'inventory_2', route: '/admin/modules' },
        { name: 'Tests', icon: 'assignment', route: '/admin/tests' },
        { name: 'Backup', icon: 'storage', route: '/admin/backup' },
        { name: 'Public', icon: 'language', route: '/admin/public' },
        { name: 'Help', icon: 'help_outline', route: '/admin/help' },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {!isVisible && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
                    onClick={onToggle}
                />
            )}

            <aside className={`
                fixed lg:static inset-y-0 left-0 z-30
                w-64 bg-[#00a65a] text-white transition-transform duration-300 transform
                ${isVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6">
                    <h1 className="text-2xl font-bold border-b border-green-400 pb-2">CBT EXAM</h1>
                    <p className="text-xs opacity-80 mt-1 uppercase tracking-widest">Admin Panel</p>
                </div>

                <nav className="mt-4 px-2 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = url.startsWith(item.route);
                        return (
                            <Link
                                key={item.name}
                                href={item.route}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-md transition-colors
                                    ${isActive 
                                        ? 'bg-white/20 font-bold shadow-inner border-l-4 border-white' 
                                        : 'hover:bg-white/10'}
                                `}
                            >
                                <span className="material-icons">{item.icon}</span>
                                <span className="text-lg">{item.name}</span>
                            </Link>
                        );
                    })}

                    <div className="pt-10">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-red-600 transition-colors w-full text-left"
                        >
                            <span className="material-icons">logout</span>
                            <span className="text-lg">Exit</span>
                        </Link>
                    </div>
                </nav>
            </aside>
        </>
    );
}