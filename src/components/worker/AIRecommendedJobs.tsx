import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Sparkles, MapPin, DollarSign, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface AIRecommendedJobsProps {
  onAcceptJob: (bookingId: string) => void;
}

export const AIRecommendedJobs: React.FC<AIRecommendedJobsProps> = ({ onAcceptJob }) => {
  const { bookings } = useDemo();

  // Find active available jobs
  const availableJobs = bookings.filter(b => b.status === 'requested' || b.status === 'accepted');

  return (
    <div className="space-y-4">
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase">
            AI Job Match Engine
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">
            Recommended Jobs Near You
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          3 jobs within 5 km radius
        </span>
      </div>

      {availableJobs.map(job => (
        <div
          key={job.id}
          className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 hover:border-emerald-400 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-xs px-2.5 py-1 rounded-xl shadow flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>98% AI Match</span>
              </span>
              <span className="text-xs font-bold text-slate-400">ID: {job.id}</span>
              {job.isEmergency && (
                <span className="bg-red-100 text-red-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-red-200">
                  🚨 Priority Emergency
                </span>
              )}
            </div>

            <h4 className="font-extrabold text-base text-slate-900">{job.serviceTitle}</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">"{job.problemDescription}"</p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold pt-1">
              <span className="flex items-center gap-1 text-slate-800">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>2.8 km away (Banjara Hills)</span>
              </span>
              <span>•</span>
              <span>📅 {job.scheduledDate} at {job.scheduledTime}</span>
              <span>•</span>
              <span className="text-emerald-700 font-extrabold">Cooperative Wage Protected</span>
            </div>
          </div>

          <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
            <div className="text-left md:text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Your Payout (85%)</span>
              <span className="text-2xl font-extrabold text-emerald-700">₹{Math.round(job.estimatedPrice * 0.85)}</span>
              <span className="text-[10px] text-slate-500 block font-medium">+ ₹25 Welfare Fund Deposit</span>
            </div>

            <button
              onClick={() => onAcceptJob(job.id)}
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 transition"
            >
              <span>ACCEPT JOB</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

    </div>
  );
};
