"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Activity, 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  Pill, 
  BrainCircuit, 
  Calendar, 
  Settings, 
  LogOut, 
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [isPatientPortalOpen, setIsPatientPortalOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    if (pathname.includes("patient-portal")) {
      setIsPatientPortalOpen(true);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  const NavItem = ({ href, icon: Icon, label, isActive }: any) => (
    <Link href={href} onClick={() => setIsMobileOpen(false)}>
      <motion.div
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
          isActive 
            ? "bg-teal-500/10 text-teal-400 font-medium border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]" 
            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
        }`}
      >
        <Icon size={20} className={isActive ? "text-teal-400" : "text-slate-500 group-hover:text-slate-300"} />
        <span className="text-sm">{label}</span>
        {isActive && (
          <motion.div layoutId="activeIndicator" className="absolute left-0 w-1 h-8 bg-teal-500 rounded-r-full" />
        )}
      </motion.div>
    </Link>
  );

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-300 w-72">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800/60 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20">
        <Link href="/home" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-all">
            <Activity className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight leading-none">HealthSync</h1>
            <span className="text-[10px] uppercase tracking-widest text-teal-400 font-semibold">AI Telemetry</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 custom-scrollbar">
        <NavItem 
          href="/home" 
          icon={LayoutDashboard} 
          label="Home (Dashboard)" 
          isActive={pathname === "/home"} 
        />

        {/* Nested Patient Portal */}
        <div className="pt-2 pb-1">
          <button 
            onClick={() => setIsPatientPortalOpen(!isPatientPortalOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
              pathname.includes("patient-portal") 
                ? "text-slate-200 font-medium" 
                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <Users size={20} className={pathname.includes("patient-portal") ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"} />
              <span className="text-sm">Patient Portal</span>
            </div>
            {isPatientPortalOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          
          <AnimatePresence>
            {isPatientPortalOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pl-11 pr-2 overflow-hidden mt-1 space-y-1"
              >
                <Link href="/patient-portal/directory" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-lg transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                  Directory
                </Link>
                <Link href="/patient-portal/ehr" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-lg transition-colors">
                  <FolderOpen size={14} className="text-slate-500" />
                  EHR Records
                </Link>
                <Link href="/patient-portal/prescriptions" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-lg transition-colors">
                  <Pill size={14} className="text-slate-500" />
                  Prescriptions
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <NavItem 
          href="/doctor-dashboard" 
          icon={Activity} 
          label="Live Telemetry" 
          isActive={pathname === "/doctor-dashboard"} 
        />
        
        <NavItem 
          href="/doctor-dashboard/ai-analysis" 
          icon={BrainCircuit} 
          label="AI Analysis" 
          isActive={pathname === "/doctor-dashboard/ai-analysis"} 
        />
        
        <NavItem 
          href="/scheduling" 
          icon={Calendar} 
          label="Scheduling" 
          isActive={pathname === "/scheduling"} 
        />

        <div className="pt-6 pb-2">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">System</p>
        </div>

        <NavItem 
          href="/settings" 
          icon={Settings} 
          label="Settings" 
          isActive={pathname === "/settings"} 
        />
        
        {role === "ADMIN" && (
          <NavItem 
            href="/admin-dashboard" 
            icon={Users} 
            label="Admin Console" 
            isActive={pathname === "/admin-dashboard"} 
          />
        )}
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-slate-800/60 bg-slate-900/50">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all font-medium text-sm border border-red-500/10"
        >
          <LogOut size={18} />
          Secure Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-0 left-0 h-16 w-16 flex items-center justify-center z-50">
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-slate-900 text-white shadow-lg"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Wrapper */}
      <div className={`fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {sidebarContent}
      </div>
    </>
  );
}
