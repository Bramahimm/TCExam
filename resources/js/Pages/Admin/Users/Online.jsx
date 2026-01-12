import React from "react";
// HAPUS import AdminLayout
import Table from "@/Components/UI/Table";

// Props disesuaikan menjadi { users } sesuai kiriman dari Index.jsx
export default function Online({ users = [] }) {
  const columns = [
    {
      label: "User",
      key: "name", 
      render: (val) => (
        <div className="flex items-center gap-2 text-blue-700 font-bold">
          <span className="material-icons text-[10px] text-green-500 animate-pulse">
            circle
          </span>
          {val}
        </div>
      ),
    },
    {
      label: "NPM",
      key: "npm",
    },
    {
      label: "Address (IP)",
      key: "ip_address",
      render: (val) => (
        <code className="bg-gray-100 px-2 py-1 rounded text-[10px]">
          {val || "127.0.0.1"}
        </code>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden text-left">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
          <span className="material-icons text-3xl">record_voice_over</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          Users
        </h1>
      </div>

      <div className="p-8">
        <h2 className="text-green-600 font-bold mb-4 uppercase">
          Online Users
        </h2>

        <Table
          columns={columns}
          data={users} 
          emptyMessage="No users currently online"
        />

        <div className="mt-8 bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-700 italic">
          This form displays users who are currently logged in.
        </div>
      </div>
    </div>
  );
}
