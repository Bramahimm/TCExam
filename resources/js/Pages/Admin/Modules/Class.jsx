import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/UI/Button";
import { mockClasses } from "@/Data/classData";
import { Plus, Pencil, Trash2, GraduationCap } from "lucide-react";

export default function Class() {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setClasses(mockClasses);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <AdminLayout title="Modules - Class">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header: Stacked on mobile, side-by-side on sm+ */}
        <div className="p-4 md:p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-green-600" />
              Academic Classes
            </h1>
            <p className="text-sm text-gray-500">
              Manage your school classes and student capacity.
            </p>
          </div>
          <Button className="bg-green-600 w-full sm:w-auto flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add Class
          </Button>
        </div>

        <div className="p-0 sm:p-6">
          {isLoading ? (
            <div className="p-6 animate-pulse space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-gray-100 rounded"></div>
              ))}
            </div>
          ) : classes.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No classes found.
            </div>
          ) : (
            /* Wrapper for responsive table */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="text-gray-500 border-b bg-gray-50/50">
                    <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider">
                      Class Name
                    </th>
                    <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-center">
                      Students
                    </th>
                    <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.totalStudents} Students
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            className="text-xs flex items-center gap-1 py-1 px-2">
                            <Pencil className="w-3 h-3" />
                            <span className="hidden md:inline">Edit</span>
                          </Button>
                          <Button
                            variant="danger"
                            className="text-xs flex items-center gap-1 py-1 px-2">
                            <Trash2 className="w-3 h-3" />
                            <span className="hidden md:inline">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
