import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { VerifiedBadge } from '../common/VerifiedBadge';
import { HardHat, ShieldCheck, Power, Award, Star } from 'lucide-react';

export const WorkerHeader: React.FC = () => {
  const { workers, activeWorkerId } = useDemo();
  const worker = workers.find(w => w.id === activeWorkerId) || workers[0];

  const [isOnline, setIsOnline] = React.useState(worker.isAvailable);

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Worker Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={worker.photo}
              alt={worker.name}
              className="w-18 h-18 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
            />
            <span
              className={`w-4 h-4 rounded-full border-2 border-slate-900 absolute -bottom-1 -right-1 ${
                isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white">{worker.name}</h2>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/40">
                {worker.categoryLabel}
              </span>
            </div>

            <div className="mt-1">
              <VerifiedBadge cooperativeName={worker.cooperativeName} size="sm" />
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300 mt-2 font-medium">
              <span className="flex items-center text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                {worker.rating} Rating
              </span>
              <span>•</span>
              <span>{worker.jobsCompleted} Jobs Completed</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">Welfare Active</span>
            </div>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2 shadow-lg ${
              isOnline
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-950'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{isOnline ? '🟢 ONLINE — RECEIVING JOBS' : '🔴 OFFLINE'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
