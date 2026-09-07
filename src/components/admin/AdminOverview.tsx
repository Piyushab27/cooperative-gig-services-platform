import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Users, ShieldCheck, Activity, TrendingUp, Heart, DollarSign } from 'lucide-react';

export const AdminOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Top Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Workers</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900">2,846</span>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-1">2,613 Verified Members</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Jobs Today</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900">684</span>
          <span className="text-[10px] text-slate-500 font-semibold block mt-1">12,482 Lifetime Jobs</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Worker Earnings</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-700">₹48.6L</span>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-1">Direct 85% Fair Wage</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Welfare Fund</span>
            <Heart className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <span className="text-2xl font-extrabold text-amber-600">₹3.2L</span>
          <span className="text-[10px] text-amber-700 font-semibold block mt-1">Healthcare & Pensions</span>
        </div>
      </div>

      {/* Analytics Chart Mockups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900">Weekly Job Volume Growth</h4>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">+18.4% this week</span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { day: 'Mon', count: 520, height: '55%' },
              { day: 'Tue', count: 580, height: '62%' },
              { day: 'Wed', count: 640, height: '70%' },
              { day: 'Thu', count: 610, height: '66%' },
              { day: 'Fri', count: 720, height: '80%' },
              { day: 'Sat', count: 890, height: '95%' },
              { day: 'Sun', count: 684, height: '75%' },
            ].map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition">{d.count}</span>
                <div style={{ height: d.height }} className="w-full bg-emerald-500 hover:bg-emerald-400 rounded-t-xl transition-all shadow" />
                <span className="text-[11px] font-bold text-slate-600">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900">Worker Trade Utilization</h4>
            <span className="text-xs font-bold text-slate-500">89% Avg Active</span>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Electricians (412 workers)</span>
                <span className="text-emerald-700">94% Active</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[94%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>AC Technicians (280 workers)</span>
                <span className="text-emerald-700">98% Active</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 w-[98%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Plumbers (350 workers)</span>
                <span className="text-emerald-700">88% Active</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[88%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Painters & Cleaners (520 workers)</span>
                <span className="text-emerald-700">82% Active</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[82%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
