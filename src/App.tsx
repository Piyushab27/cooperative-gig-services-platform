import React from 'react';
import { DemoProvider, useDemo } from './context/DemoContext';
import { DemoBanner } from './components/common/DemoBanner';
import { Navbar } from './components/common/Navbar';
import { CustomerView } from './components/customer/CustomerView';
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { FederationDashboard } from './components/admin/FederationDashboard';
import { CooperativeDashboard } from './components/admin/CooperativeDashboard';
import { SuperAdminDashboard } from './components/admin/SuperAdminDashboard';
import { Handshake, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { NotificationToast } from './components/common/NotificationToast';

const MainApp: React.FC = () => {
  const { role } = useDemo();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Demo Quick Banner for Hackathon Judges */}
      <DemoBanner />
      <NotificationToast />

      {/* Main Navbar */}
      <Navbar />

      {/* Dynamic Role View */}
      <main className="flex-1">
        {role === 'customer' && <CustomerView />}
        {role === 'worker' && <WorkerDashboard />}
        {role === 'cooperative_admin' && <CooperativeDashboard />}
        {role === 'federation_admin' && <FederationDashboard />}
        {role === 'super_admin' && <SuperAdminDashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md">
                <Handshake className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Sahakaar<span className="text-emerald-400">.</span>
                </span>
                <p className="text-xs text-slate-400 font-medium">
                  Skilled hands. Fair work. Stronger communities.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Cooperative Network</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>100% Fair Wage Protected</span>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <p>© 2026 Sahakaar Labour Cooperative Federation Platform. Built for Hackathon Demo.</p>
            <p className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cooperative Ownership • Digital Payments • AI Matching</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <DemoProvider>
      <MainApp />
    </DemoProvider>
  );
}

export default App;
