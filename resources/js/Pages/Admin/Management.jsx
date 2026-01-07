import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/UI/Button";

export default function UserManagement({ groupList }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logical placeholder for user creation
  };

  const handleDelete = () => {
    // Logical placeholder for user deletion
  };

  return (
    <AdminLayout title="/Users/UserManagement">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <span className="material-icons">groups</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            Users
          </h1>
        </div>

        <div className="p-8">
          <h2 className="text-green-600 font-bold mb-4">Users Management</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white border-2 border-green-500 rounded-xl">
            {/* Left Column */}
            <div className="space-y-4">
              <InputField label="User" isRequired />
              <InputField label="Address" isRequired />
              <InputField label="Password" type="password" isRequired />
              <InputField label="Confirm Password" type="password" isRequired />
              <InputField label="Registration Date" type="date" />
              <InputField label="IP" placeholder="000.000.000.000" />
              <InputField label="Roles" />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <InputField label="Registration Number" isRequired />
              <InputField label="First Name" isRequired />
              <InputField label="Last Name" isRequired />
              <InputField label="Birth Date" type="date" isRequired />
              <InputField label="Birth Place" isRequired />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-green-700">
                  Group
                </label>
                <select
                  className="border border-gray-300 rounded p-2 h-32"
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

          <div className="mt-6 flex justify-center gap-4">
            <Button onClick={handleSubmit} className="bg-[#00a65a] px-10">
              Add
            </Button>
            <Button onClick={handleDelete} variant="danger" className="px-10">
              Delete
            </Button>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-700">
            Pada formulir ini Anda dapat mengelola berbagai pengguna yang diizinkan untuk mengakses sistem. Untuk setiap pengguna, Anda dapat menentukan nama, kata sandi, dan tingkat akses. Tingkat 0 menunjukkan pengguna anonim (tidak terdaftar), tingkat 1 menunjukkan pengguna dasar (misalnya mahasiswa), dan tingkat 10 menunjukkan administrator dengan hak akses penuh.
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

const InputField = ({ label, isRequired, ...props }) => (
  <div className="grid grid-cols-3 items-center gap-4">
    <label className="text-sm font-bold text-green-700">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <input
      {...props}
      className="col-span-2 border border-gray-300 rounded p-1.5 focus:ring-2 focus:ring-green-500 outline-none"
    />
  </div>
);
