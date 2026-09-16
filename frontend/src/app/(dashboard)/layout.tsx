import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 w-full">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto w-full relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10 sticky top-0">
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
    </div>
  );
}
