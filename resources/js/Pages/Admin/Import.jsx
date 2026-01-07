import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/UI/Button';
import { useForm } from '@inertiajs/react';

export default function Import() {
    const { data, setData, post, processing } = useForm({
        file: null,
    });

    const handleFileUpload = (e) => {
        setData('file', e.target.files[0]);
    };

    const submitImport = (e) => {
        e.preventDefault();
        post(route('admin.users.import.process'));
    };

    return (
        <AdminLayout title="/Users/UserImporter">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                        <span className="material-icons text-3xl">campaign</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Users</h1>
                </div>

                <div className="p-8">
                    <h2 className="text-green-600 font-bold mb-4">User Importer</h2>
                    
                    <div className="max-w-4xl mx-auto border border-gray-300 rounded-lg p-10 bg-gray-50/50">
                        <div className="text-center space-y-4">
                            <p className="text-blue-600 font-bold text-sm">Upload File</p>
                            
                            <div className="border-2 border-dashed border-gray-400 rounded-lg p-12 flex flex-col items-center justify-center bg-white">
                                <input 
                                    type="file" 
                                    id="file-upload" 
                                    className="hidden" 
                                    accept=".csv,.xml" 
                                    onChange={handleFileUpload}
                                />
                                <label htmlFor="file-upload" className="cursor-pointer text-center">
                                    <p className="text-gray-400 text-xs font-bold leading-relaxed">
                                        Drag or Drop file<br />CSV or XML
                                    </p>
                                </label>
                            </div>

                            <div className="flex justify-center gap-4 mt-8">
                                <Button 
                                    onClick={submitImport} 
                                    isLoading={processing}
                                    className="bg-[#00a65a] px-12"
                                >
                                    Add
                                </Button>
                                <Button variant="danger" className="px-12">
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-700">
                        With this form you can import to register users from an XML or CSV file. [cite: 69]
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}