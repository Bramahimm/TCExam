import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index() {
    return (
        <AdminLayout title="/Index">
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <span className="text-6xl">👋</span>
                    <h1 className="text-7xl font-bold text-gray-800 tracking-tighter">Welcome Admin!</h1>
                </div>

                <p className="text-sm leading-relaxed text-gray-700 font-medium">
                    This is the administration area of <span className="text-green-600 font-bold font-mono uppercase tracking-tight">CBT Exam</span>, 
                    a user-friendly, platform and language independent software used to create, manage, and conduct exams online. 
                    Through the available menu, you can access various parts of the system.
                </p>

                <div className="space-y-6">
                    <FeatureBox 
                        title="Users" 
                        color="green" 
                        description="This section contains forms to add and manage users, select specific users, and display a list of users who are currently online. Only users who have registered and have a username and password are entitled to access the public area of the system and take exams."
                    />
                    <FeatureBox 
                        title="Modules" 
                        color="green" 
                        description="This section contains forms to add and modify exam modules, topics, as well as related questions and answers. Admin can select an unlimited number of topics to be used simultaneously in one exam."
                    />
                    <FeatureBox 
                        title="Test" 
                        color="green" 
                        description="This section includes forms to add, generate, and modify exams, forms to grade essay answers, and forms to display or generate exam results in PDF format."
                    />
                </div>
            </div>
        </AdminLayout>
    );
}

const FeatureBox = ({ title, description, color }) => (
    <div className={`border-2 border-green-500 rounded-2xl p-6 bg-white shadow-sm`}>
        <h3 className="text-green-600 font-bold mb-2 text-lg">{title}</h3>
        <p className="text-sm text-gray-600 leading-snug font-medium">
            {description}
        </p>
    </div>
);