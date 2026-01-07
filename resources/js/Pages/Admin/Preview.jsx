import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

import SidebarPreview from './SidebarPreview'; // Jika dipindah ke folder yang sama
import Navbar from '@/Components/Shared/Navbar';
import FlashMessage from '@/Components/Shared/FlashMessage';

import IndexPage from './Index';
import ManagementPage from './Management';
import SelectionPage from './Selection';
import GroupingPage from './Grouping';
import OnlinePage from './Online';
import ImportPage from './Import';
import ResultsPage from './Results';

export default function Preview() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activePageId, setActivePageId] = useState('Index');

    const mockGroups = [
        { id: 1, name: 'Medical Student 2022' },
        { id: 2, name: 'Medical Student 2023' }
    ];

    const renderContent = () => {
        switch (activePageId) {
            case 'Index': return <IndexPage />;
            case 'Management': return <ManagementPage groupList={mockGroups} />;
            case 'Groups': return <GroupingPage existingGroups={mockGroups} />;
            case 'Selection': return <SelectionPage userList={[]} />;
            case 'Online': return <OnlinePage onlineUsers={[]} />;
            case 'Import': return <ImportPage />;
            case 'Results': return <ResultsPage resultData={[]} />;
            default: return <IndexPage />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Head title={`Preview Mode - ${activePageId}`} />
            
            <SidebarPreview 
                isVisible={isSidebarOpen} 
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
                onNavigate={(id) => setActivePageId(id)} 
                activePageId={activePageId}
            />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Navbar pageTitle={`/Admin/Preview/${activePageId}`} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-8 italic border-4 border-yellow-400 border-dashed">
                    <div className="bg-yellow-100 text-yellow-800 p-2 mb-4 text-xs font-bold rounded text-center">
                        PREVIEW MODE: Menampilkan komponen secara statis tanpa Backend
                    </div>
                    <FlashMessage />
                    <div className="max-w-7xl mx-auto">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
}