"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import { Users, ShieldAlert } from "lucide-react";

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/admin/users", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          setError("Failed to load users");
        }
      } catch (err) {
        setError("Network error");
      }
    };
    fetchUsers();
  }, []);

  return (
    <AuthGuard allowedRoles={["ADMIN"]}>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <ShieldAlert className="text-red-500" size={32} />
            Admin Dashboard
          </h2>
          <p className="text-slate-500 mt-1">System user management and platform oversight.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Users className="text-blue-500" />
              Registered Users
            </h3>
          </div>
          {error ? (
            <div className="p-6 text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-medium">ID</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">{user.id}</td>
                      <td className="px-6 py-4 font-medium">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          user.role === 'ADMIN' ? 'bg-red-100 text-red-700' :
                          user.role === 'DOCTOR' ? 'bg-teal-100 text-teal-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
