import React from 'react';
import { Building2, Users, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

export const CooperativeDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white p-6 rounded-3xl shadow-xl border border-emerald-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center text-white font-bold shadow-lg">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white">
                Hyderabad City Cooperative
              </h2>
              <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                Society Admin
              </span>
            </div>
            <p className="text-xs text-emerald-100 font-medium mt-1">
              Local Worker Management & Operational Analytics
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900">Total Workers</h4>
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-3xl font-extrabold text-slate-900">142</span>
          <p className="text-xs text-slate-500">Active members in this cooperative.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900">Jobs Completed (Month)</h4>
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-3xl font-extrabold text-slate-900">485</span>
          <p className="text-xs text-slate-500">Across all service categories.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900">Society Revenue</h4>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-3xl font-extrabold text-emerald-700">₹8.4L</span>
          <p className="text-xs text-slate-500">Total generated this month.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h4 className="font-extrabold text-lg text-slate-900 mb-4">Pending Verifications</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Suresh Reddy - Plumber</p>
                <p className="text-xs text-slate-500">Awaiting Aadhar verification.</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 transition">
              Review
            </button>
          </div>
          {/* Add more pending verifications here if needed */}
        </div>
      </div>

    </div>
  );
};
