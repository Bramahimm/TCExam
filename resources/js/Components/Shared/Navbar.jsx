import React from 'react';

export default function Navbar({ pageTitle, onMenuClick }) {
    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 z-10">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Toggle */}
                <button 
                    onClick={onMenuClick}
                    className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
                >
                    <span className="material-icons">menu</span>
                </button>
                <h2 className="text-xl font-semibold text-gray-800">{pageTitle}</h2>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <span className="material-icons text-gray-400">account_circle</span>
                    <span>Admin</span>
                </div>
            </div>
        </header>
    );
}