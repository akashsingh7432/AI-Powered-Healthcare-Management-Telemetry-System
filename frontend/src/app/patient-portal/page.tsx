export default function PatientPortal() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Patient Portal</h2>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-semibold mb-4 text-slate-700">Book an Appointment</h3>
        <p className="text-slate-500 mb-6">Select an available doctor and time slot for your next visit.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-slate-200 rounded-xl hover:border-teal-500 cursor-pointer transition">
            <h4 className="font-bold text-slate-800">Dr. Sarah Jenkins</h4>
            <p className="text-sm text-slate-500">Cardiology</p>
            <div className="mt-4 text-teal-600 text-sm font-medium">Next available: Tomorrow, 10:00 AM</div>
          </div>
          <div className="p-4 border border-slate-200 rounded-xl hover:border-teal-500 cursor-pointer transition">
            <h4 className="font-bold text-slate-800">Dr. Michael Chen</h4>
            <p className="text-sm text-slate-500">General Practice</p>
            <div className="mt-4 text-teal-600 text-sm font-medium">Next available: Today, 2:30 PM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
