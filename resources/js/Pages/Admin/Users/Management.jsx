import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/UI/Button";
import Table from "@/Components/UI/Table";
import Modal from "@/Components/UI/Modal";
import Loader from "@/Components/UI/Loader";

export default function UserManagement({ userList = [], groupList = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Definisi Kolom untuk Table
  const columns = [
    { label: "User", key: "username" },
    { label: "Reg. Number", key: "reg_no" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Group", key: "group" },
  ];

  const handleOpenModal = (user = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulasi proses simpan
    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <AdminLayout title="/Users/UserManagement">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <span className="material-icons">groups</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight text-left">
              Users
            </h1>
          </div>
          <Button onClick={() => handleOpenModal()} className="bg-[#00a65a]">
            + Add New User
          </Button>
        </div>

        <div className="p-8">
          <h2 className="text-green-600 font-bold mb-4">Users Management</h2>

          {/* Table sebagai View Utama */}
          <Table
            columns={columns}
            data={userList}
            onRowClick={(row) => handleOpenModal(row)}
            emptyMessage="No users found."
          />

          <div className="mt-8 bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-700 text-left">
            Pada formulir ini Anda dapat mengelola berbagai pengguna. Klik pada
            baris tabel untuk mengubah data.
          </div>
        </div>
      </div>

      {/* Modal untuk Isolasi Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? "Update User" : "Add New User"}
        size="lg"
        loading={isLoading}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white border-2 border-green-500 rounded-xl relative">
            {/* Left Column */}
            <div className="space-y-4">
              <InputField
                label="User"
                isRequired
                defaultValue={selectedUser?.username}
              />
              <InputField label="Address" isRequired />
              <InputField
                label="Password"
                type="password"
                isRequired={!selectedUser}
              />
              <InputField
                label="Confirm Password"
                type="password"
                isRequired={!selectedUser}
              />
              <InputField label="Registration Date" type="date" />
              <InputField label="IP" placeholder="000.000.000.000" />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <InputField
                label="Reg. Number"
                isRequired
                defaultValue={selectedUser?.reg_no}
              />
              <InputField
                label="First Name"
                isRequired
                defaultValue={selectedUser?.firstName}
              />
              <InputField
                label="Last Name"
                isRequired
                defaultValue={selectedUser?.lastName}
              />
              <InputField label="Birth Date" type="date" isRequired />
              <InputField label="Birth Place" isRequired />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-green-700">
                  Group
                </label>
                <select
                  className="border border-gray-300 rounded p-2 h-32 outline-none focus:ring-2 focus:ring-green-500"
                  multiple>
                  {groupList.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#00a65a] px-10">
              {selectedUser ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}

const InputField = ({ label, isRequired, ...props }) => (
  <div className="grid grid-cols-3 items-center gap-4 text-left">
    <label className="text-sm font-bold text-green-700 leading-tight">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <input
      {...props}
      className="col-span-2 border border-gray-300 rounded p-1.5 focus:ring-2 focus:ring-green-500 outline-none text-sm"
    />
  </div>
);
