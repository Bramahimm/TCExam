import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/UI/Button';

export default function Selection({ userList }) {
    const [selectedUsers, setSelectedUsers] = useState([]);

    const toggleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUsers(userList.map(user => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    return (
        <AdminLayout title="/Users/UserSelection">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                        <span className="material-icons">person_search</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Users</h1>
                </div>

                <div className="p-8">
                    <h2 className="text-green-600 font-bold mb-4">User Selection</h2>
                    
                    <div className="border-2 border-green-500 rounded-xl p-8 space-y-6">
                        <div className="flex justify-center items-center gap-4">
                            <label className="font-bold text-green-700">Group</label>
                            <div className="flex gap-2 w-full max-w-3xl">
                                <div className="flex-1 flex items-center border border-gray-400 p-1 px-2 rounded">+</div>
                                <div className="flex-1 border border-gray-400 rounded"></div>
                                <button className="bg-gray-100 border border-gray-400 px-10 text-xs">Search</button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-xs border-collapse">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="border border-gray-300 p-1 px-2">#</th>
                                        <th className="border border-gray-300 p-1 px-2">User</th>
                                        <th className="border border-gray-300 p-1 px-2">Last Name</th>
                                        <th className="border border-gray-300 p-1 px-2">First Name</th>
                                        <th className="border border-gray-300 p-1 px-2">Reg Number</th>
                                        <th className="border border-gray-300 p-1 px-2">Status</th>
                                        <th className="border border-gray-300 p-1 px-2">Reg Date</th>
                                        <th className="border border-gray-300 p-1 px-2">Group</th>
                                        <th className="border border-gray-300 p-1 px-2">Test</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList.map((user, index) => (
                                        <tr key={user.id} className="text-center">
                                            <td className="border border-gray-300 p-1"><input type="checkbox" /></td>
                                            <td className="border border-gray-300 p-1 text-left">{user.username}</td>
                                            <td className="border border-gray-300 p-1"></td>
                                            <td className="border border-gray-300 p-1"></td>
                                            <td className="border border-gray-300 p-1"></td>
                                            <td className="border border-gray-300 p-1"></td>
                                            <td className="border border-gray-300 p-1"></td>
                                            <td className="border border-gray-300 p-1"></td>
                                            <td className="border border-gray-300 p-1"></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="text-center text-xs mt-1 italic text-gray-500">1/1</p>
                        </div>

                        <div className="flex gap-4 text-xs font-semibold text-gray-600">
                            <label className="flex items-center gap-1 cursor-pointer">
                                <input type="checkbox" onChange={toggleSelectAll} /> Check All
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                                <input type="checkbox" /> Clear Check
                            </label>
                        </div>

                        <div className="grid grid-cols-2 gap-10 max-w-2xl mx-auto items-end">
                            <div className="space-y-2">
                                <p className="text-xs font-bold text-gray-700">Check Option :</p>
                                <button className="bg-gray-100 border border-gray-400 p-1 px-4 text-xs w-24">Delete</button>
                                <div className="flex gap-2">
                                    <input className="border border-gray-400 flex-1 p-1 rounded" placeholder="Group" />
                                    <button className="bg-green-500 text-white p-1 px-4 rounded">Add</button>
                                    <button className="bg-red-500 text-white p-1 px-4 rounded">Delete</button>
                                </div>
                            </div>
                            <div className="space-y-2 border-l border-gray-400 pl-10">
                                <div className="grid grid-cols-4 items-center gap-2">
                                    <span className="text-xs text-gray-500 font-bold">From</span>
                                    <input className="col-span-3 border border-gray-400 p-1 rounded text-xs" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-2">
                                    <span className="text-xs text-gray-500 font-bold">To</span>
                                    <input className="col-span-3 border border-gray-400 p-1 rounded text-xs" />
                                </div>
                                <button className="w-full bg-yellow-400 p-1 rounded text-xs font-bold">Update</button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-700">
                        On this form you can see and select registered users. You can change the display order by clicking the column name.
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}