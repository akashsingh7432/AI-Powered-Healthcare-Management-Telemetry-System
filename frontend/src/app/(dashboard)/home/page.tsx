"use client";

import { motion, Variants } from "framer-motion";
import { Activity, AlertTriangle, Calendar, HeartPulse, Stethoscope, ArrowRight, Users } from "lucide-react";
import { Shimmer } from "@/components/Shimmer";

export default function HomePage() {
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVars} 
      initial="hidden" 
      animate="show" 
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Home Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of your clinic's telemetry and appointments today.</p>
        </div>
        <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          {new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Bento Box Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Critical AI Alerts */}
        <motion.div variants={itemVars} className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 text-red-600 rounded-xl">
              <AlertTriangle size={24} />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Critical Alerts</h2>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-red-900">Patient: John Doe</span>
                <span className="text-xs font-bold text-red-600 bg-red-200/50 px-2 py-1 rounded-md">HIGH RISK</span>
              </div>
              <p className="text-sm text-red-700">Arrhythmia detected continuously over the last 15 minutes. Immediate attention required.</p>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-amber-900">Patient: Sarah Smith</span>
                <span className="text-xs font-bold text-amber-600 bg-amber-200/50 px-2 py-1 rounded-md">REVIEW</span>
              </div>
              <p className="text-sm text-amber-700">Blood pressure spike (150/95). AI suggests medication review.</p>
            </div>
          </div>
        </motion.div>

        {/* Live Vitals (ECG Placeholder) */}
        <motion.div variants={itemVars} className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl text-white flex flex-col relative overflow-hidden">
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 text-teal-400 rounded-xl">
                <Activity size={24} />
              </div>
              <h2 className="text-lg font-bold text-white">Live Telemetry Overview</h2>
            </div>
            <button className="flex items-center gap-1 text-sm text-teal-400 font-medium hover:text-teal-300 transition-colors">
              View All <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 relative z-10">
            <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2 font-medium">
                <HeartPulse size={16} className="text-red-400" /> Avg Heart Rate
              </div>
              <div className="text-3xl font-bold">72 <span className="text-base text-slate-500 font-normal">bpm</span></div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2 font-medium">
                <Stethoscope size={16} className="text-blue-400" /> Avg Blood Pressure
              </div>
              <div className="text-3xl font-bold">118/76</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2 font-medium">
                <Activity size={16} className="text-green-400" /> Active Monitors
              </div>
              <div className="text-3xl font-bold">14 <span className="text-base text-slate-500 font-normal">patients</span></div>
            </div>
          </div>

          <div className="flex-1 bg-slate-800/30 border border-slate-700/30 rounded-2xl flex items-center justify-center p-6 min-h-[200px] relative z-10">
             {/* Fake ECG Chart line */}
             <svg className="w-full h-full text-teal-500 stroke-current opacity-80" viewBox="0 0 500 100" preserveAspectRatio="none">
               <path d="M0,50 L50,50 L60,20 L70,80 L80,50 L150,50 L160,10 L170,90 L180,50 L250,50 L260,30 L270,70 L280,50 L350,50 L360,20 L370,80 L380,50 L450,50 L460,10 L470,90 L480,50 L500,50" fill="none" strokeWidth="3" strokeLinejoin="round" />
             </svg>
          </div>
        </motion.div>

        {/* Upcoming Appointments Loading State Example */}
        <motion.div variants={itemVars} className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                <Calendar size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Schedule</h2>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Shimmer items to show loading state as requested */}
            <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <Shimmer className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Shimmer className="h-4 w-3/4" />
                <Shimmer className="h-3 w-1/2" />
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <Shimmer className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Shimmer className="h-4 w-5/6" />
                <Shimmer className="h-3 w-1/3" />
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <Shimmer className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Shimmer className="h-4 w-2/3" />
                <Shimmer className="h-3 w-2/5" />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div variants={itemVars} className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-3xl hover:border-teal-500 hover:shadow-md transition-all group">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
            <span className="text-sm font-semibold text-slate-700">Add Patient</span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-3xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
              <Calendar size={28} />
            </div>
            <span className="text-sm font-semibold text-slate-700">Book Appt</span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-3xl hover:border-purple-500 hover:shadow-md transition-all group">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
              <Activity size={28} />
            </div>
            <span className="text-sm font-semibold text-slate-700">Device Sync</span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-3xl hover:border-red-500 hover:shadow-md transition-all group">
            <div className="p-3 bg-red-50 text-red-600 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
              <AlertTriangle size={28} />
            </div>
            <span className="text-sm font-semibold text-slate-700">Dispatch</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
