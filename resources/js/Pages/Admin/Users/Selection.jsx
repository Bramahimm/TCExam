import React from "react";
// HAPUS import AdminLayout
import Button from "@/Components/UI/Button";
import Table from "@/Components/UI/Table";

// Props disesuaikan menjadi { users, groups } dari Index.jsx
export default function Selection({ users = [], groups = [] }) {
  const columns = [
    { label: "Nama Lengkap", key: "name" }, // Sesuai kolom DB
    { label: "NPM", key: "npm" }, // Sesuai kolom DB
    {
      label: "Group Saat Ini",
      key: "groups",
      render: (val) => val.map((g) => g.name).join(", ") || "-",
    },
    {
      label: "Status",
      key: "is_active",
      render: (val) =>
        val ? (
          <span className="text-green-600 font-bold text-xs uppercase">
            Aktif
          </span>
        ) : (
          <span className="text-red-600 font-bold text-xs uppercase">
            Non-Aktif
          </span>
        ),
    },
  ];

  return (
    // HAPUS pembungkus AdminLayout
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden text-left">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
          <span className="material-icons">person_search</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          Users
        </h1>
      </div>

      <div className="p-8">
        <h2 className="text-green-600 font-bold mb-4 uppercase">
          User Selection & Batch Action
        </h2>

        <div className="border-2 border-green-500 rounded-xl p-8 mb-6">
          <div className="flex justify-center items-center gap-4">
            <label className="font-bold text-green-700">Filter Group</label>
            <div className="flex gap-2 w-full max-w-3xl">
              <select className="flex-1 border border-gray-400 p-2 rounded text-sm outline-none bg-white">
                <option value="">Semua Grup</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
              <Button className="bg-blue-600 px-10 text-xs">Search</Button>
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          data={users}
          renderActions={() => (
            <input
              type="checkbox"
              className="w-4 h-4 text-green-600 cursor-pointer"
            />
          )}
        />

        {/* Batch Actions Area */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 border-t pt-8">
          <div className="space-y-4">
            <p className="text-xs font-black text-gray-700 uppercase tracking-widest">
              Selected Action :
            </p>
            <div className="flex gap-2">
              <select className="flex-1 border border-gray-400 p-2 rounded text-sm bg-white">
                <option value="">Pilih Target Grup...</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
              <Button className="bg-green-500 px-6">Assign</Button>
              <Button variant="danger" className="px-6">
                Delete
              </Button>
            </div>
          </div>

          <div className="space-y-4 border-l pl-10 hidden md:block">
            <p className="text-xs font-black text-gray-700 uppercase tracking-widest">
              Update Group :
            </p>
            <div className="grid grid-cols-4 items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase">
                From Group
              </span>
              <select className="col-span-3 border border-gray-400 p-1 rounded text-xs bg-white">
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <Button className="w-full bg-yellow-400 font-bold text-xs uppercase py-2 text-gray-800">
              Update All in Group
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
