import { CheckCircle2, Lock, LifeBuoy } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white/50 backdrop-blur-sm py-3 px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 sticky bottom-0 z-10">
      {/* Left: System Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
          <CheckCircle2 size={14} />
          <span>All Systems Operational</span>
        </div>
        <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></div>
        <span className="hidden sm:inline">API Uptime: 99.99%</span>
      </div>

      {/* Center: Version */}
      <div className="mt-2 sm:mt-0 font-mono text-slate-400">
        v2.4.0-beta
      </div>

      {/* Right: Compliance & Support */}
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <div className="flex items-center gap-1.5 font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
          <Lock size={12} />
          HIPAA Compliant
        </div>
        <a href="#" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
          <LifeBuoy size={14} />
          IT Support
        </a>
      </div>
    </footer>
  );
}
