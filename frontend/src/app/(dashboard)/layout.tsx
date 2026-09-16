import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50 w-full">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto w-full relative bg-slate-50/50">
        <Header />
        
        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          {children}
        </div>

        <Footer />
      </main>
    </div>
  );
}
