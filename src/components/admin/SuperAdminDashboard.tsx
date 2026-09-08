import React, { useState } from 'react';
import { Database, ShieldAlert, Settings, Globe, Server, Users, Network, Activity, Banknote } from 'lucide-react';
import { SuperAdminOverview } from './SuperAdminOverview';
import { SuperAdminFederations } from './SuperAdminFederations';
import { SuperAdminServices } from './SuperAdminServices';

export const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'federations' | 'services' | 'transactions' | 'settings'>('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row border-t border-slate-200">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-slate-900 text-slate-300 md:min-h-[calc(100vh-4rem)] p-4 flex flex-col gap-2 shrink-0">
        <div className="px-3 py-4 mb-2">
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-extrabold text-white tracking-wide">SYSTEM ADMIN</h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">God Mode</span>
        </div>
        
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition ${
            activeTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" /> System Dashboard
        </button>

        <button
          onClick={() => setActiveTab('federations')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition ${
            activeTab === 'federations' ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Network className="w-4 h-4" /> Manage Federations
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition ${
            activeTab === 'services' ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" /> Global Services
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition ${
            activeTab === 'users' ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" /> Platform Users
        </button>

        <button
          onClick={() => setActiveTab('transactions')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition ${
            activeTab === 'transactions' ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Banknote className="w-4 h-4" /> Transactions
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition ${
            activeTab === 'settings' ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Server className="w-4 h-4" /> Platform Settings
        </button>

        <div className="mt-auto pt-8 px-3">
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase">System Status</span>
            </div>
            <p className="text-white text-xs font-bold">All services operational</p>
            <p className="text-slate-400 text-[10px] mt-1">Uptime: 99.99%</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && <SuperAdminOverview />}
          {activeTab === 'federations' && <SuperAdminFederations />}
          {activeTab === 'services' && <SuperAdminServices />}
          
          {(activeTab === 'users' || activeTab === 'transactions' || activeTab === 'settings') && (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Database className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">Module Under Construction</h3>
              <p className="text-sm text-slate-500 max-w-sm">This module is currently being built out for the Sahakaar Super Admin interface.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
