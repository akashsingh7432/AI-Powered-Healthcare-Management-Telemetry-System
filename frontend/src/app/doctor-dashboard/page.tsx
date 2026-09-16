"use client";

import { useEffect, useState } from "react";
import { TelemetryWebSocket } from "@/lib/websocket";
import { Activity, Heart, Thermometer } from "lucide-react";

export default function DoctorDashboard() {
  const [heartRate, setHeartRate] = useState<number>(72);
  const [bloodPressure, setBloodPressure] = useState<string>("120/80");
  const [temperature, setTemperature] = useState<number>(98.6);

  useEffect(() => {
    // 1. Connect to the real Spring Boot WebSocket Backend
    const ws = new TelemetryWebSocket("ws://localhost:8080/ws/telemetry", (data) => {
      // Expecting data like: { heartRate: 85, bloodPressure: "125/82", temperature: 99.1 }
      if (data.heartRate) setHeartRate(data.heartRate);
      if (data.bloodPressure) setBloodPressure(data.bloodPressure);
      if (data.temperature) setTemperature(data.temperature);
    });
    
    ws.connect();

    // 2. Simulated interval for local UI showcase if backend isn't sending data yet
    const interval = setInterval(() => {
      setHeartRate(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 2000);

    return () => {
      clearInterval(interval);
      ws.disconnect();
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Live Telemetry Dashboard</h2>
        <p className="text-slate-500 mt-1">Monitoring Patient: John Doe (ID: #49281)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Heart Rate Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Heart size={100} className="text-rose-500" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-500">
              <Heart size={24} className="animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">Heart Rate</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold text-slate-900">{heartRate}</span>
            <span className="text-lg text-slate-500 mb-1">bpm</span>
          </div>
        </div>

        {/* Blood Pressure Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity size={100} className="text-blue-500" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
              <Activity size={24} />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">Blood Pressure</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold text-slate-900">{bloodPressure}</span>
            <span className="text-lg text-slate-500 mb-1">mmHg</span>
          </div>
        </div>

        {/* Temperature Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Thermometer size={100} className="text-amber-500" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-500">
              <Thermometer size={24} />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">Temperature</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold text-slate-900">{temperature.toFixed(1)}</span>
            <span className="text-lg text-slate-500 mb-1">°F</span>
          </div>
        </div>
      </div>
    </div>
  );
}
