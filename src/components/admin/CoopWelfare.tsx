import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Heart, FileCheck, ShieldAlert, ArrowUpRight } from 'lucide-react';

export const CoopWelfare: React.FC = () => {
  const { workers, bookings } = useDemo();

  const totalWorkers = workers.length;
  const welfareContributions = bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + (b.wageBreakdown?.welfareContribution || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Welfare Members</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{totalWorkers}</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Contributions</span>
          <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">₹{welfareContributions}</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm border-amber-200">
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block">Pending Claims</span>
          <span className="text-2xl font-extrabold text-amber-600 mt-1 block">3</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Approved Claims</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block">42</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200">
        <h3 className="font-extrabold text-lg text-slate-900 mb-4">Pending Welfare Claims</h3>
        
        <div className="space-y-4">
          {workers.slice(0, 3).map((w, idx) => (
            <div key={idx} className="flex flex-col md:flex-row justify-between p-5 border border-slate-100 rounded-2xl bg-slate-50 gap-4 md:items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                    CLAIM #CLM-2026-{100 + idx}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">Submitted 2 days ago</span>
                </div>
                <h4 className="font-bold text-slate-900">{w.name}</h4>
                <p className="text-xs text-slate-500 mt-1">Claim Type: <strong className="text-slate-700">{idx === 0 ? 'Medical Assistance' : idx === 1 ? 'Tool Replacement' : 'Sick Leave Support'}</strong></p>
                <p className="text-xs text-slate-500">Amount: <strong className="text-slate-700">₹{15000 - idx * 2500}</strong></p>
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-sm transition">
                  Approve
                </button>
                <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
