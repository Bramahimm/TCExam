import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Results({ resultData = [] }) {
  return (
    <AdminLayout title="/Users/UserResult">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <span className="material-icons text-3xl">analytics</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            Users
          </h1>
        </div>

        <div className="p-8">
          <h2 className="text-green-600 font-bold mb-4">User Result</h2>

          {/* Filters Section */}
          <div className="space-y-3 mb-8">
            <ResultFilter label="Group" />
            <ResultFilter label="User" />
            <ResultFilter label="Test" />
            <div className="flex ml-[120px]">
              <button className="bg-blue-600 text-white text-[10px] px-4 py-1 rounded">
                Select
              </button>
            </div>
          </div>

          <div className="border border-gray-300 rounded overflow-x-auto">
            <table className="w-full text-[10px] text-center border-collapse">
              <thead>
                <tr className="bg-gray-50 font-bold text-gray-600">
                  <th className="border border-gray-300 p-1">#</th>
                  <th className="border border-gray-300 p-1">Start</th>
                  <th className="border border-gray-300 p-1">Time</th>
                  <th className="border border-gray-300 p-1">Points</th>
                  <th className="border border-gray-300 p-1">Correct</th>
                  <th className="border border-gray-300 p-1">Wrong</th>
                  <th className="border border-gray-300 p-1">Unanswered</th>
                  <th className="border border-gray-300 p-1">Ungraded</th>
                  <th className="border border-gray-300 p-1">Status</th>
                  <th className="border border-gray-300 p-1">Comment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-500 font-medium">
                  <td className="border border-gray-300 p-1">1</td>
                  <td className="border border-gray-300 p-1">
                    2025-12-22 07:06:59
                  </td>
                  <td className="border border-gray-300 p-1 font-bold">
                    00:57:22
                  </td>
                  <td className="border border-gray-300 p-1">38.000 (38%)</td>
                  <td className="border border-gray-300 p-1 text-blue-600">
                    38 (38%)
                  </td>
                  <td className="border border-gray-300 p-1">62 (62%)</td>
                  <td className="border border-gray-300 p-1 text-red-500 font-bold">
                    0 (0%)
                  </td>
                  <td className="border border-gray-300 p-1">0 (0%)</td>
                  <td className="border border-gray-300 p-1">Locked</td>
                  <td className="border border-gray-300 p-1"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col items-center gap-2">
            <p className="text-blue-600 font-bold text-[10px]">Download</p>
            <div className="flex gap-2">
              <button className="bg-red-500 text-white text-[10px] px-6 py-1 rounded shadow">
                PDF
              </button>
              <button className="bg-green-500 text-white text-[10px] px-6 py-1 rounded shadow">
                CSV
              </button>
              <button className="bg-[#00a65a] text-white text-[10px] px-6 py-1 rounded shadow text-xs">
                XML
              </button>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-700">
            On this form you can see and select registered users. You can change
            the display order by clicking the column name.
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

const ResultFilter = ({ label }) => (
  <div className="flex items-center gap-4">
    <label className="text-sm font-bold text-green-700 w-24">{label}</label>
    <div className="flex-1 max-w-xl">
      <input className="w-full border border-gray-400 p-1 rounded outline-none" />
    </div>
  </div>
);
