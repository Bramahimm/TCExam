import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/UI/Button';

export default function Grouping({ existingGroups }) {
    const [groupName, setGroupName] = useState('');

    const handleAddGroup = () => {
        // Logic for adding group
    };

    const handleDeleteGroup = () => {
        // Logic for deleting group
    };

    return (
        <AdminLayout title="/Users/Group Management">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                        <span className="material-icons">group_work</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Users</h1>
                </div>

                <div className="p-8 text-center">
                    <h2 className="text-green-600 font-bold mb-4 text-left">Group Management</h2>
                    
                    <div className="max-w-4xl mx-auto border-2 border-green-500 rounded-xl p-10">
                        <div className="flex items-center justify-center gap-8">
                            <label className="text-xl font-bold text-green-700">Group</label>
                            <div className="flex-1 max-w-xl flex items-center gap-2 border border-gray-300 rounded p-4 shadow-inner">
                                <span className="text-gray-400">+</span>
                                <input className="w-full outline-none" placeholder="Search or select..." />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center items-center gap-4 border border-gray-200 rounded-lg p-6 max-w-md mx-auto shadow-sm">
                            <label className="font-bold text-green-700">Name</label>
                            <input 
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                className="flex-1 border border-gray-300 rounded p-1" 
                            />
                            <span className="text-red-500">*</span>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center gap-4">
                        <Button onClick={handleAddGroup} className="bg-[#00a65a] px-10">Add</Button>
                        <Button onClick={handleDeleteGroup} variant="danger" className="px-10">Delete</Button>
                    </div>

                    <div className="mt-8 bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-700 text-left">
                        On this form you can manage various user groups.
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}