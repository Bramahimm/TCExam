import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/UI/Button";
import { mockClasses } from "@/Data/classData";

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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Academic Classes</h1>
          <Button className="bg-green-600">Add Class</Button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-100 rounded"></div>
              ))}
            </div>
          ) : classes.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No classes found.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-3 px-2 text-sm font-bold uppercase">
                    Class Name
                  </th>
                  <th className="py-3 px-2 text-sm font-bold uppercase text-center">
                    Students
                  </th>
                  <th className="py-3 px-2 text-sm font-bold uppercase text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {classes.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-2 font-medium">{item.name}</td>
                    <td className="py-4 px-2 text-center">
                      {item.totalStudents}
                    </td>
                    <td className="py-4 px-2 text-right space-x-2">
                      <Button variant="outline" className="text-xs">
                        Edit
                      </Button>
                      <Button variant="danger" className="text-xs">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
