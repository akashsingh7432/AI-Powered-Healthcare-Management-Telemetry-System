export default function Home() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="glass-panel p-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Welcome to HealthSync AI</h1>
        <p className="text-lg text-slate-600 mb-8">
          The next-generation AI-Powered Healthcare Management and Telemetry System.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/login" className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">
            Login
          </a>
          <a href="/patient-portal" className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg shadow hover:bg-slate-50 transition">
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  );
}
