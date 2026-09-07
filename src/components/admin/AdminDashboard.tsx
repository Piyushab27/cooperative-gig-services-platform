import React, { useState } from 'react';
import { AdminOverview } from './AdminOverview';
import { WorkerVerificationTable } from './WorkerVerificationTable';
import { AIDemandForecast } from './AIDemandForecast';
import { WageRulesConfigurator } from './WageRulesConfigurator';
import {
  LayoutDashboard,
  UserCheck,
  Sparkles,
  Sliders,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'forecast' | 'wagerules'>('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold shadow-lg">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white">
                Telangana Labour Cooperative Federation
              </h2>
              <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                Admin Console
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-1">
              Cooperative Governance, Verification & AI Demand Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>2,613 Active Verified Members</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Federation Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
            activeTab === 'verification'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Worker Verification</span>
        </button>

        <button
          onClick={() => setActiveTab('forecast')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
            activeTab === 'forecast'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Demand Forecast</span>
        </button>

        <button
          onClick={() => setActiveTab('wagerules')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
            activeTab === 'wagerules'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Wage & Welfare Policy</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <AdminOverview />}
      {activeTab === 'verification' && <WorkerVerificationTable />}
      {activeTab === 'forecast' && <AIDemandForecast />}
      {activeTab === 'wagerules' && <WageRulesConfigurator />}

    </div>
  );
};
