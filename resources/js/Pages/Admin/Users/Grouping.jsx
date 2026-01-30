import React, { useState } from "react";
import { router, usePage, useForm } from "@inertiajs/react";
import { Pencil, Trash2, Plus } from "lucide-react"; 
import Table from "@/Components/UI/Table";
import Button from "@/Components/UI/Button";
import Pagination from "@/Components/UI/Pagination";
import DataFilter from "@/Components/Shared/DataFilter";
import Modal from "@/Components/UI/Modal";
import Input from "@/Components/UI/Input";

// Helper format tanggal
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("id-ID", { dateStyle: "medium" })
    : "-";

export default function Grouping({ groups }) {
  const { filters } = usePage().props;
  const [search, setSearch] = useState(filters?.search || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const {
    data,
    setData,
    post,
    put,
    delete: destroy,
    processing,
    errors,
    reset,
    clearErrors,
  } = useForm({
    name: "",
    description: "",
  });

  // --- Logic Search ---
  const handleSearch = (val) => {
    setSearch(val);
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      router.get(
        route("admin.users.index"),
        { section: "groups", search: val },
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
        },
      );
    }, 400);
  };

  // --- Logic CRUD ---
  const openModal = (group = null) => {
    clearErrors();
    setEditMode(!!group);
    setSelectedId(group?.id || null);
    setData({ name: group?.name || "", description: group?.description || "" });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      onSuccess: () => {
        setIsModalOpen(false);
        reset();
      },
      preserveScroll: true,
    };
    editMode
      ? put(route("admin.groups.update", selectedId), options)
      : post(route("admin.groups.store"), options);
  };

  const handleDelete = (id) => {
    if (
      confirm("Hapus grup ini? User di dalamnya akan kehilangan status grup.")
    ) {
      destroy(route("admin.groups.destroy", id), { preserveScroll: true });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Manajemen Grup
          </h1>
          <p className="text-xs text-gray-500 font-semibold">
            {groups.total || 0} Grup Terdaftar
          </p>
        </div>
        {/* Button Tambah Menggunakan Komponen Button */}
        <Button
          onClick={() => openModal()}
          className="bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-2 flex items-center gap-2">
          <span>Tambah Grup</span>
        </Button>
      </div>

      <div className="p-6">
        {/* Search Filter */}
        <DataFilter
          searchPlaceholder="Cari grup..."
          searchValue={search}
          onSearchChange={handleSearch}
          filters={[]}
          onReset={() => handleSearch("")}
        />

        {/* Table Data */}
        <Table
          data={groups.data || []}
          emptyMessage="Belum ada grup dibuat."
          columns={[
            {
              label: "Nama Grup",
              key: "name",
              className: "font-bold text-gray-800",
            },
            {
              label: "Jumlah Mahasiswa",
              key: "users_count",
              className: "text-center",
              render: (n) => (
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-bold">
                  {n}
                </span>
              ),
            },
            {
              label: "Keterangan",
              key: "description",
              className: "text-gray-500",
              render: (v) => v || "-",
            },
            {
              label: "Dibuat pada",
              key: "created_at",
              className: "text-sm font-bold",
              render: (v) => formatDate(v),
            },
            {
              label: "Aksi",
              key: "actions",
              className: "text-center",
              render: (_, row) => (
                <div className="flex justify-center gap-2">
                  <Button
                    type="button"
                    variant="outline" 
                    onClick={() => openModal(row)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 border-amber-200 hover:border-amber-300"
                    title="Edit Grup">
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </Button>

                  <Button
                    type="button"
                    variant="outline" // Base variant
                    onClick={() => handleDelete(row.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300"
                    title="Hapus Grup">
                    <Trash2 className="w-3.5 h-3.5" />
                    Hapus
                  </Button>
                </div>
              ),
            },
          ]}
        />

        {/* Pagination */}
        <div className="mt-4">
          {groups.links && <Pagination links={groups.links} />}
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editMode ? "Edit Grup" : "Tambah Grup"}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Nama Grup"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            error={errors.name}
            placeholder="Contoh: Angkatan 2024"
            autoFocus
          />
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
              Keterangan
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none min-h-[80px]"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              placeholder="Opsional..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button
              type="submit"
              loading={processing}
              className="bg-green-600 text-white hover:bg-green-700">
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
