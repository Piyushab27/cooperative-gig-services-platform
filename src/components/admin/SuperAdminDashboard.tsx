import React from 'react';
import { Database, ShieldAlert, Settings, Globe, Server } from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white p-6 rounded-3xl shadow-xl border border-indigo-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-indigo-300 font-bold shadow-lg">
            <Globe className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white">
                System Super Administrator
              </h2>
              <span className="bg-indigo-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                God Mode
              </span>
            </div>
            <p className="text-xs text-indigo-200 font-medium mt-1">
              Platform Configuration, Global Settings & System Health
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900">Active Cooperatives</h4>
            <Database className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="text-3xl font-extrabold text-slate-900">42</span>
          <p className="text-xs text-slate-500">Across 12 states.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900">System Uptime</h4>
            <Server className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-3xl font-extrabold text-slate-900">99.99%</span>
          <p className="text-xs text-slate-500">All services operational.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900">Security Alerts</h4>
            <ShieldAlert className="w-5 h-5 text-rose-600" />
          </div>
          <span className="text-3xl font-extrabold text-slate-900">0</span>
          <p className="text-xs text-slate-500">No active threats detected.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900">API Calls (24h)</h4>
            <Settings className="w-5 h-5 text-slate-600" />
          </div>
          <span className="text-3xl font-extrabold text-slate-900">1.2M</span>
          <p className="text-xs text-slate-500">Standard load.</p>
        </div>
      </div>

    </div>
  );
};
