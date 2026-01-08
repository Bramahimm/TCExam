import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/UI/Button";
import { mockClasses } from "@/Data/classData";
import { Link } from "@inertiajs/react";

export default function ClassIndex() {
  return (
    <AdminLayout title="Modules - Academic Classes">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Academic Classes
          </h1>
          <Button className="bg-green-600 shadow-sm font-bold">
            + Create Class
          </Button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClasses.map((item) => (
            <div
              key={item.id}
              className="border-2 border-gray-100 rounded-2xl p-6 hover:border-green-500 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-icons text-6xl">school</span>
              </div>
              <h3 className="text-lg font-black text-gray-800 mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">
                  {item.totalStudents} Students
                </span>
                <Link
                  href={route("admin.modules.class.detail", item.id)}
                  className="text-green-600 text-xs font-bold hover:underline">
                  View Detail →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
