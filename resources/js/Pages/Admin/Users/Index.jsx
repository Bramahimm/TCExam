import React, { useState, useMemo } from "react";
import { Head, usePage, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/UI/Modal";
import Button from "@/Components/UI/Button";
import UserForm from "@/Features/UserManagement/Components/UserForm";

import Management from "./Management";
import Grouping from "./Grouping";
import Online from "./Online"; 
import Selection from "./Selection";
import Import from "./Import"; 
import Results from "./Results"; 

export default function Index({ users, groups }) {
  const { url, props } = usePage();
  const { flash } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const section = useMemo(() => {
    const params = new URLSearchParams(url.split("?")[1]);
    return params.get("section") || "management";
  }, [url]);

  const { data, setData, post, put, processing, errors, reset, clearErrors } =
    useForm({
      name: "",
      npm: "",
      email: "",
      groups: [],
    });

  const openModal = (user = null) => {
    clearErrors();
    if (user) {
      setEditMode(true);
      setSelectedId(user.id);
      setData({
        name: user.name || "",
        npm: user.npm || "",
        email: user.email || "",
        groups: user.groups ? user.groups.map((g) => g.id) : [],
      });
    } else {
      setEditMode(false);
      setSelectedId(null);
      reset();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      put(route("admin.users.update", selectedId), {
        onSuccess: () => setIsModalOpen(false),
      });
    } else {
      post(route("admin.users.store"), {
        onSuccess: () => {
          setIsModalOpen(false);
          reset();
        },
      });
    }
  };

  const renderSection = () => {
    switch (section) {
      case "management":
        return (
          <Management
            users={users}
            groups={groups}
            flash={flash}
            onAddClick={() => openModal()}
            onEditClick={(user) => openModal(user)}
          />
        );
      case "groups":
        return <Grouping groups={groups} />;
      case "selection":
        return <Selection users={users} groups={groups} />;
      case "online":
        return <Online users={users} />;
      case "import":
        return <Import />;
      case "results":
        return <Results users={users} />;
      default:
        return (
          <Management
            users={users}
            groups={groups}
            flash={flash}
            onAddClick={() => openModal()}
            onEditClick={(user) => openModal(user)}
          />
        );
    }
  };

  return (
    <AdminLayout>
      <Head title={`Users - ${section.toUpperCase()}`} />

      <div className="space-y-6">
        <div className="flex gap-4 border-b border-gray-200 text-sm font-bold uppercase tracking-widest text-gray-400">
        </div>

        <div key={section} className="animate-in fade-in duration-500">
          {renderSection()}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editMode ? "Edit Peserta" : "Tambah Peserta"}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <UserForm
            data={data}
            setData={setData}
            errors={errors}
            groups={groups}
          />
          <div className="flex justify-end gap-3 pt-6 border-t mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" loading={processing} className="bg-[#00a65a]">
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
