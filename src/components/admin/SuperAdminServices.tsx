import React, { useState } from 'react';
import { Settings, Plus, Zap, Wrench, ShieldCheck, AlertCircle, Image } from 'lucide-react';

export const SuperAdminServices: React.FC = () => {
  const [services, setServices] = useState([
    { id: 'electrician', name: 'Electrician', basePrice: 450, emergencyEnabled: true, icon: 'Zap' },
    { id: 'plumber', name: 'Plumber', basePrice: 350, emergencyEnabled: true, icon: 'Wrench' },
    { id: 'cleaner', name: 'Cleaner & Helper', basePrice: 300, emergencyEnabled: false, icon: 'Sparkles' },
    { id: 'caregiver', name: 'Caregiver', basePrice: 600, emergencyEnabled: false, icon: 'Heart' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setServices([...services, { id: 'new-service', name: 'New Service', basePrice: 500, emergencyEnabled: false, icon: 'Settings' }]);
      setIsSubmitting(false);
      setShowAddModal(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="font-extrabold text-lg text-slate-900">Global Service Categories</h3>
          <p className="text-xs text-slate-500 font-medium">Manage platform-wide services and baseline pricing.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service Category</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                <th className="p-4 pl-6">Service Category</th>
                <th className="p-4">Base Price</th>
                <th className="p-4">Emergency Support</th>
                <th className="p-4">Platform Fee</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {services.map((svc) => (
                <tr key={svc.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                        <Settings className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{svc.name}</div>
                        <div className="text-[10px] text-slate-500 font-medium">ID: {svc.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-emerald-700 font-bold">₹{svc.basePrice}</td>
                  <td className="p-4">
                    {svc.emergencyEnabled ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 text-[10px] font-extrabold uppercase">
                        <Zap className="w-3 h-3" /> Enabled
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-extrabold uppercase">
                        Disabled
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-600 font-medium">Zero (Cooperative Model)</td>
                  <td className="p-4 pr-6 text-right">
                    <button className="px-3 py-1.5 text-[10px] font-bold rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition">
                      Edit Options
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-xl border border-slate-200">
            <h3 className="font-extrabold text-lg text-slate-900 mb-4">Add New Service Category</h3>
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category Name</label>
                <input required type="text" className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Electrician" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Base Minimum Price (₹)</label>
                <input required type="number" className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. 450" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Icon Upload</label>
                <div className="w-full px-4 py-4 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                  <Image className="w-6 h-6 mb-2" />
                  <span className="text-xs font-medium">Click to upload SVG or PNG</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50">
                <div>
                  <span className="block text-sm font-bold text-slate-900">Emergency Enabled</span>
                  <span className="text-[10px] text-slate-500">Allow 1-Tap Emergency dispatch</span>
                </div>
                <div className="w-10 h-5 bg-slate-300 rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition disabled:opacity-70">
                  {isSubmitting ? 'Saving...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
