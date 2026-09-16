import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Activity, Brain, Calendar, LayoutDashboard, LogOut, User } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HealthSync AI - Telemetry System",
  description: "AI-Powered Healthcare Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 flex h-screen overflow-hidden`}>
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col transition-all duration-300">
          <div className="p-6 flex items-center gap-3 text-white border-b border-slate-800">
            <Activity className="text-teal-500" size={28} />
            <h1 className="font-bold text-lg tracking-tight">HealthSync AI</h1>
          </div>
          
          <nav className="flex-1 py-6 px-4 space-y-2">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
              <LayoutDashboard size={20} />
              <span>Home</span>
            </Link>
            <Link href="/patient-portal" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
              <Calendar size={20} />
              <span>Patient Portal</span>
            </Link>
            <Link href="/doctor-dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800 text-teal-400 font-medium transition-colors shadow-sm">
              <Activity size={20} />
              <span>Telemetry</span>
            </Link>
            <Link href="/doctor-dashboard/ai-analysis" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
              <Brain size={20} className="text-purple-400" />
              <span>AI Analysis</span>
            </Link>
            <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
              <User size={20} />
              <span>Login</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
            <h2 className="text-xl font-semibold text-slate-800">Dashboard</h2>
            <div className="flex items-center gap-4">
              <div className="h-9 w-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold border border-teal-200">
                Dr
              </div>
            </div>
          </header>
          <div className="flex-1 p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
