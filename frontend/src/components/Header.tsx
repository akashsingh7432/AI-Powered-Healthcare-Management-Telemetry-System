"use client";

import { Search, AlertTriangle, Bell, Sun, Moon, Globe, ChevronDown, Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10 sticky top-0">
      {/* Left: Global Command Search */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm text-slate-700 placeholder-slate-400"
            placeholder="Search patients, records... (Cmd+K)"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-block border border-slate-200 rounded px-2 py-0.5 text-xs font-sans font-medium text-slate-400 bg-white">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right: Action Group */}
      <div className="flex items-center gap-3 ml-4">
        {/* Code Blue Button */}
        <button className="hidden sm:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold tracking-wide shadow-sm transition-colors animate-pulse-slow">
          <AlertTriangle size={16} />
          CODE BLUE
        </button>

        {/* Live Telemetry Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Connected
        </div>

        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

        {/* Clinic Switcher */}
        <button className="hidden lg:flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 font-medium px-2 py-1 rounded-md hover:bg-slate-50 transition-colors">
          City Center Clinic
          <ChevronDown size={14} className="text-slate-400" />
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">
            3
          </span>
        </button>

        {/* Theme Toggle */}
        <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-colors hidden sm:block">
          <Sun size={20} />
        </button>

        {/* Language Toggle */}
        <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-colors hidden sm:block">
          <Globe size={20} />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer pl-1 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold text-slate-800 leading-tight">Dr. Aakash</span>
            <span className="text-xs text-slate-500 font-medium">CMO</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-inner">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
