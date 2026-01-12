import React from "react";
import Table from "@/Components/UI/Table";
import Button from "@/Components/UI/Button";

export default function Management({ users, onAddClick, onEditClick, flash }) {
  return (
    <div className="space-y-4 text-left">
      {flash?.success && (
        <div className="p-4 bg-green-100 text-green-700 rounded-xl font-bold text-sm">
          {flash.success}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-gray-800 uppercase">
          Manajemen Mahasiswa
        </h2>
        <Button onClick={onAddClick} className="bg-[#00a65a]">
          Tambah Mahasiswa
        </Button>
      </div>

      <Table
        columns={[
          { label: "NPM", key: "npm" },
          { label: "Nama", key: "name" },
          {
            label: "Groups",
            key: "groups",
            render: (g) => g.map((i) => i.name).join(", ") || "-",
          },
        ]}
        data={users}
        onRowClick={onEditClick}
      />
    </div>
  );
}
