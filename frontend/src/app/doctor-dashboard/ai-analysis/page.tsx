"use client";

import { useState } from "react";
import { Brain, FileText, Activity, AlertCircle } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";

export default function AIAnalysisPage() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/ai/analyze-symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // In a real app, include Authorization token here
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ notes }),
      });

      if (!res.ok) throw new Error("Failed to analyze data");
      
      const data = await res.json();
      setResult(data.summary);
    } catch (err) {
      setError("An error occurred while contacting the AI service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard allowedRoles={["DOCTOR", "ADMIN"]}>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Brain className="text-purple-500" size={32} />
          AI Symptom Analysis
        </h2>
        <p className="text-slate-500 mt-1">Input patient clinical notes to generate automated structured insights.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <FileText size={18} />
                Raw Patient Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition resize-none"
                placeholder="e.g., Patient is a 45-year-old male presenting with severe fatigue, occasional chest pain, and elevated heart rate over the past week..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-medium text-white shadow-md transition flex items-center justify-center gap-2 ${
                loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              <Brain size={20} />
              {loading ? "Analyzing..." : "Analyze with HealthSync AI"}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-start gap-3">
              <AlertCircle size={20} className="mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800 text-white flex flex-col">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-slate-700 pb-4">
            <Activity className="text-teal-400" />
            AI Insights
          </h3>
          
          {result ? (
            <div className="space-y-6 flex-1">
              <div>
                <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider font-semibold">Detected Symptoms</p>
                <div className="flex flex-wrap gap-2">
                  {result.detectedSymptoms.map((sym: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-slate-800 text-teal-300 rounded-full text-sm border border-teal-900/50">
                      {sym}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider font-semibold">Severity Level</p>
                <span className={`px-4 py-1.5 rounded-lg text-sm font-bold tracking-wide inline-block ${
                  result.severityLevel === "HIGH" ? "bg-red-500/20 text-red-400" :
                  result.severityLevel === "MODERATE" ? "bg-amber-500/20 text-amber-400" :
                  "bg-green-500/20 text-green-400"
                }`}>
                  {result.severityLevel}
                </span>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider font-semibold">Recommended Action</p>
                <p className="text-slate-200 leading-relaxed">{result.recommendedAction}</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 opacity-60 min-h-[300px]">
              <Brain size={64} className="mb-4" />
              <p>Awaiting clinical input...</p>
            </div>
          )}
        </div>
        </div>
      </div>
    </AuthGuard>
  );
}
