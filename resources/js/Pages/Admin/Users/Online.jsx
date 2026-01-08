import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Online({ onlineUsers = [] }) {
  return (
    <AdminLayout title="/Users/UserOnline">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <span className="material-icons text-3xl">record_voice_over</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            Users
          </h1>
        </div>

        <div className="p-8">
          <h2 className="text-green-600 font-bold mb-4">Online Users</h2>

          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-white">
                  <th className="border border-blue-200 p-2 text-blue-600 font-bold">
                    User
                  </th>
                  <th className="border border-blue-200 p-2 text-blue-600 font-bold">
                    Status
                  </th>
                  <th className="border border-blue-200 p-2 text-blue-600 font-bold">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {onlineUsers.length > 0 ? (
                  onlineUsers.map((user, index) => (
                    <tr
                      key={index}
                      className="text-center text-blue-700 font-medium">
                      <td className="border border-blue-200 p-2">
                        {user.username}
                      </td>
                      <td className="border border-blue-200 p-2">
                        {user.status}
                      </td>
                      <td className="border border-blue-200 p-2">
                        {user.ip_address}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center text-blue-700">
                    <td
                      colSpan="3"
                      className="border border-blue-200 p-2 italic">
                      No users currently online
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="bg-gray-50 border-t border-gray-300 p-1 text-[10px] text-center text-blue-600">
              1/1
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-700">
            This form displays users who are currently logged in.
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
