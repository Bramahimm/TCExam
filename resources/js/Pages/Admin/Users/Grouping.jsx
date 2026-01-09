import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/UI/Button";
import Table from "@/Components/UI/Table";
import Modal from "@/Components/UI/Modal";
import Input from "@/Components/UI/Input";

export default function Grouping({ existingGroups = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");

  const columns = [
    { label: "Group Name", key: "name" },
    {
      label: "Total Users",
      key: "user_count",
      render: (val) => `${val || 0} Users`,
    },
  ];

  return (
    <AdminLayout title="/Users/Group Management">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <span className="material-icons">group_work</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              Users
            </h1>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="bg-[#00a65a]">
            + Group Baru
          </Button>
        </div>

        <div className="p-8">
          <h2 className="text-green-600 font-bold mb-4">Group Management</h2>
          <Table
            columns={columns}
            data={existingGroups}
            emptyMessage="No groups registered yet."
            renderActions={() => (
              <Button variant="danger" className="text-xs py-1">
                Delete
              </Button>
            )}
          />

          <div className="mt-8 bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-700 italic">
            On this form you can manage various user groups.
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Group"
        footer={<Button className="bg-[#00a65a]">Save Group</Button>}>
        <div className="p-10 border-2 border-green-500 rounded-xl space-y-4">
          <Input
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name..."
          />
          <p className="text-[10px] text-gray-400 font-bold uppercase italic">
            * Required field
          </p>
        </div>
      </Modal>
    </AdminLayout>
  );
}
