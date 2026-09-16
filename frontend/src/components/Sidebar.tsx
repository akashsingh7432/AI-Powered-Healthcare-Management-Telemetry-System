"use client";

import Link from "next/link";
import { Activity, Brain, Calendar, LayoutDashboard, LogOut, ShieldAlert, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  // Hide sidebar on auth pages
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  useEffect(() => {
    // Only access localStorage on client-side after mount
    setRole(localStorage.getItem("role"));
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 z-20">
      <div className="p-6 flex items-center gap-3 text-white border-b border-slate-800">
        <Activity className="text-teal-500" size={28} />
        <h1 className="font-bold text-lg tracking-tight">HealthSync AI</h1>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        <Link href="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/' ? 'bg-slate-800 text-teal-400 font-medium shadow-sm' : 'hover:bg-slate-800 hover:text-white'}`}>
          <LayoutDashboard size={20} />
          <span>Home</span>
        </Link>
        
        {role === "PATIENT" && (
          <Link href="/patient-portal" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname.includes('/patient') ? 'bg-slate-800 text-teal-400 font-medium shadow-sm' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Calendar size={20} />
            <span>Patient Portal</span>
          </Link>
        )}

        {(role === "DOCTOR" || role === "ADMIN") && (
          <>
            <Link href="/doctor-dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/doctor-dashboard' ? 'bg-slate-800 text-teal-400 font-medium shadow-sm' : 'hover:bg-slate-800 hover:text-white'}`}>
              <Activity size={20} />
              <span>Telemetry</span>
            </Link>
            <Link href="/doctor-dashboard/ai-analysis" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname.includes('/ai-analysis') ? 'bg-slate-800 text-teal-400 font-medium shadow-sm' : 'hover:bg-slate-800 hover:text-white'}`}>
              <Brain size={20} className={pathname.includes('/ai-analysis') ? "text-purple-400" : ""} />
              <span>AI Analysis</span>
            </Link>
          </>
        )}

        {role === "ADMIN" && (
          <Link href="/admin-dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname.includes('/admin') ? 'bg-slate-800 text-teal-400 font-medium shadow-sm' : 'hover:bg-slate-800 hover:text-white'}`}>
            <ShieldAlert size={20} className={pathname.includes('/admin') ? "text-red-400" : ""} />
            <span>Admin</span>
          </Link>
        )}

        {!role && (
          <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <User size={20} />
            <span>Login</span>
          </Link>
        )}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
