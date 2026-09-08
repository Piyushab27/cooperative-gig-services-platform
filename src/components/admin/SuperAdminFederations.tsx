import React, { useState } from 'react';
import { Network, Plus, Eye, Ban, ShieldCheck, AlertCircle } from 'lucide-react';

export const SuperAdminFederations: React.FC = () => {
  const [federations, setFederations] = useState([
    { id: 'FED-TL', name: 'Telangana Labour Federation', region: 'Telangana', coops: 12, workers: 8450, status: 'active' },
    { id: 'FED-MH', name: 'Maharashtra Gig Co-op Union', region: 'Maharashtra', coops: 18, workers: 12200, status: 'active' },
    { id: 'FED-KA', name: 'Karnataka Service Co-ops', region: 'Karnataka', coops: 8, workers: 5100, status: 'suspended' },
    { id: 'FED-AP', name: 'Andhra United Workers', region: 'Andhra Pradesh', coops: 4, workers: 2100, status: 'active' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuspend = (id: string) => {
    setFederations(prev => prev.map(f => f.id === id ? { ...f, status: f.status === 'active' ? 'suspended' : 'active' } : f));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="font-extrabold text-lg text-slate-900">Federation Management</h3>
          <p className="text-xs text-slate-500 font-medium">Manage top-level regional federations and networks.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Add Federation</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                <th className="p-4 pl-6">Federation Name</th>
                <th className="p-4">Region</th>
                <th className="p-4">Cooperatives</th>
                <th className="p-4">Total Workers</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {federations.map((fed) => (
                <tr key={fed.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                        <Network className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{fed.name}</div>
                        <div className="text-[10px] text-slate-500 font-medium">ID: {fed.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">{fed.region}</td>
                  <td className="p-4 text-slate-900 font-bold">{fed.coops}</td>
                  <td className="p-4 text-slate-900 font-bold">{fed.workers.toLocaleString()}</td>
                  <td className="p-4">
                    {fed.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                        <ShieldCheck className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 text-[10px] font-extrabold uppercase">
                        <Ban className="w-3 h-3" /> Suspended
                      </span>
                    )}
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-3 py-1.5 text-[10px] font-bold rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition flex items-center gap-1">
                        <Eye className="w-3 h-3" /> View
                      </button>
                      <button 
                        onClick={() => handleSuspend(fed.id)}
                        className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition ${
                          fed.status === 'active' 
                          ? 'border-rose-200 text-rose-700 hover:bg-rose-50' 
                          : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                        }`}
                      >
                        {fed.status === 'active' ? 'Suspend' : 'Unsuspend'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
