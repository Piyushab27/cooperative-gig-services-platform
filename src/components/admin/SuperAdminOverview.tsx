import React from 'react';
import { Network, Building2, Users, UserCheck, Banknote, TrendingUp, CalendarCheck, AlertTriangle } from 'lucide-react';

export const SuperAdminOverview: React.FC = () => {
  const kpis = [
    { title: 'Total Federations', value: '4', sub: 'Across 4 States', icon: Network, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Total Cooperatives', value: '42', sub: 'Active Societies', icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Verified Workers', value: '18,450', sub: '+12% this month', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Total Customers', value: '1.2M', sub: 'Registered Users', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Platform Revenue', value: '₹4.2Cr', sub: 'Zero Commission Model', icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Worker Earnings', value: '₹35.5Cr', sub: 'Direct 85% Payout', icon: TrendingUp, color: 'text-emerald-700', bg: 'bg-emerald-100' },
    { title: 'Active Bookings', value: '8,420', sub: 'Real-time', icon: CalendarCheck, color: 'text-slate-600', bg: 'bg-slate-100' },
    { title: 'Emergency Bookings', value: '142', sub: 'High Priority', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h3 className="font-extrabold text-lg text-slate-900">System-Wide KPI Dashboard</h3>
          <p className="text-xs text-slate-500 font-medium">Aggregated metrics across the entire Sahakaar network.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{kpi.title}</span>
              <div className={`w-8 h-8 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </div>
            <span className="text-2xl font-extrabold text-slate-900 block">{kpi.value}</span>
            <span className="text-[10px] text-slate-500 font-semibold block mt-1">{kpi.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
