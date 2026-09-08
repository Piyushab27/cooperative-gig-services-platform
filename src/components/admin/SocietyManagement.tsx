import React, { useState } from 'react';
import { Building2, Plus, Edit2, AlertCircle, CheckCircle2, MoreVertical, LayoutDashboard } from 'lucide-react';

export const SocietyManagement: React.FC = () => {
  const [societies, setSocieties] = useState([
    { id: 'S-001', name: 'Hyderabad Co-op Society', location: 'Hyderabad Central', workers: 845, revenue: 1450000, status: 'active' },
    { id: 'S-002', name: 'Secunderabad United Co-op', location: 'Secunderabad', workers: 620, revenue: 1120000, status: 'active' },
    { id: 'S-003', name: 'Warangal Plumbers Federation', location: 'Warangal City', workers: 310, revenue: 450000, status: 'active' },
    { id: 'S-004', name: 'Guntur Electricians Co-op', location: 'Guntur', workers: 420, revenue: 680000, status: 'inactive' },
    { id: 'S-005', name: 'Khammam Labour Union', location: 'Khammam', workers: 0, revenue: 0, status: 'pending' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleStatus = (id: string) => {
    setSocieties(prev => prev.map(s => {
      if (s.id === id) {
        if (s.status === 'active') return { ...s, status: 'inactive' };
        if (s.status === 'inactive') return { ...s, status: 'active' };
        if (s.status === 'pending') return { ...s, status: 'active' };
      }
      return s;
    }));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowAddModal(false);
      setSocieties([{ id: `S-00${societies.length + 1}`, name: 'New Cooperative Society', location: 'New Location', workers: 0, revenue: 0, status: 'active' }, ...societies]);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="font-extrabold text-lg text-slate-900">Manage Societies</h3>
          <p className="text-xs text-slate-500 font-medium">Manage and monitor all cooperative societies under the federation.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Society</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-bold text-sm">Loading Societies...</p>
          </div>
        ) : societies.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500">
            <Building2 className="w-10 h-10 mb-4 opacity-50" />
            <p className="font-bold">No societies found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  <th className="p-4 pl-6">Society Name</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Total Workers</th>
                  <th className="p-4">Total Revenue</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {societies.map((society) => (
                  <tr key={society.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-emerald-700" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{society.name}</div>
                          <div className="text-[10px] text-slate-500 font-medium">ID: {society.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{society.location}</td>
                    <td className="p-4 text-slate-900 font-bold">{society.workers.toLocaleString()}</td>
                    <td className="p-4 text-emerald-700 font-bold">₹{(society.revenue / 100000).toFixed(2)}L</td>
                    <td className="p-4">
                      {society.status === 'active' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      )}
                      {society.status === 'inactive' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 text-[10px] font-extrabold uppercase">
                          <AlertCircle className="w-3 h-3" /> Inactive
                        </span>
                      )}
                      {society.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase">
                          <AlertCircle className="w-3 h-3" /> Pending Review
                        </span>
                      )}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition" title="Edit Society">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => toggleStatus(society.id)}
                          className="px-3 py-1.5 text-[10px] font-bold rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
                        >
                          {society.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-xl border border-slate-200">
            <h3 className="font-extrabold text-lg text-slate-900 mb-4">Add Cooperative Society</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Society Name</label>
                <input required type="text" className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Hyderabad Co-op" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                <input required type="text" className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Hyderabad Central" />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
