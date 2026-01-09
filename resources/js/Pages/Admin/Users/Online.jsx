import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Table from "@/Components/UI/Table";

export default function Online({ onlineUsers = [] }) {
  const columns = [
    {
      label: "User",
      key: "username",
      render: (val) => (
        <div className="flex items-center gap-2 text-blue-700 font-bold">
          <span className="material-icons text-xs text-green-500 animate-pulse">
            circle
          </span>
          {val}
        </div>
      ),
    },
    { label: "Status", key: "status" },
    {
      label: "Address (IP)",
      key: "ip_address",
      render: (val) => (
        <code className="bg-gray-100 px-2 py-1 rounded text-[10px]">{val}</code>
      ),
    },
  ];

  return (
    <AdminLayout title="/Users/UserOnline">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <span className="material-icons text-3xl">record_voice_over</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight text-left">
            Users
          </h1>
        </div>

        <div className="p-8">
          <h2 className="text-green-600 font-bold mb-4">Online Users</h2>

          <Table
            columns={columns}
            data={onlineUsers}
            emptyMessage="No users currently online"
          />

          <div className="mt-8 bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-700 italic">
            This form displays users who are currently logged in. Data is
            simulated for UI preview.
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
