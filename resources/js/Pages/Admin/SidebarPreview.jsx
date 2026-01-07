import React from 'react';

export default function SidebarPreview({ isVisible, onNavigate, activePageId }) {
    const menuItems = [
        { name: 'Index', icon: 'home', id: 'Index' },
        { 
            name: 'Users', 
            icon: 'people', 
            id: 'Management',
            subMenus: [
                { name: 'User Management', id: 'Management' },
                { name: 'Groups', id: 'Groups' },
                { name: 'Select', id: 'Selection' },
                { name: 'Online', id: 'Online' },
                { name: 'Import', id: 'Import' },
                { name: 'Results', id: 'Results' },
            ]
        },
    ];

    return (
        <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#00a65a] text-white transition-transform duration-300 ${isVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <div className="p-6">
                <h1 className="text-2xl font-bold border-b border-green-400 pb-2 italic">PREVIEW UI</h1>
            </div>
            <nav className="mt-4 px-2 space-y-1">
                {menuItems.map((item) => (
                    <div key={item.id}>
                        <button onClick={() => onNavigate(item.id)} className={`flex items-center gap-3 w-full px-4 py-3 rounded-md ${activePageId === item.id ? 'bg-white/20 font-bold border-l-4 border-white' : 'hover:bg-white/10'}`}>
                            <span className="material-icons">{item.icon}</span>
                            <span>{item.name}</span>
                        </button>
                        {item.subMenus && (
                            <div className="ml-8 mt-1 space-y-1 border-l border-green-400">
                                {item.subMenus.map((sub) => (
                                    <button key={sub.id} onClick={() => onNavigate(sub.id)} className={`block w-full text-left px-4 py-2 text-sm ${activePageId === sub.id ? 'text-yellow-300 font-bold' : 'text-white/80 hover:text-white'}`}>
                                        {sub.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
} 