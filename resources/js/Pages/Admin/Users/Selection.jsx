import React, { useState, useMemo } from "react";
import { router, usePage } from "@inertiajs/react";
import { CheckSquare, Search } from "lucide-react"; // Icon Lucide
import Table from "@/Components/UI/Table";
import Button from "@/Components/UI/Button";
import Pagination from "@/Components/UI/Pagination";
import DataFilter from "@/Components/Shared/DataFilter";

export default function Selection({ users }) {
  // Ambil groups & filters dari usePage (dikirim via middleware/controller)
  const { groups, filters } = usePage().props;

  // State untuk parameter filter/search
  const [params, setParams] = useState({
    search: filters?.search || "",
    group_id: filters?.group_id || "",
  });

  // --- Logic Refresh Data (Server-side) ---
  const refreshData = (newParams) => {
    setParams(newParams);
    router.get(
      route("admin.users.index"),
      { ...newParams, section: "selection" }, // Pastikan section='selection'
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      },
    );
  };

  // --- Config Dropdown Filter (Grup) ---
  const filterConfig = useMemo(
    () => [
      {
        label: "Filter Grup",
        value: params.group_id,
        options: groups.map((g) => ({ value: g.id, label: g.name })),
        onChange: (val) => refreshData({ ...params, group_id: val }),
      },
    ],
    [params, groups],
  );

  // --- Logic Search dengan Debounce ---
  const onSearch = (val) => {
    setParams((prev) => ({ ...prev, search: val }));
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      router.get(
        route("admin.users.index"),
        { ...params, search: val, section: "selection" },
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
        },
      );
    }, 400);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* --- Header Section --- */}
      <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5">
              {/* Icon CheckSquare untuk Selection */}
              <CheckSquare className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Pilih Pengguna
              </h1>
              <p className="text-[11px] text-gray-500 font-semibold">
                {/* PERBAIKAN 1: Gunakan .total */}
                {users.total || 0} pengguna tersedia untuk seleksi
              </p>
            </div>
          </div>
          {/* Tombol Aksi Massal (Nanti bisa difungsikan) */}
          <Button
            variant="outline"
            className="text-xs px-4 py-2 border-gray-300 text-gray-600"
            onClick={() => alert("Fitur Bulk Action akan segera hadir!")}>
            Pilih Semua
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* --- Search & Filter --- */}
        <DataFilter
          searchPlaceholder="Cari pengguna..."
          searchValue={params.search}
          onSearchChange={onSearch}
          filters={filterConfig}
          onReset={() => refreshData({ search: "", group_id: "" })}
        />

        {/* --- Table Data --- */}
        <Table
          data={users.data || []}
          emptyMessage="Tidak ada pengguna ditemukan"
          columns={[
            // Kolom Checkbox (Simulasi dulu)
            {
              label: "",
              key: "select",
              className: "w-10 text-center",
              render: (_, row) => (
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                />
              ),
            },
            {
              label: "NPM",
              key: "npm",
              className: "font-mono text-sm w-32",
            },
            {
              label: "Nama Lengkap",
              key: "name",
              className: "font-semibold",
            },
            {
              label: "Grup",
              key: "groups",
              render: (g) =>
                g && g.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {g.map((i) => (
                      <span
                        key={i.id}
                        className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold border border-gray-200">
                        {i.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400 italic text-xs">-</span>
                ),
            },
            {
              label: "Email",
              key: "email",
              className: "text-gray-500 text-xs",
            },
            {
              label: "Hasil Ujian",
              key: "result",
              className: "font-semibold",
            },
          ]}
          className="hover:bg-gray-50 transition-colors"
        />

        {/* Pagination */}
        <div className="mt-4">
          {users.links && <Pagination links={users.links} />}
        </div>
      </div>
    </div>
  );
}
